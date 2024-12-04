import React from 'react';
import * as LucideIcons from 'lucide-react';
import { navigationItems } from '../data/navigation';

interface NavigationProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const renderIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  return (
    <nav className="bg-white dark:bg-dark-card shadow-md rounded-lg p-2 transition-colors">
      <ul className="flex flex-col space-y-1">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${activeSection === item.id
                  ? 'bg-purple-100 dark:bg-dark-accent text-purple-700 dark:text-dark-highlight'
                  : 'text-gray-600 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-accent/50'
                }`}
            >
              {renderIcon(item.icon)}
              <span className="font-medium">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}