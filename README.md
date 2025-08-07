# Diablo IV Build Generator

A mobile-optimized web application for generating, discovering, and managing Diablo IV character builds with web scraping capabilities.

## Features

- **Class Selection**: Choose from 5 Diablo IV classes (Barbarian, Necromancer, Sorceress, Rogue, Druid)
- **Playstyle Customization**: 6 different build focuses (PvE General, PvP, Speed Farming, Boss Killer, Season Journey, Hardcore)
- **Web Scraping Engine**: Scrapes builds from Maxroll.gg and D4builds.gg using Supabase Edge Functions
- **Build Storage**: Persistent storage using Supabase database with Row Level Security
- **Build History**: Local and cloud-based build management
- **Build Editor**: View detailed build information including skills, gear, and stats
- **Share & Export**: Share builds via clipboard and export as text files
- **Mobile-First Design**: Responsive design optimized for mobile devices
- **Dark Theme**: Diablo-inspired dark theme with red and gold accents

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom Diablo-themed design system
- **UI Components**: Shadcn/ui components with custom variants
- **Backend**: Supabase (Database, Edge Functions, Authentication)
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── build/          # Build-related components
│   ├── ui/             # Reusable UI components
│   ├── ClassSelector.tsx
│   ├── PlaystyleSelector.tsx
│   ├── BuildGenerator.tsx
│   └── BuildHistory.tsx
├── hooks/
│   └── useBuilds.ts    # Custom hook for build management
├── types/
│   └── build.ts        # TypeScript interfaces
└── pages/
    └── Index.tsx       # Main application page
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm i`
3. Run development server: `npm run dev`

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c59d1ae9-6f7e-46ed-86c0-cb6fc5a40a61) and click on Share -> Publish.