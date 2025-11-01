# UI Component Showcase

My personal collection of interactive UI components featuring smooth animations, live previews, and syntax-highlighted code examples. This project demonstrates my approach to building beautiful, reusable components with modern web technologies.

## ✨ Features

- **Interactive Component Gallery** - Browse components organized by categories (Navigation, Animation, Data Display)
- **Live Previews** - See each component in action with real-time interactions
- **Code Viewer** - Syntax-highlighted code with one-click copy functionality and file tabs
- **Multi-File Support** - View component implementations across multiple files with smooth transitions
- **Smooth Animations** - Buttery-smooth transitions powered by Framer Motion with spring physics
- **Morphing Dialogs** - Shared layout animations that morph cards into full-screen dialogs
- **Responsive Design** - Beautiful on all screen sizes with optimized touch interactions
- **Type-Safe** - Fully typed with TypeScript for better developer experience

## 🎯 About This Project

This is my personal showcase for UI components I've built and designed. It serves as:

- A **portfolio piece** demonstrating my UI/UX development skills
- A **living library** of reusable components I've created
- An **interactive demo** of my work with modern React and animation techniques
- A **reference** for my component design patterns and code quality

## 🛠️ Technologies Used

- [Vite](https://vitejs.dev/guide/) - Lightning-fast build tool
- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) - Type-safe component development
- [HeroUI](https://heroui.com) - Beautiful UI component library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first styling
- [Framer Motion](https://www.framer.com/motion) - Smooth animations
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Code highlighting

## 🚀 Running Locally

Want to explore the code or see how it works? Here's how to run it:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to see the showcase in action!

## 💡 Technical Highlights

This project demonstrates several advanced React and animation techniques:

- **Shared Layout Animations** - Using Framer Motion's `layoutId` to create seamless morphing transitions between components
- **Dynamic Height Measurement** - Automatic content height calculation with `ResizeObserver` for smooth tab transitions
- **AnimatePresence Management** - Proper cleanup and exit animations with `mode="wait"` to prevent DOM leaks
- **Spring Physics** - Natural, physics-based animations using spring configurations for realistic motion
- **Overflow Management** - Careful handling of `overflow` properties to prevent unwanted scrolling during animations
- **Type-Safe Component Registry** - Centralized component data with full TypeScript support
- **Code Synchronization** - Component code examples that exactly match the live implementations

## 🏗️ How It's Built

### Tech Stack

- **[Vite](https://vitejs.dev/guide/)** - Lightning-fast build tool
- **[React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)** - Type-safe component development
- **[HeroUI](https://heroui.com)** - Beautiful UI component library
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first styling
- **[Framer Motion](https://www.framer.com/motion)** - Smooth animations
- **[React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** - Code highlighting

### Project Structure

```text
src/
├── components/
│   ├── component-card.tsx              # Animated card for each component
│   ├── component-dialog.tsx            # Standard modal for viewing components
│   ├── animated-component-dialog.tsx   # Morphing dialog with shared layout animations
│   ├── code-viewer.tsx                 # Syntax-highlighted code display with file tabs
│   ├── *-demo.tsx                      # Demo components for each UI component
│   └── ui/                             # Reusable UI components library
│       ├── animated-tabs.tsx           # Animated tabs with dynamic height
│       ├── animated-dialog.tsx         # Morphing dialog primitives
│       ├── button-to-dialog.tsx        # Button-to-dialog transformation
│       ├── streaming-code.tsx          # Streaming code animation
│       ├── animated-number.tsx         # Slot machine number counter
│       ├── split-text.tsx              # Character-by-character text animation
│       └── animated-list.tsx           # Animated list with enter/exit animations
├── data/
│   └── components.tsx                  # Component registry with code examples
├── pages/
│   └── index.tsx                       # Main landing page
└── types/
    └── component.ts                    # TypeScript type definitions
```

## 🎨 Featured Components

### Navigation

- **Animated Tabs** - Smooth animated tabs with dynamic height adjustment and swipe transitions. Features spring-based physics, automatic content height measurement, and seamless slide animations between tabs.

### Animation

- **Animated Dialog** - Smooth morphing dialog that transitions from a button with shared layout animations. Includes backdrop blur, spring physics, and staggered content animations inspired by Family's design patterns.

- **Button to Dialog** - Destructive action button that morphs into a warning dialog with smooth layout animations. The button stays in place during the transformation, creating a seamless confirmation flow.

- **Streaming Code** - Animated code display that types out character by character with syntax highlighting. Features a blinking cursor, configurable typing speed, and smooth reveal animations.

- **Slot Machine Number Counter** - Animated number counter with slot machine-style rolling digits. Features smooth spring animations, stable keys for seamless transitions, and support for growing numbers. Includes a petrol station pump demo with press-and-hold interaction.

- **Split Text Animation** - Text animation that splits into individual characters with staggered spring animations. Perfect for creating eye-catching text reveals and transitions.

### Data Display

- **Animated Task List** - Modern task list with smooth enter/exit animations using lucide-react icons. Features spring physics, layout animations, and elegant hover states with swipe-to-delete functionality.

_More components being added regularly as I build them!_

## 📄 License

Licensed under the [MIT license](https://github.com/heroui-inc/vite-template/blob/main/LICENSE).
