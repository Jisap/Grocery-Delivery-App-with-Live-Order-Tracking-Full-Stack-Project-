import React from 'react'
import { useCart } from '../../context/CartContex';
import { useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, XIcon } from 'lucide-react';

const CartSidebar = () => {

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <>
      {/* overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className='fixed inset-0 bg-black/40 z-50 transition-opacity' />

      {/* Sidebar */}
      <div className='fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right'>
        {/*  Header */}
        <div className='flex items-center justify-between p-5 border-b border-app-border'>
          <div className='flex items-center gap-2'>
            <ShoppingBagIcon className='size-5' />
            <h2 className='text-lg font-medium'>Your Cart</h2>
            <span className='px-2 py-0.5 text-xs font-semibold bg-app-cream rounded-full'>
              {items.length}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className='p-2 rounded-xl hover:bg-app-cream transition-colors'>
            <XIcon className='size-5' />
          </button>
        </div>

        {/* Items */}
        <div className='flex-1 overflow-y-auto p-5 space-y-4'>
          {items.length === 0} ? (
          <div className='flex flex-col items-center justify-center h-full text-center'>
            <ShoppingBagIcon className='size-16 text-app-border mb-4' />
            <h3 className='text-lg font-medium mb-1'>
              Your cart is empty
            </h3>
          </div>
          ) : (
          {items.map((item) => (
            <div key={item.product._id} className='flex gap-3 bg-app-cream/60 rounded-xl p-3'>
              <img
                src={item.product.image}
                alt={item.product.name}
                className='size-16 rounded-lg object-cover shrink-0'
              />
            </div>
          ))}
          )
        </div>
      </div>
    </>
  )
}

export default CartSidebar