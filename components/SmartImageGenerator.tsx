import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ImagePlus, Loader2, X, Send } from 'lucide-react';

interface SmartImageGeneratorProps {
  initialImageSrc: string;
  defaultPrompt: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

type ImageSize = '1K' | '2K' | '4K';

const SmartImageGenerator: React.FC<SmartImageGeneratorProps> = ({ 
  initialImageSrc, 
  defaultPrompt, 
  alt, 
  className,
  aspectRatio = "1:1" 
}) => {
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [size, setSize] = useState<ImageSize>('1K');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const win = window as any;
      if (win.aistudio) {
          const hasKey = await win.aistudio.hasSelectedApiKey();
          if (!hasKey) {
              await win.aistudio.openSelectKey();
          }
      }

      // Create new instance to ensure key is picked up
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
            parts: [{ text: prompt }]
        },
        config: {
            imageConfig: {
                aspectRatio: aspectRatio,
                imageSize: size
            }
        }
      });

      let newImageBase64 = '';
      if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
              if (part.inlineData && part.inlineData.data) {
                  newImageBase64 = part.inlineData.data;
                  break;
              }
          }
      }

      if (newImageBase64) {
          setImageSrc(`data:image/jpeg;base64,${newImageBase64}`);
          setIsPanelOpen(false);
      } else {
          throw new Error('No image generated. Please try a different prompt.');
      }

    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found")) {
           const win = window as any;
           if (win.aistudio) {
               await win.aistudio.openSelectKey();
           }
           setError("API Key session expired. Please select your key again.");
      } else {
           setError(err.message || 'Failed to generate image');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative group overflow-hidden bg-zini-beige ${className}`}>
        <img 
            src={imageSrc} 
            alt={alt} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            crossOrigin="anonymous" 
        />
        
        {/* Generate Button Overlay */}
        <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsPanelOpen(true);
            }}
            className="absolute top-4 right-4 bg-white/90 text-zini-dark p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-zini-green hover:text-white z-10"
            title="Generate with AI"
        >
            <ImagePlus className="w-5 h-5" />
        </button>

        {/* Generation Interface Overlay */}
        {isPanelOpen && (
            <div 
              className="absolute inset-0 bg-zini-dark/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-in fade-in duration-200 cursor-default"
              onClick={(e) => e.preventDefault()}
            >
                <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPanelOpen(false);
                    }}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
                >
                    <X className="w-6 h-6" />
                </button>
                
                <div className="w-full max-w-sm">
                    <div className="text-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-zini-green rounded-full flex items-center justify-center mx-auto mb-3">
                            <ImagePlus className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-serif text-xl text-white">Studio Gen</h3>
                        <p className="font-mono text-[9px] text-white/60 uppercase tracking-widest mt-1">Gemini 3 Pro • 4K Ready</p>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        {/* Size Selector */}
                        <div className="flex gap-2 justify-center mb-2">
                           {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                               <button
                                 key={s}
                                 onClick={() => setSize(s)}
                                 className={`px-3 py-1 text-[10px] font-mono font-bold border rounded-sm transition-colors ${size === s ? 'bg-zini-green border-zini-green text-white' : 'border-white/20 text-white/50 hover:border-white/50'}`}
                               >
                                   {s}
                               </button>
                           ))}
                        </div>

                        <div className="relative">
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe the image you want to generate..."
                                className="w-full bg-white/5 border border-white/10 p-4 font-mono text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-zini-green focus:bg-white/10 transition-all resize-none h-24 rounded-sm"
                            />
                        </div>

                        <button 
                            onClick={handleGenerate}
                            disabled={loading || !prompt.trim()}
                            className="w-full bg-white text-zini-dark py-3 px-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-zini-green hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg rounded-sm"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Rendering...
                                </>
                            ) : (
                                <>
                                    Generate Visual <Send className="w-3 h-3" />
                                </>
                            )}
                        </button>
                        
                        <div className="text-[9px] text-white/30 text-center px-4">
                           Requires a paid API key. Charges may apply for high-res generation. 
                           <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-white ml-1">Billing Info</a>
                        </div>
                    </div>
                    {error && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-200 text-[10px] font-mono text-center">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default SmartImageGenerator;