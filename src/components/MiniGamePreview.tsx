import { motion } from 'framer-motion';
import { Gamepad2, Zap, Clock, ArrowRight } from 'lucide-react';
import lightbulbImage from '@/assets/lightbulb.jpg';

const games = [
  { 
    title: 'Vocabulary Quiz', 
    description: '30-sec rapid fire', 
    icon: Zap, 
    time: '30s',
    xp: '+15 XP'
  },
  { 
    title: 'Memory Match', 
    description: 'Words & Images', 
    icon: Gamepad2, 
    time: '2min',
    xp: '+25 XP'
  },
  { 
    title: 'Speed Challenge', 
    description: 'Beat the clock!', 
    icon: Clock, 
    time: '1min',
    xp: '+20 XP'
  },
];

export const MiniGamePreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-12"
    >
      <div className="text-center mb-6">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-block mb-3"
        >
          <Gamepad2 className="w-8 h-8 text-accent mx-auto" />
        </motion.div>
        <h2 className="text-2xl font-fredoka font-bold text-gradient mb-2">
          🎮 Quick Learning Games
        </h2>
        <p className="text-muted-foreground">Perfect for a quick brain workout!</p>
      </div>
      
      <div className="relative">
        {/* Background decoration */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${lightbulbImage})` }}
        />
        
        <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-3xl p-6 border border-accent/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {games.map((game, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card-interactive group text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 2,
                    delay: index * 0.3 
                  }}
                  className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-full p-3 w-fit mx-auto mb-3"
                >
                  <game.icon className="w-6 h-6 text-accent" />
                </motion.div>
                
                <h3 className="font-fredoka font-bold mb-1 group-hover:text-accent transition-colors">
                  {game.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
                
                <div className="flex items-center justify-center gap-2 text-xs mb-3">
                  <span className="bg-muted/30 px-2 py-1 rounded-full">{game.time}</span>
                  <span className="bg-success/20 text-success px-2 py-1 rounded-full">{game.xp}</span>
                </div>
                
                <div className="flex items-center justify-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-semibold">Play Now</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};