import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { Star, Truck, Package, Info, ArrowRight } from 'lucide-react';
import SmartImageGenerator from '../components/SmartImageGenerator';

const ProductDetail: React.FC = () => {
  const product = PRODUCTS.find(p => p.id === 'starter-kit');
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-zini-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Gallery - Left (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-square bg-white p-6 shadow-xl relative">
              <div className="w-full h-full bg-zini-beige overflow-hidden">
                <SmartImageGenerator 
                  initialImageSrc={product.image} 
                  alt={product.name} 
                  defaultPrompt={`Professional product photography of ${product.name}. ${product.description}. Studio lighting, clean background, 4k resolution.`}
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute top-10 left-10 border border-zini-dark/20 px-3 py-1 bg-zini-cream/90 backdrop-blur">
                 <span className="font-mono text-[10px] uppercase tracking-widest text-zini-charcoal">Batch No. 042</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
               <div className="aspect-square bg-white p-3 shadow-md cursor-pointer hover:-translate-y-1 transition-transform">
                  <SmartImageGenerator 
                    initialImageSrc="https://picsum.photos/seed/201/300"
                    alt="Gallery 1"
                    defaultPrompt="Close up detail of a kombucha jar brass tap pouring amber liquid, high resolution macro photography."
                    className="w-full h-full object-cover grayscale" 
                  />
               </div>
               <div className="aspect-square bg-white p-3 shadow-md cursor-pointer hover:-translate-y-1 transition-transform">
                  <SmartImageGenerator 
                    initialImageSrc="https://picsum.photos/seed/202/300"
                    alt="Gallery 2"
                    defaultPrompt="Kombucha being poured into a crystal glass with ice and a slice of lemon, sunlight streaming through, refreshing vibe."
                    className="w-full h-full object-cover grayscale" 
                  />
               </div>
               <div className="aspect-square bg-white p-3 shadow-md cursor-pointer hover:-translate-y-1 transition-transform">
                  <SmartImageGenerator 
                    initialImageSrc="https://picsum.photos/seed/203/300"
                    alt="Gallery 3"
                    defaultPrompt="A happy person holding a Zini kombucha bottle on a beach at sunset, lifestyle photography."
                    className="w-full h-full object-cover grayscale" 
                  />
               </div>
            </div>
          </div>

          {/* Product Info - Right (5 cols) */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="mb-8 border-b border-zini-charcoal/10 pb-8">
               <h1 className="font-serif text-5xl text-zini-dark mb-4 leading-tight">
                 {product.name}
               </h1>
               <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl text-zini-green">R{product.price}</span>
                  <div className="flex items-center gap-1">
                     <span className="flex text-zini-green">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                     </span>
                     <span className="font-mono text-[10px] ml-2 text-zini-charcoal/50 uppercase">(24 Verified)</span>
                  </div>
               </div>
            </div>

            <div className="prose prose-stone mb-10">
               <p className="font-serif text-lg leading-relaxed text-zini-charcoal">
                  {product.description}
               </p>
               <p className="font-mono text-xs text-zini-charcoal/60 mt-4">
                  Sourced from the rolling hills of Mtunzini. Contains live, unpasteurized cultures.
               </p>
            </div>

            {/* Selector & Button */}
            <div className="flex gap-4 mb-10">
              <div className="flex items-center border border-zini-charcoal/20 bg-white w-32">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 text-zini-charcoal hover:bg-zini-beige transition-colors"
                >-</button>
                <div className="flex-1 text-center font-mono text-sm font-bold text-zini-charcoal">{qty}</div>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-3 text-zini-charcoal hover:bg-zini-beige transition-colors"
                >+</button>
              </div>
              <button 
                onClick={() => addToCart(product, qty)}
                className="flex-1 bg-zini-dark text-white font-mono text-xs font-bold uppercase tracking-[0.2em] py-3 hover:bg-zini-green transition-colors shadow-lg"
              >
                Add to Cart
              </button>
            </div>

            {/* Features Accordion Style */}
            <div className="space-y-6">
               <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-zini-charcoal/50 mb-4 border-b border-zini-charcoal/10 pb-2">Includes</h4>
                  <ul className="space-y-3">
                     {product.features?.slice(0, 5).map((f, i) => (
                        <li key={i} className="flex items-start text-sm font-serif italic text-zini-charcoal">
                           <span className="mr-3 text-zini-green">✓</span> {f}
                        </li>
                     ))}
                  </ul>
               </div>
               
               <div className="bg-white p-6 border border-zini-charcoal/5 shadow-sm mt-8">
                  <div className="flex items-start gap-4">
                     <Truck className="w-6 h-6 text-zini-green flex-shrink-0" />
                     <div>
                        <h5 className="font-serif font-bold text-zini-dark mb-1">Shipping from Mtunzini</h5>
                        <p className="font-mono text-[10px] text-zini-charcoal/60 uppercase tracking-wide leading-relaxed">
                           Free local pickup at the Zini conservancy.<br/>
                           National courier R99 (2-4 working days).
                        </p>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-32 border-t border-zini-charcoal/10 pt-20">
           <div className="text-center mb-16">
              <h2 className="font-serif text-3xl text-zini-dark mb-2">Cultured Opinions</h2>
              <p className="font-mono text-xs uppercase tracking-widest text-zini-charcoal/50">From the community</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-8 shadow-sm">
                  <div className="flex text-zini-green mb-4 text-xs">★★★★★</div>
                  <blockquote className="font-serif text-lg italic text-zini-charcoal mb-6">
                     "The guide makes it so easy. My first batch in Mtunzini was perfect. The SCOBY is massive and healthy."
                  </blockquote>
                  <cite className="font-mono text-[10px] uppercase tracking-widest text-zini-charcoal/50 not-italic">— Sarah J.</cite>
               </div>
               <div className="bg-white p-8 shadow-sm">
                  <div className="flex text-zini-green mb-4 text-xs">★★★★★</div>
                  <blockquote className="font-serif text-lg italic text-zini-charcoal mb-6">
                     "Finally real kombucha. Not that sugary soda water you buy at the supermarket. This is the real deal."
                  </blockquote>
                  <cite className="font-mono text-[10px] uppercase tracking-widest text-zini-charcoal/50 not-italic">— Mike D.</cite>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;