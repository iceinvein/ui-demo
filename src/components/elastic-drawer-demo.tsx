import {
	AnimatePresence,
	type PanInfo,
	motion,
	useMotionValue,
	useTransform,
} from "framer-motion";
import {
	Bell,
	ChevronUp,
	Clock,
	MessageSquare,
	Music,
	Settings,
	Star,
	Wifi,
	X,
} from "lucide-react";
import { useState } from "react";

const SNAP_CLOSED = 280;
const OVERDRAG_FACTOR = 0.35;

const notifications = [
	{
		icon: MessageSquare,
		title: "New message",
		body: "Sarah sent you a photo",
		time: "2m ago",
		color: "#3b82f6",
	},
	{
		icon: Star,
		title: "Achievement unlocked",
		body: "You've completed 10 projects this month",
		time: "15m ago",
		color: "#f59e0b",
	},
	{
		icon: Music,
		title: "Now playing",
		body: "Daft Punk — Something About Us",
		time: "Just now",
		color: "#a855f7",
	},
	{
		icon: Wifi,
		title: "Connected",
		body: "Wi-Fi signal strength: Excellent",
		time: "1h ago",
		color: "#10b981",
	},
	{
		icon: Bell,
		title: "Reminder",
		body: "Team standup in 15 minutes",
		time: "14m ago",
		color: "#ef4444",
	},
];

export function ElasticDrawerDemo() {
	const [isOpen, setIsOpen] = useState(false);
	const y = useMotionValue(0);

	// Elastic stretch: the further you drag past bounds, the more resistance
	const scaleX = useTransform(y, [-60, 0, 40], [1.02, 1, 0.98]);
	const scaleY = useTransform(y, [-60, 0, 40], [0.97, 1, 1.03]);

	// Drag handle indicator stretches
	const handleWidth = useTransform(y, [-40, 0, 40], [48, 36, 28]);

	const handleDragEnd = (_: unknown, info: PanInfo) => {
		if (info.velocity.y > 300 || info.offset.y > 80) {
			setIsOpen(false);
		}
	};

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8">
			{/* Header */}
			<motion.div
				className="flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
			>
				<h2 className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text font-bold text-2xl text-transparent">
					Elastic Drawer
				</h2>
				<p className="text-default-500 text-sm">
					Drag the sheet — it stretches like rubber past its bounds
				</p>
			</motion.div>

			{/* Phone frame */}
			<motion.div
				className="relative w-[320px] overflow-hidden rounded-[2rem] border-2 border-default-200/80 bg-default-50 shadow-xl"
				style={{ height: 560 }}
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

				{/* App content behind the drawer */}
				<div className="flex flex-col items-center gap-6 px-6 pt-12">
					<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
						<Settings className="h-8 w-8 text-white" />
					</div>
					<div className="text-center">
						<h3 className="font-semibold text-default-800">Quick Settings</h3>
						<p className="mt-1 text-default-400 text-sm">
							Tap below to open the drawer
						</p>
					</div>

					{/* Fake quick-setting pills */}
					<div className="flex flex-wrap justify-center gap-2">
						{["Wi-Fi", "Bluetooth", "Airplane", "Hotspot"].map(
							(label) => (
								<div
									key={label}
									className="rounded-full border border-default-200 bg-default-100 px-3 py-1.5 text-default-500 text-xs"
								>
									{label}
								</div>
							),
						)}
					</div>
				</div>

				{/* Pull-up indicator at bottom */}
				{!isOpen && (
					<motion.button
						type="button"
						className="absolute right-0 bottom-0 left-0 flex flex-col items-center gap-1 pb-6 pt-4"
						onClick={() => setIsOpen(true)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
					>
						<motion.div
							animate={{ y: [0, -4, 0] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<ChevronUp className="h-5 w-5 text-default-400" />
						</motion.div>
						<span className="text-default-400 text-[10px]">Pull up</span>
					</motion.button>
				)}

				{/* Elastic drawer sheet */}
				<AnimatePresence>
					{isOpen && (
						<>
							{/* Backdrop */}
							<motion.div
								className="absolute inset-0 bg-black/30"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => setIsOpen(false)}
							/>

							{/* Sheet */}
							<motion.div
								className="absolute right-0 bottom-0 left-0 rounded-t-[1.5rem] border-default-200/60 border-t bg-default-50 shadow-2xl"
								style={{
									y,
									scaleX,
									scaleY,
									transformOrigin: "bottom center",
								}}
								initial={{ y: SNAP_CLOSED }}
								animate={{ y: 0 }}
								exit={{ y: SNAP_CLOSED }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 32,
									mass: 0.8,
								}}
								drag="y"
								dragConstraints={{ top: -30, bottom: 0 }}
								dragElastic={{
									top: OVERDRAG_FACTOR,
									bottom: OVERDRAG_FACTOR,
								}}
								onDragEnd={handleDragEnd}
							>
								{/* Drag handle */}
								<div className="flex justify-center py-3">
									<motion.div
										className="h-1 rounded-full bg-default-300"
										style={{ width: handleWidth }}
									/>
								</div>

								{/* Sheet header */}
								<div className="flex items-center justify-between px-5 pb-3">
									<div className="flex items-center gap-2">
										<Bell className="h-4 w-4 text-default-500" />
										<span className="font-semibold text-default-800 text-sm">
											Notifications
										</span>
									</div>
									<button
										type="button"
										onClick={() => setIsOpen(false)}
										className="rounded-full p-1 transition-colors hover:bg-default-200"
									>
										<X className="h-4 w-4 text-default-400" />
									</button>
								</div>

								{/* Notification list */}
								<div className="space-y-2 overflow-y-auto px-4 pb-8" style={{ maxHeight: 260 }}>
									{notifications.map((n, i) => (
										<motion.div
											key={n.title}
											className="flex items-start gap-3 rounded-xl border border-default-200/60 bg-default-100/50 p-3"
											initial={{ opacity: 0, y: 12 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												delay: 0.08 * i,
												type: "spring",
												stiffness: 500,
												damping: 30,
											}}
										>
											<div
												className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
												style={{
													backgroundColor: `${n.color}18`,
												}}
											>
												<n.icon
													className="h-4 w-4"
													style={{ color: n.color }}
												/>
											</div>
											<div className="min-w-0 flex-1">
												<div className="flex items-center justify-between">
													<p className="font-medium text-default-800 text-xs">
														{n.title}
													</p>
													<span className="flex shrink-0 items-center gap-1 text-default-400 text-[10px]">
														<Clock className="h-2.5 w-2.5" />
														{n.time}
													</span>
												</div>
												<p className="mt-0.5 truncate text-default-500 text-[11px]">
													{n.body}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
