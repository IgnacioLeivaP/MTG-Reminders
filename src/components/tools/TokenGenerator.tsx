import React, { useState } from 'react';
import { Copy, ArrowLeft, Plus, Minus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useTokenStore } from '../../store/useTokenStore';
import { FavoriteButton } from '../../components/FavoriteButton';
import { useTranslation } from '../../i18n/useTranslation';

interface Token {
  id: string;
  name: string;
  power: number;
  toughness: number;
  color: string;
  abilities: string[];
  quantity: number;
}

interface PresetToken {
  name: string;
  power: number;
  toughness: number;
  color: string;
  abilities: string[];
  label: string; // short chip label e.g. "Soldier 1/1"
}

// Common MTG tokens as quick-fill presets
const PRESET_TOKENS: PresetToken[] = [
  { name: 'Soldier', power: 1, toughness: 1, color: 'white', abilities: [], label: 'Soldier 1/1' },
  { name: 'Human', power: 1, toughness: 1, color: 'white', abilities: [], label: 'Human 1/1' },
  { name: 'Cat', power: 2, toughness: 2, color: 'white', abilities: [], label: 'Cat 2/2' },
  { name: 'Bird', power: 1, toughness: 1, color: 'white', abilities: ['Flying'], label: 'Bird 1/1 Flying' },
  { name: 'Angel', power: 4, toughness: 4, color: 'white', abilities: ['Flying', 'Vigilance'], label: 'Angel 4/4' },
  { name: 'Thopter', power: 1, toughness: 1, color: 'blue', abilities: ['Flying'], label: 'Thopter 1/1' },
  { name: 'Zombie', power: 2, toughness: 2, color: 'black', abilities: [], label: 'Zombie 2/2' },
  { name: 'Vampire', power: 2, toughness: 2, color: 'black', abilities: ['Lifelink'], label: 'Vampire 2/2' },
  { name: 'Goblin', power: 1, toughness: 1, color: 'red', abilities: [], label: 'Goblin 1/1' },
  { name: 'Dragon', power: 5, toughness: 5, color: 'red', abilities: ['Flying'], label: 'Dragon 5/5' },
  { name: 'Saproling', power: 1, toughness: 1, color: 'green', abilities: [], label: 'Saproling 1/1' },
  { name: 'Wolf', power: 2, toughness: 2, color: 'green', abilities: [], label: 'Wolf 2/2' },
  { name: 'Snake', power: 1, toughness: 1, color: 'green', abilities: ['Deathtouch'], label: 'Snake 1/1' },
  { name: 'Beast', power: 3, toughness: 3, color: 'green', abilities: [], label: 'Beast 3/3' },
  { name: 'Treasure', power: 0, toughness: 0, color: 'colorless', abilities: ['Tap, Sacrifice: Add one mana of any color'], label: 'Treasure' },
  { name: 'Food', power: 0, toughness: 0, color: 'colorless', abilities: ['2, Tap, Sacrifice: Gain 3 life'], label: 'Food' },
  { name: 'Clue', power: 0, toughness: 0, color: 'colorless', abilities: ['2, Sacrifice: Draw a card'], label: 'Clue' },
  { name: 'Gold', power: 0, toughness: 0, color: 'colorless', abilities: ['Sacrifice: Add one mana of each color'], label: 'Gold' },
];

const EMPTY_TOKEN: Omit<Token, 'id'> = {
  name: '',
  power: 1,
  toughness: 1,
  color: 'white',
  abilities: [],
  quantity: 1,
};

export function TokenGenerator() {
  const setActiveSection = useNavigationStore((state) => state.setActiveSection);
  const { tokens, addToken, removeToken, updateTokenQuantity } = useTokenStore();
  const t = useTranslation();

  const [newToken, setNewToken] = useState<Omit<Token, 'id'>>(EMPTY_TOKEN);
  const [customAbility, setCustomAbility] = useState('');
  const [showPresets, setShowPresets] = useState(true);

  const handleAddToken = () => {
    if (!newToken.name) return;
    addToken({ ...newToken, id: Date.now().toString() });
    setNewToken(EMPTY_TOKEN);
  };

  const handleAbilityToggle = (ability: string) => {
    setNewToken((prev) => ({
      ...prev,
      abilities: prev.abilities.includes(ability)
        ? prev.abilities.filter((a) => a !== ability)
        : [...prev.abilities, ability],
    }));
  };

  const handleAddCustomAbility = () => {
    const trimmed = customAbility.trim();
    if (trimmed && !newToken.abilities.includes(trimmed)) {
      setNewToken((prev) => ({ ...prev, abilities: [...prev.abilities, trimmed] }));
      setCustomAbility('');
    }
  };

  const applyPreset = (preset: PresetToken) => {
    setNewToken({
      name: preset.name,
      power: preset.power,
      toughness: preset.toughness,
      color: preset.color,
      abilities: [...preset.abilities],
      quantity: 1,
    });
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
          <Copy className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.tokenGenerator.title}</h2>
        </div>
        <FavoriteButton toolId="token-generator" toolName="Token Generator" toolIcon="Copy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create token panel */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 space-y-4">
          <h3 className="text-lg font-semibold dark:text-dark-highlight">{t.tokenGenerator.createToken}</h3>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-dark-text">{t.tokenGenerator.name}</label>
            <input
              type="text"
              value={newToken.name}
              onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent dark:text-dark-text"
              placeholder={t.tokenGenerator.tokenName}
            />
          </div>

          {/* Power / Toughness */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-dark-text">{t.tokenGenerator.power}</label>
              <input
                type="number"
                value={newToken.power}
                onChange={(e) => setNewToken({ ...newToken, power: Number(e.target.value) })}
                className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent dark:text-dark-text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-dark-text">{t.tokenGenerator.toughness}</label>
              <input
                type="number"
                value={newToken.toughness}
                onChange={(e) => setNewToken({ ...newToken, toughness: Number(e.target.value) })}
                className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent dark:text-dark-text"
              />
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-dark-text">{t.tokenGenerator.color}</label>
            <select
              value={newToken.color}
              onChange={(e) => setNewToken({ ...newToken, color: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent dark:text-dark-text"
            >
              {t.tokenGenerator.colorsList.map((color) => (
                <option key={color.value} value={color.value}>{color.name}</option>
              ))}
            </select>
          </div>

          {/* Abilities */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-dark-text">{t.tokenGenerator.abilities}</label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {t.tokenGenerator.abilitiesList.map((ability) => (
                  <button
                    key={ability}
                    onClick={() => handleAbilityToggle(ability)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      newToken.abilities.includes(ability)
                        ? 'bg-theme-primary text-white'
                        : 'bg-gray-100 text-gray-700 dark:bg-dark-accent/50 dark:text-dark-text'
                    }`}
                  >
                    {ability}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customAbility}
                  onChange={(e) => setCustomAbility(e.target.value)}
                  placeholder={t.tokenGenerator.customAbility}
                  className="flex-1 p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent dark:text-dark-text"
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddCustomAbility(); }}
                />
                <button
                  onClick={handleAddCustomAbility}
                  disabled={!customAbility.trim()}
                  className="px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.tokenGenerator.addAbility}
                </button>
              </div>

              {newToken.abilities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newToken.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="px-2 py-1 bg-theme-surface dark:bg-dark-accent/50 text-theme-primary dark:text-dark-accent rounded-lg text-sm flex items-center gap-1"
                    >
                      {ability}
                      <button onClick={() => handleAbilityToggle(ability)} className="hover:text-theme-primary-hover dark:hover:text-dark-accent/70">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Create button */}
          <button
            onClick={handleAddToken}
            disabled={!newToken.name}
            className="w-full px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.tokenGenerator.createTokenBtn}
          </button>

          {/* Preset tokens section — quick-fill the form */}
          <div className="border-t border-gray-100 dark:border-dark-accent/30 pt-4">
            <button
              onClick={() => setShowPresets((v) => !v)}
              className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 dark:text-dark-highlight mb-3"
            >
              <span>{t.tokenGenerator.commonTokens}</span>
              {showPresets ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showPresets && (
              <div className="flex flex-wrap gap-2">
                {PRESET_TOKENS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset)}
                    title={t.tokenGenerator.clickToFill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                      bg-gray-50 dark:bg-dark-accent/30 border-gray-200 dark:border-dark-accent/50
                      text-gray-700 dark:text-dark-text
                      hover:bg-theme-surface/50 dark:hover:bg-dark-accent/20 hover:border-theme-surface-hover dark:hover:border-dark-accent/50 hover:text-theme-primary-hover dark:hover:text-dark-accent/70"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active tokens panel */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4 dark:text-dark-highlight">{t.tokenGenerator.activeTokens}</h3>

          {tokens.length === 0 ? (
            <p className="text-center py-8 text-gray-500 dark:text-dark-text/60">{t.tokenGenerator.noTokens}</p>
          ) : (
            <div className="space-y-4">
              {tokens.map((token) => (
                <div key={token.id} className="p-4 bg-gray-50 dark:bg-dark-accent/20 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium dark:text-dark-highlight">{token.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-dark-text">
                        {token.power}/{token.toughness} · {token.color}
                      </p>
                    </div>
                    <button
                      onClick={() => removeToken(token.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {token.abilities.length > 0 && (
                    <p className="text-sm text-gray-600 dark:text-dark-text mb-2">{token.abilities.join(', ')}</p>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateTokenQuantity(token.id, -1)}
                      className="p-1.5 rounded-lg bg-gray-200 dark:bg-dark-accent hover:bg-gray-300 dark:hover:bg-dark-accent/70 text-gray-700 dark:text-dark-text transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold text-gray-900 dark:text-dark-highlight min-w-[1.5rem] text-center">
                      {token.quantity}
                    </span>
                    <button
                      onClick={() => updateTokenQuantity(token.id, 1)}
                      className="p-1.5 rounded-lg bg-gray-200 dark:bg-dark-accent hover:bg-gray-300 dark:hover:bg-dark-accent/70 text-gray-700 dark:text-dark-text transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
