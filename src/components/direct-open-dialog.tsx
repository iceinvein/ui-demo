import { Button } from "@heroui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ComponentItem } from "@/types/component";
import { CodeViewer } from "./code-viewer";

interface DirectOpenDialogProps {
	component: ComponentItem;
}

/**
 * Dialog that opens directly from URL without layout animation.
 * Used when user navigates directly to /component/:id
 */
export function DirectOpenDialog({ component }: DirectOpenDialogProps) {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

	const handleClose = () => {
		navigate("/");
	};

	return (
		<AnimatePresence>
			{/* Backdrop */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className="fixed inset-0 z-999 bg-black/80 backdrop-blur-sm"
				onClick={handleClose}
			/>

			{/* Dialog */}
			<div className="pointer-events-none fixed inset-0 z-999 flex items-center justify-center p-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: 20 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="pointer-events-auto relative flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-default-200/30 bg-background shadow-xl"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2, delay: 0.1 }}
						className="relative z-20 flex items-center justify-between border-b bg-background px-6 py-4"
					>
						<div>
							<h2 className="font-semibold text-default-900 text-lg">
								{component.title}
							</h2>
							<p className="text-default-500 text-sm">
								{component.description}
							</p>
						</div>

						<Button
							isIconOnly
							variant="light"
							onPress={handleClose}
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
					<div className="relative z-20 flex gap-1 border-b bg-background px-6">
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
									layoutId="directDialogActiveTab"
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
									layoutId="directDialogActiveTab"
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
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
								className="absolute inset-0 overflow-y-auto"
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
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
								className="absolute inset-0 z-10 overflow-y-auto p-8"
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
		</AnimatePresence>
	);
}
