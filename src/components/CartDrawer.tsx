import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatKz } from '../data/restaurantData';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItemsCount,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over panel */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Seu Pedido</h2>
              <p className="text-xs text-zinc-400 font-medium">
                {totalItemsCount} {totalItemsCount === 1 ? 'item selecionado' : 'itens selecionados'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Fechar Carrinho"
            className="p-2 rounded-xl bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-zinc-400">
              <div className="w-20 h-20 rounded-full bg-zinc-800/60 flex items-center justify-center text-4xl">
                🛒
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Seu carrinho está vazio</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  Adicione nossos deliciosos hambúrgueres, cachorros e batatas para montar seu pedido.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg"
              >
                Ver Cardápio
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-center gap-3.5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-zinc-800 border border-zinc-700/50"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate font-display">
                      {item.product.name}
                    </h4>
                    <div className="text-xs text-amber-400 font-mono font-semibold">
                      {formatKz(item.product.price)} cada
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center cursor-pointer text-xs"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white font-mono tabular-nums px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center cursor-pointer text-xs"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-16 shrink-0">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-zinc-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-white font-mono tabular-nums">
                      {formatKz(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-1">
                <button
                  onClick={clearCart}
                  className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Esvaziar carrinho
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-950/90 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Subtotal dos produtos:</span>
                <span className="font-mono text-zinc-200 tabular-nums">{formatKz(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Entrega em Caála:</span>
                <span className="text-amber-400 font-medium">500 Kz (ou Grátis p/ Retirada)</span>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-center text-base font-bold text-white">
                <span>Subtotal:</span>
                <span className="text-xl text-amber-400 font-mono font-extrabold tabular-nums">
                  {formatKz(subtotal)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 px-4 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-red-950/50 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>FINALIZAR PEDIDO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold text-xs rounded-xl text-center cursor-pointer"
              >
                CONTINUAR COMPRANDO
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
