import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { MapSection } from './components/MapSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Chatbot } from './components/Chatbot';

const MainLayout: React.FC = () => {
  const { t, theme } = useApp();

  // Dynamic SEO & Open Graph optimization
  useEffect(() => {
    // 1. Dynamic document Title
    document.title = `${t('appName')} | Premium Restaurant Bishkek`;

    // 2. Meta description and Open Graph tags
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', t('heroSubtitle'));
    if (!metaDescription.parentElement) document.head.appendChild(metaDescription);

    // 3. Open Graph Tags (Dynamic hydration for social sharing previews)
    const ogTags = [
      { property: 'og:title', content: `${t('appName')} — ${t('slogan')}` },
      { property: 'og:description', content: t('heroSubtitle') },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200' },
      { property: 'og:url', content: window.location.href }
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, [t]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Header and navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative">
        <Hero />
        <MenuSection />
        <GallerySection />
        <ReviewsSection />
        <MapSection />
      </main>

      {/* Footer and Contacts */}
      <Footer />

      {/* Interactive Floating Overlays */}
      <CartDrawer />
      <Chatbot />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
