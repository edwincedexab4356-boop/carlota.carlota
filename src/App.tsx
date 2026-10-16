/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MENU_ITEMS, MenuItem, CartItem, CATEGORIES } from './data/menuData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CombosModal } from './components/CombosModal';
import { ToppingsShowcase } from './components/ToppingsShowcase';
import { StoreInfoFooter } from './components/StoreInfoFooter';
import { formatPrice } from './utils/format';
import { ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('carlota_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('carlota_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCombosOpen, setIsCombosOpen] = useState<boolean>(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const menuSectionRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // Check if exact same config already in cart
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.item.id === newItem.item.id &&
          ci.selectedFlavor === newItem.selectedFlavor &&
          ci.selectedDrinkBase === newItem.selectedDrinkBase &&
          JSON.stringify(ci.selectedToppings) === JSON.stringify(newItem.selectedToppings) &&
          JSON.stringify(ci.cookieSelection) === JSON.stringify(newItem.cookieSelection) &&
          ci.notes === newItem.notes
      );

      if (existingIdx >= 0) {
        const copy = [...prev];
        const current = copy[existingIdx];
        const newQty = current.quantity + newItem.quantity;
        copy[existingIdx] = {
          ...current,
          quantity: newQty,
          totalPrice: current.unitPrice * newQty,
        };
        return copy;
      }

      return [...prev, newItem];
    });

    showToast(`¡${newItem.item.name} agregado a tu pedido!`);
  };

  const handleAddToCartDirect = (item: MenuItem) => {
    const newCartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity: 1,
      selectedToppings: [],
      unitPrice: item.price,
      totalPrice: item.price,
    };
    handleAddToCart(newCartItem);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.cartId !== cartId) return ci;
          const newQty = ci.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...ci,
            quantity: newQty,
            totalPrice: ci.unitPrice * newQty,
          };
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSelectCombo = (comboTitle: string, price: number) => {
    const comboCartItem: CartItem = {
      cartId: `combo-${Date.now()}`,
      item: {
        id: `combo-${Date.now()}`,
        name: comboTitle,
        category: 'fresas',
        description: 'Combo especial del día',
        price,
      },
      quantity: 1,
      selectedToppings: [],
      notes: 'Combo promocional',
      unitPrice: price,
      totalPrice: price,
    };
    handleAddToCart(comboCartItem);
    setIsCartOpen(true);
  };

  // Scroll to menu
  const handleExploreMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Item counts for filter tabs
  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MENU_ITEMS.length };
    MENU_ITEMS.forEach((it) => {
      counts[it.category] = (counts[it.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalCartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-rose-100 selection:text-rose-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCombos={() => setIsCombosOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleExploreMenu();
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Banner */}
        <HeroBanner
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenCombos={() => setIsCombosOpen(true)}
          onExploreMenu={handleExploreMenu}
        />

        {/* Category Tabs Filter */}
        <div ref={menuSectionRef}>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            itemCounts={itemCounts}
          />
        </div>

        {/* Menu Grid Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-rose-800">
                Catálogo Carlota
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
                {selectedCategory === 'all'
                  ? 'Nuestra Carta Completa'
                  : CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Menú'}
              </h2>
            </div>
            <p className="text-xs text-stone-500 tabular-nums">
              Mostrando {filteredItems.length} {filteredItems.length === 1 ? 'opción' : 'opciones'}
            </p>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
              <p className="font-display text-lg font-bold text-stone-800 mb-2">
                No encontramos productos que coincidan con tu búsqueda
              </p>
              <p className="text-xs text-stone-500 mb-4">
                Prueba buscando por fresas, cuchareables, waffles, galletas o elimina los filtros.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-rose-900 transition-colors"
              >
                Ver todo el catálogo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onAddToCartDirect={handleAddToCartDirect}
                  onCustomize={(it) => setCustomizingItem(it)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Toppings Showcase Section */}
        <ToppingsShowcase />
      </main>

      {/* Footer */}
      <StoreInfoFooter />

      {/* Floating Mobile Cart Bar if cart has items */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-30">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 bg-stone-900 hover:bg-rose-950 text-white rounded-2xl shadow-xl flex items-center justify-between font-bold text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center tabular-nums">
                {totalCartCount}
              </span>
              <span>Ver mi pedido</span>
            </div>
            <span className="text-rose-200 tabular-nums">
              {formatPrice(cart.reduce((a, b) => a + b.totalPrice, 0))}
            </span>
          </button>
        </div>
      )}

      {/* Product Customizer Modal */}
      <ProductCustomizerModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Checkout Slide-Over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Combos & Daily Promos Modal */}
      <CombosModal
        isOpen={isCombosOpen}
        onClose={() => setIsCombosOpen(false)}
        onSelectCombo={handleSelectCombo}
      />
    </div>
  );
}
