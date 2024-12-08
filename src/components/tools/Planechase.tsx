import React, { useState, useEffect } from 'react';
import { Globe, ArrowLeft, Dice6, RotateCcw, ArrowRight, History, BookOpen, AlertCircle } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { planes } from '../../data/planes';

interface PlanarDieResult {
  type: 'blank' | 'chaos' | 'planeswalk';
  description: string;
}

interface Plane {
  id: string;
  name: string;
  type: 'universe' | 'special' | 'doctorwho';
  location: string;
  effect: string;
  chaosEffect: string;
  imageUrl?: string;
}

interface PlaneFilter {
  universe: boolean;
  special: boolean;
  doctorwho: boolean;
}

const planarDieResults: PlanarDieResult[] = [
  { type: 'blank', description: 'Nothing happens' },
  { type: 'blank', description: 'Nothing happens' },
  { type: 'blank', description: 'Nothing happens' },
  { type: 'blank', description: 'Nothing happens' },
  { type: 'chaos', description: 'Trigger the chaos ability' },
  { type: 'planeswalk', description: 'Move to the next plane' }
];

export function Planechase() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [currentPlane, setCurrentPlane] = useState<Plane>(planes[0]);
  const [previousPlanes, setPreviousPlanes] = useState<Plane[]>([]);
  const [dieResult, setDieResult] = useState<PlanarDieResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [activeFilters, setActiveFilters] = useState<PlaneFilter>({
    universe: false,
    special: false,
    doctorwho: false
  });
  const [availablePlanes, setAvailablePlanes] = useState<Plane[]>([]);
  const [showDebugList, setShowDebugList] = useState(false);

  const rollPlanarDie = () => {
    const result = planarDieResults[Math.floor(Math.random() * planarDieResults.length)];
    setDieResult(result);

    if (result.type === 'planeswalk') {
      planeswalk();
    }
  };

  const planeswalk = () => {
    setPreviousPlanes(prev => [currentPlane, ...prev]);
    const remainingPlanes = planes.filter(
      plane => plane.id !== currentPlane.id && !previousPlanes.find(p => p.id === plane.id)
    );
    if (remainingPlanes.length > 0) {
      const nextPlane = remainingPlanes[Math.floor(Math.random() * remainingPlanes.length)];
      setCurrentPlane(nextPlane);
    }
  };

  const resetGame = () => {
    setCurrentPlane(planes[0]);
    setPreviousPlanes([]);
    setDieResult(null);
  };

  const toggleFilter = (filter: keyof PlaneFilter) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  useEffect(() => {
    const filteredPlanes = planes.filter(plane => {
      if (!activeFilters.universe && !activeFilters.special && !activeFilters.doctorwho) {
        return false;
      }
      return (
        (activeFilters.universe && plane.type === 'universe') ||
        (activeFilters.special && plane.type === 'special') ||
        (activeFilters.doctorwho && plane.type === 'doctorwho')
      );
    });
    setAvailablePlanes(filteredPlanes);
  }, [activeFilters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveSection('tools')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </button>
          <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">Planechase</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <History className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </button>
          <button
            onClick={resetGame}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => toggleFilter('universe')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeFilters.universe 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 dark:bg-dark-accent dark:text-dark-text'
          }`}
        >
          In Universe Planes
        </button>
        <button
          onClick={() => toggleFilter('special')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeFilters.special 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 dark:bg-dark-accent dark:text-dark-text'
          }`}
        >
          Special
        </button>
        <button
          onClick={() => toggleFilter('doctorwho')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeFilters.doctorwho 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 dark:bg-dark-accent dark:text-dark-text'
          }`}
        >
          Doctor Who
        </button>
      </div>

      {(activeFilters.universe === false && 
        activeFilters.special === false && 
        activeFilters.doctorwho === false) ? (
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-green-50 to-green-100 
          dark:from-dark-card dark:to-dark-accent border border-green-200 dark:border-green-900/30 rounded-lg">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <AlertCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-dark-highlight">
              Choose a card pool
            </h3>
            <p className="text-xs text-gray-600 dark:text-dark-text">
              Select at least one set of planes to begin
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-4">
        <button
          onClick={() => setShowDebugList(!showDebugList)}
          className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 
            dark:hover:text-purple-300 underline"
        >
          {showDebugList ? 'Hide' : 'Show'} Loaded Planes
        </button>
      </div>

      {showDebugList && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-dark-accent/30 rounded-lg">
          <h3 className="font-bold mb-2">Available Planes ({availablePlanes.length})</h3>
          <div className="space-y-2">
            {availablePlanes.map(plane => (
              <div key={plane.id} className="p-2 bg-white dark:bg-dark-card rounded">
                <p className="font-medium">{plane.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Location: {plane.location}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Type: {plane.type}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Effect: {plane.effect}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Chaos: {plane.chaosEffect}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-base p-6">
          <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">
            Current Plane: {currentPlane.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-dark-text mb-4">
            Location: {currentPlane.location}
          </p>
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Effect</h4>
              <p className="text-gray-600 dark:text-dark-text">{currentPlane.effect}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Chaos Effect</h4>
              <p className="text-gray-600 dark:text-dark-text">{currentPlane.chaosEffect}</p>
            </div>
          </div>
        </div>

        <div className="card-base p-6">
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={rollPlanarDie}
              className="w-full p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                transition-colors flex items-center justify-center space-x-2"
            >
              <Dice6 className="w-5 h-5" />
              <span>Roll Planar Die</span>
            </button>

            {dieResult && (
              <div className="w-full p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-center">
                <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                  Roll Result: {dieResult.type}
                </h4>
                <p className="text-gray-600 dark:text-dark-text">{dieResult.description}</p>
              </div>
            )}

            <button
              onClick={planeswalk}
              className="w-full p-4 bg-purple-100 hover:bg-purple-200 text-purple-700 
                dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50 
                rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Planeswalk</span>
            </button>
          </div>
        </div>
      </div>

      {showHistory && previousPlanes.length > 0 && (
        <div className="card-base p-6">
          <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">
            Previous Planes
          </h3>
          <div className="space-y-4">
            {previousPlanes.map((plane, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-dark-accent rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-dark-highlight mb-2">
                  {plane.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-dark-text mb-1">
                  Location: {plane.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-dark-text">{plane.effect}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 