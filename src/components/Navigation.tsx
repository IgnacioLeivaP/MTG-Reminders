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
    return Icon ? <Icon className="w-6 h-6 md:w-5 md:h-5" /> : null;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white dark:bg-dark-card shadow-md rounded-lg p-2 transition-colors">
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

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-card shadow-lg border-t border-gray-200 dark:border-dark-accent z-50">
        <ul className="flex justify-around px-2 py-2">
          {navigationItems.map((item) => (
            <li key={item.id} className="flex-1">
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex flex-col items-center justify-center py-1 px-2 space-y-1
                  ${activeSection === item.id
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-dark-text'
                  }`}
              >
                {renderIcon(item.icon)}
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}