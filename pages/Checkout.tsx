import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SHIPPING_COST } from '../constants';
import { CheckoutFormData, PaymentMethod } from '../types';
import { CheckCircle, Truck, CreditCard, Lock, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

const Checkout: React.FC = () => {
    const { items, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const [formData, setFormData] = useState<CheckoutFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        paymentMethod: 'credit-card'
    });

    const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>('pickup');

    // Calculate totals - only add shipping if delivery is selected
    const shippingTotal = shippingMethod === 'delivery' ? SHIPPING_COST : 0;
    const orderTotal = cartTotal + shippingTotal;

    useEffect(() => {
        if (items.length === 0 && !orderComplete) {
            navigate('/cart');
        }
    }, [items, navigate, orderComplete]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handleSubmitStep2 = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
        window.scrollTo(0, 0);
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setOrderComplete(true);
            clearCart();
            window.scrollTo(0, 0);
        }, 2000);
    };

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-zini-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-12 shadow-2xl border-t-4 border-zini-green text-center">
                    <div className="w-20 h-20 bg-zini-green/10 rounded-full flex items-center justify-center mx-auto text-zini-green animate-bounce">
                        <CheckCircle className="h-10 w-10" />
                    </div>
                    <h2 className="mt-6 text-3xl font-serif text-zini-dark">Order Confirmed</h2>
                    <p className="font-serif italic text-zini-charcoal/80">Thank you for supporting Zini Kombucha. Your gut will thank you.</p>

                    <div className="bg-zini-beige/30 p-4 rounded-sm mt-6 text-left">
                        <p className="font-mono text-xs uppercase text-zini-charcoal/60 mb-1">Ship to:</p>
                        <p className="font-serif text-zini-dark">{formData.firstName} {formData.lastName}</p>
                        <p className="font-serif text-zini-dark text-sm">{formData.address}, {formData.city}</p>
                    </div>

                    <p className="font-mono text-xs uppercase tracking-widest text-zini-charcoal/40 mt-4">Order #ZINI-{Math.floor(Math.random() * 10000)}</p>

                    <div className="mt-10">
                        <Link to="/" className="text-zini-green font-mono font-bold text-xs uppercase tracking-[0.2em] hover:text-zini-dark border-b border-zini-green pb-1">Return to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zini-cream min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">

                    {/* Main Form Area */}
                    <div className="lg:col-span-7">
                        {/* Steps Indicator */}
                        <nav aria-label="Progress" className="mb-10">
                            <ol role="list" className="flex items-center">
                                <li className={`relative pr-8 sm:pr-20 ${step >= 1 ? 'text-zini-green' : 'text-gray-400'}`}>
                                    <div className="flex items-center">
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 1 ? 'border-zini-green bg-zini-green text-white' : 'border-gray-300'}`}>
                                            <span className="font-mono text-xs font-bold">1</span>
                                        </div>
                                        <span className="ml-4 text-sm font-medium font-mono uppercase tracking-widest hidden sm:inline">Details</span>
                                    </div>
                                    <div className={`absolute top-0 right-0 h-full w-5 flex items-center sm:w-16 ${step > 1 ? 'text-zini-green' : 'text-gray-300'}`}>
                                        <div className="h-0.5 w-full bg-current"></div>
                                    </div>
                                </li>
                                <li className={`relative pr-8 sm:pr-20 ${step >= 2 ? 'text-zini-green' : 'text-gray-400'}`}>
                                    <div className="flex items-center">
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 2 ? 'border-zini-green bg-zini-green text-white' : 'border-gray-300'}`}>
                                            <span className="font-mono text-xs font-bold">2</span>
                                        </div>
                                        <span className="ml-4 text-sm font-medium font-mono uppercase tracking-widest hidden sm:inline">Payment</span>
                                    </div>
                                    <div className={`absolute top-0 right-0 h-full w-5 flex items-center sm:w-16 ${step > 2 ? 'text-zini-green' : 'text-gray-300'}`}>
                                        <div className="h-0.5 w-full bg-current"></div>
                                    </div>
                                </li>
                                <li className={`relative ${step >= 3 ? 'text-zini-green' : 'text-gray-400'}`}>
                                    <div className="flex items-center">
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 3 ? 'border-zini-green bg-zini-green text-white' : 'border-gray-300'}`}>
                                            <span className="font-mono text-xs font-bold">3</span>
                                        </div>
                                        <span className="ml-4 text-sm font-medium font-mono uppercase tracking-widest hidden sm:inline">Review</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Step 1: Shipping Details */}
                        {step === 1 && (
                            <form onSubmit={handleSubmitStep1} className="bg-white p-8 shadow-sm border border-zini-charcoal/5">
                                <h2 className="font-serif text-2xl text-zini-dark mb-6">Contact Information</h2>
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <label htmlFor="firstName" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">First name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3"
                                        />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="lastName" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">Last name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">Email address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="phone" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3"
                                        />
                                    </div>

                                    <div className="sm:col-span-2 pt-6">
                                        <h2 className="font-serif text-2xl text-zini-dark mb-6">Shipping Method</h2>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                onClick={() => setShippingMethod('pickup')}
                                                className={`border-2 p-4 cursor-pointer transition-all ${shippingMethod === 'pickup'
                                                    ? 'border-zini-green bg-zini-green/5'
                                                    : 'border-zini-charcoal/20 hover:border-zini-charcoal/40'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-mono text-xs font-bold uppercase">Local Pickup</span>
                                                    <input
                                                        type="radio"
                                                        checked={shippingMethod === 'pickup'}
                                                        onChange={() => setShippingMethod('pickup')}
                                                        className="h-4 w-4 text-zini-green focus:ring-zini-green"
                                                    />
                                                </div>
                                                <p className="text-xs text-zini-charcoal/60">Collect from Mtunzini</p>
                                                <p className="font-mono text-sm font-bold text-zini-green mt-2">FREE</p>
                                            </div>

                                            <div
                                                onClick={() => setShippingMethod('delivery')}
                                                className={`border-2 p-4 cursor-pointer transition-all ${shippingMethod === 'delivery'
                                                    ? 'border-zini-green bg-zini-green/5'
                                                    : 'border-zini-charcoal/20 hover:border-zini-charcoal/40'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-mono text-xs font-bold uppercase">Delivery</span>
                                                    <input
                                                        type="radio"
                                                        checked={shippingMethod === 'delivery'}
                                                        onChange={() => setShippingMethod('delivery')}
                                                        className="h-4 w-4 text-zini-green focus:ring-zini-green"
                                                    />
                                                </div>
                                                <p className="text-xs text-zini-charcoal/60">Nationwide shipping</p>
                                                <p className="font-mono text-sm font-bold text-zini-dark mt-2">R{SHIPPING_COST}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {shippingMethod === 'delivery' && (
                                        <>
                                            <div className="sm:col-span-2 pt-6">
                                                <h2 className="font-serif text-2xl text-zini-dark mb-6">Shipping Address</h2>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="address" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    required={shippingMethod === 'delivery'}
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3"
                                                />
                                            </div>
                                            <div className="sm:col-span-1">
                                                <label htmlFor="city" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    required={shippingMethod === 'delivery'}
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3"
                                                />
                                            </div>
                                            <div className="sm:col-span-1">
                                                <label htmlFor="province" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">Province</label>
                                                <input
                                                    type="text"
                                                    name="province"
                                                    id="province"
                                                    required={shippingMethod === 'delivery'}
                                                    value={formData.province}
                                                    onChange={handleChange}
                                                    className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3"
                                                />
                                            </div>
                                            <div className="sm:col-span-1">
                                                <label htmlFor="postalCode" className="block text-xs font-mono font-bold text-zini-charcoal uppercase mb-1">Postal code</label>
                                                <input
                                                    type="text"
                                                    name="postalCode"
                                                    id="postalCode"
                                                    required={shippingMethod === 'delivery'}
                                                    value={formData.postalCode}
                                                    onChange={handleChange}
                                                    className="block w-full border-zini-charcoal/20 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm px-4 py-3"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {shippingMethod === 'pickup' && (
                                        <div className="sm:col-span-2 pt-6">
                                            <div className="bg-zini-green/10 border-l-4 border-zini-green p-4 rounded">
                                                <p className="font-mono text-xs font-bold uppercase text-zini-dark mb-2">Pickup Location</p>
                                                <p className="font-serif text-sm text-zini-charcoal">123 Kombucha Lane, Mtunzini Nature Conservancy, KwaZulu-Natal, 3867</p>
                                                <p className="font-mono text-xs text-zini-charcoal/60 mt-3">We'll contact you at <span className="font-bold text-zini-dark">{formData.phone || 'your phone number'}</span> to arrange pickup.</p>
                                            </div>
                                        </div>
                                    )}


                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-zini-dark text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-zini-green transition-colors flex items-center"
                                    >
                                        Continue to Payment <ArrowRight className="ml-2 w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <form onSubmit={handleSubmitStep2} className="bg-white p-8 shadow-sm border border-zini-charcoal/5">
                                <h2 className="font-serif text-2xl text-zini-dark mb-6">Payment Method</h2>

                                <div className="space-y-4 mb-8">
                                    <div className={`border p-4 flex items-center cursor-pointer transition-colors ${formData.paymentMethod === 'credit-card' ? 'border-zini-green bg-zini-green/5' : 'border-zini-charcoal/20'}`} onClick={() => setFormData({ ...formData, paymentMethod: 'credit-card' })}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="credit-card"
                                            checked={formData.paymentMethod === 'credit-card'}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-zini-green focus:ring-zini-green border-gray-300"
                                        />
                                        <div className="ml-3 flex items-center w-full justify-between">
                                            <span className="block text-sm font-medium text-zini-dark">Credit Card</span>
                                            <div className="flex space-x-2 text-zini-charcoal/40">
                                                <CreditCard className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`border p-4 flex items-center cursor-pointer transition-colors ${formData.paymentMethod === 'eft' ? 'border-zini-green bg-zini-green/5' : 'border-zini-charcoal/20'}`} onClick={() => setFormData({ ...formData, paymentMethod: 'eft' })}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="eft"
                                            checked={formData.paymentMethod === 'eft'}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-zini-green focus:ring-zini-green border-gray-300"
                                        />
                                        <div className="ml-3">
                                            <span className="block text-sm font-medium text-zini-dark">EFT / Bank Transfer</span>
                                        </div>
                                    </div>
                                </div>

                                {formData.paymentMethod === 'credit-card' && (
                                    <div className="space-y-4 animate-fadeIn">
                                        <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                                            <p className="text-xs text-gray-500 mb-2">Secure Simulation Mode</p>
                                            <div className="space-y-3">
                                                <input type="text" placeholder="Card Number" className="block w-full border-gray-300 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm rounded-md" disabled />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input type="text" placeholder="MM / YY" className="block w-full border-gray-300 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm rounded-md" disabled />
                                                    <input type="text" placeholder="CVC" className="block w-full border-gray-300 shadow-sm focus:ring-zini-green focus:border-zini-green sm:text-sm rounded-md" disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-8 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-zini-charcoal px-4 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:text-zini-green transition-colors flex items-center"
                                    >
                                        <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-zini-dark text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-zini-green transition-colors flex items-center"
                                    >
                                        Review Order <ArrowRight className="ml-2 w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Step 3: Review */}
                        {step === 3 && (
                            <div className="bg-white p-8 shadow-sm border border-zini-charcoal/5">
                                <h2 className="font-serif text-2xl text-zini-dark mb-6">Review Order</h2>

                                <div className="border-b border-gray-200 pb-6 mb-6">
                                    <h3 className="text-xs font-mono font-bold uppercase text-gray-500 mb-2">
                                        {shippingMethod === 'pickup' ? 'Pickup Details' : 'Shipping To'}
                                    </h3>
                                    <p className="text-sm text-zini-dark">{formData.firstName} {formData.lastName}</p>
                                    {shippingMethod === 'delivery' ? (
                                        <>
                                            <p className="text-sm text-zini-dark">{formData.address}</p>
                                            <p className="text-sm text-zini-dark">{formData.city}, {formData.province} {formData.postalCode}</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-zini-dark font-mono">Pickup from Mtunzini Mercantile</p>
                                    )}
                                    <p className="text-sm text-zini-dark">{formData.phone}</p>
                                </div>

                                <div className="border-b border-gray-200 pb-6 mb-6">
                                    <h3 className="text-xs font-mono font-bold uppercase text-gray-500 mb-2">Payment Method</h3>
                                    <p className="text-sm text-zini-dark capitalize">{formData.paymentMethod.replace('-', ' ')}</p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <h3 className="text-xs font-mono font-bold uppercase text-gray-500">Items</h3>
                                    {items.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center">
                                                <span className="font-bold text-zini-dark mr-2">{item.quantity}x</span>
                                                <span className="text-zini-dark">{item.name}</span>
                                            </div>
                                            <span className="font-mono text-zini-charcoal/80">R{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
                                    <span className="font-serif text-xl font-bold text-zini-dark">Total</span>
                                    <span className="font-mono text-xl font-bold text-zini-green">R{orderTotal}</span>
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="text-zini-charcoal px-4 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:text-zini-green transition-colors flex items-center"
                                    >
                                        <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={isProcessing}
                                        className="bg-zini-dark text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-zini-green transition-colors flex items-center shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? (
                                            <>Processing <Loader2 className="ml-2 w-4 h-4 animate-spin" /></>
                                        ) : (
                                            <>Place Order <CheckCircle className="ml-2 w-4 h-4" /></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Summary */}
                    <div className="mt-16 lg:mt-0 lg:col-span-5">
                        <div className="bg-gray-50 p-6 rounded-sm sticky top-24">
                            <h3 className="text-lg font-serif font-bold text-zini-dark mb-4">Order Summary</h3>
                            <div className="flow-root">
                                <dl className="-my-4 text-sm divide-y divide-gray-200">
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600">Subtotal</dt>
                                        <dd className="font-medium text-gray-900">R{cartTotal}</dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600">Shipping</dt>
                                        <dd className="font-medium text-gray-900">R{shippingTotal}</dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between border-t border-gray-200">
                                        <dt className="text-base font-bold text-gray-900">Order Total</dt>
                                        <dd className="text-base font-bold text-zini-green">R{orderTotal}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mt-6 flex items-center justify-center p-2 rounded border border-green-100 bg-green-50 text-green-800 text-xs">
                                <Lock className="w-3 h-3 mr-2" />
                                Secure Bank-grade Encryption
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
