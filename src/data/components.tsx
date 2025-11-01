import { AnimatedDialogDemo } from "@/components/animated-dialog-demo";
import { AnimatedListDemo } from "@/components/animated-list-demo";
import { AnimatedTabsDemo } from "@/components/animated-tabs-demo";
import { ButtonToDialogDemo } from "@/components/button-to-dialog-demo";
import { PetrolCounterDemo } from "@/components/petrol-counter-demo";
import { SplitTextDemo } from "@/components/split-text-demo";
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
				code: `import { type AnimatedTab, AnimatedTabs } from "./ui/animated-tabs";

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
            <h3 className="m-0 font-semibold text-xl">Project Overview</h3>
          </div>
          <p className="text-default-500">
            Welcome to your project dashboard. Track progress, manage tasks, and
            collaborate with your team all in one place.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-blue-50 p-3">
              <p className="font-medium text-blue-900 text-xs">Active Tasks</p>
              <p className="font-bold text-2xl text-blue-600">24</p>
            </div>
            <div className="rounded-lg bg-green-50 p-3">
              <p className="font-medium text-green-900 text-xs">Completed</p>
              <p className="font-bold text-2xl text-green-600">156</p>
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
            <h3 className="m-0 font-semibold text-xl">Team Members</h3>
          </div>
          <p className="text-default-500">
            Collaborate with 12 team members across 3 departments.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 rounded-lg bg-default-100 p-2">
              <div className="h-8 w-8 rounded-full bg-pink-200" />
              <div>
                <p className="font-medium text-sm">Sarah Chen</p>
                <p className="text-default-400 text-xs">Product Designer</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-default-100 p-2">
              <div className="h-8 w-8 rounded-full bg-purple-200" />
              <div>
                <p className="font-medium text-sm">Alex Rivera</p>
                <p className="text-default-400 text-xs">Frontend Developer</p>
              </div>
            </div>
          </div>
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
            <h3 className="m-0 font-semibold text-xl">Performance Analytics</h3>
          </div>
          <p className="text-default-500">
            Monitor your project metrics and track key performance indicators.
          </p>
          <p className="mt-2 text-default-500 text-sm">
            This tab demonstrates the dynamic height adjustment feature - notice
            how the container smoothly expands to fit longer content.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-default-600 text-sm">User Engagement</span>
              <span className="font-semibold text-purple-600 text-sm">
                +23%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-default-200">
              <div className="h-full w-3/4 bg-purple-500" />
            </div>
          </div>
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
            <h3 className="m-0 font-semibold text-xl">Project Settings</h3>
          </div>
          <p className="text-default-500">
            Configure your project preferences and manage integrations.
          </p>
          <ul className="mt-4 space-y-2 text-default-500 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✓</span>
              Notifications enabled
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✓</span>
              Auto-save active
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✓</span>
              Dark mode synced
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✓</span>
              API integration connected
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <h2 className="mb-2 font-bold text-2xl">Animated Tabs Demo</h2>
          <p className="text-default-500 text-sm">
            Switch between tabs to see smooth animations and dynamic height
            adjustment
          </p>
        </div>
        <AnimatedTabs
          tabs={tabs}
          defaultTab="overview"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          enableBlur={false}
          minHeight={150}
        />
      </div>
    </div>
  );
}`,
			},
			{
				filename: "animated-tabs.tsx",
				language: "tsx",
				code: `import { motion, type Transition } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

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
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  // Measure and update height when active tab changes
  useLayoutEffect(() => {
    const activeContent = contentRefs.current.get(activeTab);
    if (activeContent) {
      const measureHeight = () => {
        const scrollHeight = activeContent.scrollHeight;
        const computedStyle = window.getComputedStyle(activeContent);
        const marginTop = Number.parseFloat(computedStyle.marginTop);
        const marginBottom = Number.parseFloat(computedStyle.marginBottom);
        const parentPadding = 16;
        const totalHeight = scrollHeight + marginTop + marginBottom + parentPadding;

        let finalHeight = Math.max(totalHeight, minHeight);
        if (maxHeight) {
          finalHeight = Math.min(finalHeight, maxHeight);
        }
        setContentHeight(finalHeight);
      };

      measureHeight();
      const timeoutId = setTimeout(measureHeight, 150);

      const resizeObserver = new ResizeObserver(() => {
        measureHeight();
      });

      resizeObserver.observe(activeContent);

      return () => {
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
      };
    }
  }, [activeTab, minHeight, maxHeight]);

  return (
    <div className="flex w-full flex-col gap-2">
      {/* Content Container with animated height */}
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
              className="absolute top-0 right-0 left-0 p-2"
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
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;

          return (
            <li
              key={tab.id}
              className="flex flex-1"
              style={{
                padding:
                  index === 0
                    ? "0 0 0 0"
                    : index === tabs.length - 1
                      ? "0 0 0 0"
                      : "0",
              }}
            >
              <button
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className="relative w-full cursor-pointer rounded-lg px-4 py-2 font-medium text-sm transition-colors"
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
				code: `import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedDialog, AnimatedDialogTrigger } from "./ui/animated-dialog";

export function AnimatedDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <AnimatedDialogTrigger
        layoutId="demo-dialog"
        isOpen={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <div className="text-center">
          <div className="mb-2 text-2xl">✨</div>
          <h3 className="mb-2 font-semibold text-lg">Click to Open</h3>
          <p className="text-default-600 text-sm">
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
          className="flex h-full flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-3xl border-default-200 border-b bg-default-50/50 px-6 py-4">
            <div>
              <h2 className="font-bold text-2xl text-default-900">
                Animated Dialog
              </h2>
              <p className="text-default-600 text-sm">
                Smooth morphing transition from button to dialog
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 transition-colors hover:bg-default-100"
              aria-label="Close dialog"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="mx-auto max-w-2xl space-y-6">
              <div>
                <h3 className="mb-3 font-semibold text-xl">How it works</h3>
                <p className="text-default-600 leading-relaxed">
                  This dialog uses Framer Motion's layout animations with a
                  shared{" "}
                  <code className="rounded bg-default-100 px-2 py-1 text-sm">
                    layoutId
                  </code>
                  . When the trigger button unmounts and the dialog mounts,
                  Framer Motion automatically animates the position, size, and
                  border radius between them.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-xl">Key Features</h3>
                <ul className="space-y-2 text-default-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>
                      Smooth morphing animation from trigger to dialog
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>Spring-based physics for natural movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>Backdrop blur and fade effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>Staggered content animations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>Fully accessible with keyboard support</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
                <p className="text-center text-default-700">
                  This is inspired by Family's beautiful dialog animations. The
                  shared layout ID creates a seamless transition that feels
                  magical! ✨
                </p>
              </div>
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
    <AnimatePresence mode="wait">
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
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              layoutId={layoutId}
              className="pointer-events-auto relative flex h-[90vh] w-full max-w-5xl flex-col rounded-3xl border border-default-200 bg-background shadow-2xl"
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
    <AnimatePresence mode="wait">
      {!isOpen && (
        <motion.button
          layoutId={layoutId}
          onClick={onClick}
          className="group relative flex h-full min-h-[240px] flex-col rounded-2xl border border-default-200 bg-gradient-to-br from-default-50 to-default-100 p-6 shadow-sm overflow-hidden"
          whileHover={{
            y: -8,
            scale: 1.02,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 25,
            },
          }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Animated gradient glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0"
            initial={false}
            whileHover={{
              background: [
                "linear-gradient(135deg, rgba(var(--color-primary-rgb, 99, 102, 241), 0) 0%, rgba(var(--color-primary-rgb, 99, 102, 241), 0) 100%)",
                "linear-gradient(135deg, rgba(var(--color-primary-rgb, 99, 102, 241), 0.05) 0%, rgba(var(--color-primary-rgb, 99, 102, 241), 0.1) 100%)",
              ],
              transition: { duration: 0.4 },
            }}
          />

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            }}
            initial={{ x: "-100%" }}
            whileHover={{
              x: "100%",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          />

          {/* Border highlight */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary/0"
            initial={false}
            whileHover={{
              borderColor: "rgba(var(--color-primary-rgb, 99, 102, 241), 0.3)",
              boxShadow: "0 8px 24px -4px rgba(var(--color-primary-rgb, 99, 102, 241), 0.2)",
              transition: { duration: 0.3 },
            }}
          />

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
			"Destructive action button that morphs into a warning dialog with smooth layout animations",
		category: "animation",
		component: ButtonToDialogDemo,
		tags: ["animation", "dialog", "button", "confirmation", "destructive"],
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
			"Animated code display that types out character by character with syntax highlighting",
		category: "animation",
		component: StreamingCodeDemo,
		tags: ["animation", "code", "typing", "streaming"],
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
	{
		id: "petrol-counter",
		title: "Slot Machine Number Counter",
		description:
			"Animated number counter with slot machine-style rolling digits. Features smooth spring animations, stable keys for seamless transitions, and support for growing numbers. Includes a petrol station pump demo with press-and-hold interaction.",
		category: "animation",
		component: PetrolCounterDemo,
		tags: [
			"animation",
			"counter",
			"number",
			"slot-machine",
			"spring",
			"interaction",
			"press-hold",
		],
		code: [
			{
				filename: "petrol-counter-demo.tsx",
				language: "tsx",
				code: `import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatedNumber } from "./ui/animated-number";

const PRICE_PER_LITRE = 1.75;
const LITRE_INCREMENT = 0.1; // 100ml
const INTERVAL_MS = 100;

export function PetrolCounterDemo() {
  const [litres, setLitres] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate price based on litres
  const price = litres * PRICE_PER_LITRE;

  // Start filling
  const startFilling = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setLitres((prev) => prev + LITRE_INCREMENT);
    }, INTERVAL_MS);
  };

  // Stop filling
  const stopFilling = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Reset counters
  const reset = () => {
    stopFilling();
    setLitres(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Petrol Pump Display */}
        <div className="mb-8 rounded-3xl border-2 border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <span className="text-2xl">⛽</span>
              </div>
              <div>
                <h2 className="font-bold text-xl text-white">Petrol Pump</h2>
                <p className="text-sm text-zinc-400">
                  \${PRICE_PER_LITRE.toFixed(2)}/L
                </p>
              </div>
            </div>
            {isActive && (
              <motion.div
                className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="h-2 w-2 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-sm font-medium text-emerald-400">
                  Filling...
                </span>
              </motion.div>
            )}
          </div>

          {/* Counters */}
          <div className="grid grid-cols-2 gap-6">
            {/* Price Counter */}
            <div className="rounded-2xl border border-zinc-800 bg-black/40 p-6">
              <div className="mb-2 text-sm font-medium text-zinc-400">
                Total Price
              </div>
              <div className="font-mono text-4xl font-bold text-emerald-400">
                <AnimatedNumber
                  value={price}
                  decimals={2}
                  prefix="$"
                  minIntegerDigits={2}
                />
              </div>
            </div>

            {/* Litres Counter */}
            <div className="rounded-2xl border border-zinc-800 bg-black/40 p-6">
              <div className="mb-2 text-sm font-medium text-zinc-400">
                Volume
              </div>
              <div className="font-mono text-4xl font-bold text-blue-400">
                <AnimatedNumber
                  value={litres}
                  decimals={2}
                  suffix=" L"
                  minIntegerDigits={2}
                />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 rounded-xl bg-zinc-800/50 p-4">
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div>
                <div className="text-zinc-400">Increment</div>
                <div className="font-medium text-white">
                  {(LITRE_INCREMENT * 1000).toFixed(0)}ml / {INTERVAL_MS}ms
                </div>
              </div>
              <div>
                <div className="text-zinc-400">Rate</div>
                <div className="font-medium text-white">
                  \${PRICE_PER_LITRE.toFixed(2)}/L
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {/* Fill Button (Press & Hold) */}
            <motion.button
              type="button"
              onMouseDown={startFilling}
              onMouseUp={stopFilling}
              onMouseLeave={stopFilling}
              onTouchStart={startFilling}
              onTouchEnd={stopFilling}
              className={\`rounded-2xl px-8 py-4 font-semibold text-lg transition-all \${
                isActive
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                  : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
              }\`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive ? "Filling..." : "Hold to Fill"}
            </motion.button>

            {/* Reset Button */}
            <motion.button
              type="button"
              onClick={reset}
              className="rounded-2xl bg-zinc-800 px-8 py-4 font-semibold text-lg text-white transition-colors hover:bg-zinc-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
          </div>

          <p className="text-center text-sm text-zinc-500">
            Press and hold the button to start filling. Release to stop.
          </p>
        </div>
      </div>
    </div>
  );
}`,
			},
			{
				filename: "animated-number.tsx",
				language: "tsx",
				code: `import { motion } from "framer-motion";
import { useMemo } from "react";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  minIntegerDigits?: number;
}

function AnimatedDigit({ digit }: { digit: string }) {
  const isNumber = !Number.isNaN(Number.parseInt(digit, 10));

  if (!isNumber) {
    return <span className="inline-block">{digit}</span>;
  }

  const numericValue = Number.parseInt(digit, 10);

  return (
    <span
      className="relative inline-flex overflow-hidden"
      style={{
        width: "0.62em",
        height: "1em",
      }}
    >
      <motion.span
        className="flex flex-col items-center"
        animate={{
          y: \\\`\${-numericValue * 100}%\\\`,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
          mass: 0.8,
        }}
        style={{
          width: "0.62em",
        }}
      >
        {/* Render all digits 0-9 in a vertical column */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span
            key={num}
            className="inline-flex items-center justify-center"
            style={{
              width: "0.62em",
              height: "1em",
            }}
          >
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  minIntegerDigits = 1,
}: AnimatedNumberProps) {
  // Memoize the display string to prevent unnecessary re-renders
  const displayParts = useMemo(() => {
    // Split the number into integer and decimal parts BEFORE formatting
    const absValue = Math.abs(value);
    const integerPart = Math.floor(absValue);

    // Calculate how many integer digits we need
    const requiredDigits = Math.max(
      minIntegerDigits,
      integerPart === 0 ? 1 : Math.floor(Math.log10(integerPart)) + 1
    );

    // Format the integer part with padding
    const paddedIntPart = integerPart.toString().padStart(requiredDigits, "0");

    // Format the decimal part if needed
    let numberPart = paddedIntPart;
    if (decimals > 0) {
      const decimalPart = (absValue - integerPart).toFixed(decimals).substring(2); // Remove "0."
      numberPart = \\\`\${paddedIntPart}.\${decimalPart}\\\`;
    }

    // Build the full display string
    const fullString = \\\`\${prefix}\${numberPart}\${suffix}\\\`;

    // Create stable keys based on the role of each character
    // prefix chars, integer digits (right-aligned), decimal point, decimal digits, suffix chars
    const prefixLen = prefix.length;
    const integerLen = requiredDigits;
    const hasDecimal = decimals > 0;
    const decimalLen = decimals;

    const parts = fullString.split("").map((char, index) => {
      let key: string;

      if (index < prefixLen) {
        // Prefix character
        key = \\\`prefix-\${index}\\\`;
      } else if (index < prefixLen + integerLen) {
        // Integer digit (count from right to left for stability)
        const digitPosition = integerLen - (index - prefixLen) - 1;
        key = \\\`int-\${digitPosition}\\\`;
      } else if (hasDecimal && index === prefixLen + integerLen) {
        // Decimal point
        key = "decimal-point";
      } else if (hasDecimal && index < prefixLen + integerLen + 1 + decimalLen) {
        // Decimal digit
        const decimalPosition = index - (prefixLen + integerLen + 1);
        key = \\\`dec-\${decimalPosition}\\\`;
      } else {
        // Suffix character
        const suffixPosition = index - (prefixLen + integerLen + (hasDecimal ? 1 + decimalLen : 0));
        key = \\\`suffix-\${suffixPosition}\\\`;
      }

      return { char, key };
    });

    return parts;
  }, [value, decimals, prefix, suffix, minIntegerDigits]);

  return (
    <span className={\\\`inline-flex items-center \${className}\\\`}>
      {displayParts.map(({ char, key }) => (
        <AnimatedDigit key={key} digit={char} />
      ))}
    </span>
  );
}`,
			},
		],
	},
	{
		id: "split-text",
		title: "Split Text Animation",
		description:
			"Text animation that splits into individual characters with staggered spring animations",
		category: "animation",
		component: SplitTextDemo,
		tags: ["animation", "text", "typography", "spring", "stagger"],
		code: [
			{
				filename: "split-text-demo.tsx",
				language: "tsx",
				code: `import { useState } from "react";
import { Button } from "@heroui/button";
import { SplitText } from "./ui/split-text";

export function SplitTextDemo() {
  const [key, setKey] = useState(0);

  const replay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-8 p-8">
      <div key={key} className="text-center">
        <SplitText
          text="Beautiful Split Text Animation"
          className="mb-4 bg-gradient-to-r from-primary via-secondary to-success bg-clip-text font-bold text-4xl text-transparent md:text-5xl"
          delay={0.1}
          duration={0.04}
        />
        <SplitText
          text="Each character animates individually"
          className="text-default-600 text-lg"
          as="p"
          delay={0.5}
          duration={0.03}
        />
      </div>

      <Button
        color="primary"
        variant="shadow"
        onPress={replay}
        className="mt-4"
      >
        Replay Animation
      </Button>
    </div>
  );
}`,
			},
			{
				filename: "ui/split-text.tsx",
				language: "tsx",
				code: `import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 0.05,
  as = "h1",
}: SplitTextProps) {
  // Split text into words
  const words = text.split(" ");

  // Container animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };

  // Child animation (each character)
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span
          key={\\\`word-\${wordIndex}\\\`}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={\\\`char-\${wordIndex}-\${charIndex}\\\`}
              variants={child}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </MotionComponent>
  );
}`,
			},
		],
	},
	{
		id: "animated-list",
		title: "Animated Task List",
		description:
			"Modern task list with smooth enter/exit animations using lucide-react icons. Features spring physics, layout animations, and elegant hover states.",
		category: "data-display",
		component: AnimatedListDemo,
		tags: ["animation", "list", "todo", "enter", "exit", "layout", "icons"],
		code: [
			{
				filename: "animated-list-demo.tsx",
				language: "tsx",
				code: `import { motion } from "framer-motion";
import { Calendar, CheckCircle2, ShoppingCart, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { AnimatedList, type AnimatedListItem } from "./ui/animated-list";

export function AnimatedListDemo() {
  const [items, setItems] = useState<AnimatedListItem[]>([
    {
      id: "1",
      content: (
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <ShoppingCart className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="flex-1">
            <h4 className="m-0 font-semibold text-default-900">Buy groceries</h4>
            <p className="m-0 text-default-500 text-sm">Get milk and eggs</p>
          </div>
        </div>
      ),
    },
    {
      id: "2",
      content: (
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
            <FileText className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex-1">
            <h4 className="m-0 font-semibold text-default-900">Finish project report</h4>
            <p className="m-0 text-default-500 text-sm">Due tomorrow</p>
          </div>
        </div>
      ),
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (!inputValue.trim()) return;

    const newItem: AnimatedListItem = {
      id: Date.now().toString(),
      content: (
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10">
            <Sparkles className="h-5 w-5 text-pink-500" />
          </div>
          <div className="flex-1">
            <h4 className="m-0 font-semibold text-default-900">{inputValue}</h4>
            <p className="m-0 text-default-500 text-sm">Just added</p>
          </div>
        </div>
      ),
    };

    setItems([...items, newItem]);
    setInputValue("");
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-3">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <h2 className="mb-2 font-bold text-3xl">Animated Task List</h2>
        <p className="text-default-500 text-lg">
          Watch smooth enter and exit animations
        </p>
      </div>

      <div className="mb-6 flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="What needs to be done?"
          className="flex-1 rounded-xl border border-default-200 bg-default-100 px-4 py-3 text-default-900 outline-none transition-colors placeholder:text-default-400 focus:border-primary"
        />
        <motion.button
          type="button"
          onClick={addItem}
          disabled={!inputValue.trim()}
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="h-4 w-4" />
          Add
        </motion.button>
      </div>

      <motion.div
        layout
        className="mb-6 rounded-2xl border border-default-200 bg-gradient-to-br from-default-50 to-default-100/50 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-default-500 text-xs font-medium uppercase">Total Tasks</p>
            <motion.p
              key={items.length}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="font-bold text-2xl"
            >
              {items.length}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-default-200 bg-default-50/50 p-8"
        >
          <div className="mb-4 rounded-full bg-default-100 p-4">
            <CheckCircle2 className="h-8 w-8 text-default-400" />
          </div>
          <h3 className="mb-2 font-semibold text-lg">No tasks yet</h3>
          <p className="text-center text-default-500">Add your first task above</p>
        </motion.div>
      ) : (
        <AnimatedList items={items} onRemove={removeItem} />
      )}
    </div>
  );
}`,
			},
			{
				filename: "ui/animated-list.tsx",
				language: "tsx",
				code: `import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export interface AnimatedListItem {
  id: string;
  content: ReactNode;
}

export interface AnimatedListProps {
  items: AnimatedListItem[];
  onRemove?: (id: string) => void;
  className?: string;
  itemClassName?: string;
  showRemoveButton?: boolean;
}

export function AnimatedList({
  items,
  onRemove,
  className = "",
  itemClassName = "",
  showRemoveButton = true,
}: AnimatedListProps) {
  return (
    <ul className={\\\`flex flex-col gap-3 \${className}\\\`}>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
            className={\\\`group relative flex items-center justify-between gap-4 rounded-2xl border border-default-200 bg-gradient-to-br from-default-50 to-default-100/50 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-default-300 hover:shadow-md \${itemClassName}\\\`}
          >
            <div className="flex-1">{item.content}</div>
            {showRemoveButton && onRemove && (
              <motion.button
                type="button"
                onClick={() => onRemove(item.id)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/10 text-danger opacity-0 transition-all hover:bg-danger hover:text-white group-hover:opacity-100"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9, rotate: -5 }}
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}`,
			},
		],
	},
];
