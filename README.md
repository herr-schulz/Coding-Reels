# Coding Reels

A studio for short coding lessons. Each lesson is saved in the catalog, grouped by subject, and plays in the browser before anyone renders an MP4. Web lessons use the blue template. Android lessons use the green template, with Orbitron for titles.

## Preview

```bash
pnpm install
pnpm dev
```

Open the shelf at `http://localhost:5173`. A lesson page can switch templates and turn on safe-zone guides. The HTML element table lives at `/table/html`.

## Render

```bash
pnpm render html-tags out/html-tags.mp4 --props='{"episodeId":"html-tags","templateId":"web","showGuides":false}'
```

The lesson page shows the command for the template you are previewing. Guides stay off the file.

## Add a lesson

1. Add an episode file in `src/catalog/episodes/`.
2. Register it in `src/catalog/episodes/index.ts`.
3. Set `subjectId` to `html`, `css`, `javascript`, `react`, `kotlin`, `compose`, or `xml`.
4. Set `templateId` to `web` or `android`.

The shelf picks it up from that list. Scenes already cover a hook, code, a web or Android-colored frame, the HTML element table, the box model, and an end card. New visual ideas belong in the scene catalog, using the template colors and fonts, so lessons stay in one style.

Void elements follow the HTML Living Standard: `area`, `base`, `br`, `col`, `embed`, `hr`, `img`, `input`, `link`, `meta`, `source`, `track`, `wbr`.
