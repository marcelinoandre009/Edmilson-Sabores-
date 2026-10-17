import React from 'react';
import { Home, Utensils, ShoppingBag, Calendar, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface MobileBottomNavProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigate, activeSection }) => {
  const { totalItemsCount, setIsCartOpen } = useCart();

  const handleWhatsApp = () => {
    const text = 'Olá! Vim pelo site da Edmilson Sabores e gostaria de obter mais informações.';
    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-5 items-center gap-1">
        
        {/* Início */}
        <button
          onClick={() => onNavigate('inicio')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeSection === 'inicio' ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-none">Início</span>
        </button>

        {/* Cardápio */}
        <button
          onClick={() => onNavigate('cardapio')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeSection === 'cardapio' ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Utensils className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-none">Cardápio</span>
        </button>

        {/* Carrinho com contador */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 text-zinc-400 hover:text-white transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-amber-500" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] leading-none font-semibold text-amber-400">Carrinho</span>
        </button>

        {/* Reservar */}
        <button
          onClick={() => onNavigate('reservar')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeSection === 'reservar' ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-none">Reservar</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-1 text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 fill-current" />
          <span className="text-[10px] leading-none font-semibold">WhatsApp</span>
        </button>

      </div>
    </div>
  );
};
