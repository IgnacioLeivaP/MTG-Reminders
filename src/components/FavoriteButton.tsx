import React from 'react';
import { Star } from 'lucide-react';
import { useFavoritesStore } from '../store/useFavoritesStore';

interface FavoriteButtonProps {
  toolId: string;
  toolName: string;
  toolIcon: string;
}

export function FavoriteButton({ toolId, toolName, toolIcon }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const isToolFavorite = isFavorite(toolId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el click se propague al contenedor
    if (isToolFavorite) {
      removeFavorite(toolId);
    } else {
      addFavorite({ id: toolId, name: toolName, icon: toolIcon });
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-colors ${
        isToolFavorite 
          ? 'text-yellow-500 hover:text-yellow-600' 
          : 'text-gray-400 hover:text-gray-500'
      }`}
      aria-label={isToolFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={`w-5 h-5 ${isToolFavorite ? 'fill-current' : ''}`}
      />
    </button>
  );
} 