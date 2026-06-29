import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, Clock, Star, Sparkles, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, language } = useApp();
  const [time, setTime] = useState<string>('');

  // Update digital clock every second
  useEffect(() => {
    const updateTime = () => {
      // Calculate local time in Bishkek (UTC+6)
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const bishkekTime = new Date(utc + 3600000 * 6);
      
      const hours = bishkekTime.getHours().toString().padStart(2, '0');
      const minutes = bishkekTime.getMinutes().toString().padStart(2, '0');
      const seconds = bishkekTime.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOrderNowClick = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 bg-[#0a0a0a] overflow-hidden flex items-center">
      {/* Mesh gradients for extra premium bento feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Bento Grid Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Bento Card 1: MAIN HERO CARD (col-span-8) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl border border-[#d4af37]/20 relative overflow-hidden p-8 sm:p-12 min-h-[460px] flex flex-col justify-between group">
            {/* Background cover image with sleek parallax-like overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200"
                alt="Premium gourmet dining background"
                className="w-full h-full object-cover opacity-35 scale-100 group-hover:scale-105 transition-all duration-[8000ms]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent"></div>
            </div>

            {/* Top Row: Label */}
            <div className="relative z-10 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping"></span>
              <span className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.3em] italic">
                {language === 'ru' ? 'Премиум опыт' : language === 'ky' ? 'Премиум тажрыйба' : 'Premium Experience'}
              </span>
            </div>

            {/* Middle Row: Titles */}
            <div className="relative z-10 my-8">
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-[1.1]">
                {t('appName')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-yellow-300 to-[#d4af37]">
                  {language === 'ru' ? 'Искусство Кулинарии' : language === 'ky' ? 'Ашкана Искусствосу' : 'Culinary Artistry'}
                </span>
              </h1>
              <p className="text-gray-400 font-sans font-light text-xs sm:text-sm max-w-xl leading-relaxed mb-1 text-justify">
                {t('heroSubtitle')}
              </p>
            </div>

            {/* Bottom Row: Actions */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={handleOrderNowClick}
                className="w-full sm:w-auto bg-[#d4af37] text-black px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>{t('orderNow')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleOrderNowClick}
                className="w-full sm:w-auto bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-[#d4af37]/40 px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest transition-all cursor-pointer text-center"
              >
                {t('exploreMenu')}
              </button>
            </div>
          </div>

          {/* Bento Card 2: SYSTEM STATUS & REAL-TIME BISHKEK CLOCK (col-span-4) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-3xl border border-white/5 p-8 flex flex-col justify-between relative overflow-hidden min-h-[460px] group hover:border-[#d4af37]/30 transition-all duration-300">
            {/* Ambient gold glow in top right */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-[40px]"></div>

            {/* Top row: Status indicators */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-1">
                  {language === 'ru' ? 'Ресторан' : language === 'ky' ? 'Ресторан' : 'RESTAURANT'}
                </span>
                <div className="flex items-center space-x-1.5 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-green-400 font-mono text-[9px] font-bold tracking-widest uppercase">
                    {language === 'ru' ? 'Открыто' : language === 'ky' ? 'Ачык' : 'OPEN'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-1">
                  {language === 'ru' ? 'Расположение' : language === 'ky' ? 'Жайгашкан жери' : 'LOCATION'}
                </span>
                <span className="text-xs font-serif text-[#d4af37] italic flex items-center justify-end gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Bishkek
                </span>
              </div>
            </div>

            {/* Middle row: Live clock */}
            <div className="my-8 text-center sm:text-left">
              <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-1">
                {language === 'ru' ? 'Текущее время Бишкека' : language === 'ky' ? 'Бишкек убактысы' : 'BISHKEK LIVE TIME'}
              </span>
              <div className="text-4xl sm:text-5xl font-mono text-[#d4af37] tracking-wider font-semibold my-2 bg-black/40 py-3 px-4 rounded-2xl border border-white/5 shadow-inner">
                {time || '10:00:00'}
              </div>
              <p className="text-[10px] text-white/50 leading-relaxed max-w-xs mt-2">
                {language === 'ru' 
                  ? 'Принимаем заказы на доставку и бронирование столов.' 
                  : language === 'ky'
                  ? 'Жеткирүүгө жана столдорду ээлеп коюуга заказдарды кабыл алабыз.'
                  : 'We accept active delivery orders and table reservations.'}
              </p>
            </div>

            {/* Bottom row: Chef recommendations */}
            <div className="bg-[#d4af37]/10 p-4 rounded-2xl border border-[#d4af37]/20 flex gap-3.5 items-center">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[#d4af37] text-[9px] uppercase tracking-widest font-bold block mb-0.5">
                  {language === 'ru' ? 'РЕКОМЕНДАЦИЯ ШЕФА' : language === 'ky' ? 'АШПОЗЧУНУН СУНУШУ' : 'CHEF RECOMMENDATION'}
                </span>
                <span className="text-xs text-white font-medium block leading-tight">
                  {language === 'ru' ? 'Плов Ханский «Алтын»' : language === 'ky' ? 'Хан Плови «Алтын»' : 'Royal Khan Plov'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
