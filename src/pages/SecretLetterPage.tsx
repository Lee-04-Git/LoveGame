import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecretLetterPageProps {
  onBackToStart?: () => void;
}

const SecretLetterPage: React.FC<SecretLetterPageProps> = ({ onBackToStart }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const fullText = `To the one I love most, Koby,

Hi, my love! merry merry Christmas babyyy! 
This is our first Christmas, and it’s strange to be celebrating from opposite sides of a screen.
I wish I could fold myself into your day, but instead I’m sending this— the truest thing I have.
Thank you for staying when it would’ve been easier not to. We fight over small things, words misread, feelings bruised, and somehow we still come back. Thank you for choosing me even when I’m not easy to love from afar.
I’m sorry for the ways I let frustration speak before care. For the times I held my ground
when I should’ve held your heart instead.
Distance sharpens everything, and I haven’t always handled it gently. I’m learning. I promise I’m trying.
I’m grateful that even through arguments and tired calls, we don’t disappear. That we stay on the line, that we explain, that we forgive, that we keep saying “okay, I'm sorry my love.”
What we have isn’t perfect, but it’s real—
and real feels worth fighting for.
Meeting you was the best thing in my life, and choosing to love you was the best decision I've ever made. Thank you for choosing me as well. 
I'll constantly be by your side or even at your back. Remember, you always have me. I will always love you even during your toughest times, so you never have to pretend you're okay when you're not. I didn't expect that having you in my life would be my biggest plot twist this year. I honestly thought this year would be filled with nothing but regrets and pain. But God really
does work in His own way. He sent someone
who reminded me that good things still exist 一
someone who gives peace, comfort, and a kind
of care I didn't know I needed. You were never part of the plan, but maybe that's what makes it even more special. I will always be your biggest supporter and will be there for you anytime. You can lean on me every time you feel tired. I will always be your safe space when you feel like the world is against and weighs you down, I will always stay even if you feel like everyone is leaving you. (kahit parang ako din yun pag umaandar sakit ko sa utak hehe) anyways whatever happens just remember that im always here and i will always be here, cause no matter how cruel the world is, you'll always have me, we'll always find a way to conquer the challenges that life throws. we do not know what the future holds, but whatever happens, i will be always and forever grateful that i have been a part of your life. i will forever cherish these moments, and i will love you till my last breath. Merry Christmas my love. I hope God guides you always and leads your steps in the right direction. May He keep you safe from danger, surround you with peace, and bless your
heart with joy. I pray that He gives you strength in times of weakness, health to carry you through each day, and endless reasons to be grateful. May your life be filled-with love, light, and the kind of peace that no one can take away.
Unfortunately we can't be together today, but I'm thinking of you and loving you very much. 💙

Forever yours, Dana🤍`;

  useEffect(() => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowFinalMessage(true);
        }, 2000);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="text-center space-y-4 sm:space-y-6 max-w-md mx-auto px-4">
      {/* Letter box with glow effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <motion.div
          className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white/90 to-pink-50/90 rounded-2xl sm:rounded-3xl border-2 border-pink-200 backdrop-blur-lg shadow-2xl relative overflow-hidden"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-2 left-2">
            <div className="w-4 h-4 bg-pink-300 rounded-full" />
          </div>
          <div className="absolute top-2 right-2">
            <div className="w-3 h-3 bg-pink-300 rounded-sm rotate-45" />
          </div>
          <div className="absolute bottom-2 left-2">
            <div className="w-4 h-4 border-2 border-pink-300 rounded-full" />
          </div>
          <div className="absolute bottom-2 right-2">
            <div className="w-3 h-3 bg-gradient-to-br from-pink-300 to-rose-300 rounded-lg" />
          </div>

          {/* Letter content */}
          <div className="text-left space-y-4">
            <div className="text-sm sm:text-base text-pink-800 leading-relaxed whitespace-pre-wrap font-medium">
              {displayedText}
              {displayedText.length < fullText.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-pink-400 ml-1"
                />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl sm:text-2xl font-bold text-pink-800 px-4"
            >I love you forever, my baby 💞</motion.div>

            {/* Final decorative hearts */}
            <motion.div
              className="flex justify-center space-x-2 text-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="flex gap-2 justify-center">





              </div>
            </motion.div>

            {/* Start Over button */}
            {onBackToStart && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
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