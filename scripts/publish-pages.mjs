import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(projectRoot, "dist");
const pagesAssets = resolve(projectRoot, "pages-assets");
const pagesBrand = resolve(projectRoot, "brand");

await rm(pagesAssets, { recursive: true, force: true });
await mkdir(pagesAssets, { recursive: true });
await cp(resolve(distRoot, "pages-assets"), pagesAssets, { recursive: true });
await mkdir(pagesBrand, { recursive: true });
await cp(resolve(distRoot, "brand/logo.svg"), resolve(pagesBrand, "logo.svg"));

const indexHtml = await readFile(resolve(distRoot, "index.html"), "utf8");
await writeFile(resolve(projectRoot, "index.html"), indexHtml);
await writeFile(resolve(projectRoot, ".nojekyll"), "");
