import React from 'react';
import { MapPin, Navigation, ExternalLink, Clock, Phone } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-16 sm:py-20 bg-zinc-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Onde Estamos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Venha nos <span className="text-amber-500">Visitar na Caála</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Fácil acesso e excelente localização no bairro Catelenga Nova, bem próximo à igreja católica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Location Details Card */}
          <div className="lg:col-span-5 bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase font-extrabold text-amber-500 tracking-wider block">
                  Restaurante & Hamburgaria
                </span>
                <h3 className="text-2xl font-black text-white font-display mt-1">
                  {RESTAURANT_CONFIG.name}
                </h3>
                <p className="text-sm text-zinc-300 mt-2 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                  <span>{RESTAURANT_CONFIG.fullAddress}</span>
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-zinc-800 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-zinc-400 block text-xs">WhatsApp & Telefone:</span>
                    <strong className="text-white font-mono">{RESTAURANT_CONFIG.phoneDisplay}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-zinc-400 block text-xs">Horário de Funcionamento:</span>
                    <span className="text-zinc-200">Almoço e Jantar (Consulte horário pelo WhatsApp)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={RESTAURANT_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all border border-zinc-700 hover:border-amber-500 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>VER NO GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 ml-1" />
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl relative min-h-[340px] sm:min-h-[380px]">
            <iframe
              title="Localização Edmilson Sabores Caála"
              src="https://maps.google.com/maps?q=Caala,+Huambo,+Angola&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[340px] sm:min-h-[380px] border-0"
              loading="lazy"
              allowFullScreen
            />
            
            {/* Top map overlay pin badge */}
            <div className="absolute top-3 left-3 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 text-xs px-3.5 py-2 rounded-xl text-white shadow-lg flex items-center gap-2 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold">Edmilson Sabores · Catelenga Nova, Caála</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
