import React, { useState } from 'react';
import { Star, Trash2, AlertTriangle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useNavigationStore } from '../../store/useNavigationStore';

export function Favorites() {
  const favorites = useFavoritesStore(state => state.favorites);
  const clearFavorites = useFavoritesStore(state => state.clearFavorites);
  const { setActiveSection, setSelectedHelperId } = useNavigationStore();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const renderIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon ? <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" /> : null;
  };

  const handleToolClick = (tool: { id: string, name: string, icon: string }) => {
    if (tool.id.startsWith('helper-')) {
      const helperId = tool.id.replace('helper-', '');
      setSelectedHelperId(helperId);
      setActiveSection('helper-cards');
    } else {
      setActiveSection(tool.id);
    }
  };

  const handleClearFavorites = () => {
    setShowConfirmDialog(true);
  };

  const confirmClearFavorites = () => {
    clearFavorites();
    setShowConfirmDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Star className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold dark:text-gray-100">Favorite Tools</h2>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={handleClearFavorites}
            className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 
              dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 
              transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
          <p className="text-gray-600 dark:text-gray-300">
            No favorite tools yet. Add some tools to your favorites by clicking the star icon in any tool!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map(tool => (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg 
                transition-all flex items-center space-x-4 text-left w-full hover:bg-gray-50 
                dark:hover:bg-dark-accent/50"
            >
              <div className="p-2 bg-purple-100 dark:bg-dark-accent/50 rounded-lg">
                {renderIcon(tool.icon)}
              </div>
              <span className="font-medium dark:text-gray-100">{tool.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Diálogo de confirmación */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center space-x-3 text-red-500 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Clear All Favorites</h3>
            </div>
            <p className="text-gray-600 dark:text-dark-text mb-6">
              Are you sure you want to remove all favorites? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-gray-600 dark:text-dark-text hover:bg-gray-100 
                  dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearFavorites}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 
                  rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 