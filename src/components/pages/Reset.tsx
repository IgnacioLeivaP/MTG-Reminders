import React, { useState } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { usePersistentStore } from '../../store/usePersistentStore';
import { Toast } from '../Toast';

export function Reset() {
  const resetAllState = usePersistentStore(state => state.resetAllState);
  const [showToast, setShowToast] = useState(false);

  const handleReset = () => {
    resetAllState();
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <RefreshCw className="w-6 h-6 text-red-600 dark:text-red-400" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">Reset Application</h2>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-highlight">
                Reset All Application Data
              </h3>
              <p className="mt-2 text-gray-600 dark:text-dark-text">
                This action will reset all application data to its default state, including:
              </p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-dark-text">
              <li>Life counters and game modes</li>
              <li>Active emblems and helper cards</li>
              <li>Game phase reminders</li>
              <li>Counter values</li>
            </ul>
            <div className="pt-4">
              <p className="text-red-600 dark:text-red-400 font-medium">
                This action cannot be undone.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 
                dark:hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Reset All Data
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message="Application state has been reset successfully"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}