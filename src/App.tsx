import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from './utils/soundEffects';
import SkipGuardModal from './components/SkipGuardModal';
import WelcomePage from './pages/WelcomePage';
import MiniGamePage from './pages/MiniGamePage';
import PasswordPage from './pages/PasswordPage';
import ReasonsPage from './pages/ReasonsPage';
import SecretLetterPage from './pages/SecretLetterPage';
import MusicPage from './pages/MusicPage';
import backgroundMusic from './assets/music/Bright_Eyes_First_Day_Of_My_Life.mp3';

type Page = 'welcome' | 'game' | 'password' | 'reasons' | 'letter' | 'music';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [showSkipModal, setShowSkipModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Create and setup background music
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    // Auto-play with fade-in
    const playWithFadeIn = async () => {
      try {
        await audio.play();
        console.log('Background music started playing');
        
        // Quick fade-in to 0.4 volume in 1 second
        let currentVolume = 0;
        const targetVolume = 0.4;
        fadeIntervalRef.current = setInterval(() => {
          if (currentVolume < targetVolume) {
            currentVolume += 0.04; // Reaches 0.4 in exactly 1 second (0.04 * 10 steps * 100ms)
            audio.volume = Math.min(currentVolume, targetVolume);
          } else {
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
            }
          }
        }, 100);
      } catch (error) {
        console.log('Autoplay blocked, will start on user interaction', error);
      }
    };

    // Try to play immediately
    playWithFadeIn();

    // Fallback: start on first user interaction (more aggressive)
    const handleInteraction = async () => {
      if (audio.paused) {
        console.log('User interacted, attempting to play background music');
        await playWithFadeIn();
      }
    };

    // Add listeners for multiple interaction types
    const events = ['click', 'touchstart', 'keydown', 'mousedown'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      audio.pause();
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  const handleStartOver = () => {
    soundEffects.pop();
    setCurrentPage('welcome');
    
    // Restart background music from beginning
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (audioRef.current.paused) {
        audioRef.current.play().catch(err => console.log('Play error:', err));
      }
    }
  };

  const handleMusicIconClick = () => {
    soundEffects.pop();
    setCurrentPage('music');
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
        return <SecretLetterPage onBackToStart={handleStartOver} />;
      case 'music':
        return <MusicPage 
          onBack={() => { soundEffects.pop(); setCurrentPage('welcome'); }} 
          backgroundAudio={audioRef.current}
        />;
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

      {/* Music Icon Button - Top Left Corner */}
      {currentPage !== 'music' && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          onClick={handleMusicIconClick}
          className="fixed top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl z-50 transition-all duration-300 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #f472b6, #ec4899)',
            backdropFilter: 'blur(10px)',
            border: '2px solid #ec4899',
            boxShadow: '0 4px 20px rgba(236, 72, 153, 0.4)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >
            🎵
          </motion.span>
        </motion.button>
      )}

      {/* Global Skip Guard Button */}
      {currentPage !== 'music' && (
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
      )}

      <SkipGuardModal 
        isOpen={showSkipModal} 
        onClose={() => setShowSkipModal(false)} 
      />
    </div>
  );
}

export default App;
