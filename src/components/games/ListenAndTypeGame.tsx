import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameStore } from '@/store/gameStore';
import { toast } from 'sonner';

interface ListenAndTypeGameProps {
  languageId: string;
  onComplete: () => void;
}

const listeningPhrases = {
  spanish: [
    { text: 'Hola, ¿cómo estás?', translation: 'Hello, how are you?' },
    { text: 'Me gusta la pizza', translation: 'I like pizza' },
    { text: 'El gato es negro', translation: 'The cat is black' },
    { text: 'Buenos días', translation: 'Good morning' },
    { text: 'Hasta luego', translation: 'See you later' }
  ],
  french: [
    { text: 'Bonjour, comment allez-vous?', translation: 'Hello, how are you?' },
    { text: 'J\'aime la pizza', translation: 'I like pizza' },
    { text: 'Le chat est noir', translation: 'The cat is black' },
    { text: 'Bon matin', translation: 'Good morning' },
    { text: 'À bientôt', translation: 'See you later' }
  ],
  german: [
    { text: 'Hallo, wie geht es dir?', translation: 'Hello, how are you?' },
    { text: 'Ich mag Pizza', translation: 'I like pizza' },
    { text: 'Die Katze ist schwarz', translation: 'The cat is black' },
    { text: 'Guten Morgen', translation: 'Good morning' },
    { text: 'Bis später', translation: 'See you later' }
  ]
};

export const ListenAndTypeGame = ({ languageId, onComplete }: ListenAndTypeGameProps) => {
  const { addXP } = useGameStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  const phrases = listeningPhrases[languageId as keyof typeof listeningPhrases] || listeningPhrases.spanish;
  const currentPhrase = phrases[currentQuestion];

  const playAudio = () => {
    // Simulate audio playback with text-to-speech (if available)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentPhrase.text);
      
      // Set language for speech synthesis
      switch (languageId) {
        case 'spanish':
          utterance.lang = 'es-ES';
          break;
        case 'french':
          utterance.lang = 'fr-FR';
          break;
        case 'german':
          utterance.lang = 'de-DE';
          break;
        default:
          utterance.lang = 'en-US';
      }
      
      utterance.rate = 0.8; // Slow down for learning
      speechSynthesis.speak(utterance);
    }
    setHasPlayed(true);
  };

  const checkAnswer = () => {
    if (!userInput.trim()) return;
    
    const normalizedInput = userInput.toLowerCase().trim();
    const normalizedAnswer = currentPhrase.text.toLowerCase().trim();
    
    // Check for exact match or close match (allowing for minor typos)
    const isExact = normalizedInput === normalizedAnswer;
    const similarity = calculateSimilarity(normalizedInput, normalizedAnswer);
    const isClose = similarity > 0.8; // 80% similarity threshold
    
    setIsCorrect(isExact || isClose);
    setShowResult(true);
    
    if (isExact || isClose) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < phrases.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserInput('');
        setShowResult(false);
        setHasPlayed(false);
      } else {
        // Game completed
        const finalXP = score * 25;
        addXP(finalXP);
        toast.success(`Listening game completed! 🎧`, {
          description: `You scored ${score}/${phrases.length} and earned ${finalXP} XP!`,
        });
        onComplete();
      }
    }, 2000);
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setUserInput('');
    setShowResult(false);
    setScore(0);
    setHasPlayed(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card-game">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-fredoka font-bold mb-2">Listen & Type</h2>
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

        {/* Audio Player */}
        <motion.div
          key={currentQuestion}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 mb-4">
            <motion.button
              onClick={playAudio}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/30 mx-auto mb-4 hover:shadow-xl transition-all duration-200"
            >
              <Volume2 className="w-8 h-8" />
            </motion.button>
            <p className="text-lg font-inter text-muted-foreground">
              Listen carefully and type what you hear
            </p>
          </div>
          
          {hasPlayed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground italic"
            >
              Translation: "{currentPhrase.translation}"
            </motion.p>
          )}
        </motion.div>

        {/* Input Field */}
        <div className="space-y-4 mb-6">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={`Type in ${languageId}...`}
            className="text-lg py-3 font-inter"
            disabled={showResult}
            onKeyPress={(e) => e.key === 'Enter' && !showResult && checkAnswer()}
          />
          
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${
                isCorrect 
                  ? 'bg-success/20 border border-success/50 text-success' 
                  : 'bg-destructive/20 border border-destructive/50 text-destructive'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                <span className="font-fredoka font-semibold">
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </span>
              </div>
              <p className="text-sm">
                <strong>Correct answer:</strong> {currentPhrase.text}
              </p>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={playAudio}
            className="flex-1"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Play Again
          </Button>
          {!showResult ? (
            <Button 
              onClick={checkAnswer}
              disabled={!userInput.trim() || !hasPlayed}
              className="flex-1 btn-game"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Check
            </Button>
          ) : currentQuestion === phrases.length - 1 ? (
            <Button className="flex-1 btn-game" onClick={onComplete}>
              Complete
            </Button>
          ) : null}
        </div>

        {/* Reset Game */}
        <div className="mt-4 text-center">
          <Button variant="ghost" onClick={resetGame} size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Game
          </Button>
        </div>
      </div>
    </div>
  );
};