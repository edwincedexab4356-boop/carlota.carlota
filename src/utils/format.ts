import { CartItem } from '../data/menuData';

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface OrderDetails {
  customerName: string;
  customerPhone: string;
  orderType: 'takeout' | 'dinein' | 'delivery';
  addressOrTable: string;
  paymentMethod: 'Nequi' | 'Daviplata' | 'Efectivo' | 'Tarjeta / Datafono' | 'Transferencia Bancolombia';
  customerNotes?: string;
  takeoutFee: number;
}

export function buildWhatsAppMessage(
  cart: CartItem[],
  details: OrderDetails,
  totalAmount: number
): string {
  const dateStr = new Date().toLocaleDateString('es-CO', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  let message = `🍓 *PEDIDO - CARLOTA (Cremosidad que enamora)* 🍓\n`;
  message += `📅 Fecha: ${dateStr}\n\n`;

  message += `👤 *Cliente:* ${details.customerName.trim() || 'Cliente'}\n`;
  if (details.customerPhone.trim()) {
    message += `📞 *Teléfono:* ${details.customerPhone.trim()}\n`;
  }

  const orderTypeLabel =
    details.orderType === 'takeout'
      ? '📦 Para Llevar (+ $1.000 empaque)'
      : details.orderType === 'delivery'
      ? '🛵 Domicilio (+ $1.000 empaque)'
      : '🍽️ Consumo en Mesa / Local';
  message += `🏷️ *Tipo:* ${orderTypeLabel}\n`;

  if (details.addressOrTable.trim()) {
    message += `📍 *${details.orderType === 'dinein' ? 'Mesa' : 'Dirección'}:* ${details.addressOrTable.trim()}\n`;
  }

  message += `💳 *Método de Pago:* ${details.paymentMethod}\n\n`;
  message += `📝 *DETALLE DE TU PEDIDO:*\n`;
  message += `───────────────────────\n`;

  cart.forEach((cItem, idx) => {
    message += `${idx + 1}. *${cItem.quantity}x ${cItem.item.name}* - ${formatPrice(cItem.totalPrice)}\n`;

    if (cItem.selectedFlavor) {
      message += `   • Sabor: ${cItem.selectedFlavor} (${cItem.selectedDrinkBase || 'En agua'})\n`;
    }

    if (cItem.cookieSelection && cItem.cookieSelection.length > 0) {
      message += `   • Sabores de caja: ${cItem.cookieSelection.join(', ')}\n`;
    }

    if (cItem.selectedToppings.length > 0) {
      const topNames = cItem.selectedToppings.map(t => `${t.name} (+${formatPrice(t.price)})`).join(', ');
      message += `   • Toppings extras: ${topNames}\n`;
    }

    if (cItem.notes) {
      message += `   • Nota: "${cItem.notes}"\n`;
    }
  });

  message += `───────────────────────\n`;

  const subtotal = cart.reduce((acc, i) => acc + i.totalPrice, 0);
  message += `Subtotal: ${formatPrice(subtotal)}\n`;

  if (details.takeoutFee > 0) {
    message += `Empaque / Para llevar: ${formatPrice(details.takeoutFee)}\n`;
  }

  message += `*TOTAL A PAGAR: ${formatPrice(totalAmount)}*\n\n`;

  if (details.customerNotes?.trim()) {
    message += `💬 *Observaciones:* ${details.customerNotes.trim()}\n\n`;
  }

  message += `¡Muchas gracias por elegir Carlota! Quedo a la espera de su confirmación para preparar el pedido. ✨`;

  return message;
}

export function openWhatsAppLink(phone: string, text: string) {
  // Clean phone number: remove non-digits
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${cleanPhone}?text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
