import { useState } from 'react';
import { Exercise } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FillBlankExerciseProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

export const FillBlankExercise = ({ exercise, onAnswer }: FillBlankExerciseProps) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (!answer.trim()) return;
    
    const isCorrect = answer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase().trim();
    onAnswer(isCorrect);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Split question to show the blank
  const questionParts = exercise.question.split('_____');

  return (
    <div className="space-y-6">
      {/* Question with Input */}
      <div className="text-center">
        <div className="text-2xl font-fredoka font-bold mb-6 flex items-center justify-center gap-2 flex-wrap">
          {questionParts.map((part, index) => (
            <span key={index} className="flex items-center gap-2">
              {part}
              {index < questionParts.length - 1 && (
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-32 text-center font-bold bg-primary/10 border-primary/30 focus:border-primary"
                  placeholder="Type here..."
                />
              )}
            </span>
          ))}
        </div>
        
        {exercise.image && (
          <div className="mb-6">
            <img 
              src={exercise.image} 
              alt="Exercise visual" 
              className="max-w-xs mx-auto rounded-2xl shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Hint */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          💡 Hint: Fill in the blank with the correct word
        </p>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="btn-game px-8 py-3"
        >
          Check Answer
        </Button>
      </div>
    </div>
  );
};