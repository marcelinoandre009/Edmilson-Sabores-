import { CartItem, DeliveryFormData, PickupFormData, ReservationFormData } from '../types/restaurant';
import { formatKz, RESTAURANT_CONFIG } from '../data/restaurantData';

export function createWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encoded}`;
}

export function generateDeliveryOrderMessage(
  items: CartItem[],
  deliveryData: DeliveryFormData,
  deliveryFee: number
): string {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  const itemsList = items
    .map(
      (item) =>
        `${item.quantity}x ${item.product.name} — ${formatKz(item.product.price * item.quantity)}${
          item.notes ? `\n   ↳ Obs: ${item.notes}` : ''
        }`
    )
    .join('\n');

  let text = `🍔 *NOVO PEDIDO — ${RESTAURANT_CONFIG.name.toUpperCase()}*\n\n`;
  text += `👤 Cliente: ${deliveryData.customerName.trim()}\n`;
  text += `📞 Telefone: ${deliveryData.phone.trim()}\n\n`;
  text += `🛒 *PEDIDO*\n\n${itemsList}\n\n`;
  text += `Subtotal: ${formatKz(subtotal)}\n`;
  text += `🛵 Taxa de Entrega (Caála): ${formatKz(deliveryFee)}\n`;
  text += `💰 *TOTAL: ${formatKz(total)}*\n\n`;
  text += `🛵 *Modalidade: ENTREGA*\n`;
  text += `📍 Bairro/Zona: ${deliveryData.neighborhood.trim()}\n`;
  text += `🏠 Endereço / Ponto de Referência: ${deliveryData.address.trim()}${
    deliveryData.reference ? ` (Ref: ${deliveryData.reference.trim()})` : ''
  }\n`;

  if (deliveryData.gpsLocation) {
    text += `📍 Localização GPS: ${deliveryData.gpsLocation}\n`;
  }

  text += `\n📝 Observação:\n${deliveryData.notes.trim() || 'Nenhuma'}\n\n`;
  text += `Olá! Gostaria de confirmar este pedido.`;

  return text;
}

export function generatePickupOrderMessage(
  items: CartItem[],
  pickupData: PickupFormData
): string {
  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const itemsList = items
    .map(
      (item) =>
        `${item.quantity}x ${item.product.name} — ${formatKz(item.product.price * item.quantity)}${
          item.notes ? `\n   ↳ Obs: ${item.notes}` : ''
        }`
    )
    .join('\n');

  let text = `🍔 *NOVO PEDIDO — ${RESTAURANT_CONFIG.name.toUpperCase()}*\n\n`;
  text += `👤 Cliente: ${pickupData.customerName.trim()}\n`;
  text += `📞 Telefone: ${pickupData.phone.trim()}\n\n`;
  text += `🛒 *PEDIDO*\n\n${itemsList}\n\n`;
  text += `💰 *TOTAL: ${formatKz(total)}*\n\n`;
  text += `🏪 *MODALIDADE: RETIRADA NO RESTAURANTE (TAKE AWAY)*\n\n`;
  text += `🕐 Horário pretendido para retirada:\n${pickupData.pickupTime.trim()}\n\n`;
  text += `📝 Observação:\n${pickupData.notes.trim() || 'Nenhuma'}\n\n`;
  text += `Olá! Gostaria de confirmar meu pedido e saber quando estará pronto para retirada.`;

  return text;
}

export function generateReservationMessage(data: ReservationFormData): string {
  let text = `🪑 *NOVA SOLICITAÇÃO DE RESERVA — ${RESTAURANT_CONFIG.name.toUpperCase()}*\n\n`;
  text += `👤 Nome: ${data.customerName.trim()}\n`;
  text += `📞 Telefone: ${data.phone.trim()}\n`;
  text += `📅 Data: ${data.date}\n`;
  text += `🕐 Horário: ${data.time}\n`;
  text += `👥 Número de pessoas: ${data.peopleCount}\n\n`;
  text += `📝 Observação:\n${data.notes.trim() || 'Mesa numa área tranquila, se possível.'}\n\n`;
  text += `Olá! Gostaria de verificar a disponibilidade desta reserva.`;

  return text;
}
