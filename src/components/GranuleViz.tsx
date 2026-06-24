import React from 'react';

// Deterministic pseudo-random so each render is stable.
function seeded(seed: number) {
  let s = seed % 233280 || 1;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const PALETTES: Record<string, string[]> = {
  'blue-green-granules': ['#3f8f57', '#2f6fb0', '#62ab78', '#1f4f86'],
  green: ['#3f8f57', '#2c6b3f', '#62ab78'],
  blue: ['#2f6fb0', '#1f4f86', '#5a93cc'],
  red: ['#c0392b', '#922b21', '#e05a4d'],
  mixed: ['#c0392b', '#3f8f57', '#2f6fb0', '#2b2b2b', '#d9d4c8'],
  grey: ['#7a7d80', '#9aa0a4', '#5c5f62', '#b0b4b8'],
};

// Granule scatter — used for pellet/resin products.
export function GranuleViz({
  paletteKey = 'mixed',
  seed = 7,
  count = 90,
  className = '',
}: {
  paletteKey?: string;
  seed?: number;
  count?: number;
  className?: string;
}) {
  const colors = PALETTES[paletteKey] || PALETTES.mixed;
  const rand = seeded(seed);
  const pellets = Array.from({ length: count }, (_, i) => {
    const x = rand() * 100;
    const y = rand() * 100;
    const w = 5 + rand() * 6;
    const h = w * (0.55 + rand() * 0.3);
    const rot = rand() * 180;
    const c = colors[Math.floor(rand() * colors.length)];
    return { x, y, w, h, rot, c, i };
  });
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: 'radial-gradient(circle at 50% 35%, #2a2f36, #11151a)' }}
    >
      {pellets.map((p) => (
        <span
          key={p.i}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.w}px`,
            height: `${p.h}px`,
            background: p.c,
            borderRadius: '50%',
            transform: `translate(-50%,-50%) rotate(${p.rot}deg)`,
            boxShadow:
              'inset -1px -1px 2px rgba(0,0,0,0.35), inset 1px 1px 2px rgba(255,255,255,0.45)',
          }}
        />
      ))}
    </div>
  );
}

// Solid-colour product tile — used for finished goods (pipe, tank, bucket, scrap).
export function ProductViz({
  color = '#16a34a',
  label = '',
  className = '',
}: {
  color?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}, #11151a 140%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      <span className="relative z-10 px-3 text-center text-[11px] font-bold uppercase tracking-widest text-white/85 font-mono">
        {label}
      </span>
    </div>
  );
}
