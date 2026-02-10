import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { PRODUCTS, FLAVOURS } from '../constants';
import { useCart } from '../context/CartContext';
import AiImageEditor from '../components/AiImageEditor';
import SmartImageGenerator from '../components/SmartImageGenerator';

// Configuration for the new Flavor Discovery layout
const FLAVOR_CONFIG: Record<string, {
   bg: string;
   text: string;
   accent: string;
   ingredients: string[];
   tagline: string;
   prompt: string;
}> = {
   'rooibos-boost': {
      bg: 'bg-[#b93c3c]', // Deep Red / Terracotta
      text: 'text-white',
      accent: 'border-white/40 text-white',
      ingredients: ['Organic Rooibos', 'Ginger', 'Hibiscus'],
      tagline: 'Warm & Restorative',
      prompt: 'Hand holding a glass bottle of amber reddish rooibos kombucha, vibrant deep red background, studio photography, soft lighting, 4k, photorealistic'
   },
   'berry-kick': {
      bg: 'bg-[#d8b4e2]', // Lavender
      text: 'text-zini-dark',
      accent: 'border-zini-dark/40 text-zini-dark',
      ingredients: ['Mixed Berries', 'Acai', 'Lavender'],
      tagline: 'Fruity & Antioxidant',
      prompt: 'Hand holding a glass bottle of purple berry kombucha, pastel lavender background, studio photography, soft lighting, 4k, photorealistic'
   },
   'cool-kick': {
      bg: 'bg-[#b5e48c]', // Light Green
      text: 'text-zini-dark',
      accent: 'border-zini-dark/40 text-zini-dark',
      ingredients: ['Cucumber', 'Lemon', 'Mint'],
      tagline: 'Crisp & Hydrating',
      prompt: 'Hand holding a glass bottle of light green cucumber kombucha, pastel lime green background, studio photography, soft lighting, 4k, photorealistic'
   }
};

const Home: React.FC = () => {
   const { addToCart } = useCart();

   // Find products for display
   const starterKit = PRODUCTS.find(p => p.id === 'starter-kit');

   // Specific order: Rooibos, Berry, Cool to match image layout
   const featuredFlavors = [
      FLAVOURS.find(f => f.id === 'rooibos-boost'),
      FLAVOURS.find(f => f.id === 'berry-kick'),
      FLAVOURS.find(f => f.id === 'cool-kick'),
   ].filter((f): f is typeof FLAVOURS[0] => !!f);

   return (
      <div className="bg-zini-cream">
         {/* Hero Section */}
         <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-mist-gradient bg-grain">
            {/* Decorative Grid Lines - subtle */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1C2321 1px, transparent 1px), linear-gradient(90deg, #1C2321 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-20">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                  {/* Left: AI Editable Hero Image - Tilted */}
                  <div className="relative order-2 lg:order-1">
                     <div className="relative z-10 transform -rotate-3 transition-transform duration-700 hover:rotate-0">
                        <div className="aspect-square bg-zini-beige shadow-2xl p-4 border border-white/10 relative overflow-hidden">
                           <SmartImageGenerator
                              initialImageSrc="/images/starter-kit-hero.png"
                              alt="Zini Kombucha Starter Kit"
                              defaultPrompt="Professional studio photography of a comprehensive Kombucha Starter Kit. Includes a 2L glass fermentation jar with a visible scoby and amber liquid, a breathable cotton cloth cover with a rubber band, a wooden spoon, and a recipe card. Set against a soft beige background with natural lighting, 4k, high detail."
                              className="w-full h-full shadow-inner"
                           />

                           {/* Decorative Badge Overlay (outside the editor to avoid being edited) */}
                           <div className="absolute top-8 left-8 bg-zini-green text-white px-3 py-1 shadow-lg pointer-events-none">
                              <span className="font-mono text-[10px] uppercase tracking-widest">Interactive Visual</span>
                           </div>
                        </div>
                     </div>
                     {/* Background decorative elements */}
                     <div className="absolute top-10 -right-10 w-full h-full border-2 border-zini-sage/30 rounded-sm -z-10"></div>
                  </div>

                  {/* Right: Typography */}
                  <div className="order-1 lg:order-2 text-center lg:text-left">
                     <div className="inline-block border border-zini-charcoal/30 px-3 py-1 mb-6">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-zini-charcoal/80">Batch No. 042 – Limited Release</span>
                     </div>

                     <h1 className="font-serif text-5xl md:text-7xl text-zini-dark leading-[1.1] mb-6">
                        The Kit That <br />
                        <span className="italic text-zini-green">Kicks Ass.</span>
                     </h1>

                     <p className="font-sans text-zini-charcoal/70 text-lg leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
                        Premium home brewing for the bold. Our heirloom SCOBY and wild-harvested teas from Mtunzini ensure a fermentation that's as raw as it is refined.
                     </p>

                     <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                           to="/starter-kit"
                           className="bg-zini-charcoal text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-zini-green transition-colors shadow-lg"
                        >
                           Secure Your Kit
                        </Link>
                        <Link
                           to="/our-story"
                           className="border border-zini-charcoal/30 text-zini-charcoal px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                        >
                           The Process
                        </Link>
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* Redesigned Flavor Discovery Section */}
         <section className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
               {featuredFlavors.map((flavor, index) => {
                  const config = FLAVOR_CONFIG[flavor.id] || FLAVOR_CONFIG['cool-kick'];

                  // Map flavor IDs to local images
                  let localImage = '/images/cool-kick.png';
                  if (flavor.id === 'rooibos-boost') localImage = '/images/rooibos-boost.png';
                  if (flavor.id === 'berry-kick') localImage = '/images/berry-kick.png';
                  if (flavor.id === 'cool-kick') localImage = '/images/cool-kick.png';

                  return (
                     <Link to="/shop" key={index} className={`group block relative overflow-hidden ${config.bg} transition-colors min-h-[80vh] flex flex-col items-center pt-20 pb-10 px-6`}>

                        {/* Header */}
                        <div className="text-center mb-6 z-10">
                           <h3 className={`font-serif text-4xl md:text-5xl font-bold mb-3 ${config.text}`}>
                              {flavor.name.split(' ')[0]}<br />
                              {flavor.name.split(' ')[1]}
                           </h3>
                           <p className={`font-mono text-xs uppercase tracking-widest opacity-80 ${config.text}`}>
                              {config.tagline}
                           </p>
                        </div>

                        {/* Ingredients Pills */}
                        <div className="flex flex-col gap-2 items-center mb-10 z-10 w-full max-w-[200px]">
                           {config.ingredients.map((ing, i) => (
                              <div
                                 key={i}
                                 className={`w-full py-2 px-4 rounded-full border ${config.accent} text-center font-mono text-xs font-bold uppercase bg-white/10 backdrop-blur-sm`}
                              >
                                 {ing}
                              </div>
                           ))}
                        </div>

                        {/* Image */}
                        <div className="flex-1 w-full relative flex items-end justify-center">
                           <div className="w-full max-w-[400px] aspect-[3/4] relative z-0 transform translate-y-12 transition-transform duration-700 group-hover:translate-y-6">
                              <SmartImageGenerator
                                 initialImageSrc={localImage}
                                 alt={`${flavor.name} held in hand`}
                                 defaultPrompt={config.prompt}
                                 className="w-full h-full object-cover mix-blend-normal"
                                 aspectRatio="3:4"
                              />
                           </div>
                        </div>
                     </Link>
                  );
               })}
            </div>

            {/* Bottom Banner */}
            <div className="bg-black text-white py-12 px-6">
               <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                     <h2 className="font-serif text-3xl font-bold uppercase tracking-wide mb-2">Refresh & Revitalize</h2>
                     <p className="font-mono text-sm text-white/70">Sip the vibrant flavors of nature.</p>
                  </div>

                  <Link
                     to="/shop"
                     className="bg-[#b93c3c] hover:bg-white hover:text-[#b93c3c] text-white px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-colors"
                  >
                     Shop Now
                  </Link>
               </div>
            </div>
         </section>

         {/* The Mercantile Section (Dark) */}
         <section className="bg-gradient-to-br from-[#5E7468] to-[#99A794] py-20 md:py-32 text-zini-cream relative overflow-hidden">
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-zini-dark/10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

                  {/* Image Side */}
                  <div className="relative order-2 md:order-1">
                     <div className="bg-zini-dark p-2 shadow-2xl transform rotate-1">
                        <SmartImageGenerator
                           initialImageSrc="/images/mercantile-equipment.png"
                           alt="Mercantile Brewing Equipment"
                           defaultPrompt="A collection of premium kombucha brewing equipment on a dark wooden table. Includes a glass carboy, linen cloths, ph test strips, and a thermometer. Moody lighting, high contrast, cinematic composition, photorealistic."
                           className="w-full grayscale contrast-125"
                        />
                     </div>
                  </div>

                  {/* Text Side */}
                  <div className="order-1 md:order-2">
                     <h2 className="font-serif text-4xl md:text-5xl text-zini-dark mb-6 md:mb-8">The Mercantile</h2>
                     <p className="font-mono text-sm leading-relaxed text-zini-dark/80 mb-8 md:mb-10 max-w-md">
                        We believe in the physical artifacts of brewing. Every jar, every cloth, and every bag of sugar has been tested in our Mtunzini laboratory to ensure your home brew never fails.
                     </p>

                     <ul className="space-y-4 mb-10 md:mb-12">
                        {[
                           '1 Gallon Glass Carboy',
                           'Breathable Linen Covers',
                           'Precision PH Test Strips',
                           'Temperature Monitoring Strips'
                        ].map((item, i) => (
                           <li key={i} className="flex items-center space-x-3 group">
                              <div className="w-5 h-5 rounded-full bg-zini-green text-zini-cream flex items-center justify-center">
                                 <CheckCircle className="w-3 h-3" />
                              </div>
                              <span className="font-mono text-xs uppercase tracking-wider text-zini-dark/70 group-hover:text-zini-dark transition-colors">{item}</span>
                           </li>
                        ))}
                     </ul>

                     <Link to="/shop" className="group inline-flex items-center text-zini-dark font-serif italic text-xl border-b border-zini-dark/30 hover:border-zini-dark transition-colors pb-1">
                        Shop The Collection
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                     </Link>
                  </div>

               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-20 md:py-24 bg-zini-cream text-center border-t border-zini-charcoal/5">
            <div className="max-w-3xl mx-auto px-4">
               <p className="font-mono text-xs uppercase tracking-widest text-zini-green mb-4">Native to Mtunzini</p>
               <h2 className="font-serif text-4xl md:text-5xl text-zini-dark mb-8">Start your fermentation journey today.</h2>
               <Link
                  to="/starter-kit"
                  className="inline-block bg-zini-green text-white px-10 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-zini-charcoal transition-colors shadow-xl"
               >
                  Order Kit – R390
               </Link>
            </div>
         </section>
      </div>
   );
};

export default Home;