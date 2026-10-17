import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, MapPin, Utensils } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', id: 'inicio' },
    { label: 'Cardápio', id: 'cardapio' },
    { label: 'Delivery', id: 'delivery' },
    { label: 'Reservar Mesa', id: 'reservar' },
    { label: 'Sobre Nós', id: 'sobre' },
    { label: 'Localização', id: 'localizacao' },
    { label: 'Contacto', id: 'contacto' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-red-700 text-amber-100 text-xs py-1.5 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">📍 Caála:</span>
            <span className="truncate">Bairro Catelenga Nova junto à igreja católica</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-amber-200">🛵 Taxa de entrega fixa: 500 Kz</span>
            <span className="text-zinc-300">·</span>
            <a
              href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1 font-semibold text-white"
            >
              <Phone className="w-3 h-3" /> {RESTAURANT_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Navigation conforming to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-6">
          
          {/* Zone 1: Brand wordmark */}
          <button
            onClick={() => handleLinkClick('inicio')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-red-950/40 group-hover:scale-105 transition-transform">
              <span className="text-xl">🍔</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-display block leading-none">
                EDMILSON <span className="text-amber-500 font-extrabold">SABORES</span>
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-medium">
                O gosto das ruas · Caála
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Ver Carrinho de Compras"
              className="relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-red-900/30 transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrinho</span>
              <span className="bg-zinc-950 text-amber-400 text-xs px-2 py-0.5 rounded-full font-bold tabular-nums">
                {totalItemsCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir Menu"
              className="lg:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown sheet */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-900/98 border-b border-zinc-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left py-2.5 px-3 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-amber-400 font-medium text-base transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-zinc-800 mt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleLinkClick('cardapio');
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-center shadow-md text-sm flex items-center justify-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  FAZER PEDIDO NO CARDÁPIO
                </button>
                <a
                  href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-center text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp ({RESTAURANT_CONFIG.phoneDisplay})
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
