import { Button } from "@heroui/button";
import { useState } from "react";
import { Typewriter } from "./ui/typewriter";

const HEADING = "Build interfaces that feel alive.";
const SUBHEADING =
	"Smooth, configurable character-by-character text reveal — zero dependencies beyond React.";
const CAPTION = "Try adjusting the speed and delay props in your own project.";

export function TypewriterDemo() {
	const [replayKey, setReplayKey] = useState(0);
	const [subVisible, setSubVisible] = useState(false);
	const [captionVisible, setCaptionVisible] = useState(false);

	const replay = () => {
		setSubVisible(false);
		setCaptionVisible(false);
		// Micro-tick so state resets propagate before the key bump remounts children
		setTimeout(() => setReplayKey((k) => k + 1), 0);
	};

	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center gap-10 p-8">
			{/* Live demo area */}
			<div key={replayKey} className="w-full max-w-2xl space-y-6 text-center">
				{/* Heading — large, gradient */}
				<h2 className="bg-linear-to-r from-primary via-secondary to-success bg-clip-text font-bold text-4xl text-transparent leading-tight md:text-5xl">
					<Typewriter
						text={HEADING}
						speed={45}
						cursor
						onComplete={() => setSubVisible(true)}
					/>
				</h2>

				{/* Subheading — appears after heading finishes */}
				<p className="min-h-[3rem] text-default-600 text-lg leading-relaxed">
					{subVisible && (
						<Typewriter
							text={SUBHEADING}
							speed={28}
							onComplete={() => setCaptionVisible(true)}
						/>
					)}
				</p>

				{/* Caption — appears last, slower, muted */}
				<p className="min-h-[1.5rem] font-mono text-default-400 text-sm">
					{captionVisible && (
						<Typewriter text={CAPTION} speed={22} cursor delay={200} />
					)}
				</p>
			</div>

			{/* Speed comparison row */}
			<div className="w-full max-w-2xl rounded-2xl border border-default-200 bg-default-50 p-6">
				<p className="mb-4 font-semibold text-default-500 text-xs uppercase tracking-widest">
					Speed comparison
				</p>
				<div className="space-y-3">
					{[
						{ label: "Slow (120 ms/char)", speed: 120, delay: 0 },
						{ label: "Default (50 ms/char)", speed: 50, delay: 500 },
						{ label: "Fast (15 ms/char)", speed: 15, delay: 1200 },
					].map(({ label, speed, delay }) => (
						<div
							key={`${label}-${replayKey}`}
							className="flex items-baseline gap-3"
						>
							<span className="w-44 shrink-0 text-default-400 text-xs">
								{label}
							</span>
							<span className="font-mono text-default-900 text-sm">
								<Typewriter
									text="The quick brown fox."
									speed={speed}
									delay={delay}
								/>
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Replay */}
			<Button color="primary" variant="shadow" onPress={replay}>
				Replay Animation
			</Button>
		</div>
	);
}
