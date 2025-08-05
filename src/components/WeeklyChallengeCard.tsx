import { useState, useEffect } from 'react';
import { Calendar, Trophy, Star, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGameStore } from '@/store/gameStore';
import { lessonsData } from '@/data/languages';
import { toast } from 'sonner';

interface WeeklyChallengeCardProps {
  languageId: string;
}

export const WeeklyChallengeCard = ({ languageId }: WeeklyChallengeCardProps) => {
  const { user, addXP, updateStreak } = useGameStore();
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Check if weekly challenge is completed
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekKey = `weekly-challenge-${weekStart.toISOString().split('T')[0]}-${languageId}`;
    const completed = localStorage.getItem(weekKey);
    
    if (completed) {
      setIsCompleted(true);
      const savedProgress = localStorage.getItem(`${weekKey}-progress`);
      setProgress(savedProgress ? parseInt(savedProgress) : 100);
    }

    // Update countdown timer
    const timer = setInterval(() => {
      const now = new Date();
      const nextWeek = new Date(weekStart);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const diff = nextWeek.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setTimeLeft(`${days}d ${hours}h`);
    }, 1000);

    return () => clearInterval(timer);
  }, [languageId]);

  const handleCompleteTask = (taskXP: number) => {
    const newProgress = Math.min(progress + 20, 100); // Each task is 20% of weekly challenge
    setProgress(newProgress);
    addXP(taskXP);

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekKey = `weekly-challenge-${weekStart.toISOString().split('T')[0]}-${languageId}`;
    localStorage.setItem(`${weekKey}-progress`, newProgress.toString());

    if (newProgress >= 100) {
      setIsCompleted(true);
      localStorage.setItem(weekKey, 'completed');
      addXP(100); // Bonus XP for completing weekly challenge
      updateStreak();
      
      toast.success('Weekly Challenge Complete! 🏆', {
        description: `You earned ${taskXP + 100} XP total! Amazing dedication!`,
        duration: 4000,
      });
    } else {
      toast.success('Task Complete! ⭐', {
        description: `You earned ${taskXP} XP! Keep going!`,
        duration: 3000,
      });
    }
  };

  const lessons = lessonsData[languageId] || [];

  if (lessons.length === 0) {
    return (
      <div className="card-game text-center">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-xl font-fredoka font-bold mb-2">Weekly Challenge Coming Soon!</h3>
        <p className="text-muted-foreground">
          Weekly challenges will be available once you have completed some lessons.
        </p>
      </div>
    );
  }

  const weeklyTasks = [
    { id: 1, title: 'Complete 3 lessons', xp: 50, icon: Target },
    { id: 2, title: 'Play 2 mini games', xp: 30, icon: Trophy },
    { id: 3, title: 'Maintain 3-day streak', xp: 40, icon: Star },
    { id: 4, title: 'Score 90%+ on any lesson', xp: 35, icon: Target },
    { id: 5, title: 'Review 10 vocabulary words', xp: 25, icon: Star },
  ];

  return (
    <div className="card-game">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-fredoka font-bold text-lg">Weekly Challenge</h3>
            <p className="text-muted-foreground text-sm">Complete 5 tasks this week</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Resets in {timeLeft}</span>
          </div>
          <div className="text-lg font-fredoka font-bold text-purple-500">
            +180 XP Total
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Weekly Progress</span>
          <span className="text-sm text-muted-foreground">{progress}/100%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Tasks */}
      <div className="space-y-3 mb-6">
        {weeklyTasks.map((task, index) => {
          const isTaskCompleted = progress >= (index + 1) * 20;
          const canComplete = progress === index * 20 && !isCompleted;
          
          return (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isTaskCompleted 
                  ? 'bg-gradient-primary/20 border-primary/30' 
                  : canComplete
                  ? 'bg-muted/50 border-border hover:bg-muted/70 cursor-pointer'
                  : 'bg-muted/30 border-border opacity-60'
              }`}
              onClick={() => canComplete && handleCompleteTask(task.xp)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isTaskCompleted 
                    ? 'bg-gradient-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isTaskCompleted ? (
                    <Star className="w-4 h-4" />
                  ) : (
                    <task.icon className="w-4 h-4" />
                  )}
                </div>
                <span className={`font-inter font-medium ${
                  isTaskCompleted ? 'text-primary line-through' : ''
                }`}>
                  {task.title}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-fredoka font-bold text-accent">
                  +{task.xp} XP
                </span>
                {isTaskCompleted && (
                  <div className="w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Status */}
      {isCompleted ? (
        <div className="text-center p-4 bg-gradient-primary/20 rounded-xl border border-primary/30">
          <div className="text-3xl mb-2">🏆</div>
          <h4 className="font-fredoka font-bold text-primary mb-1">Challenge Complete!</h4>
          <p className="text-sm text-muted-foreground">You've mastered this week's challenge!</p>
        </div>
      ) : (
        <div className="text-center text-muted-foreground text-sm">
          <p>Complete tasks in order to unlock the next one!</p>
        </div>
      )}
    </div>
  );
};