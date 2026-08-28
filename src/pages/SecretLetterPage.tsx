import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecretLetterPageProps {
  onBackToStart?: () => void;
}

const SecretLetterPage: React.FC<SecretLetterPageProps> = ({ onBackToStart }) => {
  const [showFinalMessage] = useState(true);

  const fullText = `To the one I love most, Raven,

I made this little link to let my techy, dorky side express what my words sometimes struggle to say. You’ve become the best unexpected part of my life, and I’m so grateful I found you. We may argue, misunderstand each other, and have difficult days, but somehow, we always find our way back. Thank you for choosing me and loving me through it all. I’ll always be here to support you, listen to you, and be your safe place when life feels heavy. You’re my favourite person, my biggest blessing, and someone I’ll always choose. No matter what happens, I’ll keep choosing you and cheering for you through every chapter we write together.

I love you Raebear 💗

Your Carebear, Lee 💙`;

  return (
    <div className="text-center space-y-6 w-full max-w-4xl mx-auto px-4">
      {/* Letter box with smooth fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <motion.div
          className="p-6 sm:p-8 md:p-10 lg:p-12 bg-gradient-to-br from-white/95 to-pink-50/95 rounded-2xl sm:rounded-3xl border-2 border-pink-200 backdrop-blur-lg shadow-2xl relative"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-3 left-3">
            <div className="w-3 h-3 bg-pink-300 rounded-full" />
          </div>
          <div className="absolute top-3 right-3">
            <div className="w-2.5 h-2.5 bg-pink-300 rounded-sm rotate-45" />
          </div>
          <div className="absolute bottom-3 left-3">
            <div className="w-3 h-3 border-2 border-pink-300 rounded-full" />
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="w-2.5 h-2.5 bg-gradient-to-br from-pink-300 to-rose-300 rounded-lg" />
          </div>

          {/* Letter content with better spacing */}
          <div className="text-left space-y-4 max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-pink-900 leading-relaxed whitespace-pre-line font-medium"
              style={{ lineHeight: '1.8' }}
            >
              {fullText}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-800 px-4"
            >
              I love you forever, my baby 💞
            </motion.div>

            {/* Start Over button */}
            {onBackToStart && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                onClick={onBackToStart}
                className="mt-6 px-8 py-3 rounded-full font-semibold text-white text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #f472b6, #ec4899)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(236, 72, 153, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                ↺ Start Over
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretLetterPage;
