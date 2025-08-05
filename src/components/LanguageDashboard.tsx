import { useState } from 'react';
import { ArrowLeft, Trophy, Target, Clock, Calendar } from 'lucide-react';
import { languages, lessonsData } from '@/data/languages';
import { useGameStore } from '@/store/gameStore';
import { LessonCard } from './LessonCard';
import { LessonView } from './LessonView';
import { DailyChallengeCard } from './DailyChallengeCard';
import { WeeklyChallengeCard } from './WeeklyChallengeCard';
import { MiniGames } from './MiniGames';

export const LanguageDashboard = () => {
  const { selectedLanguage, setSelectedLanguage, user } = useGameStore();
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'lessons' | 'challenges' | 'weekly' | 'games'>('lessons');

  if (!selectedLanguage) return null;

  const language = languages.find(lang => lang.id === selectedLanguage);
  const lessons = lessonsData[selectedLanguage] || [];
  const currentLessonData = lessons.find(lesson => lesson.id === currentLesson);

  if (currentLessonData) {
    return (
      <LessonView
        lesson={currentLessonData}
        onComplete={() => setCurrentLesson(null)}
        onExit={() => setCurrentLesson(null)}
      />
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedLanguage(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-inter">Back to Languages</span>
            </button>
            
            <div className="flex items-center gap-3">
              <span className="text-4xl">{language?.flag}</span>
              <div>
                <h1 className="text-2xl font-fredoka font-bold text-gradient">
                  {language?.name} Learning
                </h1>
                <p className="text-muted-foreground text-sm">
                  {user.completedLessons.filter(id => id.startsWith(selectedLanguage)).length} lessons completed
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gradient-primary/20 px-3 py-2 rounded-xl">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="font-fredoka font-bold text-sm">Level {Math.floor(user.xp / 100) + 1}</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-warning/20 px-3 py-2 rounded-xl">
              <span className="text-lg">🔥</span>
              <span className="font-fredoka font-bold text-sm">{user.streak} days</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-muted/30 p-1 rounded-2xl w-fit">
          {[
            { id: 'lessons', label: 'Lessons', icon: Target },
            { id: 'challenges', label: 'Daily', icon: Clock },
            { id: 'weekly', label: 'Weekly', icon: Calendar },
            { id: 'games', label: 'Games', icon: Trophy },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-inter font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'lessons' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-fredoka font-bold mb-2">Available Lessons</h2>
              <p className="text-muted-foreground">
                Master the basics with interactive exercises and cultural insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessons.map((lesson, index) => {
                const isLocked = index > 0 && !user.completedLessons.includes(lessons[index - 1].id);
                return (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isLocked={isLocked}
                    onStart={setCurrentLesson}
                  />
                );
              })}
            </div>

            {lessons.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-fredoka font-bold mb-2">Coming Soon!</h3>
                <p className="text-muted-foreground">
                  We're working hard to bring you amazing {language?.name} lessons.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-fredoka font-bold mb-2">Daily Challenge</h2>
              <p className="text-muted-foreground">
                Complete today's challenge to maintain your streak and earn bonus XP!
              </p>
            </div>

            <DailyChallengeCard languageId={selectedLanguage} />
          </div>
        )}

        {activeTab === 'weekly' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-fredoka font-bold mb-2">Weekly Challenge</h2>
              <p className="text-muted-foreground">
                Complete 5 tasks this week for massive XP rewards and achievements!
              </p>
            </div>

            <WeeklyChallengeCard languageId={selectedLanguage} />
          </div>
        )}

        {activeTab === 'games' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-fredoka font-bold mb-2">Mini Games</h2>
              <p className="text-muted-foreground">
                Have fun while learning with these interactive games and challenges
              </p>
            </div>

            <MiniGames languageId={selectedLanguage} />
          </div>
        )}
      </div>
    </div>
  );
};