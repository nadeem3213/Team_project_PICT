import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { GameHeader } from '@/components/GameHeader';
import { LanguageSelector } from '@/components/LanguageSelector';
import { LanguageDashboard } from '@/components/LanguageDashboard';
import { SettingsSidebar } from '@/components/SettingsSidebar';

const Index = () => {
  const { selectedLanguage } = useGameStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <GameHeader onSettingsClick={() => setShowSettings(true)} />
      
      {!selectedLanguage ? (
        <LanguageSelector />
      ) : (
        <LanguageDashboard />
      )}

      <SettingsSidebar 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
};

export default Index;
