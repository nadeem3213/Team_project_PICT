import { useState } from 'react';
import { Exercise } from '@/types';
import { Button } from '@/components/ui/button';

interface StoryModeExerciseProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

export const StoryModeExercise = ({ exercise, onAnswer }: StoryModeExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const isCorrect = selectedOption === exercise.correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <div className="space-y-6">
      {/* Story Context */}
      <div className="text-center p-6 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl">
        <div className="text-4xl mb-4">🎭</div>
        <h3 className="text-xl font-fredoka font-bold mb-4 text-secondary">
          Story Mode
        </h3>
        <p className="text-lg font-inter leading-relaxed">
          {exercise.question}
        </p>
      </div>

      {/* Character Avatar */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-3xl">👤</span>
        </div>
        <p className="text-muted-foreground text-sm">
          What would you say in this situation?
        </p>
      </div>

      {/* Story Options */}
      <div className="space-y-3 max-w-lg mx-auto">
        {exercise.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            className={`w-full p-4 rounded-2xl border-2 text-left font-inter transition-all duration-200 ${
              selectedOption === option
                ? 'border-secondary bg-secondary/10 text-secondary shadow-secondary/20 shadow-lg transform scale-[1.02]'
                : 'border-border/30 bg-muted/30 hover:border-secondary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-fredoka font-bold flex-shrink-0 mt-0.5 ${
                selectedOption === option
                  ? 'border-secondary bg-secondary text-secondary-foreground'
                  : 'border-muted-foreground/30'
              }`}>
                💬
              </div>
              <div className="flex-1">
                <p className="leading-relaxed">{option}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Cultural Context */}
      <div className="max-w-md mx-auto p-4 bg-gradient-to-r from-accent/10 to-warning/10 rounded-xl">
        <div className="flex items-start gap-2">
          <span className="text-lg">💡</span>
          <div>
            <p className="font-fredoka font-semibold text-accent text-sm mb-1">
              Cultural Tip:
            </p>
            <p className="text-xs text-muted-foreground">
              Consider the context and cultural appropriateness of your response.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="btn-secondary px-8 py-3"
        >
          Respond
        </Button>
      </div>
    </div>
  );
};