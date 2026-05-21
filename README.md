# MTG Reminders

A Magic: The Gathering companion PWA for tracking life totals, game phases, mechanics, and more — all in one place, with offline support.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)

## Features

- **Life Counter** — Multi-player life tracking with format presets (Standard, Commander), poison counters, radiation, and monarch status
- **Game Phases Tracker** — Full turn structure with per-phase reminders
- **Helper Cards** — Day/Night, Rings, Dungeons, and other in-game mechanic cards with built-in counters
- **Emblems** — Track active Planeswalker emblems
- **Tools**
  - Dice Roller (d4, d6, d20, and more)
  - Mana Calculator & Mana Pool
  - Deck Builder with format guidelines and banned card lists
  - Cascade Helper
  - Token Generator
  - Damage Tracker
  - Storm Counter
  - Planechase & Archenemy special modes
- **Favorites** — Pin your most-used tools for quick access
- **Dark / Light theme**
- **PWA** — Installable on mobile, works offline

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| State | Zustand 4 (with localStorage persistence) |
| Icons | Lucide React |
| Charts | Recharts |
| Deploy | Netlify |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── pages/      # Top-level pages (Home, Tools, Favorites, etc.)
│   ├── tools/      # Individual tool implementations
│   └── dungeons/   # Dungeon mechanic components
├── store/          # 17 Zustand stores (one per feature)
├── data/           # Static game data (phases, emblems, planes, etc.)
└── types/          # Shared TypeScript interfaces
```

## Deployment

The app is configured for Netlify. Push to `main` and Netlify handles the rest — SPA redirects and all.

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```
