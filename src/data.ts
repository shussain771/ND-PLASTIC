import { Product } from './types';

// ── PRODUCT PHOTOS ──────────────────────────────────────────────
// Drop image files into  public/products/  with these names and they
// appear automatically. Until a file exists (or if it fails to load),
// the CSS visual fallback is shown instead — nothing ever breaks.
//
//   public/products/granules-cover.jpg    public/products/hdpe-pipe.jpg
//   public/products/granules-green.jpg    public/products/poultry-pot.jpg
//   public/products/granules-blue.jpg     public/products/water-tank.jpg
//   public/products/granules-5grade.jpg   public/products/water-bucket.jpg
//   public/products/granules-trial.jpg    public/products/pvc-scrap.jpg
// ────────────────────────────────────────────────────────────────

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-granules',
    name: 'REPROCESSED PLASTIC GRANULES',
    category: 'granules',
    price: '₹ 62 / Kg',
    description: 'High-tensile premium Polymer PP, HDPE, and LDPE Granules manufactured by N.D. Plastic Recycle Unit in Agartala. Extruded with advanced degassing filtration and multi-stage hot compounding to yield high Melt Flow Index (MFI) and consistency for manufacturing.',
    color: '#16a34a',
    imageSeed: 'blue-green-granules',
    paletteKey: 'blue-green-granules',
    photo: '/products/granules-cover.jpg',
    variants: [
      {
        name: 'PP Green Granules / Pellets',
        paletteKey: 'green',
        photo: '/products/granules-green.jpg',
        description: 'Premium reprocessed green Polypropylene pellets designed for high durability injection molding.'
      },
      {
        name: 'PP Blue Granules / Pellets',
        paletteKey: 'blue',
        photo: '/products/granules-blue.jpg',
        description: 'Vibrant reprocessed blue Polypropylene pellets engineered for blow molding and high-tensile extrusions.'
      },
      {
        name: 'HDPE / LDPE / PP Packed Samples (5 Grades)',
        paletteKey: 'mixed',
        photo: '/products/granules-5grade.jpg',
        description: 'Certified 5-grade reprocessed polymer packets containing black PP, green PP, red PP, HDPE 2, and LDPE 4 customized resins.'
      },
      {
        name: 'PP & Polyethylene Trial Packets',
        paletteKey: 'mixed',
        photo: '/products/granules-trial.jpg',
        description: 'Direct trial pack containing premium sorted red, green, and industrial blue compounding polymer segments.'
      }
    ]
  },
  {
    id: 'prod-hdpe-pipe',
    name: 'HDPE Pipe',
    category: 'products',
    price: '₹ 85 / Meter',
    description: 'High-Density Polyethylene plumbing & agricultural pipes extruded from premium reprocessed high-tensile resins. Leak-proof, crack-resistant, and UV-stabilized.',
    color: '#0284c7',
    imageSeed: 'hdpe-pipe',
    paletteKey: 'blue',
    photo: '/products/hdpe-pipe.webp'
  },
  {
    id: 'prod-poultry-pot',
    name: 'Poultry Pot',
    category: 'products',
    price: '₹ 45 / Piece',
    description: 'Heavy-duty molded plastic poultry feeders and watering pots. Tough structural build with high impact resistance, perfect for poultry farms in Tripura.',
    color: '#ea580c',
    imageSeed: 'poultry',
    paletteKey: 'red',
    photo: '/products/poultry-pot.jpg'
  },
  {
    id: 'prod-water-tank',
    name: '500 Lt. Water Tank',
    category: 'products',
    price: '₹ 2,400 / Piece',
    description: 'Premium triple-layered 500 Litre drinking water storage tanks. High thermal resistance and solid durability, rotomolded for food-grade safety.',
    color: '#0f766e',
    imageSeed: 'water-tank',
    paletteKey: 'green',
    photo: '/products/water-tank.jpg'
  },
  {
    id: 'prod-water-bucket',
    name: 'Water bucket',
    category: 'products',
    price: '₹ 75 / Piece',
    description: 'High-strength 20L plastic buckets with metal handle. Molded with thick wall structures using high-tensile PP resins to prevent cracking or warping, ideal for home and construction use.',
    color: '#16a34a',
    imageSeed: 'bucket',
    paletteKey: 'green',
    photo: '/products/water-bucket.jpg'
  },
  {
    id: 'prod-pvc-scrap',
    name: 'PVC Scrap',
    category: 'scrap',
    price: 'Market Value',
    description: 'Sorted, shredded, or baled PVC material sourced cleanly from local industrial networks. Process-ready for PVC compounding lines, pipes & wire-sheathing factories.',
    color: '#4b5563',
    imageSeed: 'pvc-scrap',
    paletteKey: 'grey',
    photo: '/products/pvc-scrap.jpg'
  }
];
