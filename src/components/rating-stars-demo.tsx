import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// SVG star path — a crisp 5-pointed star centred at (12, 12) in a 24×24 box
// ---------------------------------------------------------------------------

const STAR_PATH =
	"M12 2.25l2.635 5.338 5.889.857-4.262 4.153 1.006 5.865L12 15.638l-5.268 2.825 1.006-5.865L3.476 8.445l5.889-.857L12 2.25z";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type HalfOrFull = "half" | "full";

// value is 0–5 in 0.5 increments
type RatingValue = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Given a mouse event over a star element, returns "half" if the cursor is
 * in the left half of the star, otherwise "full".
 */
function getHalfOrFull(e: React.MouseEvent<SVGSVGElement>): HalfOrFull {
	const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
	const relativeX = e.clientX - rect.left;
	return relativeX < rect.width / 2 ? "half" : "full";
}

/**
 * Calculates the rating value (0.5 increments) from a star index + position.
 */
function calcRating(index: number, position: HalfOrFull): RatingValue {
	return (position === "half" ? index + 0.5 : index + 1) as RatingValue;
}

// ---------------------------------------------------------------------------
// Interactive star button
// ---------------------------------------------------------------------------

type FillState = "empty" | "half" | "full";

function InteractiveStar({
	index,
	hoverValue,
	selectedValue,
	onHover,
	onLeave,
	onSelect,
}: {
	index: number; // 0-based
	hoverValue: RatingValue | null;
	selectedValue: RatingValue;
	onHover: (val: RatingValue) => void;
	onLeave: () => void;
	onSelect: (val: RatingValue) => void;
}) {
	const activeValue = hoverValue ?? selectedValue;

	// Determine fill for this star position
	let fill: FillState = "empty";
	const starNumber = index + 1; // 1-based
	if (activeValue >= starNumber) {
		fill = "full";
	} else if (activeValue >= starNumber - 0.5) {
		fill = "half";
	}

	const isActive = activeValue >= starNumber - 0.5;

	return (
		<motion.svg
			width={40}
			height={40}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="cursor-pointer"
			role="radio"
			aria-label={`${starNumber} star${starNumber !== 1 ? "s" : ""}`}
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
			onMouseMove={(e) => {
				const position = getHalfOrFull(
					e as unknown as React.MouseEvent<SVGSVGElement>,
				);
				onHover(calcRating(index, position));
			}}
			onMouseLeave={onLeave}
			onClick={(e) => {
				const position = getHalfOrFull(
					e as unknown as React.MouseEvent<SVGSVGElement>,
				);
				onSelect(calcRating(index, position));
			}}
		>
			{fill === "half" && (
				<defs>
					<linearGradient id={`half-lg-${index}`} x1="0" y1="0" x2="1" y2="0">
						<stop offset="50%" stopColor="#f59e0b" />
						<stop offset="50%" stopColor="transparent" />
					</linearGradient>
				</defs>
			)}
			<motion.path
				d={STAR_PATH}
				fill={
					fill === "full"
						? "#f59e0b"
						: fill === "half"
							? `url(#half-lg-${index})`
							: "none"
				}
				stroke={fill === "empty" ? "#d1d5db" : "#f59e0b"}
				strokeWidth={fill === "empty" ? 1.5 : 0}
				strokeLinejoin="round"
				animate={{
					fill:
						fill === "full"
							? "#f59e0b"
							: fill === "half"
								? `url(#half-lg-${index})`
								: "rgba(0,0,0,0)",
					stroke: fill === "empty" ? "#d1d5db" : "#f59e0b",
					filter: isActive
						? "drop-shadow(0 0 6px rgba(245,158,11,0.6))"
						: "drop-shadow(0 0 0px rgba(245,158,11,0))",
				}}
				transition={{ duration: 0.15 }}
			/>
		</motion.svg>
	);
}

// ---------------------------------------------------------------------------
// BounceOnSet — spring ring that fires when the rating is committed
// ---------------------------------------------------------------------------

function RatingCommitRing({ trigger }: { trigger: number }) {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={trigger}
				className="pointer-events-none absolute inset-0 rounded-full"
				initial={{ scale: 0.6, opacity: 0.8 }}
				animate={{ scale: 1.6, opacity: 0 }}
				exit={{}}
				transition={{ duration: 0.45, ease: "easeOut" }}
				style={{
					background:
						"radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)",
				}}
			/>
		</AnimatePresence>
	);
}

// ---------------------------------------------------------------------------
// RatingLabel — animated "X.X / 5" display
// ---------------------------------------------------------------------------

function RatingLabel({ value }: { value: RatingValue }) {
	const labels: Record<number, string> = {
		0: "Not rated",
		0.5: "Terrible",
		1: "Poor",
		1.5: "Not great",
		2: "Below average",
		2.5: "Average",
		3: "Good",
		3.5: "Pretty good",
		4: "Great",
		4.5: "Excellent",
		5: "Outstanding",
	};

	return (
		<motion.div
			className="mt-4 flex flex-col items-center gap-1"
			initial={false}
		>
			<AnimatePresence mode="wait">
				<motion.span
					key={value}
					className="font-bold text-3xl text-amber-500 tabular-nums"
					initial={{ y: -12, opacity: 0, scale: 0.85 }}
					animate={{ y: 0, opacity: 1, scale: 1 }}
					exit={{ y: 12, opacity: 0, scale: 0.85 }}
					transition={{ type: "spring", stiffness: 500, damping: 22 }}
				>
					{value.toFixed(1)}
					<span className="ml-1 font-normal text-base text-default-400">
						/ 5
					</span>
				</motion.span>
			</AnimatePresence>
			<AnimatePresence mode="wait">
				<motion.span
					key={labels[value]}
					className="text-default-500 text-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					{labels[value]}
				</motion.span>
			</AnimatePresence>
		</motion.div>
	);
}

// ---------------------------------------------------------------------------
// Main interactive 5-star widget
// ---------------------------------------------------------------------------

function InteractiveRating() {
	const [selected, setSelected] = useState<RatingValue>(0);
	const [hovered, setHovered] = useState<RatingValue | null>(null);
	const [commitTick, setCommitTick] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleSelect = useCallback((val: RatingValue) => {
		setSelected(val);
		setCommitTick((t) => t + 1);
	}, []);

	return (
		<div className="flex flex-col items-center">
			<p className="mb-4 font-semibold text-default-600 text-sm uppercase tracking-widest">
				Rate your experience
			</p>

			{/* Stars row */}
			<div
				ref={containerRef}
				className="relative flex items-center gap-1"
				role="radiogroup"
				aria-label="Star rating"
				onMouseLeave={() => setHovered(null)}
			>
				<RatingCommitRing trigger={commitTick} />
				{[0, 1, 2, 3, 4].map((i) => (
					<InteractiveStar
						key={i}
						index={i}
						hoverValue={hovered}
						selectedValue={selected}
						onHover={setHovered}
						onLeave={() => setHovered(null)}
						onSelect={handleSelect}
					/>
				))}
			</div>

			<RatingLabel value={hovered ?? selected} />

			{/* Reset hint */}
			<AnimatePresence>
				{selected > 0 && (
					<motion.button
						type="button"
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 6 }}
						transition={{ duration: 0.2 }}
						className="mt-3 text-default-400 text-xs underline underline-offset-2 hover:text-default-600"
						onClick={() => {
							setSelected(0);
							setCommitTick((t) => t + 1);
						}}
					>
						Clear rating
					</motion.button>
				)}
			</AnimatePresence>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Read-only fractional star row (used for the summary rows below)
// ---------------------------------------------------------------------------

function ReadOnlyStars({
	value,
	size = 18,
}: {
	value: number; // 0-5, any decimal
	size?: number;
}) {
	return (
		<span className="inline-flex items-center gap-0.5">
			{[1, 2, 3, 4, 5].map((starNum) => {
				let fill: FillState = "empty";
				if (value >= starNum) {
					fill = "full";
				} else if (value >= starNum - 0.5) {
					fill = "half";
				}

				// For fractional fills that don't land on .5 or whole, use a
				// precise clip-path approach via an inline gradient defs.
				const fillPct = Math.max(0, Math.min(1, value - (starNum - 1)));
				const useGradient = fillPct > 0 && fillPct < 1;
				const gradId = `ro-${starNum}-${String(value).replace(".", "_")}`;

				return (
					<svg
						key={starNum}
						width={size}
						height={size}
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						{useGradient && (
							<defs>
								<linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
									<stop offset={`${fillPct * 100}%`} stopColor="#f59e0b" />
									<stop offset={`${fillPct * 100}%`} stopColor="transparent" />
								</linearGradient>
							</defs>
						)}
						<path
							d={STAR_PATH}
							fill={
								fill === "full"
									? "#f59e0b"
									: useGradient
										? `url(#${gradId})`
										: "none"
							}
							stroke={fill === "empty" && !useGradient ? "#d1d5db" : "#f59e0b"}
							strokeWidth={fill === "empty" && !useGradient ? 1.5 : 0}
							strokeLinejoin="round"
						/>
					</svg>
				);
			})}
		</span>
	);
}

// ---------------------------------------------------------------------------
// ReadOnlyRow — one labelled rating row
// ---------------------------------------------------------------------------

function ReadOnlyRow({
	label,
	value,
	delay,
}: {
	label: string;
	value: number;
	delay: number;
}) {
	return (
		<motion.div
			className="flex items-center justify-between gap-4 rounded-xl border border-default-100 bg-default-50 px-4 py-3"
			initial={{ opacity: 0, x: -16 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay, type: "spring", stiffness: 300, damping: 26 }}
		>
			<span className="min-w-[140px] font-medium text-default-700 text-sm">
				{label}
			</span>
			<ReadOnlyStars value={value} size={18} />
			<motion.span
				className="min-w-[36px] text-right font-semibold text-amber-500 text-sm tabular-nums"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: delay + 0.15 }}
			>
				{value.toFixed(1)}
			</motion.span>
		</motion.div>
	);
}

// ---------------------------------------------------------------------------
// Divider
// ---------------------------------------------------------------------------

function SectionDivider({ label }: { label: string }) {
	return (
		<div className="flex w-full items-center gap-3">
			<div className="h-px flex-1 bg-default-200" />
			<span className="text-default-400 text-xs uppercase tracking-widest">
				{label}
			</span>
			<div className="h-px flex-1 bg-default-200" />
		</div>
	);
}

// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------

export function RatingStarsDemo() {
	const readOnlyRatings = [
		{ label: "Product Quality", value: 4.2 },
		{ label: "Customer Service", value: 4.8 },
		{ label: "Value for Money", value: 3.5 },
	];

	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center gap-8 p-8">
			{/* Title */}
			<motion.div
				className="flex flex-col items-center gap-1"
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 24 }}
			>
				<h2 className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text font-bold text-2xl text-transparent">
					Star Rating
				</h2>
				<p className="text-center text-default-500 text-sm">
					Hover over stars for preview — click to set, drag within a star for
					half-stars
				</p>
			</motion.div>

			{/* Interactive widget */}
			<motion.div
				className="w-full max-w-sm rounded-2xl border border-default-200 bg-default-50 p-6 shadow-md"
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.1, type: "spring", stiffness: 280, damping: 22 }}
			>
				<InteractiveRating />
			</motion.div>

			{/* Read-only summary section */}
			<motion.div
				className="w-full max-w-sm"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.25 }}
			>
				<div className="flex flex-col gap-4">
					<SectionDivider label="Category breakdown" />

					<div className="flex flex-col gap-2">
						{readOnlyRatings.map(({ label, value }, i) => (
							<ReadOnlyRow
								key={label}
								label={label}
								value={value}
								delay={0.3 + i * 0.1}
							/>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	);
}
