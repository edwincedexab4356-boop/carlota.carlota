import React from 'react';
import { Search, Sparkles, Package, Clock, Heart } from 'lucide-react';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCombos: () => void;
  onExploreMenu: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  onSearchChange,
  onOpenCombos,
  onExploreMenu,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-stone-200/70 bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F5] to-[#FAF8F5] pt-8 pb-12">
      {/* Subtle organic decorative background touches */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-100/40 blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Story & Search */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-800 text-xs font-semibold w-fit mb-4">
              <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              <span>Artesanal, fresco y hecho con amor</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.1] mb-4">
              Cremosidad <br className="hidden sm:inline" />
              <span className="italic font-normal text-rose-800">que enamora</span> en cada bocado.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed mb-6 font-normal">
              Descubre nuestras famosas <strong className="text-stone-900 font-semibold">Fresas con Crema</strong> bañadas en salsa de chocolate, postres cuchareables, crujientes waffles, galletas artesanales y bebidas naturales.
            </p>

            {/* Crucial Menu Notes Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={onOpenCombos}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/90 border border-amber-200 shadow-sm text-left hover:border-amber-300 hover:bg-amber-50/50 transition-colors group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 flex items-center gap-1">
                    ¿Combos Especiales?
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Pregunta por nuestras promociones
                  </p>
                </div>
              </button>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/90 border border-stone-200 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                  <Package className="w-4 h-4 text-stone-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    Servicio Para Llevar
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Para llevar añade $1.000 por empaque
                  </p>
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative max-w-lg mb-4">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar fresas, cuchareables, waffles, galletas..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-stone-300/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 text-stone-900 placeholder:text-stone-400 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 px-2 py-0.5 rounded"
                >
                  Limpiar
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                Pedidos directos a WhatsApp
              </span>
              <span>·</span>
              <span>Pago con Nequi, Daviplata o Efectivo</span>
            </div>
          </div>

          {/* Right Column: Featured Image with Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-white group">
              <img
                src="/src/assets/images/carlota_fresas_con_crema_1792173641767.jpg"
                alt="Fresas con crema artesanales Carlota"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase font-semibold tracking-wider text-rose-300 mb-1">
                  Estrella del Menú
                </span>
                <h3 className="font-display text-2xl font-bold leading-tight mb-1 text-white">
                  Fresas con Crema & Salsa de Chocolate
                </h3>
                <p className="text-xs text-stone-200 mb-3">
                  Desde $14.000 con opción de brownie, Nutella y más de 20 toppings irresistibles.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onExploreMenu}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                  >
                    Personalizar Ahora
                  </button>
                  <span className="text-xs text-rose-100 font-medium">
                    12 Oz, 16 Oz, 22 Oz o Bowl
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
