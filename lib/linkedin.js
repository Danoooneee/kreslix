const defaultCompanyUrl = "https://www.linkedin.com/company/kreslix";

function normalizeAccessToken(value) {
  const trimmed = String(value || "").trim().replace(/^Bearer\s+/i, "").trim();
  const wrappedInMatchingQuotes =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"));

  return wrappedInMatchingQuotes ? trimmed.slice(1, -1).trim() : trimmed;
}

function linkedInHeaders(accessToken, apiVersion) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "LinkedIn-Version": apiVersion,
    "X-Restli-Protocol-Version": "2.0.0",
    "Content-Type": "application/json"
  };
}

async function requestLinkedIn(url, headers) {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    const details = await response.text();
    const error = new Error(`LinkedIn request failed with ${response.status}`);
    error.status = response.status;
    error.details = details;
    throw error;
  }

  return response.json();
}

function normalizeLinkedInText(value) {
  return String(value || "")
    .replace(/@\[[^\]]+\]\(urn:li:[^)]+\)/g, (match) => match.slice(2, match.indexOf("]")))
    .replace(/\{hashtag\|\\?#\|([^}]+)\}/g, "#$1")
    .replace(/\s+/g, " ")
    .trim();
}

async function resolveOrganizationId({ accessToken, apiVersion, vanityName }) {
  const lookupUrl = new URL("https://api.linkedin.com/rest/organizations");
  lookupUrl.searchParams.set("q", "vanityName");
  lookupUrl.searchParams.set("vanityName", vanityName);

  const data = await requestLinkedIn(lookupUrl, linkedInHeaders(accessToken, apiVersion));
  const organization = data.elements?.[0];

  if (!organization?.id) {
    const error = new Error(`LinkedIn organization "${vanityName}" was not found`);
    error.status = 404;
    throw error;
  }

  return organization.id;
}

export async function fetchLinkedInPosts({
  accessToken = process.env.LINKEDIN_ACCESS_TOKEN,
  organizationId = process.env.LINKEDIN_ORGANIZATION_ID,
  vanityName = process.env.LINKEDIN_VANITY_NAME || "kreslix",
  apiVersion = process.env.LINKEDIN_API_VERSION || "202608",
  count = 3
} = {}) {
  const normalizedAccessToken = normalizeAccessToken(accessToken);

  if (!normalizedAccessToken) {
    const error = new Error("LinkedIn is not configured");
    error.status = 501;
    throw error;
  }

  const resolvedOrganizationId =
    organizationId ||
    (await resolveOrganizationId({ accessToken: normalizedAccessToken, apiVersion, vanityName }));
  const author = `urn:li:organization:${resolvedOrganizationId}`;
  const postsUrl = new URL("https://api.linkedin.com/rest/posts");
  postsUrl.searchParams.set("author", author);
  postsUrl.searchParams.set("q", "author");
  postsUrl.searchParams.set("count", String(Math.max(count, 10)));
  postsUrl.searchParams.set("sortBy", "LAST_MODIFIED");

  const data = await requestLinkedIn(postsUrl, {
    ...linkedInHeaders(normalizedAccessToken, apiVersion),
    "X-RestLi-Method": "FINDER"
  });

  const posts = (data.elements || [])
    .filter((post) => post.lifecycleState === "PUBLISHED" && post.visibility === "PUBLIC")
    .map((post) => ({
      id: post.id,
      text: normalizeLinkedInText(post.commentary),
      publishedAt: post.publishedAt || post.createdAt,
      url: `https://www.linkedin.com/feed/update/${post.id}/`
    }))
    .filter((post) => post.text && post.publishedAt)
    .sort((first, second) => second.publishedAt - first.publishedAt)
    .slice(0, count);

  return {
    companyUrl: defaultCompanyUrl,
    updatedAt: new Date().toISOString(),
    posts
  };
}
