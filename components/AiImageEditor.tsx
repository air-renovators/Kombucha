import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, X, Send } from 'lucide-react';

interface AiImageEditorProps {
  initialImageSrc: string;
  alt: string;
  className?: string;
}

const AiImageEditor: React.FC<AiImageEditorProps> = ({ initialImageSrc, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const [isEditing, setIsEditing] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let base64Data = '';
      if (imageSrc.startsWith('http')) {
          const response = await fetch(imageSrc, { mode: 'cors' });
          if (!response.ok) throw new Error('Failed to fetch image');
          const blob = await response.blob();
          base64Data = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                  const res = reader.result as string;
                  // Remove data:image/...;base64,
                  resolve(res.split(',')[1]);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
          });
      } else if (imageSrc.startsWith('data:')) {
          base64Data = imageSrc.split(',')[1];
      }

      if (!base64Data) throw new Error("Could not process image data");

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                {
                    inlineData: {
                        mimeType: 'image/jpeg',
                        data: base64Data
                    }
                },
                { text: prompt }
            ]
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
          setPrompt('');
          setIsEditing(false);
      } else {
          throw new Error('No image generated. The model might have returned text only.');
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to edit image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative group overflow-hidden bg-zini-beige ${className}`}>
        <img 
            src={imageSrc} 
            alt={alt} 
            className="w-full h-full object-cover" 
            crossOrigin="anonymous" 
        />
        
        {/* Edit Button Overlay */}
        <button 
            onClick={() => setIsEditing(true)}
            className="absolute bottom-6 right-6 bg-zini-green text-white p-3 rounded-sm shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10 flex items-center gap-2 border border-white/20"
        >
            <Sparkles className="w-4 h-4" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">Remix AI</span>
        </button>

        {/* Editing Interface Overlay */}
        {isEditing && (
            <div className="absolute inset-0 bg-zini-dark/95 backdrop-blur-md flex flex-col items-center justify-center p-8 z-20 animate-in fade-in duration-200">
                <button 
                    onClick={() => setIsEditing(false)}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
                >
                    <X className="w-6 h-6" />
                </button>
                
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-zini-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-6 h-6 text-zini-green" />
                        </div>
                        <h3 className="font-serif text-2xl text-white">Remix this visual</h3>
                        <p className="font-mono text-[10px] text-white/60 uppercase tracking-widest mt-2">Powered by Gemini 2.5</p>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="E.g. 'Add a retro film grain', 'Make it sunset', 'Remove the jar label'"
                                className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-zini-green focus:bg-white/10 transition-all resize-none h-28 rounded-sm"
                            />
                        </div>
                        <button 
                            onClick={handleEdit}
                            disabled={loading || !prompt.trim()}
                            className="w-full bg-zini-green text-white py-4 px-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-zini-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg rounded-sm"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Fermenting Pixels...
                                </>
                            ) : (
                                <>
                                    Generate <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                    {error && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-200 text-xs font-mono text-center">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default AiImageEditor;