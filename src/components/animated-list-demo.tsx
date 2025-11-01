import { motion } from "framer-motion";
import {
	Calendar,
	CheckCircle2,
	Code2,
	Coffee,
	Dumbbell,
	FileText,
	Phone,
	ShoppingCart,
	Sparkles,
	Sprout,
	Target,
} from "lucide-react";
import { useState } from "react";
import { AnimatedList, type AnimatedListItem } from "./ui/animated-list";

const sampleItems = [
	{
		title: "Buy groceries",
		subtitle: "Get milk and eggs",
		icon: ShoppingCart,
		color: "emerald",
	},
	{
		title: "Finish project report",
		subtitle: "Due tomorrow",
		icon: FileText,
		color: "blue",
	},
	{
		title: "Call dentist",
		subtitle: "Schedule checkup",
		icon: Phone,
		color: "purple",
	},
	{
		title: "Read a book",
		subtitle: "30 minutes daily",
		icon: CheckCircle2,
		color: "amber",
	},
	{
		title: "Go for a run",
		subtitle: "Morning exercise",
		icon: Dumbbell,
		color: "red",
	},
	{
		title: "Water plants",
		subtitle: "Living room & balcony",
		icon: Sprout,
		color: "green",
	},
	{
		title: "Learn TypeScript",
		subtitle: "Complete tutorial",
		icon: Code2,
		color: "indigo",
	},
	{
		title: "Make coffee",
		subtitle: "Fresh brew",
		icon: Coffee,
		color: "orange",
	},
];

const colorClasses = {
	emerald: "bg-emerald-500/10 text-emerald-500",
	blue: "bg-blue-500/10 text-blue-500",
	purple: "bg-purple-500/10 text-purple-500",
	amber: "bg-amber-500/10 text-amber-500",
	red: "bg-red-500/10 text-red-500",
	green: "bg-green-500/10 text-green-500",
	indigo: "bg-indigo-500/10 text-indigo-500",
	orange: "bg-orange-500/10 text-orange-500",
	pink: "bg-pink-500/10 text-pink-500",
};

export function AnimatedListDemo() {
	const [items, setItems] = useState<AnimatedListItem[]>([
		{
			id: "1",
			title: "Buy groceries",
			content: (
				<div className="flex items-center gap-4">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
						<ShoppingCart className="h-5 w-5 text-emerald-500" />
					</div>
					<div className="flex-1">
						<h4 className="m-0 font-semibold text-default-900">
							Buy groceries
						</h4>
						<p className="m-0 text-default-500 text-sm">Get milk and eggs</p>
					</div>
				</div>
			),
		},
		{
			id: "2",
			title: "Finish project report",
			content: (
				<div className="flex items-center gap-4">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
						<FileText className="h-5 w-5 text-blue-500" />
					</div>
					<div className="flex-1">
						<h4 className="m-0 font-semibold text-default-900">
							Finish project report
						</h4>
						<p className="m-0 text-default-500 text-sm">Due tomorrow</p>
					</div>
				</div>
			),
		},
		{
			id: "3",
			title: "Call dentist",
			content: (
				<div className="flex items-center gap-4">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
						<Phone className="h-5 w-5 text-purple-500" />
					</div>
					<div className="flex-1">
						<h4 className="m-0 font-semibold text-default-900">Call dentist</h4>
						<p className="m-0 text-default-500 text-sm">Schedule checkup</p>
					</div>
				</div>
			),
		},
	]);

	const [inputValue, setInputValue] = useState("");

	const addItem = () => {
		if (!inputValue.trim()) return;

		const newItem: AnimatedListItem = {
			id: Date.now().toString(),
			title: inputValue,
			content: (
				<div className="flex items-center gap-4">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10">
						<Sparkles className="h-5 w-5 text-pink-500" />
					</div>
					<div className="flex-1">
						<h4 className="m-0 font-semibold text-default-900">{inputValue}</h4>
						<p className="m-0 text-default-500 text-sm">Just added</p>
					</div>
				</div>
			),
		};

		setItems([...items, newItem]);
		setInputValue("");
	};

	const addRandomItem = () => {
		// Filter out items that are already in the list by title
		const availableItems = sampleItems.filter(
			(sample) => !items.some((item) => item.title === sample.title),
		);

		if (availableItems.length === 0) {
			// If all sample items are used, add a generic one
			const newItem: AnimatedListItem = {
				id: Date.now().toString(),
				title: `New task #${items.length + 1}`,
				content: (
					<div className="flex items-center gap-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
							<Target className="h-5 w-5 text-indigo-500" />
						</div>
						<div className="flex-1">
							<h4 className="m-0 font-semibold text-default-900">
								New task #{items.length + 1}
							</h4>
							<p className="m-0 text-default-500 text-sm">
								A random task to complete
							</p>
						</div>
					</div>
				),
			};
			setItems([...items, newItem]);
			return;
		}

		const randomItem =
			availableItems[Math.floor(Math.random() * availableItems.length)];
		const Icon = randomItem.icon;

		const newItem: AnimatedListItem = {
			id: Date.now().toString(),
			title: randomItem.title,
			content: (
				<div className="flex items-center gap-4">
					<div
						className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[randomItem.color as keyof typeof colorClasses]}`}
					>
						<Icon className="h-5 w-5" />
					</div>
					<div className="flex-1">
						<h4 className="m-0 font-semibold text-default-900">
							{randomItem.title}
						</h4>
						<p className="m-0 text-default-500 text-sm">
							{randomItem.subtitle}
						</p>
					</div>
				</div>
			),
		};

		setItems([...items, newItem]);
	};

	const removeItem = (id: string) => {
		setItems(items.filter((item) => item.id !== id));
	};

	const clearAll = () => {
		setItems([]);
	};

	return (
		<div className="flex min-h-[500px] items-center justify-center p-8">
			<div className="w-full max-w-3xl">
				{/* Header */}
				<div className="mb-8 text-center">
					<div className="mb-3 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-3">
						<Calendar className="h-6 w-6 text-primary" />
					</div>
					<h2 className="mb-2 font-bold text-3xl">Animated Task List</h2>
					<p className="text-default-500 text-lg">
						Watch smooth enter and exit animations as you manage your tasks
					</p>
				</div>

				{/* Controls */}
				<div className="mb-6 space-y-3">
					{/* Input Row */}
					<div className="flex gap-3">
						<div className="relative flex-1">
							<input
								type="text"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										addItem();
									}
								}}
								placeholder="What needs to be done?"
								className="w-full rounded-xl border border-default-200 bg-default-100 py-3 pr-4 pl-4 text-default-900 outline-none transition-colors placeholder:text-default-400 focus:border-primary focus:bg-default-200"
							/>
						</div>
						<motion.button
							type="button"
							onClick={addItem}
							disabled={!inputValue.trim()}
							className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/30 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Sparkles className="h-4 w-4" />
							Add
						</motion.button>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3">
						<motion.button
							type="button"
							onClick={addRandomItem}
							className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-secondary/20 bg-secondary/10 px-4 py-2.5 font-medium text-secondary transition-colors hover:border-secondary/30 hover:bg-secondary/20"
							whileHover={{ scale: 1.01 }}
							whileTap={{ scale: 0.99 }}
						>
							<Target className="h-4 w-4" />
							Add Random Task
						</motion.button>
						<motion.button
							type="button"
							onClick={clearAll}
							disabled={items.length === 0}
							className="flex items-center gap-2 rounded-xl border border-danger/20 bg-danger/10 px-4 py-2.5 font-medium text-danger transition-colors hover:border-danger/30 hover:bg-danger/20 disabled:cursor-not-allowed disabled:opacity-50"
							whileHover={{ scale: 1.01 }}
							whileTap={{ scale: 0.99 }}
						>
							<motion.div
								animate={items.length > 0 ? { rotate: [0, -10, 10, 0] } : {}}
								transition={{ duration: 0.5 }}
							>
								<CheckCircle2 className="h-4 w-4" />
							</motion.div>
							Clear All
						</motion.button>
					</div>
				</div>

				{/* Stats Banner */}
				<motion.div
					layout
					className="mb-6 overflow-hidden rounded-2xl border border-default-200 bg-gradient-to-br from-default-50 to-default-100/50 backdrop-blur-sm"
				>
					<div className="flex items-center justify-between p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
								<CheckCircle2 className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="font-medium text-default-500 text-xs uppercase tracking-wide">
									Total Tasks
								</p>
								<motion.p
									key={items.length}
									initial={{ scale: 1.3, color: "var(--primary)" }}
									animate={{
										scale: 1,
										color: "var(--nextui-colors-default900)",
									}}
									className="font-bold text-2xl text-default-900"
								>
									{items.length}
								</motion.p>
							</div>
						</div>
						<div className="hidden text-right sm:block">
							<p className="text-default-400 text-sm">
								Hover over tasks to remove them
							</p>
						</div>
					</div>
				</motion.div>

				{/* List */}
				{items.length === 0 ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1 }}
						className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-default-200 border-dashed bg-default-50/50 p-8"
					>
						<div className="mb-4 rounded-full bg-default-100 p-4">
							<CheckCircle2 className="h-8 w-8 text-default-400" />
						</div>
						<h3 className="mb-2 font-semibold text-default-900 text-lg">
							No tasks yet
						</h3>
						<p className="text-center text-default-500">
							Add your first task above or try the random task button
						</p>
					</motion.div>
				) : (
					<AnimatedList items={items} onRemove={removeItem} />
				)}
			</div>
		</div>
	);
}
