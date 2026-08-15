const requiredFields = ["name", "company", "contact"];

function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function clean(value) {
  return String(value || "").trim();
}

function formatLead(data) {
  const rows = [
    ["Language", data.language],
    ["Source", data.source],
    ["Name", data.name],
    ["Company", data.company],
    ["Email / phone", data.contact]
  ];

  return [
    "New kreslix call request",
    "",
    ...rows.map(([label, value]) => `${label}: ${clean(value) || "-"}`)
  ].join("\n");
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(501).json({ ok: false, error: "Telegram is not configured" });
  }

  const data = readBody(req);
  const missing = requiredFields.filter((field) => !clean(data[field]));

  if (missing.length) {
    return res.status(400).json({ ok: false, error: "Missing required fields", missing });
  }

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLead(data),
      disable_web_page_preview: true
    })
  });

  if (!telegramResponse.ok) {
    const errorText = await telegramResponse.text();
    return res.status(502).json({ ok: false, error: "Telegram request failed", details: errorText });
  }

  return res.status(200).json({ ok: true });
}
