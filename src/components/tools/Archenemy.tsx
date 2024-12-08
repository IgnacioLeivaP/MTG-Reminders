import React, { useState } from 'react';
import { Sword, ArrowLeft, Shuffle, RotateCcw, History, Play, X } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';

interface Scheme {
  id: number;
  name: string;
  effect: string;
  type: 'ongoing' | 'regular';
  set?: string;
}

const schemes: Scheme[] = [
  {
    id: 1,
    name: 'Your Will Is Not Your Own',
    effect: 'Gain control of target creature.',
    type: 'regular',
    set: 'Archenemy'
  },
  {
    id: 2,
    name: 'The Very Soil Shall Shake',
    effect: 'Each opponent sacrifices a land.',
    type: 'regular',
    set: 'Archenemy'
  },
  {
    id: 3,
    name: 'My Undead Horde Awakens',
    effect: 'Put two 2/2 black Zombie creature tokens onto the battlefield.',
    type: 'regular',
    set: 'Archenemy'
  },
  {
    id: 4,
    name: 'Every Hope Shall Vanish',
    effect: 'Each opponent discards two cards.',
    type: 'regular',
    set: 'Archenemy'
  },
  {
    id: 5,
    name: 'All Shall Smolder in My Wake',
    effect: 'Archenemy deals 3 damage to each opponent and each creature they control.',
    type: 'regular',
    set: 'Archenemy'
  },
  {
    id: 6,
    name: 'My Genius Knows No Bounds',
    effect: 'Draw three cards.',
    type: 'regular',
    set: 'Archenemy'
  },
  {
    id: 7,
    name: 'Behold My Grand Design',
    effect: 'Until your next turn, creatures you control get +2/+0 and have flying.',
    type: 'ongoing',
    set: 'Archenemy'
  }
  // ... más esquemas
];

export function Archenemy() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [schemeDeck, setSchemeDeck] = useState<Scheme[]>([...schemes]);
  const [activeSchemes, setActiveSchemes] = useState<Scheme[]>([]);
  const [usedSchemes, setUsedSchemes] = useState<Scheme[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const shuffleDeck = () => {
    setSchemeDeck(prev => {
      const newDeck = [...prev];
      for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
      }
      return newDeck;
    });
  };

  const drawScheme = () => {
    if (schemeDeck.length === 0) return;
    
    const newScheme = schemeDeck[0];
    const remainingDeck = schemeDeck.slice(1);
    
    if (newScheme.type === 'ongoing') {
      setActiveSchemes(prev => [...prev, newScheme]);
    } else {
      setUsedSchemes(prev => [newScheme, ...prev]);
    }
    
    setSchemeDeck(remainingDeck);
  };

  const removeOngoingScheme = (schemeId: number) => {
    setActiveSchemes(prev => {
      const scheme = prev.find(s => s.id === schemeId);
      if (scheme) {
        setUsedSchemes(used => [scheme, ...used]);
      }
      return prev.filter(s => s.id !== schemeId);
    });
  };

  const resetGame = () => {
    setSchemeDeck([...schemes]);
    setActiveSchemes([]);
    setUsedSchemes([]);
    shuffleDeck();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveSection('tools')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </button>
          <Sword className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">Archenemy</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <History className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </button>
          <button
            onClick={shuffleDeck}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <Shuffle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </button>
          <button
            onClick={resetGame}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-base p-6">
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400">
              Scheme Deck ({schemeDeck.length} remaining)
            </h3>
            <button
              onClick={drawScheme}
              disabled={schemeDeck.length === 0}
              className="w-full p-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Set Next Scheme in Motion</span>
            </button>
          </div>
        </div>

        <div className="card-base p-6">
          <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">
            Active Ongoing Schemes ({activeSchemes.length})
          </h3>
          <div className="space-y-4">
            {activeSchemes.map(scheme => (
              <div key={scheme.id} className="relative bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <button
                  onClick={() => removeOngoingScheme(scheme.id)}
                  className="absolute top-2 right-2 p-1 hover:bg-purple-200 dark:hover:bg-purple-800 
                    rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </button>
                <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                  {scheme.name}
                </h4>
                <p className="text-gray-600 dark:text-dark-text">{scheme.effect}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showHistory && usedSchemes.length > 0 && (
        <div className="card-base p-6">
          <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">
            Completed Schemes
          </h3>
          <div className="space-y-4">
            {usedSchemes.map((scheme, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-dark-accent rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-dark-highlight mb-2">
                  {scheme.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-dark-text">{scheme.effect}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 