# N.D. Plastic Recycle Unit — Agartala

B2B lead-generation website for N.D. Plastic Recycle Unit, a reprocessed plastic
granules wholesaler & manufacturer in Nagicherra, Agartala, Tripura.

WhatsApp-first: every product card, the hero, contact card, and the floating button
open a pre-filled WhatsApp chat to **+91 70053 24192**.

Product visuals are CSS-rendered (granule scatters + labelled tiles) by default —
no external images, nothing can break.

## Adding real photos
Drop image files into `public/products/` using the exact names listed in
`public/products/README.txt` (e.g. `granules-cover.jpg`, `hdpe-pipe.jpg`,
`water-tank.jpg`). Each one appears automatically on the matching card, variant
swatch, gallery tile, and inquiry modal. Any photo that's missing — or that fails
to load — falls back to the CSS visual on its own, so you can add photos one at a
time and the site never shows a broken image. Recommended: JPG, ~800–1200px wide,
under ~300KB each.

## Run locally
```
npm install
npm run dev      # http://localhost:3000
```

## Build
```
npm run build    # outputs to dist/
npm run preview
```

## Deploy to Vercel
1. Push this folder to a new GitHub repo.
2. On vercel.com → New Project → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist`.
   No environment variables required.

## Stack
React 19 · Vite 6 · Tailwind CSS v4 · lucide-react · TypeScript
