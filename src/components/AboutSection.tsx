import React from 'react';
import { Sparkles, Utensils, Users, Heart, Coffee, ShieldCheck, Car } from 'lucide-react';
import { RESTAURANT_CONFIG, RESTAURANT_IMAGES } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-16 sm:py-20 bg-zinc-900/60 border-t border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Real photo of restaurant ambiance */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border-2 border-zinc-800 shadow-2xl relative bg-zinc-950 group">
              <img
                src={RESTAURANT_IMAGES.ambiance}
                alt="Ambiente acolhedor da Edmilson Sabores na Caála"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Espaço Familiar na Caála
                </span>
                <p className="text-sm font-semibold text-zinc-200">
                  Ambiente acolhedor, casual e sossegado para o seu almoço, jantar ou lanche rápido.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Confirmed authentic business info */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sobre a Edmilson Sabores</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
              Especialistas em fast food com o <span className="text-amber-500">verdadeiro gosto das ruas</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              A <strong>Edmilson Sabores</strong> é uma empresa especializada em fast food e lanches artesanais, localizada no bairro Catelenga Nova junto à igreja católica, na Caála. Trabalhamos diariamente com ingredientes frescos, pães macios, bifes saborosos e os autênticos complementos das ruas que todo mundo adora.
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Seja para um almoço saboroso, um jantar sossegado com amigos ou uma refeição rápida para levar para casa, oferecemos atendimento atencioso, serviço de mesa e entrega rápida em toda a região.
            </p>

            {/* Confirmed attributes from Google Maps screenshots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ambiente Acolhedor</h4>
                  <p className="text-[11px] text-zinc-400">Casual, sossegado e para crianças</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ideal para Grupos</h4>
                  <p className="text-[11px] text-zinc-400">Mesas para famílias e confraternizações</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Serviço Completo</h4>
                  <p className="text-[11px] text-zinc-400">Entrega, take away e serviço de mesa</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Estacionamento Grátis</h4>
                  <p className="text-[11px] text-zinc-400">Fácil estacionamento gratuito na rua</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
