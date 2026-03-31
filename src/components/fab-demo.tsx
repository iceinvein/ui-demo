import { AnimatePresence, motion } from "framer-motion";
import {
	Camera,
	FileText,
	Image,
	MessageSquare,
	Mic,
	Plus,
	Share2,
	Video,
	Wifi,
	X,
} from "lucide-react";
import { useState } from "react";

type FabAction = {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	color: string;
};

const actions: FabAction[] = [
	{ icon: Camera, label: "Photo", color: "#3b82f6" },
	{ icon: Video, label: "Video", color: "#ef4444" },
	{ icon: FileText, label: "Document", color: "#22c55e" },
	{ icon: Mic, label: "Audio", color: "#f59e0b" },
	{ icon: Share2, label: "Share", color: "#a855f7" },
];

type FabVariant = "vertical" | "arc" | "grid";

function VerticalFab({
	open,
	onToggle,
	items,
}: {
	open: boolean;
	onToggle: () => void;
	items: FabAction[];
}) {
	return (
		<div className="flex flex-col items-end gap-3">
			{/* Action items — stack upward, right-aligned with FAB */}
			<AnimatePresence>
				{open &&
					items.map((action, i) => (
						<motion.button
							key={action.label}
							type="button"
							className="group relative flex items-center"
							initial={{ opacity: 0, y: 16, scale: 0.3 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 8, scale: 0.5 }}
							transition={{
								type: "spring",
								stiffness: 500,
								damping: 28,
								delay: (items.length - 1 - i) * 0.04,
							}}
						>
							{/* Label — positioned left of circle */}
							<span className="absolute right-12 whitespace-nowrap rounded-lg bg-default-100 px-2 py-1 text-default-600 text-xs opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
								{action.label}
							</span>
							{/* Circle — right-aligned to match FAB center */}
							<div
								className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
								style={{ backgroundColor: action.color }}
							>
								<action.icon className="h-4 w-4" />
							</div>
						</motion.button>
					))}
			</AnimatePresence>

			{/* Main FAB */}
			<motion.button
				type="button"
				className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl"
				whileTap={{ scale: 0.92 }}
				onClick={onToggle}
				animate={{ rotate: open ? 45 : 0 }}
				transition={{ type: "spring", stiffness: 400, damping: 20 }}
			>
				{open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
			</motion.button>
		</div>
	);
}

function ArcFab({
	open,
	onToggle,
	items,
}: {
	open: boolean;
	onToggle: () => void;
	items: FabAction[];
}) {
	const arcRadius = 105;
	// Fan from 185° to 275° (90° arc, left → up) — stays inside phone frame
	const startAngle = (185 / 180) * Math.PI;
	const endAngle = (275 / 180) * Math.PI;

	return (
		<div className="relative" style={{ width: 56, height: 56 }}>
			{/* Action items — arc fan */}
			<AnimatePresence>
				{open &&
					items.map((action, i) => {
						const angle =
							startAngle +
							((endAngle - startAngle) / (items.length - 1)) * i;
						const tx = Math.cos(angle) * arcRadius;
						const ty = Math.sin(angle) * arcRadius;

						return (
							<motion.button
								key={action.label}
								type="button"
								className="absolute flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
								style={{
									backgroundColor: action.color,
									left: "50%",
									top: "50%",
									marginLeft: -18,
									marginTop: -18,
								}}
								initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
								animate={{ x: tx, y: ty, scale: 1, opacity: 1 }}
								exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
								transition={{
									duration: 0.25,
									ease: [0.4, 0, 0.2, 1],
									delay: i * 0.025,
								}}
							>
								<action.icon className="h-3.5 w-3.5" />
							</motion.button>
						);
					})}
			</AnimatePresence>

			{/* Main FAB */}
			<motion.button
				type="button"
				className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl"
				whileTap={{ scale: 0.92 }}
				onClick={onToggle}
				animate={{ rotate: open ? 135 : 0 }}
				transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
			>
				<Plus className="h-6 w-6" />
			</motion.button>
		</div>
	);
}

function GridFab({
	open,
	onToggle,
	items,
}: {
	open: boolean;
	onToggle: () => void;
	items: FabAction[];
}) {
	return (
		<div className="flex flex-col items-end gap-3">
			<AnimatePresence>
				{open && (
					<motion.div
						className="grid grid-cols-3 gap-2 rounded-2xl border border-default-200/60 bg-default-50 p-3 shadow-xl"
						initial={{ opacity: 0, scale: 0.7, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.7, y: 10 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 25,
						}}
					>
						{items.map((action, i) => (
							<motion.button
								key={action.label}
								type="button"
								className="flex flex-col items-center gap-1 rounded-xl p-2 transition-colors hover:bg-default-100"
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									delay: i * 0.03,
									type: "spring",
									stiffness: 500,
									damping: 25,
								}}
							>
								<div
									className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
									style={{ backgroundColor: action.color }}
								>
									<action.icon className="h-4 w-4" />
								</div>
								<span className="text-default-500 text-[9px]">
									{action.label}
								</span>
							</motion.button>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main FAB */}
			<motion.button
				type="button"
				className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl"
				whileTap={{ scale: 0.92 }}
				onClick={onToggle}
				animate={{ rotate: open ? 45 : 0 }}
				transition={{ type: "spring", stiffness: 400, damping: 20 }}
			>
				{open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
			</motion.button>
		</div>
	);
}

const variants: { id: FabVariant; label: string }[] = [
	{ id: "vertical", label: "Stack" },
	{ id: "arc", label: "Arc" },
	{ id: "grid", label: "Grid" },
];

export function FabDemo() {
	const [open, setOpen] = useState(false);
	const [variant, setVariant] = useState<FabVariant>("vertical");

	const toggle = () => setOpen((o) => !o);

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8">
			{/* Header */}
			<motion.div
				className="flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
			>
				<h2 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text font-bold text-2xl text-transparent">
					Floating Action Button
				</h2>
				<p className="text-default-500 text-sm">
					Speed dial with spring-animated variants
				</p>
			</motion.div>

			{/* Phone frame */}
			<motion.div
				className="relative w-[320px] overflow-hidden rounded-[2rem] border-2 border-default-200/80 bg-default-50 shadow-xl"
				style={{ height: 520 }}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.15 }}
			>
				{/* Status bar */}
				<div className="flex items-center justify-between px-6 pt-3 pb-1">
					<span className="font-medium text-default-800 text-xs">9:41</span>
					<div className="flex items-center gap-1.5">
						<Wifi className="h-3.5 w-3.5 text-default-600" />
						<div className="h-2.5 w-5 rounded-sm border border-default-400 p-[1px]">
							<div className="h-full w-3/4 rounded-[1px] bg-green-500" />
						</div>
					</div>
				</div>

				{/* Fake app content */}
				<div className="flex flex-col gap-3 px-5 pt-6">
					<div className="flex items-center gap-3">
						<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10">
							<Image className="h-4 w-4 text-indigo-500" />
						</div>
						<div>
							<p className="font-medium text-default-800 text-sm">
								My Files
							</p>
							<p className="text-default-400 text-xs">23 items</p>
						</div>
					</div>

					{/* File list items */}
					{[
						{ name: "Presentation.pdf", size: "2.4 MB", icon: FileText, color: "#ef4444" },
						{ name: "Photo_001.jpg", size: "4.1 MB", icon: Image, color: "#3b82f6" },
						{ name: "Recording.mp3", size: "8.2 MB", icon: Mic, color: "#f59e0b" },
						{ name: "Notes.txt", size: "12 KB", icon: FileText, color: "#22c55e" },
						{ name: "meeting.mp4", size: "45 MB", icon: Video, color: "#a855f7" },
						{ name: "Conversation", size: "3 msgs", icon: MessageSquare, color: "#06b6d4" },
					].map((file) => (
						<div
							key={file.name}
							className="flex items-center gap-3 rounded-xl bg-default-100/50 p-3"
						>
							<div
								className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
								style={{ backgroundColor: `${file.color}15` }}
							>
								<file.icon
									className="h-3.5 w-3.5"
									style={{ color: file.color }}
								/>
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate font-medium text-default-700 text-xs">
									{file.name}
								</p>
								<p className="text-default-400 text-[10px]">{file.size}</p>
							</div>
						</div>
					))}
				</div>

				{/* Backdrop */}
				<AnimatePresence>
					{open && (
						<motion.div
							className="absolute inset-0 bg-black/20"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setOpen(false)}
						/>
					)}
				</AnimatePresence>

				{/* FAB area — bottom right of phone */}
				<div className="absolute right-5 bottom-5">
					{variant === "vertical" && (
						<VerticalFab open={open} onToggle={toggle} items={actions} />
					)}
					{variant === "arc" && (
						<ArcFab open={open} onToggle={toggle} items={actions} />
					)}
					{variant === "grid" && (
						<GridFab open={open} onToggle={toggle} items={actions} />
					)}
				</div>
			</motion.div>

			{/* Variant pills */}
			<motion.div
				className="flex gap-2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				{variants.map((v) => (
					<button
						key={v.id}
						type="button"
						onClick={() => {
							setOpen(false);
							setVariant(v.id);
						}}
						className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
							v.id === variant
								? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400"
								: "border-default-200/60 text-default-500 hover:border-default-300 hover:text-default-700"
						}`}
					>
						{v.label}
					</button>
				))}
			</motion.div>
		</div>
	);
}
