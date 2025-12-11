import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, File, Folder } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export interface TreeNode {
	id: string;
	label: string;
	icon?: React.ReactNode;
	children?: TreeNode[];
	checkable?: boolean;
	defaultChecked?: boolean;
}

interface TreeViewProps {
	data: TreeNode[];
	showIcons?: boolean;
	showCheckboxes?: boolean;
	onCheck?: (nodeId: string, checked: boolean) => void;
	className?: string;
}

interface TreeNodeProps {
	node: TreeNode;
	level: number;
	showIcons: boolean;
	showCheckboxes: boolean;
	onCheck?: (nodeId: string, checked: boolean) => void;
}

function TreeNodeComponent({
	node,
	level,
	showIcons,
	showCheckboxes,
	onCheck,
}: TreeNodeProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isChecked, setIsChecked] = useState(node.defaultChecked || false);
	const hasChildren = node.children && node.children.length > 0;

	const handleCheck = () => {
		const newChecked = !isChecked;
		setIsChecked(newChecked);
		onCheck?.(node.id, newChecked);
	};

	const toggleExpand = () => {
		if (hasChildren) {
			setIsExpanded(!isExpanded);
		}
	};

	return (
		<div className="relative">
			{/* Vertical connecting line for nested items */}
			{level > 0 && (
				<div
					className="absolute top-0 bottom-0 border-default-200 border-l"
					style={{ left: `${level * 24 + 11}px` }}
				/>
			)}

			<motion.div
				initial={{ opacity: 0, x: -8 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.15 }}
				className="group relative flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-default-100/50"
				style={{ paddingLeft: `${level * 24 + 12}px` }}
				onClick={hasChildren ? toggleExpand : undefined}
			>
				{/* Expand/Collapse Button - only show for items with children */}
				{hasChildren ? (
					<button
						type="button"
						aria-label={isExpanded ? "Collapse" : "Expand"}
						onClick={(e) => {
							e.stopPropagation();
							toggleExpand();
						}}
						className="flex h-5 w-5 items-center justify-center rounded-sm transition-colors hover:bg-default-200"
					>
						<motion.div
							animate={{ rotate: isExpanded ? 90 : 0 }}
							transition={{ duration: 0.15, ease: "easeOut" }}
						>
							<ChevronRight className="h-3.5 w-3.5 text-default-500" />
						</motion.div>
					</button>
				) : (
					<div className="w-5" />
				)}

				{/* Custom Checkbox */}
				{showCheckboxes && node.checkable !== false && (
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							handleCheck();
						}}
						className={cn(
							"flex h-4 w-4 items-center justify-center rounded border transition-all",
							isChecked
								? "border-primary bg-primary"
								: "border-default-400 hover:border-default-500",
						)}
					>
						{isChecked && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ duration: 0.1 }}
							>
								<Check className="h-3 w-3 text-white" />
							</motion.div>
						)}
					</button>
				)}

				{/* Icon */}
				{showIcons && (
					<span className="shrink-0">
						{node.icon ||
							(hasChildren ? (
								<Folder className="h-4 w-4 text-default-500" />
							) : (
								<File className="h-4 w-4 text-default-400" />
							))}
					</span>
				)}

				{/* Label */}
				<span
					className={cn(
						"select-none text-sm transition-colors",
						hasChildren ? "font-medium text-default-800" : "text-default-600",
						isChecked && "font-medium text-primary",
					)}
				>
					{node.label}
				</span>
			</motion.div>

			{/* Children */}
			<AnimatePresence initial={false}>
				{isExpanded && hasChildren && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						{node.children?.map((child) => (
							<TreeNodeComponent
								key={child.id}
								node={child}
								level={level + 1}
								showIcons={showIcons}
								showCheckboxes={showCheckboxes}
								onCheck={onCheck}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export function TreeView({
	data,
	showIcons = true,
	showCheckboxes = false,
	onCheck,
	className,
}: TreeViewProps) {
	return (
		<div
			className={cn(
				"rounded-xl border border-default-200 bg-default-50/50 p-3",
				className,
			)}
		>
			<div className="space-y-0.5">
				{data.map((node) => (
					<TreeNodeComponent
						key={node.id}
						node={node}
						level={0}
						showIcons={showIcons}
						showCheckboxes={showCheckboxes}
						onCheck={onCheck}
					/>
				))}
			</div>
		</div>
	);
}
