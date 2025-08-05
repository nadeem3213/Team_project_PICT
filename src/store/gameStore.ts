import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, GameState, Theme } from '@/types';

interface GameStore {
  user: User;
  gameState: GameState;
  selectedLanguage: string | null;
  selectedTheme: string;
  themes: Theme[];
  
  // Actions
  setUser: (user: Partial<User>) => void;
  addXP: (amount: number) => void;
  loseHeart: () => void;
  restoreHearts: () => void;
  updateStreak: () => void;
  setSelectedLanguage: (languageId: string) => void;
  setSelectedTheme: (themeId: string) => void;
  completeLesson: (lessonId: string) => void;
  updateNotes: (notes: string) => void;
  spendXP: (amount: number) => boolean;
}

const defaultUser: User = {
  id: 'user-1',
  name: 'Language Learner',
  xp: 0,
  hearts: 5,
  maxHearts: 5,
  streak: 0,
  lastPlayDate: '',
  completedLessons: [],
  unlockedThemes: ['default'],
  notes: ''
};

const defaultGameState: GameState = {
  currentLesson: null,
  currentExercise: 0,
  score: 0,
  streak: 0,
  timeStarted: 0
};

const defaultThemes: Theme[] = [
  {
    id: 'default',
    name: 'Ocean Deep',
    preview: '🌊',
    cost: 0,
    colors: {
      primary: '210 100% 60%',
      secondary: '260 60% 45%',
      accent: '45 93% 58%'
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    preview: '🌲',
    cost: 100,
    colors: {
      primary: '142 76% 36%',
      secondary: '120 65% 55%',
      accent: '38 92% 50%'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    preview: '🌅',
    cost: 150,
    colors: {
      primary: '20 100% 60%',
      secondary: '0 84% 60%',
      accent: '45 93% 58%'
    }
  },
  {
    id: 'royal',
    name: 'Royal Purple',
    preview: '👑',
    cost: 200,
    colors: {
      primary: '270 100% 60%',
      secondary: '280 60% 45%',
      accent: '45 93% 58%'
    }
  }
];

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      gameState: defaultGameState,
      selectedLanguage: null,
      selectedTheme: 'default',
      themes: defaultThemes,

      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData }
        })),

      addXP: (amount) =>
        set((state) => ({
          user: { ...state.user, xp: state.user.xp + amount }
        })),

      loseHeart: () =>
        set((state) => ({
          user: {
            ...state.user,
            hearts: Math.max(0, state.user.hearts - 1)
          }
        })),

      restoreHearts: () =>
        set((state) => ({
          user: { ...state.user, hearts: state.user.maxHearts }
        })),

      updateStreak: () =>
        set((state) => {
          const today = new Date().toDateString();
          const lastPlay = new Date(state.user.lastPlayDate).toDateString();
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          
          let newStreak = state.user.streak;
          
          if (lastPlay === today) {
            // Already played today, don't update streak
            return state;
          } else if (lastPlay === yesterday) {
            // Played yesterday, continue streak
            newStreak = state.user.streak + 1;
          } else {
            // Streak broken, start new
            newStreak = 1;
          }

          return {
            user: {
              ...state.user,
              streak: newStreak,
              lastPlayDate: today
            }
          };
        }),

      setSelectedLanguage: (languageId) =>
        set({ selectedLanguage: languageId }),

      setSelectedTheme: (themeId) =>
        set({ selectedTheme: themeId }),

      completeLesson: (lessonId) =>
        set((state) => ({
          user: {
            ...state.user,
            completedLessons: [...state.user.completedLessons, lessonId]
          }
        })),

      updateNotes: (notes) =>
        set((state) => ({
          user: { ...state.user, notes }
        })),

      spendXP: (amount) => {
        const { user } = get();
        if (user.xp >= amount) {
          set((state) => ({
            user: { ...state.user, xp: state.user.xp - amount }
          }));
          return true;
        }
        return false;
      }
    }),
    {
      name: 'linguaquest-game-store',
    }
  )
);