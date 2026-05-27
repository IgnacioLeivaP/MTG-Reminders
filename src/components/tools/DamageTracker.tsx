import React, { useState } from 'react';
import { Swords, ArrowLeft, Plus, Trash2, Shield, Heart, HelpCircle } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useTranslation } from '../../i18n/useTranslation';

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
  const t = useTranslation();

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
            <ArrowLeft className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          </button>
          <Swords className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.damageTracker.title}</h2>
        </div>
        
        <button
          onClick={() => setShowHelp(true)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
        >
          <HelpCircle className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel de creación de criaturas */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">{t.damageTracker.addCreature}</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.damageTracker.name}</label>
              <input
                type="text"
                value={newCreature.name}
                onChange={(e) => setNewCreature({ ...newCreature, name: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                placeholder={t.damageTracker.creatureName}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t.damageTracker.power}</label>
                <input
                  type="number"
                  value={newCreature.power}
                  onChange={(e) => setNewCreature({ ...newCreature, power: Number(e.target.value) })}
                  className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t.damageTracker.toughness}</label>
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
                {t.damageTracker.hasLifelink}
              </label>
            </div>

            <button
              onClick={handleAddCreature}
              disabled={!newCreature.name}
              className="w-full px-4 py-2 bg-theme-primary text-white rounded-lg
                hover:bg-theme-primary-hover dark:bg-dark-accent dark:hover:bg-dark-highlight
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.damageTracker.addCreature}
            </button>
          </div>
        </div>

        {/* Panel de criaturas activas */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">{t.damageTracker.activeCreatures}</h3>

          {creatures.length === 0 ? (
            <p className="text-center py-8 text-gray-500 dark:text-dark-text/60">
              {t.damageTracker.noCreatures}
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
                        {t.damageTracker.damage}: {creature.damage}
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
                      <span className="text-sm font-medium">{t.damageTracker.shield}</span>
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
                      {t.damageTracker.lethalDamage}
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
            <h3 className="text-xl font-bold mb-4">{t.damageTracker.helpTitle}</h3>

            <div className="space-y-4">
              {t.damageTracker.helpSections.map((section) => (
                <section key={section.title}>
                  <h4 className="font-medium mb-2">{section.title}</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-dark-text">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}

              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-4 px-4 py-2 bg-theme-primary text-white rounded-lg
                  hover:bg-theme-primary-hover dark:bg-dark-accent dark:hover:bg-dark-highlight transition-colors"
              >
                {t.damageTracker.gotIt}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 