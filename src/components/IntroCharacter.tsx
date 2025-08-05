import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import robotImage from '@/assets/robot-mascot.jpg';
import { useState, useEffect } from 'react';

const greetings = [
  "Hi! Ready to learn something new today? 🌟",
  "Welcome back, language explorer! 🚀",
  "Let's make today amazing with some learning! ✨",
  "Your language adventure awaits! 🗺️",
];

export const IntroCharacter = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(false);
      setTimeout(() => {
        setCurrentGreeting((prev) => (prev + 1) % greetings.length);
        setShowMessage(true);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="flex flex-col items-center mb-8"
    >
      {/* Character Image */}
      <div className="relative mb-4">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
            <img 
              src={robotImage} 
              alt="LinguaQuest Mascot" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Floating sparkles */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 0.5
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              delay: 1
            }}
            className="absolute -bottom-1 -left-2"
          >
            <Sparkles className="w-4 h-4 text-success" />
          </motion.div>
        </motion.div>
        
        {/* Pulsing glow effect */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity
          }}
          className="absolute inset-0 bg-primary/20 rounded-full blur-xl -z-10"
        />
      </div>

      {/* Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: showMessage ? 1 : 0, 
          y: showMessage ? 0 : 10 
        }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-r from-card to-card/80 backdrop-blur-sm border border-primary/30 rounded-2xl px-6 py-4 max-w-md text-center shadow-lg"
      >
        {/* Speech bubble pointer */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-primary/30 rotate-45" />
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageCircle className="w-4 h-4 text-primary" />
          <span className="text-xs font-fredoka font-semibold text-primary">LinguaBot</span>
        </div>
        
        <motion.p
          key={currentGreeting}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-inter text-sm leading-relaxed"
        >
          {greetings[currentGreeting]}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};