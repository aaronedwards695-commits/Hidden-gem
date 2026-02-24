# TrailVault (MVP)

TrailVault is a modern UK hidden-gems web app built with Next.js App Router, TypeScript, Tailwind CSS, MapLibre, and PWA support.

## Features
- Home discovery page with search + filters
- Interactive clustered map view with category layer toggles
- Gem detail pages with route pins, safety/tips, map links
- Pro gating simulation using localStorage
- Offline save (IndexedDB via idb-keyval) and dedicated `/saved` page
- Installable PWA with manifest + service worker caching

## Local setup
### View the app locally
1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000` in your browser.

If you want to test from another device on your network, run:

```bash
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Then open `http://<your-computer-ip>:3000` from your phone.

## Production build
```bash
npm run build
npm run start
```

## Deploy to Vercel
1. Push this repo to GitHub.
2. In Vercel, import the project.
3. Build command: `npm run build`
4. Output: default Next.js output.
5. Deploy.

## Install as app on iPhone
1. Open the deployed site in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen**.
4. Launch TrailVault from your home screen as a standalone app.

## Swap OSM tile provider
Current map tiles use OpenStreetMap (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`).

To replace provider:
- Update tile URL in:
  - `components/gems-map.tsx`
  - `components/gem-route-map.tsx`
- Update runtime cache rule in `next.config.mjs` if domain changes.
- Ensure attribution text matches the new provider terms.

## Data
Dataset lives in `data/gems.json` (50 entries) and can be replaced with your own records using the same schema.
