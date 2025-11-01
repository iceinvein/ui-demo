# UI Component Showcase

An awesome landing page showcasing UI components with beautiful animations and interactive demos.

## Features

- **Categorized Components**: Components organized by categories (Navigation, Feedback, Data Display, etc.)
- **Animated Cards**: Each component card features smooth hover animations and staggered loading animations
- **Interactive Dialog**: Click any card to open a full-screen dialog with:
  - Live component preview
  - Syntax-highlighted code view with line numbers
  - Multi-file support with file tabs
  - One-click copy to clipboard
  - Smooth tab transitions
- **Motion Animations**: Built with Framer Motion for buttery-smooth animations
- **Responsive Design**: Works beautifully on all screen sizes

## Project Structure

```
src/
├── components/
│   ├── component-card.tsx       # Animated card component
│   ├── component-dialog.tsx     # Dialog for viewing components
│   ├── animated-tabs-demo.tsx   # Demo of animated tabs
│   └── ui/
│       └── animated-tabs.tsx    # Animated tabs component
├── data/
│   └── components.tsx           # Component registry
├── types/
│   └── component.ts             # TypeScript types
└── pages/
    └── index.tsx                # Main landing page
```

## Adding New Components

To add a new component to the showcase:

1. Create your component demo in `src/components/`
2. Add it to the registry in `src/data/components.tsx`:

```tsx
{
  id: "your-component",
  title: "Your Component",
  description: "A brief description",
  category: "navigation", // or "feedback", "data-display"
  component: YourComponentDemo,
  tags: ["animation", "interactive"],
  // Single file
  code: `// Your component code here`,
  // OR multiple files
  code: [
    {
      filename: "component.tsx",
      language: "tsx",
      code: `// Your component code`,
    },
    {
      filename: "styles.css",
      language: "css",
      code: `/* Your styles */`,
    },
  ],
}
```

3. The component will automatically appear on the landing page!

## Current Components

- **Animated Tabs**: Smooth animated tabs with dynamic height adjustment and swipe transitions

## Technologies

- React + TypeScript
- Framer Motion for animations
- HeroUI for UI components
- Tailwind CSS for styling
- React Syntax Highlighter for code display
- Vite for build tooling
