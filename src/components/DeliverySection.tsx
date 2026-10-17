import React from 'react';
import { Bike, MapPin, Clock, ShieldCheck, MessageCircle, HelpCircle } from 'lucide-react';
import { RESTAURANT_CONFIG, formatKz } from '../data/restaurantData';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const DeliverySection: React.FC = () => {
  const handleConsultDelivery = () => {
    const text = `Olá! Vim pelo site da ${RESTAURANT_CONFIG.name} e gostaria de consultar se vocês fazem entrega no meu bairro aqui na Caála.`;
    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="delivery" className="py-16 sm:py-20 bg-zinc-900 border-y border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 rounded-3xl p-6 sm:p-10 lg:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Description & Call to action */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Bike className="w-3.5 h-3.5" />
                <span>Serviço de Delivery Caála</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
                Receba seu pedido <span className="text-amber-500">onde estiver</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Preparamos seu lanche com todo o capricho e entregamos quentinho na sua casa ou trabalho na Caála. Como a área exata pode variar conforme a distância:
              </p>

              {/* Informative advice required by prompt */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-700/60 text-xs sm:text-sm text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>Consulte pelo WhatsApp se fazemos entrega na sua localização</span>
                </div>
                <p className="text-zinc-400 text-xs">
                  Taxa promocional do folheto: apenas <strong>{formatKz(RESTAURANT_CONFIG.deliveryFee)}</strong> para os pontos atendidos na Caála.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
                <button
                  onClick={handleConsultDelivery}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>CONSULTAR ENTREGA NO WHATSAPP</span>
                </button>
              </div>
            </div>

            {/* Right Column: Key Delivery Features */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              
              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Preparado na Hora</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Hambúrgueres grelhados na chapa e batatas estaladiças preparadas após seu pedido.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Base na Catelenga Nova</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Saídas rápidas a partir do nosso ponto junto à igreja católica na Caála.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Embalagem Segura</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Lanches acomodados de forma térmica para manter crocância e temperatura ideais.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
