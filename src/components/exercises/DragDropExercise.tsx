import { useState } from 'react';
import { Exercise } from '@/types';
import { Button } from '@/components/ui/button';

interface DragDropExerciseProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

export const DragDropExercise = ({ exercise, onAnswer }: DragDropExerciseProps) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const options = exercise.options || [];
  const correctAnswers = Array.isArray(exercise.correctAnswer) 
    ? exercise.correctAnswer 
    : [exercise.correctAnswer];

  const handleSubmit = () => {
    if (Object.keys(matches).length !== options.length) return;
    
    const isCorrect = options.every((option, index) => {
      return matches[option] === correctAnswers[index];
    });
    
    onAnswer(isCorrect);
  };

  const handleDrop = (droppedItem: string, targetSlot: number) => {
    setMatches(prev => ({
      ...prev,
      [droppedItem]: correctAnswers[targetSlot]
    }));
  };

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-2xl font-fredoka font-bold mb-6">
          {exercise.question}
        </h3>
      </div>

      {/* Drag and Drop Area */}
      <div className="max-w-2xl mx-auto">
        {/* Draggable Items */}
        <div className="mb-8">
          <h4 className="font-fredoka font-semibold mb-4 text-center">Drag the items below:</h4>
          <div className="flex flex-wrap gap-3 justify-center">
            {options.map((option, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(option)}
                onDragEnd={handleDragEnd}
                className={`px-4 py-3 bg-gradient-primary rounded-2xl text-primary-foreground font-inter font-medium cursor-grab active:cursor-grabbing shadow-lg hover:shadow-primary/30 transition-all duration-200 ${
                  draggedItem === option ? 'opacity-50 scale-95' : 'hover:scale-105'
                } ${Object.keys(matches).includes(option) ? 'opacity-30' : ''}`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Drop Zones */}
        <div className="space-y-3">
          <h4 className="font-fredoka font-semibold mb-4 text-center">Drop them here in the correct order:</h4>
          {correctAnswers.map((answer, index) => (
            <div
              key={index}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedItem) {
                  handleDrop(draggedItem, index);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              className={`h-16 border-2 border-dashed border-border/50 rounded-2xl flex items-center justify-center bg-muted/30 hover:bg-muted/50 hover:border-primary/50 transition-all duration-200 ${
                Object.values(matches).includes(answer) 
                  ? 'border-success bg-success/10 text-success' 
                  : ''
              }`}
            >
              {Object.entries(matches).find(([_, value]) => value === answer)?.[0] || (
                <span className="text-muted-foreground font-inter">
                  Drop here: {answer}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(matches).length !== options.length}
          className="btn-game px-8 py-3"
        >
          Check Matches
        </Button>
      </div>
    </div>
  );
};