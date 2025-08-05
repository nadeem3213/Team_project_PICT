import { useState } from 'react';
import { Clock, Shuffle, MemoryStick, Play, Trophy, Star, Volume2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';
import { lessonsData } from '@/data/languages';
import { toast } from 'sonner';
import { ImageWordGame } from '@/components/games/ImageWordGame';
import { TranslateGame } from '@/components/games/TranslateGame';
import { MatchUpGame } from '@/components/games/MatchUpGame';
import { ListenAndTypeGame } from '@/components/games/ListenAndTypeGame';

interface MiniGamesProps {
  languageId: string;
}

export const MiniGames = ({ languageId }: MiniGamesProps) => {
  const { addXP } = useGameStore();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const lessons = lessonsData[languageId] || [];

  const games = [
    {
      id: 'image-word',
      title: 'Image Word Match',
      description: 'Match images with their words',
      icon: MemoryStick,
      color: 'from-primary to-primary-glow',
      xpReward: 30,
      difficulty: 'Easy',
      estimatedTime: '3 min',
      component: ImageWordGame
    },
    {
      id: 'translate',
      title: 'Translate Words',
      description: 'Translate English to target language',
      icon: Zap,
      color: 'from-secondary to-secondary-glow',
      xpReward: 40,
      difficulty: 'Medium',
      estimatedTime: '4 min',
      component: TranslateGame
    },
    {
      id: 'match-up',
      title: 'Match Up',
      description: 'Match words with their translations',
      icon: Shuffle,
      color: 'from-success to-success-glow',
      xpReward: 45,
      difficulty: 'Medium',
      estimatedTime: '5 min',
      component: MatchUpGame
    },
    {
      id: 'listen-type',
      title: 'Listen & Type',
      description: 'Listen and type what you hear',
      icon: Volume2,
      color: 'from-warning to-warning-glow',
      xpReward: 50,
      difficulty: 'Hard',
      estimatedTime: '6 min',
      component: ListenAndTypeGame
    }
  ];

  const handlePlayGame = (gameId: string) => {
    setActiveGame(gameId);
  };

  const handleGameComplete = () => {
    setActiveGame(null);
  };

  // Mini games are always available now, regardless of lesson completion

  // If a game is active, render the game component
  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    if (game) {
      const GameComponent = game.component;
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveGame(null)}
              className="mb-4"
            >
              ← Back to Games
            </Button>
          </div>
          <GameComponent 
            languageId={languageId} 
            onComplete={handleGameComplete}
          />
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {games.map((game) => (
          <div key={game.id} className="card-interactive group">
            {/* Game Icon */}
            <div className={`w-16 h-16 bg-gradient-to-r ${game.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
              <game.icon className="w-8 h-8 text-white" />
            </div>

            {/* Game Info */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-fredoka font-bold mb-2 group-hover:text-primary transition-colors">
                {game.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {game.description}
              </p>

              {/* Game Stats */}
              <div className="flex items-center justify-center gap-2 md:gap-4 text-xs text-muted-foreground mb-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{game.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>{game.difficulty}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  <span>+{game.xpReward} XP</span>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <Button
              onClick={() => handlePlayGame(game.id)}
              className="w-full btn-game"
            >
              <Play className="w-4 h-4 mr-2" />
              Play Now
            </Button>
          </div>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="card-game">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-fredoka font-bold text-lg">Game Leaderboard</h3>
            <p className="text-muted-foreground text-sm">Compete with other learners!</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Language Master', score: 2850, rank: 1 },
            { name: 'Word Wizard', score: 2340, rank: 2 },
            { name: 'Grammar Guru', score: 1980, rank: 3 },
            { name: 'You', score: 1650, rank: 4 },
            { name: 'Study Buddy', score: 1420, rank: 5 },
          ].map((player) => (
            <div
              key={player.rank}
              className={`flex items-center justify-between p-3 rounded-xl ${
                player.name === 'You' 
                  ? 'bg-gradient-primary/20 border border-primary/30' 
                  : 'bg-muted/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-fredoka font-bold text-sm ${
                  player.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                  player.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800' :
                  player.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {player.rank}
                </div>
                <span className={`font-inter font-medium ${
                  player.name === 'You' ? 'text-primary font-semibold' : ''
                }`}>
                  {player.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="font-fredoka font-bold text-accent">
                  {player.score.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full">
            View Full Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};