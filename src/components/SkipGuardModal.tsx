import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkipGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SkipGuardModal: React.FC<SkipGuardModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl max-w-xs w-full relative z-10 text-center border-4 border-pink-300"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-4"
            >
              😝
            </motion.div>
            <h3 className="text-xl font-bold text-pink-600 mb-6 font-poppins">
              Hey silly, no skipping allowed! 😝
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-bold shadow-lg hover:shadow-pink-200 transition-all"
            >
              Okay fine 🙄
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SkipGuardModal;
