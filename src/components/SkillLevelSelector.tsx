import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Sparkles, Crown, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';

interface SkillLevelSelectorProps {
  language: string;
  onComplete: () => void;
  onBack: () => void;
}

const skillLevels = [
  {
    id: 'newbie',
    title: 'Newbie',
    subtitle: 'Complete beginner',
    description: 'I know nothing or very little about this language',
    icon: Brain,
    color: 'from-success to-success-glow',
    features: ['Basic alphabet & sounds', 'Essential greetings', 'Numbers 1-20']
  },
  {
    id: 'beginner',
    title: 'Beginner',
    subtitle: 'Some basics',
    description: 'I know a few words and basic phrases',
    icon: Zap,
    color: 'from-primary to-primary-glow',
    features: ['Simple conversations', 'Common vocabulary', 'Present tense verbs']
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    subtitle: 'Getting confident',
    description: 'I can have simple conversations and understand basics',
    icon: Sparkles,
    color: 'from-secondary to-secondary-glow',
    features: ['Complex sentences', 'Past & future tense', 'Cultural context']
  },
  {
    id: 'advanced',
    title: 'Advanced',
    subtitle: 'Almost fluent',
    description: 'I can communicate well but want to perfect my skills',
    icon: Crown,
    color: 'from-warning to-warning-glow',
    features: ['Nuanced expressions', 'Professional vocabulary', 'Native-like fluency']
  }
];

export const SkillLevelSelector = ({ language, onComplete, onBack }: SkillLevelSelectorProps) => {
  const { setUser } = useGameStore();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    setIsConfirming(true);
  };

  const confirmSelection = () => {
    if (selectedLevel) {
      setUser({ skillLevel: selectedLevel });
      onComplete();
    }
  };

  const goBack = () => {
    setSelectedLevel(null);
    setIsConfirming(false);
  };

  if (isConfirming && selectedLevel) {
    const level = skillLevels.find(l => l.id === selectedLevel)!;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <div className="card-game text-center">
          <motion.div
            className={`w-20 h-20 bg-gradient-to-r ${level.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
          >
            <level.icon className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-fredoka font-bold mb-2">Perfect Choice!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            You've selected <span className="text-primary font-semibold">{level.title}</span> level for {language}
          </p>
          
          <div className="bg-muted/20 rounded-2xl p-4 mb-6">
            <h3 className="font-fredoka font-semibold mb-2">What you'll learn:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {level.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={goBack} className="flex-1">
              Go Back
            </Button>
            <Button onClick={confirmSelection} className="flex-1 btn-game">
              <ArrowRight className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex-1">
            <motion.h1 
              className="text-3xl md:text-4xl font-fredoka font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              What's your {language} level?
            </motion.h1>
          </div>
          <div className="w-20"></div> {/* Spacer for center alignment */}
        </div>
        <p className="text-lg text-muted-foreground">
          Help us personalize your learning experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillLevels.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, rotate: 0.5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLevelSelect(level.id)}
            className="card-interactive group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <motion.div
                className={`w-16 h-16 bg-gradient-to-r ${level.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}
                whileHover={{ rotate: 5 }}
              >
                <level.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-fredoka font-bold mb-1 group-hover:text-primary transition-colors">
                  {level.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  {level.subtitle}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {level.description}
                </p>
                
                {/* Features */}
                <div className="space-y-1">
                  {level.features.slice(0, 2).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <motion.div
                className="text-muted-foreground group-hover:text-primary transition-colors"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};