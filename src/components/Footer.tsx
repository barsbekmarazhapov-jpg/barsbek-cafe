import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, Instagram, MessageCircle, Send, Clock, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useApp();

  return (
    <footer id="contacts-footer" className="bg-[#0a0a0a] text-white py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Info Grid in Bento Card container style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Bento Card 1: Brand details */}
          <div className="bg-[#111] p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-[#d4af37]/10 transition-all duration-300 min-h-[220px]">
            <div>
              <span className="text-2xl font-serif font-bold tracking-tighter text-[#d4af37] block mb-3">
                {t('appName')} <span className="text-white font-light">GRILLE</span>
              </span>
              <p className="text-[11px] text-white/50 font-sans font-light leading-relaxed">
                {language === 'ru' 
                  ? 'Ресторан высокой кухни, объединяющий восточное гостеприимство и европейскую изысканность. Золотой стандарт вашего отдыха.'
                  : language === 'ky'
                  ? 'Чыгыштын меймандостугу менен европалык кооздукту айкалыштырган жогорку ашкана рестораны. Сиздин эс алууңуздун алтын стандарты.'
                  : 'A high-cuisine restaurant blending Eastern hospitality with European sophistication. The golden standard of your dining experience.'}
              </p>
            </div>
            {/* Social Icons list */}
            <div className="flex space-x-2.5 pt-4">
              <a
                href="https://wa.me/996555123456"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[11px] text-white/60 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300"
                title="WhatsApp"
              >
                WA
              </a>
              <a
                href="https://t.me/altyn_restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[11px] text-white/60 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300"
                title="Telegram"
              >
                TG
              </a>
              <a
                href="https://instagram.com/altyn_restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[11px] text-white/60 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300"
                title="Instagram"
              >
                IG
              </a>
            </div>
          </div>

          {/* Bento Card 2: Working Hours */}
          <div className="bg-[#111] p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-[#d4af37]/10 transition-all duration-300 min-h-[220px]">
            <div>
              <h4 className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest flex items-center space-x-2 mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>{t('hoursTitle')}</span>
              </h4>
              <div className="space-y-2 text-xs text-white/60 font-sans font-light">
                <p className="font-semibold text-white">{t('hoursDays')}</p>
                <p className="text-[#d4af37] font-serif text-lg font-bold mt-1">{t('hoursTime')}</p>
              </div>
            </div>
            <div className="text-[9px] text-white/30 uppercase tracking-widest">
              7 Days a Week
            </div>
          </div>

          {/* Bento Card 3: Quick Contacts */}
          <div className="bg-[#111] p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-[#d4af37]/10 transition-all duration-300 min-h-[220px]">
            <div>
              <h4 className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest flex items-center space-x-2 mb-4">
                <Phone className="w-3.5 h-3.5" />
                <span>{t('contactsTitle')}</span>
              </h4>
              <ul className="space-y-3 text-xs text-white/60 font-sans font-light">
                <li>
                  <a href="tel:+996555123456" className="hover:text-[#d4af37] transition-colors flex items-center space-x-2">
                    <span>+996 (555) 12-34-56</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@altyn-restaurant.kg" className="hover:text-[#d4af37] transition-colors flex items-center space-x-2">
                    <span>info@altyn-restaurant.kg</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-[9px] text-white/30 uppercase tracking-widest">
              Direct Contact
            </div>
          </div>

          {/* Bento Card 4: Address info */}
          <div className="bg-[#111] p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-[#d4af37]/10 transition-all duration-300 min-h-[220px]">
            <div>
              <h4 className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest flex items-center space-x-2 mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>Адрес / Address</span>
              </h4>
              <p className="text-xs text-white/60 font-sans font-light leading-relaxed">
                {t('mapAddressText')}
              </p>
            </div>
            <div className="text-[9px] text-white/30 uppercase tracking-widest">
              Heart of Bishkek
            </div>
          </div>

        </div>

        {/* Divider & Copyright - Designed as a beautiful minimalist row */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/40 gap-4">
          <p>© 2026 {t('appName')} RESTAURANT GROUP</p>
          <div className="flex gap-6">
            <span className="hover:text-[#d4af37] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#d4af37] transition-colors cursor-pointer">Terms of Service</span>
            <span className="text-white/20">SEO Optimized by LuxAgency</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
