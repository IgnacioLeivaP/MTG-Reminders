import React, { useState } from 'react';
import { Cloud, ArrowLeft, Plus, RotateCcw, History } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { FavoriteButton } from '../../components/FavoriteButton';

interface Spell {
  id: string;
  name: string;
  type: string;
  timestamp: number;
}

interface StormCount {
  total: number;
  instant: number;
  sorcery: number;
  creature: number;
  artifact: number;
  enchantment: number;
  planeswalker: number;
}

const spellTypes = [
  'Instant',
  'Sorcery',
  'Creature',
  'Artifact',
  'Enchantment',
  'Planeswalker'
];

export function StormCounter() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [spells, setSpells] = useState<Spell[]>([]);
  const [newSpell, setNewSpell] = useState<Omit<Spell, 'id' | 'timestamp'>>({
    name: '',
    type: 'Instant'
  });
  const [showHistory, setShowHistory] = useState(false);

  const getStormCount = (): StormCount => {
    return spells.reduce((count, spell) => ({
      total: count.total + 1,
      instant: count.instant + (spell.type === 'Instant' ? 1 : 0),
      sorcery: count.sorcery + (spell.type === 'Sorcery' ? 1 : 0),
      creature: count.creature + (spell.type === 'Creature' ? 1 : 0),
      artifact: count.artifact + (spell.type === 'Artifact' ? 1 : 0),
      enchantment: count.enchantment + (spell.type === 'Enchantment' ? 1 : 0),
      planeswalker: count.planeswalker + (spell.type === 'Planeswalker' ? 1 : 0)
    }), {
      total: 0,
      instant: 0,
      sorcery: 0,
      creature: 0,
      artifact: 0,
      enchantment: 0,
      planeswalker: 0
    });
  };

  const handleAddSpell = () => {
    if (newSpell.name.trim()) {
      setSpells([
        ...spells,
        {
          ...newSpell,
          id: Date.now().toString(),
          timestamp: Date.now()
        }
      ]);
      setNewSpell({ name: '', type: 'Instant' });
    }
  };

  const handleReset = () => {
    setSpells([]);
  };

  const stormCount = getStormCount();

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
          <Cloud className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">Storm Counter</h2>
        </div>
        <FavoriteButton 
          toolId="storm-counter"
          toolName="Storm Counter"
          toolIcon="Cloud"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel de conteo */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Storm Count</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
              >
                <History className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-purple-600 dark:text-purple-400">
              {stormCount.total}
            </div>
            <p className="text-gray-600 dark:text-dark-text">Total Spells Cast</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(stormCount).map(([key, value]) => {
              if (key === 'total') return null;
              return (
                <div
                  key={key}
                  className="bg-gray-50 dark:bg-dark-accent/20 p-3 rounded-lg"
                >
                  <div className="font-semibold text-xl text-purple-600 dark:text-purple-400">
                    {value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-dark-text capitalize">
                    {key}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel de entrada */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Add Spell</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Spell Name</label>
              <input
                type="text"
                value={newSpell.name}
                onChange={(e) => setNewSpell({ ...newSpell, name: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                placeholder="Lightning Bolt, Dark Ritual, etc."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newSpell.name) {
                    handleAddSpell();
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Spell Type</label>
              <select
                value={newSpell.type}
                onChange={(e) => setNewSpell({ ...newSpell, type: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
              >
                {spellTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddSpell}
              disabled={!newSpell.name}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg 
                hover:bg-purple-700 dark:bg-dark-accent dark:hover:bg-dark-highlight 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Spell
            </button>
          </div>
        </div>
      </div>

      {/* Historial de hechizos */}
      {showHistory && (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Spell History</h3>
          
          {spells.length === 0 ? (
            <p className="text-center py-8 text-gray-500 dark:text-dark-text/60">
              No spells cast yet
            </p>
          ) : (
            <div className="space-y-2">
              {spells.map((spell, index) => (
                <div
                  key={spell.id}
                  className="flex items-center justify-between p-2 bg-gray-50 
                    dark:bg-dark-accent/20 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{spell.name}</span>
                    <span className="text-sm text-gray-600 dark:text-dark-text ml-2">
                      ({spell.type})
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-dark-text/60">
                    #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 