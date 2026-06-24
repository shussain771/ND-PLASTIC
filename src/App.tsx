import React, { useState } from 'react';
import { DiscoveryBrief, Product, Inquiry } from './types';
import { INITIAL_PRODUCTS } from './data';
import CompanyWebsite from './components/CompanyWebsite';

const DEFAULT_BRIEF: DiscoveryBrief = {
  targetAudience: 'both',
  capacity: '1t-5t',
  machineryShown: true,
  visualTheme: 'eco',
  primaryContactMethod: 'whatsapp',
  additionalRequirements: 'SPCB consent granted. Registered Tripura SSI unit. GST state code 16 compliant.',
  selectedColorAccent: '#16a34a'
};

export default function App() {
  const [brief] = useState<DiscoveryBrief>(DEFAULT_BRIEF);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [, setInquiries] = useState<Inquiry[]>([]);
  
  const handleAddInquiry = (newInquiry: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => {
    const freshInquiry: Inquiry = {
      ...newInquiry,
      id: `inq-${Date.now()}`,
      status: 'pending',
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    };
    setInquiries(prev => [freshInquiry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-white">
      <CompanyWebsite 
        brief={brief}
        products={products}
        onAddInquiry={handleAddInquiry}
      />
    </div>
  );
}
