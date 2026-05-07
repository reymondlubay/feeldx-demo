# FeelDX Materials & Furniture Selection Assistant

Lightweight prototype for exploring **room-based finishes and furnishings** with a SaaS-style dashboard. Users pick a room, choose mock materials and furniture, watch a live summary update, then run a **rule-based “AI” briefing** (fully offline — no remote models).

## Overview

FeelDX prioritizes clarity, responsive layout, and maintainable frontend structure over visualisation depth. It is intentionally **not** a construction documentation tool, BIM viewer, or live AI integration.

### Features

- **Room presets** — Kitchen, Bathroom, Living room, Bedroom, Laundry with context-specific field sets.
- **Per-room memory** — Each room keeps its own selections in `localStorage`; switching rooms restores prior picks after refresh.
- **Rich mock catalog** — Flooring, walls, benchtops, cabinetry, seating, beds, lighting, etc., each tagged for compatibility and tiered cost cues.
- **Live summary rail** — Sticky panel that stays in view under the header (scrolls internally if needed), plus selection coverage meter, aggregated **low / medium / high** cost posture, tier badges, and quick watch-list signals.
- **Mock intelligence** — Deterministic briefing from tags and tiers covering spend narrative, pairing notes (e.g. dark-on-dark compression, wood + warm light), omission handling, and recommended next moves.
- **Light / dark theme** — Toggle in the header; choice persists with the same storage key as selections.
- **Motion polish** — Subtle transitions via Framer Motion.

## Technologies

| Area        | Choice                          |
|------------|----------------------------------|
| UI         | React 19 + TypeScript            |
| Tooling    | Vite 8                           |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`) |
| State      | Zustand                           |
| Motion     | Framer Motion                     |

## Getting started

**Requirements:** Node.js 18+ (or current LTS) and npm.

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

### Scripts

| Script        | Purpose                          |
|---------------|----------------------------------|
| `npm run dev` | Local dev server with HMR         |
| `npm run build` | Typecheck (`tsc -b`) + production bundle |
| `npm run preview` | Serve `dist` locally           |
| `npm run lint` | ESLint                            |

## Build

```bash
npm run build
```

Outputs static assets to **`dist/`** — suitable for any static host or CDN.

## Deployment

### Vercel

1. Import the repo in [Vercel](https://vercel.com/).
2. Framework preset: **Vite** (auto-detected in most cases).
3. Build command: `npm run build` — output directory: **`dist`**.
4. No environment variables are required for this prototype.

### Netlify

- **`netlify.toml`** defines `npm run build` and publish `dist`.
- SPA-style fallback is configured so client routes (if added later) resolve to `index.html`.
- `public/_redirects` is also emitted into `dist` for hosts that read that file.

Connect the repo in the Netlify UI or use the CLI; settings match the TOML file.

## Project structure

```
src/
  components/     # UI building blocks
  data/           # Mock catalog + room definitions
  hooks/          # Small React hooks
  pages/          # Screen-level composition
  store/          # Zustand store
  types/          # Shared TypeScript types
  utils/          # Cost aggregation, live signals, mock AI engine
```

## Assumptions

- **Single-user, client-only** — No auth, persistence, or backend beyond browser `localStorage` under the key `feeldx-app` (theme + active room + selections per room).
- **Tags drive logic** — Compatibility and “AI” copy are derived from fixed tag strings on catalog options (e.g. `tone:dark`, `warmth:warm`, `style:vintage`).
- **Cost bands are illustrative** — Derived from per-option `low | medium | high` tiers, not market pricing.
- **English UI** — Copy is fixed; i18n is out of scope.

## Limitations

- No saving or sharing selections; refresh clears state unless you extend the store.
- No imagery, CAD, VR, or real supplier SKUs.
- Mock AI cannot learn or generalize beyond the scripted rules.

## License

This project is **demo / exercise use only**: learning, portfolio demonstration, and non-production evaluation. **Commercial use is not allowed** (including selling, paid hosting, or revenue-generating use) without prior written permission from **Reymond Lubay** (owner). See the full terms in [`LICENSE`](./LICENSE).

The `package.json` `license` field is set to `UNLICENSED` (not an open-source OSI license). Third-party npm dependencies remain under their own licenses.

## Future improvements

- Persist selections (`localStorage` or lightweight API).
- User-uploaded mood boards with manual tag overrides.
- Export PDF / shareable briefing link.
- Optional OpenAI-class integration behind feature flags — keeping the deterministic engine as regression baseline.
- Accessible kitchen/bathroom-specific calculators (dimensions, egress) as separate modules.

---

Built as an internal UX + engineering scaffold for **FeelDX**-style briefing workflows.
