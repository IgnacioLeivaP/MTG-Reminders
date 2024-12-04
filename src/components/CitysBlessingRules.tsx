import React from 'react';
import { Book } from 'lucide-react';

export function CitysBlessingRules() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-sky-700">
        <Book className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Rules Reference</h3>
      </div>

      <div className="space-y-6">
        <div className="bg-sky-50 p-4 rounded-lg">
          <h4 className="font-medium text-sky-900 mb-2">From the glossary of the Comprehensive Rules (November 8, 2024)</h4>
          <p className="text-sky-800">
            A designation a player can have. The ascend keyword causes a player to get this designation once they control ten permanents. See rule 702.131, "Ascend."
          </p>
        </div>

        <div className="bg-sky-50 p-4 rounded-lg">
          <h4 className="font-medium text-sky-900 mb-2">Rule 702.131c</h4>
          <p className="text-sky-800">
            The city's blessing is a designation that has no rules meaning other than to act as a marker that other rules and effects can identify. Any number of players may have the city's blessing at the same time.
          </p>
        </div>

        <div className="bg-sky-50 p-4 rounded-lg">
          <h4 className="font-medium text-sky-900 mb-2">Rule 702.131d</h4>
          <p className="text-sky-800">
            After a player gets the city's blessing, continuous effects are reapplied before the game checks to see if the game state or preceding events have matched any trigger conditions.
          </p>
        </div>
      </div>
    </div>
  );
}