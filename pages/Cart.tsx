import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Lock, ArrowRight } from 'lucide-react';
import { SHIPPING_COST } from '../constants';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>('pickup');


  const finalTotal = cartTotal + (shippingMethod === 'delivery' ? SHIPPING_COST : 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-zini-cream">
        <h2 className="font-serif text-4xl text-zini-dark mb-6">Your cart is empty</h2>
        <p className="font-mono text-xs uppercase tracking-widest text-zini-charcoal/60 mb-10">Looks like you haven't added any cultures yet.</p>
        <Link to="/shop" className="bg-zini-dark text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-zini-green transition-colors">
          Visit Mercantile
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zini-cream min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl md:text-5xl text-zini-dark mb-12">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start">

          {/* Cart Items */}
          <section className="lg:col-span-7">
            <ul className="border-t border-b border-zini-charcoal/10 divide-y divide-zini-charcoal/10">
              {items.map((item) => (
                <li key={item.id} className="flex py-8">
                  <div className="flex-shrink-0 bg-white p-2 shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-center object-cover grayscale"
                    />
                  </div>

                  <div className="ml-6 flex-1 flex flex-col justify-between">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-serif italic">
                            <Link to={item.category === 'kit' ? '/starter-kit' : '/shop'} className="text-zini-dark hover:text-zini-green">
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 font-mono text-xs text-zini-charcoal/60">R{item.price} ZAR</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">
                          Quantity, {item.name}
                        </label>
                        <select
                          id={`quantity-${item.id}`}
                          name={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                          className="max-w-full rounded-none border border-zini-charcoal/20 py-1.5 text-base leading-5 font-mono text-zini-charcoal text-left shadow-sm focus:outline-none focus:border-zini-green sm:text-sm bg-transparent"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>

                        <div className="absolute top-0 right-0">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="-m-2 p-2 inline-flex text-zini-charcoal/40 hover:text-red-500 transition-colors"
                          >
                            <span className="sr-only">Remove</span>
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order Summary */}
          <section className="lg:col-span-5 mt-16 lg:mt-0 bg-white p-10 shadow-lg border border-zini-charcoal/5">
            <h2 className="font-serif text-2xl text-zini-dark mb-8">Order Summary</h2>

            <dl className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-zini-charcoal/60">
                <dt>Subtotal</dt>
                <dd className="text-zini-dark font-bold">R{cartTotal}</dd>
              </div>

              <div className="border-t border-zini-charcoal/10 pt-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-zini-dark mb-4">Shipping Method</h3>
                <div className="space-y-3">
                  <div
                    onClick={() => setShippingMethod('pickup')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingMethod === 'pickup' ? 'border-zini-green bg-zini-green/5' : 'border-zini-charcoal/10 hover:border-zini-charcoal/30'}`}
                  >
                    <div>
                      <span className="block font-serif text-sm text-zini-dark">Local Pickup</span>
                      <span className="block text-zini-charcoal/50 text-[10px] font-mono uppercase mt-1">Mtunzini (Zini)</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-zini-green">Free</span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('delivery')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingMethod === 'delivery' ? 'border-zini-green bg-zini-green/5' : 'border-zini-charcoal/10 hover:border-zini-charcoal/30'}`}
                  >
                    <div>
                      <span className="block font-serif text-sm text-zini-dark">National Delivery</span>
                      <span className="block text-zini-charcoal/50 text-[10px] font-mono uppercase mt-1">South Africa Wide</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-zini-dark">R{SHIPPING_COST}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-zini-charcoal/10 pt-6">
                <dt className="font-serif text-xl text-zini-dark">Total</dt>
                <dd className="font-mono text-xl font-bold text-zini-dark">R{finalTotal}</dd>
              </div>
            </dl>

            <div className="mt-10">
              <Link
                to="/checkout"
                className="w-full bg-zini-dark py-4 px-4 text-white font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-zini-green flex items-center justify-center transition-colors shadow-lg"
              >
                Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex justify-center items-center font-mono text-[10px] uppercase tracking-widest text-zini-charcoal/40">
              <Lock className="w-3 h-3 mr-2" />
              Secure SSL Checkout
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cart;