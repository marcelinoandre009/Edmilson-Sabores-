import React, { useState, useMemo } from 'react';
import { Search, X, Utensils, Sparkles, Filter } from 'lucide-react';
import { INITIAL_PRODUCTS, MENU_CATEGORIES } from '../data/restaurantData';
import { ProductCategory, Product } from '../types/restaurant';
import { ProductCard } from './ProductCard';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'todos' || product.category === selectedCategory;

      // Search match
      const searchLower = searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const descMatch = product.description.toLowerCase().includes(searchLower);
      const ingredientsMatch = product.ingredients.some((ing) =>
        ing.toLowerCase().includes(searchLower)
      );

      return categoryMatch && (searchLower === '' || nameMatch || descMatch || ingredientsMatch);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="cardapio" className="py-16 sm:py-20 bg-zinc-950 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cardápio Digital Edmilson Sabores</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display">
            Escolha o seu <span className="text-amber-500">lanche favorito</span>
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400">
            Hambúrgueres suculentos, cachorros especiais, batatas e combos com entrega rápida em toda a Caála. Monte seu pedido e envie direto para o WhatsApp!
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-5 mb-10">
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar no cardápio (ex: X-Burguer, batata, salsicha, refrigerante)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Limpar pesquisa"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 scale-102'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter & Active Filter Badge */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-6 pb-2 border-b border-zinc-800/80">
          <span>
            Mostrando <strong className="text-white font-mono tabular-nums">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'itens'} no cardápio
          </span>
          {searchQuery && (
            <span className="text-amber-400">
              Filtro ativo: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-zinc-800/80 p-8 space-y-4">
            <span className="text-5xl block">🔍</span>
            <h3 className="text-lg font-bold text-white font-display">
              Nenhum produto encontrado
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              Não encontramos nenhum item correspondente a "{searchQuery}". Tente usar outros termos ou veja todas as opções do cardápio.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Ver Cardápio Completo
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
