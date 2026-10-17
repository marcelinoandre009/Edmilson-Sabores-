import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowUp, Heart } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface ContactSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const handleOpenWhatsApp = () => {
    const text = 'Olá! Vim pelo site da Edmilson Sabores e gostaria de obter mais informações.';
    window.open(createWhatsAppUrl(text), '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacto" className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 pt-16 pb-24 lg:pb-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white text-lg">
                🍔
              </div>
              <span className="text-xl font-black text-white font-display">
                EDMILSON <span className="text-amber-500">SABORES</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              O verdadeiro gosto das ruas! Especialistas em hambúrgueres artesanais, cachorros, batatas e combos na Caála, Huambo.
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                Localização:
              </span>
              <span className="text-xs text-zinc-300">
                Bairro Catelenga Nova, junto à igreja católica, Caála.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cardapio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Cardápio Digital
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('delivery')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Serviço de Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservar')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Reserva de Mesa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('localizacao')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Onde Estamos
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Fale Conosco
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block text-[11px]">Telefone Principal</span>
                  <a
                    href={`tel:${RESTAURANT_CONFIG.phoneDisplay.replace(/\s+/g, '')}`}
                    className="hover:text-amber-400 font-mono font-semibold text-white"
                  >
                    {RESTAURANT_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block text-[11px]">WhatsApp Oficial</span>
                  <a
                    href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 font-mono font-semibold text-white"
                  >
                    +244 {RESTAURANT_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Horários */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Horário de Funcionamento
            </h4>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Almoço & Jantar</span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Consulte nosso horário exato e escala do dia diretamente pelo WhatsApp.
              </p>
              <button
                onClick={handleOpenWhatsApp}
                className="w-full py-2 px-3 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Consultar no WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Edmilson Sabores · Caála, Huambo, Angola. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4">
            <span>O verdadeiro gosto das ruas!</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
