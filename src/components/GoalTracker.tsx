import { motion } from 'framer-motion';
import { Target, Calendar, Flame } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

export const GoalTracker = () => {
  const { user } = useGameStore();
  const { streak, xp } = user;
  const dailyGoal = 50; // XP goal per day
  const todayProgress = Math.min((xp % 100), dailyGoal);
  const progressPercentage = (todayProgress / dailyGoal) * 100;
  
  const weeklyStreak = Array.from({ length: 7 }, (_, i) => i < streak);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-r from-success/10 to-xp/10 rounded-2xl p-4 mb-8 border border-success/20"
    >
      <div className="flex items-center gap-3 mb-4">
        <Target className="w-5 h-5 text-success" />
        <h3 className="font-fredoka font-bold text-lg">Daily Goal & Streak</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Goal Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-inter">Today's XP Goal</span>
            <span className="text-sm font-semibold text-success">{todayProgress}/{dailyGoal} XP</span>
          </div>
          <div className="bg-muted/30 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="xp-bar h-full"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {dailyGoal - todayProgress > 0 ? `${dailyGoal - todayProgress} XP to go!` : 'Goal achieved! 🎉'}
          </p>
        </div>
        
        {/* Weekly Streak */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-warning" />
            <span className="text-sm font-inter">Weekly Streak</span>
            <span className="text-sm font-semibold text-warning">{streak} days 🔥</span>
          </div>
          <div className="flex gap-1">
            {weeklyStreak.map((active, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  active 
                    ? 'bg-warning border-warning text-warning-foreground' 
                    : 'border-muted bg-muted/20'
                }`}
              >
                {active && <Flame className="w-3 h-3" />}
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Keep it up! 💪</p>
        </div>
      </div>
    </motion.div>
  );
};