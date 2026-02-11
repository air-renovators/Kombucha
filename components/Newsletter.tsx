import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          setStatus('success');
          setMessage('You are already subscribed!');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage('Welcome to the notebook!');
        setEmail('');
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="newsletter" className="py-24 bg-zini-dark text-zini-cream relative overflow-hidden border-t border-white/5">
      {/* Abstract bg element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-zini-green rounded-full filter blur-[120px] opacity-20 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-zini-green"></div>
              <span className="font-mono text-xs text-zini-green uppercase tracking-[0.2em]">
                The Alchemist's Notebook
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight text-white">
              Unlock the flavor<br />
              <span className="italic text-zini-green">vibes.</span>
            </h2>
            <p className="font-sans text-zini-cream/70 text-lg leading-relaxed mb-8 max-w-xl">
              Sign up to receive our exclusive <strong>Zini Brewing Guide</strong>.
              We'll teach you how to infuse the cucumber crispness of the <em>Cool Kick</em>, achieve the wild fizz of the <em>Berry Kick</em>, and balance the earthy tones of our <em>Rooibos</em>.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-zini-cream/40">
              <span>• Seasonal Recipes</span>
              <span>• Fermentation Tips</span>
              <span>• Early Access</span>
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-10 rounded-sm backdrop-blur-sm border border-white/10 relative">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-zini-green/50"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-zini-green/50"></div>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in duration-500">
                <CheckCircle2 className="w-16 h-16 text-zini-green mb-4" />
                <h3 className="font-serif text-3xl text-white mb-2">You're in!</h3>
                <p className="font-mono text-sm text-zini-cream/60 uppercase tracking-widest">{message}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 font-mono text-xs text-zini-green border-b border-zini-green pb-1 uppercase tracking-widest hover:text-white hover:border-white transition-colors"
                >
                  Join another email
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zini-cream/50 group-focus-within:text-zini-green transition-colors" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-white/10 border border-white/20 py-5 pl-12 pr-4 font-mono text-sm text-white placeholder:text-zini-cream/30 focus:outline-none focus:border-zini-green focus:bg-white/15 transition-all disabled:opacity-50"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-zini-green text-white py-5 px-6 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-zini-dark transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-zini-green/20 disabled:bg-zini-cream/10 disabled:text-zini-cream/30"
                >
                  {status === 'loading' ? (
                    <>Processing <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Get The Full Guide <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 font-mono text-[10px] text-center uppercase tracking-widest mt-2">
                    {message}
                  </p>
                )}
              </form>
            )}
            <p className="font-mono text-[10px] text-zini-cream/30 mt-6 text-center uppercase tracking-widest">
              Join 2,000+ brewers. Unsubscribe anytime.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;