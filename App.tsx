
import React, { useState, useEffect } from 'react';
import { AppScreen, Gesture, MenuItem, CartItem } from './types';
import { CATEGORIES, MENU_ITEMS } from './constants';
import { useGesture } from './hooks/useGesture';
import { GestureHint } from './components/GestureHint';

// --------------------------------------------------------------------------
// SCREENS
// --------------------------------------------------------------------------

const WelcomeScreen: React.FC<{ isFocused: boolean }> = ({ isFocused }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-12 animate-in fade-in duration-1000">
    <div className="w-1 px-12 py-1 bg-white/10 mb-8"></div>
    <h1 className="text-6xl font-extralight text-white tracking-[0.2em] uppercase mb-4">Mesa</h1>
    <p className="text-sm font-light text-white/40 tracking-[0.3em] uppercase mb-16 italic">Order Reimagined</p>
    
    <div className={`group relative transition-all duration-700 ${isFocused ? 'scale-105' : 'opacity-40'}`}>
        <div className={`px-16 py-5 border transition-all duration-500 rounded-full text-sm tracking-[0.4em] uppercase font-light ${isFocused ? 'bg-white text-black border-white' : 'bg-transparent border-white/20 text-white'}`}>
            Begin Experience
        </div>
        {isFocused && <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-white/40 animate-pulse uppercase">Gesture Select (👌)</div>}
    </div>
  </div>
);

const CategoryScreen: React.FC<{ focusedIndex: number }> = ({ focusedIndex }) => (
  <div className="px-24 pt-32 h-full">
    <div className="mb-20">
        <h2 className="text-4xl font-light text-white tracking-widest uppercase mb-2">Collections</h2>
        <div className="h-px w-20 bg-white/20"></div>
    </div>
    <div className="grid grid-cols-3 gap-12">
      {CATEGORIES.map((cat, idx) => (
        <div 
          key={cat.id} 
          className={`group relative p-16 border transition-all duration-700 flex flex-col items-center gap-8 ${focusedIndex === idx ? 'bg-white text-black border-white scale-105 gesture-highlight' : 'bg-transparent border-white/10 text-white opacity-40'}`}
        >
          <span className="text-6xl grayscale group-hover:grayscale-0 transition-all">{cat.icon}</span>
          <span className="text-xs font-medium tracking-[0.3em] uppercase">{cat.name}</span>
          {focusedIndex === idx && (
            <div className="absolute -bottom-8 text-[9px] tracking-widest text-white/60 font-light animate-pulse uppercase">
              Confirm Selection
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const MenuScreen: React.FC<{ items: MenuItem[], focusedIndex: number }> = ({ items, focusedIndex }) => (
  <div className="px-24 pt-32 pb-48 h-full overflow-y-auto">
    <div className="mb-16 flex justify-between items-end">
        <div>
            <h2 className="text-4xl font-light text-white tracking-widest uppercase mb-2">Selection</h2>
            <div className="h-px w-20 bg-white/20"></div>
        </div>
        <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Scroll with Next (👉)</p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item, idx) => (
        <div 
          key={item.id} 
          className={`relative group transition-all duration-700 flex flex-col ${focusedIndex === idx ? 'scale-105' : 'opacity-30'}`}
        >
          <div className="aspect-[4/5] overflow-hidden grayscale transition-all duration-1000 group-hover:grayscale-0 mb-6">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-light text-white uppercase tracking-widest">{item.name}</h3>
            <p className="text-sm font-medium text-white/60 tracking-tighter">${item.price.toFixed(2)}</p>
          </div>
          {focusedIndex === idx && (
            <div className="mt-6 border border-white/40 py-3 text-center text-[10px] font-medium tracking-[0.2em] uppercase animate-in fade-in slide-in-from-top-2">
              Add to Cart
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const CartScreen: React.FC<{ cart: CartItem[], focusedIndex: number }> = ({ cart, focusedIndex }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <div className="px-24 pt-32 h-full flex flex-col">
      <div className="mb-16">
        <h2 className="text-4xl font-light text-white tracking-widest uppercase mb-2">Cart</h2>
        <div className="h-px w-20 bg-white/20"></div>
      </div>
      
      <div className="flex-grow flex flex-col gap-12">
        {cart.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-xs tracking-[0.5em] text-white/20 uppercase italic">Empty</p>
          </div>
        ) : (
          <div className="space-y-4 flex-grow overflow-y-auto pr-8">
            {cart.map((item, idx) => (
              <div 
                key={item.id} 
                className={`flex justify-between items-center py-6 px-8 border-b transition-all duration-500 rounded-sm ${focusedIndex === idx ? 'border-white bg-white/10 border-l-4 shadow-[0_0_40px_rgba(255,255,255,0.08)] -translate-y-1' : 'border-white/5 opacity-30'}`}
              >
                <div className="flex items-center gap-8">
                  <div className={`w-16 h-16 grayscale transition-all duration-500 ${focusedIndex === idx ? 'grayscale-0 scale-110' : ''}`}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-light text-white tracking-widest uppercase">{item.name}</h4>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase tracking-widest transition-colors ${focusedIndex === idx ? 'text-white' : 'text-white/40'}`}>Qty:</span>
                        <span 
                          key={item.quantity} 
                          className={`text-[10px] font-bold transition-all inline-block ${focusedIndex === idx ? 'text-white animate-pop' : 'text-white/40'}`}
                        >
                          {item.quantity}
                        </span>
                      </div>
                      {focusedIndex === idx && (
                        <span className="text-[9px] text-white/60 uppercase tracking-widest animate-pulse border-l border-white/20 pl-4 font-medium">
                          Adjust: 👌 More / ✋ Less
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                    <span 
                        key={`${item.id}-${item.quantity}`} 
                        className={`text-lg font-light tracking-tighter transition-all duration-500 inline-block ${focusedIndex === idx ? 'text-white scale-110 animate-pop' : 'text-white/80'}`}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    {item.quantity > 1 && (
                        <span className="text-[8px] text-white/20 uppercase tracking-widest mt-1">
                            ${item.price.toFixed(2)} ea
                        </span>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-auto pb-12">
          <div className="flex justify-between items-end mb-12">
            <span className="text-xs text-white/30 tracking-[0.3em] uppercase">Subtotal</span>
            <span 
                key={total}
                className="text-5xl font-extralight text-white tracking-tighter inline-block animate-pop"
            >
                ${total.toFixed(2)}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className={`py-6 border transition-all duration-700 text-center text-xs tracking-[0.4em] uppercase font-light ${focusedIndex === cart.length ? 'bg-white text-black border-white scale-105 gesture-highlight' : 'bg-transparent border-white/10 text-white/20'}`}>
              Complete
            </div>
            <div className={`py-6 border transition-all duration-700 text-center text-xs tracking-[0.4em] uppercase font-light ${focusedIndex === cart.length + 1 ? 'bg-white text-black border-white scale-105 gesture-highlight' : 'bg-transparent border-white/10 text-white/20'}`}>
              Clear
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessScreen: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-12 animate-in fade-in zoom-in duration-1000">
    <div className="w-px h-24 bg-white/20 mb-12"></div>
    <h1 className="text-5xl font-extralight text-white tracking-[0.4em] uppercase mb-4">Confirmed</h1>
    <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-16">Ticket #4209</p>
    <div className="h-px w-32 bg-white/10"></div>
  </div>
);

// --------------------------------------------------------------------------
// MAIN APP COMPONENT
// --------------------------------------------------------------------------

export default function App() {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.WELCOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const filteredItems = selectedCategory 
    ? MENU_ITEMS.filter(item => item.category === selectedCategory)
    : [];

  const handleGesture = (gesture: Gesture) => {
    switch (screen) {
      case AppScreen.WELCOME:
        if (gesture === 'SELECT') {
          setScreen(AppScreen.CATEGORY);
          setFocusedIndex(0);
        }
        break;

      case AppScreen.CATEGORY:
        if (gesture === 'NEXT') {
          setFocusedIndex((prev) => (prev + 1) % CATEGORIES.length);
        } else if (gesture === 'SELECT') {
          setSelectedCategory(CATEGORIES[focusedIndex].id);
          setScreen(AppScreen.MENU);
          setFocusedIndex(0);
        } else if (gesture === 'STOP') {
          setScreen(AppScreen.WELCOME);
        }
        break;

      case AppScreen.MENU:
        if (gesture === 'NEXT') {
          setFocusedIndex((prev) => (prev + 1) % filteredItems.length);
        } else if (gesture === 'SELECT') {
          const item = filteredItems[focusedIndex];
          setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            return [...prev, { ...item, quantity: 1 }];
          });
        } else if (gesture === 'STOP') {
          if (cart.length > 0) {
            setScreen(AppScreen.CART);
            setFocusedIndex(0);
          } else {
            setScreen(AppScreen.CATEGORY);
            setFocusedIndex(0);
          }
        }
        break;

      case AppScreen.CART: {
        const totalItemsInCart = cart.length;
        const totalOptions = totalItemsInCart + 2;

        if (gesture === 'NEXT') {
          setFocusedIndex((prev) => (prev + 1) % totalOptions);
        } else if (gesture === 'SELECT') {
          if (focusedIndex < totalItemsInCart) {
            const targetId = cart[focusedIndex].id;
            setCart(prev => prev.map(i => i.id === targetId ? { ...i, quantity: i.quantity + 1 } : i));
          } else if (focusedIndex === totalItemsInCart) {
            if (cart.length > 0) {
              setScreen(AppScreen.CONFIRMATION);
              setTimeout(() => {
                setCart([]);
                setScreen(AppScreen.WELCOME);
              }, 4000);
            }
          } else {
            setCart([]);
            setScreen(AppScreen.WELCOME);
          }
        } else if (gesture === 'STOP') {
          if (focusedIndex < totalItemsInCart) {
            const targetId = cart[focusedIndex].id;
            setCart(prev => {
              const item = prev.find(i => i.id === targetId);
              if (item && item.quantity > 1) {
                return prev.map(i => i.id === targetId ? { ...i, quantity: i.quantity - 1 } : i);
              } else {
                return prev.filter(i => i.id !== targetId);
              }
            });
          } else {
            setScreen(AppScreen.MENU);
            setFocusedIndex(0);
          }
        }
        break;
      }
      
      case AppScreen.CONFIRMATION:
        break;
    }
  };

  useEffect(() => {
    if (screen === AppScreen.CART) {
      const totalOptions = cart.length + 2;
      if (focusedIndex >= totalOptions) {
        setFocusedIndex(Math.max(0, totalOptions - 1));
      }
    }
  }, [cart.length, screen, focusedIndex]);

  const { lastGesture } = useGesture(handleGesture);

  return (
    <div className="relative w-screen h-screen bg-[#050505] text-white overflow-hidden select-none font-light tracking-wide">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-radial from-white/[0.03] to-transparent"></div>
      </div>

      <main className="relative z-10 w-full h-full">
        {screen === AppScreen.WELCOME && <WelcomeScreen isFocused={true} />}
        {screen === AppScreen.CATEGORY && <CategoryScreen focusedIndex={focusedIndex} />}
        {screen === AppScreen.MENU && <MenuScreen items={filteredItems} focusedIndex={focusedIndex} />}
        {screen === AppScreen.CART && <CartScreen cart={cart} focusedIndex={focusedIndex} />}
        {screen === AppScreen.CONFIRMATION && <SuccessScreen />}
      </main>

      {/* Persistent Minimal Cart */}
      {screen !== AppScreen.WELCOME && screen !== AppScreen.CONFIRMATION && (
        <div className="absolute top-12 right-16 z-20 flex flex-col items-end gap-1 animate-in fade-in slide-in-from-right-4">
          <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase">Order</span>
          <span 
            key={cart.reduce((a, b) => a + b.quantity, 0)} 
            className="text-xl font-extralight tracking-tighter inline-block animate-pop"
          >
            {cart.reduce((a, b) => a + b.quantity, 0)} Items
          </span>
        </div>
      )}

      {screen !== AppScreen.CONFIRMATION && <GestureHint activeGesture={lastGesture} />}
    </div>
  );
}
