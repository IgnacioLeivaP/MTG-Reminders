import React, { useState } from 'react';
import { Copy, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';

interface Token {
  id: string;
  name: string;
  power: number;
  toughness: number;
  color: string;
  abilities: string[];
  quantity: number;
}

const defaultAbilities = [
  'Flying', 'First strike', 'Deathtouch', 'Lifelink', 
  'Vigilance', 'Trample', 'Haste', 'Menace'
];

const colors = [
  { name: 'White', value: 'white' },
  { name: 'Blue', value: 'blue' },
  { name: 'Black', value: 'black' },
  { name: 'Red', value: 'red' },
  { name: 'Green', value: 'green' },
  { name: 'Colorless', value: 'colorless' }
];

export function TokenGenerator() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [newToken, setNewToken] = useState<Token>({
    id: '',
    name: '',
    power: 1,
    toughness: 1,
    color: 'white',
    abilities: [],
    quantity: 1
  });
  const [customAbility, setCustomAbility] = useState('');

  const handleAddToken = () => {
    if (newToken.name) {
      setTokens([...tokens, { ...newToken, id: Date.now().toString() }]);
      setNewToken({
        id: '',
        name: '',
        power: 1,
        toughness: 1,
        color: 'white',
        abilities: [],
        quantity: 1
      });
    }
  };

  const handleRemoveToken = (id: string) => {
    setTokens(tokens.filter(token => token.id !== id));
  };

  const handleQuantityChange = (id: string, change: number) => {
    setTokens(tokens.map(token => 
      token.id === id 
        ? { ...token, quantity: Math.max(1, token.quantity + change) }
        : token
    ));
  };

  const handleAbilityToggle = (ability: string) => {
    if (newToken.abilities.includes(ability)) {
      setNewToken({
        ...newToken,
        abilities: newToken.abilities.filter(a => a !== ability)
      });
    } else {
      setNewToken({
        ...newToken,
        abilities: [...newToken.abilities, ability]
      });
    }
  };

  const handleAddCustomAbility = () => {
    if (customAbility.trim() && !newToken.abilities.includes(customAbility.trim())) {
      setNewToken({
        ...newToken,
        abilities: [...newToken.abilities, customAbility.trim()]
      });
      setCustomAbility(''); // Limpiar el input después de agregar
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setActiveSection('tools')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </button>
        <Copy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">Token Generator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel de creación de tokens */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Create New Token</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newToken.name}
                onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                placeholder="Soldier, Goblin, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Power</label>
                <input
                  type="number"
                  value={newToken.power}
                  onChange={(e) => setNewToken({ ...newToken, power: Number(e.target.value) })}
                  className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Toughness</label>
                <input
                  type="number"
                  value={newToken.toughness}
                  onChange={(e) => setNewToken({ ...newToken, toughness: Number(e.target.value) })}
                  className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <select
                value={newToken.color}
                onChange={(e) => setNewToken({ ...newToken, color: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
              >
                {colors.map(color => (
                  <option key={color.value} value={color.value}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Abilities</label>
              <div className="space-y-4">
                {/* Habilidades predefinidas */}
                <div className="grid grid-cols-2 gap-2">
                  {defaultAbilities.map(ability => (
                    <button
                      key={ability}
                      onClick={() => handleAbilityToggle(ability)}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        newToken.abilities.includes(ability)
                          ? 'bg-purple-600 text-white dark:bg-dark-accent'
                          : 'bg-gray-100 text-gray-700 dark:bg-dark-accent/50 dark:text-dark-text'
                      }`}
                    >
                      {ability}
                    </button>
                  ))}
                </div>

                {/* Campo de habilidad personalizada */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customAbility}
                    onChange={(e) => setCustomAbility(e.target.value)}
                    placeholder="Enter custom ability..."
                    className="flex-1 p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCustomAbility();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddCustomAbility}
                    disabled={!customAbility.trim()}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg 
                      hover:bg-purple-700 dark:bg-dark-accent dark:hover:bg-dark-highlight 
                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>

                {/* Lista de habilidades seleccionadas */}
                {newToken.abilities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newToken.abilities.map(ability => (
                      <span
                        key={ability}
                        className="px-2 py-1 bg-purple-100 dark:bg-dark-accent/50 
                          text-purple-600 dark:text-purple-400 rounded-lg text-sm 
                          flex items-center gap-1"
                      >
                        {ability}
                        <button
                          onClick={() => handleAbilityToggle(ability)}
                          className="hover:text-purple-800 dark:hover:text-purple-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleAddToken}
              disabled={!newToken.name}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg 
                hover:bg-purple-700 dark:bg-dark-accent dark:hover:bg-dark-highlight 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Token
            </button>
          </div>
        </div>

        {/* Panel de tokens activos */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Active Tokens</h3>
          
          {tokens.length === 0 ? (
            <p className="text-center py-8 text-gray-500 dark:text-dark-text/60">
              No tokens created yet
            </p>
          ) : (
            <div className="space-y-4">
              {tokens.map(token => (
                <div
                  key={token.id}
                  className="p-4 bg-gray-50 dark:bg-dark-accent/20 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{token.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-dark-text">
                        {token.power}/{token.toughness} {token.color}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveToken(token.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {token.abilities.length > 0 && (
                    <div className="mb-2">
                      <p className="text-sm text-gray-600 dark:text-dark-text">
                        {token.abilities.join(', ')}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(token.id, -1)}
                      className="p-1 rounded-lg bg-gray-200 dark:bg-dark-accent"
                    >
                      -
                    </button>
                    <span className="font-medium">{token.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(token.id, 1)}
                      className="p-1 rounded-lg bg-gray-200 dark:bg-dark-accent"
                    >
                      +
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