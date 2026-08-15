import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchLinkedInPosts } from "../lib/linkedin.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(projectRoot, "public/data/linkedin-posts.json");

function escapeWorkflowAnnotation(value) {
  return String(value || "")
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A")
    .slice(0, 600);
}

try {
  const feed = await fetchLinkedInPosts({ count: 3 });

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(feed, null, 2)}\n`, "utf8");

  console.log(`Synced ${feed.posts.length} LinkedIn posts.`);
} catch (error) {
  const details = error.details ? ` — ${error.details}` : "";
  const message = escapeWorkflowAnnotation(`${error.message}${details}`);
  console.error(`::error title=LinkedIn sync failed::${message}`);
  process.exitCode = 1;
}
