import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	FileText,
	Globe,
	Home,
	type LucideIcon,
	Moon,
	Palette,
	Search,
	Settings,
	Sun,
	Users,
	Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PaletteItem = {
	id: string;
	label: string;
	icon: LucideIcon;
	group: string;
	shortcut?: string;
};

const items: PaletteItem[] = [
	{
		id: "home",
		label: "Go to Home",
		icon: Home,
		group: "Navigation",
		shortcut: "G H",
	},
	{
		id: "docs",
		label: "Go to Documentation",
		icon: FileText,
		group: "Navigation",
		shortcut: "G D",
	},
	{ id: "team", label: "Go to Team", icon: Users, group: "Navigation" },
	{ id: "website", label: "Open Website", icon: Globe, group: "Navigation" },
	{
		id: "theme-light",
		label: "Switch to Light Mode",
		icon: Sun,
		group: "Actions",
	},
	{
		id: "theme-dark",
		label: "Switch to Dark Mode",
		icon: Moon,
		group: "Actions",
	},
	{
		id: "quick-action",
		label: "Run Quick Action",
		icon: Zap,
		group: "Actions",
		shortcut: "⌘ E",
	},
	{
		id: "settings",
		label: "Open Settings",
		icon: Settings,
		group: "Settings",
		shortcut: "⌘ ,",
	},
	{
		id: "appearance",
		label: "Customize Appearance",
		icon: Palette,
		group: "Settings",
	},
];

export function CommandPaletteDemo() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);
	const [lastAction, setLastAction] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const filtered = useMemo(() => {
		const result = query
			? items.filter((item) => {
					const q = query.toLowerCase();
					return (
						item.label.toLowerCase().includes(q) ||
						item.group.toLowerCase().includes(q)
					);
				})
			: items;
		setActiveIndex(0);
		return result;
	}, [query]);

	const groups = useMemo(() => {
		const map = new Map<string, PaletteItem[]>();
		for (const item of filtered) {
			const list = map.get(item.group) || [];
			list.push(item);
			map.set(item.group, list);
		}
		return Array.from(map.entries());
	}, [filtered]);

	const flatItems = useMemo(() => filtered, [filtered]);

	const openPalette = useCallback(() => {
		setOpen(true);
		setQuery("");
		setActiveIndex(0);
		setLastAction(null);
	}, []);

	const closePalette = useCallback(() => {
		setOpen(false);
		setQuery("");
	}, []);

	const selectItem = useCallback(
		(item: PaletteItem) => {
			setLastAction(item.label);
			closePalette();
		},
		[closePalette],
	);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				e.stopPropagation();
				if (open) closePalette();
				else openPalette();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open, openPalette, closePalette]);

	useEffect(() => {
		if (open) requestAnimationFrame(() => inputRef.current?.focus());
	}, [open]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((i) => (i + 1) % flatItems.length);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
		} else if (e.key === "Enter" && flatItems[activeIndex]) {
			selectItem(flatItems[activeIndex]);
		} else if (e.key === "Escape") {
			closePalette();
		}
	};

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-6 p-8">
			<motion.div
				className="flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<h2 className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text font-bold text-2xl text-transparent">
					Command Palette
				</h2>
				<p className="text-default-500 text-sm">
					Press ⌘K or click the button below
				</p>
			</motion.div>

			<motion.button
				type="button"
				onClick={openPalette}
				className="flex items-center gap-3 rounded-xl border border-default-200/60 bg-default-50 px-5 py-3 text-default-500 text-sm shadow-sm transition-colors hover:border-default-300 hover:bg-default-100"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<Search className="h-4 w-4" />
				<span>Search commands...</span>
				<kbd className="ml-4 rounded-md border border-default-200 bg-default-100 px-2 py-0.5 font-mono text-default-400 text-xs">
					⌘K
				</kbd>
			</motion.button>

			<AnimatePresence>
				{lastAction && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2 text-emerald-600 text-sm"
					>
						<ArrowRight className="h-4 w-4" />
						<span>Executed: {lastAction}</span>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{open && (
					<>
						<motion.div
							className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={closePalette}
						/>
						<motion.div
							className="-translate-x-1/2 fixed top-[20%] left-1/2 z-50 w-full max-w-lg overflow-hidden rounded-2xl border border-default-200/60 bg-background shadow-2xl"
							initial={{ opacity: 0, scale: 0.95, y: -10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: -10 }}
							transition={{ duration: 0.15 }}
						>
							<div className="flex items-center gap-3 border-default-200/60 border-b px-4 py-3">
								<Search className="h-5 w-5 text-default-400" />
								<input
									ref={inputRef}
									type="text"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder="Type a command..."
									className="flex-1 bg-transparent text-default-900 text-sm outline-none placeholder:text-default-400"
								/>
								<kbd className="rounded border border-default-200 bg-default-100 px-1.5 py-0.5 font-mono text-default-400 text-xs">
									ESC
								</kbd>
							</div>

							<div className="max-h-72 overflow-y-auto py-2">
								{filtered.length === 0 ? (
									<p className="px-4 py-8 text-center text-default-400 text-sm">
										No results found
									</p>
								) : (
									groups.map(([group, groupItems]) => (
										<div key={group}>
											<p className="px-4 pt-2 pb-1 font-medium text-default-400 text-xs uppercase tracking-wider">
												{group}
											</p>
											{groupItems.map((item) => {
												const globalIdx = flatItems.indexOf(item);
												const isActive = globalIdx === activeIndex;
												const Icon = item.icon;
												return (
													<motion.button
														key={item.id}
														type="button"
														onClick={() => selectItem(item)}
														onMouseEnter={() => setActiveIndex(globalIdx)}
														className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
															isActive
																? "bg-default-100 text-default-900"
																: "text-default-600 hover:bg-default-50"
														}`}
														layout
														initial={{ opacity: 0, x: -8 }}
														animate={{ opacity: 1, x: 0 }}
														exit={{ opacity: 0, x: 8 }}
														transition={{ duration: 0.15 }}
													>
														<Icon
															className={`h-4 w-4 ${isActive ? "text-blue-500" : "text-default-400"}`}
														/>
														<span className="flex-1">{item.label}</span>
														{item.shortcut && (
															<span className="font-mono text-default-400 text-xs">
																{item.shortcut}
															</span>
														)}
													</motion.button>
												);
											})}
										</div>
									))
								)}
							</div>

							<div className="flex items-center gap-4 border-default-200/60 border-t px-4 py-2 text-default-400 text-xs">
								<span className="flex items-center gap-1">
									<kbd className="rounded border border-default-200 bg-default-100 px-1 font-mono">
										↑↓
									</kbd>{" "}
									navigate
								</span>
								<span className="flex items-center gap-1">
									<kbd className="rounded border border-default-200 bg-default-100 px-1 font-mono">
										↵
									</kbd>{" "}
									select
								</span>
								<span className="flex items-center gap-1">
									<kbd className="rounded border border-default-200 bg-default-100 px-1 font-mono">
										esc
									</kbd>{" "}
									close
								</span>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
