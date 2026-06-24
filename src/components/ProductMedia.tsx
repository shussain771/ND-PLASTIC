import React, { useState, useEffect } from 'react';
import { GranuleViz, ProductViz } from './GranuleViz';

// Deterministic seed from a string so each fallback scatter is stable.
function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 233280;
  return h || 7;
}

type Variant = 'granules' | 'product';

/**
 * Renders a real photo when `photo` is provided AND loads successfully.
 * Otherwise falls back to the CSS visual (granule scatter or labelled tile).
 * Falling back is automatic on a 404 / load error — so you can drop photos
 * into public/ one at a time and nothing ever shows broken.
 */
export function ProductMedia({
  photo,
  variant,
  paletteKey,
  color,
  label,
  seedKey,
  count = 110,
  imgClassName = '',
  vizClassName = '',
}: {
  photo?: string;
  variant: Variant;
  paletteKey?: string;
  color?: string;
  label?: string;
  seedKey: string;
  count?: number;
  imgClassName?: string;
  vizClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  // Reset failure state if the photo path changes (e.g. variant switch).
  useEffect(() => {
    setFailed(false);
  }, [photo]);

  const showPhoto = photo && !failed;

  if (showPhoto) {
    return (
      <img
        src={photo}
        alt={label || ''}
        onError={() => setFailed(true)}
        className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    );
  }

  if (variant === 'granules') {
    return (
      <GranuleViz
        paletteKey={paletteKey || 'mixed'}
        seed={hashSeed(seedKey)}
        count={count}
        className={`absolute inset-0 ${vizClassName}`}
      />
    );
  }

  return (
    <ProductViz
      color={color || '#16a34a'}
      label={label || ''}
      className={`absolute inset-0 ${vizClassName}`}
    />
  );
}

/** Small square media for swatches / modal previews (not absolutely positioned). */
export function ProductMediaThumb({
  photo,
  variant,
  paletteKey,
  color,
  seedKey,
  count = 18,
  className = '',
}: {
  photo?: string;
  variant: Variant;
  paletteKey?: string;
  color?: string;
  seedKey: string;
  count?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [photo]);

  if (photo && !failed) {
    return (
      <img
        src={photo}
        alt=""
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover ${className}`}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    );
  }

  if (variant === 'granules') {
    return <GranuleViz paletteKey={paletteKey || 'mixed'} seed={hashSeed(seedKey)} count={count} className={`w-full h-full ${className}`} />;
  }
  return <ProductViz color={color || '#16a34a'} label="" className={`w-full h-full ${className}`} />;
}
