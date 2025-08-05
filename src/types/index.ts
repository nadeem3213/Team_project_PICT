export interface Language {
  id: string;
  name: string;
  flag: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  xp: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  lastPlayDate: string;
  completedLessons: string[];
  unlockedThemes: string[];
  notes: string;
  skillLevel?: string;
}

export interface Lesson {
  id: string;
  languageId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  exercises: Exercise[];
  funFact?: string;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'drag-drop' | 'story-mode';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  audio?: string;
  image?: string;
  xpValue: number;
}

export interface Theme {
  id: string;
  name: string;
  preview: string;
  cost: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface GameState {
  currentLesson: string | null;
  currentExercise: number;
  score: number;
  streak: number;
  timeStarted: number;
}