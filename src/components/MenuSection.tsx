import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data';
import { Dish } from '../types';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { addToCart, t, language } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'breakfast' | 'main' | 'drink' | 'dessert'>('all');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: t('allCategories'), emoji: '🍽️' },
    { id: 'breakfast', label: t('breakfasts'), emoji: '🍳' },
    { id: 'main', label: t('mains'), emoji: '🥩' },
    { id: 'drink', label: t('drinks'), emoji: '🍷' },
    { id: 'dessert', label: t('desserts'), emoji: '🍰' }
  ];

  const filteredDishes = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((dish) => dish.category === activeCategory);

  const handleAddToCart = (dish: Dish) => {
    addToCart(dish);
    setAddedItems((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [dish.id]: false }));
    }, 2000);
  };

  return (
    <section id="menu" className="py-24 bg-[#0a0a0a] border-t border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#d4af37] text-sm font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>{t('navMenu')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 tracking-tight">
            {language === 'ru' ? 'Гастрономическое Искусство' : language === 'ky' ? 'Изыскандуу Даамдар' : 'Gourmet Gastronomy'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>

        {/* Bento-style Category Selector Container */}
        <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-3xl p-6 sm:p-8 border border-white/5 mb-12 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              {language === 'ru' ? 'Категории меню' : language === 'ky' ? 'Меню категориялары' : 'Menu Categories'}
            </h3>
            <span className="text-[10px] text-white/40 italic">
              {categories.length} {language === 'ru' ? 'категорий' : language === 'ky' ? 'категория' : 'Categories'}
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between h-28 ${
                    isSelected
                      ? 'border-[#d4af37]/50 bg-gradient-to-br from-[#d4af37]/15 to-[#d4af37]/5 text-white shadow-lg'
                      : 'bg-white/5 border-white/5 text-white/70 hover:text-white hover:border-[#d4af37]/30'
                  }`}
                >
                  <div className="text-2xl mb-2">{cat.emoji}</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider leading-tight">
                    {cat.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="flex flex-col sm:flex-row bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-[#d4af37]/20 transition-all duration-300 group shadow-lg"
            >
              {/* Dish Image Container (Grayscale transition) */}
              <div className="relative w-full sm:w-48 lg:w-56 h-48 sm:h-auto overflow-hidden shrink-0">
                <img
                  src={dish.image}
                  alt={dish.name[language]}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Popular Badge */}
                {dish.isPopular && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-[#d4af37] to-yellow-500 text-black text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded shadow-md">
                    {t('popularBadge')}
                  </span>
                )}
              </div>

              {/* Dish Details */}
              <div className="flex flex-col justify-between p-6 sm:p-8 flex-grow">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                      {dish.name[language]}
                    </h3>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#d4af37] whitespace-nowrap bg-[#d4af37]/10 px-2.5 py-1 rounded-lg">
                      {dish.price} <span className="text-xs uppercase tracking-tighter opacity-70">C</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/50 font-sans font-light leading-relaxed mb-6">
                    {dish.description[language]}
                  </p>
                </div>

                {/* Add To Cart Button */}
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleAddToCart(dish)}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl text-[10px] uppercase font-bold tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer border ${
                      addedItems[dish.id]
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'bg-white/5 hover:bg-[#d4af37] text-white hover:text-black border-white/10 hover:border-[#d4af37]'
                    }`}
                  >
                    {addedItems[dish.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{t('added')}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{t('addToOrder')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
