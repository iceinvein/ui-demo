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
			type: "spring",
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
				<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl">
					{/* Gradient orbs */}
					<motion.div
						className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl"
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
						className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/10 blur-3xl"
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
					transition={{ delay: 0.05, duration: 0.2 }}
					className="relative z-20 flex items-center justify-between rounded-t-3xl border-b border-default-200 bg-gradient-to-r from-default-50/80 via-background/80 to-default-50/80 px-6 py-4 backdrop-blur-md"
				>
					{/* Animated gradient line */}
					<motion.div
						className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-success"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
						style={{ transformOrigin: "left" }}
					/>

					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
					>
						<h2 className="bg-gradient-to-r from-default-900 to-default-600 bg-clip-text font-bold text-2xl text-transparent">
							{component.title}
						</h2>
						<p className="text-default-600 text-sm">{component.description}</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
						animate={{ opacity: 1, scale: 1, rotate: 0 }}
						transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
					>
						<Button
							isIconOnly
							variant="light"
							onPress={() => setIsOpen(false)}
							className="text-default-500 transition-all hover:rotate-90 hover:scale-110 hover:text-default-900"
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
				</motion.div>

				{/* Tabs */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.1, duration: 0.2 }}
					className="relative z-20 flex gap-1 border-b border-default-200 bg-gradient-to-r from-default-50/50 via-background/50 to-default-50/50 px-6 backdrop-blur-sm"
				>
					{/* Sliding background indicator */}
					<motion.div
						className="absolute bottom-0 h-full rounded-t-lg bg-gradient-to-b from-primary/5 to-primary/10"
						animate={{
							x: activeTab === "preview" ? 0 : "100%",
							width: activeTab === "preview" ? "80px" : "60px",
						}}
						transition={{ type: "spring", stiffness: 400, damping: 30 }}
					/>

					<motion.button
						type="button"
						onClick={() => setActiveTab("preview")}
						className={`relative z-10 px-4 py-3 font-medium text-sm transition-all ${
							activeTab === "preview"
								? "text-primary"
								: "text-default-600 hover:text-default-900"
						}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<motion.span
							animate={{
								scale: activeTab === "preview" ? 1.1 : 1,
							}}
							transition={{ type: "spring", stiffness: 400, damping: 20 }}
						>
							Preview
						</motion.span>
						{activeTab === "preview" && (
							<>
								<motion.div
									className="absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50"
									layoutId="activeTab"
									transition={{ type: "spring", stiffness: 400, damping: 30 }}
								/>
								<motion.div
									className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary blur-sm"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								/>
							</>
						)}
					</motion.button>

					<motion.button
						type="button"
						onClick={() => setActiveTab("code")}
						className={`relative z-10 px-4 py-3 font-medium text-sm transition-all ${
							activeTab === "code"
								? "text-primary"
								: "text-default-600 hover:text-default-900"
						}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<motion.span
							animate={{
								scale: activeTab === "code" ? 1.1 : 1,
							}}
							transition={{ type: "spring", stiffness: 400, damping: 20 }}
						>
							Code
						</motion.span>
						{activeTab === "code" && (
							<>
								<motion.div
									className="absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50"
									layoutId="activeTab"
									transition={{ type: "spring", stiffness: 400, damping: 30 }}
								/>
								<motion.div
									className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary blur-sm"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								/>
							</>
						)}
					</motion.button>

					{/* Animated sparkle on tab switch */}
					<motion.div
						key={activeTab}
						className="absolute bottom-2 h-1 w-1 rounded-full bg-primary"
						initial={{ scale: 0, x: activeTab === "preview" ? 40 : 120 }}
						animate={{
							scale: [0, 2, 0],
							opacity: [0, 1, 0],
						}}
						transition={{ duration: 0.6 }}
					/>
				</motion.div>

				{/* Content */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.15, duration: 0.2 }}
					className="relative z-10 flex-1 overflow-hidden"
				>
					<div className="absolute inset-0 overflow-hidden p-6">
						{/* Preview Tab */}
						<motion.div
							initial={false}
							animate={{
								x: activeTab === "preview" ? "0%" : "-100%",
								opacity: activeTab === "preview" ? 1 : 0,
								scale: activeTab === "preview" ? 1 : 0.95,
								filter: activeTab === "preview" ? "blur(0px)" : "blur(10px)",
							}}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 30,
							}}
							className="absolute inset-0 flex items-center justify-center overflow-y-auto p-6"
							style={{
								pointerEvents: activeTab === "preview" ? "auto" : "none",
								willChange: "transform, opacity, filter",
							}}
						>
							<motion.div
								className="relative z-10 w-full rounded-xl border border-default-200/50 bg-gradient-to-br from-default-50/80 via-background/80 to-default-50/80 p-8 shadow-lg backdrop-blur-sm"
								initial={{ y: 20, opacity: 0 }}
								animate={{
									y: activeTab === "preview" ? 0 : 20,
									opacity: activeTab === "preview" ? 1 : 0,
								}}
								transition={{ delay: 0.1 }}
							>
								{/* Decorative corner elements - behind content */}
								<div className="pointer-events-none absolute top-0 right-0 -z-10 h-20 w-20 rounded-bl-full bg-gradient-to-br from-primary/10 to-transparent" />
								<div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-20 w-20 rounded-tr-full bg-gradient-to-tl from-secondary/10 to-transparent" />

								{/* Animated border glow - behind content */}
								<motion.div
									className="pointer-events-none absolute inset-0 -z-10 rounded-xl border border-primary/0"
									animate={{
										borderColor: [
											"rgba(99, 102, 241, 0)",
											"rgba(99, 102, 241, 0.2)",
											"rgba(99, 102, 241, 0)",
										],
									}}
									transition={{
										duration: 3,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									}}
								/>

								{/* Content with proper z-index */}
								<div className="relative z-10">
									<component.component />
								</div>
							</motion.div>
						</motion.div>

						{/* Code Tab */}
						<motion.div
							initial={false}
							animate={{
								x: activeTab === "code" ? "0%" : "100%",
								opacity: activeTab === "code" ? 1 : 0,
								scale: activeTab === "code" ? 1 : 0.95,
								filter: activeTab === "code" ? "blur(0px)" : "blur(10px)",
							}}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 30,
							}}
							className="absolute inset-0 z-10 overflow-y-auto p-6"
							style={{
								pointerEvents: activeTab === "code" ? "auto" : "none",
								willChange: "transform, opacity, filter",
							}}
						>
							<motion.div
								className="relative z-10"
								initial={{ y: 20, opacity: 0 }}
								animate={{
									y: activeTab === "code" ? 0 : 20,
									opacity: activeTab === "code" ? 1 : 0,
								}}
								transition={{ delay: 0.1 }}
							>
								<CodeViewer code={component.code} />
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</AnimatedDialog>
		</>
	);
}
