# Tenno Utils

<div style="display: inline_block">
  <img
    src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/react/default.svg"
    alt="React"
    width="24"
    height="24"
  />
  &nbsp;&nbsp;
  <img
    src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/typescript/default.svg"
    alt="TypeScript"
    width="24"
    height="24"
  />
  &nbsp;&nbsp;
  <img
    src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/vite/default.svg"
    alt="Vite"
    width="24"
    height="24"
  />
  &nbsp;&nbsp;
  <img
    src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/tanstack/default.svg"
    alt="TanStack"
    width="24"
    height="24"
  />
  &nbsp;&nbsp;
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg" 
    alt="Zustand" 
    width="24"
    height="24" 
  /> 
  &nbsp;&nbsp;
  <img
    src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/tailwind-css/default.svg"
    alt="Tailwind CSS"
    width="24"
    height="24"
  />
  &nbsp;&nbsp;
  <img
    src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/lucide/default.svg"
    alt="Lucide"
    width="24"
    height="24"
  />
  &nbsp;&nbsp;
  <img
    src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/shadcn-ui/default.svg"
    alt="shadcn/ui"
    width="24"
    height="24"
  />
</div>
<br />

**A real-time Warframe companion dashboard designed to keep essential in-game information accessible in one place.**

Tenno Utils is a web application that provides a centralized view of Warframe's dynamic world state, helping players track missions, activities, events, and world cycles without constantly switching between the game and external resources.

## Features

### World State Tracking

Access real-time information about Warframe's activities and dynamic events:

- **Alerts** — Available alert missions and their rewards.
- **Arbitrations** — Current arbitration missions.
- **Archon Hunt** — Weekly Archon Hunt information.
- **Archimedeas** — Available Archimedea activities.
- **Fissures** — Active Void Fissure missions and their locations.
- **Invasions** — Ongoing invasion missions and rewards.
- **Sortie** — Current daily Sortie missions.
- **Steel Path** — Active Steel Path missions.
- **Syndicate Missions** — Available syndicate assignments.
- **Void Trader** — Baro Ki'Teer's availability and related information.
- **Events** — Current in-game events.

### Open World Cycles

Track the current state and rotation of Warframe's open-world locations:

- Cetus / Plains of Eidolon
- Fortuna / Orb Vallis
- Cambion Drift
- Duviri
- Earth
- Zariman

### Weekly Activities
Keep track of recurring weekly activities through a dedicated checklist.
- Mark activities as completed.
- Automatically persist progress between sessions.
- Reset the checklist according to Warframe's weekly reset schedule (Monday at 00:00 UTC).

## Data Source
```text
https://api.warframestat.us/pc
```
The application uses this data to display current missions, events, rotations, and other dynamic game information.
Data availability and update frequency depend on the Warframe Stat API.

## Getting Started
### Installation
Clone the repository:
```bash
git clone https://github.com/xXLuisHenriqueXx/tenno_utils.git
```

Navigate to the project directory:
```bash
cd tenno_utils
```

Install dependencies:
```bash
yarn install
```

### Development
Start the development server:
```bash
yarn dev
```

The application will be available at:
```text
http://localhost:3000
```

## Available Scripts
| Command | Description |
|---|---|
| `yarn dev` | Starts the development server |
| `yarn build` | Generates the production build |
| `yarn preview` | Previews the production build |
| `yarn lint` | Runs ESLint |
| `yarn check` | Checks code formatting with Prettier |
| `yarn format` | Formats the codebase and applies ESLint fixes |
| `yarn generate-routes` | Regenerates TanStack Router route definitions |

## Project Structure
The application follows a feature-oriented structure using TanStack Router's file-based routing.
```text
tenno_utils/
├── .github/
│   └── workflows/       # GitHub Actions workflows
├── .vscode/             # Editor configuration
├── src/
│   ├── routes/          # Application routes
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── stores/          # Zustand state stores
│   └── ...              # Application modules
├── public/              # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Contributing
Contributions, suggestions, and bug reports are welcome.
1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Submit a pull request describing the changes.
Please keep contributions consistent with the existing TypeScript conventions and project architecture.

## Disclaimer
Tenno Utils is an independent community project and is not affiliated with, endorsed by, or sponsored by Digital Extremes.
Warframe and all related assets and trademarks belong to their respective owners.

---

**Built for Tenno, by a Tenno.**
