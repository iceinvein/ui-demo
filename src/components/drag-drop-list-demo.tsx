import { useState } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import {
	CheckCircle,
	Code,
	GripVertical,
	Palette,
	Rocket,
	Search,
	Zap,
	type LucideIcon,
} from "lucide-react";

interface Item {
	id: string;
	title: string;
	description: string;
	icon: LucideIcon;
	color: string;
}

const initialItems: Item[] = [
	{
		id: "1",
		title: "Design System",
		description: "Create a comprehensive design system with components",
		icon: Palette,
		color: "from-purple-500/20 to-pink-500/20",
	},
	{
		id: "2",
		title: "User Research",
		description: "Conduct user interviews and gather feedback",
		icon: Search,
		color: "from-blue-500/20 to-cyan-500/20",
	},
	{
		id: "3",
		title: "Prototype",
		description: "Build interactive prototypes for testing",
		icon: Zap,
		color: "from-yellow-500/20 to-orange-500/20",
	},
	{
		id: "4",
		title: "Development",
		description: "Implement features with best practices",
		icon: Code,
		color: "from-green-500/20 to-emerald-500/20",
	},
	{
		id: "5",
		title: "Testing",
		description: "Write comprehensive tests and QA",
		icon: CheckCircle,
		color: "from-red-500/20 to-rose-500/20",
	},
	{
		id: "6",
		title: "Deployment",
		description: "Deploy to production with CI/CD",
		icon: Rocket,
		color: "from-indigo-500/20 to-violet-500/20",
	},
];

function DraggableItem({ item }: { item: Item }) {
	const controls = useDragControls();
	const Icon = item.icon;

	return (
		<Reorder.Item
			value={item}
			id={item.id}
			dragListener={false}
			dragControls={controls}
		>
			<motion.div
				className={`group relative flex items-start gap-4 rounded-xl border border-default-200 bg-gradient-to-br ${item.color} p-4 backdrop-blur-sm select-none`}
				whileHover={{
					scale: 1.01,
					boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
				}}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 30,
				}}
			>
				{/* Drag Handle */}
				<div
					onPointerDown={(e) => controls.start(e)}
					className="cursor-grab touch-none pt-1 text-default-400 active:cursor-grabbing"
				>
					<GripVertical className="h-5 w-5" />
				</div>

				{/* Icon */}
				<motion.div
					className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-background/50 shadow-sm"
					whileHover={{ scale: 1.05 }}
					transition={{ type: "spring", stiffness: 400, damping: 20 }}
				>
					<Icon className="h-6 w-6 text-default-700" />
				</motion.div>

				{/* Content */}
				<div className="flex-1">
					<h3 className="mb-1 font-semibold text-default-900">{item.title}</h3>
					<p className="text-default-600 text-sm">{item.description}</p>
				</div>

				{/* Hover indicator */}
				<motion.div
					className="pointer-events-none absolute inset-0 rounded-xl border-2 border-primary/0"
					whileHover={{
						borderColor: "rgba(99, 102, 241, 0.2)",
					}}
					transition={{ duration: 0.3 }}
				/>
			</motion.div>
		</Reorder.Item>
	);
}

export function DragDropListDemo() {
	const [items, setItems] = useState(initialItems);

	return (
		<div className="mx-auto w-full max-w-2xl p-6">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="mb-6 text-center"
			>
				<h2 className="mb-2 bg-gradient-to-r from-primary via-secondary to-success bg-clip-text font-bold text-2xl text-transparent">
					Project Tasks
				</h2>
				<p className="text-default-600 text-sm">
					Drag and drop to reorder your tasks
				</p>
			</motion.div>

			{/* Reorderable List */}
			<Reorder.Group
				axis="y"
				values={items}
				onReorder={setItems}
				className="space-y-3"
			>
				{items.map((item) => (
					<DraggableItem key={item.id} item={item} />
				))}
			</Reorder.Group>

			{/* Stats */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="mt-6 flex items-center justify-center gap-6 rounded-xl border border-default-200 bg-default-50/50 p-4 backdrop-blur-sm"
			>
				<div className="text-center">
					<div className="font-bold text-2xl text-primary">{items.length}</div>
					<div className="text-default-600 text-xs">Total Tasks</div>
				</div>
				<div className="h-8 w-px bg-default-200" />
				<div className="text-center">
					<div className="font-bold text-2xl text-success">
						{items.filter((_, i) => i < 3).length}
					</div>
					<div className="text-default-600 text-xs">High Priority</div>
				</div>
				<div className="h-8 w-px bg-default-200" />
				<div className="text-center">
					<div className="font-bold text-2xl text-secondary">
						{items.filter((_, i) => i >= 3).length}
					</div>
					<div className="text-default-600 text-xs">Low Priority</div>
				</div>
			</motion.div>

			{/* Instructions */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
				className="mt-6 rounded-lg bg-primary/5 p-4 text-center"
			>
				<p className="text-default-600 text-sm">
					💡 <strong>Tip:</strong> Click and hold the drag handle to reorder tasks
				</p>
			</motion.div>
		</div>
	);
}

