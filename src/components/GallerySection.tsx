import React from 'react';
import { useApp } from '../context/AppContext';
import { GALLERY_ITEMS } from '../data';
import { Image as ImageIcon, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { t, language } = useApp();

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a] border-t border-b border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#d4af37] text-sm font-semibold tracking-widest uppercase mb-3">
            <ImageIcon className="w-4 h-4" />
            <span>{t('navGallery')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 tracking-tight">
            {t('galleryTitle')}
          </h2>
          <p className="text-sm sm:text-base text-white/50 font-sans font-light max-w-lg mx-auto">
            {t('gallerySubtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4"></div>
        </div>

        {/* Gallery Bento Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-3xl overflow-hidden group border border-white/5 cursor-pointer bg-[#111]"
            >
              {/* Dish Image (with premium grayscale on hover out, color on hover) */}
              <img
                src={item.image}
                alt={item.title[language]}
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Premium Gold Overlay Frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="absolute top-4 right-4 p-2 bg-[#d4af37] text-black rounded-full scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Eye className="w-4 h-4" />
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] tracking-widest text-[#d4af37] uppercase font-bold block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white tracking-wide border-l-2 border-[#d4af37] pl-2.5">
                    {item.title[language]}
                  </h3>
                </div>
              </div>

              {/* Minimalist Border Frame Hover Effect */}
              <div className="absolute inset-4 border border-[#d4af37]/0 group-hover:border-[#d4af37]/30 rounded-2xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
