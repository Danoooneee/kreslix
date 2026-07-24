import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchLinkedInPosts } from "../lib/linkedin.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(projectRoot, "public/data/linkedin-posts.json");
const feed = await fetchLinkedInPosts({ count: 3 });

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(feed, null, 2)}\n`, "utf8");

console.log(`Synced ${feed.posts.length} LinkedIn posts.`);
