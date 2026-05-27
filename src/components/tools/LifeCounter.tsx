import React, { useState, useRef } from 'react';
import { Heart, Plus, Minus, Crown, Skull, Radiation, ChevronDown, ChevronUp, Clock, X, Sword } from 'lucide-react';
import { useLifeCounterStore } from '../../store/useLifeCounterStore';
import { GameModeSelector } from '../GameModeSelector';
import { FavoriteButton } from '../FavoriteButton';
import { useTranslation } from '../../i18n/useTranslation';

interface HistoryEntry {
  id: number;
  playerName: string;
  type: 'life' | 'poison' | 'radiation' | 'monarch' | 'commander';
  change?: number;
  from?: number;
  to?: number;
  monarchBecame?: boolean;
  fromPlayerName?: string; // for commander damage: who dealt it
}

interface OtherPlayer {
  id: number;
  name: string;
}

interface PlayerLifeProps {
  name: string;
  life: number;
  radiation: number;
  poison: number;
  isMonarch: boolean;
  commanderDamage: Record<number, number>;
  otherPlayers: OtherPlayer[];
  showSubCounters: boolean;
  onLifeChange: (amount: number) => void;
  onRadiationChange: (amount: number) => void;
  onPoisonChange: (amount: number) => void;
  onMonarchToggle: () => void;
  onRename: (name: string) => void;
  onCommanderDamageChange: (sourcePlayerId: number, amount: number) => void;
  defeatedLabel: string;
  poisonLabel: string;
  radiationLabel: string;
  commanderDamageLabel: string;
}

function PlayerLife({
  name, life, radiation, poison, isMonarch, commanderDamage, otherPlayers, showSubCounters,
  onLifeChange, onRadiationChange, onPoisonChange, onMonarchToggle, onRename, onCommanderDamageChange,
  defeatedLabel, poisonLabel, radiationLabel, commanderDamageLabel,
}: PlayerLifeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = () => {
    setNameValue(name);
    setIsEditing(true);
    // Delay focus to let the input render first
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const saveEdit = () => {
    const trimmed = nameValue.trim();
    if (trimmed) onRename(trimmed);
    setIsEditing(false);
  };

  const isCommanderDefeated = otherPlayers.some(p => (commanderDamage[p.id] ?? 0) >= 21);
  const isDefeated = life <= 0 || poison >= 10 || isCommanderDefeated;

  return (
    <div className={`p-5 rounded-lg shadow-md transition-all ${
      isDefeated
        ? 'bg-red-100 dark:bg-red-900/50 border-2 border-red-500 dark:border-red-700'
        : 'bg-white dark:bg-dark-card'
    }`}>
      {/* Header with editable name and monarch toggle */}
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <input
            ref={inputRef}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            className={`text-xl font-semibold bg-transparent border-b-2 border-theme-primary/70 focus:outline-none w-full mr-2 ${
              isDefeated ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-dark-text'
            }`}
          />
        ) : (
          <h3
            onClick={startEdit}
            title="Click to rename"
            className={`text-xl font-semibold cursor-pointer hover:opacity-70 transition-opacity ${
              isDefeated ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-dark-text'
            }`}
          >
            {name}
          </h3>
        )}
        <button
          onClick={onMonarchToggle}
          title={isMonarch ? 'Monarch' : 'Set Monarch'}
          className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
            isMonarch
              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-400'
              : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400 dark:hover:text-yellow-500'
          }`}
        >
          <Crown className="w-5 h-5" />
        </button>
      </div>

      {/* Main life counter */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onLifeChange(-1)}
          className={`p-3 rounded-full transition-colors ${
            isDefeated
              ? 'bg-red-200 dark:bg-red-800/50 text-red-700 dark:text-red-400 hover:bg-red-300 dark:hover:bg-red-800'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
          }`}
        >
          <Minus className="w-6 h-6" />
        </button>
        <span className={`text-5xl font-bold tabular-nums ${
          isDefeated ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-dark-text'
        }`}>{life}</span>
        <button
          onClick={() => onLifeChange(1)}
          className={`p-3 rounded-full transition-colors ${
            isDefeated
              ? 'bg-red-200 dark:bg-red-800/50 text-red-700 dark:text-red-400 hover:bg-red-300 dark:hover:bg-red-800'
              : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
          }`}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Sub-counters: poison, radiation, commander damage */}
      {showSubCounters && (
        <div className="border-t border-gray-100 dark:border-dark-accent/30 pt-3 space-y-2">
          {/* Poison */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Skull className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">{poisonLabel}</span>
              {poison >= 10 && <span className="text-xs font-bold text-red-500 dark:text-red-400">☠</span>}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPoisonChange(-1)}
                className="p-1 rounded-full bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-semibold w-5 text-center text-gray-800 dark:text-dark-text">{poison}</span>
              <button
                onClick={() => onPoisonChange(1)}
                className="p-1 rounded-full bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Radiation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Radiation className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">{radiationLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onRadiationChange(-1)}
                className="p-1 rounded-full bg-yellow-100 dark:bg-yellow-800/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800/50"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-semibold w-5 text-center text-gray-800 dark:text-dark-text">{radiation}</span>
              <button
                onClick={() => onRadiationChange(1)}
                className="p-1 rounded-full bg-yellow-100 dark:bg-yellow-800/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800/50"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Commander damage — one row per opponent */}
          {otherPlayers.length > 0 && (
            <div className="pt-1 border-t border-gray-100 dark:border-dark-accent/20 space-y-1.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Sword className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <span className="text-xs font-medium text-orange-600 dark:text-orange-400">{commanderDamageLabel}</span>
              </div>
              {otherPlayers.map((attacker) => {
                const dmg = commanderDamage[attacker.id] ?? 0;
                return (
                  <div key={attacker.id} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-dark-text truncate max-w-[90px]">{attacker.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onCommanderDamageChange(attacker.id, -1)}
                        className="p-1 rounded-full bg-orange-100 dark:bg-orange-800/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className={`text-sm font-semibold w-5 text-center ${dmg >= 21 ? 'text-red-500 dark:text-red-400' : 'text-gray-800 dark:text-dark-text'}`}>
                        {dmg}
                      </span>
                      <button
                        onClick={() => onCommanderDamageChange(attacker.id, 1)}
                        className="p-1 rounded-full bg-orange-100 dark:bg-orange-800/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {isDefeated && (
        <div className="mt-4 text-center">
          <span className="text-red-700 dark:text-red-400 font-medium">{defeatedLabel}</span>
        </div>
      )}
    </div>
  );
}

export function LifeCounter() {
  const { players, updateLife, updateRadiation, updatePoison, toggleMonarch, renamePlayer, updateCommanderDamage } = useLifeCounterStore();
  const t = useTranslation();
  const [showSubCounters, setShowSubCounters] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const nextId = useRef(0);

  const addHistory = (entry: Omit<HistoryEntry, 'id'>) => {
    nextId.current += 1;
    setHistory((prev) => [{ ...entry, id: nextId.current }, ...prev].slice(0, 100));
  };

  const handleLifeChange = (player: typeof players[0], amount: number) => {
    addHistory({ playerName: player.name, type: 'life', change: amount, from: player.life, to: player.life + amount });
    updateLife(player.id, amount);
  };

  const handlePoisonChange = (player: typeof players[0], amount: number) => {
    const next = Math.max(0, player.poison + amount);
    if (next === player.poison) return;
    addHistory({ playerName: player.name, type: 'poison', change: amount, from: player.poison, to: next });
    updatePoison(player.id, amount);
  };

  const handleRadiationChange = (player: typeof players[0], amount: number) => {
    const next = Math.max(0, player.radiation + amount);
    if (next === player.radiation) return;
    addHistory({ playerName: player.name, type: 'radiation', change: amount, from: player.radiation, to: next });
    updateRadiation(player.id, amount);
  };

  const handleMonarchToggle = (player: typeof players[0]) => {
    if (player.isMonarch) return;
    const currentMonarch = players.find((p) => p.isMonarch);
    if (currentMonarch) addHistory({ playerName: currentMonarch.name, type: 'monarch', monarchBecame: false });
    addHistory({ playerName: player.name, type: 'monarch', monarchBecame: true });
    toggleMonarch(player.id);
  };

  const handleCommanderDamageChange = (targetPlayer: typeof players[0], sourcePlayerId: number, amount: number) => {
    const current = targetPlayer.commanderDamage[sourcePlayerId] ?? 0;
    const next = Math.max(0, current + amount);
    if (next === current) return;
    const sourceName = players.find((p) => p.id === sourcePlayerId)?.name ?? `Player ${sourcePlayerId}`;
    addHistory({ playerName: targetPlayer.name, type: 'commander', from: current, to: next, change: amount, fromPlayerName: sourceName });
    updateCommanderDamage(targetPlayer.id, sourcePlayerId, amount);
  };

  const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);

  const renderHistoryEntry = (entry: HistoryEntry) => {
    let icon: React.ReactNode;
    let content: React.ReactNode;

    if (entry.type === 'life') {
      icon = <Heart className={`w-3.5 h-3.5 flex-shrink-0 ${entry.change! > 0 ? 'text-green-500' : 'text-red-500'}`} />;
      content = <><span className="font-medium">{entry.playerName}</span> {entry.from} → {entry.to} ({sign(entry.change!)})</>;
    } else if (entry.type === 'poison') {
      icon = <Skull className="w-3.5 h-3.5 flex-shrink-0 text-green-600 dark:text-green-400" />;
      content = <><span className="font-medium">{entry.playerName}</span> {t.lifeCounter.poison}: {entry.from} → {entry.to}</>;
    } else if (entry.type === 'radiation') {
      icon = <Radiation className="w-3.5 h-3.5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />;
      content = <><span className="font-medium">{entry.playerName}</span> {t.lifeCounter.radiation}: {entry.from} → {entry.to}</>;
    } else if (entry.type === 'commander') {
      icon = <Sword className="w-3.5 h-3.5 flex-shrink-0 text-orange-500" />;
      content = <><span className="font-medium">{entry.playerName}</span> {t.lifeCounter.commanderDamage} ({entry.fromPlayerName}): {entry.from} → {entry.to}</>;
    } else {
      icon = <Crown className="w-3.5 h-3.5 flex-shrink-0 text-yellow-500" />;
      content = <><span className="font-medium">{entry.playerName}</span> {entry.monarchBecame ? t.lifeCounter.becameMonarch : t.lifeCounter.lostMonarch}</>;
    }

    return (
      <div key={entry.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-dark-text py-0.5">
        {icon}
        <span>{content}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Heart className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.lifeCounter.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSubCounters((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showSubCounters
                ? 'bg-theme-surface dark:bg-dark-accent text-theme-primary-hover dark:text-dark-accent/70'
                : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-accent/50'
            }`}
          >
            {showSubCounters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showSubCounters ? t.lifeCounter.hideCounters : t.lifeCounter.showCounters}
          </button>
          <FavoriteButton toolId="life-counter" toolName="Life Counter" toolIcon="Heart" />
        </div>
      </div>

      <GameModeSelector />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {players.map((player) => (
          <PlayerLife
            key={player.id}
            name={player.name}
            life={player.life}
            radiation={player.radiation}
            poison={player.poison}
            isMonarch={player.isMonarch}
            commanderDamage={player.commanderDamage}
            otherPlayers={players.filter((p) => p.id !== player.id).map((p) => ({ id: p.id, name: p.name }))}
            showSubCounters={showSubCounters}
            onLifeChange={(amount) => handleLifeChange(player, amount)}
            onRadiationChange={(amount) => handleRadiationChange(player, amount)}
            onPoisonChange={(amount) => handlePoisonChange(player, amount)}
            onMonarchToggle={() => handleMonarchToggle(player)}
            onRename={(name) => renamePlayer(player.id, name)}
            onCommanderDamageChange={(sourceId, amount) => handleCommanderDamageChange(player, sourceId, amount)}
            defeatedLabel={t.lifeCounter.defeated}
            poisonLabel={t.lifeCounter.poison}
            radiationLabel={t.lifeCounter.radiation}
            commanderDamageLabel={t.lifeCounter.commanderDamage}
          />
        ))}
      </div>

      {/* Interaction history */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500 dark:text-dark-text/70" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-dark-highlight">{t.lifeCounter.history}</h3>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="flex items-center gap-1 text-xs text-gray-400 dark:text-dark-text/50 hover:text-gray-600 dark:hover:text-dark-text transition-colors"
            >
              <X className="w-3 h-3" />
              {t.lifeCounter.clearHistory}
            </button>
          )}
        </div>
        <div className="space-y-1.5 max-h-44 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-dark-text/50 text-center py-4">{t.lifeCounter.noHistory}</p>
          ) : (
            history.map((entry) => renderHistoryEntry(entry))
          )}
        </div>
      </div>
    </div>
  );
}
