import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Loader2 } from 'lucide-react';
import { Background } from './components/Background';
import { Hero } from './components/Hero';

// Lazy load components below the fold to improve initial load time
const Statistics = React.lazy(() => import('./components/Statistics').then(module => ({ default: module.Statistics })));
const IdeaGenerator = React.lazy(() => import('./components/IdeaGenerator').then(module => ({ default: module.IdeaGenerator })));
const Comparison = React.lazy(() => import('./components/Comparison').then(module => ({ default: module.Comparison })));
const Process = React.lazy(() => import('./components/Process').then(module => ({ default: module.Process })));
const BackstageGallery = React.lazy(() => import('./components/BackstageGallery').then(module => ({ default: module.BackstageGallery })));
const CasesCTA = React.lazy(() => import('./components/CasesCTA').then(module => ({ default: module.CasesCTA })));
const WorkFormats = React.lazy(() => import('./components/WorkFormats').then(module => ({ default: module.WorkFormats })));
const Footer = React.lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const ScrollToTop = React.lazy(() => import('./components/ScrollToTop').then(module => ({ default: module.ScrollToTop })));

// Loading fallback
const SectionLoader = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
  </div>
);

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <main className="relative min-h-screen text-gray-900 selection:bg-red-500/30 selection:text-red-900">
      <Background />
      
      {/* Navbar Overlay */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100/50 py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
          {/* Logo */}
          <div className="text-xl font-bold tracking-tighter text-gray-900 relative z-50">
            БАЙ <span className="text-red-600">ПРОДАКШН</span>
          </div>
          
          {/* Desktop Nav */}
          <div className={`hidden md:flex gap-8 text-sm font-medium transition-all duration-300 ${
            isScrolled 
              ? 'text-gray-600' 
              : 'text-gray-700 bg-white/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/40 shadow-sm'
          }`}>
            <a href="#" className="hover:text-red-600 transition-colors">Главная</a>
            <a href="#generator" className="hover:text-red-600 transition-colors">AI Идеи</a>
            <a href="#formats" className="hover:text-red-600 transition-colors">Форматы</a>
            <a href="#contact" className="hover:text-red-600 transition-colors">Контакты</a>
          </div>
          
          {/* Desktop CTA */}
          <a 
            href="#formats"
            className="hidden md:block px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full shadow-lg hover:scale-105 transition-transform hover:bg-gray-800"
          >
            Связаться
          </a>

          {/* Mobile Toggle */}
          <button 
            onClick={toggleMenu} 
            className={`md:hidden relative z-50 p-2 text-gray-900 rounded-full border shadow-sm transition-colors ${
              isScrolled 
                ? 'bg-gray-100 border-gray-200' 
                : 'bg-white/50 backdrop-blur-md border-white/40'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-white/95 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="flex flex-col items-center gap-8"
            >
              <a href="#" onClick={toggleMenu} className="text-3xl font-bold text-gray-900 hover:text-red-600 transition-colors">Главная</a>
              <a href="#generator" onClick={toggleMenu} className="text-3xl font-bold text-gray-900 hover:text-red-600 transition-colors">AI Идеи</a>
              <a href="#formats" onClick={toggleMenu} className="text-3xl font-bold text-gray-900 hover:text-red-600 transition-colors">Форматы</a>
              <a href="#contact" onClick={toggleMenu} className="text-3xl font-bold text-gray-900 hover:text-red-600 transition-colors">Контакты</a>
              
              <div className="w-12 h-1 bg-red-500 rounded-full opacity-20" />

              <a 
                href="https://t.me/bai_khairullin" 
                target="_blank" 
                rel="noreferrer" 
                className="px-8 py-4 bg-gray-900 text-white text-lg font-medium rounded-2xl shadow-xl active:scale-95 transition-transform"
              >
                Связаться в Telegram
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      
      <Suspense fallback={<SectionLoader />}>
        <Statistics />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <IdeaGenerator />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Comparison />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Process />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <BackstageGallery />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <CasesCTA />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <WorkFormats />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </main>
  );
};

export default App;
