import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from './utils/soundEffects';
import SkipGuardModal from './components/SkipGuardModal';
import WelcomePage from './pages/WelcomePage';
import MiniGamePage from './pages/MiniGamePage';
import PasswordPage from './pages/PasswordPage';
import ReasonsPage from './pages/ReasonsPage';
import SecretLetterPage from './pages/SecretLetterPage';

type Page = 'welcome' | 'game' | 'password' | 'reasons' | 'letter';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const handleMusicToggle = () => {
    const nowPlaying = soundEffects.toggleMusic();
    setIsMusicOn(nowPlaying);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    in: { opacity: 1, scale: 1, y: 0 },
    out: { opacity: 0, scale: 0.95, y: -20 }
  };

  const pageTransition = {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
    duration: 0.5
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNext={() => { soundEffects.pop(); setCurrentPage('game'); }} />;
      case 'game':
        return <MiniGamePage onNext={() => { soundEffects.pop(); setCurrentPage('password'); }} />;
      case 'password':
        return <PasswordPage onNext={() => { soundEffects.pop(); setCurrentPage('reasons'); }} />;
      case 'reasons':
        return <ReasonsPage onNext={() => { soundEffects.pop(); setCurrentPage('letter'); }} />;
      case 'letter':
        return <SecretLetterPage onBackToStart={() => { soundEffects.pop(); setCurrentPage('welcome'); }} />;
      default:
        return <WelcomePage onNext={() => setCurrentPage('game')} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Hero background image with overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/src/assets/custom-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Soft overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-pink-50/40 to-white/30"></div>
      


      {/* Radial gradient spots for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full max-w-2xl"
          >
            <div className="glass-card glass-card-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16">
              {renderPage()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Music Toggle Button - Top Left Corner */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        onClick={handleMusicToggle}
        className="fixed top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl z-50 transition-all duration-300 shadow-lg"
        style={{
          background: isMusicOn
            ? 'linear-gradient(135deg, #f472b6, #ec4899)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: isMusicOn ? '2px solid #ec4899' : '2px solid rgba(236, 72, 153, 0.3)',
          boxShadow: isMusicOn
            ? '0 4px 20px rgba(236, 72, 153, 0.4)'
            : '0 4px 12px rgba(236, 72, 153, 0.15)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          animate={isMusicOn ? { rotate: [0, -10, 10, -10, 0] } : {}}
          transition={{ duration: 1, repeat: isMusicOn ? Infinity : 0, repeatDelay: 2 }}
        >
          🎵
        </motion.span>
      </motion.button>

      {/* Global Skip Guard Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          soundEffects.boop();
          setShowSkipModal(true);
        }}
        className="fixed bottom-4 right-4 text-pink-400 hover:text-pink-600 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full border border-pink-200 hover:bg-pink-50 transition-all z-50 bg-white/80 backdrop-blur-sm shadow-lg"
      >
        Skip
      </motion.button>

      <SkipGuardModal 
        isOpen={showSkipModal} 
        onClose={() => setShowSkipModal(false)} 
      />
    </div>
  );
}

export default App;
