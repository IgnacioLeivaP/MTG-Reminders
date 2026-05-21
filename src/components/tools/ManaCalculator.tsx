import React, { useState } from 'react';
import { Calculator, ArrowLeft, HelpCircle } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from '../../i18n/useTranslation';

interface ManaCurve {
  [key: number]: number;
}

interface Format {
  name: string;
  minLands: number;
  maxLands: number;
  description: string;
}

interface HelpText {
  title: string;
  content: string;
  examples: string[];
}

const formats: Format[] = [
  {
    name: 'Commander',
    minLands: 36,
    maxLands: 38,
    description: 'For Commander, 36-38 lands are recommended due to the higher average mana cost of spells and the 100-card format nature.'
  },
  {
    name: 'Modern',
    minLands: 22,
    maxLands: 24,
    description: 'Modern typically requires between 22-24 lands, depending on deck aggressiveness and mana curve.'
  },
  {
    name: 'Standard',
    minLands: 20,
    maxLands: 26,
    description: 'In Standard, the range is wider (20-26) based on deck archetype: aggro, midrange, or control.'
  }
];


export function ManaCalculator() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const t = useTranslation();
  const [deckSize, setDeckSize] = useState<number>(60);
  const [manaCurve, setManaCurve] = useState<ManaCurve>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
  });
  const [colorRequirements, setColorRequirements] = useState({
    white: 0,
    blue: 0,
    black: 0,
    red: 0,
    green: 0
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>('Standard');
  const [showHelp, setShowHelp] = useState(false);
  const [activeHelp, setActiveHelp] = useState<string | null>(null);

  const handleDeckSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDeckSize(value === '' ? 0 : Number(value));
  };

  const handleManaCurveChange = (cmc: string, value: string) => {
    setManaCurve({
      ...manaCurve,
      [cmc]: value === '' ? 0 : Number(value)
    });
  };

  const handleColorRequirementChange = (color: string, value: string) => {
    setColorRequirements({
      ...colorRequirements,
      [color]: value === '' ? 0 : Number(value)
    });
  };

  const calculateManaBase = () => {
    // Calcular CMC promedio
    let totalCards = 0;
    let totalCMC = 0;
    Object.entries(manaCurve).forEach(([cmc, count]) => {
      totalCards += count;
      totalCMC += Number(cmc) * count;
    });
    const avgCmc = totalCMC / (totalCards || 1);

    // Calcular tierras base según CMC promedio
    let baseLandCount = 0;
    if (avgCmc <= 2) baseLandCount = 22;
    else if (avgCmc <= 3) baseLandCount = 24;
    else if (avgCmc <= 4) baseLandCount = 26;
    else baseLandCount = 28;

    // Ajustar según tamaño del mazo
    const totalLands = Math.round(baseLandCount * (deckSize / 60));

    // Calcular fuentes de color
    const coloredSources: { [key: string]: number } = {};
    const totalColorPips = Object.values(colorRequirements).reduce((a, b) => a + b, 0);
    
    Object.entries(colorRequirements).forEach(([color, pips]) => {
      if (pips > 0) {
        coloredSources[color] = Math.round((pips / totalColorPips) * totalLands);
      }
    });

    setResult({
      totalLands,
      coloredSources,
      avgCmc
    });
  };

  const getChartData = () => {
    return Object.entries(manaCurve).map(([cmc, count]) => ({
      cmc,
      count
    }));
  };

  const getHelpData = (helpKey: string) => {
    return t.manaCalculator.help[helpKey as keyof typeof t.manaCalculator.help];
  };

  const renderHelpModal = (helpKey: string) => {
    const help = getHelpData(helpKey);
    if (!help) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl p-6 max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">{help.title}</h3>

          <p className="text-gray-600 dark:text-dark-text mb-4">
            {help.content}
          </p>

          <div className="space-y-2">
            <h4 className="font-medium">{t.manaCalculator.examples}</h4>
            <ul className="list-disc pl-5 space-y-1">
              {help.examples.map((example, index) => (
                <li key={index} className="text-gray-600 dark:text-dark-text">
                  {example}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setActiveHelp(null)}
            className="w-full mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 dark:bg-dark-accent dark:hover:bg-dark-highlight transition-colors"
          >
            {t.manaCalculator.gotIt}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setActiveSection('tools')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </button>
        <Calculator className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.manaCalculator.title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">{t.manaCalculator.deckInfo}</h3>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">{t.manaCalculator.deckSize}</label>
              <button
                onClick={() => setActiveHelp('deckSize')}
                className="p-1 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-full"
              >
                <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </button>
            </div>
            <input
              type="number"
              value={deckSize === 0 ? '' : deckSize}
              onChange={handleDeckSizeChange}
              className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{t.manaCalculator.manaCurve}</h4>
              <button
                onClick={() => setActiveHelp('manaCurve')}
                className="p-1 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-full"
              >
                <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {Object.entries(manaCurve).map(([cmc, count]) => (
                <div key={cmc} className="text-center">
                  <label className="block text-sm">{cmc}</label>
                  <input
                    type="number"
                    value={count === 0 ? '' : count}
                    onChange={(e) => handleManaCurveChange(cmc, e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{t.manaCalculator.colorRequirements}</h4>
              <button
                onClick={() => setActiveHelp('colorRequirements')}
                className="p-1 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-full"
              >
                <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(colorRequirements).map(([color, count]) => (
                <div key={color} className="text-center">
                  <label className="block text-sm capitalize">{color}</label>
                  <input
                    type="number"
                    value={count === 0 ? '' : count}
                    onChange={(e) => handleColorRequirementChange(color, e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t.manaCalculator.format}</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-dark-accent dark:border-dark-accent"
            >
              {formats.map(format => (
                <option key={format.name} value={format.name}>
                  {format.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={calculateManaBase}
            className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 dark:bg-dark-accent dark:hover:bg-dark-highlight transition-colors"
          >
            {t.manaCalculator.calculate}
          </button>
        </div>

        {result && (
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">{t.manaCalculator.results}</h3>

            <div className="space-y-4">
              <div>
                <p className="font-medium">{t.manaCalculator.avgCmc}</p>
                <p className="text-2xl text-purple-600 dark:text-purple-400">
                  {result.avgCmc.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="font-medium">{t.manaCalculator.recommendedLands}</p>
                <p className="text-2xl text-purple-600 dark:text-purple-400">
                  {result.totalLands} {t.manaCalculator.lands}
                </p>
              </div>

              <div>
                <p className="font-medium">{t.manaCalculator.colorSources}</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(result.coloredSources).map(([color, count]) => (
                    <div key={color} className="flex justify-between items-center">
                      <span className="capitalize">{color}</span>
                      <span className="font-medium">{count} {t.manaCalculator.sources}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">{t.manaCalculator.manaCurve}</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()}>
                    <XAxis dataKey="cmc" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#9333ea" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">{t.manaCalculator.formatGuidelines}</h3>

          {formats.map(format => (
            <div
              key={format.name}
              className={`mb-4 p-4 rounded-lg ${
                selectedFormat === format.name
                  ? 'bg-purple-50 dark:bg-dark-accent/50 border-2 border-purple-500'
                  : 'bg-gray-50 dark:bg-dark-accent/20'
              }`}
            >
              <h4 className="font-medium mb-2">{format.name}</h4>
              <p className="text-sm text-gray-600 dark:text-dark-text mb-2">
                {format.description}
              </p>
              <p className="text-sm font-medium">
                {t.manaCalculator.recommendedLandsLabel} {format.minLands}-{format.maxLands}
              </p>
            </div>
          ))}
        </div>

        {showHelp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl p-6 max-w-2xl">
              <h3 className="text-xl font-bold mb-4">How the calculator works</h3>
              
              <div className="space-y-4">
                <section>
                  <h4 className="font-medium mb-2">1. Mana Curve</h4>
                  <p>Enter how many cards you have at each mana cost. This helps determine your deck's distribution.</p>
                </section>

                <section>
                  <h4 className="font-medium mb-2">2. Color Requirements</h4>
                  <p>Indicate how many mana symbols of each color you need. For example, if you have {"{W}{W}"}, count it as 2 white.</p>
                </section>

                <section>
                  <h4 className="font-medium mb-2">3. Calculations</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Average CMC helps determine the land base</li>
                    <li>Color requirements determine mana source distribution</li>
                    <li>Selected format adjusts recommendations based on best practices</li>
                  </ul>
                </section>

                <button
                  onClick={() => setShowHelp(false)}
                  className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg 
                    hover:bg-purple-700 dark:bg-dark-accent dark:hover:bg-dark-highlight transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeHelp && renderHelpModal(activeHelp)}
    </div>
  );
} 