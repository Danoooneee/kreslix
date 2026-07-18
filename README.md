# Kreslix landing page

One-page Vite + React landing page for Kreslix with English/Ukrainian content, anchor navigation, Grunt Grotesk headings, Fixel body typography, Motion animations, product demo video, a downloadable PDF presentation, and a Telegram-ready demo request flow.

## Run locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Telegram demo requests

The frontend posts demo requests to `/api/demo`. Configure these environment variables on your deployment platform:

```bash
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

The token is used only server-side in `api/demo.js`.

## Product demo video

The optimized product demo video used by the site is stored at:

```bash
public/media/kreslix-demo-web.mp4
```

The high-resolution source file remains local at `public/media/kreslix-demo.mp4` and is excluded from Git.

## Downloadable presentation

The PDF presentation used by the site download buttons is stored at:

```bash
public/downloads/kreslix.pdf
```

## Typography

Headings use Grunt Grotesk from:

```bash
public/fonts/GruntGrotesk-Bold.otf
public/fonts/GruntGrotesk-Light.otf
```

Body copy uses the bundled Fixel Text fonts.
