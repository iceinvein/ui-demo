import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface StreamingCodeProps {
	code: string;
	language?: string;
	speed?: number;
	onComplete?: () => void;
	className?: string;
	showLineNumbers?: boolean;
}

export function StreamingCode({
	code,
	language = "typescript",
	speed = 30,
	onComplete,
	className = "",
	showLineNumbers = true,
}: StreamingCodeProps) {
	const [displayedCode, setDisplayedCode] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		if (currentIndex < code.length) {
			const timeout = setTimeout(() => {
				setDisplayedCode(code.slice(0, currentIndex + 1));
				setCurrentIndex(currentIndex + 1);
			}, speed);

			return () => clearTimeout(timeout);
		}
		if (currentIndex === code.length && !isComplete) {
			setIsComplete(true);
			onComplete?.();
		}
	}, [currentIndex, code, speed, onComplete, isComplete]);

	return (
		<div
			className={`relative overflow-hidden rounded-lg border border-default-200 bg-zinc-950 ${className}`}
		>
			{/* Header */}
			<div className="flex items-center justify-between border-zinc-800 border-b bg-zinc-900 px-4 py-2">
				<div className="flex items-center gap-2">
					<span className="h-3 w-3 rounded-full bg-red-500" />
					<span className="h-3 w-3 rounded-full bg-yellow-500" />
					<span className="h-3 w-3 rounded-full bg-green-500" />
				</div>
				<span className="font-mono text-xs text-zinc-400">{language}</span>
			</div>

			{/* Code Content */}
			<div className="relative overflow-x-auto">
				<SyntaxHighlighter
					language={language}
					style={vscDarkPlus}
					customStyle={{
						margin: 0,
						padding: "1rem",
						fontSize: "0.875rem",
						lineHeight: "1.5",
						background: "transparent",
					}}
					showLineNumbers={showLineNumbers}
					wrapLines
					lineNumberStyle={{
						minWidth: "2rem",
						paddingRight: "1rem",
						color: "#52525b",
						userSelect: "none",
					}}
				>
					{displayedCode}
				</SyntaxHighlighter>
			</div>

			{/* Progress Indicator */}
			{!isComplete && (
				<div className="absolute right-0 bottom-0 left-0 h-1 bg-zinc-800">
					<motion.div
						className="h-full bg-blue-500"
						initial={{ width: "0%" }}
						animate={{
							width: `${(currentIndex / code.length) * 100}%`,
						}}
						transition={{ duration: 0.1 }}
					/>
				</div>
			)}
		</div>
	);
}
