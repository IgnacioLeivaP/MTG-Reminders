import React from 'react';
import { Phase } from '../types';
import { ChevronRight } from 'lucide-react';
import { ReminderList } from './ReminderList';

interface PhaseCardProps {
  phase: Phase;
  isActive?: boolean;
  onClick?: () => void;
}

export function PhaseCard({ phase, isActive = false, onClick }: PhaseCardProps) {
  return (
    <div className="space-y-2">
      <div
        onClick={onClick}
        className={`p-4 rounded-lg shadow-md transition-all cursor-pointer
          ${isActive 
            ? 'bg-purple-100 dark:bg-dark-accent border-2 border-purple-500 dark:border-dark-highlight' 
            : 'bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-accent/50'
          }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-highlight">{phase.name}</h3>
          <ChevronRight className="w-5 h-5 text-gray-400 dark:text-dark-text/60" />
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-dark-text">{phase.description}</p>
        <div className="mt-3">
          {phase.steps.map((step, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 mr-2 mb-2 text-xs rounded-full bg-gray-100 dark:bg-dark-accent/30 text-gray-700 dark:text-dark-text"
            >
              {step}
            </span>
          ))}
        </div>
      </div>
      <div className="pl-4">
        <ReminderList phaseId={phase.id} />
      </div>
    </div>
  );
}