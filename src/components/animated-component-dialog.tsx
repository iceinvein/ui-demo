import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import type { ComponentItem } from "@/types/component";
import { CodeViewer } from "./code-viewer";
import { AnimatedDialog, AnimatedDialogTrigger } from "./ui/animated-dialog";

interface AnimatedComponentDialogProps {
	component: ComponentItem;
}

// Card flip animation variants
const cardVariants = {
	hidden: {
		opacity: 0,
		rotateY: 90,
		scale: 0.8,
	},
	visible: {
		opacity: 1,
		rotateY: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 20,
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
				{/* Header */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.1 }}
					className="flex items-center justify-between rounded-t-3xl border-default-200 border-b bg-default-50/50 px-6 py-4 backdrop-blur-sm"
				>
					<div>
						<h2 className="font-bold text-2xl text-default-900">
							{component.title}
						</h2>
						<p className="text-default-600 text-sm">{component.description}</p>
					</div>
					<Button
						isIconOnly
						variant="light"
						onPress={() => setIsOpen(false)}
						className="text-default-500 hover:text-default-900"
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
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.15 }}
					className="flex gap-1 border-default-200 border-b bg-default-50/30 px-6"
				>
					<button
						type="button"
						onClick={() => setActiveTab("preview")}
						className={`relative px-4 py-3 font-medium text-sm transition-colors ${
							activeTab === "preview"
								? "text-primary"
								: "text-default-600 hover:text-default-900"
						}`}
					>
						Preview
						{activeTab === "preview" && (
							<motion.div
								className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								exit={{ scaleX: 0 }}
								transition={{ duration: 0.2 }}
							/>
						)}
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("code")}
						className={`relative px-4 py-3 font-medium text-sm transition-colors ${
							activeTab === "code"
								? "text-primary"
								: "text-default-600 hover:text-default-900"
						}`}
					>
						Code
						{activeTab === "code" && (
							<motion.div
								className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								exit={{ scaleX: 0 }}
								transition={{ duration: 0.2 }}
							/>
						)}
					</button>
				</motion.div>

				{/* Content */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.2 }}
					className="relative flex-1 overflow-hidden"
				>
					<div className="absolute inset-0 overflow-hidden p-6">
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
							className="absolute inset-0 flex items-center justify-center overflow-y-auto p-6"
							style={{
								pointerEvents: activeTab === "preview" ? "auto" : "none",
							}}
						>
							<div className="w-full rounded-xl bg-default-50/50 p-8">
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
							className="absolute inset-0 overflow-y-auto p-6"
							style={{
								pointerEvents: activeTab === "code" ? "auto" : "none",
							}}
						>
							<CodeViewer code={component.code} />
						</motion.div>
					</div>
				</motion.div>
			</AnimatedDialog>
		</>
	);
}
