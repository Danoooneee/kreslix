# kreslix landing page

One-page Vite + React landing page for kreslix with English/Ukrainian content, anchor navigation, Grunt Grotesk headings, Fixel body typography, Motion animations, an interactive cursor-follow hero, product demo video, a Google Drive presentation, a LinkedIn CTA, and a Telegram-ready call request flow.

## Run locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## GitHub Pages

GitHub Pages publishes the root of `main`. Generate the root production entry and bundled assets before committing:

```bash
pnpm build:pages
```

The source application lives in `app/`. Public media stays in `public/` and is referenced directly by the Pages build, avoiding duplicate copies of the video and presentation.

## Telegram call requests

The frontend posts call requests to `/api/demo`. Configure these environment variables on your deployment platform:

```bash
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

The token is used only server-side in `api/demo.js`.

## Product demo video

The optimized product demo video used by the site is stored at:

```bash
public/media/kreslix-demo-hq-v2.mp4
```

The high-resolution source file remains local at `public/media/kreslix-demo.mp4` and is excluded from Git.

## Presentation

Presentation buttons open the shared Google Drive presentation in a new browser tab:

```text
https://drive.google.com/file/d/1qgRQitgBYbfbETDYNzBT8k0ASHTSZtRJ/view?usp=sharing
```

## LinkedIn

The landing page links directly to the kreslix company page on LinkedIn.

## Typography

Headings use Grunt Grotesk from:

```bash
app/src/fonts/GruntGrotesk-Bold.otf
app/src/fonts/GruntGrotesk-Light.otf
```

Body copy uses the bundled Fixel Text fonts.
