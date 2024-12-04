export const phases = [
  {
    id: 'beginning',
    name: 'Beginning Phase',
    description: 'The phase where players untap, upkeep, and draw.',
    steps: ['Untap', 'Upkeep', 'Draw']
  },
  {
    id: 'precombat-main',
    name: 'Pre-Combat Main Phase',
    description: 'The first main phase where you can play lands and spells.',
    steps: ['Play lands', 'Cast spells', 'Activate abilities']
  },
  {
    id: 'combat',
    name: 'Combat Phase',
    description: 'The phase where combat occurs.',
    steps: ['Beginning of Combat', 'Declare Attackers', 'Declare Blockers', 'Combat Damage', 'End of Combat']
  },
  {
    id: 'postcombat-main',
    name: 'Post-Combat Main Phase',
    description: 'The second main phase where you can play lands and spells.',
    steps: ['Play lands', 'Cast spells', 'Activate abilities']
  },
  {
    id: 'ending',
    name: 'Ending Phase',
    description: 'The phase where the turn ends and cleanup occurs.',
    steps: ['End Step', 'Cleanup']
  }
];