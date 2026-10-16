import React from 'react';
import { ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCombos: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenCombos,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex flex-col justify-center whitespace-nowrap shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-rose-800 transition-colors">
              Carlota
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-rose-600" />
          </div>
          <span className="text-[11px] font-medium tracking-wider text-rose-700 uppercase -mt-0.5">
            Cremosidad que enamora
          </span>
        </a>

        {/* Zone 2: Single-line clean text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700">
          <button
            onClick={() => onSelectCategory('fresas')}
            className="hover:text-rose-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Fresas con Crema
          </button>
          <button
            onClick={() => onSelectCategory('cuchareables')}
            className="hover:text-rose-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Cuchareables
          </button>
          <button
            onClick={() => onSelectCategory('waffles')}
            className="hover:text-rose-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Waffles & Crepes
          </button>
          <button
            onClick={() => onSelectCategory('galletas')}
            className="hover:text-rose-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Galletas
          </button>
          <button
            onClick={onOpenCombos}
            className="text-rose-700 font-semibold hover:text-rose-900 transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 py-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Combos Especiales
          </button>
        </nav>

        {/* Zone 3: Primary Action & Shopping Bag */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenCombos}
            className="hidden sm:inline-flex md:hidden text-xs font-semibold px-3 py-2 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 transition-colors whitespace-nowrap"
          >
            Ver Combos
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Ver bolsa de compras"
            className="relative flex items-center gap-2.5 px-4 py-2.5 bg-stone-900 hover:bg-rose-900 text-white rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-rose-200" />
            <span className="hidden sm:inline">Mi Pedido</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-rose-600 text-white tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
