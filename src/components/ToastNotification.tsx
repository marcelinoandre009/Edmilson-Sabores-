import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage, closeToast, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm bg-zinc-900 border border-emerald-500/40 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-center gap-2.5 min-w-0">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-xs font-semibold text-zinc-100 truncate">
          {toastMessage}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            closeToast();
            setIsCartOpen(true);
          }}
          className="text-[11px] font-bold text-amber-400 hover:underline uppercase"
        >
          Ver
        </button>
        <button
          onClick={closeToast}
          className="p-1 text-zinc-400 hover:text-white rounded-md transition-colors"
          aria-label="Fechar notificação"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
