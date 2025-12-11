import { Folder, Image, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { type TreeNode, TreeView } from "./ui/tree-view";

// Helper to collect default checked nodes from tree data
function collectDefaultChecked(nodes: TreeNode[]): string[] {
	const result: string[] = [];
	const traverse = (nodeList: TreeNode[]) => {
		for (const node of nodeList) {
			if (node.defaultChecked) {
				result.push(node.id);
			}
			if (node.children) {
				traverse(node.children);
			}
		}
	};
	traverse(nodes);
	return result;
}

// Helper to build id -> label lookup map
function buildLabelMap(nodes: TreeNode[]): Map<string, string> {
	const map = new Map<string, string>();
	const traverse = (nodeList: TreeNode[]) => {
		for (const node of nodeList) {
			map.set(node.id, node.label);
			if (node.children) {
				traverse(node.children);
			}
		}
	};
	traverse(nodes);
	return map;
}

export function TreeViewDemo() {
	const [showIcons, setShowIcons] = useState(true);
	const [showCheckboxes, setShowCheckboxes] = useState(false);

	// File system tree data
	const fileSystemData: TreeNode[] = useMemo(
		() => [
			{
				id: "1",
				label: "A parent",
				icon: <Folder className="h-4 w-4 text-blue-500" />,
				children: [
					{
						id: "1-1",
						label: "A child",
						icon: <Folder className="h-4 w-4 text-blue-400" />,
					},
					{
						id: "1-2",
						label: "B child",
						icon: <Folder className="h-4 w-4 text-blue-400" />,
					},
					{
						id: "1-3",
						label: "C child",
						icon: <Folder className="h-4 w-4 text-blue-400" />,
					},
				],
			},
			{
				id: "2",
				label: "B parent",
				icon: <Folder className="h-4 w-4 text-blue-500" />,
			},
			{
				id: "3",
				label: "C parent",
				icon: <Folder className="h-4 w-4 text-blue-500" />,
			},
		],
		[],
	);

	// Media library tree data with checkboxes
	const mediaLibraryData: TreeNode[] = useMemo(
		() => [
			{
				id: "illustrations",
				label: "Illustrations",
				icon: <Folder className="h-4 w-4 text-purple-500" />,
				defaultChecked: true,
				children: [
					{
						id: "vector",
						label: "Vector",
						icon: <Image className="h-4 w-4 text-blue-500" />,
						defaultChecked: true,
					},
					{
						id: "raster",
						label: "Raster",
						icon: <Image className="h-4 w-4 text-green-500" />,
					},
				],
			},
			{
				id: "photography",
				label: "Photography",
				icon: <Folder className="h-4 w-4 text-purple-500" />,
			},
			{
				id: "video",
				label: "Video",
				icon: <Video className="h-4 w-4 text-red-500" />,
			},
		],
		[],
	);

	// Build label lookup from both trees
	const labelMap = useMemo(() => {
		const map = buildLabelMap(fileSystemData);
		for (const [k, v] of buildLabelMap(mediaLibraryData)) {
			map.set(k, v);
		}
		return map;
	}, [fileSystemData, mediaLibraryData]);

	// Initialize checked nodes with default checked items
	const [checkedNodes, setCheckedNodes] = useState<string[]>(() => [
		...collectDefaultChecked(fileSystemData),
		...collectDefaultChecked(mediaLibraryData),
	]);

	const handleCheck = (nodeId: string, checked: boolean) => {
		setCheckedNodes((prev) =>
			checked ? [...prev, nodeId] : prev.filter((id) => id !== nodeId),
		);
	};

	return (
		<div className="w-full space-y-6 p-8">
			{/* Controls */}
			<div className="flex flex-wrap gap-4">
				<label className="flex cursor-pointer items-center gap-2">
					<input
						type="checkbox"
						checked={showIcons}
						onChange={(e) => setShowIcons(e.target.checked)}
						className="h-4 w-4 rounded border-default-300 text-primary focus:ring-2 focus:ring-primary"
					/>
					<span className="text-default-700 text-sm">Show Icons</span>
				</label>
				<label className="flex cursor-pointer items-center gap-2">
					<input
						type="checkbox"
						checked={showCheckboxes}
						onChange={(e) => setShowCheckboxes(e.target.checked)}
						className="h-4 w-4 rounded border-default-300 text-primary focus:ring-2 focus:ring-primary"
					/>
					<span className="text-default-700 text-sm">Show Checkboxes</span>
				</label>
			</div>

			{/* Tree Views */}
			<div className="grid gap-6 md:grid-cols-2">
				<div>
					<h3 className="mb-3 font-semibold text-default-900 text-sm">
						File System
					</h3>
					<TreeView
						data={fileSystemData}
						showIcons={showIcons}
						showCheckboxes={showCheckboxes}
						onCheck={handleCheck}
					/>
				</div>

				<div>
					<h3 className="mb-3 font-semibold text-default-900 text-sm">
						Media Library
					</h3>
					<TreeView
						data={mediaLibraryData}
						showIcons={showIcons}
						showCheckboxes={showCheckboxes}
						onCheck={handleCheck}
					/>
				</div>
			</div>

			{/* Checked nodes display */}
			{showCheckboxes && checkedNodes.length > 0 && (
				<div className="rounded-lg border border-default-200 bg-default-50 p-4">
					<p className="mb-2 font-medium text-default-700 text-sm">
						Checked nodes: {checkedNodes.length}
					</p>
					<div className="flex flex-wrap gap-2">
						{checkedNodes.map((nodeId) => (
							<span
								key={nodeId}
								className="rounded-full bg-primary/10 px-3 py-1 text-primary text-xs"
							>
								{labelMap.get(nodeId) ?? nodeId}
							</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
