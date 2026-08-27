import { fetchLinkedInPosts } from "../lib/linkedin.js";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const feed = await fetchLinkedInPosts({ count: 3 });

    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return response.status(200).json(feed);
  } catch (error) {
    console.error("LinkedIn feed request failed", error);

    return response.status(error.status || 500).json({
      error: error.status === 501 ? "LinkedIn is not configured" : "LinkedIn feed is unavailable"
    });
  }
}
