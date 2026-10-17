import React from 'react';
import { ArrowRight, ShoppingCart, Bike, Clock, UtensilsCrossed, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_CONFIG, RESTAURANT_IMAGES } from '../data/restaurantData';

interface HeroProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOrderNow }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 pt-8 pb-16 lg:py-20 border-b border-zinc-800">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-[400px] h-[300px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800/60 text-red-300 text-xs sm:text-sm font-semibold tracking-wide">
              <span className="text-amber-400">🔥</span>
              <span>{RESTAURANT_CONFIG.tagline}</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-300">Caála, Huambo</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-display text-balance">
              O sabor que você <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">merece!</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Hambúrgueres deliciosos preparados para você aproveitar no local, retirar ou receber onde estiver na Centralidade e em toda a Caála.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-extrabold rounded-2xl text-base shadow-xl shadow-red-950/50 hover:shadow-red-900/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 group"
              >
                <span>🍔</span>
                <span>VER CARDÁPIO</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-amber-500/50 font-bold rounded-2xl text-base transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
              >
                <Bike className="w-5 h-5 text-amber-400" />
                <span>PEDIR AGORA</span>
              </button>
            </div>

            {/* Value checklist requested by user */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Delivery</div>
                  <div className="text-[11px] text-zinc-400">Em toda Caála</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Take Away</div>
                  <div className="text-[11px] text-zinc-400">Retirada rápida</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">No Local</div>
                  <div className="text-[11px] text-zinc-400">Serviço de mesa</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Via WhatsApp</div>
                  <div className="text-[11px] text-zinc-400">{RESTAURANT_CONFIG.phoneDisplay}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image card wrapper */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-zinc-700/80 shadow-2xl shadow-red-950/60 bg-zinc-900 group">
                <img
                  src={RESTAURANT_IMAGES.hero}
                  alt="Hambúrguer Gourmet Artesanal Edmilson Sabores"
                  className="w-full h-80 sm:h-96 lg:h-[430px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Floating promo badge */}
                <div className="absolute top-4 right-4 bg-red-600/95 backdrop-blur-md text-white text-xs font-black uppercase px-3.5 py-1.5 rounded-xl shadow-lg border border-red-400/30 flex items-center gap-1.5">
                  <span>🍔</span>
                  <span>100% ARTESANAL</span>
                </div>

                {/* Bottom photo overlay caption */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-md rounded-2xl p-3.5 border border-zinc-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-amber-400 uppercase font-bold tracking-wider block">
                      Especialidade da Casa
                    </span>
                    <span className="text-sm font-bold text-white block">
                      Hambúrgueres com Batata Palha & Ovos
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 block">A partir de</span>
                    <span className="text-base font-extrabold text-amber-400 font-mono">1.450 Kz</span>
                  </div>
                </div>
              </div>

              {/* Delivery banner badge */}
              <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 font-bold">
                  🛵
                </div>
                <div className="text-xs text-zinc-300">
                  <strong className="text-white">Taxa de Entrega Fixa: 500 Kz</strong> em qualquer ponto da Caála.
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
