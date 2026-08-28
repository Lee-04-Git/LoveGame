import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

interface PasswordPageProps {
  onNext: () => void;
}

const PasswordPage: React.FC<PasswordPageProps> = ({ onNext }) => {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const correctPassword = '31/10/25';
  const firstMessageDate = '01/11/25';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      soundEffects.ding();
      setShowError(false);
      setShowSuccess(true);
      // Don't auto-navigate - user stays on success message
    } else {
      soundEffects.boop();
      setShowError(true);
      setShowSuccess(false);
      
      // Set appropriate error message
      if (password === firstMessageDate) {
        setErrorMessage('Noo, I meant the day I first messaged you 😒');
      } else {
        setErrorMessage('And here I thought you remembered everything 😒');
      }
      
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Format as DD/MM/YY
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 7);
    }
    
    setPassword(value);
    if (showError) setShowError(false);
  };

  return (
    <div className="text-center space-y-6 sm:space-y-8 px-4">
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text leading-relaxed">Do you remember the first day we met?</h2>
        <p className="text-base sm:text-lg md:text-xl text-pink-600 font-medium">Enter the date when our love story began</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          animate={showError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            value={password}
            onChange={handleInputChange}
            placeholder="DD/MM/YY"
            maxLength={8}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-center text-lg sm:text-xl font-semibold border-2 border-pink-300 rounded-xl sm:rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'monospace', letterSpacing: '0.15em' }}
          />
        </motion.div>

        <motion.button
          type="submit"
          className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-pink-300/50 transition-all duration-300 overflow-hidden relative group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ backgroundSize: '200% auto' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <span className="relative z-10">Submit</span>
        </motion.button>
      </form>

      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-pink-600 font-semibold text-lg"
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-2xl"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full mx-auto" />
            </motion.div>
            <div className="text-pink-700 font-semibold">To this day I am still happy you replied back 😌</div>
            
            {/* Continue button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={onNext}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-pink-300/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6"
      >
        <motion.button
          onClick={onNext}
          className="text-sm text-pink-500 hover:text-pink-700 underline transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip →
        </motion.button>
      </motion.div>

      {/* Decorative elements */}
      <div className="flex justify-center space-x-3 mt-6">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="opacity-60"
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3
            }}
          >
            {index === 0 && <div className="w-4 h-4 bg-pink-400 rounded-full" />}
            {index === 1 && <div className="w-3 h-3 bg-rose-400 rounded-sm rotate-45" />}
            {index === 2 && <div className="w-4 h-4 border-2 border-pink-400 rounded-full" />}
            {index === 3 && <div className="w-3 h-3 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PasswordPage;