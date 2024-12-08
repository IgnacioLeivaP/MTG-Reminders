import React, { useState } from 'react';
import { Badge, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { emblems } from '../../data/emblems';
import { useEmblemsStore } from '../../store/useEmblemsStore';
import { FavoriteButton } from '../../components/FavoriteButton';

export function Emblems() {
  const [searchTerm, setSearchTerm] = useState('');
  const { activeEmblems, toggleEmblem } = useEmblemsStore();

  const filteredEmblems = emblems.filter(emblem =>
    emblem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emblem.planeswalker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emblem.effect.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmblems = [...filteredEmblems].sort((a, b) => {
    const aActive = activeEmblems.includes(a.id);
    const bActive = activeEmblems.includes(b.id);
    
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;
    
    return emblems.findIndex(e => e.id === a.id) - emblems.findIndex(e => e.id === b.id);
  });

  const renderIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Badge className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">Emblems</h2>
        </div>
        <FavoriteButton 
          toolId="emblems"
          toolName="Emblems"
          toolIcon="Badge"
        />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-text/60 w-5 h-5" />
        <input
          type="text"
          placeholder="Search emblems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 dark:border-dark-accent dark:bg-dark-card dark:text-dark-text
            focus:border-purple-500 dark:focus:border-dark-accent focus:ring-purple-500 dark:focus:ring-dark-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEmblems.map(emblem => {
          const isActive = activeEmblems.includes(emblem.id);
          return (
            <div
              key={emblem.id}
              onClick={() => toggleEmblem(emblem.id)}
              className={`
                rounded-lg shadow-md overflow-hidden hover:shadow-lg 
                transition-all cursor-pointer transform hover:scale-[1.02]
                ${isActive 
                  ? 'bg-purple-100 dark:bg-dark-accent border-2 border-purple-500 dark:border-dark-highlight' 
                  : 'bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-accent/50'
                }
              `}
            >
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? 'bg-purple-200 dark:bg-dark-accent/80' 
                      : 'bg-purple-100 dark:bg-dark-accent/50'
                  }`}>
                    {renderIcon(emblem.icon)}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      isActive 
                        ? 'text-purple-900 dark:text-dark-highlight' 
                        : 'text-gray-900 dark:text-dark-text'
                    }`}>
                      {emblem.name}
                    </h3>
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      {emblem.planeswalker}
                    </span>
                  </div>
                </div>
                
                <p className={`${
                  isActive 
                    ? 'text-purple-800 dark:text-dark-highlight' 
                    : 'text-gray-600 dark:text-dark-text'
                }`}>
                  {emblem.effect}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEmblems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-dark-text/60">
            No emblems found matching your search criteria
          </p>
        </div>
      )}
    </div>
  );
}