import { fetchLinkedInPosts } from "../lib/linkedin.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const feed = await fetchLinkedInPosts({ count: 3 });
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");
    return res.status(200).json(feed);
  } catch (error) {
    const status = Number.isInteger(error.status) ? error.status : 502;
    return res.status(status).json({
      ok: false,
      error: status === 501 ? "LinkedIn is not configured" : "LinkedIn feed is unavailable"
    });
  }
}
