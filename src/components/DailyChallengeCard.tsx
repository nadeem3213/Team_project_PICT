import { useState, useEffect } from 'react';
import { Calendar, Clock, Zap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';
import { lessonsData } from '@/data/languages';
import { toast } from 'sonner';

interface DailyChallengeCardProps {
  languageId: string;
}

export const DailyChallengeCard = ({ languageId }: DailyChallengeCardProps) => {
  const { user, addXP, updateStreak } = useGameStore();
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Check if challenge was completed today
    const today = new Date().toDateString();
    const completed = localStorage.getItem(`daily-challenge-${today}-${languageId}`) === 'true';
    setIsCompleted(completed);

    // Update countdown timer
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [languageId]);

  const handleCompleteChallenge = () => {
    const xpReward = 100;
    addXP(xpReward);
    updateStreak();
    
    const today = new Date().toDateString();
    localStorage.setItem(`daily-challenge-${today}-${languageId}`, 'true');
    setIsCompleted(true);

    toast.success('Daily Challenge Complete! 🎉', {
      description: `You earned ${xpReward} bonus XP and maintained your streak!`,
      duration: 4000,
    });
  };

  const lessons = lessonsData[languageId] || [];
  const todayChallenge = lessons.length > 0 ? lessons[0] : null;

  if (!todayChallenge) {
    return (
      <div className="card-game text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-xl font-fredoka font-bold mb-2">Challenge Coming Soon!</h3>
        <p className="text-muted-foreground">
          Daily challenges will be available once lessons are ready for this language.
        </p>
      </div>
    );
  }

  return (
    <div className="card-game max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-warning rounded-2xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-warning-foreground" />
          </div>
          <div>
            <h3 className="font-fredoka font-bold text-lg">Today's Challenge</h3>
            <p className="text-muted-foreground text-sm">Extra XP and streak bonus!</p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
            <Clock className="w-3 h-3" />
            <span>Resets in {timeLeft}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-warning" />
            <span className="font-fredoka font-bold text-warning">+100 XP</span>
          </div>
        </div>
      </div>

      {isCompleted ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4 animate-bounce-in">✅</div>
          <h4 className="text-xl font-fredoka font-bold text-success mb-2">
            Challenge Completed!
          </h4>
          <p className="text-muted-foreground mb-6">
            Great job! Come back tomorrow for a new challenge.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-gradient-xp/20 px-4 py-2 rounded-xl">
              <Zap className="w-4 h-4 text-xp" />
              <span className="font-fredoka font-bold text-xp">+100 XP</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-warning/20 px-4 py-2 rounded-xl">
              <span className="text-lg">🔥</span>
              <span className="font-fredoka font-bold text-warning">Streak +1</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="p-4 bg-gradient-to-r from-primary/10 to-warning/10 rounded-2xl mb-6">
            <h4 className="font-fredoka font-bold text-lg mb-2">
              Quick Review: {todayChallenge.title}
            </h4>
            <p className="text-muted-foreground text-sm">
              Complete a quick review of {todayChallenge.title.toLowerCase()} concepts to earn bonus XP!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-fredoka font-bold text-sm">5 Minutes</div>
              <div className="text-xs text-muted-foreground">Quick & Easy</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-fredoka font-bold text-sm">5 Questions</div>
              <div className="text-xs text-muted-foreground">Focused Practice</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-fredoka font-bold text-sm">Double XP</div>
              <div className="text-xs text-muted-foreground">Bonus Reward</div>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={handleCompleteChallenge} className="btn-warning px-8 py-3">
              <Trophy className="w-4 h-4 mr-2" />
              Start Daily Challenge
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};