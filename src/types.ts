export interface ProductVariant {
  name: string;
  paletteKey: string;
  description: string;
  photo?: string; // optional path under public/, e.g. "/products/granules-green.jpg"
}

export interface Product {
  id: string;
  name: string;
  category: 'granules' | 'scrap' | 'products';
  price: string;
  description: string;
  color: string;
  imageSeed: string;
  paletteKey: string;
  photo?: string; // optional path under public/, e.g. "/products/granules-cover.jpg"
  variants?: ProductVariant[];
}

export interface DiscoveryBrief {
  targetAudience: string;
  capacity: string;
  machineryShown: boolean;
  visualTheme: 'eco' | 'industrial';
  primaryContactMethod: 'whatsapp' | 'email' | 'phone';
  additionalRequirements: string;
  selectedColorAccent: string;
}

export interface Inquiry {
  id: string;
  productName: string;
  buyerName: string;
  companyName: string;
  phone: string;
  email: string;
  quantity: string;
  notes: string;
  status: 'pending' | 'responded';
  timestamp: string;
}
