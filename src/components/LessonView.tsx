import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Zap, CheckCircle, XCircle } from 'lucide-react';
import { Lesson, Exercise } from '@/types';
import { useGameStore } from '@/store/gameStore';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { MultipleChoiceExercise } from './exercises/MultipleChoiceExercise';
import { FillBlankExercise } from './exercises/FillBlankExercise';
import { DragDropExercise } from './exercises/DragDropExercise';
import { StoryModeExercise } from './exercises/StoryModeExercise';
import { toast } from 'sonner';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
  onExit: () => void;
}

export const LessonView = ({ lesson, onComplete, onExit }: LessonViewProps) => {
  const { user, addXP, loseHeart, updateStreak, completeLesson } = useGameStore();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lessonScore, setLessonScore] = useState(0);
  
  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  const handleAnswerSubmit = (isCorrect: boolean) => {
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      addXP(currentExercise.xpValue);
      setLessonScore(prev => prev + currentExercise.xpValue);
      toast.success(`+${currentExercise.xpValue} XP!`, {
        icon: '⚡',
        duration: 2000,
      });
    } else {
      loseHeart();
      toast.error('Try again! You lost a heart 💔', {
        duration: 2000,
      });
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      handleNextExercise();
    }, 2000);
  };

  const handleNextExercise = () => {
    setShowFeedback(false);
    
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Lesson completed
      setIsCompleted(true);
      completeLesson(lesson.id);
      updateStreak();
      addXP(lesson.xpReward);
      
      toast.success('Lesson completed! 🎉', {
        description: `You earned ${lesson.xpReward + lessonScore} total XP!`,
        duration: 4000,
      });
    }
  };

  const renderExercise = () => {
    if (showFeedback) {
      return (
        <div className="text-center py-8">
          <div className={`text-6xl mb-4 ${lastAnswerCorrect ? 'animate-bounce-in' : 'animate-shake'}`}>
            {lastAnswerCorrect ? '🎉' : '💔'}
          </div>
          <h3 className={`text-2xl font-fredoka font-bold mb-2 ${
            lastAnswerCorrect ? 'text-success' : 'text-destructive'
          }`}>
            {lastAnswerCorrect ? 'Excellent!' : 'Not quite right'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {lastAnswerCorrect ? 
              'Great job! Keep up the momentum!' : 
              'Don\'t worry, you\'ll get it next time!'
            }
          </p>
          {currentExercise.explanation && (
            <div className="max-w-md mx-auto p-4 bg-muted/30 rounded-xl">
              <p className="text-sm">{currentExercise.explanation}</p>
            </div>
          )}
        </div>
      );
    }

    switch (currentExercise.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceExercise
            exercise={currentExercise}
            onAnswer={handleAnswerSubmit}
          />
        );
      case 'fill-blank':
        return (
          <FillBlankExercise
            exercise={currentExercise}
            onAnswer={handleAnswerSubmit}
          />
        );
      case 'drag-drop':
        return (
          <DragDropExercise
            exercise={currentExercise}
            onAnswer={handleAnswerSubmit}
          />
        );
      case 'story-mode':
        return (
          <StoryModeExercise
            exercise={currentExercise}
            onAnswer={handleAnswerSubmit}
          />
        );
      default:
        return <div>Exercise type not supported</div>;
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-success/10 to-primary/10">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="text-8xl mb-6 animate-bounce-in">🏆</div>
          <h1 className="text-4xl font-fredoka font-bold text-gradient mb-4">
            Lesson Complete!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Amazing work! You've completed "{lesson.title}"
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-6 bg-gradient-xp/20 rounded-2xl">
              <Zap className="w-8 h-8 text-xp mx-auto mb-2" />
              <div className="font-fredoka font-bold text-2xl text-xp">
                +{lesson.xpReward + lessonScore}
              </div>
              <div className="text-sm text-muted-foreground">Total XP Earned</div>
            </div>
            
            <div className="p-6 bg-gradient-success/20 rounded-2xl">
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="font-fredoka font-bold text-2xl text-success">
                {lesson.exercises.length}/{lesson.exercises.length}
              </div>
              <div className="text-sm text-muted-foreground">Exercises Completed</div>
            </div>
            
            <div className="p-6 bg-gradient-warning/20 rounded-2xl">
              <span className="text-3xl block mb-2">🔥</span>
              <div className="font-fredoka font-bold text-2xl text-warning">
                {user.streak}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>

          {lesson.funFact && (
            <div className="p-6 bg-gradient-accent/20 rounded-2xl mb-8">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-fredoka font-bold text-lg mb-2 text-accent">Fun Fact!</h3>
              <p className="text-muted-foreground">{lesson.funFact}</p>
            </div>
          )}

          <div className="space-y-4">
            <Button onClick={onComplete} className="btn-game w-full md:w-auto">
              Continue Learning
            </Button>
            <Button onClick={onExit} variant="outline" className="w-full md:w-auto">
              Back to Lessons
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-inter">Exit</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: user.maxHearts }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 ${
                    i < user.hearts 
                      ? 'text-heart fill-heart animate-pulse' 
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-2 bg-gradient-xp/20 px-3 py-1 rounded-full">
              <Zap className="w-4 h-4 text-xp" />
              <span className="font-fredoka font-bold text-sm text-xp">{user.xp}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-fredoka font-bold text-lg">{lesson.title}</h2>
            <span className="text-sm text-muted-foreground">
              {currentExerciseIndex + 1} of {lesson.exercises.length}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Exercise */}
        <div className="card-game">
          {renderExercise()}
        </div>
      </div>
    </div>
  );
};