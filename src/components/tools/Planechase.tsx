import React, { useState, useEffect, useRef } from 'react';
import { Globe, ArrowLeft, RotateCcw, ArrowRight, History, X } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { planes, Plane } from '../../data/planes';
import { FavoriteButton } from '../../components/FavoriteButton';
import { useTranslation } from '../../i18n/useTranslation';

type DieResult = 'blank' | 'chaos' | 'planeswalk';

interface RollState {
  phase: 'rolling' | 'result';
  face: DieResult;
}

// Visual symbols shown on the die face
const FACE_SYMBOLS: Record<DieResult, string> = {
  blank: '○',
  chaos: '⚡',
  planeswalk: '✦',
};

// The real planar die: 4 blanks, 1 chaos, 1 planeswalk
const DIE_FACES: DieResult[] = ['blank', 'blank', 'blank', 'blank', 'chaos', 'planeswalk'];

type PlaneFilter = { universe: boolean; special: boolean; doctorwho: boolean };

export function Planechase() {
  const setActiveSection = useNavigationStore((state) => state.setActiveSection);
  const t = useTranslation();

  const [currentPlane, setCurrentPlane] = useState<Plane>(planes[0]);
  const [previousPlanes, setPreviousPlanes] = useState<Plane[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeFilters, setActiveFilters] = useState<PlaneFilter>({ universe: false, special: false, doctorwho: false });
  const [availablePlanes, setAvailablePlanes] = useState<Plane[]>([]);
  const [showPlaneList, setShowPlaneList] = useState(false);
  const [rollState, setRollState] = useState<RollState | null>(null);
  const [planewalkFlash, setPlanewalkFlash] = useState(false); // brief flash when plane changes

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Rebuild available plane pool whenever filters change
  useEffect(() => {
    const anyActive = activeFilters.universe || activeFilters.special || activeFilters.doctorwho;
    if (!anyActive) {
      setAvailablePlanes([]);
      return;
    }
    setAvailablePlanes(
      planes.filter(
        (p) =>
          (activeFilters.universe && p.type === 'universe') ||
          (activeFilters.special && p.type === 'special') ||
          (activeFilters.doctorwho && p.type === 'doctorwho')
      )
    );
  }, [activeFilters]);

  // Active pool: use filtered list when filters are on, otherwise all planes
  const planesPool = availablePlanes.length > 0 ? availablePlanes : planes;

  const pickNextPlane = (exclude: Plane, visited: Plane[]): Plane => {
    const remaining = planesPool.filter(
      (p) => p.id !== exclude.id && !visited.some((v) => v.id === p.id)
    );
    // If all visited, reset and pick any except current
    const candidates = remaining.length > 0 ? remaining : planesPool.filter((p) => p.id !== exclude.id);
    return candidates[Math.floor(Math.random() * candidates.length)] ?? exclude;
  };

  const doPlaneswalk = () => {
    setCurrentPlane((prev) => {
      const next = pickNextPlane(prev, previousPlanes);
      setPreviousPlanes((pp) => [prev, ...pp]);
      return next;
    });
    // Brief visual flash to signal the plane changed
    setPlanewalkFlash(true);
    setTimeout(() => setPlanewalkFlash(false), 600);
  };

  const rollPlanarDie = () => {
    if (rollState?.phase === 'rolling') return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const CYCLES = 10;
    const INTERVAL_MS = 75;
    let count = 0;
    const randomFace = (): DieResult => DIE_FACES[Math.floor(Math.random() * DIE_FACES.length)];

    setRollState({ phase: 'rolling', face: randomFace() });

    intervalRef.current = setInterval(() => {
      count++;
      if (count < CYCLES) {
        setRollState({ phase: 'rolling', face: randomFace() });
      } else {
        clearInterval(intervalRef.current!);
        const finalFace: DieResult = DIE_FACES[Math.floor(Math.random() * DIE_FACES.length)];
        setRollState({ phase: 'result', face: finalFace });

        if (finalFace === 'planeswalk') {
          doPlaneswalk();
        }

        // Auto-clear result after a few seconds
        timeoutRef.current = setTimeout(() => setRollState(null), 3000);
      }
    }, INTERVAL_MS);
  };

  const resetGame = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setRollState(null);
    const start = planesPool[Math.floor(Math.random() * planesPool.length)] ?? planes[0];
    setCurrentPlane(start);
    setPreviousPlanes([]);
  };

  const toggleFilter = (filter: keyof PlaneFilter) =>
    setActiveFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));

  const noFiltersSelected = !activeFilters.universe && !activeFilters.special && !activeFilters.doctorwho;

  // Die button visual classes
  const getDieClasses = (): string => {
    const base = 'w-full flex flex-col items-center justify-center gap-2 py-6 rounded-xl border-2 font-bold transition-all duration-150 text-center';
    if (!rollState) {
      return `${base} bg-theme-primary hover:bg-theme-primary-hover text-white border-theme-primary hover:scale-105 cursor-pointer shadow-lg`;
    }
    if (rollState.phase === 'rolling') {
      return `${base} bg-theme-surface dark:bg-dark-accent/20 border-theme-primary/70 text-theme-primary dark:text-dark-accent/70 scale-95 cursor-wait`;
    }
    // Result phase
    if (rollState.face === 'chaos') {
      return `${base} bg-red-100 dark:bg-red-900/40 border-red-500 text-red-600 dark:text-red-300 shadow-red-400/60 shadow-lg scale-105 animate-pulse`;
    }
    if (rollState.face === 'planeswalk') {
      return `${base} bg-theme-surface dark:bg-dark-accent/20 border-theme-primary text-theme-primary-hover dark:text-dark-accent/70 shadow-theme-primary/60/60 shadow-lg scale-105`;
    }
    // blank
    return `${base} bg-gray-100 dark:bg-gray-800/40 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400`;
  };

  const getDieSymbolSize = (): string => {
    if (!rollState) return 'text-4xl';
    if (rollState.phase === 'rolling') return 'text-3xl opacity-70';
    if (rollState.face === 'chaos' || rollState.face === 'planeswalk') return 'text-5xl';
    return 'text-4xl';
  };

  const getDieLabel = (): string => {
    if (!rollState) return t.planechase.rollPlanarDie;
    if (rollState.phase === 'rolling') return t.planechase.rolling;
    if (rollState.face === 'chaos') return t.planechase.chaosResult;
    if (rollState.face === 'planeswalk') return t.planechase.planeswalkResult;
    return t.planechase.blankResult;
  };

  const getDieDescription = (): string | null => {
    if (!rollState || rollState.phase === 'rolling') return null;
    if (rollState.face === 'chaos') return t.planechase.dieResults.chaos;
    if (rollState.face === 'planeswalk') return t.planechase.dieResults.planeswalk;
    return t.planechase.dieResults.blank;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveSection('tools')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          </button>
          <Globe className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.planechase.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <FavoriteButton toolId="planechase" toolName="Planechase" toolIcon="Globe" />
          <button
            onClick={() => setShowHistory((v) => !v)}
            title={t.planechase.previousPlanes}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <History className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          </button>
          <button
            onClick={resetGame}
            title="Reset"
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          </button>
        </div>
      </div>

      {/* Plane type filters */}
      <div className="flex flex-wrap gap-3">
        {([['universe', t.planechase.inUniversePlanes], ['special', t.planechase.special], ['doctorwho', 'Doctor Who']] as const).map(
          ([key, label]) => (
            <button
              key={key}
              onClick={() => toggleFilter(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilters[key]
                  ? 'bg-theme-primary text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-dark-accent dark:text-dark-text hover:bg-gray-300 dark:hover:bg-dark-accent/70'
              }`}
            >
              {label}
            </button>
          )
        )}
      </div>

      {/* Warning when no filter selected */}
      {noFiltersSelected && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-lg">
          <span className="text-amber-600 dark:text-amber-400 text-lg">⚠</span>
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">{t.planechase.choosePool}</p>
            <p className="text-xs text-amber-700 dark:text-amber-400">{t.planechase.selectAtLeast}</p>
          </div>
        </div>
      )}

      {/* Main game area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current plane card */}
        <div className={`bg-white dark:bg-dark-card rounded-xl shadow-md p-6 transition-all duration-500 ${
          planewalkFlash ? 'ring-4 ring-theme-primary/70 dark:ring-dark-accent scale-[1.01]' : ''
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-dark-text/60">
              {t.planechase.location} {currentPlane.location}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-theme-surface dark:bg-dark-accent/20 text-theme-primary dark:text-dark-accent/70 font-medium">
              {currentPlane.type === 'doctorwho' ? 'Doctor Who' : currentPlane.type === 'special' ? 'Special' : 'Universe'}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-dark-highlight mb-4">{currentPlane.name}</h3>

          <div className="space-y-3">
            <div className="bg-theme-surface/50 dark:bg-dark-accent/20 p-3 rounded-lg">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-theme-primary dark:text-dark-accent/70 mb-1">
                {t.planechase.effect}
              </h4>
              <p className="text-sm text-gray-700 dark:text-dark-text leading-relaxed">{currentPlane.effect}</p>
            </div>

            <div className={`p-3 rounded-lg border-2 ${
              rollState?.phase === 'result' && rollState.face === 'chaos'
                ? 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600'
                : 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800/30'
            }`}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-1 flex items-center gap-1">
                <span>⚡</span> {t.planechase.chaosEffect}
              </h4>
              <p className="text-sm text-gray-700 dark:text-dark-text leading-relaxed">{currentPlane.chaosEffect}</p>
            </div>
          </div>
        </div>

        {/* Die + actions */}
        <div className="flex flex-col gap-4">
          {/* Die button */}
          <button
            onClick={rollPlanarDie}
            disabled={rollState?.phase === 'rolling' || noFiltersSelected}
            className={getDieClasses()}
          >
            <span className={`${getDieSymbolSize()} transition-all`}>
              {rollState ? FACE_SYMBOLS[rollState.face] : '⬡'}
            </span>
            <span className="text-base font-bold">{getDieLabel()}</span>
            {getDieDescription() && (
              <span className="text-xs font-normal opacity-80 px-4">{getDieDescription()}</span>
            )}
          </button>

          {/* Manual planeswalk */}
          <button
            onClick={doPlaneswalk}
            disabled={noFiltersSelected}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors
              bg-theme-surface hover:bg-theme-surface-hover text-theme-primary-hover
              dark:bg-dark-accent/20 dark:text-dark-accent/70 dark:hover:bg-dark-accent/30
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-5 h-5" />
            {t.planechase.planeswalk}
          </button>

          {/* Stats */}
          {!noFiltersSelected && (
            <div className="text-center text-xs text-gray-400 dark:text-dark-text/50 space-y-0.5">
              <p>{availablePlanes.length} {t.planechase.availablePlanes.toLowerCase()} · {previousPlanes.length} {t.planechase.visited}</p>
            </div>
          )}
        </div>
      </div>

      {/* Plane list toggle */}
      <button
        onClick={() => setShowPlaneList((v) => !v)}
        className="text-sm text-theme-primary hover:text-theme-primary-hover dark:text-dark-accent dark:hover:text-dark-accent/70 underline"
      >
        {showPlaneList ? t.planechase.hidePlaneList : t.planechase.showPlaneList} ({availablePlanes.length})
      </button>

      {showPlaneList && (
        <div className="p-4 bg-gray-50 dark:bg-dark-accent/20 rounded-lg max-h-72 overflow-y-auto space-y-2">
          {availablePlanes.map((plane) => (
            <div key={plane.id} className="p-2 bg-white dark:bg-dark-card rounded text-sm">
              <p className="font-medium text-gray-900 dark:text-dark-highlight">{plane.name}</p>
              <p className="text-xs text-gray-500 dark:text-dark-text/60">{plane.location}</p>
            </div>
          ))}
        </div>
      )}

      {/* History panel */}
      {showHistory && (
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-theme-primary-hover dark:text-dark-accent">{t.planechase.previousPlanes}</h3>
            <button
              onClick={() => setShowHistory(false)}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-accent/50"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          {previousPlanes.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-dark-text/50 text-center py-4">{t.planechase.noHistory}</p>
          ) : (
            <div className="space-y-3">
              {previousPlanes.map((plane, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-dark-accent/30 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-dark-highlight">{plane.name}</p>
                  <p className="text-xs text-gray-500 dark:text-dark-text/60 mt-0.5">{plane.location}</p>
                  <p className="text-xs text-gray-600 dark:text-dark-text mt-1 line-clamp-2">{plane.effect}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
