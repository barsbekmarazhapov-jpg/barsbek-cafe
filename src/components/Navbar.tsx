import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    cart,
    setIsCartOpen,
    t
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const languagesList: { code: Language; label: string }[] = [
    { code: 'ru', label: 'Русский' },
    { code: 'ky', label: 'Кыргызча' },
    { code: 'en', label: 'English' }
  ];

  const currentLangLabel = languagesList.find((l) => l.code === language)?.label || 'Русский';

  const navLinks = [
    { id: 'hero', label: t('navHome') },
    { id: 'menu', label: t('navMenu') },
    { id: 'gallery', label: t('navGallery') },
    { id: 'reviews', label: t('navReviews') },
    { id: 'contacts', label: t('navContacts') }
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-white/90 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tighter text-[#d4af37] hover:opacity-90 transition-opacity">
              {t('appName')} <span className="text-gray-900 dark:text-white font-light">GRILLE</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-700 dark:text-white/70 hover:text-[#d4af37] dark:hover:text-[#d4af37] transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions Menu */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Language Selection Pill (Bento Design style) */}
            <div className="flex bg-gray-100 dark:bg-[#1a1a1a] p-1 rounded-full border border-gray-200 dark:border-[#d4af37]/30">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#d4af37] text-black shadow-sm'
                      : 'text-gray-600 dark:text-white dark:opacity-50 opacity-70 hover:opacity-100'
                  }`}
                >
                  {lang.code === 'ru' ? 'RU' : lang.code === 'ky' ? 'KG' : 'EN'}
                </button>
              ))}
            </div>

            {/* Social Icons list */}
            <div className="flex gap-2">
              <a
                href="https://instagram.com/altyn_restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-[10px] text-gray-700 dark:text-white hover:border-[#d4af37] dark:hover:border-[#d4af37] transition-all"
                title="Instagram"
              >
                IG
              </a>
              <a
                href="https://wa.me/996555123456"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-[10px] text-gray-700 dark:text-white hover:border-[#d4af37] dark:hover:border-[#d4af37] transition-all"
                title="WhatsApp"
              >
                WA
              </a>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors cursor-pointer p-1.5 rounded-full border border-gray-200 dark:border-[#1a1a1a]"
              title={theme === 'dark' ? t('themeLight') : t('themeDark')}
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-gold" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-luxury-black text-[#d4af37] dark:bg-[#d4af37] dark:text-black hover:scale-105 rounded-full transition-all shadow-md flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-sans text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white dark:border-luxury-black animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile elements (Cart + Hamburguer) */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Cart trigger for mobile */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-luxury-black text-gold dark:bg-gold dark:text-luxury-black rounded-full flex items-center justify-center cursor-pointer shadow"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-sans text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold p-1.5 rounded-md cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-luxury-gray/50 bg-white dark:bg-luxury-black shadow-2xl animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-2.5 px-4 text-base font-medium rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gold/10 hover:text-gold dark:hover:bg-gold/10 transition-colors"
              >
                {link.label}
              </button>
            ))}

            <hr className="border-gray-100 dark:border-luxury-gray/50 my-2" />

            {/* Theme Toggle in Mobile */}
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {theme === 'dark' ? t('themeDark') : t('themeLight')}
              </span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-luxury-gray text-gold"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>
            </div>

            {/* Language Selection in Mobile */}
            <div className="px-4 py-2">
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Язык / Тил / Language
              </span>
              <div className="grid grid-cols-3 gap-2">
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    className={`py-2 px-1 text-center rounded text-xs font-semibold transition-all ${
                      language === lang.code
                        ? 'bg-gold text-luxury-black shadow-md'
                        : 'bg-gray-100 dark:bg-luxury-gray text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {lang.code === 'ru' ? 'РУ' : lang.code === 'ky' ? 'КГ' : 'EN'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
