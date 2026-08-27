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

## LinkedIn updates

On Vercel, the landing page reads the three latest company posts from `/api/linkedin-posts`. The access token stays in the server-side Vercel Function and the response is cached for one hour.

Configure these variables in **Vercel → Project → Settings → Environment Variables**, then redeploy:

```bash
LINKEDIN_ACCESS_TOKEN=...
LINKEDIN_ORGANIZATION_ID=... # optional when the organization can be resolved from the vanity name
LINKEDIN_VANITY_NAME=kreslix
LINKEDIN_API_VERSION=202608
```

GitHub Pages uses `public/data/linkedin-posts.json` as a static fallback. GitHub Actions refreshes this file every six hours, while an open site tab checks for a newer feed every 15 minutes.

Configure these repository Actions secrets:

```bash
LINKEDIN_ACCESS_TOKEN=...
LINKEDIN_ORGANIZATION_ID=... # optional when the organization can be resolved from the vanity name
```

The token needs LinkedIn's `r_organization_social` permission and must belong to a member who can administer the kreslix company page. It stays inside Vercel or GitHub Actions and is never included in the browser bundle. The workflow can also be started manually from **Actions → Sync LinkedIn posts → Run workflow**.

## Typography

Headings use Grunt Grotesk from:

```bash
app/src/fonts/GruntGrotesk-Bold.otf
app/src/fonts/GruntGrotesk-Light.otf
```

Body copy uses the bundled Fixel Text fonts.
