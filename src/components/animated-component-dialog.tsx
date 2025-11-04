import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import type { ComponentItem } from "@/types/component";
import { CodeViewer } from "./code-viewer";
import { AnimatedDialog, AnimatedDialogTrigger } from "./ui/animated-dialog";

interface AnimatedComponentDialogProps {
	component: ComponentItem;
}

// Card flip animation variants with enhanced entrance
const cardVariants = {
	hidden: {
		opacity: 0,
		rotateY: -90,
		rotateX: 45,
		scale: 0.5,
		z: -200,
	},
	visible: {
		opacity: 1,
		rotateY: 0,
		rotateX: 0,
		scale: 1,
		z: 0,
		transition: {
			type: "spring" as const,
			stiffness: 200,
			damping: 25,
			mass: 1,
		},
	},
};

export function AnimatedComponentDialog({
	component,
}: AnimatedComponentDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
	const layoutId = `component-dialog-${component.title}`;

	return (
		<>
			{/* Trigger Button with Casino Card Flip */}
			<motion.div
				variants={cardVariants}
				style={{
					perspective: "1000px",
				}}
			>
				<AnimatedDialogTrigger
					layoutId={layoutId}
					isOpen={isOpen}
					onClick={() => setIsOpen(true)}
				>
					<div
						className="flex h-full flex-col text-left"
						style={{ transformStyle: "preserve-3d" }}
					>
						{/* Content */}
						<div className="relative z-10 flex h-full flex-col">
							<div className="mb-3 flex items-start justify-between">
								<h3 className="font-semibold text-default-900 text-lg">
									{component.title}
								</h3>
								<motion.div
									className="flex-shrink-0 rounded-full bg-primary/10 p-2"
									whileHover={{ scale: 1.1, rotate: 5 }}
									transition={{ duration: 0.2 }}
								>
									<svg
										className="h-4 w-4 text-primary"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</motion.div>
							</div>

							<p className="mb-4 line-clamp-3 flex-grow text-default-600 text-sm leading-relaxed">
								{component.description}
							</p>

							{/* Tags */}
							{component.tags && component.tags.length > 0 && (
								<div className="mt-auto flex flex-wrap gap-2">
									{component.tags.map((tag) => (
										<span
											key={tag}
											className="rounded-full bg-default-200/50 px-3 py-1 font-medium text-default-700 text-xs"
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
					</div>
				</AnimatedDialogTrigger>
			</motion.div>

			{/* Dialog */}
			<AnimatedDialog
				key={`${layoutId}-${isOpen}`}
				layoutId={layoutId}
				isOpen={isOpen}
				onClose={() => {
					setIsOpen(false);
					setActiveTab("preview");
				}}
			>
				{/* Animated background elements - behind everything */}
				<div className="-z-10 pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
					{/* Gradient orbs */}
					<motion.div
						className="-top-20 -right-20 absolute h-60 w-60 rounded-full bg-primary/10 blur-3xl"
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.3, 0.5, 0.3],
						}}
						transition={{
							duration: 8,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						className="-bottom-20 -left-20 absolute h-60 w-60 rounded-full bg-secondary/10 blur-3xl"
						animate={{
							scale: [1, 1.3, 1],
							opacity: [0.3, 0.4, 0.3],
						}}
						transition={{
							duration: 10,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
							delay: 2,
						}}
					/>

					{/* Floating particles */}
					{[...Array(8)].map((_, i) => (
						<motion.div
							key={`particle-${i}`}
							className="absolute h-1 w-1 rounded-full bg-primary/20"
							style={{
								left: `${10 + i * 12}%`,
								top: `${20 + (i % 3) * 30}%`,
							}}
							animate={{
								y: [0, -30, 0],
								opacity: [0, 0.6, 0],
								scale: [0, 1.5, 0],
							}}
							transition={{
								duration: 3 + i * 0.5,
								repeat: Number.POSITIVE_INFINITY,
								delay: i * 0.4,
								ease: "easeInOut",
							}}
						/>
					))}
				</div>

				{/* Header */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="relative z-20 flex items-center justify-between rounded-t-xl border-default-200/30 border-t border-b bg-background px-6 py-4"
				>
					<div>
						<h2 className="font-semibold text-default-900 text-lg">
							{component.title}
						</h2>
						<p className="text-default-500 text-sm">{component.description}</p>
					</div>

					<Button
						isIconOnly
						variant="light"
						onPress={() => setIsOpen(false)}
						className="text-default-400 transition-colors hover:text-default-600"
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
					</Button>
				</motion.div>

				{/* Tabs */}
				<div className="relative z-20 flex gap-1 border-default-200/50 border-b bg-background px-6">
					<button
						type="button"
						onClick={() => setActiveTab("preview")}
						className={`relative px-4 py-3 text-sm transition-colors ${
							activeTab === "preview"
								? "text-default-900"
								: "text-default-500 hover:text-default-700"
						}`}
					>
						Preview
						{activeTab === "preview" && (
							<motion.div
								className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary"
								layoutId="activeTab"
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
							/>
						)}
					</button>

					<button
						type="button"
						onClick={() => setActiveTab("code")}
						className={`relative px-4 py-3 text-sm transition-colors ${
							activeTab === "code"
								? "text-default-900"
								: "text-default-500 hover:text-default-700"
						}`}
					>
						Code
						{activeTab === "code" && (
							<motion.div
								className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary"
								layoutId="activeTab"
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
							/>
						)}
					</button>
				</div>

				{/* Content */}
				<div className="relative z-10 flex-1 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						{/* Preview Tab */}
						<motion.div
							initial={false}
							animate={{
								x: activeTab === "preview" ? "0%" : "-100%",
								opacity: activeTab === "preview" ? 1 : 0,
							}}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 30,
							}}
							className="absolute inset-0 overflow-y-auto p-8"
							style={{
								pointerEvents: activeTab === "preview" ? "auto" : "none",
							}}
						>
							<div className="w-full">
								<component.component />
							</div>
						</motion.div>

						{/* Code Tab */}
						<motion.div
							initial={false}
							animate={{
								x: activeTab === "code" ? "0%" : "100%",
								opacity: activeTab === "code" ? 1 : 0,
							}}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 30,
							}}
							className="absolute inset-0 z-10 overflow-y-auto p-8"
							style={{
								pointerEvents: activeTab === "code" ? "auto" : "none",
							}}
						>
							<CodeViewer code={component.code} />
						</motion.div>
					</div>
				</div>
			</AnimatedDialog>
		</>
	);
}
