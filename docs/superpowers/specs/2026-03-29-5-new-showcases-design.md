# 5 New UI Showcases — Design Spec

**Date:** 2026-03-29
**Goal:** Add 5 new animated/interactive showcases to the UI demo, spanning all 4 categories.

## Architecture

Each showcase follows the existing project pattern:
- **Demo component** in `src/components/<name>-demo.tsx` — self-contained, renders inside the card/dialog preview
- **UI primitive** (optional) in `src/components/ui/<name>.tsx` — only when the component is reusable
- **Registration** in `src/data/components.tsx` — with id, title, description, category, tags, and inline code samples
- **Dependencies:** React 19, Framer Motion, Tailwind CSS 4, Lucide React icons. Canvas API for the gravity sim. No new packages.

---

## 1. Magnetic Dock

- **Category:** `animation`
- **Files:** `src/components/magnetic-dock-demo.tsx`
- **Description:** macOS-style dock with magnification effect — icons scale up as the cursor approaches, with neighboring icons also scaling for a spread effect.

### Behavior
- 6–8 app icons rendered horizontally in a dock bar at the center
- Track mouse X position relative to the dock
- For each icon, compute distance from cursor → map to scale factor (max ~1.8x at cursor, tapering to 1x beyond a threshold)
- Spring physics via Framer Motion for smooth transitions
- Tooltip label animates up on hover (opacity + translateY)
- Icons use Lucide icons (e.g., Music, Camera, Mail, Settings, Calendar, Globe, Terminal, Palette)
- Dock bar has a subtle glass/blur background

### No separate UI primitive — single demo file.

---

## 2. Command Palette (⌘K)

- **Category:** `navigation`
- **Files:** `src/components/command-palette-demo.tsx`
- **Description:** Spotlight-style search overlay with fuzzy filtering, keyboard navigation, grouped results, and animated item transitions.

### Behavior
- Trigger: "Press ⌘K" styled button in the demo area (actual ⌘K keyboard shortcut also works within the demo)
- Overlay: centered modal with backdrop blur, animates in with scale + opacity
- Search input at top, auto-focused
- Results grouped into sections: "Navigation", "Actions", "Settings" (3–4 items each)
- Fuzzy text matching — filter items as user types
- Keyboard navigation: ↑↓ to move highlight, Enter to select, Esc to close
- AnimatePresence for smooth item enter/exit as filter changes
- On select: close palette, show brief confirmation text in the demo area
- Each item has an icon (Lucide) + label + optional shortcut badge

### No separate UI primitive — single demo file.

---

## 3. Swipeable Card Stack

- **Category:** `data-display`
- **Files:** `src/components/swipe-cards-demo.tsx`
- **Description:** Tinder-style card stack with drag-to-swipe gestures, spring physics, rotation, and velocity-based dismissal.

### Behavior
- Stack of 5 cards with profile-like content (avatar placeholder, name, description, tags)
- Only top card is draggable
- Drag mechanics:
  - Rotation follows drag X via `useTransform` (dragging right → clockwise tilt, left → counter-clockwise)
  - "Like" / "Nope" indicator fades in based on drag direction (opacity mapped to dragX)
  - Release threshold: if |dragX| > 150px, card flies off-screen with exit velocity; otherwise springs back
- Background cards:
  - Stacked with decreasing scale and increasing Y offset
  - When top card exits, next card animates up (scale 0.95→1, y offset→0)
- Reset button to bring all cards back with staggered entrance animation
- Cards use gradient backgrounds to distinguish them

---

## 4. Animated Toast Notifications

- **Category:** `feedback`
- **Files:** `src/components/toast-demo.tsx`, `src/components/ui/toast.tsx`
- **Description:** Stackable notification toasts with slide-in animation, auto-dismiss progress bar, and layout reflow.

### UI Primitive (`ui/toast.tsx`)
- `ToastProvider` + `useToast()` hook pattern
- Toast item component with:
  - 4 variants: success (green), error (red), warning (amber), info (blue)
  - Icon per variant (CheckCircle, XCircle, AlertTriangle, Info from Lucide)
  - Title + optional description
  - Close button (X)
  - Shrinking progress bar for auto-dismiss timer (default 4s)
  - Swipe right to dismiss (drag gesture)
- Container: fixed bottom-right, toasts stack upward
- Layout animation via Framer Motion for smooth reflow when a toast is removed
- Max 4 visible toasts; older ones exit to make room

### Demo (`toast-demo.tsx`)
- 4 buttons to fire each variant
- Each button triggers a toast with sample title/description

---

## 5. Interactive Gravity Simulation

- **Category:** `animation`
- **Files:** `src/components/gravity-demo.tsx`
- **Description:** Canvas-based physics simulation — click to spawn colorful orbs that fall with gravity, bounce off walls, and are attracted to the mouse.

### Behavior
- HTML Canvas element filling the demo area
- Click anywhere to spawn an orb at that position with random color and slight random velocity
- Physics per frame (requestAnimationFrame):
  - Gravity: constant downward acceleration
  - Wall collision: bounce off all 4 edges with damping (0.7 restitution)
  - Mouse attraction: when mouse is held down, orbs accelerate toward cursor position
- Visual effects:
  - Each orb has a radial gradient fill for depth
  - Subtle glow via canvas `shadowBlur`
  - Short motion trail via semi-transparent canvas clear (fillRect with alpha instead of clearRect)
- Controls: "Reset" button to clear all orbs, orb count display
- Spawn limit: max ~50 orbs for performance
- No Framer Motion — pure Canvas API + requestAnimationFrame

---

## Category Distribution

| # | Showcase | Category | Tags |
|---|----------|----------|------|
| 1 | Magnetic Dock | animation | animation, dock, hover, spring |
| 2 | Command Palette | navigation | search, keyboard, overlay |
| 3 | Swipeable Card Stack | data-display | gesture, drag, cards, spring |
| 4 | Animated Toasts | feedback | notification, toast, animation |
| 5 | Gravity Simulation | animation | canvas, physics, interactive |

## Registration

Each component is added to `src/data/components.tsx` following the existing `ComponentItem` shape with inline code samples matching the actual implementation.

## No New Dependencies

All 5 showcases use only what's already in `package.json`:
- `framer-motion` (springs, drag, AnimatePresence, layout)
- `lucide-react` (icons)
- `react` / `react-dom` (hooks, state, refs)
- Canvas API (native, for gravity sim)
