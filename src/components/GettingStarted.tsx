import { motion } from 'framer-motion';
import { ArrowRight, Languages, BookOpen, Calendar } from 'lucide-react';
import animatedLightsImage from '@/assets/animated-lights.jpg';

const steps = [
  {
    icon: Languages,
    title: 'Pick a Language',
    description: 'Choose from 5 beautiful languages',
    color: 'primary'
  },
  {
    icon: BookOpen,
    title: 'Choose a Lesson',
    description: 'Start with basics or jump ahead',
    color: 'secondary'
  },
  {
    icon: Calendar,
    title: 'Practice Daily',
    description: 'Build streaks and earn rewards',
    color: 'success'
  }
];

interface GettingStartedProps {
  onStartAdventure?: () => void;
}

export const GettingStarted = ({ onStartAdventure }: GettingStartedProps = {}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative"
    >
      {/* Background decoration */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${animatedLightsImage})` }}
      />
      
      <div className="relative bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm rounded-3xl p-8 border border-accent/20">
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity
            }}
            className="text-4xl mb-4"
          >
            👣
          </motion.div>
          <h2 className="text-2xl font-fredoka font-bold text-gradient mb-2">
            How to Begin Your Journey
          </h2>
          <p className="text-muted-foreground">
            Three simple steps to language mastery
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`bg-gradient-to-r from-${step.color}/20 to-${step.color}/10 rounded-full p-4 w-fit mx-auto mb-4 group-hover:shadow-lg transition-all duration-300`}
              >
                <step.icon className={`w-8 h-8 text-${step.color}`} />
              </motion.div>
              
              <h3 className="font-fredoka font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {index + 1}. {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
                >
                  <ArrowRight className="w-6 h-6 text-muted-foreground/50" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartAdventure}
            className="btn-game text-lg px-8 py-4"
          >
            <span>Start Your Adventure</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};