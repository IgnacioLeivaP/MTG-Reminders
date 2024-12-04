import React, { useState } from 'react';
import { ScrollText } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { HelperCards } from './components/pages/HelperCards';
import { Emblems } from './components/pages/Emblems';
import { GamePhases } from './components/pages/GamePhases';
import { LifeCounter } from './components/pages/LifeCounter';
import { Configuration } from './components/pages/Configuration';
import { Reset } from './components/pages/Reset';
import { useThemeStore } from './store/useThemeStore';
import { useTaglineStore } from './store/useTaglineStore';

function App() {
  const [activeSection, setActiveSection] = useState('helper-cards');
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const currentTagline = useTaglineStore(state => state.currentTagline);

  const renderContent = () => {
    switch (activeSection) {
      case 'helper-cards':
        return <HelperCards />;
      case 'emblems':
        return <Emblems />;
      case 'game-phases':
        return <GamePhases />;
      case 'life-counter':
        return <LifeCounter />;
      case 'configuration':
        return <Configuration />;
      case 'reset':
        return <Reset />;
      default:
        return <HelperCards />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg transition-colors">
      <header className="bg-purple-600 dark:bg-dark-accent text-white py-6 shadow-lg transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3">
            <ScrollText className="w-8 h-8" />
            <h1 className="text-2xl font-bold">MTG Reminders</h1>
          </div>
          <p className="mt-2 text-purple-100 dark:text-dark-highlight/90">
            {currentTagline}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] gap-8">
          <Navigation
            activeSection={activeSection}
            onNavigate={setActiveSection}
          />
          <div className="min-h-[600px]">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;