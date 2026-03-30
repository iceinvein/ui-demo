import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Member = {
	id: number;
	initials: string;
	name: string;
	gradient: string;
};

const BASE_MEMBERS: Member[] = [
	{
		id: 1,
		initials: "JD",
		name: "Jordan Davis",
		gradient: "from-violet-500 to-purple-600",
	},
	{
		id: 2,
		initials: "AK",
		name: "Aisha Khan",
		gradient: "from-pink-500 to-rose-600",
	},
	{
		id: 3,
		initials: "MR",
		name: "Mia Rodriguez",
		gradient: "from-cyan-500 to-blue-600",
	},
	{
		id: 4,
		initials: "SP",
		name: "Sam Patel",
		gradient: "from-amber-500 to-orange-600",
	},
	{
		id: 5,
		initials: "RL",
		name: "Riley Lee",
		gradient: "from-emerald-500 to-teal-600",
	},
];

const EXTRA_MEMBERS: Member[] = [
	{
		id: 6,
		initials: "OB",
		name: "Oliver Brooks",
		gradient: "from-fuchsia-500 to-pink-600",
	},
	{
		id: 7,
		initials: "ZW",
		name: "Zoe Wang",
		gradient: "from-lime-500 to-green-600",
	},
	{
		id: 8,
		initials: "NG",
		name: "Noah Green",
		gradient: "from-sky-500 to-indigo-600",
	},
];

// ─────────────────────────────────────────────
// Single Avatar
// ─────────────────────────────────────────────

type AvatarSize = "lg" | "md" | "sm";

const SIZE_MAP: Record<AvatarSize, { px: number; text: string; ring: string }> =
	{
		lg: { px: 48, text: "text-sm font-bold", ring: "ring-2" },
		md: { px: 36, text: "text-xs font-bold", ring: "ring-2" },
		sm: { px: 28, text: "text-[10px] font-bold", ring: "ring-[1.5px]" },
	};

function Avatar({
	member,
	size = "lg",
	expanded,
	index,
	total,
}: {
	member: Member;
	size?: AvatarSize;
	expanded: boolean;
	index: number;
	total: number;
}) {
	const [hovered, setHovered] = useState(false);
	const { px, text, ring } = SIZE_MAP[size];

	// Overlap amount relative to avatar size
	const overlapFraction = 0.3;
	const collapsedX = index * px * (1 - overlapFraction);
	const expandedX = index * (px + 8);

	return (
		<motion.div
			layout
			key={member.id}
			className="relative"
			style={{ zIndex: total - index }}
			animate={{ x: expanded ? expandedX : collapsedX }}
			transition={{ type: "spring", stiffness: 380, damping: 30 }}
			onHoverStart={() => setHovered(true)}
			onHoverEnd={() => setHovered(false)}
		>
			<motion.div
				className={`relative flex items-center justify-center rounded-full bg-gradient-to-br ${member.gradient}
					${ring} cursor-pointer select-none ring-zinc-900`}
				style={{ width: px, height: px }}
				whileHover={{ scale: 1.18, zIndex: 50 }}
				transition={{ type: "spring", stiffness: 400, damping: 20 }}
			>
				<span className={`${text} text-white/95 tracking-wide`}>
					{member.initials}
				</span>
			</motion.div>

			{/* Tooltip */}
			<AnimatePresence>
				{hovered && (
					<motion.div
						className="pointer-events-none absolute bottom-full left-1/2 z-[100] mb-2"
						style={{ translateX: "-50%" }}
						initial={{ opacity: 0, y: 6, scale: 0.88 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 4, scale: 0.92 }}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
					>
						<div className="whitespace-nowrap rounded-lg bg-zinc-800 px-2.5 py-1 text-white text-xs shadow-xl ring-1 ring-white/10">
							{member.name}
							{/* Arrow */}
							<span className="-translate-x-1/2 absolute top-full left-1/2 border-4 border-transparent border-t-zinc-800" />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

// ─────────────────────────────────────────────
// Overflow badge "+N more"
// ─────────────────────────────────────────────

function OverflowBadge({
	count,
	size,
	expanded,
	index,
	total,
}: {
	count: number;
	size: AvatarSize;
	expanded: boolean;
	index: number;
	total: number;
}) {
	const { px, text, ring } = SIZE_MAP[size];
	const overlapFraction = 0.3;
	const collapsedX = index * px * (1 - overlapFraction);
	const expandedX = index * (px + 8);

	return (
		<motion.div
			layout
			className="relative"
			style={{ zIndex: total - index }}
			animate={{ x: expanded ? expandedX : collapsedX }}
			transition={{ type: "spring", stiffness: 380, damping: 30 }}
		>
			<div
				className={`flex items-center justify-center rounded-full border bg-zinc-700 border-zinc-600${ring} select-none ring-zinc-900`}
				style={{ width: px, height: px }}
			>
				<span className={`${text} text-zinc-300`}>+{count}</span>
			</div>
		</motion.div>
	);
}

// ─────────────────────────────────────────────
// Avatar Stack (one size row)
// ─────────────────────────────────────────────

function AvatarStack({
	members,
	overflowCount,
	size,
	label,
}: {
	members: Member[];
	overflowCount: number;
	size: AvatarSize;
	label: string;
}) {
	const [expanded, setExpanded] = useState(false);
	const { px } = SIZE_MAP[size];
	const overlapFraction = 0.3;
	const badgeIndex = members.length;
	const total = members.length + 1;

	// Container width accounts for collapsed/expanded state
	const collapsedWidth = badgeIndex * px * (1 - overlapFraction) + px;
	const expandedWidth = total * (px + 8);

	return (
		<div className="flex flex-col gap-2">
			<span className="font-medium text-xs text-zinc-500 uppercase tracking-widest">
				{label}
			</span>
			<motion.div
				className="relative flex cursor-pointer items-center"
				style={{ height: px }}
				animate={{ width: expanded ? expandedWidth : collapsedWidth }}
				transition={{ type: "spring", stiffness: 320, damping: 30 }}
				onClick={() => setExpanded((v) => !v)}
				title={expanded ? "Click to collapse" : "Click to expand"}
			>
				{members.map((m, i) => (
					<Avatar
						key={m.id}
						member={m}
						size={size}
						expanded={expanded}
						index={i}
						total={total}
					/>
				))}
				<OverflowBadge
					count={overflowCount}
					size={size}
					expanded={expanded}
					index={badgeIndex}
					total={total}
				/>
			</motion.div>
			<span className="text-[11px] text-zinc-600">
				{expanded ? "Click to collapse" : "Click to expand"}
			</span>
		</div>
	);
}

// ─────────────────────────────────────────────
// Add / Remove interactive stack
// ─────────────────────────────────────────────

const nextExtraIdx = 0;

function InteractiveStack() {
	const [members, setMembers] = useState<Member[]>(BASE_MEMBERS.slice(0, 4));
	const [expanded, setExpanded] = useState(false);

	const canAdd =
		nextExtraIdx < EXTRA_MEMBERS.length ||
		members.length < BASE_MEMBERS.length + EXTRA_MEMBERS.length;
	const canRemove = members.length > 1;

	const handleAdd = () => {
		const allPool = [...BASE_MEMBERS, ...EXTRA_MEMBERS];
		const existing = new Set(members.map((m) => m.id));
		const next = allPool.find((m) => !existing.has(m.id));
		if (next) setMembers((prev) => [...prev, next]);
	};

	const handleRemove = () => {
		if (members.length <= 1) return;
		setMembers((prev) => prev.slice(0, -1));
	};

	const size: AvatarSize = "lg";
	const { px } = SIZE_MAP[size];
	const overlapFraction = 0.3;
	const total = members.length;

	const collapsedWidth = (total - 1) * px * (1 - overlapFraction) + px;
	const expandedWidth = total * (px + 8);

	return (
		<div className="flex flex-col gap-4">
			<span className="font-medium text-xs text-zinc-500 uppercase tracking-widest">
				Interactive — Add &amp; Remove Members
			</span>

			{/* Stack row */}
			<motion.div
				className="relative flex cursor-pointer items-center"
				style={{ height: px }}
				animate={{ width: expanded ? expandedWidth : collapsedWidth }}
				transition={{ type: "spring", stiffness: 320, damping: 30 }}
				onClick={() => setExpanded((v) => !v)}
			>
				<AnimatePresence initial={false}>
					{members.map((m, i) => (
						<motion.div
							key={m.id}
							className="absolute"
							style={{ zIndex: total - i }}
							initial={{
								scale: 0,
								opacity: 0,
								x: expanded ? i * (px + 8) : i * px * (1 - overlapFraction),
							}}
							animate={{
								scale: 1,
								opacity: 1,
								x: expanded ? i * (px + 8) : i * px * (1 - overlapFraction),
							}}
							exit={{ scale: 0, opacity: 0 }}
							transition={{ type: "spring", stiffness: 380, damping: 28 }}
						>
							<AvatarChip member={m} size={size} />
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>

			{/* Buttons */}
			<div className="flex items-center gap-3 pt-1">
				<motion.button
					type="button"
					onClick={handleAdd}
					disabled={!canAdd}
					className="rounded-xl bg-violet-600 px-4 py-2 font-semibold text-sm text-white shadow-lg shadow-violet-900/40 transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
					whileHover={{ scale: 1.04 }}
					whileTap={{ scale: 0.96 }}
				>
					+ Add Member
				</motion.button>
				<motion.button
					type="button"
					onClick={handleRemove}
					disabled={!canRemove}
					className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 font-semibold text-sm text-zinc-300 shadow transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
					whileHover={{ scale: 1.04 }}
					whileTap={{ scale: 0.96 }}
				>
					− Remove Last
				</motion.button>
				<span className="text-xs text-zinc-600 tabular-nums">
					{members.length} member{members.length !== 1 ? "s" : ""}
				</span>
			</div>
		</div>
	);
}

// A lightweight chip used inside AnimatePresence (no internal hover tooltip to avoid z-index fights during exit)
function AvatarChip({ member, size }: { member: Member; size: AvatarSize }) {
	const [hovered, setHovered] = useState(false);
	const { px, text, ring } = SIZE_MAP[size];
	return (
		<div className="relative" style={{ width: px, height: px }}>
			<motion.div
				className={`flex items-center justify-center rounded-full bg-gradient-to-br ${member.gradient}
					${ring} h-full w-full cursor-pointer select-none ring-zinc-900`}
				whileHover={{ scale: 1.18 }}
				transition={{ type: "spring", stiffness: 400, damping: 20 }}
				onHoverStart={() => setHovered(true)}
				onHoverEnd={() => setHovered(false)}
			>
				<span className={`${text} text-white/95 tracking-wide`}>
					{member.initials}
				</span>
			</motion.div>
			<AnimatePresence>
				{hovered && (
					<motion.div
						className="pointer-events-none absolute bottom-full left-1/2 z-[100] mb-2"
						style={{ translateX: "-50%" }}
						initial={{ opacity: 0, y: 6, scale: 0.88 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 4, scale: 0.92 }}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
					>
						<div className="whitespace-nowrap rounded-lg bg-zinc-800 px-2.5 py-1 text-white text-xs shadow-xl ring-1 ring-white/10">
							{member.name}
							<span className="-translate-x-1/2 absolute top-full left-1/2 border-4 border-transparent border-t-zinc-800" />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// ─────────────────────────────────────────────
// Main demo export
// ─────────────────────────────────────────────

export function AvatarStackDemo() {
	return (
		<div className="flex min-h-[400px] items-center justify-center p-8">
			<div className="flex w-full max-w-2xl flex-col gap-12">
				{/* Title */}
				<div className="flex flex-col gap-1">
					<h2 className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text font-bold text-2xl text-transparent">
						Avatar Stack
					</h2>
					<p className="text-default-500 text-sm">
						Hover avatars for names · Click stack to expand · Spring animations
					</p>
				</div>

				{/* Three size variants */}
				<div className="flex flex-col gap-10">
					<AvatarStack
						members={BASE_MEMBERS}
						overflowCount={3}
						size="lg"
						label="Large — 48px"
					/>
					<AvatarStack
						members={BASE_MEMBERS.slice(0, 4)}
						overflowCount={7}
						size="md"
						label="Medium — 36px"
					/>
					<AvatarStack
						members={BASE_MEMBERS.slice(0, 4)}
						overflowCount={12}
						size="sm"
						label="Small — 28px"
					/>
				</div>

				{/* Divider */}
				<div className="h-px bg-zinc-800" />

				{/* Interactive add/remove */}
				<InteractiveStack />
			</div>
		</div>
	);
}
