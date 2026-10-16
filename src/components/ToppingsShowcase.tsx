import React, { useState } from 'react';
import { TOPPINGS, ToppingItem } from '../data/menuData';
import { formatPrice } from '../utils/format';
import { Sparkles, Cookie, Candy, Flame } from 'lucide-react';

export const ToppingsShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'galletas' | 'chocolates' | 'especiales'>('all');

  const filteredToppings = TOPPINGS.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.category === activeFilter;
  });

  return (
    <section className="py-12 bg-stone-100/70 border-y border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Personaliza a tu gusto</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              Barra de Toppings Carlota
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
              Más de 20 ingredientes premium para complementar tus Fresas con Crema, Waffles o Cuchareables.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-stone-200 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Todos ({TOPPINGS.length})
            </button>
            <button
              onClick={() => setActiveFilter('chocolates')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'chocolates'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Chocolates
            </button>
            <button
              onClick={() => setActiveFilter('galletas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'galletas'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Galletas
            </button>
            <button
              onClick={() => setActiveFilter('especiales')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'especiales'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Especiales
            </button>
          </div>
        </div>

        {/* Grid of toppings */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {filteredToppings.map((top) => (
            <div
              key={top.id}
              className="bg-white p-3 rounded-xl border border-stone-200/90 shadow-2xs hover:border-rose-300 transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-1 mb-2">
                <span className="text-xs font-bold text-stone-900 leading-snug line-clamp-1">
                  {top.name}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1.5 border-t border-stone-100">
                <span>Adicional</span>
                <span className="font-bold text-rose-900 tabular-nums">
                  +{formatPrice(top.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
