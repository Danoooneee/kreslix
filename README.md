# Kreslix landing page

One-page Vite + React landing page for Kreslix with English/Ukrainian content, anchor navigation, Grunt Grotesk headings, Fixel body typography, Motion animations, an interactive cursor-follow hero, product demo video, a Google Drive presentation, LinkedIn updates, and a Telegram-ready demo request flow.

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

## Presentation

Presentation buttons open the shared Google Drive presentation in a new browser tab:

```text
https://drive.google.com/file/d/1qgRQitgBYbfbETDYNzBT8k0ASHTSZtRJ/view?usp=sharing
```

## LinkedIn updates

The frontend requests `/api/linkedin-posts`, which reads the latest public Kreslix organization posts through LinkedIn's server-side Posts API. Configure:

```bash
LINKEDIN_ACCESS_TOKEN=...
LINKEDIN_ORGANIZATION_ID=...
LINKEDIN_VANITY_NAME=kreslix
LINKEDIN_API_VERSION=202605
```

The access token needs LinkedIn's `r_organization_social` permission and the authenticated member must have an eligible Kreslix page role. Keep this token server-side.

For GitHub Pages, add `LINKEDIN_ACCESS_TOKEN` and, preferably, `LINKEDIN_ORGANIZATION_ID` as repository Actions secrets. The `Sync LinkedIn posts` workflow refreshes `public/data/linkedin-posts.json` every six hours. The Pages build reads this JSON directly, so no secret is exposed to visitors.

If the static site and API are hosted on different origins, build the frontend with:

```bash
VITE_LINKEDIN_FEED_ENDPOINT=https://your-api.example.com/api/linkedin-posts
```

Without a configured feed endpoint, the section falls back to a direct link to the Kreslix LinkedIn page.

## Typography

Headings use Grunt Grotesk from:

```bash
app/src/fonts/GruntGrotesk-Bold.otf
app/src/fonts/GruntGrotesk-Light.otf
```

Body copy uses the bundled Fixel Text fonts.
