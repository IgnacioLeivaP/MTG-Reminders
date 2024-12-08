import React, { useState } from 'react';
import { phases } from '../data/phases';
import { useRemindersStore } from '../store/useRemindersStore';
import { PlusCircle } from 'lucide-react';

export function ReminderForm() {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState(phases[0].id);
  const addReminder = useRemindersStore(state => state.addReminder);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addReminder(text.trim(), phase);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-md transition-colors">
      <div className="space-y-4">
        <div>
          <label htmlFor="reminder" className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Reminder Text
          </label>
          <input
            type="text"
            id="reminder"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-accent dark:bg-dark-bg dark:text-dark-text
              shadow-sm focus:border-purple-500 dark:focus:border-dark-accent focus:ring-purple-500 dark:focus:ring-dark-accent
              px-3 py-2"
            placeholder="Enter your reminder..."
          />
        </div>
        
        <div>
          <label htmlFor="phase" className="block text-sm font-medium text-gray-700 dark:text-dark-text">
            Phase
          </label>
          <select
            id="phase"
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-accent dark:bg-dark-bg dark:text-dark-text
              shadow-sm focus:border-purple-500 dark:focus:border-dark-accent focus:ring-purple-500 dark:focus:ring-dark-accent
              px-3 py-2"
          >
            {phases.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm 
            text-sm font-medium text-white bg-purple-600 dark:bg-dark-accent hover:bg-purple-700 dark:hover:bg-dark-highlight 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-dark-accent
            transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Reminder
        </button>
      </div>
    </form>
  );
}