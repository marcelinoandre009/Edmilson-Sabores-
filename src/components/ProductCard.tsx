import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, AlertCircle, Sparkles } from 'lucide-react';
import { Product } from '../types/restaurant';
import { formatKz } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  const handleIncrement = () => setQuantity((q) => Math.min(20, q + 1));
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (!product.available) return;
    addItem(product, quantity);
    // keep quantity at 1 for next time
    setQuantity(1);
  };

  return (
    <div
      className={`group relative rounded-3xl bg-zinc-900/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        product.available
          ? 'border-zinc-800 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/50'
          : 'border-zinc-800/60 opacity-80'
      }`}
    >
      {/* Top Image area */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-950">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              !product.available ? 'grayscale' : ''
            }`}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950 text-zinc-500 p-4 text-center">
            <span className="text-4xl mb-1">🍔</span>
            <span className="text-xs font-semibold text-zinc-400">{product.name}</span>
          </div>
        )}

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {product.badge && product.available && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase bg-amber-500 text-zinc-950 shadow-md">
              {product.badge}
            </span>
          )}
          {!product.available && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1 shadow-md">
              <AlertCircle className="w-3 h-3 text-red-400" />
              Indisponível hoje
            </span>
          )}
          <span className="ml-auto px-2.5 py-1 rounded-lg text-xs font-extrabold bg-zinc-950/85 backdrop-blur-md text-amber-400 border border-zinc-800 font-mono tabular-nums">
            {formatKz(product.price)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-display">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Ingredients list */}
          <div className="mt-3 pt-3 border-t border-zinc-800/80">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">
              Ingredientes principais:
            </span>
            <div className="text-xs text-zinc-300 leading-relaxed">
              {product.ingredients.join(' · ')}
            </div>
          </div>
        </div>

        {/* Purchase Module: Quantity Stepper & Add Button */}
        <div className="pt-2">
          {product.available ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-3 bg-zinc-950/60 p-1.5 rounded-2xl border border-zinc-800">
                <span className="text-xs text-zinc-400 font-medium pl-2">Quantidade:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    aria-label="Diminuir quantidade"
                    className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-white font-mono tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    aria-label="Aumentar quantidade"
                    className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 active:scale-98 text-white font-bold text-sm shadow-lg shadow-red-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar ao carrinho</span>
                <span className="text-xs font-normal opacity-90 font-mono">
                  ({formatKz(product.price * quantity)})
                </span>
              </button>
            </div>
          ) : (
            <div className="w-full py-3.5 px-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 font-medium text-xs text-center flex items-center justify-center gap-2 cursor-not-allowed">
              <AlertCircle className="w-4 h-4 text-zinc-500" />
              <span>Produto temporariamente indisponível</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
