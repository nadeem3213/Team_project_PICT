import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';
import { toast } from 'sonner';

interface MatchUpGameProps {
  languageId: string;
  onComplete: () => void;
}

const matchPairs = {
  spanish: [
    { word: 'casa', translation: 'house' },
    { word: 'perro', translation: 'dog' },
    { word: 'gato', translation: 'cat' },
    { word: 'libro', translation: 'book' },
    { word: 'agua', translation: 'water' },
    { word: 'sol', translation: 'sun' }
  ],
  french: [
    { word: 'maison', translation: 'house' },
    { word: 'chien', translation: 'dog' },
    { word: 'chat', translation: 'cat' },
    { word: 'livre', translation: 'book' },
    { word: 'eau', translation: 'water' },
    { word: 'soleil', translation: 'sun' }
  ],
  german: [
    { word: 'haus', translation: 'house' },
    { word: 'hund', translation: 'dog' },
    { word: 'katze', translation: 'cat' },
    { word: 'buch', translation: 'book' },
    { word: 'wasser', translation: 'water' },
    { word: 'sonne', translation: 'sun' }
  ]
};

interface Card {
  id: string;
  content: string;
  type: 'word' | 'translation';
  pairId: string;
  isMatched: boolean;
}

export const MatchUpGame = ({ languageId, onComplete }: MatchUpGameProps) => {
  const { addXP } = useGameStore();
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const pairs = matchPairs[languageId as keyof typeof matchPairs] || matchPairs.spanish;

  useEffect(() => {
    initializeGame();
  }, [languageId]);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    
    pairs.forEach((pair, index) => {
      gameCards.push({
        id: `word-${index}`,
        content: pair.word,
        type: 'word',
        pairId: `pair-${index}`,
        isMatched: false
      });
      gameCards.push({
        id: `translation-${index}`,
        content: pair.translation,
        type: 'translation',
        pairId: `pair-${index}`,
        isMatched: false
      });
    });

    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setMatches(0);
  };

  const handleCardClick = (card: Card) => {
    if (isProcessing || card.isMatched || selectedCards.includes(card)) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsProcessing(true);
      
      setTimeout(() => {
        if (newSelected[0].pairId === newSelected[1].pairId) {
          // Match found!
          setCards(prev => prev.map(c => 
            c.pairId === newSelected[0].pairId 
              ? { ...c, isMatched: true }
              : c
          ));
          setMatches(matches + 1);
          
          if (matches + 1 === pairs.length) {
            // Game completed
            const finalXP = pairs.length * 20;
            addXP(finalXP);
            toast.success(`Match game completed! 🎯`, {
              description: `You matched all pairs and earned ${finalXP} XP!`,
            });
            setTimeout(() => onComplete(), 1000);
          }
        }
        
        setSelectedCards([]);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const isCardSelected = (card: Card) => selectedCards.includes(card);
  const isCardCorrect = () => 
    selectedCards.length === 2 && selectedCards[0].pairId === selectedCards[1].pairId;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card-game">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-fredoka font-bold mb-2">Match the Pairs</h2>
          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
            <span>Matches: {matches}/{pairs.length}</span>
            <span>•</span>
            <span>Find the correct translations!</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted/30 rounded-full h-2 mb-6">
          <div 
            className="xp-bar h-2 rounded-full transition-all duration-500"
            style={{ width: `${(matches / pairs.length) * 100}%` }}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {cards.map((card, index) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateY: 0,
                y: isCardSelected(card) ? -5 : 0
              }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.3,
                type: "spring"
              }}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched || isProcessing}
              className={`aspect-square p-2 rounded-xl font-inter font-medium text-sm transition-all duration-200 ${
                card.isMatched
                  ? 'bg-success text-success-foreground shadow-lg shadow-success/30 cursor-default'
                  : isCardSelected(card)
                    ? isProcessing
                      ? isCardCorrect()
                        ? 'bg-success text-success-foreground shadow-lg shadow-success/30'
                        : 'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30'
                      : 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 transform scale-105'
                    : card.type === 'word'
                      ? 'bg-secondary/20 hover:bg-secondary/30 border border-secondary/50 hover:border-secondary'
                      : 'bg-accent/20 hover:bg-accent/30 border border-accent/50 hover:border-accent'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className="break-words text-center leading-tight">
                  {card.content}
                </span>
                {card.isMatched && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={initializeGame}
            disabled={isProcessing}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Tap cards to select them. Match {languageId} words with their English translations!
          </p>
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-secondary/30 rounded"></div>
              {languageId} words
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-accent/30 rounded"></div>
              English translations
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};