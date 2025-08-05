import { Heart, Zap, Settings, Trophy } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { Progress } from '@/components/ui/progress';

interface GameHeaderProps {
  onSettingsClick: () => void;
}

export const GameHeader = ({ onSettingsClick }: GameHeaderProps) => {
  const { user } = useGameStore();
  
  const xpToNextLevel = 100;
  const currentLevelXP = user.xp % xpToNextLevel;
  const level = Math.floor(user.xp / xpToNextLevel) + 1;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-card border-b border-border/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-primary">
              <span className="text-xl font-fredoka font-bold text-primary-foreground">L</span>
            </div>
            <h1 className="text-xl font-fredoka font-bold text-gradient">LinguaQuest</h1>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center gap-6">
            {/* XP and Level */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-muted/30 rounded-full px-3 py-1">
                <Zap className="w-4 h-4 text-accent" />
                <span className="font-inter font-semibold text-sm">{user.xp}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Level {level}</span>
                </div>
                <Progress 
                  value={(currentLevelXP / xpToNextLevel) * 100} 
                  className="w-20 h-2"
                />
              </div>
            </div>

            {/* Hearts */}
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

            {/* Streak */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-warning/20 to-warning/10 rounded-full px-3 py-1">
              <span className="text-lg">🔥</span>
              <span className="font-inter font-semibold text-sm">{user.streak}</span>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="flex md:hidden items-center gap-3">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-accent" />
              <span className="font-inter font-semibold text-sm">{user.xp}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-heart fill-heart" />
              <span className="font-inter font-semibold text-sm">{user.hearts}</span>
            </div>
          </div>

          {/* Settings Button */}
          <button
            onClick={onSettingsClick}
            className="w-10 h-10 bg-muted/30 hover:bg-muted/50 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};