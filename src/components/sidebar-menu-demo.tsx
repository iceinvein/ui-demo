import { AnimatePresence, motion } from "framer-motion";
import {
	Calendar,
	FileText,
	Folder,
	Home,
	LayoutDashboard,
	Menu,
	Settings,
	TrendingUp,
	Users,
	X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
	{ id: 1, label: "Home", icon: Home, color: "text-purple-500" },
	{ id: 2, label: "Projects", icon: Folder, color: "text-blue-500" },
	{ id: 3, label: "Team", icon: Users, color: "text-green-500" },
	{ id: 4, label: "Calendar", icon: Calendar, color: "text-orange-500" },
	{ id: 5, label: "Documents", icon: FileText, color: "text-cyan-500" },
	{ id: 6, label: "Reports", icon: TrendingUp, color: "text-pink-500" },
	{ id: 7, label: "Settings", icon: Settings, color: "text-gray-500" },
];

const sidebarVariants = {
	closed: {
		x: "-100%",
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
		},
	},
	open: {
		x: 0,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
			staggerChildren: 0.07,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	closed: {
		x: -20,
		opacity: 0,
	},
	open: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 24,
		},
	},
};

export function SidebarMenuDemo() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative flex h-[600px] w-full items-start overflow-hidden rounded-2xl border border-default-200 bg-linear-to-br from-default-50 to-default-100">
			{/* Menu Bar */}
			<div className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between border-default-200 border-b bg-background/80 p-4 backdrop-blur-sm">
				<motion.button
					className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-purple-500/10 to-pink-500/10 text-default-700 transition-colors hover:from-purple-500/20 hover:to-pink-500/20"
					onClick={() => setIsOpen(!isOpen)}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<AnimatePresence mode="wait">
						{isOpen ? (
							<motion.div
								key="close"
								initial={{ rotate: -90, opacity: 0 }}
								animate={{ rotate: 0, opacity: 1 }}
								exit={{ rotate: 90, opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<X className="h-5 w-5" />
							</motion.div>
						) : (
							<motion.div
								key="menu"
								initial={{ rotate: -90, opacity: 0 }}
								animate={{ rotate: 0, opacity: 1 }}
								exit={{ rotate: 90, opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<Menu className="h-5 w-5" />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.button>
				<h1 className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-lg text-transparent">
					Dashboard
				</h1>
				<div className="h-10 w-10" /> {/* Spacer for centering */}
			</div>

			{/* Backdrop */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="absolute inset-0 z-30 bg-black/20 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsOpen(false)}
					/>
				)}
			</AnimatePresence>

			{/* Sidebar */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="absolute top-0 left-0 z-40 flex h-full w-72 flex-col border-default-200 border-r bg-background shadow-2xl"
						variants={sidebarVariants}
						initial="closed"
						animate="open"
						exit="closed"
					>
						{/* Sidebar Header */}
						<div className="shrink-0 border-default-200 border-b p-6">
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
							>
								<h2 className="mb-1 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-transparent text-xl">
									Navigation
								</h2>
								<p className="text-default-500 text-sm">
									Choose your destination
								</p>
							</motion.div>
						</div>

						{/* Menu Items - Scrollable */}
						<nav className="flex-1 overflow-y-auto p-4">
							<motion.ul className="space-y-2">
								{menuItems.map((item) => {
									const Icon = item.icon;
									return (
										<motion.li key={item.id} variants={itemVariants}>
											<motion.button
												className="flex w-full items-center gap-3 rounded-lg bg-default-100/50 p-3 text-left transition-colors hover:bg-default-200/50"
												whileHover={{ scale: 1.02, x: 4 }}
												whileTap={{ scale: 0.98 }}
											>
												<div
													className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background shadow-sm ${item.color}`}
												>
													<Icon className="h-5 w-5" />
												</div>
												<span className="font-medium text-default-900">
													{item.label}
												</span>
											</motion.button>
										</motion.li>
									);
								})}
							</motion.ul>
						</nav>

						{/* Sidebar Footer */}
						<motion.div
							className="shrink-0 border-default-200 border-t bg-linear-to-br from-purple-500/5 to-pink-500/5 p-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
						>
							<p className="text-center text-default-500 text-xs">
								Framer Motion Sidebar
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main Content */}
			<div className="flex h-full w-full flex-col items-center justify-center p-8 pt-24">
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<motion.div
						className="mb-4 flex justify-center"
						animate={{ rotate: [0, 5, -5, 0] }}
						transition={{ duration: 3, repeat: Infinity }}
					>
						<LayoutDashboard className="h-16 w-16 text-purple-500" />
					</motion.div>
					<h2 className="mb-2 font-bold text-2xl text-default-900">
						Sidebar Navigation
					</h2>
					<p className="mb-6 text-default-600">
						Click the menu button to see the staggered animation
					</p>
					<motion.div
						className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 text-default-700 text-sm"
						animate={{ scale: [1, 1.05, 1] }}
						transition={{ duration: 2, repeat: Infinity }}
					>
						<Menu className="h-4 w-4" />
						<span>Try opening the menu</span>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
