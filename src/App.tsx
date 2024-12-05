import React from 'react';
import { ScrollText } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Home } from './components/pages/Home';
import { HelperCards } from './components/pages/HelperCards';
import { Emblems } from './components/pages/Emblems';
import { GamePhases } from './components/pages/GamePhases';
import { LifeCounter } from './components/pages/LifeCounter';
import { Configuration } from './components/pages/Configuration';
import { Reset } from './components/pages/Reset';
import { useThemeStore } from './store/useThemeStore';
import { useTaglineStore } from './store/useTaglineStore';
import { useNavigationStore } from './store/useNavigationStore';
import logo from './assets/logo.png';

function App() {
  const activeSection = useNavigationStore(state => state.activeSection);
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const currentTagline = useTaglineStore(state => state.currentTagline);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
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
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg transition-colors pb-20 md:pb-0">
      <header className="bg-gradient-to-br from-purple-500 to-purple-700 dark:from-dark-accent dark:to-purple-900 text-white py-4 md:py-6 shadow-lg transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="MTG Reminders Logo" 
              className="w-11 h-12"
            />
            <div className="ml-3">
              <h1 className="text-xl md:text-2xl font-bold">MTG Reminders</h1>
              <p className="text-sm md:text-base mt-1 text-purple-100 dark:text-dark-highlight/90 italic">
                {currentTagline}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
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