import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DeliverySection } from './components/DeliverySection';
import { ReservationSection } from './components/ReservationSection';
import { AboutSection } from './components/AboutSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastNotification } from './components/ToastNotification';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';

function RestaurantApp() {
  const [activeSection, setActiveSection] = useState('inicio');
  const { setIsCartOpen, setIsCheckoutOpen } = useCart();

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExploreMenu = () => {
    handleNavigate('cardapio');
  };

  const handleOrderNow = () => {
    handleNavigate('cardapio');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Sections */}
      <main className="flex-1">
        <div id="inicio">
          <Hero onExploreMenu={handleExploreMenu} onOrderNow={handleOrderNow} />
        </div>

        <MenuSection />

        <DeliverySection />

        <ReservationSection />

        <AboutSection />

        <LocationSection />
      </main>

      {/* Contact & Footer */}
      <ContactSection onNavigate={handleNavigate} />

      {/* Interactive Cart Drawer & Checkout Dialog */}
      <CartDrawer />
      <CheckoutModal />

      {/* Toast feedback */}
      <ToastNotification />

      {/* Floating WhatsApp Action for Desktop */}
      <FloatingWhatsApp />

      {/* Fixed bottom navigation bar for Smartphones */}
      <MobileBottomNav onNavigate={handleNavigate} activeSection={activeSection} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <RestaurantApp />
    </CartProvider>
  );
}
