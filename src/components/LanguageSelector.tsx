import { useState } from 'react';
import { motion } from 'framer-motion';
import { languages } from '@/data/languages';
import { useGameStore } from '@/store/gameStore';
import { ArrowRight, Star, Search, Filter } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingLanguages } from '@/components/TrendingLanguages';
import { ProgressSummary } from '@/components/ProgressSummary';
import { GoalTracker } from '@/components/GoalTracker';
import { MiniGamePreview } from '@/components/MiniGamePreview';
import { IntroCharacter } from '@/components/IntroCharacter';
import { GettingStarted } from '@/components/GettingStarted';
import { SkillLevelSelector } from '@/components/SkillLevelSelector';
import starryBgImage from '@/assets/starry-bg.jpg';

const languageDescriptions = {
  spanish: "Spanish – Used in 20+ countries. Great for travel & culture! 🌎",
  french: "French – Language of love and cuisine. Opens doors to Europe! 🥐",
  german: "German – Engineering precision meets beautiful literature! 🏰",
  japanese: "Japanese – Ancient wisdom meets modern innovation! 🌸",
  arabic: "Arabic – Gateway to rich Middle Eastern culture! ☪️"
};

export const LanguageSelector = () => {
  const { setSelectedLanguage } = useGameStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLanguageForLevel, setSelectedLanguageForLevel] = useState<string | null>(null);

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguageForLevel(languageId);
  };

  const handleSkillLevelComplete = () => {
    if (selectedLanguageForLevel) {
      setSelectedLanguage(selectedLanguageForLevel);
    }
  };

  const filteredLanguages = languages.filter(language => {
    const matchesSearch = language.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Simple region filtering based on language
    const getRegion = (id: string) => {
      if (['spanish', 'french', 'german'].includes(id)) return 'europe';
      if (['japanese', 'arabic'].includes(id)) return 'asia';
      return 'all';
    };
    const matchesFilter = selectedFilter === 'all' || getRegion(language.id) === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Show skill level selector if language is selected but not confirmed
  if (selectedLanguageForLevel) {
    const selectedLang = languages.find(l => l.id === selectedLanguageForLevel);
    return (
      <div className="min-h-screen pt-20 pb-8 px-4 relative overflow-hidden">
        <div 
          className="fixed inset-0 opacity-5 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${starryBgImage})` }}
        />
        <div className="container mx-auto max-w-6xl relative z-10">
          <SkillLevelSelector 
            language={selectedLang?.name || selectedLanguageForLevel}
            onComplete={handleSkillLevelComplete}
            onBack={() => setSelectedLanguageForLevel(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="fixed inset-0 opacity-5 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${starryBgImage})` }}
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Intro Character */}
        <IntroCharacter />
        
        {/* Progress Summary & Goal Tracker */}
        <ProgressSummary />
        <GoalTracker />
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-6"
          >
            <span className="text-6xl mb-4 block">🌍</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-fredoka font-bold text-gradient mb-4">
            Choose Your Adventure
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Pick a language and start your journey to fluency with interactive lessons, 
            games, and daily challenges!
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center"
        >
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search a language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 font-inter"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl font-fredoka font-semibold text-sm transition-all duration-200 ${
                selectedFilter === 'all' 
                  ? 'bg-primary text-primary-foreground shadow-primary/30 shadow-lg' 
                  : 'bg-card/50 hover:bg-card/80 border border-border/50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter('europe')}
              className={`px-4 py-2 rounded-xl font-fredoka font-semibold text-sm transition-all duration-200 ${
                selectedFilter === 'europe' 
                  ? 'bg-primary text-primary-foreground shadow-primary/30 shadow-lg' 
                  : 'bg-card/50 hover:bg-card/80 border border-border/50'
              }`}
            >
              Europe
            </button>
            <button
              onClick={() => setSelectedFilter('asia')}
              className={`px-4 py-2 rounded-xl font-fredoka font-semibold text-sm transition-all duration-200 ${
                selectedFilter === 'asia' 
                  ? 'bg-primary text-primary-foreground shadow-primary/30 shadow-lg' 
                  : 'bg-card/50 hover:bg-card/80 border border-border/50'
              }`}
            >
              Asia
            </button>
          </div>
        </motion.div>

        {/* Trending Languages */}
        <TrendingLanguages />

        {/* Language Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {filteredLanguages.map((language, index) => (
            <TooltipProvider key={language.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      type: "spring",
                      bounce: 0.4 
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: [0, 1, -1, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="card-interactive group cursor-pointer"
                    onClick={() => handleLanguageSelect(language.id)}
                  >
                    <div className="text-center relative overflow-hidden">
                      {/* Animated background glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{
                          background: [
                            'linear-gradient(45deg, hsl(var(--primary) / 0.05), hsl(var(--secondary) / 0.05))',
                            'linear-gradient(90deg, hsl(var(--secondary) / 0.05), hsl(var(--accent) / 0.05))',
                            'linear-gradient(135deg, hsl(var(--accent) / 0.05), hsl(var(--primary) / 0.05))',
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      {/* Flag */}
                      <motion.div
                        whileHover={{ 
                          scale: 1.1,
                          transition: { duration: 0.3 }
                        }}
                        className="text-4xl md:text-6xl mb-4 relative z-10"
                      >
                        {language.flag}
                      </motion.div>
                      
                      {/* Language Name */}
                      <h3 className="text-xl md:text-2xl font-fredoka font-bold mb-2 group-hover:text-primary transition-colors relative z-10">
                        {language.name}
                      </h3>
                      
                      {/* Progress Indicator */}
                      <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
                        <div className="flex gap-1">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + i * 0.1 }}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  i < 1 ? 'text-accent fill-accent' : 'text-muted-foreground/30'
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-xs md:text-sm text-muted-foreground">2+ lessons available</span>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-center gap-2 text-primary group-hover:text-primary-glow transition-colors relative z-10">
                        <span className="font-inter font-medium md:font-semibold text-sm md:text-base">Start Adventure</span>
                        <motion.div
                          animate={{ x: [0, 2, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="font-inter text-sm">
                    {languageDescriptions[language.id as keyof typeof languageDescriptions]}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Mini Game Preview */}
        <MiniGamePreview />

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="text-3xl md:text-4xl mb-3"
            >
              🎮
            </motion.div>
            <h3 className="font-fredoka font-bold text-base md:text-lg mb-2">Interactive Games</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Fun exercises, drag & drop, and story mode</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                delay: 1
              }}
              className="text-3xl md:text-4xl mb-3"
            >
              ⚡
            </motion.div>
            <h3 className="font-fredoka font-bold text-base md:text-lg mb-2">XP & Rewards</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Earn points, unlock themes, and compete</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1.1, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity,
                delay: 1.5
              }}
              className="text-3xl md:text-4xl mb-3"
            >
              🔥
            </motion.div>
            <h3 className="font-fredoka font-bold text-base md:text-lg mb-2">Daily Streaks</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Build habits with daily challenges</p>
          </motion.div>
        </motion.div>

        {/* Getting Started Section */}
        <GettingStarted />
      </div>
    </div>
  );
};