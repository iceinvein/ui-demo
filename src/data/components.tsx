import { AnimatedDialogDemo } from "@/components/animated-dialog-demo";
import { AnimatedTabsDemo } from "@/components/animated-tabs-demo";
import { ButtonToDialogDemo } from "@/components/button-to-dialog-demo";
import { StreamingCodeDemo } from "@/components/streaming-code-demo";
import type { Category, ComponentItem } from "@/types/component";

export const categories: Category[] = [
	{
		id: "navigation",
		name: "Navigation",
		description: "Components for navigation and routing",
	},
	{
		id: "feedback",
		name: "Feedback",
		description: "Components for user feedback and notifications",
	},
	{
		id: "data-display",
		name: "Data Display",
		description: "Components for displaying data and content",
	},
	{
		id: "animation",
		name: "Animation",
		description: "Components with animations and transitions",
	},
];

export const components: ComponentItem[] = [
	{
		id: "animated-tabs",
		title: "Animated Tabs",
		description:
			"Smooth animated tabs with dynamic height adjustment and swipe transitions",
		category: "navigation",
		component: AnimatedTabsDemo,
		tags: ["animation", "tabs", "navigation"],
		code: [
			{
				filename: "animated-tabs-demo.tsx",
				language: "tsx",
				code: `import { AnimatedTabs, type AnimatedTab } from "./ui/animated-tabs";

export function AnimatedTabsDemo() {
  const tabs: AnimatedTab[] = [
    {
      id: "overview",
      label: "Overview",
      color: "#3b82f6",
      content: (
        <>
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 rounded-full bg-blue-500" />
            <h3 className="m-0 text-xl font-semibold">Project Overview</h3>
          </div>
          <p className="text-default-500">
            Welcome to your project dashboard. Track progress and collaborate.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-xs font-medium text-blue-900">Active Tasks</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <div className="rounded-lg bg-green-50 p-3">
              <p className="text-xs font-medium text-green-900">Completed</p>
              <p className="text-2xl font-bold text-green-600">156</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "team",
      label: "Team",
      color: "#ec4899",
      content: (
        <>
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 rounded-full bg-pink-500" />
            <h3 className="m-0 text-xl font-semibold">Team Members</h3>
          </div>
          <p className="text-default-500">
            Collaborate with 12 team members across 3 departments.
          </p>
        </>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      color: "#8b5cf6",
      content: (
        <>
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 rounded-full bg-purple-500" />
            <h3 className="m-0 text-xl font-semibold">Performance Analytics</h3>
          </div>
          <p className="text-default-500">
            Monitor metrics and track key performance indicators.
          </p>
          <p className="mt-2 text-sm text-default-500">
            Notice how the container smoothly adjusts to fit content.
          </p>
        </>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      color: "#f59e0b",
      content: (
        <>
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 rounded-full bg-amber-500" />
            <h3 className="m-0 text-xl font-semibold">Project Settings</h3>
          </div>
          <p className="text-default-500">
            Configure preferences and manage integrations.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-default-500">
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✓</span>
              Notifications enabled
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✓</span>
              Auto-save active
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="w-full max-w-md">
      <AnimatedTabs
        tabs={tabs}
        defaultTab="home"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        enableBlur={false}
        minHeight={150}
      />
    </div>
  );
}`,
			},
			{
				filename: "animated-tabs.tsx",
				language: "tsx",
				code: `import { motion, type Transition } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface AnimatedTab {
  id: string;
  label: string;
  content: React.ReactNode;
  color?: string;
}

export interface AnimatedTabsProps {
  tabs: AnimatedTab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  transition?: Transition;
  enableBlur?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  onTabChange,
  transition = { type: "spring", stiffness: 300, damping: 30 },
  enableBlur = false,
  minHeight = 200,
  maxHeight,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [contentHeight, setContentHeight] = useState<number>(minHeight);
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  // Measure and update height when active tab changes
  useEffect(() => {
    const activeContent = contentRefs.current.get(activeTab);
    if (activeContent) {
      const measureHeight = () => {
        const rect = activeContent.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(activeContent);
        const marginTop = parseFloat(computedStyle.marginTop);
        const marginBottom = parseFloat(computedStyle.marginBottom);
        const parentPadding = 16;
        const totalHeight = rect.height + marginTop + marginBottom + parentPadding;
        
        let finalHeight = Math.max(totalHeight, minHeight);
        if (maxHeight) {
          finalHeight = Math.min(finalHeight, maxHeight);
        }
        setContentHeight(finalHeight);
      };

      const resizeObserver = new ResizeObserver(() => {
        measureHeight();
      });

      resizeObserver.observe(activeContent);
      requestAnimationFrame(() => {
        measureHeight();
      });

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [activeTab, minHeight, maxHeight]);

  return (
    <div className="flex w-full flex-col gap-2">
      {/* Content Container */}
      <motion.div
        className="relative w-full rounded-xl border border-default-200 bg-default-50/50 backdrop-blur-md"
        animate={{ height: contentHeight }}
        transition={transition}
        style={{ overflow: "hidden" }}
      >
        {tabs.map((tab, index) => {
          const offset = (index - activeIndex) * 100;
          const isActive = tab.id === activeTab;

          return (
            <motion.div
              key={tab.id}
              className="absolute top-0 right-0 left-0 h-full p-2"
              initial={false}
              animate={{
                x: \`\${offset}%\`,
                opacity: isActive ? 1 : 0,
                filter: enableBlur && !isActive ? "blur(4px)" : "blur(0px)",
              }}
              transition={transition}
              style={{
                transformOrigin: "center center",
                willChange: "transform, filter",
                isolation: "isolate",
                pointerEvents: isActive ? "auto" : "none",
                overflowY: maxHeight ? "auto" : "visible",
              }}
            >
              <div
                ref={(el) => {
                  if (el) {
                    contentRefs.current.set(tab.id, el);
                  }
                }}
                className="flex w-full flex-col gap-3 rounded-lg p-8"
              >
                {tab.content}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Tab Buttons */}
      <ul className="flex w-full gap-0 rounded-xl border border-default-200 bg-default-50/50 p-1 backdrop-blur-md">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <li key={tab.id} className="flex flex-1">
              <button
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className="relative w-full cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className="relative z-10"
                  style={{
                    color: isActive ? "white" : "var(--nextui-default-500)",
                  }}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-lg"
                    style={{
                      backgroundColor: tab.color || "var(--nextui-primary)",
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={transition}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}`,
			},
		],
	},
	{
		id: "animated-dialog",
		title: "Animated Dialog",
		description:
			"Smooth morphing dialog that transitions from a button with shared layout animations",
		category: "animation",
		component: AnimatedDialogDemo,
		tags: ["animation", "dialog", "modal", "layout"],
		code: [
			{
				filename: "animated-dialog-demo.tsx",
				language: "tsx",
				code: `import { useState } from "react";
import { motion } from "framer-motion";
import {
  AnimatedDialog,
  AnimatedDialogTrigger,
} from "./ui/animated-dialog";

export function AnimatedDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <AnimatedDialogTrigger
        layoutId="demo-dialog"
        isOpen={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <div className="text-center">
          <div className="mb-2 text-2xl">✨</div>
          <h3 className="font-semibold text-lg mb-2">Click to Open</h3>
          <p className="text-sm text-default-600">
            Watch the button morph into a dialog
          </p>
        </div>
      </AnimatedDialogTrigger>

      <AnimatedDialog
        layoutId="demo-dialog"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-default-200 bg-default-50/50 px-6 py-4 rounded-t-3xl">
            <div>
              <h2 className="text-2xl font-bold">Animated Dialog</h2>
              <p className="text-sm text-default-600">
                Smooth morphing transition
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-default-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-default-600">
                This dialog uses Framer Motion's layout animations with a shared layoutId.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatedDialog>
    </div>
  );
}`,
			},
			{
				filename: "animated-dialog.tsx",
				language: "tsx",
				code: `import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  layoutId: string;
}

export function AnimatedDialog({
  isOpen,
  onClose,
  children,
  layoutId,
}: AnimatedDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog - morphs from button */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              layoutId={layoutId}
              className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-3xl border border-default-200 bg-background shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

interface AnimatedDialogTriggerProps {
  onClick: () => void;
  children: ReactNode;
  layoutId: string;
  isOpen: boolean;
}

export function AnimatedDialogTrigger({
  onClick,
  children,
  layoutId,
  isOpen,
}: AnimatedDialogTriggerProps) {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          layoutId={layoutId}
          onClick={onClick}
          className="rounded-2xl border border-default-200 bg-gradient-to-br from-default-50 to-default-100 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
          whileHover={{
            y: -8,
            transition: { duration: 0.2 },
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {children}
        </motion.button>
      )}
    </AnimatePresence>
  );
}`,
			},
		],
	},
	{
		id: "button-to-dialog",
		title: "Button to Dialog",
		description:
			"Family-style button that morphs into a confirmation dialog with the button staying in place",
		category: "animation",
		component: ButtonToDialogDemo,
		tags: ["animation", "dialog", "button", "confirmation"],
		code: [
			{
				filename: "button-to-dialog-demo.tsx",
				language: "tsx",
				code: `import { useState } from "react";
import { ButtonToDialog } from "./ui/button-to-dialog";

export function ButtonToDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Account deleted!");
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <ButtonToDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        layoutId="delete-button"
        title="Delete Account"
        description="This action cannot be undone. All your data will be permanently removed from our servers."
        confirmText="Delete"
        cancelText="Cancel"
        triggerButton={
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="px-12 py-4 rounded-full bg-red-500 hover:bg-red-400 text-white font-semibold text-lg transition-colors"
          >
            Delete Account
          </button>
        }
      />
    </div>
  );
}`,
			},
			{
				filename: "button-to-dialog.tsx",
				language: "tsx",
				code: `import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface ButtonToDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  triggerButton: ReactNode;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  layoutId: string;
}

export function ButtonToDialog({
  isOpen,
  onClose,
  onConfirm,
  triggerButton,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  layoutId,
}: ButtonToDialogProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/80"
              onClick={onClose}
            />

            {/* Dialog Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={\`\${layoutId}-container\`}
                className="relative w-full max-w-md rounded-[32px] bg-zinc-900 border border-zinc-800 shadow-2xl pointer-events-auto overflow-hidden"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                }}
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 transition-colors z-10"
                  aria-label="Close dialog"
                >
                  <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15 }}
                  className="px-8 pt-12 pb-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-xl">⚠</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-white">{title}</h2>
                  </div>
                  <p className="text-zinc-400 text-base mb-8">{description}</p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-3 px-6 pb-6"
                >
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors"
                  >
                    {cancelText}
                  </button>

                  {/* Confirm Button - shares layoutId with trigger */}
                  <motion.button
                    layoutId={layoutId}
                    type="button"
                    onClick={onConfirm}
                    className="flex-1 px-6 py-4 rounded-full bg-red-500 hover:bg-red-400 text-white font-medium transition-colors"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {confirmText}
                    </motion.span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            layoutId={\`\${layoutId}-container\`}
            className="inline-block rounded-full"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
            }}
          >
            <motion.div
              layoutId={layoutId}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
              }}
            >
              {triggerButton}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}`,
			},
		],
	},
	{
		id: "streaming-code",
		title: "Streaming Code",
		description:
			"Animated code display that types out line by line with a blinking cursor",
		category: "animation",
		component: StreamingCodeDemo,
		tags: ["animation", "code", "typing", "cursor"],
		code: [
			{
				filename: "streaming-code-demo.tsx",
				language: "tsx",
				code: `import { useState } from "react";
import { StreamingCode } from "./ui/streaming-code";

const sampleCode = \\\`import { useState, useEffect } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);
  
  return (
    <div className="flex flex-col gap-4">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}\\\`;

export function StreamingCodeDemo() {
  const [key, setKey] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
    setIsComplete(false);
  };

  return (
    <div className="w-full max-w-2xl">
      <StreamingCode
        key={key}
        code={sampleCode}
        language="tsx"
        speed={30}
        showLineNumbers={true}
        onComplete={() => setIsComplete(true)}
      />
      <button onClick={handleReplay}>Replay Animation</button>
    </div>
  );
}`,
			},
			{
				filename: "streaming-code.tsx",
				language: "tsx",
				code: `import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface StreamingCodeProps {
  code: string;
  language?: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  showLineNumbers?: boolean;
}

export function StreamingCode({
  code,
  language = "typescript",
  speed = 30,
  onComplete,
  className = "",
  showLineNumbers = true,
}: StreamingCodeProps) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < code.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(code.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
    if (currentIndex === code.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, code, speed, onComplete, isComplete]);

  const lines = displayedCode.split("\\n");
  const showCursor = !isComplete && displayedCode.length > 0;

  return (
    <div className="relative overflow-hidden rounded-lg border border-default-200 bg-zinc-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="font-mono text-xs text-zinc-400">{language}</span>
      </div>

      {/* Code Content with Syntax Highlighting */}
      <div className="relative overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            background: "transparent",
          }}
          showLineNumbers={showLineNumbers}
          wrapLines
          lineNumberStyle={{
            minWidth: "2rem",
            paddingRight: "1rem",
            color: "#52525b",
            userSelect: "none",
          }}
        >
          {displayedCode}
        </SyntaxHighlighter>
        {showCursor && (
          <motion.span
            className="absolute h-4 w-2 bg-blue-500"
            style={{
              top: \\\`\${lines.length * 1.5 + 0.5}rem\\\`,
              left: showLineNumbers ? "4rem" : "1rem",
              marginLeft: "0.125rem",
            }}
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>

      {/* Progress Indicator */}
      {!isComplete && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{
              width: \\\`\${(currentIndex / code.length) * 100}%\\\`,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}
    </div>
  );
}`,
			},
		],
	},
];
