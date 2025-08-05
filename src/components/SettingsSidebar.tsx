import { useState } from 'react';
import { X, User, Palette, Info, FileText, Home, Trophy, Store } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { languages } from '@/data/languages';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsSidebar = ({ isOpen, onClose }: SettingsSidebarProps) => {
  const { user, themes, selectedTheme, setSelectedTheme, updateNotes, spendXP, selectedLanguage, setSelectedLanguage } = useGameStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [notes, setNotes] = useState(user.notes);

  const handleSaveNotes = () => {
    updateNotes(notes);
    toast.success('Notes saved!');
  };

  const handleThemeSelect = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    if (theme.cost === 0 || user.unlockedThemes.includes(themeId)) {
      setSelectedTheme(themeId);
      toast.success(`${theme.name} theme activated!`);
    } else {
      if (spendXP(theme.cost)) {
        setSelectedTheme(themeId);
        toast.success(`${theme.name} theme purchased and activated!`);
      } else {
        toast.error('Not enough XP to purchase this theme');
      }
    }
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'themes', label: 'Themes', icon: Palette },
    { id: 'store', label: 'XP Store', icon: Store },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'about', label: 'About', icon: Info },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-gradient-card border-l border-border/50 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-fredoka font-bold text-gradient">Settings</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-muted/30 hover:bg-muted/50 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-b border-border/50">
          <div className="grid grid-cols-3 gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary/20 text-primary'
                    : 'hover:bg-muted/30 text-muted-foreground'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-xs font-inter">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'home' && (
            <div className="space-y-4">
              <h3 className="font-fredoka font-bold text-lg mb-4">Language Selection</h3>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${
                      selectedLanguage === lang.id
                        ? 'bg-primary/20 border border-primary/30'
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-inter font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-fredoka font-bold text-primary-foreground">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-fredoka font-bold text-lg">{user.name}</h3>
                <p className="text-muted-foreground text-sm">Level {Math.floor(user.xp / 100) + 1}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between p-3 bg-muted/30 rounded-xl">
                  <span className="font-inter">Total XP</span>
                  <span className="font-fredoka font-bold text-accent">{user.xp}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-xl">
                  <span className="font-inter">Current Streak</span>
                  <span className="font-fredoka font-bold text-warning">{user.streak} 🔥</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-xl">
                  <span className="font-inter">Lessons Completed</span>
                  <span className="font-fredoka font-bold text-success">{user.completedLessons.length}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'themes' && (
            <div className="space-y-4">
              <h3 className="font-fredoka font-bold text-lg mb-4">Choose Theme</h3>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedTheme === theme.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border/30 bg-muted/30 hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{theme.preview}</div>
                    <div className="text-sm font-inter font-medium mb-1">{theme.name}</div>
                    {theme.cost > 0 && !user.unlockedThemes.includes(theme.id) && (
                      <div className="text-xs text-accent">{theme.cost} XP</div>
                    )}
                    {user.unlockedThemes.includes(theme.id) && theme.cost > 0 && (
                      <div className="text-xs text-success">Owned</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'store' && (
            <div className="space-y-4">
              <h3 className="font-fredoka font-bold text-lg mb-4">XP Store</h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-inter font-medium">Skip Question</span>
                    <span className="text-accent font-fredoka font-bold">20 XP</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Skip a difficult question during lessons</p>
                  <Button className="w-full btn-warning" size="sm">
                    Purchase
                  </Button>
                </div>

                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-inter font-medium">Restore Hearts</span>
                    <span className="text-accent font-fredoka font-bold">50 XP</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Fully restore your hearts instantly</p>
                  <Button className="w-full btn-warning" size="sm">
                    Purchase
                  </Button>
                </div>

                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-inter font-medium">Bonus Mini-Lesson</span>
                    <span className="text-accent font-fredoka font-bold">100 XP</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Unlock exclusive mini-lessons</p>
                  <Button className="w-full btn-warning" size="sm">
                    Purchase
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <h3 className="font-fredoka font-bold text-lg mb-4">Language Notes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Write down important phrases, grammar rules, or anything you want to remember!
              </p>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Start writing your language notes here..."
                className="min-h-40 bg-muted/30 border-border/50"
              />
              <Button onClick={handleSaveNotes} className="w-full btn-game">
                Save Notes
              </Button>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="font-fredoka font-bold text-lg mb-4">About LinguaQuest</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  LinguaQuest is a gamified language learning platform designed to make 
                  learning fun and engaging through interactive exercises, XP systems, and daily challenges.
                </p>
                <div className="p-4 bg-gradient-primary/10 rounded-xl">
                  <h4 className="font-fredoka font-bold text-foreground mb-2">Features:</h4>
                  <ul className="space-y-1">
                    <li>• Interactive exercises (Multiple choice, Fill-in-blanks, Drag & drop)</li>
                    <li>• Story mode conversations</li>
                    <li>• XP system with rewards</li>
                    <li>• Daily streaks and challenges</li>
                    <li>• Cultural fun facts</li>
                    <li>• Mini-games and competitions</li>
                  </ul>
                </div>
                <p>
                  Version 1.0.0 - Built with modern web technologies for an optimal learning experience.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};