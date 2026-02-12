import React from 'react';
import SmartImageGenerator from '../components/SmartImageGenerator';

const OurStory: React.FC = () => {
  return (
    <div className="bg-zini-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zini-green block mb-4">Our Scoby</span>
          <h1 className="font-serif text-6xl md:text-7xl text-zini-dark leading-none">
            Brewed the<br />Traditional Way.
          </h1>
        </div>

        <div className="prose prose-lg prose-stone mx-auto text-zini-charcoal leading-loose text-center md:text-left font-serif">
          <p className="text-xl md:text-2xl italic text-zini-dark mb-12 text-center">
            Founded by Marina Nel, this kombucha is brewed slowly and naturally in Mtunzini’s warm coastal climate.
          </p>

          <div className="aspect-video w-full p-4 bg-white shadow-xl rotate-1 my-16">
            <div className="w-full h-full bg-zini-beige overflow-hidden relative">
              <SmartImageGenerator
                initialImageSrc="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"
                alt="Marina brewing kombucha"
                defaultPrompt="A professional lifestyle photograph of a female artisan brewer in a minimalist, sun-drenched coastal kitchen in South Africa. She is inspecting a large glass fermentation jar of amber kombucha. Warm, natural lighting, soft shadows, 4k, photorealistic, cinematic composition."
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-zini-charcoal/10 my-12">
            <div className="text-center">
              <span className="block font-mono font-bold text-lg text-zini-green mb-2">No Pasteurization</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zini-charcoal/60">Raw & Alive</span>
            </div>
            <div className="text-center">
              <span className="block font-mono font-bold text-lg text-zini-green mb-2">No Artificials</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zini-charcoal/60">Natural Fizz</span>
            </div>
            <div className="text-center">
              <span className="block font-mono font-bold text-lg text-zini-green mb-2">No Shortcuts</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zini-charcoal/60">Slow Brew</span>
            </div>
          </div>

          <p className="mb-6">
            Just tea, sugar, time, and a living culture. We believe in letting nature do the work. The warm air of Mtunzini provides the perfect incubation for our SCOBYs to thrive, creating a beverage that is rich in probiotics and enzymes.
          </p>
          <p className="mb-6">
            This is fermentation as it should be — <strong className="text-zini-dark">raw, bold, and alive.</strong>
          </p>

        </div>

        <div className="mt-24 grid grid-cols-2 gap-8">
          <div className="bg-white p-3 shadow-lg transform -rotate-2">
            <SmartImageGenerator
              initialImageSrc="https://images.unsplash.com/photo-1544787210-2213d44ad53e?q=80&w=1974&auto=format&fit=crop"
              alt="Raw Ingredients"
              defaultPrompt="Macro photography of organic loose-leaf tea and raw cane sugar crystals. Earthy tones, high texture detail, shallow depth of field, minimalist aesthetic, 4k."
              className="w-full h-auto object-cover grayscale"
            />
          </div>
          <div className="bg-white p-3 shadow-lg transform rotate-2 mt-12">
            <SmartImageGenerator
              initialImageSrc="https://images.unsplash.com/photo-1589135084988-d4ee9f090956?q=80&w=1974&auto=format&fit=crop"
              alt="Scoby Close up"
              defaultPrompt="Macro shot of a vibrant, healthy, and glistening kombucha SCOBY culture in a glass jar. Minimalist, clean, neutral background, high resolution, scientific art style."
              className="w-full h-auto object-cover grayscale"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurStory;