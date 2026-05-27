import React, { useState } from 'react';
import { ArrowDownAZ, ArrowLeft } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { FavoriteButton } from '../../components/FavoriteButton';
import { useTranslation } from '../../i18n/useTranslation';

interface CascadeCard {
  id: string;
  name: string;
  manaCost: number;
  cascadeTarget?: CascadeCard;
}

export function CascadeHelper() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [cascadeStack, setCascadeStack] = useState<CascadeCard[]>([]);
  const [newCardName, setNewCardName] = useState('');
  const [newCardCost, setNewCardCost] = useState('');
  const t = useTranslation();

  const addCascadeCard = () => {
    if (newCardName && newCardCost) {
      const newCard: CascadeCard = {
        id: Date.now().toString(),
        name: newCardName,
        manaCost: parseInt(newCardCost)
      };
      setCascadeStack([...cascadeStack, newCard]);
      setNewCardName('');
      setNewCardCost('');
    }
  };

  const removeCascadeCard = (id: string) => {
    setCascadeStack(cascadeStack.filter(card => card.id !== id));
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
          <ArrowDownAZ className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.cascadeHelper.title}</h2>
        </div>
        <FavoriteButton 
          toolId="cascade-helper"
          toolName="Cascade Helper"
          toolIcon="ArrowDownAZ"
        />
      </div>

      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder={t.cascadeHelper.cardName}
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            className="flex-1 p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
          />
          <input
            type="number"
            placeholder={t.cascadeHelper.manaCost}
            value={newCardCost}
            onChange={(e) => setNewCardCost(e.target.value)}
            className="w-24 p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
          />
          <button
            onClick={addCascadeCard}
            className="px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary-hover
              dark:bg-dark-accent dark:hover:bg-dark-highlight transition-colors"
          >
            {t.cascadeHelper.addCard}
          </button>
        </div>

        <div className="space-y-4">
          {cascadeStack.map((card, index) => (
            <div 
              key={card.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-accent/50 rounded-lg"
            >
              <div>
                <span className="font-medium">{card.name}</span>
                <span className="ml-2 text-gray-600 dark:text-dark-text">
                  (MV: {card.manaCost})
                </span>
              </div>
              <button
                onClick={() => removeCascadeCard(card.id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                {t.cascadeHelper.remove}
              </button>
            </div>
          ))}
        </div>

        {cascadeStack.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-dark-text/60">
            {t.cascadeHelper.empty}
          </div>
        )}
      </div>
    </div>
  );
} 