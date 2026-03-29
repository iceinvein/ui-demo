# 5 New UI Showcases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 5 new animated/interactive showcases (Magnetic Dock, Command Palette, Swipeable Cards, Toast Notifications, Gravity Simulation) to the UI demo.

**Architecture:** Each showcase is a self-contained demo component in `src/components/` with optional UI primitive in `src/components/ui/`. All registered in `src/data/components.tsx`. No new dependencies — uses Framer Motion, Lucide React, Tailwind CSS, and Canvas API.

**Tech Stack:** React 19, Framer Motion 12, Tailwind CSS 4, Lucide React, Canvas 2D API

---

## File Structure

| File | Responsibility |
|------|---------------|
| `src/components/magnetic-dock-demo.tsx` | Magnetic dock with mouse-distance magnification |
| `src/components/command-palette-demo.tsx` | ⌘K command palette with fuzzy search + keyboard nav |
| `src/components/swipe-cards-demo.tsx` | Tinder-style drag-to-swipe card stack |
| `src/components/ui/toast.tsx` | Reusable toast container + item + hook |
| `src/components/toast-demo.tsx` | Demo triggering 4 toast variants |
| `src/components/gravity-demo.tsx` | Canvas-based physics simulation |
| `src/data/components.tsx` | Register all 5 new components |

---

### Task 1: Magnetic Dock Demo

**Files:**
- Create: `src/components/magnetic-dock-demo.tsx`

- [ ] **Step 1: Create the magnetic dock demo component**

```tsx
// src/components/magnetic-dock-demo.tsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Calendar,
  Camera,
  Globe,
  Mail,
  Music,
  Palette,
  Settings,
  Terminal,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useRef } from "react";

const dockItems: { icon: LucideIcon; label: string; color: string }[] = [
  { icon: Music, label: "Music", color: "from-pink-500 to-rose-500" },
  { icon: Camera, label: "Photos", color: "from-purple-500 to-indigo-500" },
  { icon: Mail, label: "Mail", color: "from-blue-500 to-cyan-500" },
  { icon: Calendar, label: "Calendar", color: "from-red-500 to-orange-500" },
  { icon: Globe, label: "Safari", color: "from-cyan-500 to-blue-500" },
  { icon: Settings, label: "Settings", color: "from-gray-500 to-zinc-600" },
  { icon: Terminal, label: "Terminal", color: "from-green-500 to-emerald-600" },
  { icon: Palette, label: "Design", color: "from-amber-500 to-yellow-500" },
];

function DockIcon({
  icon: Icon,
  label,
  color,
  mouseX,
  index,
}: {
  icon: LucideIcon;
  label: string;
  color: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const el = ref.current;
    if (!el) return 150;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  const size = useTransform(distance, [0, 100, 200], [72, 56, 48]);
  const springSize = useSpring(size, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col items-center"
      style={{ width: springSize, height: springSize }}
    >
      {/* Tooltip */}
      <div className="pointer-events-none absolute -top-10 rounded-md bg-default-900/90 px-2.5 py-1 text-default-50 text-xs opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-default-900/90" />
      </div>
      {/* Icon */}
      <motion.div
        className={`flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}
        style={{ width: springSize, height: springSize }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon className="h-1/2 w-1/2 text-white" />
      </motion.div>
      {/* Dot indicator */}
      <div className="mt-1 h-1 w-1 rounded-full bg-default-400/60" />
    </motion.div>
  );
}

export function MagneticDockDemo() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8"
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text font-bold text-2xl text-transparent">
          Magnetic Dock
        </h2>
        <p className="text-default-500 text-sm">
          Move your cursor across the dock
        </p>
      </motion.div>

      {/* Dock */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        className="flex items-end gap-2 rounded-2xl border border-default-200/60 bg-default-100/50 px-4 pb-2 pt-2 shadow-xl backdrop-blur-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {dockItems.map((item, i) => (
          <DockIcon
            key={item.label}
            icon={item.icon}
            label={item.label}
            color={item.color}
            mouseX={mouseX}
            index={i}
          />
        ))}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it renders**

Run: `bun run dev`
Open browser, import the component temporarily in a test page or check via React DevTools that it mounts without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/magnetic-dock-demo.tsx
git commit -m "feat: add magnetic dock demo component"
```

---

### Task 2: Command Palette Demo

**Files:**
- Create: `src/components/command-palette-demo.tsx`

- [ ] **Step 1: Create the command palette demo component**

```tsx
// src/components/command-palette-demo.tsx
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Globe,
  Home,
  type LucideIcon,
  Moon,
  Palette,
  Search,
  Settings,
  Sun,
  Users,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PaletteItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  group: string;
  shortcut?: string;
};

const items: PaletteItem[] = [
  { id: "home", label: "Go to Home", icon: Home, group: "Navigation", shortcut: "G H" },
  { id: "docs", label: "Go to Documentation", icon: FileText, group: "Navigation", shortcut: "G D" },
  { id: "team", label: "Go to Team", icon: Users, group: "Navigation" },
  { id: "website", label: "Open Website", icon: Globe, group: "Navigation" },
  { id: "theme-light", label: "Switch to Light Mode", icon: Sun, group: "Actions" },
  { id: "theme-dark", label: "Switch to Dark Mode", icon: Moon, group: "Actions" },
  { id: "quick-action", label: "Run Quick Action", icon: Zap, group: "Actions", shortcut: "⌘ E" },
  { id: "settings", label: "Open Settings", icon: Settings, group: "Settings", shortcut: "⌘ ," },
  { id: "appearance", label: "Customize Appearance", icon: Palette, group: "Settings" },
];

export function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    );
  }, [query]);

  const groups = useMemo(() => {
    const map = new Map<string, PaletteItem[]>();
    for (const item of filtered) {
      const list = map.get(item.group) || [];
      list.push(item);
      map.set(item.group, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const flatItems = useMemo(() => filtered, [filtered]);

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActiveIndex(0);
    setLastAction(null);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const selectItem = useCallback(
    (item: PaletteItem) => {
      setLastAction(item.label);
      closePalette();
    },
    [closePalette],
  );

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        e.stopPropagation();
        if (open) closePalette();
        else openPalette();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, openPalette, closePalette]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === "Enter" && flatItems[activeIndex]) {
      selectItem(flatItems[activeIndex]);
    } else if (e.key === "Escape") {
      closePalette();
    }
  };

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-6 p-8">
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text font-bold text-2xl text-transparent">
          Command Palette
        </h2>
        <p className="text-default-500 text-sm">
          Press ⌘K or click the button below
        </p>
      </motion.div>

      {/* Trigger */}
      <motion.button
        type="button"
        onClick={openPalette}
        className="flex items-center gap-3 rounded-xl border border-default-200/60 bg-default-50 px-5 py-3 text-default-500 text-sm shadow-sm transition-colors hover:border-default-300 hover:bg-default-100"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Search className="h-4 w-4" />
        <span>Search commands...</span>
        <kbd className="ml-4 rounded-md border border-default-200 bg-default-100 px-2 py-0.5 font-mono text-default-400 text-xs">
          ⌘K
        </kbd>
      </motion.button>

      {/* Last action feedback */}
      <AnimatePresence>
        {lastAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2 text-emerald-600 text-sm"
          >
            <ArrowRight className="h-4 w-4" />
            <span>Executed: {lastAction}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Palette overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePalette}
            />
            {/* Palette */}
            <motion.div
              className="fixed top-[20%] left-1/2 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-default-200/60 bg-background shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-default-200/60 border-b px-4 py-3">
                <Search className="h-5 w-5 text-default-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent text-default-900 text-sm outline-none placeholder:text-default-400"
                />
                <kbd className="rounded border border-default-200 bg-default-100 px-1.5 py-0.5 font-mono text-default-400 text-xs">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="px-4 py-8 text-center text-default-400 text-sm">
                    No results found
                  </p>
                ) : (
                  groups.map(([group, groupItems]) => (
                    <div key={group}>
                      <p className="px-4 pt-2 pb-1 text-default-400 text-xs font-medium uppercase tracking-wider">
                        {group}
                      </p>
                      {groupItems.map((item) => {
                        const globalIdx = flatItems.indexOf(item);
                        const isActive = globalIdx === activeIndex;
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={item.id}
                            type="button"
                            onClick={() => selectItem(item)}
                            onMouseEnter={() => setActiveIndex(globalIdx)}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                              isActive
                                ? "bg-default-100 text-default-900"
                                : "text-default-600 hover:bg-default-50"
                            }`}
                            layout
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Icon className={`h-4 w-4 ${isActive ? "text-blue-500" : "text-default-400"}`} />
                            <span className="flex-1">{item.label}</span>
                            {item.shortcut && (
                              <span className="text-default-400 text-xs font-mono">
                                {item.shortcut}
                              </span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 border-default-200/60 border-t px-4 py-2 text-default-400 text-xs">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-default-200 bg-default-100 px-1 font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-default-200 bg-default-100 px-1 font-mono">↵</kbd>
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-default-200 bg-default-100 px-1 font-mono">esc</kbd>
                  close
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Verify it renders**

Run: `bun run dev`
Open palette, test keyboard navigation, type to filter, press Escape.

- [ ] **Step 3: Commit**

```bash
git add src/components/command-palette-demo.tsx
git commit -m "feat: add command palette demo component"
```

---

### Task 3: Swipeable Card Stack Demo

**Files:**
- Create: `src/components/swipe-cards-demo.tsx`

- [ ] **Step 1: Create the swipeable card stack demo component**

```tsx
// src/components/swipe-cards-demo.tsx
import {
  type PanInfo,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Heart, RotateCcw, X } from "lucide-react";
import { useState } from "react";

type Card = {
  id: number;
  name: string;
  role: string;
  bio: string;
  gradient: string;
  initials: string;
};

const cardData: Card[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Design Engineer",
    bio: "Crafting interfaces that feel like magic. Obsessed with micro-interactions.",
    gradient: "from-violet-500 to-purple-600",
    initials: "AC",
  },
  {
    id: 2,
    name: "Mia Rodriguez",
    role: "Creative Director",
    bio: "Turning wild ideas into polished products. Brand storytelling enthusiast.",
    gradient: "from-pink-500 to-rose-600",
    initials: "MR",
  },
  {
    id: 3,
    name: "Jordan Lee",
    role: "Motion Designer",
    bio: "If it doesn't move, it's not done yet. Spring physics advocate.",
    gradient: "from-cyan-500 to-blue-600",
    initials: "JL",
  },
  {
    id: 4,
    name: "Sam Patel",
    role: "Frontend Architect",
    bio: "Making the web faster, one component at a time. Performance nerd.",
    gradient: "from-amber-500 to-orange-600",
    initials: "SP",
  },
  {
    id: 5,
    name: "Riley Kim",
    role: "UX Researcher",
    bio: "Understanding people to build better products. Data-driven empathy.",
    gradient: "from-emerald-500 to-green-600",
    initials: "RK",
  },
];

const SWIPE_THRESHOLD = 120;

function SwipeCard({
  card,
  isTop,
  stackIndex,
  onSwipe,
}: {
  card: Card;
  isTop: boolean;
  stackIndex: number;
  onSwipe: (direction: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe("right");
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      className="absolute h-[380px] w-[300px] cursor-grab active:cursor-grabbing"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 10 - stackIndex,
      }}
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{
        scale: 1 - stackIndex * 0.05,
        y: stackIndex * 12,
        opacity: stackIndex > 2 ? 0 : 1,
      }}
      exit={{
        x: x.get() > 0 ? 300 : -300,
        rotate: x.get() > 0 ? 20 : -20,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-default-200/60 bg-background shadow-xl">
        {/* Like / Nope stamps */}
        {isTop && (
          <>
            <motion.div
              className="absolute top-6 left-6 z-20 rounded-lg border-2 border-emerald-500 px-3 py-1 font-bold text-emerald-500 text-lg"
              style={{ opacity: likeOpacity, rotate: -12 }}
            >
              LIKE
            </motion.div>
            <motion.div
              className="absolute top-6 right-6 z-20 rounded-lg border-2 border-red-500 px-3 py-1 font-bold text-lg text-red-500"
              style={{ opacity: nopeOpacity, rotate: 12 }}
            >
              NOPE
            </motion.div>
          </>
        )}

        {/* Avatar area */}
        <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${card.gradient}`}>
          <span className="font-bold text-5xl text-white/90">{card.initials}</span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-bold text-default-900 text-xl">{card.name}</h3>
          <p className="mb-3 text-default-500 text-sm">{card.role}</p>
          <p className="flex-1 text-default-600 text-sm leading-relaxed">{card.bio}</p>
          <div className="mt-3 flex gap-2">
            {["Creative", "Driven"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-default-100 px-3 py-1 text-default-600 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SwipeCardsDemo() {
  const [cards, setCards] = useState(cardData);

  const handleSwipe = () => {
    setCards((prev) => prev.slice(1));
  };

  const resetCards = () => {
    setCards(cardData);
  };

  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center gap-8 p-8">
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-bold text-2xl text-transparent">
          Swipe Cards
        </h2>
        <p className="text-default-500 text-sm">
          Drag to swipe left or right
        </p>
      </motion.div>

      {/* Card stack */}
      <div className="relative h-[380px] w-[300px]">
        <AnimatePresence>
          {cards.map((card, i) => (
            <SwipeCard
              key={card.id}
              card={card}
              isTop={i === 0}
              stackIndex={i}
              onSwipe={handleSwipe}
            />
          ))}
        </AnimatePresence>

        {cards.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex h-full flex-col items-center justify-center text-center"
          >
            <p className="mb-4 text-default-400 text-lg">No more cards!</p>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          type="button"
          onClick={() => handleSwipe()}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500 shadow-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={cards.length === 0}
        >
          <X className="h-6 w-6" />
        </motion.button>
        <motion.button
          type="button"
          onClick={resetCards}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-default-200 bg-default-50 text-default-500 shadow-sm"
          whileHover={{ scale: 1.1, rotate: -180 }}
          whileTap={{ scale: 0.9 }}
        >
          <RotateCcw className="h-4 w-4" />
        </motion.button>
        <motion.button
          type="button"
          onClick={() => handleSwipe()}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-500 shadow-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={cards.length === 0}
        >
          <Heart className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it renders**

Run: `bun run dev`
Drag the top card left/right, check stamps appear, verify cards restack.

- [ ] **Step 3: Commit**

```bash
git add src/components/swipe-cards-demo.tsx
git commit -m "feat: add swipeable card stack demo component"
```

---

### Task 4: Toast Notification System

**Files:**
- Create: `src/components/ui/toast.tsx`
- Create: `src/components/toast-demo.tsx`

- [ ] **Step 1: Create the toast UI primitive**

```tsx
// src/components/ui/toast.tsx
import { AnimatePresence, type PanInfo, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  type LucideIcon,
  X,
  XCircle,
} from "lucide-react";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

type Toast = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
};

type ToastContextValue = {
  addToast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const variantConfig: Record<
  ToastVariant,
  { icon: LucideIcon; iconColor: string; progressColor: string; bg: string }
> = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    progressColor: "bg-emerald-500",
    bg: "border-emerald-500/20",
  },
  error: {
    icon: XCircle,
    iconColor: "text-red-500",
    progressColor: "bg-red-500",
    bg: "border-red-500/20",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    progressColor: "bg-amber-500",
    bg: "border-amber-500/20",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-500",
    progressColor: "bg-blue-500",
    bg: "border-blue-500/20",
  },
};

const MAX_VISIBLE = 4;

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const config = variantConfig[toast.variant];
  const Icon = config.icon;
  const duration = toast.duration ?? 4000;
  const [progress, setProgress] = useState(100);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        onRemove(toast.id);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, toast.id, onRemove]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 80) onRemove(toast.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.2 } }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      className={`relative w-80 overflow-hidden rounded-xl border bg-background shadow-lg ${config.bg}`}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-default-900 text-sm">{toast.title}</p>
          {toast.description && (
            <p className="mt-0.5 text-default-500 text-xs">{toast.description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onRemove(toast.id)}
          className="text-default-400 hover:text-default-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-0.5 w-full bg-default-100">
        <motion.div
          className={`h-full ${config.progressColor}`}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0 }}
        />
      </div>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = useRef(0);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast-${++counter.current}`;
    setToasts((prev) => {
      const next = [...prev, { ...toast, id }];
      return next.slice(-MAX_VISIBLE);
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div className="pointer-events-none absolute right-4 bottom-4 z-50 flex flex-col-reverse gap-2">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem toast={toast} onRemove={removeToast} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
```

- [ ] **Step 2: Create the toast demo component**

```tsx
// src/components/toast-demo.tsx
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { ToastProvider, useToast } from "./ui/toast";

function ToastControls() {
  const { addToast } = useToast();

  const triggers = [
    {
      variant: "success" as const,
      label: "Success",
      title: "Changes saved",
      description: "Your profile has been updated successfully.",
      icon: CheckCircle2,
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20",
    },
    {
      variant: "error" as const,
      label: "Error",
      title: "Upload failed",
      description: "The file exceeds the maximum size limit.",
      icon: XCircle,
      color: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20",
    },
    {
      variant: "warning" as const,
      label: "Warning",
      title: "Storage almost full",
      description: "You've used 90% of your available storage.",
      icon: AlertTriangle,
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20",
    },
    {
      variant: "info" as const,
      label: "Info",
      title: "New update available",
      description: "Version 2.4.0 is ready to install.",
      icon: Info,
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20",
    },
  ];

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <h2 className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text font-bold text-2xl text-transparent">
          Toast Notifications
        </h2>
        <p className="text-default-500 text-sm">
          Click to trigger — swipe right to dismiss
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {triggers.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.variant}
              type="button"
              onClick={() =>
                addToast({
                  variant: t.variant,
                  title: t.title,
                  description: t.description,
                })
              }
              className={`flex items-center gap-2.5 rounded-xl border px-5 py-3 text-sm font-medium transition-colors ${t.color}`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ToastDemo() {
  return (
    <ToastProvider>
      <ToastControls />
    </ToastProvider>
  );
}
```

- [ ] **Step 3: Verify both render**

Run: `bun run dev`
Click each variant button, verify toasts appear bottom-right, auto-dismiss, swipe to dismiss.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/toast.tsx src/components/toast-demo.tsx
git commit -m "feat: add toast notification system with demo"
```

---

### Task 5: Gravity Simulation Demo

**Files:**
- Create: `src/components/gravity-demo.tsx`

- [ ] **Step 1: Create the gravity simulation demo component**

```tsx
// src/components/gravity-demo.tsx
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glow: string;
};

const GRAVITY = 0.3;
const DAMPING = 0.7;
const MAX_ORBS = 50;
const ATTRACTION_STRENGTH = 0.08;

const colors = [
  { fill: "#a855f7", glow: "rgba(168,85,247,0.4)" },
  { fill: "#ec4899", glow: "rgba(236,72,153,0.4)" },
  { fill: "#3b82f6", glow: "rgba(59,130,246,0.4)" },
  { fill: "#10b981", glow: "rgba(16,185,129,0.4)" },
  { fill: "#f59e0b", glow: "rgba(245,158,11,0.4)" },
  { fill: "#06b6d4", glow: "rgba(6,182,212,0.4)" },
  { fill: "#ef4444", glow: "rgba(239,68,68,0.4)" },
];

export function GravityDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, down: false });
  const rafRef = useRef<number>(0);
  const [orbCount, setOrbCount] = useState(0);

  const spawnOrb = useCallback((x: number, y: number) => {
    if (orbsRef.current.length >= MAX_ORBS) return;
    const c = colors[Math.floor(Math.random() * colors.length)];
    orbsRef.current.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 2 - 2,
      radius: 8 + Math.random() * 14,
      color: c.fill,
      glow: c.glow,
    });
    setOrbCount(orbsRef.current.length);
  }, []);

  const reset = useCallback(() => {
    orbsRef.current = [];
    setOrbCount(0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement!);

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      spawnOrb(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseDown = () => {
      mouseRef.current.down = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.down = false;
    };

    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    const animate = () => {
      const { width, height } = canvas;

      // Semi-transparent clear for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      for (const orb of orbsRef.current) {
        // Gravity
        orb.vy += GRAVITY;

        // Mouse attraction
        if (mouseRef.current.down) {
          const dx = mouseRef.current.x - orb.x;
          const dy = mouseRef.current.y - orb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 1) {
            orb.vx += (dx / dist) * ATTRACTION_STRENGTH * Math.min(100, 5000 / dist);
            orb.vy += (dy / dist) * ATTRACTION_STRENGTH * Math.min(100, 5000 / dist);
          }
        }

        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Wall bounce
        if (orb.x - orb.radius < 0) {
          orb.x = orb.radius;
          orb.vx *= -DAMPING;
        }
        if (orb.x + orb.radius > width) {
          orb.x = width - orb.radius;
          orb.vx *= -DAMPING;
        }
        if (orb.y - orb.radius < 0) {
          orb.y = orb.radius;
          orb.vy *= -DAMPING;
        }
        if (orb.y + orb.radius > height) {
          orb.y = height - orb.radius;
          orb.vy *= -DAMPING;
        }

        // Draw glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = orb.glow;

        // Draw orb with gradient
        const gradient = ctx.createRadialGradient(
          orb.x - orb.radius * 0.3,
          orb.y - orb.radius * 0.3,
          0,
          orb.x,
          orb.y,
          orb.radius,
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.3)");
        gradient.addColorStop(0.5, orb.color);
        gradient.addColorStop(1, orb.color + "88");

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [spawnOrb]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* Overlay UI */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <motion.button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-white/80 text-xs backdrop-blur-sm transition-colors hover:bg-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </motion.button>
        <span className="rounded-lg bg-white/10 px-3 py-1.5 text-white/60 text-xs backdrop-blur-sm">
          {orbCount} / {MAX_ORBS}
        </span>
      </div>

      {/* Instructions */}
      <motion.div
        className="absolute right-4 bottom-4 z-10 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/50 text-xs">Click to spawn orbs</p>
        <p className="text-white/50 text-xs">Hold mouse to attract</p>
      </motion.div>

      {/* Title */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: orbCount > 0 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold text-3xl text-transparent">
          Gravity
        </h2>
        <p className="text-white/40 text-sm">Click anywhere to begin</p>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it renders**

Run: `bun run dev`
Click canvas to spawn orbs, hold mouse to attract, check wall bouncing and trail effect.

- [ ] **Step 3: Commit**

```bash
git add src/components/gravity-demo.tsx
git commit -m "feat: add gravity simulation demo component"
```

---

### Task 6: Register All 5 Components in Data

**Files:**
- Modify: `src/data/components.tsx`

- [ ] **Step 1: Add imports at the top of the file**

Add these imports after the existing import block at the top of `src/data/components.tsx`:

```tsx
import { MagneticDockDemo } from "@/components/magnetic-dock-demo";
import { CommandPaletteDemo } from "@/components/command-palette-demo";
import { SwipeCardsDemo } from "@/components/swipe-cards-demo";
import { ToastDemo } from "@/components/toast-demo";
import { GravityDemo } from "@/components/gravity-demo";
```

- [ ] **Step 2: Add all 5 component entries to the components array**

Append these 5 entries to the end of the `components` array (before the closing `];`):

```tsx
	{
		id: "magnetic-dock",
		title: "Magnetic Dock",
		description:
			"macOS-style dock with magnification effect — icons scale up with spring physics as cursor approaches",
		category: "animation",
		component: MagneticDockDemo,
		tags: ["animation", "dock", "hover", "spring", "mouse"],
		code: [
			{
				filename: "magnetic-dock-demo.tsx",
				language: "tsx",
				code: `PLACEHOLDER_MAGNETIC_DOCK`,
			},
		],
	},
	{
		id: "command-palette",
		title: "Command Palette",
		description:
			"⌘K spotlight-style command palette with fuzzy search, keyboard navigation, and animated transitions",
		category: "navigation",
		component: CommandPaletteDemo,
		tags: ["search", "keyboard", "overlay", "navigation", "spotlight"],
		code: [
			{
				filename: "command-palette-demo.tsx",
				language: "tsx",
				code: `PLACEHOLDER_COMMAND_PALETTE`,
			},
		],
	},
	{
		id: "swipe-cards",
		title: "Swipeable Card Stack",
		description:
			"Tinder-style card stack with drag-to-swipe gestures, rotation physics, like/nope stamps, and velocity-based dismissal",
		category: "data-display",
		component: SwipeCardsDemo,
		tags: ["gesture", "drag", "cards", "spring", "swipe"],
		code: [
			{
				filename: "swipe-cards-demo.tsx",
				language: "tsx",
				code: `PLACEHOLDER_SWIPE_CARDS`,
			},
		],
	},
	{
		id: "toast-notifications",
		title: "Toast Notifications",
		description:
			"Stackable toast system with slide-in animation, auto-dismiss progress bar, swipe-to-dismiss, and 4 variants",
		category: "feedback",
		component: ToastDemo,
		tags: ["notification", "toast", "animation", "feedback", "alert"],
		code: [
			{
				filename: "toast-demo.tsx",
				language: "tsx",
				code: `PLACEHOLDER_TOAST_DEMO`,
			},
			{
				filename: "ui/toast.tsx",
				language: "tsx",
				code: `PLACEHOLDER_TOAST_UI`,
			},
		],
	},
	{
		id: "gravity-simulation",
		title: "Gravity Simulation",
		description:
			"Interactive canvas-based physics with spawnable orbs, gravity, wall bouncing, mouse attraction, and glow trails",
		category: "animation",
		component: GravityDemo,
		tags: ["canvas", "physics", "interactive", "gravity", "particles"],
		code: [
			{
				filename: "gravity-demo.tsx",
				language: "tsx",
				code: `PLACEHOLDER_GRAVITY`,
			},
		],
	},
```

**Important:** The `PLACEHOLDER_*` strings must be replaced with the actual source code from each component file. Copy the full file contents as a template literal string. Follow the pattern used by existing entries (e.g., the `tree-view` or `animated-tabs` entries which inline the full source).

- [ ] **Step 3: Replace placeholder code strings with actual source**

For each of the 5 entries, read the corresponding source file and replace `PLACEHOLDER_*` with the actual code as a template literal. Match the existing pattern — the code field contains the full implementation.

- [ ] **Step 4: Verify the full app renders**

Run: `bun run dev`
- All 5 new components appear in their respective categories
- Component count in hero text updated (should show 27)
- Each card opens a dialog with working demo and code viewer
- Category filters work correctly

- [ ] **Step 5: Commit**

```bash
git add src/data/components.tsx
git commit -m "feat: register all 5 new showcases in component data"
```

---

### Task 7: Final Verification & Polish

- [ ] **Step 1: Run the build to check for type errors**

Run: `bun run build`
Expected: Clean build with no TypeScript errors.

- [ ] **Step 2: Run linter**

Run: `bun run lint`
Expected: No errors. Fix any issues found.

- [ ] **Step 3: Visual verification in browser**

Run: `bun run dev`
Check each showcase:
1. **Magnetic Dock** — icons magnify on hover, spring back, tooltips show
2. **Command Palette** — ⌘K opens, type to filter, arrows to navigate, Enter selects, Esc closes
3. **Swipe Cards** — drag top card, stamps appear, card flies off, reset works
4. **Toasts** — all 4 variants fire, progress bar shrinks, swipe to dismiss, max 4 visible
5. **Gravity** — click spawns orbs, gravity pulls down, walls bounce, hold to attract, reset clears

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "polish: fix issues found during showcase verification"
```

(Skip this step if no fixes needed.)
