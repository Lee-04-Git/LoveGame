import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

interface MiniGamePageProps {
  onNext: () => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MiniGamePage: React.FC<MiniGamePageProps> = ({ onNext }) => {
  const symbols = ['♠', '♥', '♦', '♣', '★', '●'];
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    symbols.forEach((symbol, index) => {
      gameCards.push(
        { id: index * 2, emoji: symbol, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, emoji: symbol, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setGameWon(false);
    setMoves(0);
  };

  const handleCardClick = (cardId: number) => {
    if (isChecking) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    soundEffects.pop();
    
    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);
      checkForMatch(newSelected, newCards);
    }
  };

  const checkForMatch = (selected: number[], currentCards: Card[]) => {
    const [first, second] = selected;
    const firstCard = currentCards.find(c => c.id === first);
    const secondCard = currentCards.find(c => c.id === second);

    if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
      // Match found!
      soundEffects.ding();
      
      setTimeout(() => {
        const updatedCards = currentCards.map(c => 
          c.id === first || c.id === second 
            ? { ...c, isMatched: true }
            : c
        );
        setCards(updatedCards);
        setSelectedCards([]);
        setIsChecking(false);

        // Check if game is won
        if (updatedCards.every(c => c.isMatched)) {
          setTimeout(() => {
            soundEffects.cheer();
            setGameWon(true);
          }, 500);
        }
      }, 600);
    } else {
      // No match
      soundEffects.boop();
      
      setTimeout(() => {
        const updatedCards = currentCards.map(c => 
          c.id === first || c.id === second 
            ? { ...c, isFlipped: false }
            : c
        );
        setCards(updatedCards);
        setSelectedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  return (
    <div className="text-center space-y-4 sm:space-y-8 px-4">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text leading-relaxed">Let's play a little game before your surprise</h2>
        <p className="text-base sm:text-lg md:text-xl text-pink-600 font-medium">Tap two cards to find the matching pairs!</p>
        <motion.div
          className="inline-block px-6 py-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full border border-pink-200 shadow-sm"
          animate={{ scale: moves > 0 ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-base font-semibold text-pink-700">Moves: {moves}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: card.isFlipped || card.isMatched ? 0 : 0,
                opacity: card.isMatched ? 0.7 : 1
              }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 20,
                duration: 0.3
              }}
              whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square flex items-center justify-center text-2xl sm:text-3xl rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 ${
                card.isFlipped || card.isMatched
                  ? 'bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-xl card-depth-2'
                  : 'bg-gradient-to-br from-white/80 to-pink-50 hover:from-pink-100 hover:to-pink-200 shadow-md hover:shadow-lg backdrop-blur-sm border border-pink-100'
              } ${card.isMatched ? 'ring-2 ring-pink-300 ring-opacity-70 pulse-glow' : ''}`}
            >
              <motion.div
                animate={{ 
                  rotateY: card.isFlipped || card.isMatched ? 0 : 180,
                  scale: card.isMatched ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 0.6 }}
              >
                {card.isFlipped || card.isMatched ? card.emoji : '?'}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>



      <AnimatePresence>
        {gameWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="text-2xl font-bold text-pink-800"
            >
              Yay! You found all the pairs
            </motion.div>
            
            <motion.button
              onClick={onNext}
              className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Continue →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiniGamePage;