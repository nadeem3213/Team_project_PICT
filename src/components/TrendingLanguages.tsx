import { motion } from 'framer-motion';
import { TrendingUp, Users, Crown } from 'lucide-react';

const trendingData = [
  { language: '🇪🇸 Spanish', learners: '2,341', trend: '+23%', icon: '🔥' },
  { language: '🇫🇷 French', learners: '1,875', trend: '+18%', icon: '⚡' },
  { language: '🇯🇵 Japanese', learners: '1,542', trend: '+31%', icon: '🚀' },
  { language: '🇩🇪 German', learners: '1,239', trend: '+15%', icon: '💎' },
];

export const TrendingLanguages = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-warning animate-bounce" />
        <h2 className="text-2xl font-fredoka font-bold text-gradient">
          🔥 Trending Languages This Week
        </h2>
        <TrendingUp className="w-6 h-6 text-warning animate-bounce" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 text-center hover:border-primary/40 transition-all duration-300"
          >
            <div className="text-2xl mb-2 animate-pulse">{item.icon}</div>
            <h3 className="font-fredoka font-semibold text-sm mb-1">{item.language}</h3>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
              <Users className="w-3 h-3" />
              <span>{item.learners} learners</span>
            </div>
            <div className="text-success text-xs font-semibold flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {item.trend} this week
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};