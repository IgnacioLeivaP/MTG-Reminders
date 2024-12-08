import React, { useState } from 'react';
import { Swords, ArrowLeft, Plus, Trash2, Shield, Heart, HelpCircle } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';

interface Creature {
  id: string;
  name: string;
  power: number;
  toughness: number;
  damage: number;
  shield: number; // Para efectos de prevención de daño
  lifelink: boolean;
}

export function DamageTracker() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [newCreature, setNewCreature] = useState<Omit<Creature, 'id'>>({
    name: '',
    power: 1,
    toughness: 1,
    damage: 0,
    shield: 0,
    lifelink: false
  });
  const [lifeTotalChange, setLifeTotalChange] = useState(20);
  const [showHelp, setShowHelp] = useState(false);

  const handleAddCreature = () => {
    if (newCreature.name) {
      setCreatures([
        ...creatures,
        { ...newCreature, id: Date.now().toString() }
      ]);
      setNewCreature({
        name: '',
        power: 1,
        toughness: 1,
        damage: 0,
        shield: 0,
        lifelink: false
      });
    }
  };

  const handleRemoveCreature = (id: string) => {
    setCreatures(creatures.filter(creature => creature.id !== id));
  };

  const handleDamage = (id: string, amount: number) => {
    setCreatures(creatures.map(creature => {
      if (creature.id === id) {
        const effectiveShield = creature.shield;
        const actualDamage = Math.max(0, amount - effectiveShield);
        return {
          ...creature,
          damage: Math.max(0, creature.damage + actualDamage),
          shield: Math.max(0, effectiveShield - amount)
        };
      }
      return creature;
    }));
  };

  const handleHeal = (id: string, amount: number) => {
    setCreatures(creatures.map(creature => {
      if (creature.id === id) {
        return {
          ...creature,
          damage: Math.max(0, creature.damage - amount)
        };
      }
      return creature;
    }));
  };

  const handleAddShield = (id: string, amount: number) => {
    setCreatures(creatures.map(creature => {
      if (creature.id === id) {
        return {
          ...creature,
          shield: creature.shield + amount
        };
      }
      return creature;
    }));
  };

  const isCreatureDead = (creature: Creature) => {
    return creature.damage >= creature.toughness;
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
          <Swords className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">Damage Tracker</h2>
        </div>
        
        <button
          onClick={() => setShowHelp(true)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
        >
          <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel de creación de criaturas */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Add Creature</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newCreature.name}
                onChange={(e) => setNewCreature({ ...newCreature, name: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                placeholder="Creature name..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Power</label>
                <input
                  type="number"
                  value={newCreature.power}
                  onChange={(e) => setNewCreature({ ...newCreature, power: Number(e.target.value) })}
                  className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Toughness</label>
                <input
                  type="number"
                  value={newCreature.toughness}
                  onChange={(e) => setNewCreature({ ...newCreature, toughness: Number(e.target.value) })}
                  className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="lifelink"
                checked={newCreature.lifelink}
                onChange={(e) => setNewCreature({ ...newCreature, lifelink: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="lifelink" className="text-sm font-medium">
                Has Lifelink
              </label>
            </div>

            <button
              onClick={handleAddCreature}
              disabled={!newCreature.name}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg 
                hover:bg-purple-700 dark:bg-dark-accent dark:hover:bg-dark-highlight 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Creature
            </button>
          </div>
        </div>

        {/* Panel de criaturas activas */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Active Creatures</h3>
          
          {creatures.length === 0 ? (
            <p className="text-center py-8 text-gray-500 dark:text-dark-text/60">
              No creatures added yet
            </p>
          ) : (
            <div className="space-y-4">
              {creatures.map(creature => (
                <div
                  key={creature.id}
                  className={`p-4 rounded-lg ${
                    isCreatureDead(creature)
                      ? 'bg-red-50 dark:bg-red-900/20'
                      : 'bg-gray-50 dark:bg-dark-accent/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        {creature.name}
                        {creature.lifelink && (
                          <Heart className="w-4 h-4 text-red-500" />
                        )}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-dark-text">
                        {creature.power}/{creature.toughness}
                        {creature.shield > 0 && (
                          <span className="ml-2 text-blue-600 dark:text-blue-400">
                            (Shield: {creature.shield})
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveCreature(creature.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Damage: {creature.damage}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDamage(creature.id, 1)}
                          className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200
                            dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => handleHeal(creature.id, 1)}
                          className="px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200
                            dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                        >
                          -1
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Shield</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddShield(creature.id, 1)}
                          className="px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200
                            dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => handleAddShield(creature.id, -1)}
                          className="px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200
                            dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                        >
                          -1
                        </button>
                      </div>
                    </div>
                  </div>

                  {isCreatureDead(creature) && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      This creature has lethal damage
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">How to Use the Damage Tracker</h3>
            
            <div className="space-y-4">
              <section>
                <h4 className="font-medium mb-2">1. Adding Creatures</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-dark-text">
                  <li>Enter the creature's name, power, and toughness</li>
                  <li>Check "Has Lifelink" if the creature has lifelink ability</li>
                  <li>Click "Add Creature" to add it to the tracker</li>
                </ul>
              </section>

              <section>
                <h4 className="font-medium mb-2">2. Tracking Damage</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-dark-text">
                  <li>Use +1/-1 buttons to add or remove damage</li>
                  <li>Creatures with lethal damage will be highlighted in red</li>
                  <li>Damage persists until healed or the creature is removed</li>
                </ul>
              </section>

              <section>
                <h4 className="font-medium mb-2">3. Shield/Prevention</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-dark-text">
                  <li>Use shield buttons to add damage prevention</li>
                  <li>Shields absorb damage before it affects the creature</li>
                  <li>Remaining shield value is shown in blue</li>
                </ul>
              </section>

              <section>
                <h4 className="font-medium mb-2">4. Special Features</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-dark-text">
                  <li>Lifelink creatures are marked with a heart icon</li>
                  <li>Remove creatures using the trash icon</li>
                  <li>Damage and shields can be adjusted at any time</li>
                </ul>
              </section>

              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg 
                  hover:bg-purple-700 dark:bg-dark-accent dark:hover:bg-dark-highlight transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 