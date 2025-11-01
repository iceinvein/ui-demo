import { Button } from "@heroui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ComponentItem } from "@/types/component";
import { CodeViewer } from "./code-viewer";

interface ComponentDialogProps {
	component: ComponentItem | null;
	isOpen: boolean;
	onClose: () => void;
}

export function ComponentDialog({
	component,
	isOpen,
	onClose,
}: ComponentDialogProps) {
	const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

	if (!component) return null;

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

					{/* Dialog */}
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							transition={{
								duration: 0.3,
								ease: [0.21, 0.47, 0.32, 0.98],
							}}
							className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-3xl border border-default-200 bg-background shadow-2xl"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="flex items-center justify-between rounded-t-3xl border-default-200 border-b bg-default-50/50 px-6 py-4 backdrop-blur-sm">
								<div>
									<h2 className="font-bold text-2xl text-default-900">
										{component.title}
									</h2>
									<p className="text-default-600 text-sm">
										{component.description}
									</p>
								</div>
								<Button
									isIconOnly
									variant="light"
									onPress={onClose}
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
							</div>

							{/* Tabs */}
							<div className="flex gap-1 border-default-200 border-b bg-default-50/30 px-6">
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
											layoutId="activeDialogTab"
											className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary"
											transition={{
												type: "spring",
												stiffness: 500,
												damping: 30,
											}}
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
											layoutId="activeDialogTab"
											className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary"
											transition={{
												type: "spring",
												stiffness: 500,
												damping: 30,
											}}
										/>
									)}
								</button>
							</div>

							{/* Content */}
							<div className="relative flex-1 overflow-hidden">
								<div className="absolute inset-0 overflow-y-auto p-6">
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
										className="absolute inset-0 flex items-center justify-center p-6"
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
										className="absolute inset-0 p-6"
										style={{
											pointerEvents: activeTab === "code" ? "auto" : "none",
										}}
									>
										<CodeViewer code={component.code} />
									</motion.div>
								</div>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
