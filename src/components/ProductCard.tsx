import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { formatPrice } from '../utils/format';
import { Plus, SlidersHorizontal, UtensilsCrossed } from 'lucide-react';

interface ProductCardProps {
  item: MenuItem;
  onAddToCartDirect: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onAddToCartDirect,
  onCustomize,
}) => {
  const [imageError, setImageError] = useState(false);

  const isCustomizable =
    item.customizable ||
    item.category === 'fresas' ||
    item.category === 'waffles' ||
    item.type === 'drink_base' ||
    item.type === 'cookie_box';

  return (
    <article className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      {/* Top Media / Thumbnail */}
      {item.image && !imageError ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          {item.badge && (
            <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wide">
              {item.badge}
            </div>
          )}
        </div>
      ) : (
        <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-stone-100 via-rose-50/40 to-stone-200/60 flex flex-col items-center justify-center p-6 text-stone-400">
          <div className="w-12 h-12 rounded-full bg-white/80 border border-stone-200/60 flex items-center justify-center text-rose-800/80 mb-2 shadow-xs">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
            Carlota Repostería
          </span>
          {item.badge && (
            <div className="absolute top-3 left-3 bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wide">
              {item.badge}
            </div>
          )}
        </div>
      )}

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-display text-lg font-bold text-stone-900 leading-snug group-hover:text-rose-900 transition-colors">
              {item.name}
            </h3>
          </div>

          {/* Clean unboxed metadata (anti-slop / zero-pill compliance) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span className="capitalize">{item.category}</span>
            {item.includedNotes && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-800 font-medium">{item.includedNotes}</span>
              </>
            )}
          </div>

          {item.description && (
            <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
              {item.description}
            </p>
          )}
        </div>

        {/* Footer with Price and Action */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className="text-[11px] text-stone-400 font-medium block -mb-0.5">Precio</span>
            <span className="text-base sm:text-lg font-bold text-stone-900 tabular-nums">
              {formatPrice(item.price)}
            </span>
          </div>

          <div>
            {isCustomizable ? (
              <button
                type="button"
                onClick={() => onCustomize(item)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/80 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Personalizar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onAddToCartDirect(item)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 text-white hover:bg-rose-900 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
