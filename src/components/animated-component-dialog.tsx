import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import {
	Component,
	type ErrorInfo,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";
import type { ComponentItem } from "@/types/component";
import { CodeViewer } from "./code-viewer";
import { AnimatedDialog, AnimatedDialogTrigger } from "./ui/animated-dialog";

// Unique dialogId per component to scope layoutId animations
const toDialogId = (id: string) => `component-${id}`;

class PreviewErrorBoundary extends Component<
	{ children: ReactNode; accentColor: string },
	{ hasError: boolean }
> {
	state = { hasError: false };
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error: Error, info: ErrorInfo) {
		console.warn(
			"Preview render failed:",
			error.message,
			info.componentStack?.slice(0, 200),
		);
	}
	render() {
		if (this.state.hasError) {
			return (
				<div className="flex h-full flex-col items-center justify-center gap-3 p-8">
					<div className="flex items-center gap-2 opacity-40">
						<svg
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							style={{ color: this.props.accentColor }}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
						<p
							className="font-medium text-xs"
							style={{ color: this.props.accentColor }}
						>
							Open to preview
						</p>
					</div>
					<p className="text-[10px] text-default-400">
						Interactive preview requires dialog
					</p>
				</div>
			);
		}
		return this.props.children;
	}
}

type AnimatedComponentDialogProps = {
	component: ComponentItem;
	accentColor?: string;
	currentComponentId?: string;
	onCardClick?: (id: string) => void;
};

function useInView(ref: React.RefObject<HTMLElement | null>) {
	const [inView, setInView] = useState(false);
	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" },
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref]);
	return inView;
}

export function AnimatedComponentDialog({
	component,
	accentColor = "#888888",
	currentComponentId,
	onCardClick,
}: AnimatedComponentDialogProps) {
	const navigate = useNavigate();
	const [isClickOpen, setIsClickOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
	const previewRef = useRef<HTMLDivElement>(null);
	const shouldRenderPreview = useInView(previewRef);
	const dialogId = toDialogId(component.id);

	// Close this dialog if a *different* component was opened via URL
	useEffect(() => {
		if (
			currentComponentId &&
			currentComponentId !== component.id &&
			isClickOpen
		) {
			setIsClickOpen(false);
			setActiveTab("preview");
		}
	}, [currentComponentId, component.id, isClickOpen]);

	const handleOpen = () => {
		setIsClickOpen(true);
		onCardClick?.(component.id);
		navigate(`/component/${component.id}`);
	};

	const handleClose = () => {
		setIsClickOpen(false);
		setActiveTab("preview");
		navigate("/");
	};

	const isOpen = isClickOpen;
	const PreviewComponent = component.component;
	const tags = component.tags || [];

	const previewScale = 0.3;
	const previewInverseScale = Math.round((1 / previewScale) * 100);

	return (
		<>
			{/* Card trigger — stays in DOM, fades to opacity 0 when open */}
			<AnimatedDialogTrigger
				isOpen={isOpen}
				onClick={handleOpen}
				dialogId={dialogId}
				className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-default-200/50 bg-default-50 text-left transition-all duration-200 hover:border-default-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default-400 focus-visible:ring-offset-2"
			>
				{/* Live Preview Area */}
				<div
					ref={previewRef}
					className="relative h-36 overflow-hidden rounded-t-xl bg-default-100/50"
				>
					{shouldRenderPreview && (
						<div
							className="pointer-events-none absolute top-0 left-0 origin-top-left select-none"
							style={{
								transform: `scale(${previewScale})`,
								width: `${previewInverseScale}%`,
								height: `${previewInverseScale}%`,
							}}
						>
							<PreviewErrorBoundary accentColor={accentColor}>
								<PreviewComponent />
							</PreviewErrorBoundary>
						</div>
					)}
					{/* Bottom fade */}
					<div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-default-50 to-transparent" />
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col p-4">
					<h3 className="mb-1 font-medium text-default-900 text-sm leading-tight">
						{component.title}
					</h3>
					<p className="mb-3 line-clamp-2 text-default-400 text-xs leading-relaxed">
						{component.description}
					</p>

					{/* Tags */}
					{tags.length > 0 && (
						<div className="mt-auto flex flex-wrap gap-1.5">
							{tags.slice(0, 3).map((tag) => (
								<span
									key={tag}
									className="rounded-full bg-default-100 px-2 py-0.5 font-mono text-[10px] text-default-400 tracking-wide"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
			</AnimatedDialogTrigger>

			{/* Dialog — morph from/to card position */}
			<AnimatedDialog isOpen={isOpen} onClose={handleClose} dialogId={dialogId}>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2, delay: 0.15 }}
					className="flex items-center justify-between border-default-200 border-b px-6 py-4"
				>
					<div className="flex items-center gap-3">
						<div
							className="h-2.5 w-2.5 rounded-full"
							style={{ backgroundColor: accentColor }}
						/>
						<div>
							<h2 className="font-bold text-default-900 text-lg">
								{component.title}
							</h2>
							<p className="text-default-500 text-sm">
								{component.description}
							</p>
						</div>
					</div>

					<Button
						isIconOnly
						aria-label="Close dialog"
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
				<div className="flex gap-1 border-default-200 border-b px-6">
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
								className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full"
								style={{ backgroundColor: accentColor }}
								layoutId={`activeTab-${component.id}`}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 30,
								}}
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
								className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full"
								style={{ backgroundColor: accentColor }}
								layoutId={`activeTab-${component.id}`}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 30,
								}}
							/>
						)}
					</button>
				</div>

				{/* Content */}
				<div className="relative flex-1 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
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
							className="absolute inset-0 overflow-y-auto"
							style={{
								pointerEvents: activeTab === "preview" ? "auto" : "none",
							}}
						>
							<div className="w-full">
								<component.component />
							</div>
						</motion.div>

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
							className="absolute inset-0 overflow-y-auto p-8"
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
