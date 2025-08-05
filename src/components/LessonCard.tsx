import { Play, Star, Lock } from 'lucide-react';
import { Lesson } from '@/types';
import { useGameStore } from '@/store/gameStore';

interface LessonCardProps {
  lesson: Lesson;
  isLocked?: boolean;
  onStart: (lessonId: string) => void;
}

export const LessonCard = ({ lesson, isLocked = false, onStart }: LessonCardProps) => {
  const { user } = useGameStore();
  const isCompleted = user.completedLessons.includes(lesson.id);

  const difficultyColors = {
    beginner: 'text-success',
    intermediate: 'text-warning',
    advanced: 'text-destructive'
  };

  const handleClick = () => {
    if (!isLocked) {
      onStart(lesson.id);
    }
  };

  return (
    <div 
      className={`card-game group cursor-pointer transition-all duration-300 ${
        isLocked ? 'opacity-50 cursor-not-allowed' : 'card-interactive'
      }`}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-fredoka font-bold mb-2 group-hover:text-primary transition-colors">
            {lesson.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {lesson.description}
          </p>
        </div>
        
        {isLocked ? (
          <Lock className="w-6 h-6 text-muted-foreground flex-shrink-0" />
        ) : (
          <div className="flex items-center gap-2 flex-shrink-0">
            {isCompleted && (
              <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
            )}
            <Play className="w-6 h-6 text-primary group-hover:text-primary-glow transition-colors" />
          </div>
        )}
      </div>

      {/* Lesson Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Difficulty:</span>
            <span className={`text-xs font-fredoka font-semibold capitalize ${difficultyColors[lesson.difficulty]}`}>
              {lesson.difficulty}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Exercises:</span>
            <span className="text-xs font-fredoka font-semibold text-foreground">
              {lesson.exercises.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-gradient-xp/20 px-2 py-1 rounded-full">
          <span className="text-xs text-xp font-fredoka font-bold">+{lesson.xpReward} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-muted/30 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              isCompleted ? 'bg-gradient-success w-full' : 'bg-muted w-0'
            }`}
          />
        </div>
      </div>

      {/* Fun Fact Preview */}
      {lesson.funFact && !isLocked && (
        <div className="p-3 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl">
          <div className="flex items-start gap-2">
            <span className="text-sm">💡</span>
            <div>
              <p className="text-xs font-fredoka font-semibold text-accent mb-1">Fun Fact:</p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {lesson.funFact}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-4 pt-4 border-t border-border/30">
        <div className="flex items-center justify-center gap-2 text-primary group-hover:text-primary-glow transition-colors">
          {isLocked ? (
            <>
              <Lock className="w-4 h-4" />
              <span className="font-inter font-semibold">Complete previous lesson</span>
            </>
          ) : isCompleted ? (
            <>
              <Play className="w-4 h-4" />
              <span className="font-inter font-semibold">Practice Again</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span className="font-inter font-semibold">Start Lesson</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};