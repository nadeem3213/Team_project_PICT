import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Trophy } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

export const ProgressSummary = () => {
  const { user } = useGameStore();
  const { xp, completedLessons, streak } = user;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-6 mb-8 border border-primary/20"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="bg-gradient-primary rounded-full p-3"
          >
            <Trophy className="w-6 h-6 text-primary-foreground" />
          </motion.div>
          
          <div>
            <h3 className="font-fredoka font-bold text-lg mb-1">
              You've completed {completedLessons.length} lessons. Keep going! 🎉
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{xp} XP earned</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{streak} day streak 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};