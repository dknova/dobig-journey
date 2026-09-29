# DOBIG — Heavenly Journey

A scroll-driven continuous 3D journey through the DOBIG technology ecosystem.

## Experience architecture

- One shared React Three Fiber canvas for the entire journey.
- A scroll-driven camera and an astronaut character that physically travels along the world axis.
- Seven connected visual chapters: Gateway, Infrastructure, Cloud, Software, AI, NOC / Operations, and Connected World.
- A responsive editorial HUD, chapter navigation, progress rail, and smooth Lenis + GSAP ScrollTrigger integration.
- Blue, midnight, violet, and cool-white art direction.

## Run locally

```bash
npm ci
npm run dev
```

Then open http://localhost:3000 (or the port shown by Next.js).

## Validate before deployment

```bash
npx tsc --noEmit
npm run build
```

The original scene components and `public/models/data-center/data-center-kit.glb` asset are retained in the project for continued iteration. The new journey experience is mounted through `components/experience/ContinuousJourney.tsx` and the main page is `app/page.tsx`.
