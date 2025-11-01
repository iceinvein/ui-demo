import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { CodeFile } from "@/types/component";

interface CodeViewerProps {
	code: string | CodeFile[];
}

export function CodeViewer({ code }: CodeViewerProps) {
	const [copied, setCopied] = useState(false);
	const [activeFileIndex, setActiveFileIndex] = useState(0);

	// Normalize code to array format
	const files: CodeFile[] =
		typeof code === "string"
			? [{ filename: "component.tsx", code, language: "tsx" }]
			: code;

	const activeFile = files[activeFileIndex];
	const currentCode = activeFile.code;
	const currentLanguage = activeFile.language || "tsx";

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(currentCode);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy code:", err);
		}
	};

	return (
		<div className="relative">
			{/* Header with File Tabs and Copy Button */}
			<div className="mb-3 flex items-center justify-between gap-4">
				{/* File Tabs */}
				{files.length > 1 ? (
					<div className="relative flex gap-1 overflow-x-auto rounded-lg bg-default-100 p-1">
						{files.map((file, index) => (
							<button
								key={file.filename}
								type="button"
								onClick={() => setActiveFileIndex(index)}
								className={`relative whitespace-nowrap rounded-md px-4 py-2 font-medium text-sm transition-colors ${
									index === activeFileIndex
										? "text-default-50"
										: "text-default-600 hover:text-default-900"
								}`}
							>
								<span className="relative z-10">{file.filename}</span>
								{index === activeFileIndex && (
									<motion.div
										layoutId="activeFileTab"
										className="absolute inset-0 rounded-md bg-default-900"
										transition={{
											type: "spring",
											stiffness: 500,
											damping: 30,
										}}
									/>
								)}
							</button>
						))}
					</div>
				) : (
					<div className="rounded-lg bg-default-100 px-4 py-2 font-medium text-default-700 text-sm">
						{files[0].filename}
					</div>
				)}

				{/* Copy Button */}
				<motion.button
					type="button"
					onClick={handleCopy}
					className="flex items-center gap-2 rounded-lg bg-default-100 px-3 py-2 font-medium text-default-700 text-sm transition-colors hover:bg-default-200"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					{copied ? (
						<>
							<svg
								className="h-4 w-4 text-success"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<span className="text-success">Copied!</span>
						</>
					) : (
						<>
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
							<span>Copy</span>
						</>
					)}
				</motion.button>
			</div>

			{/* Code with Animation */}
			<div className="relative overflow-hidden rounded-xl">
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={activeFileIndex}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{
							duration: 0.3,
							ease: [0.21, 0.47, 0.32, 0.98],
						}}
					>
						<SyntaxHighlighter
							language={currentLanguage}
							style={vscDarkPlus}
							customStyle={{
								margin: 0,
								borderRadius: "0.75rem",
								padding: "1.5rem",
								fontSize: "0.875rem",
								lineHeight: "1.5",
							}}
							showLineNumbers
							wrapLines
						>
							{currentCode}
						</SyntaxHighlighter>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
