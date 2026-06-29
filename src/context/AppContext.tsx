import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, CartItem, Dish, Review, OrderDetails } from '../types';
import { DICTIONARY, SEEDED_REVIEWS } from '../data';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (dish: Dish) => void;
  removeFromCart: (dishId: string) => void;
  updateCartQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  reviews: Review[];
  addReview: (author: string, rating: number, comment: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language State
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('altyn_lang');
    return (saved as Language) || 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('altyn_lang', lang);
  };

  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('altyn_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('altyn_theme', nextTheme);
  };

  // Sync theme with HTML class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('altyn_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('altyn_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (dish: Dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const updateCartQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.dish.id === dishId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('altyn_reviews');
    return saved ? JSON.parse(saved) : SEEDED_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem('altyn_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (author: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Translation Helper
  const t = (key: string): string => {
    const entry = DICTIONARY[key];
    if (!entry) return key;
    return entry[language] || entry['en'] || key;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        reviews,
        addReview,
        isCartOpen,
        setIsCartOpen,
        isChatOpen,
        setIsChatOpen,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
