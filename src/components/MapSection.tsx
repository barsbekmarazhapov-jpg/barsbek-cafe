import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Navigation, Compass, Phone, Clock } from 'lucide-react';

export const MapSection: React.FC = () => {
  const { t, language } = useApp();

  // Coordinates of Chuy Avenue 128A, Bishkek (Ala-Too Square Area)
  const latitude = 42.87611;
  const longitude = 74.60389;

  // Link to build route on Google Maps
  const googleMapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <section id="contacts" className="py-24 bg-[#0a0a0a] border-t border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#d4af37] text-sm font-semibold tracking-widest uppercase mb-3">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>{t('navMap')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 tracking-tight">
            {t('mapTitle')}
          </h2>
          <p className="text-sm sm:text-base text-white/50 font-sans font-light max-w-lg mx-auto">
            {t('mapSubtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4"></div>
        </div>

        {/* Content Box (Bento Layout) */}
        <div className="bg-[#111] rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left Details Panel */}
          <div className="p-8 sm:p-12 lg:w-2/5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3.5 bg-[#d4af37]/10 text-[#d4af37] rounded-2xl flex-shrink-0 border border-[#d4af37]/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    {t('mapTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-sans font-light leading-relaxed">
                    {t('mapAddressText')}
                  </p>
                </div>
              </div>

              {/* Extra details about premium parking & valet */}
              <div className="border-t border-white/5 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                  VIP Valet Parking
                </h4>
                <p className="text-xs text-white/50 font-sans font-light leading-relaxed text-justify">
                  {language === 'ru' 
                    ? 'Для удобства наших гостей доступен бесплатный охраняемый паркинг и премиум-сервис Valet Parking прямо у парадного входа.'
                    : language === 'ky'
                    ? 'Биздин коноктордун ыңгайлуулугу үчүн бекер кайтарылган паркинг жана параддык кире бериште Valet Parking премиум кызматы жеткиликтүү.'
                    : 'For the convenience of our distinguished guests, we offer complimentary secure parking and executive VIP Valet Parking right at our grand entrance.'}
                </p>
              </div>
            </div>

            {/* Simple Contact Details list in bento sidebar */}
            <div className="mt-8 border-t border-white/5 pt-6 space-y-4">
              <a href="tel:+996555123456" className="flex items-center space-x-3 text-xs sm:text-sm text-white/60 hover:text-[#d4af37] transition-all">
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>+996 (555) 12-34-56</span>
              </a>
              <div className="flex items-center space-x-3 text-xs sm:text-sm text-white/60">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span>10:00 AM — 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right Map Embed Panel (Bento with Overlay glass boxes) */}
          <div className="lg:w-3/5 h-[400px] lg:h-auto min-h-[420px] relative overflow-hidden group">
            
            {/* Google Maps Embed iframe */}
            <iframe
              src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer"
              title="Google Maps Location Altyn Restaurant"
              className="absolute inset-0 opacity-80 invert-[0.9] hue-rotate-[180deg] brightness-[0.8] contrast-[1.2]"
            ></iframe>

            {/* TOP GLASS BOXES OVERLAY */}
            <div className="absolute top-4 left-4 right-4 flex justify-between gap-4 z-10 pointer-events-none">
              <div className="bg-black/85 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg">
                <div className="text-[9px] uppercase tracking-widest text-[#d4af37] font-bold mb-0.5">
                  {language === 'ru' ? 'Контакт' : language === 'ky' ? 'Байланыш' : 'CONTACT'}
                </div>
                <div className="text-xs text-white font-mono font-medium">+996 555 123 456</div>
              </div>
              <div className="bg-black/85 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-right shadow-lg">
                <div className="text-[9px] uppercase tracking-widest text-[#d4af37] font-bold mb-0.5">
                  {language === 'ru' ? 'График' : language === 'ky' ? 'Убактысы' : 'HOURS'}
                </div>
                <div className="text-xs text-white font-mono font-medium">10:00 — 23:00</div>
              </div>
            </div>

            {/* BOTTOM BUILD ROUTE BUTTON OVERLAY */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <a
                href={googleMapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#d4af37] hover:bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded-xl transition-colors shadow-2xl flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-black" />
                <span>{t('buildRoute')}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
