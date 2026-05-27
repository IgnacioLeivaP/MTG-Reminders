import React from 'react';
import {
  Activity, Heart, Sun, Moon, CircleDot, Star, Crown,
  Building2, Map, Users, Droplets, Bell, Zap, ChevronRight, Gauge
} from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useLifeCounterStore } from '../../store/useLifeCounterStore';
import { useDayNightStore } from '../../store/useDayNightStore';
import { useRingStore } from '../../store/useRingStore';
import { useEmblemsStore } from '../../store/useEmblemsStore';
import { useMonarchStore } from '../../store/useMonarchStore';
import { useCitysBlessingStore } from '../../store/useCitysBlessingStore';
import { useDungeonStore } from '../../store/useDungeonStore';
import { useTokenStore } from '../../store/useTokenStore';
import { useManaPoolStore } from '../../store/useManaPoolStore';
import { useRemindersStore } from '../../store/useRemindersStore';
import { useCountersStore } from '../../store/useCountersStore';
import { useSpeedStore } from '../../store/useSpeedStore';
import { emblems as emblemsData } from '../../data/emblems';
import { helperCards } from '../../data/helperCards';
import { useTranslation } from '../../i18n/useTranslation';

const ringSteps = [
  "Your Ring-bearer is legendary and can't be blocked by creatures with greater power.",
  "Whenever your Ring-bearer attacks, draw a card, then discard a card.",
  "Whenever your Ring-bearer becomes blocked by a creature, that creature's controller sacrifices it at end of combat.",
  "Whenever your Ring-bearer deals combat damage to a player, each opponent loses 3 life.",
];

const manaColorConfig = {
  white:     { label: 'White',     textClass: 'text-yellow-700 dark:text-yellow-400',  dotClass: 'bg-yellow-400' },
  blue:      { label: 'Blue',      textClass: 'text-blue-700 dark:text-blue-400',      dotClass: 'bg-blue-500' },
  black:     { label: 'Black',     textClass: 'text-gray-700 dark:text-gray-300',      dotClass: 'bg-gray-600 dark:bg-gray-400' },
  red:       { label: 'Red',       textClass: 'text-red-700 dark:text-red-400',        dotClass: 'bg-red-500' },
  green:     { label: 'Green',     textClass: 'text-green-700 dark:text-green-400',    dotClass: 'bg-green-500' },
  colorless: { label: 'Colorless', textClass: 'text-gray-500 dark:text-gray-400',      dotClass: 'bg-gray-400' },
};

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  onNavigate?: () => void;
  navigateLabel?: string;
  children: React.ReactNode;
  highlight?: boolean;
}

function SummaryCard({ icon, title, onNavigate, navigateLabel, children, highlight }: SummaryCardProps) {
  return (
    <div className={`bg-white dark:bg-dark-card rounded-lg shadow-md p-4 flex flex-col gap-3
      ${highlight ? 'ring-2 ring-theme-primary/40 dark:ring-dark-accent' : ''}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="font-semibold text-gray-900 dark:text-dark-highlight">{title}</h3>
        </div>
        {onNavigate && (
          <button
            onClick={onNavigate}
            className="flex items-center space-x-1 text-xs text-theme-primary dark:text-dark-accent
              hover:text-theme-primary-hover dark:hover:text-dark-accent/70 transition-colors"
          >
            <span>{navigateLabel}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

export function GameSummary() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const t = useTranslation();
  const ts = t.gameSummary;

  const players = useLifeCounterStore(state => state.players);
  const isDay = useDayNightStore(state => state.isDay);
  const activeSteps = useRingStore(state => state.activeSteps);
  const activeEmblems = useEmblemsStore(state => state.activeEmblems);
  const isMonarch = useMonarchStore(state => state.isMonarch);
  const hasBlessing = useCitysBlessingStore(state => state.hasBlessing);
  const regularDungeon = useDungeonStore(state => state.regularDungeon);
  const undercityDungeon = useDungeonStore(state => state.undercityDungeon);
  const tokens = useTokenStore(state => state.tokens);
  const manaPool = useManaPoolStore(state => state.manaPool);
  const reminders = useRemindersStore(state => state.reminders);
  const counters = useCountersStore(state => state.counters);
  const speed = useSpeedStore(state => state.speed);

  const activeEmblemObjects = activeEmblems
    .map(id => emblemsData.find(e => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const hasMana = Object.values(manaPool).some(v => v > 0);
  const activeReminders = reminders.filter(r => r.isActive);
  const activeCounters = Object.entries(counters).filter(([, v]) => v > 0);
  const hasActiveDungeon = regularDungeon.activeDungeon !== null || undercityDungeon.activeDungeon !== null;

  const speedLabels = ['', ts.speedLevel1, ts.speedLevel2, ts.speedLevel3, ts.speedMax];

  const nothingSpecialActive =
    speed === 0 &&
    activeSteps.length === 0 &&
    activeEmblems.length === 0 &&
    !isMonarch &&
    !hasBlessing &&
    !hasActiveDungeon &&
    tokens.length === 0 &&
    !hasMana &&
    activeReminders.length === 0 &&
    activeCounters.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Activity className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
        <div>
          <h2 className="text-2xl font-bold dark:text-dark-highlight">{ts.title}</h2>
          <p className="text-sm text-gray-500 dark:text-dark-text">{ts.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Life Counter — always shown */}
        <SummaryCard
          icon={<Heart className="w-5 h-5 text-red-500" />}
          title={ts.lifeCounter}
          onNavigate={() => setActiveSection('life-counter')}
          navigateLabel={ts.goTo}
        >
          <div className="flex flex-wrap gap-3">
            {players.map(player => (
              <div
                key={player.id}
                className={`flex-1 min-w-[110px] rounded-lg p-3
                  ${player.life <= 5
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    : 'bg-gray-50 dark:bg-dark-accent/30'
                  }`}
              >
                <p className="text-xs text-gray-500 dark:text-dark-text font-medium mb-1">{player.name}</p>
                <p className={`text-2xl font-bold ${player.life <= 5 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-dark-highlight'}`}>
                  {player.life}
                </p>
                {player.poison > 0 && (
                  <p className="text-xs text-theme-primary dark:text-dark-accent mt-1">
                    ☠ {ts.poison}: {player.poison}
                  </p>
                )}
                {player.radiation > 0 && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    ☢ {ts.radiation}: {player.radiation}
                  </p>
                )}
                {player.isMonarch && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">👑 Monarch</p>
                )}
              </div>
            ))}
          </div>
        </SummaryCard>

        {/* Day/Night — always shown */}
        <SummaryCard
          icon={isDay
            ? <Sun className="w-5 h-5 text-yellow-500" />
            : <Moon className="w-5 h-5 text-indigo-400" />}
          title={ts.dayNight}
          onNavigate={() => setActiveSection('helper-cards')}
          navigateLabel={ts.goTo}
        >
          <div className={`flex items-center space-x-3 rounded-lg p-3
            ${isDay
              ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30'
              : 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/30'
            }`}
          >
            {isDay
              ? <Sun className="w-7 h-7 text-yellow-500" />
              : <Moon className="w-7 h-7 text-indigo-400" />}
            <p className={`text-lg font-semibold ${isDay ? 'text-yellow-700 dark:text-yellow-400' : 'text-indigo-700 dark:text-indigo-400'}`}>
              {isDay ? ts.day : ts.night}
            </p>
          </div>
        </SummaryCard>

        {/* Speed — conditional (only when started) */}
        {speed > 0 && (
          <SummaryCard
            icon={<Gauge className={`w-5 h-5 ${speed === 4 ? 'text-red-500' : 'text-orange-500'}`} />}
            title={ts.speed}
            onNavigate={() => setActiveSection('helper-cards')}
            navigateLabel={ts.goTo}
            highlight
          >
            <div className={`rounded-lg p-3 border ${speed === 4
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-lg font-bold ${speed === 4 ? 'text-red-600 dark:text-red-400' : 'text-orange-700 dark:text-orange-400'}`}>
                  {speed === 4 ? `🏁 ${ts.speedMax}` : `${ts.speed}: ${speed} / 4`}
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map(lvl => (
                  <div key={lvl} className={`flex-1 h-2 rounded-full ${speed >= lvl
                    ? lvl === 4 ? 'bg-red-500' : lvl === 3 ? 'bg-orange-500' : lvl === 2 ? 'bg-orange-400' : 'bg-yellow-400'
                    : 'bg-gray-200 dark:bg-dark-accent/40'
                  }`} />
                ))}
              </div>
              <p className="text-xs mt-2 text-gray-600 dark:text-dark-text">{speedLabels[speed]}</p>
            </div>
          </SummaryCard>
        )}

        {/* The Ring — conditional */}
        {activeSteps.length > 0 && (
          <SummaryCard
            icon={<CircleDot className="w-5 h-5 text-orange-500" />}
            title={ts.theRing}
            onNavigate={() => setActiveSection('helper-cards')}
            navigateLabel={ts.goTo}
            highlight
          >
            <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-2">
              {activeSteps.length} / 4 {ts.stepsActive}
            </p>
            <ul className="space-y-1">
              {activeSteps.map(step => (
                <li key={step} className="flex items-start space-x-2">
                  <span className="text-orange-500 dark:text-orange-400 mt-0.5 shrink-0">•</span>
                  <span className="text-xs text-gray-600 dark:text-dark-text">{ringSteps[step]}</span>
                </li>
              ))}
            </ul>
          </SummaryCard>
        )}

        {/* Active Emblems — conditional */}
        {activeEmblems.length > 0 && (
          <SummaryCard
            icon={<Star className="w-5 h-5 text-theme-primary" />}
            title={ts.emblems}
            onNavigate={() => setActiveSection('emblems')}
            navigateLabel={ts.goTo}
            highlight
          >
            <ul className="space-y-2">
              {activeEmblemObjects.map(emblem => (
                <li key={emblem.id} className="bg-theme-surface/50 dark:bg-dark-accent/20 rounded-lg p-2">
                  <p className="text-sm font-medium text-theme-primary-hover dark:text-dark-accent/70">{emblem.name}</p>
                  <p className="text-xs text-gray-600 dark:text-dark-text mt-1">{emblem.effect}</p>
                </li>
              ))}
            </ul>
          </SummaryCard>
        )}

        {/* Monarch — conditional */}
        {isMonarch && (
          <SummaryCard
            icon={<Crown className="w-5 h-5 text-yellow-500" />}
            title={ts.monarch}
            onNavigate={() => setActiveSection('helper-cards')}
            navigateLabel={ts.goTo}
            highlight
          >
            <div className="flex items-center space-x-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800/30">
              <Crown className="w-6 h-6 text-yellow-500 shrink-0" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400">{ts.monarchActive}</p>
            </div>
          </SummaryCard>
        )}

        {/* City's Blessing — conditional */}
        {hasBlessing && (
          <SummaryCard
            icon={<Building2 className="w-5 h-5 text-blue-500" />}
            title={ts.citysBlessing}
            onNavigate={() => setActiveSection('helper-cards')}
            navigateLabel={ts.goTo}
            highlight
          >
            <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800/30">
              <Building2 className="w-6 h-6 text-blue-500 shrink-0" />
              <p className="text-sm text-blue-700 dark:text-blue-400">{ts.citysBlessingActive}</p>
            </div>
          </SummaryCard>
        )}

        {/* Dungeon — conditional */}
        {hasActiveDungeon && (
          <SummaryCard
            icon={<Map className="w-5 h-5 text-emerald-500" />}
            title={ts.dungeon}
            onNavigate={() => setActiveSection('helper-cards')}
            navigateLabel={ts.goTo}
            highlight
          >
            <div className="space-y-2">
              {regularDungeon.activeDungeon && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2 border border-emerald-200 dark:border-emerald-800/30">
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    {regularDungeon.activeDungeon.name}
                  </p>
                  {regularDungeon.currentRoom && (
                    <p className="text-xs text-gray-600 dark:text-dark-text mt-1">
                      {ts.currentRoom} {regularDungeon.currentRoom.name}
                    </p>
                  )}
                </div>
              )}
              {undercityDungeon.activeDungeon && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2 border border-emerald-200 dark:border-emerald-800/30">
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    {undercityDungeon.activeDungeon.name}
                  </p>
                  {undercityDungeon.currentRoom && (
                    <p className="text-xs text-gray-600 dark:text-dark-text mt-1">
                      {ts.currentRoom} {undercityDungeon.currentRoom.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </SummaryCard>
        )}

        {/* Tokens — conditional */}
        {tokens.length > 0 && (
          <SummaryCard
            icon={<Users className="w-5 h-5 text-teal-500" />}
            title={ts.tokens}
            onNavigate={() => setActiveSection('token-generator')}
            navigateLabel={ts.goTo}
            highlight
          >
            <div className="flex flex-wrap gap-2">
              {tokens.map(token => (
                <div
                  key={token.id}
                  className="bg-teal-50 dark:bg-teal-900/20 rounded-lg px-2 py-1 border border-teal-200 dark:border-teal-800/30"
                >
                  <span className="text-xs font-medium text-teal-700 dark:text-teal-400">
                    x{token.quantity} {token.name} ({token.power}/{token.toughness})
                  </span>
                </div>
              ))}
            </div>
          </SummaryCard>
        )}

        {/* Floating Mana — conditional */}
        {hasMana && (
          <SummaryCard
            icon={<Droplets className="w-5 h-5 text-theme-primary" />}
            title={ts.manaPool}
            onNavigate={() => setActiveSection('mana-pool')}
            navigateLabel={ts.goTo}
            highlight
          >
            <div className="flex flex-wrap gap-2">
              {(Object.entries(manaPool) as [keyof typeof manaPool, number][])
                .filter(([, v]) => v > 0)
                .map(([color, amount]) => {
                  const cfg = manaColorConfig[color];
                  return (
                    <div key={color} className="flex items-center space-x-1.5 bg-gray-50 dark:bg-dark-accent/30 rounded-lg px-2 py-1">
                      <span className={`w-3 h-3 rounded-full shrink-0 ${cfg.dotClass}`} />
                      <span className={`text-sm font-medium ${cfg.textClass}`}>
                        {cfg.label}: {amount}
                      </span>
                    </div>
                  );
                })}
            </div>
          </SummaryCard>
        )}

        {/* Active Reminders — conditional */}
        {activeReminders.length > 0 && (
          <SummaryCard
            icon={<Bell className="w-5 h-5 text-amber-500" />}
            title={ts.reminders}
            onNavigate={() => setActiveSection('game-phases')}
            navigateLabel={ts.goTo}
            highlight
          >
            <ul className="space-y-1">
              {activeReminders.map(reminder => (
                <li key={reminder.id} className="flex items-start space-x-2">
                  <span className="text-amber-500 dark:text-amber-400 mt-0.5 shrink-0">•</span>
                  <span className="text-xs text-gray-600 dark:text-dark-text">{reminder.text}</span>
                </li>
              ))}
            </ul>
          </SummaryCard>
        )}

        {/* Special Counters — conditional */}
        {activeCounters.length > 0 && (
          <SummaryCard
            icon={<Zap className="w-5 h-5 text-yellow-500" />}
            title={ts.counters}
            onNavigate={() => setActiveSection('helper-cards')}
            navigateLabel={ts.goTo}
            highlight
          >
            <div className="flex flex-wrap gap-2">
              {activeCounters.map(([cardId, value]) => {
                const card = helperCards.find(h => h.id === cardId);
                return (
                  <div key={cardId} className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg px-2 py-1 border border-yellow-200 dark:border-yellow-800/30">
                    <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                      {card?.name ?? cardId}: {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </SummaryCard>
        )}
      </div>

      {/* Nothing special active */}
      {nothingSpecialActive && (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-8 text-center border-2 border-dashed border-gray-200 dark:border-dark-accent">
          <Activity className="w-10 h-10 text-gray-300 dark:text-dark-text/30 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-dark-text font-medium">{ts.nothingActive}</p>
          <p className="text-sm text-gray-400 dark:text-dark-text/60 mt-1">{ts.nothingActiveDesc}</p>
        </div>
      )}
    </div>
  );
}
