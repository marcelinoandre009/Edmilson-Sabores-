import React from 'react';
import { MessageCircle } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    const text = 'Olá! Vim pelo site da Edmilson Sabores e gostaria de obter mais informações.';
    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Falar com Edmilson Sabores no WhatsApp"
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/60 transition-all hover:scale-105 active:scale-95 cursor-pointer border-2 border-emerald-400/30 group"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
      </div>
      <div className="text-left pr-1">
        <span className="block text-[10px] text-emerald-200 uppercase font-bold tracking-wider leading-none">
          Dúvidas & Pedidos
        </span>
        <span className="text-xs font-extrabold text-white">
          WhatsApp Oficial
        </span>
      </div>
    </button>
  );
};
