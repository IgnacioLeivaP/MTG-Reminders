import React from 'react';
import { ScrollText } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Home } from './components/pages/Home';
import { HelperCards } from './components/pages/HelperCards';
import { Emblems } from './components/pages/Emblems';
import { GamePhases } from './components/pages/GamePhases';
import { LifeCounter } from './components/tools/LifeCounter';
import { Configuration } from './components/pages/Configuration';
import { Reset } from './components/pages/Reset';
import { Tools } from './components/pages/Tools';
import { DiceRoller } from './components/tools/DiceRoller';
import { CascadeHelper } from './components/tools/CascadeHelper';
import { useThemeStore } from './store/useThemeStore';
import { useTaglineStore } from './store/useTaglineStore';
import { useNavigationStore } from './store/useNavigationStore';
import logo from './assets/logo.png';
import { ManaCalculator } from './components/tools/ManaCalculator';
import { TokenGenerator } from './components/tools/TokenGenerator';
import { StormCounter } from './components/tools/StormCounter';
import { DamageTracker } from './components/tools/DamageTracker';
import { ManaPool } from './components/tools/ManaPool';
import { DeckBuilder } from './components/tools/DeckBuilder';
import { Planechase } from './components/tools/Planechase';
import { Archenemy } from './components/tools/Archenemy';
import { SpecialModes } from './components/tools/SpecialModes';
import { useEffect } from 'react';

function App() {
  const activeSection = useNavigationStore(state => state.activeSection);
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const currentTagline = useTaglineStore(state => state.currentTagline);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'tools':
        return <Tools />;
      case 'helper-cards':
        return <HelperCards />;
      case 'emblems':
        return <Emblems />;
      case 'settings':
        return <Configuration />;
      case 'life-counter':
        return <LifeCounter />;
      case 'game-phases':
        return <GamePhases />;
      case 'dice-roller':
        return <DiceRoller />;
      case 'cascade-helper':
        return <CascadeHelper />;
      case 'reset':
        return <Reset />;
      case 'mana-calculator':
        return <ManaCalculator />;
      case 'token-generator':
        return <TokenGenerator />;
      case 'storm-counter':
        return <StormCounter />;
      case 'damage-tracker':
        return <DamageTracker />;
      case 'mana-pool':
        return <ManaPool />;
      case 'deck-builder':
        return <DeckBuilder />;
      case 'planechase':
        return <Planechase />;
      case 'archenemy':
        return <Archenemy />;
      case 'special-modes':
        return <SpecialModes />;
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