import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const { error: supabaseError } = await supabase
                .from('contact_inquiries')
                .insert([formData]);

            if (supabaseError) throw supabaseError;

            setIsSent(true);
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (err) {
            console.error('Contact error:', err);
            setError('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-zini-cream min-h-screen">

            {/* Header */}
            <div className="bg-zini-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-5xl md:text-6xl mb-4">Get in Touch</h1>
                    <p className="font-mono text-sm uppercase tracking-widest text-white/60">We'd love to hear from you</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div>
                        <h2 className="font-serif text-3xl text-zini-dark mb-8">Visit the Mercantile</h2>
                        <p className="font-sans text-zini-charcoal/80 mb-10 leading-relaxed">
                            Our brewery and mercantile are located in the heart of the Mtunzini Nature Conservancy.
                            Come for a tasting, pick up a Scoby, or just say hello to the monkeys.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <MapPin className="h-6 w-6 text-zini-green" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-mono font-bold uppercase text-zini-dark">Address</h3>
                                    <p className="mt-1 text-zini-charcoal/70">
                                        123 Kombucha Lane<br />
                                        Mtunzini, KwaZulu-Natal<br />
                                        3867, South Africa
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Phone className="h-6 w-6 text-zini-green" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-mono font-bold uppercase text-zini-dark">Phone</h3>
                                    <p className="mt-1 text-zini-charcoal/70">+27 (0) 82 123 4567</p>
                                    <p className="text-xs text-zini-charcoal/50 mt-1">Mon-Fri, 8am - 4pm</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Mail className="h-6 w-6 text-zini-green" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-mono font-bold uppercase text-zini-dark">Email</h3>
                                    <p className="mt-1 text-zini-charcoal/70">hello@zinikombucha.co.za</p>
                                    <p className="mt-1 text-zini-charcoal/70">wholesale@zinikombucha.co.za</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="mt-12 h-64 bg-zini-beige w-full relative overflow-hidden rounded-sm shadow-inner grayscale hover:grayscale-0 transition-all duration-700">
                            <img src="https://picsum.photos/seed/map/800/400" alt="Map Location" className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="bg-white/80 backdrop-blur px-4 py-2 text-zini-dark font-mono text-xs font-bold uppercase tracking-widest border border-zini-dark/10">Mtunzini, KZN</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-10 shadow-lg border border-zini-charcoal/5">
                        <h2 className="font-serif text-3xl text-zini-dark mb-2">Send a Message</h2>
                        <p className="font-mono text-xs text-zini-charcoal/50 uppercase tracking-widest mb-10">We usually respond within 24 hours</p>

                        {isSent ? (
                            <div className="bg-green-50 border border-green-200 rounded p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-serif text-zini-dark mb-2">Message Sent!</h3>
                                <p className="text-zini-charcoal/70">Thank you for reaching out. We'll get back to you shortly.</p>
                                <button
                                    onClick={() => setIsSent(false)}
                                    className="mt-6 text-zini-green font-mono text-xs font-bold uppercase tracking-widest border-b border-zini-green pb-1 hover:text-zini-dark hover:border-zini-dark transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3 bg-zini-cream/20"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3 bg-zini-cream/20"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3 bg-zini-cream/20"
                                    >
                                        <option>General Inquiry</option>
                                        <option>Wholesale / Stockist</option>
                                        <option>Order Support</option>
                                        <option>Press / Media</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3 bg-zini-cream/20"
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 font-mono text-[10px] text-center uppercase tracking-widest mb-4">
                                        {error}
                                    </p>
                                )}

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-zini-dark text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-zini-green transition-colors flex items-center justify-center shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>Sending <Loader2 className="ml-2 w-4 h-4 animate-spin" /></>
                                        ) : (
                                            <>Send Message <Send className="ml-2 w-4 h-4" /></>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
