import React, { useState, useMemo } from 'react';
import { MenuItem, TOPPINGS, ToppingItem, DRINK_FLAVORS, CartItem } from '../data/menuData';
import { formatPrice } from '../utils/format';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';

interface ProductCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<ToppingItem[]>([]);
  const [notes, setNotes] = useState('');

  // Drink specific states
  const [selectedFlavor, setSelectedFlavor] = useState<string>(DRINK_FLAVORS[0]);
  const [drinkBase, setDrinkBase] = useState<'En agua' | 'En leche' | 'En helado'>('En agua');

  // Cookie box specific states
  const cookieOptions = [
    'Chips de Chocolate',
    'Red Velvet',
    'Doble Chocolate',
    'Pistacho',
  ];
  const [cookieBoxSelections, setCookieBoxSelections] = useState<Record<string, number>>({
    'Chips de Chocolate': 1,
    'Red Velvet': 1,
    'Doble Chocolate': 1,
    'Pistacho': 1,
  });

  const totalCookiesPicked = Object.values(cookieBoxSelections).reduce((a, b) => a + b, 0);

  // Compute unit price
  const baseUnitPrice = useMemo(() => {
    if (item.type === 'drink_base') {
      if (drinkBase === 'En leche') return 9000;
      if (drinkBase === 'En helado') return 13000;
      return 7000; // En agua
    }
    return item.price;
  }, [item, drinkBase]);

  const toppingsSum = useMemo(() => {
    return selectedToppings.reduce((acc, t) => acc + t.price, 0);
  }, [selectedToppings]);

  const unitTotal = baseUnitPrice + toppingsSum;
  const grandTotal = unitTotal * quantity;

  const toggleTopping = (topping: ToppingItem) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleCookieChange = (name: string, delta: number) => {
    const current = cookieBoxSelections[name] || 0;
    const next = current + delta;
    if (next < 0) return;
    if (delta > 0 && totalCookiesPicked >= 4) return;
    setCookieBoxSelections({
      ...cookieBoxSelections,
      [name]: next,
    });
  };

  const handleAdd = () => {
    let cookieList: string[] | undefined = undefined;
    if (item.type === 'cookie_box') {
      cookieList = [];
      Object.entries(cookieBoxSelections).forEach(([name, count]) => {
        if (count > 0) cookieList!.push(`${count}x ${name}`);
      });
    }

    const newCartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      item,
      quantity,
      selectedToppings,
      selectedDrinkBase: item.type === 'drink_base' ? drinkBase : undefined,
      selectedFlavor: item.type === 'drink_base' ? selectedFlavor : undefined,
      cookieSelection: cookieList,
      notes: notes.trim() || undefined,
      unitPrice: unitTotal,
      totalPrice: grandTotal,
    };

    onAddToCart(newCartItem);
    onClose();
  };

  const isFresasOrWaffles = item.category === 'fresas' || item.category === 'waffles';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-800">
              Personalizar Pedido
            </span>
            <h2 className="font-display text-xl font-bold text-stone-900 leading-snug">
              {item.name}
            </h2>
            {item.includedNotes && (
              <p className="text-xs text-amber-800 font-medium mt-0.5">
                ✨ {item.includedNotes}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-6 flex-1">
          {/* Drink Options */}
          {item.type === 'drink_base' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-2">
                  1. Elige tu fruta o sabor:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DRINK_FLAVORS.map((flav) => (
                    <button
                      key={flav}
                      type="button"
                      onClick={() => setSelectedFlavor(flav)}
                      className={`text-left text-xs p-2.5 rounded-xl border transition-all cursor-pointer ${
                        selectedFlavor === flav
                          ? 'border-rose-700 bg-rose-50/80 font-bold text-rose-900'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      {flav}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-2">
                  2. ¿Cómo la prefieres preparada?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'En agua', label: 'En agua', price: 7000 },
                    { id: 'En leche', label: 'En leche', price: 9000 },
                    { id: 'En helado', label: 'En helado', price: 13000 },
                  ].map((base) => (
                    <button
                      key={base.id}
                      type="button"
                      onClick={() => setDrinkBase(base.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        drinkBase === base.id
                          ? 'border-rose-700 bg-rose-50 text-rose-900 font-bold'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <p className="text-xs font-semibold">{base.label}</p>
                      <p className="text-[11px] text-stone-500 tabular-nums">{formatPrice(base.price)}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Cookie Box Options */}
          {item.type === 'cookie_box' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-900">
                  Elige tus 4 galletas favoritas:
                </label>
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    totalCookiesPicked === 4 ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {totalCookiesPicked} de 4 seleccionadas
                </span>
              </div>
              <div className="space-y-2">
                {cookieOptions.map((opt) => {
                  const count = cookieBoxSelections[opt] || 0;
                  return (
                    <div
                      key={opt}
                      className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50/50"
                    >
                      <span className="text-xs font-medium text-stone-800">{opt}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCookieChange(opt, -1)}
                          disabled={count === 0}
                          className="w-7 h-7 rounded-lg border border-stone-300 bg-white flex items-center justify-center text-stone-600 disabled:opacity-40"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold tabular-nums">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCookieChange(opt, 1)}
                          disabled={totalCookiesPicked >= 4}
                          className="w-7 h-7 rounded-lg border border-stone-300 bg-white flex items-center justify-center text-stone-600 disabled:opacity-40"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Toppings Section (Especially for Fresas and Waffles, or any dessert) */}
          {isFresasOrWaffles && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Toppings adicionales (opcional):
                </label>
                <span className="text-[11px] text-stone-500">
                  {selectedToppings.length} añadidos
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mb-3">
                Agrégale tu toque favorito a tu postre Carlota:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {TOPPINGS.map((top) => {
                  const isChecked = selectedToppings.some((t) => t.id === top.id);
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => toggleTopping(top)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'border-rose-700 bg-rose-50 text-rose-950 font-medium'
                          : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-rose-700 border-rose-700 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs">{top.name}</span>
                      </div>
                      <span className="text-xs font-bold tabular-nums text-stone-900 shrink-0">
                        +{formatPrice(top.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Notes */}
          <div>
            <label className="block text-xs font-bold text-stone-900 mb-1.5">
              Instrucciones especiales para cocina (opcional):
            </label>
            <input
              type="text"
              placeholder="Ej: salsa por separado, poco dulce, bien frío..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700"
            />
          </div>
        </div>

        {/* Modal Footer with Live Price & Add CTA */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-xl border border-stone-300 bg-white flex items-center justify-center text-stone-700 disabled:opacity-40 hover:bg-stone-100 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-bold text-stone-900 text-sm tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-xl border border-stone-300 bg-white flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Action CTA */}
          <button
            type="button"
            onClick={handleAdd}
            disabled={item.type === 'cookie_box' && totalCookiesPicked !== 4}
            className="flex-1 flex items-center justify-between px-5 py-3 bg-stone-900 hover:bg-rose-900 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <span>Agregar al Pedido</span>
            <span className="tabular-nums font-extrabold">{formatPrice(grandTotal)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
