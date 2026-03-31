import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

type ScrambleState = "idle" | "scrambling" | "done";

function useTextScramble(
	text: string,
	{
		speed = 35,
		settleDelay = 4,
		trigger = true,
	}: { speed?: number; settleDelay?: number; trigger?: boolean } = {},
) {
	const [displayed, setDisplayed] = useState(text);
	const [state, setState] = useState<ScrambleState>("idle");
	const frameRef = useRef(0);
	const rafRef = useRef<number>(0);

	const scramble = useCallback(() => {
		setState("scrambling");
		frameRef.current = 0;

		const totalFrames = text.length + settleDelay * text.length;
		let lastTime = 0;

		const tick = (time: number) => {
			if (time - lastTime < speed) {
				rafRef.current = requestAnimationFrame(tick);
				return;
			}
			lastTime = time;
			frameRef.current++;

			const result = text
				.split("")
				.map((char, i) => {
					if (char === " ") return " ";
					// Characters settle left-to-right
					const settleFrame = (i + 1) * settleDelay;
					if (frameRef.current >= settleFrame) return char;
					return CHARS[Math.floor(Math.random() * CHARS.length)];
				})
				.join("");

			setDisplayed(result);

			if (frameRef.current >= totalFrames) {
				setDisplayed(text);
				setState("done");
				return;
			}
			rafRef.current = requestAnimationFrame(tick);
		};

		rafRef.current = requestAnimationFrame(tick);
	}, [text, speed, settleDelay]);

	useEffect(() => {
		if (trigger) scramble();
		return () => cancelAnimationFrame(rafRef.current);
	}, [trigger, scramble]);

	return { displayed, state, scramble };
}

const PHRASES = [
	{ text: "Decrypting transmission...", label: "Cryptographic" },
	{ text: "System initialized.", label: "Terminal" },
	{ text: "Hello, World!", label: "Classic" },
	{ text: "Access granted.", label: "Authentication" },
];

function ScrambleLine({
	text,
	speed,
	settleDelay,
	className,
	trigger,
}: {
	text: string;
	speed?: number;
	settleDelay?: number;
	className?: string;
	trigger: boolean;
}) {
	const { displayed } = useTextScramble(text, { speed, settleDelay, trigger });

	return <span className={className}>{displayed}</span>;
}

export function TextScrambleDemo() {
	const [key, setKey] = useState(0);
	const [activePhrase, setActivePhrase] = useState(0);

	const replay = () => {
		setKey((k) => k + 1);
	};

	const cyclePhrase = () => {
		setActivePhrase((p) => (p + 1) % PHRASES.length);
		setKey((k) => k + 1);
	};

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-10 p-8">
			{/* Header */}
			<motion.div
				className="flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
			>
				<h2 className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text font-bold text-2xl text-transparent">
					Text Scramble
				</h2>
				<p className="text-default-500 text-sm">
					Characters decode through randomized noise before settling
				</p>
			</motion.div>

			{/* Main showcase */}
			<motion.div
				className="w-full max-w-2xl overflow-hidden rounded-2xl border border-default-200/60"
				style={{
					background:
						"linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(6,182,212,0.06) 50%, transparent 100%)",
				}}
				initial={{ opacity: 0, scale: 0.97 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.15 }}
			>
				{/* Terminal-style header bar */}
				<div className="flex items-center gap-2 border-default-200/60 border-b px-5 py-3">
					<div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
					<div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
					<div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
					<span className="ml-3 font-mono text-default-400 text-xs">
						scramble.decode()
					</span>
				</div>

				{/* Scramble display */}
				<div className="flex min-h-[200px] flex-col items-center justify-center gap-8 p-8">
					<div
						key={`main-${key}-${activePhrase}`}
						className="text-center font-mono text-3xl text-default-900 tracking-wider md:text-4xl"
					>
						<ScrambleLine
							text={PHRASES[activePhrase].text}
							speed={30}
							settleDelay={5}
							trigger={true}
						/>
					</div>

					{/* Phrase selector pills */}
					<div className="flex flex-wrap justify-center gap-2">
						{PHRASES.map((phrase, i) => (
							<button
								key={phrase.label}
								type="button"
								onClick={() => {
									setActivePhrase(i);
									setKey((k) => k + 1);
								}}
								className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
									i === activePhrase
										? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
										: "border-default-200/60 text-default-500 hover:border-default-300 hover:text-default-700"
								}`}
							>
								{phrase.label}
							</button>
						))}
					</div>
				</div>
			</motion.div>

			{/* Speed comparison */}
			<motion.div
				className="w-full max-w-2xl rounded-2xl border border-default-200 bg-default-50 p-6"
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				<p className="mb-4 font-semibold text-default-500 text-xs uppercase tracking-widest">
					Decode speed comparison
				</p>
				<div className="space-y-4">
					{[
						{ label: "Slow (60ms, settle×8)", speed: 60, settle: 8 },
						{ label: "Default (35ms, settle×4)", speed: 35, settle: 4 },
						{ label: "Fast (15ms, settle×2)", speed: 15, settle: 2 },
					].map(({ label, speed, settle }) => (
						<div
							key={`${label}-${key}`}
							className="flex items-baseline gap-3"
						>
							<span className="w-48 shrink-0 font-mono text-default-400 text-xs">
								{label}
							</span>
							<span className="font-mono text-default-900 text-sm tracking-wider">
								<ScrambleLine
									text="Decode complete."
									speed={speed}
									settleDelay={settle}
									trigger={true}
								/>
							</span>
						</div>
					))}
				</div>
			</motion.div>

			{/* Controls */}
			<div className="flex gap-3">
				<motion.button
					type="button"
					className="flex items-center gap-2 rounded-xl border border-default-200 bg-default-100 px-4 py-2 text-default-700 text-sm transition-colors hover:bg-default-200"
					whileTap={{ scale: 0.97 }}
					onClick={replay}
				>
					<RefreshCw className="h-4 w-4" />
					Replay
				</motion.button>
				<motion.button
					type="button"
					className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2 text-sm text-white"
					whileTap={{ scale: 0.97 }}
					onClick={cyclePhrase}
				>
					Next Phrase
				</motion.button>
			</div>
		</div>
	);
}
