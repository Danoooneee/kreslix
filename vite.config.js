import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { fetchLinkedInPosts } from "./lib/linkedin.js";

const requiredFields = ["name", "company", "email", "bottleneck"];

function clean(value) {
  return String(value || "").trim();
}

function formatLead(data) {
  const rows = [
    ["Language", data.language],
    ["Source", data.source],
    ["Name", data.name],
    ["Company", data.company],
    ["Role", data.role],
    ["Email", data.email],
    ["Telegram / phone", data.contact],
    ["Country / city", data.location],
    ["Projects per month", data.projects],
    ["Current tools", data.tools],
    ["Biggest bottleneck", data.bottleneck],
    ["Useful pilot outcome", data.pilot]
  ];

  return [
    "New Kreslix demo request",
    "",
    ...rows.map(([label, value]) => `${label}: ${clean(value) || "-"}`)
  ].join("\n");
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function readRequestBody(req) {
  return new Promise((resolveBody) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolveBody(raw ? JSON.parse(raw) : {});
      } catch {
        resolveBody({});
      }
    });
  });
}

function apiDevPlugin() {
  return {
    name: "kreslix-api-dev",
    configureServer(server) {
      server.middlewares.use("/api/linkedin-posts", async (req, res) => {
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "GET") {
          sendJson(res, 405, { ok: false, error: "Method not allowed" });
          return;
        }

        try {
          const feed = await fetchLinkedInPosts({ count: 3 });
          res.setHeader("Cache-Control", "no-store");
          sendJson(res, 200, feed);
        } catch (error) {
          sendJson(res, Number.isInteger(error.status) ? error.status : 502, {
            ok: false,
            error: error.status === 501 ? "LinkedIn is not configured" : "LinkedIn feed is unavailable"
          });
        }
      });

      server.middlewares.use("/api/demo", async (req, res) => {
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "POST") {
          sendJson(res, 405, { ok: false, error: "Method not allowed" });
          return;
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        const data = await readRequestBody(req);
        const missing = requiredFields.filter((field) => !clean(data[field]));

        if (missing.length) {
          sendJson(res, 400, { ok: false, error: "Missing required fields", missing });
          return;
        }

        if (!token || !chatId) {
          sendJson(res, 501, { ok: false, error: "Telegram is not configured" });
          return;
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
          const details = await telegramResponse.text();
          sendJson(res, 502, { ok: false, error: "Telegram request failed", details });
          return;
        }

        sendJson(res, 200, { ok: true });
      });
    }
  };
}

export default defineConfig({
  root: "app",
  publicDir: "../public",
  base:
    process.env.GITHUB_ACTIONS === "true" || process.env.KRESLIX_PAGES === "true"
      ? "/kreslix/"
      : "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: process.env.KRESLIX_PAGES === "true" ? "pages-assets" : "assets"
  },
  plugins: [apiDevPlugin(), react(), tailwindcss()]
});
