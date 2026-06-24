import React, { useState } from 'react';
import { 
  Recycle, 
  MapPin, 
  Phone, 
  Building, 
  Leaf, 
  Sparkles, 
  TrendingUp, 
  Calculator, 
  CheckCircle, 
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Clock,
  Layers,
  Menu,
  X
} from 'lucide-react';
import { Product, DiscoveryBrief, Inquiry } from '../types';
import { GranuleViz } from './GranuleViz';
import { ProductMedia, ProductMediaThumb } from './ProductMedia';

// Stable seed from a string so each product/variant gets a consistent scatter.
function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 233280;
  return h || 7;
}

interface CompanyWebsiteProps {
  brief: DiscoveryBrief;
  products: Product[];
  onAddInquiry: (inquiry: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => void;
}

export default function CompanyWebsite({ brief, products, onAddInquiry }: CompanyWebsiteProps) {
  const WHATSAPP_NUMBER = '917005324192'; // Owner N.D. WhatsApp Business contact line
  const getWhatsAppUrl = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const [activeCategory, setActiveCategory] = useState<'all' | 'granules' | 'products' | 'scrap'>('all');
  const [calcQuantity, setCalcQuantity] = useState<number>(1000);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<Product | null>(null);
  
  // Inquiry Form State
  const [buyerName, setBuyerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [selectedVariantForInquiry, setSelectedVariantForInquiry] = useState<any>(null);
  // Tracks which variant index (if any) is shown on each product card.
  const [productVariantSel, setProductVariantSel] = useState<Record<string, number>>({});
  // Mobile navigation drawer toggle.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Constants for environmental savings
  // Using 1kg recycled plastic saves about 1.5kg of CO2 and 2.5 Litres of crude oil
  const co2Saved = (calcQuantity * 1.5).toLocaleString(undefined, { maximumFractionDigits: 1 });
  const oilSaved = (calcQuantity * 2.5).toLocaleString(undefined, { maximumFractionDigits: 1 });
  const landfillSaved = (calcQuantity * 0.9).toLocaleString(undefined, { maximumFractionDigits: 1 });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !phone) return;

    onAddInquiry({
      productName: selectedVariantForInquiry 
        ? `${selectedProductForInquiry?.name} (${selectedVariantForInquiry.name})`
        : (selectedProductForInquiry?.name || 'General Inquiry'),
      buyerName,
      companyName,
      phone,
      email: email || 'No email provided',
      quantity: `${calcQuantity} Kg`,
      notes: notes || `Interested in pricing and samples of ${selectedVariantForInquiry?.name || selectedProductForInquiry?.name}`
    });

    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setShowInquiryForm(false);
      // Reset
      setBuyerName('');
      setCompanyName('');
      setPhone('');
      setEmail('');
      setNotes('');
      setSelectedVariantForInquiry(null);
    }, 2500);
  };

  const openInquiryModal = (product: Product) => {
    setSelectedProductForInquiry(product);
    setShowInquiryForm(true);
    const idx = productVariantSel[product.id];
    if (idx != null && product.variants && product.variants[idx]) {
      setSelectedVariantForInquiry(product.variants[idx]);
    } else {
      setSelectedVariantForInquiry(null);
    }
  };

  // Define colors based on the selected brief theme
  const isEco = brief.visualTheme === 'eco';
  const primaryBgClass = isEco 
    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
    : 'bg-blue-600 hover:bg-blue-700 text-white';
  const primaryLightClass = isEco
    ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
    : 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100';
  const accentTextClass = isEco ? 'text-emerald-600' : 'text-blue-600';
  const borderAccentClass = isEco ? 'border-emerald-600' : 'border-blue-600';
  const ringAccentClass = isEco ? 'focus:ring-emerald-500' : 'focus:ring-blue-500';
  const accentGradient = isEco
    ? 'from-emerald-50 to-teal-50/50'
    : 'from-blue-50 to-slate-50/50';

  return (
    <div id="unit-website-preview" className="bg-slate-50 text-slate-800 font-sans min-h-screen relative overflow-hidden transition-all duration-300">
      
      {/* Top Banner with GST and Contact Details */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-2 px-4 sm:px-6 flex flex-wrap justify-center md:justify-between items-center gap-x-3 gap-y-1 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            Nagicherra, West Tripura, Agartala, India
          </span>
          <span className="hidden md:inline-block text-slate-500">|</span>
          <span className="hidden md:flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            GSTIN: 16ABCND9921Z7 (Tripura Unit)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
            <span className="hidden sm:inline">Mon - Sat:&nbsp;</span>7:00 AM - 6:00 PM
          </span>
          <span className="hidden sm:inline text-slate-400 font-medium">Contact Owner: N D</span>
        </div>
      </div>

      {/* Primary Navigation Header */}
      <header className="bg-white/95 backdrop-blur sticky top-0 z-40 border-b border-slate-200 shadow-sm transition-all duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0 ${isEco ? 'bg-emerald-600 shadow-emerald-100' : 'bg-blue-600 shadow-blue-100'}`}>
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white rounded-full border-t-transparent animate-spin-slow"></div>
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 font-display leading-tight truncate">
                ND PLASTIC <span className={accentTextClass}>RECYCLE UNIT</span>
              </h1>
              <p className="text-[9px] sm:text-[10px] font-mono text-slate-400 tracking-wider uppercase font-medium">
                AGARTALA • TRIPURA
              </p>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
            <a href="#about" className="hover:text-slate-900 transition-colors">About Us</a>
            <a href="#products" className="hover:text-slate-900 transition-colors">Our Process</a>
            <a href="#calculator" className="hover:text-slate-900 transition-colors">Impact Report</a>
            {brief.machineryShown && <a href="#facility" className="hover:text-slate-900 transition-colors font-medium">Facility Feed</a>}
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <a
              href={getWhatsAppUrl("Hello N D, I'd like to partner with N.D. Plastic Recycle Unit regarding high-tensile Blue and Green PP granules bulk supplies for our plastic molding factory.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all shadow-md ${primaryBgClass}`}
              id="cta-top-contact"
            >
              <MessageSquare className="w-4 h-4 fill-current flex-shrink-0" />
              <span className="hidden sm:inline">Partner On WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              className="md:hidden p-2 -mr-1 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-slate-200 bg-white px-4 py-2 flex flex-col text-sm font-semibold text-slate-600 shadow-sm">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-slate-100 hover:text-slate-900 transition-colors">About Us</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-slate-100 hover:text-slate-900 transition-colors">Our Process</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-slate-100 hover:text-slate-900 transition-colors">Impact Report</a>
            {brief.machineryShown && <a href="#facility" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-slate-100 hover:text-slate-900 transition-colors">Facility Feed</a>}
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2.5 hover:text-slate-900 transition-colors">Contact</a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className={`relative py-12 sm:py-24 bg-gradient-to-br ${accentGradient} overflow-hidden border-b border-slate-200`}>
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${isEco ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>High-Tensile Compounding • Tripura SSI Unit</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.1]">
              High-Tensile <span className={accentTextClass}>Blue & Green PP Granules</span> for Plastic Molding Factories.
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg max-w-lg leading-relaxed">
              ND Plastic Recycle Unit manufactures high-performance reprocessed Polypropylene (PP) resins. Multi-sorted, washed, de-gassed, and dry compounded to support injection and extrusion molding production in Northeast India.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#products" 
                className={`px-8 py-4 rounded-xl font-bold shadow-lg transition-all ${primaryBgClass} ${isEco ? 'shadow-emerald-200' : 'shadow-blue-200'}`}
              >
                Our Granule Catalog
              </a>
              <a 
                href={getWhatsAppUrl("Hello N D, I want to request a quotation of finished high-tensile Blue/Green PP granules for our molding factory.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-emerald-500 bg-emerald-50 text-emerald-800 rounded-xl font-bold transition-all hover:bg-emerald-100 flex items-center gap-2 shadow-md shadow-emerald-50/50"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 fill-current" />
                Quick WhatsApp Inquiry
              </a>
            </div>

            {/* Micro Specs Banner with Sleek border-left marks */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-lg">
              <div className={`border-l-4 pl-3 ${isEco ? 'border-emerald-500' : 'border-blue-500'}`}>
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Unit Capacity</p>
                <p className="text-base font-extrabold text-slate-800">
                  {brief.capacity === 'under-1t' ? '1 Ton/Day' : brief.capacity === '1t-5t' ? '3+ Tons/Day' : '8+ Tons/Day'}
                </p>
              </div>
              <div className={`border-l-4 pl-3 ${isEco ? 'border-emerald-300' : 'border-blue-300'}`}>
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Service Range</p>
                <p className="text-base font-extrabold text-slate-800">Tripura & NE</p>
              </div>
              <div className={`border-l-4 pl-3 ${isEco ? 'border-emerald-100' : 'border-blue-100'}`}>
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">GST Compliant</p>
                <p className="text-base font-extrabold text-slate-800 text-emerald-600">Verified</p>
              </div>
            </div>
          </div>

          {/* Banner Graphic Showcase matching "Sleek Interface" code perfectly */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full h-[340px] sm:h-[380px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col p-5 sm:p-8">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-50/50 to-white/50 opacity-80 pointer-events-none"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Live telemetryfeed</p>
                  <p className="text-xl font-extrabold text-slate-900 font-display">Processing Unit 04</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-md shadow-xs animate-pulse">ACTIVE</span>
              </div>

              {/* Machinery visual embed inside code */}
              <div className="relative z-10 my-4 flex-1 rounded-xl overflow-hidden bg-slate-950 border border-slate-150 relative group min-h-[120px]">
                <GranuleViz paletteKey="blue-green-granules" seed={hashSeed('hero-gate')} count={120} className="opacity-100 transition-transform duration-500 group-hover:scale-102" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-3 flex items-end">
                  <span className="text-[10px] text-slate-200 font-semibold uppercase tracking-wider font-mono bg-slate-950/70 p-1.5 rounded border border-slate-700/50">Nagicherra, West Tripura</span>
                </div>
              </div>

              {/* Live metrics widgets as seen on Sleek theme */}
              <div className="relative z-10 mt-auto">
                <div className="flex justify-between items-end mb-4">
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 font-medium">Daily Target Yield: 84%</p>
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${isEco ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  <div className={`text-3xl font-mono font-bold tracking-tighter ${accentTextClass}`}>
                    1,240<span className="text-xs text-slate-400 font-sans ml-1 font-semibold">kg/hr</span>
                  </div>
                </div>

                {/* Sparkling dynamic indicators bar chart */}
                <div className="grid grid-cols-6 gap-1 h-12 items-end">
                  <div className="h-6 bg-slate-100 rounded-sm"></div>
                  <div className="h-9 bg-slate-100 rounded-sm"></div>
                  <div className={`h-11 rounded-sm ${isEco ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                  <div className="h-7 bg-slate-100 rounded-sm"></div>
                  <div className={`h-10 rounded-sm ${isEco ? 'bg-emerald-400' : 'bg-blue-400'}`}></div>
                  <div className="h-8 bg-slate-100 rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* Decorative background blur */}
            <div className={`absolute -right-12 -bottom-12 w-64 h-64 rounded-full blur-3xl opacity-25 -z-0 ${isEco ? 'bg-emerald-400' : 'bg-blue-400'}`}></div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <h4 className={`text-xs font-bold font-mono tracking-wider uppercase ${accentTextClass}`}>About Our Recycling Unit</h4>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
                Driving Sustainable Manufacturing in West Tripura
              </h3>
              <p className="text-slate-600 leading-relaxed">
                N.D. Plastic Recycle Unit was founded to provide sustainable end-of-life plastic custom solutions to industries. Located in Agartala, we are committed to lowering carbon emissions by keeping plastic waste out of the landfills of Northeast India.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-1 rounded bg-slate-100 ${accentTextClass}`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-800">100% Sourced Locally</h5>
                    <p className="text-xs text-slate-500">We work directly with city vendors and scrap scrap dealers in Agartala, supporting the local green economy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-1 rounded bg-slate-100 ${accentTextClass}`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-800">Precision Testing & Sorting</h5>
                    <p className="text-xs text-slate-500">Every batch of raw waste undergoes careful separation (PP, HDPE, LDPE) to avoid cross-contamination.</p>
                  </div>
                </div>
                {brief.additionalRequirements && (
                  <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                    <div className="mt-0.5 text-amber-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-amber-900">Compliance & Certifications</h5>
                      <p className="text-[11px] text-amber-800">{brief.additionalRequirements}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-4">
              <div className={`space-y-1 border-l-4 ${isEco ? 'border-emerald-500' : 'border-emerald-600'} pl-4 py-1`}>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">450,000+ kg</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Recycled Annually</p>
              </div>

              <div className={`space-y-1 border-l-4 ${isEco ? 'border-blue-500' : 'border-blue-600'} pl-4 py-1`}>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">120+ Units</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">B2B Manufacturing Partners</p>
              </div>

              <div className={`space-y-1 border-l-4 ${isEco ? 'border-teal-500' : 'border-teal-600'} pl-4 py-1`}>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">₹60 / kg</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Standardized Floor Price</p>
              </div>

              <div className={`space-y-1 border-l-4 ${isEco ? 'border-amber-500' : 'border-amber-600'} pl-4 py-1`}>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">5 Years+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Trusted Operations</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Products Catalog */}
      <section id="products" className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <h4 className={`text-xs font-bold font-mono tracking-wider uppercase ${accentTextClass}`}>Verified Inventory</h4>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 font-display mt-1">
                Our Granule Specs & Products
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Available in multiple color-refined grades for diverse molds. Spot-clean, reprocessed locally.
              </p>
            </div>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap p-1 bg-slate-200/60 rounded-xl border border-slate-200">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                All Products
              </button>
              <button 
                onClick={() => setActiveCategory('granules')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === 'granules' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Reprocessed Resins
              </button>
              <button 
                onClick={() => setActiveCategory('products')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === 'products' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Finished Products
              </button>
              <button 
                onClick={() => setActiveCategory('scrap')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === 'scrap' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Thermoplastic Scrap
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const selIdx = productVariantSel[product.id];
              const activeVariant = (selIdx != null && product.variants) ? product.variants[selIdx] : null;
              const vizPalette = activeVariant ? activeVariant.paletteKey : product.paletteKey;
              return (
                <div 
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="bg-white rounded-2xl border border-slate-150 shadow-xs flex flex-col hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden group"
                >
                  {/* Product Visual Container with overlaid metadata */}
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    <ProductMedia
                      photo={activeVariant ? activeVariant.photo : product.photo}
                      variant={product.category === 'granules' ? 'granules' : 'product'}
                      paletteKey={vizPalette}
                      color={product.color}
                      label={product.name}
                      seedKey={product.id + (activeVariant?.name || '')}
                      count={110}
                      imgClassName="opacity-90 transition-transform duration-500 group-hover:scale-102"
                    />
                    {/* Master dark shadow wash for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-slate-950/45"></div>
                    
                    <div className="absolute inset-x-0 top-0 p-4 flex justify-between items-start z-10">
                      <span className="text-[10px] font-bold bg-slate-900/80 text-teal-400 border border-teal-500/20 backdrop-blur px-2.5 py-1 rounded-md font-sans tracking-wide uppercase">
                        {product.category === 'granules' ? 'Premium Resins' : product.category === 'products' ? 'Finished Products' : 'Industrial Scrap'}
                      </span>
                      <span className="text-xs font-bold text-white bg-slate-900/95 backdrop-blur border border-slate-700 px-2.5 py-1 rounded-lg">
                        {product.price}
                      </span>
                    </div>

                    {/* Variant thumbnails overlay */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="absolute bottom-11 left-4 z-20 flex gap-1.5 bg-slate-950/70 backdrop-blur-xs p-1 rounded-lg border border-slate-800">
                        {product.variants.map((v, idx) => {
                          const isSelected = selIdx === idx;
                          return (
                            <button
                              key={idx}
                              title={v.name}
                              onClick={(e) => {
                                e.stopPropagation();
                                setProductVariantSel(prev => ({ ...prev, [product.id]: idx }));
                              }}
                              className={`w-5.5 h-5.5 rounded-md overflow-hidden border transition-all ${isSelected ? 'border-amber-400 scale-110 ring-1 ring-amber-400' : 'border-white/40 hover:border-white scale-100 opacity-80'}`}
                            >
                              <ProductMediaThumb photo={v.photo} variant="granules" paletteKey={v.paletteKey} seedKey={v.name} count={14} />
                            </button>
                          );
                        })}
                        {/* Reset button to show cover */}
                        <button
                          title="Reset to Cover"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProductVariantSel(prev => {
                              const copy = { ...prev };
                              delete copy[product.id];
                              return copy;
                            });
                          }}
                          className={`px-1 text-[8px] font-bold font-mono text-white rounded border transition-all ${selIdx == null ? 'bg-amber-400 border-amber-400 text-slate-950' : 'bg-slate-800/80 border-white/20 hover:bg-slate-700'}`}
                        >
                          ALL
                        </button>
                      </div>
                    )}

                    {/* Compounded status and QC mark */}
                    <div className="absolute inset-x-0 bottom-3 px-4 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full shadow-inner animate-pulse" style={{ backgroundColor: product.color }}></div>
                        <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider font-mono">
                          {activeVariant
                            ? activeVariant.name.split(' ')[1] + ' Grade'
                            : 'Compounded Unit'}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold font-mono text-emerald-400 bg-slate-950/85 border border-emerald-500/20 px-2 py-0.5 rounded-md">AGARTALA UNIT</span>
                    </div>
                  </div>

                {/* Info and Description */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-slate-950">
                      {product.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        Tripura Delivery Grade
                      </span>
                      <span className="font-semibold text-slate-500 uppercase text-[10px]">QC Passed</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        onClick={() => openInquiryModal(product)}
                        className="py-2 text-center rounded-lg text-xs font-bold transition-all border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 flex items-center justify-center gap-1"
                      >
                        Ask Specs
                      </button>
                      <a
                        href={getWhatsAppUrl(`Hello N.D., I am from a plastic molding factory. I am inquiring about the current price sheet, Melt Flow Index (MFI), and minimum order quantity for: "${product.name}". Please share details.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 text-center rounded-lg text-xs font-bold transition-all bg-emerald-600 text-white hover:bg-emerald-700 font-sans flex items-center justify-center gap-1 hover:scale-[1.02] shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* Real-time Environmental Impact Calculator Section */}
      <section id="calculator" className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-slate-800">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-900 text-xs font-mono font-semibold">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Interactive Impact Calculator</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display leading-tight">
                  Calculate Your <span className="text-emerald-400">Carbon & Material Offset</span>
                </h3>
                
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Moving from virgin polymers to ND Plastic's hot-reprocessed granules reduces petrochemical burning and keeps trash out of the rivers of Tripura. Slide the controls below to estimate your exact green savings metrics!
                </p>

                {/* Input Controls */}
                <div className="space-y-2 pt-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <label htmlFor="quantity-slider" className="font-semibold text-slate-200">Purchasing Volume (Kg)</label>
                    <span className="font-mono text-emerald-400 text-sm font-bold bg-slate-800 px-2 py-0.5 rounded">{calcQuantity.toLocaleString()} Kg</span>
                  </div>
                  <input
                    id="quantity-slider"
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>500 Kg</span>
                    <span>10,000 Kg</span>
                    <span>50,000 Kg (Bulk)</span>
                  </div>
                </div>
              </div>

              {/* Outputs display */}
              <div className="md:col-span-6 bg-slate-800/50 border border-slate-750 p-6 rounded-2xl relative">
                <h4 className="text-xs font-mono font-bold tracking-wide text-slate-400 uppercase mb-4 text-center">
                  Total Environmental Savings Estimator
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-900">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-mono tracking-tight">CO₂ Emissions Reduction</p>
                      <p className="text-xl font-extrabold text-emerald-400 font-display">{co2Saved} Kg CO₂</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="p-2.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-900">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-mono tracking-tight">Crude Oil Extracted Avoided</p>
                      <p className="text-xl font-extrabold text-blue-400 font-display">{oilSaved} Litres</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="p-2.5 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-900">
                      <Recycle className="w-5 h-5 animate-spin-slow" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-mono tracking-tight">Landfill Diversion Net</p>
                      <p className="text-xl font-extrabold text-purple-400 font-display">{landfillSaved} Kg Plastic</p>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 text-center mt-3 font-mono">
                  *Calculations match polymer lifecycle standards for recycled polymers vs virgin resins.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Facility Gallery Section (Conditional Content strategy) */}
      {brief.machineryShown && (
        <section id="facility" className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <h4 className={`text-xs font-bold font-mono tracking-wider uppercase ${accentTextClass}`}>Inside the Processing Bay</h4>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
                Our Advanced Recycling Machinery & Setup
              </h3>
              <p className="text-slate-500 text-sm">
                Clean processes, heavy-duty size grinders, and state-of-the-art dual gas compounding extruders in Agartala.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2.5 group">
                <div className="rounded-xl overflow-hidden bg-slate-100 aspect-video border border-slate-200 relative">
                  <ProductMedia photo="/products/facility-drying.jpg" variant="product" color="#0f766e" label="Feedstock Drying Yard" seedKey="facility-drying" imgClassName="group-hover:scale-105 transition-transform duration-500" vizClassName="group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-950/85 text-[9px] font-mono font-bold text-emerald-400 rounded">Drying Bed A</span>
                </div>
                <h5 className="font-bold text-sm text-slate-800">1. Feedstock Drying & Sorting Yard</h5>
                <p className="text-xs text-slate-500">Washed, post-consumer green and red thermoplastic scraps are spread out across local Agartala sun-drying concrete pads to fully eliminate moisture.</p>
              </div>

              <div className="space-y-2.5 group">
                <div className="rounded-xl overflow-hidden bg-slate-100 aspect-video border border-slate-200 relative">
                  <ProductMedia photo="/products/facility-mixing.jpg" variant="product" color="#334155" label="Mixing & Sacking Bay" seedKey="facility-mixing" imgClassName="group-hover:scale-105 transition-transform duration-500" vizClassName="group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-950/85 text-[9px] font-mono font-bold text-emerald-400 rounded">Compounding Area</span>
                </div>
                <h5 className="font-bold text-sm text-slate-800">2. Heavy Mixing and Sacking Bay</h5>
                <p className="text-xs text-slate-500">Specially built batch mixers and high-capacity storage bags contain prepared multi-sorted polymers for streamlined extrusion feeding loops.</p>
              </div>

              <div className="space-y-2.5 group">
                <div className="rounded-xl overflow-hidden bg-slate-100 aspect-video border border-slate-200 relative">
                  <ProductMedia photo="/products/facility-extrusion.jpg" variant="product" color="#16a34a" label="Extrusion Line 02" seedKey="facility-extrusion" imgClassName="group-hover:scale-105 transition-transform duration-500" vizClassName="group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-950/85 text-[9px] font-mono font-bold text-emerald-400 rounded">Extrusion Line 02</span>
                </div>
                <h5 className="font-bold text-sm text-slate-800">3. High-Tensile Compounding & Extruders</h5>
                <p className="text-xs text-slate-500">Dual-screw electric hot extrusion lines compound, degas, strain, and profile materials with state-approved pollution treatment clearances.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AGARTALA FACTORY LIVE OPERATIONS GALLERY */}
      <section id="factory-stream" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] font-bold font-mono bg-slate-900 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Live Operations & Sample Stream
            </span>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900 font-display mt-2">
              Our Nagicherra Compound in Photos
            </h3>
            <p className="text-slate-550 text-sm">
              Explore authentic glimpses of our actual processing plant, raw sun-drying yards, finished polymer granule packets, and heavy materials inventory in Tripura.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Image 1: 5 Grade samples */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between">
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-zoom-in" onClick={() => { setSelectedProductForInquiry(products[0]); setShowInquiryForm(true); }}>
                <ProductMedia photo="/products/granules-5grade.jpg" variant="granules" paletteKey="mixed" label="Grade Samples" seedKey="grade-samples" count={130} imgClassName="group-hover:scale-105 transition-transform duration-500 opacity-90" vizClassName="group-hover:scale-105 transition-transform duration-500 opacity-90" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/85 text-[9px] font-mono font-bold text-teal-400 rounded">Grade Samples</span>
              </div>
              <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs text-slate-800">5-Grade Sample Packets</h5>
                  <p className="text-[10px] text-slate-450 font-mono leading-normal uppercase">M/S N.D. Plastic Recycle Unit</p>
                  <p className="text-[11.5px] text-slate-550 leading-relaxed mt-1">Authentic labeled sacks with custom-formulated PP red, green, black resins and HDPE/LDPE reprocessed granules.</p>
                </div>
                <button 
                  onClick={() => { setSelectedProductForInquiry(products[0]); setShowInquiryForm(true); }}
                  className="mt-3 text-[10px] font-bold tracking-wider uppercase text-emerald-600 hover:text-emerald-700 text-left"
                >
                  Request Sample →
                </button>
              </div>
            </div>

            {/* Image 2: Hand of green granules */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between">
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-zoom-in" onClick={() => { setSelectedProductForInquiry(products[0]); setShowInquiryForm(true); }}>
                <ProductMedia photo="/products/granules-green.jpg" variant="granules" paletteKey="green" label="PP Green" seedKey="green-hand" count={130} imgClassName="group-hover:scale-105 transition-transform duration-500 opacity-90" vizClassName="group-hover:scale-105 transition-transform duration-500 opacity-90" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/85 text-[9px] font-mono font-bold text-emerald-400 rounded">In-Hand Check</span>
              </div>
              <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs text-slate-800">PP Green Pellets / Granules</h5>
                  <p className="text-[10px] text-slate-450 font-mono leading-normal uppercase">High MFI Injection Moulding</p>
                  <p className="text-[11.5px] text-slate-550 leading-relaxed mt-1">Brilliant, highly consistent recycled Polypropylene granules. Washed, hot compounded, and extruded to fit high strength requirements.</p>
                </div>
                <button 
                  onClick={() => { setSelectedProductForInquiry(products[0]); setShowInquiryForm(true); }}
                  className="mt-3 text-[10px] font-bold tracking-wider uppercase text-emerald-600 hover:text-emerald-700 text-left"
                >
                  Request Sample →
                </button>
              </div>
            </div>

            {/* Image 3: Hand of blue granules */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between">
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-zoom-in" onClick={() => { setSelectedProductForInquiry(products[0]); setShowInquiryForm(true); }}>
                <ProductMedia photo="/products/granules-blue.jpg" variant="granules" paletteKey="blue" label="PP Blue" seedKey="blue-hand" count={130} imgClassName="group-hover:scale-105 transition-transform duration-500 opacity-90" vizClassName="group-hover:scale-105 transition-transform duration-500 opacity-90" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/85 text-[9px] font-mono font-bold text-blue-400 rounded">In-Hand Check</span>
              </div>
              <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs text-slate-800">PP Blue Pellets / Granules</h5>
                  <p className="text-[10px] text-slate-450 font-mono leading-normal uppercase">Blow Moulding Spec Resins</p>
                  <p className="text-[11.5px] text-slate-550 leading-relaxed mt-1">Compounded with degassing vacuum lines to eliminate odor and maximize density, ensuring defect-free downstream processing.</p>
                </div>
                <button 
                  onClick={() => { setSelectedProductForInquiry(products[0]); setShowInquiryForm(true); }}
                  className="mt-3 text-[10px] font-bold tracking-wider uppercase text-emerald-600 hover:text-emerald-700 text-left"
                >
                  Request Sample →
                </button>
              </div>
            </div>

            {/* Image 4: Red, green and gray packets on coffee table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between">
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-zoom-in" onClick={() => { setSelectedProductForInquiry(products[0]); setShowInquiryForm(true); }}>
                <ProductMedia photo="/products/granules-trial.jpg" variant="granules" paletteKey="mixed" label="Trial Packs" seedKey="trial-packs" count={130} imgClassName="group-hover:scale-105 transition-transform duration-500 opacity-90" vizClassName="group-hover:scale-105 transition-transform duration-500 opacity-90" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/85 text-[9px] font-mono font-bold text-amber-500 rounded">Trial Packs</span>
              </div>
              <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs text-slate-800">Multi-grade Client Samples</h5>
                  <p className="text-[10px] text-slate-450 font-mono leading-normal uppercase">Free Sample Courier Service</p>
                  <p className="text-[11.5px] text-slate-550 leading-relaxed mt-1">Transparent packaged samples of PP & Polyethylene polymers prepared for testing by prospective plastic product factories.</p>
                </div>
                <button 
                  onClick={() => { setSelectedProductForInquiry(products[0]); setShowInquiryForm(true); }}
                  className="mt-3 text-[10px] font-bold tracking-wider uppercase text-emerald-600 hover:text-emerald-700 text-left"
                >
                  Request Sample →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            
            {/* Contact details card */}
            <div className={`md:col-span-5 p-8 text-white flex flex-col justify-between space-y-6 ${isEco ? 'bg-emerald-950' : 'bg-slate-900'}`}>
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">Reach N.D. Recycle Unit</h4>
                <h3 className="text-2xl font-bold font-display leading-tight">
                  Let us Discuss Your Polymer Granules Contract
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Have scrap plastics to sell? Or require high-tensile green and blue PP granules shipped to your factory floor in Tripura? We are eager to provide custom rates.
                </p>
              </div>

              {/* Concrete business parameters from OCR */}
              <div className="space-y-3 pt-4 border-t border-slate-850 text-xs">
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>ND Plastic Recycle Unit, Agartala</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Arabinda Colony, Nagicherra, Agartala, West Tripura 799004</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>+91 70053 24192</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Mon – Sat: 7:00 AM – 6:00 PM</span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl space-y-2">
                <p className="font-bold text-emerald-400 flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5 fill-current" /> Instant B2B WhatsApp Response
                </p>
                <p className="text-[11px] text-slate-300 leading-normal">
                  Are you operating a plastic molding factory? Tap below to send chemical specs, desired MFI ratios, or volume needs directly to owner N D on WhatsApp.
                </p>
                <a 
                  href={getWhatsAppUrl("Hello N D, we are looking for high-tensile Blue and Green PP granules for our plastic molding factory. Please share the MFI specs and bulk price sheet.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01]"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Chat Direct on WhatsApp</span>
                </a>
              </div>

              <div className="p-3 bg-emerald-900/60 border border-emerald-800/80 rounded-lg text-[10px]">
                <p className="font-bold text-emerald-300 mb-1">State Pollution Control Clearance</p>
                <p className="text-slate-300">Authorized by Tripura State Pollution Control Board for sustainable processing of thermoplastic scrap.</p>
              </div>
            </div>

            {/* Quote query form */}
            <div className="md:col-span-7 p-8">
              <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
                Send Bulk Inquiry to Owner (N D)
              </h4>
              <p className="text-slate-500 text-xs mb-6">
                Fill the details below. Our Agartala representatives respond within 24 working hours.
              </p>

              <form onSubmit={(e) => {
                setSelectedProductForInquiry(null);
                handleInquirySubmit(e);
              }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="form-buyer-name" className="text-xs font-semibold text-slate-700">Your Name *</label>
                    <input
                      id="form-buyer-name"
                      required
                      type="text"
                      placeholder="e.g. Joydeb Debbarma"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="form-company" className="text-xs font-semibold text-slate-700">Company (Optional)</label>
                    <input
                      id="form-company"
                      type="text"
                      placeholder="e.g. Tripura Polyware Industries"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="form-phone" className="text-xs font-semibold text-slate-700">Mobile Number *</label>
                    <input
                      id="form-phone"
                      required
                      type="tel"
                      placeholder="e.g. +91 94361 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-xs font-semibold text-slate-700">Email Address</label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form-notes" className="text-xs font-semibold text-slate-700">Requirement Notes / Preferred Colored Granules</label>
                  <textarea
                    id="form-notes"
                    rows={3}
                    placeholder="Describe target polymer requirements (PP, HDPE), required volume (in Metric Tons), and colors..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-500" /> Fast Response Guaranteed
                  </span>
                  
                  <button
                    required
                    type="submit"
                    className={`px-5 py-2 rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all ${primaryBgClass}`}
                  >
                    <span>Submit Request</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {inquirySuccess && (
                  <div id="inquiry-success-banner" className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Inquiry submitted! We have routed this plan to N D of ND Plastic Recycle Unit, Agartala.</span>
                  </div>
                )}
              </form>
            </div>

          </div>

          {/* Live location map */}
          <div className="mt-6 rounded-3xl overflow-hidden border border-slate-200 shadow-xs">
            <iframe
              title="N.D. Plastic Recycle Unit — Agartala location"
              className="w-full h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=23.8061487,91.3245506&z=16&output=embed"
            />
          </div>
        </div>
      </section>
      {showInquiryForm && selectedProductForInquiry && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-150 max-w-md w-full shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setShowInquiryForm(false);
                setSelectedVariantForInquiry(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Visual product preview block */}
            <div className="flex items-center gap-3 mb-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-150">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0 relative">
                <ProductMediaThumb
                  photo={selectedVariantForInquiry?.photo || selectedProductForInquiry.photo}
                  variant={selectedProductForInquiry.category === 'granules' ? 'granules' : 'product'}
                  paletteKey={selectedVariantForInquiry?.paletteKey || selectedProductForInquiry.paletteKey}
                  color={selectedProductForInquiry.color}
                  seedKey={selectedVariantForInquiry?.name || selectedProductForInquiry.id}
                  count={30}
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-bold font-mono text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-1.5 py-0.5 rounded w-max mb-0.5 uppercase tracking-wide">
                  {selectedVariantForInquiry ? 'Selected Grade' : 'Agartala Sample'}
                </span>
                <h4 className="text-sm font-bold text-slate-900 font-display truncate">
                  {selectedVariantForInquiry ? selectedVariantForInquiry.name : selectedProductForInquiry.name}
                </h4>
                <p className="text-xs text-slate-500 uppercase font-mono font-bold">{selectedProductForInquiry.price}</p>
              </div>
            </div>

            {/* Variant selector panel */}
            {selectedProductForInquiry.variants && selectedProductForInquiry.variants.length > 0 && (
              <div className="mb-4 space-y-1.5">
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Choose Granule Specifics</label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProductForInquiry.variants.map((v: any, idx: number) => {
                    const isSelected = selectedVariantForInquiry?.name === v.name;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedVariantForInquiry(v);
                          setNotes(`Please share Melt Flow Index (MFI) specifications, standard QC data sheets, current bulk rates per kg, and logistics to Tripura/neighboring estates for ${v.name}.`);
                        }}
                        className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 ${isSelected ? 'border-emerald-600 bg-emerald-50/45 ring-1 ring-emerald-600/30 shadow-none' : 'border-slate-150 hover:border-slate-300 hover:bg-slate-50'}`}
                      >
                        <div className="w-8 h-8 rounded-md flex-shrink-0 overflow-hidden">
                          <ProductMediaThumb photo={v.photo} variant="granules" paletteKey={v.paletteKey} seedKey={v.name} count={18} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700 leading-tight block truncate">{v.name.replace(' / Pellets', '')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label htmlFor="modal-name" className="text-xs font-semibold text-slate-700">Your Full Name *</label>
                <input
                  id="modal-name"
                  required
                  type="text"
                  placeholder="e.g. Joydeb Debbarma"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="modal-phone" className="text-xs font-semibold text-slate-700">Mobile Number *</label>
                  <input
                    id="modal-phone"
                    required
                    type="tel"
                    placeholder="e.g. +91 94361 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="modal-company" className="text-xs font-semibold text-slate-700">Company</label>
                  <input
                    id="modal-company"
                    type="text"
                    placeholder="Tripura Plastics"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="modal-email" className="text-xs font-semibold text-slate-700">Email Address</label>
                  <input
                    id="modal-email"
                    type="email"
                    placeholder="buyer@domain.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="modal-qty" className="text-xs font-semibold text-slate-700">Est. Quantity (Kg)</label>
                  <input
                    id="modal-qty"
                    type="text"
                    placeholder="5000"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Number(e.target.value) || 1000)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="modal-notes" className="text-xs font-semibold text-slate-700">Requirement Specifics</label>
                <textarea
                  id="modal-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Send price sheet for 5 Metric Tons PP granules..."
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all bg-slate-900 hover:bg-slate-850 text-white`}
                >
                  <span>Submit Web Form</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppUrl(`Hello N.D. (ND Plastic Recycle Unit), My name is ${buyerName || '[Name]'} ${companyName ? `from ${companyName}` : ''}. I want to inquire about: "${selectedVariantForInquiry ? `${selectedProductForInquiry.name} (${selectedVariantForInquiry.name})` : selectedProductForInquiry.name}".
- Estimated Quantity Needed: ${calcQuantity} Kg
- Mobile: ${phone || '[Mobile]'}
- Specific Notes: ${notes || 'Please share MFI specs, pricing, and sample delivery terms.'}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-100"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Send WhatsApp Inquiry</span>
                </a>
              </div>

              {inquirySuccess && (
                <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-[11px] text-center font-medium">
                  Inquiry sent successfully to N D!
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Humble Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Recycle className="w-5 h-5 text-emerald-500 animate-spin-slow" />
              <span className="text-base text-white tracking-tight font-bold font-display">ND PLASTIC RECYCLE UNIT</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Supporting clean communities across West Tripura. SPCB cleared thermoplastic pellet compounding unit in Nagicherra, Agartala.
            </p>
          </div>

          <div className="space-y-2.5">
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">Tripura Sourced Resins</h5>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
              <span>- Blue PP Granules</span>
              <span>- Green PP Granules</span>
              <span>- Colored Granules</span>
              <span>- Recycled Flakes</span>
              <span>- Sorting Bays</span>
              <span>- B2B Compounding</span>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200 font-display">Compliance Status</h5>
            <div className="bg-slate-850 border border-slate-800 p-3.5 rounded-xl space-y-1.5 text-xs text-slate-400">
              <p className="font-mono text-emerald-400 text-[10px] font-bold">● REGISTERED FACILITY</p>
              <p className="text-[11px]">Authorized safe sorting, size-reduction, and dry compounding of post-consumer PP thermoplastic waste.</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-850 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 N.D. Plastic Recycle Unit, Agartala. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Terms of Use</a>
          </div>
        </div>
      </footer>

      {/* Sticky Floating WhatsApp Button — circular icon on mobile, labelled pill on larger screens */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        <a
          href={getWhatsAppUrl("Hello N D, we are looking for a regular high-tensile Blue and Green PP granules supplier for our plastic molding factory process. Please share bulk rate terms.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="pointer-events-auto relative flex items-center justify-center sm:justify-start gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm w-14 h-14 sm:w-auto sm:h-auto sm:px-5 sm:py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 hover:shadow-emerald-300"
        >
          {/* Pulsing ring to draw attention */}
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping -z-10"></span>
          <MessageSquare className="w-6 h-6 sm:w-4 sm:h-4 fill-current flex-shrink-0" />
          <span className="hidden sm:inline">Chat on WhatsApp</span>
        </a>
      </div>

    </div>
  );
}
