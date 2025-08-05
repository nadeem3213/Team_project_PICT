import { useState } from 'react';
import { Exercise } from '@/types';
import { Button } from '@/components/ui/button';

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

export const MultipleChoiceExercise = ({ exercise, onAnswer }: MultipleChoiceExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const isCorrect = selectedOption === exercise.correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-2xl font-fredoka font-bold mb-4">
          {exercise.question}
        </h3>
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

      {/* Options */}
      <div className="grid gap-3 max-w-md mx-auto">
        {exercise.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            className={`p-4 rounded-2xl border-2 text-left font-inter font-medium transition-all duration-200 ${
              selectedOption === option
                ? 'border-primary bg-primary/10 text-primary shadow-primary/20 shadow-lg transform scale-[1.02]'
                : 'border-border/30 bg-muted/30 hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-fredoka font-bold ${
                selectedOption === option
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground/30'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="btn-game px-8 py-3"
        >
          Submit Answer
        </Button>
      </div>
    </div>
  );
};