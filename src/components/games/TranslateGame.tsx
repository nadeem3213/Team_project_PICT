import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';
import { toast } from 'sonner';

interface TranslateGameProps {
  languageId: string;
  onComplete: () => void;
}

const translations = {
  spanish: [
    { english: 'Hello', target: 'Hola', options: ['Hola', 'Adiós', 'Gracias', 'Por favor'] },
    { english: 'Thank you', target: 'Gracias', options: ['Hola', 'Adiós', 'Gracias', 'Por favor'] },
    { english: 'Good morning', target: 'Buenos días', options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hasta luego'] },
    { english: 'How are you?', target: '¿Cómo estás?', options: ['¿Cómo estás?', '¿Qué tal?', '¿Dónde está?', '¿Cuánto cuesta?'] },
    { english: 'I love you', target: 'Te amo', options: ['Te amo', 'Me gusta', 'No entiendo', 'Está bien'] }
  ],
  french: [
    { english: 'Hello', target: 'Bonjour', options: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît'] },
    { english: 'Thank you', target: 'Merci', options: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît'] },
    { english: 'Good evening', target: 'Bonsoir', options: ['Bonne nuit', 'Bonsoir', 'Bon après-midi', 'À bientôt'] },
    { english: 'How are you?', target: 'Comment allez-vous?', options: ['Comment allez-vous?', 'Qu\'est-ce que c\'est?', 'Où est-ce?', 'Combien ça coûte?'] },
    { english: 'I love you', target: 'Je t\'aime', options: ['Je t\'aime', 'J\'aime bien', 'Je ne comprends pas', 'C\'est bon'] }
  ],
  german: [
    { english: 'Hello', target: 'Hallo', options: ['Hallo', 'Auf Wiedersehen', 'Danke', 'Bitte'] },
    { english: 'Thank you', target: 'Danke', options: ['Hallo', 'Auf Wiedersehen', 'Danke', 'Bitte'] },
    { english: 'Good morning', target: 'Guten Morgen', options: ['Gute Nacht', 'Guten Morgen', 'Guten Tag', 'Bis später'] },
    { english: 'How are you?', target: 'Wie geht es dir?', options: ['Wie geht es dir?', 'Was ist das?', 'Wo ist das?', 'Wie viel kostet das?'] },
    { english: 'I love you', target: 'Ich liebe dich', options: ['Ich liebe dich', 'Ich mag', 'Ich verstehe nicht', 'Es ist gut'] }
  ]
};

export const TranslateGame = ({ languageId, onComplete }: TranslateGameProps) => {
  const { addXP } = useGameStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const phrases = translations[languageId as keyof typeof translations] || translations.spanish;
  const currentPhrase = phrases[currentQuestion];

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentPhrase.target;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < phrases.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Game completed
        const finalXP = score * 15;
        addXP(finalXP);
        toast.success(`Translation game completed! 📚`, {
          description: `You scored ${score}/${phrases.length} and earned ${finalXP} XP!`,
        });
        onComplete();
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card-game">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-fredoka font-bold mb-2">Translate to {languageId}</h2>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1}/{phrases.length}</span>
            <span>Score: {score}/{phrases.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted/30 rounded-full h-2 mb-6">
          <div 
            className="xp-bar h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / phrases.length) * 100}%` }}
          />
        </div>

        {/* English Phrase */}
        <motion.div
          key={currentQuestion}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20 mb-4">
            <p className="text-2xl font-fredoka font-semibold text-primary">
              "{currentPhrase.english}"
            </p>
          </div>
          <p className="text-lg font-inter text-muted-foreground">
            Translate to {languageId.charAt(0).toUpperCase() + languageId.slice(1)}
          </p>
        </motion.div>

        {/* Translation Options */}
        <div className="space-y-3 mb-6">
          {currentPhrase.options.map((option, index) => (
            <motion.button
              key={option}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-xl font-inter font-medium text-left transition-all duration-200 ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-success text-success-foreground shadow-lg shadow-success/30'
                    : 'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30'
                  : selectedAnswer && option === currentPhrase.target
                    ? 'bg-success text-success-foreground shadow-lg shadow-success/30'
                    : 'bg-card hover:bg-card/80 border border-border/50 hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{option}</span>
                {showResult && selectedAnswer === option && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </motion.div>
                )}
                {showResult && option === currentPhrase.target && selectedAnswer !== option && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={resetGame}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          {currentQuestion === phrases.length - 1 && showResult && (
            <Button className="flex-1 btn-game" onClick={onComplete}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};