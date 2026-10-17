import React, { useState } from 'react';
import {
  X,
  Bike,
  Store,
  MapPin,
  Clock,
  Phone,
  User,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Navigation,
  FileText,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderModality, DeliveryFormData, PickupFormData } from '../types/restaurant';
import { RESTAURANT_CONFIG, formatKz } from '../data/restaurantData';
import {
  createWhatsAppUrl,
  generateDeliveryOrderMessage,
  generatePickupOrderMessage,
} from '../utils/whatsapp';

export const CheckoutModal: React.FC = () => {
  const { items, subtotal, isCheckoutOpen, setIsCheckoutOpen, clearCart } = useCart();

  const [modality, setModality] = useState<OrderModality>('delivery');

  // Delivery Form State
  const [deliveryData, setDeliveryData] = useState<DeliveryFormData>({
    customerName: '',
    phone: '',
    neighborhood: 'Catelenga Nova',
    address: '',
    reference: '',
    notes: '',
    gpsLocation: '',
  });

  // Pickup Form State
  const [pickupData, setPickupData] = useState<PickupFormData>({
    customerName: '',
    phone: '',
    pickupTime: '18:30',
    notes: '',
  });

  const [isGettingGps, setIsGettingGps] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(false);
  const [submittedWhatsApp, setSubmittedWhatsApp] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const deliveryFee = modality === 'delivery' ? RESTAURANT_CONFIG.deliveryFee : 0;
  const orderTotal = subtotal + deliveryFee;

  // Handle Geolocation
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada pelo seu navegador.');
      return;
    }
    setIsGettingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const link = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
        setDeliveryData((prev) => ({ ...prev, gpsLocation: link }));
        setIsGettingGps(false);
        setGpsSuccess(true);
      },
      (err) => {
        setIsGettingGps(false);
        alert('Não foi possível obter a localização. Por favor, indique seu endereço e ponto de referência.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSendOrder = () => {
    setFormError(null);

    if (modality === 'delivery') {
      if (!deliveryData.customerName.trim()) {
        setFormError('Por favor, informe seu nome completo.');
        return;
      }
      if (!deliveryData.phone.trim()) {
        setFormError('Por favor, informe seu número de telefone.');
        return;
      }
      if (!deliveryData.address.trim()) {
        setFormError('Por favor, informe seu endereço de entrega.');
        return;
      }

      const msg = generateDeliveryOrderMessage(items, deliveryData, deliveryFee);
      const url = createWhatsAppUrl(msg);
      window.open(url, '_blank');
      setSubmittedWhatsApp(true);
    } else {
      if (!pickupData.customerName.trim()) {
        setFormError('Por favor, informe seu nome completo.');
        return;
      }
      if (!pickupData.phone.trim()) {
        setFormError('Por favor, informe seu número de telefone.');
        return;
      }
      if (!pickupData.pickupTime.trim()) {
        setFormError('Por favor, indique o horário pretendido para retirada.');
        return;
      }

      const msg = generatePickupOrderMessage(items, pickupData);
      const url = createWhatsAppUrl(msg);
      window.open(url, '_blank');
      setSubmittedWhatsApp(true);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setSubmittedWhatsApp(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div>
            <h2 className="text-xl font-black text-white font-display">
              Finalização do Pedido
            </h2>
            <p className="text-xs text-zinc-400">
              Edmilson Sabores · Caála, Huambo
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post-submission guidance state */}
        {submittedWhatsApp ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-4xl">
              💬
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white font-display">
                WhatsApp Aberto com seu Pedido!
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Envie a mensagem no aplicativo do WhatsApp para concluir sua solicitação e aguarde a resposta da <strong>Edmilson Sabores</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm text-left flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 font-bold mb-1">
                  Atenção Importante:
                </strong>
                Seu pedido só estará oficialmente confirmado quando o restaurante responder e confirmar os detalhes pelo WhatsApp.
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  clearCart();
                  handleClose();
                }}
                className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg cursor-pointer"
              >
                Concluir e Limpar Carrinho
              </button>
              <button
                onClick={() => setSubmittedWhatsApp(false)}
                className="py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs cursor-pointer"
              >
                Voltar aos dados
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Step 1: Modality Selection */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                Como deseja receber seu pedido?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Delivery Choice */}
                <button
                  type="button"
                  onClick={() => setModality('delivery')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                    modality === 'delivery'
                      ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/30'
                      : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      modality === 'delivery'
                        ? 'bg-red-600 text-white'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Bike className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">
                      RECEBER EM CASA
                    </span>
                    <span className="text-xs text-zinc-400 block mt-0.5 leading-snug">
                      Receba no seu endereço na Caála (Taxa fixa 500 Kz)
                    </span>
                  </div>
                </button>

                {/* Pickup Choice */}
                <button
                  type="button"
                  onClick={() => setModality('pickup')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                    modality === 'pickup'
                      ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/30'
                      : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      modality === 'pickup'
                        ? 'bg-amber-500 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">
                      VOU BUSCAR NO RESTAURANTE
                    </span>
                    <span className="text-xs text-zinc-400 block mt-0.5 leading-snug">
                      Faça seu pedido agora e retire quando estiver pronto
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Error banner */}
            {formError && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Step 2 Form: DELIVERY Form */}
            {modality === 'delivery' && (
              <div className="space-y-4 pt-1 border-t border-zinc-800/80">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Dados para Entrega ao Domicílio
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={deliveryData.customerName}
                      onChange={(e) =>
                        setDeliveryData({ ...deliveryData, customerName: e.target.value })
                      }
                      placeholder="Ex: André Marcelino"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Número de Telefone *
                    </label>
                    <input
                      type="tel"
                      value={deliveryData.phone}
                      onChange={(e) =>
                        setDeliveryData({ ...deliveryData, phone: e.target.value })
                      }
                      placeholder="Ex: 922 955 570"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Bairro ou Zona (Caála) *
                    </label>
                    <input
                      type="text"
                      value={deliveryData.neighborhood}
                      onChange={(e) =>
                        setDeliveryData({ ...deliveryData, neighborhood: e.target.value })
                      }
                      placeholder="Ex: Catelenga Nova / Centralidade"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Ponto de Referência
                    </label>
                    <input
                      type="text"
                      value={deliveryData.reference}
                      onChange={(e) =>
                        setDeliveryData({ ...deliveryData, reference: e.target.value })
                      }
                      placeholder="Ex: Próximo à igreja católica / escola"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Endereço / Rua *
                  </label>
                  <input
                    type="text"
                    value={deliveryData.address}
                    onChange={(e) =>
                      setDeliveryData({ ...deliveryData, address: e.target.value })
                    }
                    placeholder="Ex: Rua Principal, Casa nº 12"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Optional GPS Location Button */}
                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-zinc-300">
                    <span className="font-semibold block text-white">
                      📍 Localização GPS (Opcional):
                    </span>
                    {deliveryData.gpsLocation ? (
                      <span className="text-emerald-400 font-mono text-[11px] truncate block max-w-xs">
                        Coordenadas incluídas no pedido
                      </span>
                    ) : (
                      <span className="text-zinc-500 text-[11px]">
                        Facilita a localização exata do entregador na Caála
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isGettingGps}
                    className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isGettingGps ? 'Obtendo GPS...' : 'Incluir minha localização'}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Observações do Pedido (Opcional)
                  </label>
                  <input
                    type="text"
                    value={deliveryData.notes}
                    onChange={(e) =>
                      setDeliveryData({ ...deliveryData, notes: e.target.value })
                    }
                    placeholder="Ex: Sem cebola, trocar refrigerante para Fanta..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2 Form: RETIRADA Form */}
            {modality === 'pickup' && (
              <div className="space-y-4 pt-1 border-t border-zinc-800/80">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Dados para Retirada no Restaurante (Take Away)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={pickupData.customerName}
                      onChange={(e) =>
                        setPickupData({ ...pickupData, customerName: e.target.value })
                      }
                      placeholder="Ex: André Marcelino"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Número de Telefone *
                    </label>
                    <input
                      type="tel"
                      value={pickupData.phone}
                      onChange={(e) =>
                        setPickupData({ ...pickupData, phone: e.target.value })
                      }
                      placeholder="Ex: 922 955 570"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Horário aproximado que pretende buscar *
                  </label>
                  <input
                    type="time"
                    value={pickupData.pickupTime}
                    onChange={(e) =>
                      setPickupData({ ...pickupData, pickupTime: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Ex: 18:30 (horário desejado)
                  </p>
                </div>

                {/* Important notice required by prompt */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>⏳ Atenção:</strong> Aguarde a confirmação do restaurante pelo WhatsApp antes de ir buscar seu pedido. O horário informado é o desejado; a Edmilson Sabores confirmará o momento exato em que estará pronto.
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Observações do Pedido (Opcional)
                  </label>
                  <input
                    type="text"
                    value={pickupData.notes}
                    onChange={(e) =>
                      setPickupData({ ...pickupData, notes: e.target.value })
                    }
                    placeholder="Ex: Embalagem para viagem, sem chouriço..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {/* Order Summary & Total */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Resumo da Conta</span>
                <span className="font-mono text-zinc-300">{items.length} itens</span>
              </div>

              <div className="space-y-1 text-xs text-zinc-300">
                {items.map((i) => (
                  <div key={i.product.id} className="flex justify-between">
                    <span>
                      {i.quantity}x {i.product.name}
                    </span>
                    <span className="font-mono text-zinc-400">
                      {formatKz(i.product.price * i.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-800 flex justify-between text-xs text-zinc-400">
                <span>Taxa de Entrega:</span>
                <span className="font-mono text-amber-400 font-medium">
                  {modality === 'delivery' ? `${formatKz(deliveryFee)}` : 'Grátis (Retirada)'}
                </span>
              </div>

              <div className="pt-1 flex justify-between items-baseline text-base font-bold text-white">
                <span>TOTAL A PAGAR:</span>
                <span className="text-xl text-amber-400 font-mono font-black tabular-nums">
                  {formatKz(orderTotal)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleSendOrder}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2.5 cursor-pointer transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>ENVIAR PEDIDO PELO WHATSAPP</span>
              </button>

              <p className="text-center text-[11px] text-zinc-500 leading-tight">
                Destinatário oficial: <strong>+244 {RESTAURANT_CONFIG.phoneDisplay}</strong> · Edmilson Sabores
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
