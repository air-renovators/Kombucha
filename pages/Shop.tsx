import React, { useState } from 'react';
import { FLAVOURS, PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { Utensils, Leaf, Flower, Minus, Plus, ShoppingCart, Award, Zap, BadgeCheck, Coffee } from 'lucide-react';
import { Product } from '../types';

const SIZES = [
  { label: '330ml', price: 19 },
  { label: '440ml', price: 25 },
  { label: '1L', price: 42 },
];

const Shop: React.FC = () => {
  const { addToCart } = useCart();

  // State to track selection for each flavor card independently
  const [cardStates, setCardStates] = useState<Record<string, { sizeIdx: number; qty: number }>>(() => {
    const initial: Record<string, { sizeIdx: number; qty: number }> = {};
    FLAVOURS.forEach(f => {
      initial[f.id] = { sizeIdx: 0, qty: 1 };
    });
    return initial;
  });

  const updateCardState = (id: string, field: 'sizeIdx' | 'qty', value: number) => {
    setCardStates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleAddToCart = (flavorId: string) => {
    const flavor = FLAVOURS.find(f => f.id === flavorId);
    const state = cardStates[flavorId];
    const sizeConfig = SIZES[state.sizeIdx];

    if (!flavor) return;

    // Construct a product object for the cart
    // Map flavor IDs to local images
    let localImage = '/images/cool-kick.png';
    if (flavor.id === 'rooibos-boost') localImage = '/images/rooibos-boost.png';
    if (flavor.id === 'berry-kick') localImage = '/images/berry-kick.png';
    if (flavor.id === 'cool-kick') localImage = '/images/cool-kick.png';
    if (flavor.id === 'black-boost') localImage = '/images/rooibos-boost.png'; // Fallback for black tea

    const productToAdd: Product = {
      id: `${flavor.id}-${sizeConfig.label}`, // Unique ID for this variant
      name: `${flavor.name} - ${sizeConfig.label}`,
      price: sizeConfig.price,
      image: localImage,
      category: 'drink',
      shortDesc: flavor.desc,
      size: sizeConfig.label,
      flavor: flavor.name,
      description: `${flavor.subtitle}. ${flavor.desc}`,
      availability: 'In Stock'
    };

    addToCart(productToAdd, state.qty);
  };

  const getProductImage = (flavorId: string, sizeLabel: string) => {
    // Exact match for generated images
    if (flavorId === 'berry-kick' && sizeLabel === '440ml') return '/images/berry-kick-440.png';
    if (flavorId === 'cool-kick' && sizeLabel === '330ml') return '/images/cool-kick-330.png';

    // Fallbacks based on flavor
    switch (flavorId) {
      case 'cool-kick': return '/images/cool-kick.png';
      case 'berry-kick': return '/images/berry-kick.png';
      case 'rooibos-boost': return '/images/rooibos-boost.png';
      case 'black-boost': return '/images/rooibos-boost.png'; // Black tea fallback
      default: return '/images/cool-kick.png';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'utensils': return <Utensils className="w-12 h-12 text-zini-green opacity-80" />;
      case 'leaf': return <Leaf className="w-12 h-12 text-[#8b5a2b] opacity-80" />; // Earthy brown for Rooibos
      case 'flower': return <Flower className="w-12 h-12 text-[#804070] opacity-80" />; // Berry color
      case 'cup': return <Coffee className="w-12 h-12 text-[#3e3a35] opacity-80" />; // Dark grey for Black Tea
      default: return <Zap className="w-12 h-12 text-zini-dark" />;
    }
  };

  return (
    <div className="bg-[#bda682] min-h-screen relative overflow-hidden font-mono">
      {/* Background Texture/Gradient Overlay to match the 'cardboard/paper' feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#cbb593] via-[#bda682] to-[#a89270] opacity-90 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] pointer-events-none mix-blend-multiply"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="font-mono text-5xl md:text-7xl text-[#3e3a35] font-bold tracking-tight mb-4 uppercase" style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.1)' }}>
            Freshly Tapped
          </h1>
          <div className="w-24 h-1 bg-[#4A6C47] mx-auto mb-6"></div>
          <p className="font-serif italic text-[#3e3a35] text-lg max-w-2xl mx-auto">
            Hand-crafted kombucha from our mercantile to your door.<br />
            Small batch, big bubbles.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLAVOURS.map((flavor) => {
            const state = cardStates[flavor.id] || { sizeIdx: 0, qty: 1 };
            const currentSize = SIZES[state.sizeIdx];

            return (
              <div key={flavor.id} className="bg-[#dccbb1] rounded-sm shadow-xl overflow-hidden flex flex-col transform transition-transform hover:-translate-y-1 duration-300">

                {/* Top Half: Icon & Color */}
                <div className={`${flavor.color} aspect-square p-8 flex flex-col items-center justify-center relative border-b-4 border-black/5`}>
                  {/* Tag */}
                  <div className="absolute top-0 right-6 bg-white px-3 py-1 shadow-sm z-20">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/70">
                      {flavor.subtitle}
                    </span>
                  </div>

                  {/* Dynamic Product Image */}
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    {/* 
                          DYNAMIC IMAGE LOGIC:
                          We attempt to show the specific size image if available.
                          Currently only 'cool-kick-330' is generated.
                          Others fall back to the main flavor image.
                        */}
                    <img
                      src={getProductImage(flavor.id, currentSize.label)}
                      alt={`${flavor.name} ${currentSize.label}`}
                      className="max-h-full max-w-full object-contain drop-shadow-2xl transform transition-transform duration-500 hover:scale-105"
                      key={`${flavor.id}-${currentSize.label}`}
                    />
                  </div>
                </div>

                {/* Bottom Half: Info & Controls */}
                <div className="p-6 bg-[#dccbb1] flex-1 flex flex-col min-h-[200px]">
                  <h3 className="font-mono font-bold text-xl md:text-2xl text-[#2c2925] mb-1 uppercase leading-tight min-h-[3rem] flex items-center">
                    {flavor.name}
                  </h3>
                  <p className="font-mono text-[10px] font-bold text-[#4A6C47] uppercase tracking-widest mb-4 h-8 flex items-center overflow-hidden">
                    {flavor.desc}
                  </p>

                  <div className="space-y-4 mt-auto">
                    {/* Size Selector */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase font-bold text-[#2c2925]/60 mb-1">Select Size</label>
                      <div className="relative">
                        <select
                          value={state.sizeIdx}
                          onChange={(e) => updateCardState(flavor.id, 'sizeIdx', Number(e.target.value))}
                          className="w-full appearance-none bg-[#e8dec9] border-none rounded-sm py-3 px-4 font-mono text-xs text-[#2c2925] font-bold focus:ring-2 focus:ring-[#4A6C47] cursor-pointer"
                        >
                          {SIZES.map((size, idx) => (
                            <option key={size.label} value={idx}>
                              {size.label} - R{size.price}.00
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-3 h-3 text-[#2c2925]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex gap-3">
                      {/* Qty */}
                      <div className="flex items-center bg-[#e8dec9] rounded-sm">
                        <button
                          onClick={() => updateCardState(flavor.id, 'qty', Math.max(1, state.qty - 1))}
                          className="px-3 py-3 hover:text-[#4A6C47] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold min-w-[1.5rem] text-center">{state.qty}</span>
                        <button
                          onClick={() => updateCardState(flavor.id, 'qty', state.qty + 1)}
                          className="px-3 py-3 hover:text-[#4A6C47] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => handleAddToCart(flavor.id)}
                        className="flex-1 bg-[#5e4b3e] text-[#e8dec9] font-mono text-xs font-bold uppercase tracking-widest py-3 rounded-sm hover:bg-[#4a3b31] transition-colors flex items-center justify-center gap-2 shadow-lg active:transform active:scale-95"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brewing Philosophy Section */}
        <div className="mt-24 pt-12 border-t border-dashed border-[#3e3a35]/20 flex flex-col md:flex-row justify-between items-end gap-12 text-[#3e3a35]">
          <div className="max-w-lg">
            <h4 className="font-serif font-bold text-2xl mb-4">Brewing Philosophy</h4>
            <p className="font-sans text-sm leading-relaxed opacity-80">
              Every bottle is carbonated naturally through secondary fermentation. We never add artificial colors or flavors. Keep refrigerated. Best enjoyed cold under a summer sun or a cozy porch in Zini.
            </p>
          </div>

          <div className="flex gap-6">
            <div className="w-20 h-20 rounded-full border-2 border-[#3e3a35]/30 flex flex-col items-center justify-center text-center p-2 transform -rotate-12">
              <span className="font-mono text-[8px] font-bold uppercase leading-tight">Organic<br />Certified</span>
            </div>
            <div className="w-20 h-20 rounded-full border-2 border-[#4A6C47] text-[#4A6C47] flex flex-col items-center justify-center text-center p-2 transform rotate-6 bg-[#4A6C47]/10">
              <span className="font-mono text-[8px] font-bold uppercase leading-tight">Live<br />Cultures</span>
            </div>
            <div className="w-20 h-20 rounded-full border-2 border-[#3e3a35]/30 flex flex-col items-center justify-center text-center p-2 transform -rotate-3">
              <span className="font-mono text-[8px] font-bold uppercase leading-tight">Small<br />Batch</span>
            </div>
          </div>
        </div>

        {/* Footer Details */}
        <div className="mt-20 pt-8 border-t border-[#3e3a35]/20 grid grid-cols-1 md:grid-cols-2 gap-8 text-[#3e3a35]">
          <div>
            <h5 className="font-mono font-bold text-sm uppercase tracking-widest mb-4">Zini Mercantile</h5>
            <p className="font-mono text-[10px] opacity-60 leading-relaxed">
              123 Kombucha Lane<br />
              Mtunzini Nature Conservancy<br />
              KwaZulu-Natal, 3867
            </p>
          </div>
          <div className="md:text-right">
            <p className="font-serif italic text-lg opacity-80">Made with <span className="text-[#4A6C47]">♥</span> in Mtunzini</p>
            <p className="font-mono text-[10px] opacity-50 mt-2">Established 2021</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Shop;