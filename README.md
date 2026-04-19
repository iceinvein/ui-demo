# UI Component Showcase

An interactive gallery of 50+ production-ready React components with live previews, syntax-highlighted source, and purposeful motion. Built as a portfolio piece and a working reference library for component design patterns.

## Overview

Every component is demonstrated in a self-contained card that expands into a morphing dialog. Each dialog pairs a live preview with the exact TypeScript source powering it, across multiple files where relevant. The goal is to show not just what a component does, but how it is built.

## Features

- **Interactive gallery** organised by category (Navigation, Feedback, Data Display, Animation)
- **Live previews** with real interactions, not screenshots
- **Syntax-highlighted source** with file tabs and one-click copy
- **Shared-layout morphing dialogs** that animate from card to full-screen preview
- **Dynamic height tabs** with smooth transitions measured via `ResizeObserver`
- **Spring-based motion** tuned for natural, physics-driven feel
- **Fully typed** component registry with strict TypeScript
- **Responsive and accessible** across touch and pointer input

## Tech Stack

- [Vite 7](https://vitejs.dev) for development and builds
- [React 19](https://react.dev) with the React Compiler enabled
- [TypeScript 5](https://www.typescriptlang.org) for end-to-end type safety
- [Framer Motion](https://www.framer.com/motion) and [motion](https://motion.dev) for animations
- [HeroUI](https://heroui.com) for base UI primitives
- [Tailwind CSS 4](https://tailwindcss.com) for styling
- [Biome](https://biomejs.dev) for linting and formatting
- [Lucide](https://lucide.dev) for iconography

## Getting Started

This project uses [Bun](https://bun.sh) as its package manager and runtime.

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev

# Type-check and build for production
bun run build

# Lint and format (Biome)
bun run lint
```

The dev server runs at `http://localhost:5173`.

## Project Structure

```text
src/
├── components/
│   ├── component-card.tsx              # Gallery card with shared layout id
│   ├── component-dialog.tsx            # Standard modal shell
│   ├── animated-component-dialog.tsx   # Morphing dialog using shared layouts
│   ├── code-viewer.tsx                 # Syntax-highlighted source with tabs
│   ├── *-demo.tsx                      # Per-component demos (50+)
│   └── ui/                             # Reusable primitives
├── data/
│   └── components.tsx                  # Component registry + inline source
├── pages/
│   └── index.tsx                       # Landing page and gallery
└── types/
    └── component.ts                    # Shared type definitions
```

## Categories

### Navigation
Animated Tabs, Sidebar Menu, Command Palette, Breadcrumb Trail, Pagination, Stepper, Magnetic Dock.

### Feedback
Toast Notifications, Skeleton Loaders, Loading States, Circular Progress, Notification Badge, Tooltip, Password Strength, Confetti Burst.

### Data Display
Animated Task List, Drag & Drop List, Sortable Table, Tree View, Timeline, Staggered Grid, Avatar Stack, Pricing Cards, Rating Stars, Image Gallery, Accordion, Before / After, Swipeable Card Stack, Counter & Stats.

### Animation
Animated Dialog, Button to Dialog, Streaming Code, Slot Machine Counter, Split Text, Typewriter, Text Scramble, 3D Card Flip, 3D Tilt Card, Path Morphing, Scroll Parallax, Scroll Reveal, Cursor Trail, Spotlight Reveal, Mesh Gradient, Bokeh Effects, Gravity Simulation, Elastic Drawer, Floating Action Button, Multi-Step Form, Toggle Switch, Petrol Counter.

## Technical Highlights

- **Shared layout animations** via Framer Motion `layoutId` for seamless card-to-dialog morphs
- **Dynamic height measurement** with `ResizeObserver` for tab content that resizes mid-transition
- **`AnimatePresence` with `mode="wait"`** to keep exit animations clean and avoid orphaned DOM
- **Spring physics configs** tuned per interaction for natural motion rather than time-based easing
- **Typed component registry** with inline source strings that stay in sync with live demos
- **React Compiler** enabled via `babel-plugin-react-compiler` for automatic memoisation

## License

Licensed under the [MIT License](./LICENSE).
