import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';
import { toast } from 'sonner';

interface ImageWordGameProps {
  languageId: string;
  onComplete: () => void;
}

const gameWords = {
  spanish: [
    { image: '🏠', word: 'casa', options: ['casa', 'perro', 'gato', 'libro'] },
    { image: '🐕', word: 'perro', options: ['casa', 'perro', 'agua', 'sol'] },
    { image: '🌞', word: 'sol', options: ['luna', 'estrella', 'sol', 'agua'] },
    { image: '📚', word: 'libro', options: ['mesa', 'silla', 'libro', 'ventana'] },
    { image: '🌊', word: 'agua', options: ['fuego', 'agua', 'tierra', 'aire'] }
  ],
  french: [
    { image: '🏠', word: 'maison', options: ['maison', 'chien', 'chat', 'livre'] },
    { image: '🐕', word: 'chien', options: ['maison', 'chien', 'eau', 'soleil'] },
    { image: '🌞', word: 'soleil', options: ['lune', 'étoile', 'soleil', 'eau'] },
    { image: '📚', word: 'livre', options: ['table', 'chaise', 'livre', 'fenêtre'] },
    { image: '🌊', word: 'eau', options: ['feu', 'eau', 'terre', 'air'] }
  ],
  german: [
    { image: '🏠', word: 'haus', options: ['haus', 'hund', 'katze', 'buch'] },
    { image: '🐕', word: 'hund', options: ['haus', 'hund', 'wasser', 'sonne'] },
    { image: '🌞', word: 'sonne', options: ['mond', 'stern', 'sonne', 'wasser'] },
    { image: '📚', word: 'buch', options: ['tisch', 'stuhl', 'buch', 'fenster'] },
    { image: '🌊', word: 'wasser', options: ['feuer', 'wasser', 'erde', 'luft'] }
  ]
};

export const ImageWordGame = ({ languageId, onComplete }: ImageWordGameProps) => {
  const { addXP } = useGameStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const words = gameWords[languageId as keyof typeof gameWords] || gameWords.spanish;
  const currentWord = words[currentQuestion];

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentWord.word;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < words.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Game completed
        const finalXP = score * 10;
        addXP(finalXP);
        toast.success(`Game completed! 🎮`, {
          description: `You scored ${score}/${words.length} and earned ${finalXP} XP!`,
        });
        onComplete();
      }
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card-game">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-fredoka font-bold mb-2">Image Word Match</h2>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1}/{words.length}</span>
            <span>Score: {score}/{words.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted/30 rounded-full h-2 mb-6">
          <div 
            className="xp-bar h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / words.length) * 100}%` }}
          />
        </div>

        {/* Image */}
        <motion.div
          key={currentQuestion}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6"
        >
          <div className="text-8xl mb-4 bg-gradient-to-br from-card to-muted/20 rounded-3xl p-8 shadow-inner">
            {currentWord.image}
          </div>
          <p className="text-lg font-inter text-muted-foreground">
            What is this called in {languageId}?
          </p>
        </motion.div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {currentWord.options.map((option, index) => (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-xl font-fredoka font-semibold text-lg transition-all duration-200 ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-success text-success-foreground shadow-lg shadow-success/30'
                    : 'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30'
                  : selectedAnswer && option === currentWord.word
                    ? 'bg-success text-success-foreground shadow-lg shadow-success/30'
                    : 'bg-card hover:bg-card/80 border border-border/50 hover:border-primary/50'
              }`}
            >
              {option}
              {showResult && selectedAnswer === option && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block ml-2"
                >
                  {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </motion.div>
              )}
              {showResult && option === currentWord.word && selectedAnswer !== option && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block ml-2"
                >
                  <CheckCircle className="w-5 h-5" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Next Button (only show when completed) */}
        {currentQuestion === words.length - 1 && showResult && (
          <Button className="w-full btn-game" onClick={onComplete}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Game
          </Button>
        )}
      </div>
    </div>
  );
};