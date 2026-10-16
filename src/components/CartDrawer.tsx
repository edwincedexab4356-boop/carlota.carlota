import React, { useState } from 'react';
import { CartItem } from '../data/menuData';
import { formatPrice, buildWhatsAppMessage, openWhatsAppLink, OrderDetails } from '../utils/format';
import { X, Trash2, Plus, Minus, MessageCircle, Copy, Check, ShoppingBag, Settings2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<'takeout' | 'dinein' | 'delivery'>('takeout');
  const [addressOrTable, setAddressOrTable] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<OrderDetails['paymentMethod']>('Nequi');
  const [customerNotes, setCustomerNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [customPhone, setCustomPhone] = useState(() => {
    return localStorage.getItem('carlota_whatsapp_phone') || '573001234567';
  });
  const [showPhoneConfig, setShowPhoneConfig] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const takeoutFee = (orderType === 'takeout' || orderType === 'delivery') && cart.length > 0 ? 1000 : 0;
  const grandTotal = subtotal + takeoutFee;

  const orderDetails: OrderDetails = {
    customerName,
    customerPhone,
    orderType,
    addressOrTable,
    paymentMethod,
    customerNotes,
    takeoutFee,
  };

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;
    const msg = buildWhatsAppMessage(cart, orderDetails, grandTotal);
    openWhatsAppLink(customPhone, msg);
  };

  const handleCopyOrder = () => {
    if (cart.length === 0) return;
    const msg = buildWhatsAppMessage(cart, orderDetails, grandTotal);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePhone = (val: string) => {
    setCustomPhone(val);
    localStorage.setItem('carlota_whatsapp_phone', val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-stone-900">
                Tu Pedido Carlota
              </h2>
              <span className="text-xs text-stone-500 tabular-nums">
                {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en la bolsa
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowPhoneConfig(!showPhoneConfig)}
              title="Configurar teléfono de WhatsApp de recepción"
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              <Settings2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WhatsApp Phone Settings Toggle */}
        {showPhoneConfig && (
          <div className="bg-amber-50 p-3.5 border-b border-amber-200 text-xs text-amber-900">
            <p className="font-bold mb-1">Número de WhatsApp del negocio:</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="573001234567 (con indicativo país)"
                value={customPhone}
                onChange={(e) => handleSavePhone(e.target.value)}
                className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-amber-300 rounded-lg text-stone-900"
              />
              <button
                type="button"
                onClick={() => setShowPhoneConfig(false)}
                className="px-3 py-1.5 bg-amber-800 text-white rounded-lg font-semibold text-xs"
              >
                Listo
              </button>
            </div>
            <p className="text-[10px] text-amber-700 mt-1">
              Aquí recibirá los pedidos el encargado de Carlota.
            </p>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-display text-lg font-bold text-stone-800 mb-1">
                Tu bolsa está vacía
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mb-4">
                Agrega fresas con crema, postres cuchareables, galletas o waffles para armar tu pedido.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-rose-900 transition-colors"
              >
                Explorar Menú
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Productos seleccionados</span>
                  <button
                    onClick={onClearCart}
                    className="text-stone-400 hover:text-rose-700 text-[11px] underline"
                  >
                    Vaciar todo
                  </button>
                </div>

                {cart.map((cItem) => (
                  <div
                    key={cItem.cartId}
                    className="p-3 rounded-xl border border-stone-200 bg-stone-50/40 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-stone-900">
                          {cItem.item.name}
                        </h4>
                        {cItem.selectedFlavor && (
                          <p className="text-[11px] text-stone-600">
                            Sabor: {cItem.selectedFlavor} ({cItem.selectedDrinkBase})
                          </p>
                        )}
                        {cItem.cookieSelection && (
                          <p className="text-[11px] text-stone-600">
                            Galletas: {cItem.cookieSelection.join(', ')}
                          </p>
                        )}
                        {cItem.selectedToppings.length > 0 && (
                          <p className="text-[11px] text-amber-800 font-medium">
                            + {cItem.selectedToppings.map((t) => t.name).join(', ')}
                          </p>
                        )}
                        {cItem.notes && (
                          <p className="text-[11px] text-stone-500 italic">
                            Nota: &ldquo;{cItem.notes}&rdquo;
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => onRemoveItem(cItem.cartId)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-stone-200/60">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateQuantity(cItem.cartId, -1)}
                          className="w-6 h-6 rounded-md border border-stone-300 bg-white flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold tabular-nums">
                          {cItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cItem.cartId, 1)}
                          className="w-6 h-6 rounded-md border border-stone-300 bg-white flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-stone-900 tabular-nums">
                        {formatPrice(cItem.totalPrice)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options & Checkout Form */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Tipo de Servicio & Entrega
                </h3>

                {/* Service Type Selector */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'dinein', label: 'En Mesa', fee: 0, sub: 'Consumir aquí' },
                    { id: 'takeout', label: 'Para Llevar', fee: 1000, sub: '+$1k empaque' },
                    { id: 'delivery', label: 'Domicilio', fee: 1000, sub: '+$1k empaque' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setOrderType(t.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        orderType === t.id
                          ? 'border-rose-700 bg-rose-50 text-rose-950 font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <p className="text-xs">{t.label}</p>
                      <p className="text-[10px] text-stone-500">{t.sub}</p>
                    </button>
                  ))}
                </div>

                {/* Notice rule from photo */}
                {takeoutFee > 0 && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                    <span className="font-bold">Nota del Menú:</span>
                    <span>Aumenta $1.000 por empaque para llevar.</span>
                  </div>
                )}

                {/* Customer Details */}
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Nombre del cliente *
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre completo"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="300 123 4567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        {orderType === 'dinein' ? 'Número de Mesa' : 'Dirección / Barrio'}
                      </label>
                      <input
                        type="text"
                        placeholder={orderType === 'dinein' ? 'Mesa 4' : 'Calle 10 # 20-30'}
                        value={addressOrTable}
                        onChange={(e) => setAddressOrTable(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Método de pago preferido:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        'Nequi',
                        'Daviplata',
                        'Efectivo',
                        'Tarjeta / Datafono',
                        'Transferencia Bancolombia',
                      ].map((pm) => (
                        <button
                          key={pm}
                          type="button"
                          onClick={() => setPaymentMethod(pm as any)}
                          className={`text-left text-xs p-2 rounded-lg border transition-all cursor-pointer ${
                            paymentMethod === pm
                              ? 'border-rose-700 bg-rose-50 text-rose-950 font-bold'
                              : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                          }`}
                        >
                          {pm}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Comentarios o notas adicionales:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: llevar cambio de $50k, timbre 2..."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Calculations and WhatsApp Trigger */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
            {/* Price Breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              {takeoutFee > 0 && (
                <div className="flex justify-between text-stone-500">
                  <span>Empaque para llevar</span>
                  <span className="tabular-nums font-medium text-amber-800">+{formatPrice(takeoutFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-900 font-bold text-base pt-1 border-t border-stone-200">
                <span>Total a Pagar</span>
                <span className="tabular-nums font-black text-rose-900">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Pedir directo por WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopyOrder}
                className="w-full py-2 px-3 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>¡Resumen copiado al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-500" />
                    <span>Copiar resumen del pedido</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
