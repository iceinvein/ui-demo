import {
	AnimatePresence,
	motion,
	type PanInfo,
	useMotionValue,
	useTransform,
	type Variants,
} from "framer-motion";
import { Heart, RotateCcw, X } from "lucide-react";
import { useRef, useState } from "react";

type Card = {
	id: number;
	name: string;
	role: string;
	bio: string;
	gradient: string;
	initials: string;
};

const cardData: Card[] = [
	{
		id: 1,
		name: "Alex Chen",
		role: "Design Engineer",
		bio: "Crafting interfaces that feel like magic. Obsessed with micro-interactions.",
		gradient: "from-violet-500 to-purple-600",
		initials: "AC",
	},
	{
		id: 2,
		name: "Mia Rodriguez",
		role: "Creative Director",
		bio: "Turning wild ideas into polished products. Brand storytelling enthusiast.",
		gradient: "from-pink-500 to-rose-600",
		initials: "MR",
	},
	{
		id: 3,
		name: "Jordan Lee",
		role: "Motion Designer",
		bio: "If it doesn't move, it's not done yet. Spring physics advocate.",
		gradient: "from-cyan-500 to-blue-600",
		initials: "JL",
	},
	{
		id: 4,
		name: "Sam Patel",
		role: "Frontend Architect",
		bio: "Making the web faster, one component at a time. Performance nerd.",
		gradient: "from-amber-500 to-orange-600",
		initials: "SP",
	},
	{
		id: 5,
		name: "Riley Kim",
		role: "UX Researcher",
		bio: "Understanding people to build better products. Data-driven empathy.",
		gradient: "from-emerald-500 to-green-600",
		initials: "RK",
	},
];

const SWIPE_THRESHOLD = 120;

const cardVariants: Variants = {
	initial: { scale: 0.9, y: 30, opacity: 0 },
	exit: (direction: "left" | "right") => ({
		x: direction === "right" ? 400 : -400,
		rotate: direction === "right" ? 20 : -20,
		opacity: 0,
		transition: { duration: 0.3 },
	}),
};

function SwipeCard({
	card,
	isTop,
	stackIndex,
	onSwipe,
}: {
	card: Card;
	isTop: boolean;
	stackIndex: number;
	onSwipe: (direction: "left" | "right") => void;
}) {
	const x = useMotionValue(0);
	const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
	const likeOpacity = useTransform(x, [0, 80], [0, 1]);
	const nopeOpacity = useTransform(x, [-80, 0], [1, 0]);

	const handleDragEnd = (_: unknown, info: PanInfo) => {
		if (info.offset.x > SWIPE_THRESHOLD) onSwipe("right");
		else if (info.offset.x < -SWIPE_THRESHOLD) onSwipe("left");
	};

	return (
		<motion.div
			className="absolute h-[380px] w-[300px] cursor-grab active:cursor-grabbing"
			style={{
				x: isTop ? x : 0,
				rotate: isTop ? rotate : 0,
				zIndex: 10 - stackIndex,
			}}
			variants={cardVariants}
			initial="initial"
			animate={{
				scale: 1 - stackIndex * 0.05,
				y: stackIndex * 12,
				opacity: stackIndex > 2 ? 0 : 1,
			}}
			exit="exit"
			transition={{ type: "spring", stiffness: 300, damping: 25 }}
			drag={isTop ? "x" : false}
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.9}
			onDragEnd={isTop ? handleDragEnd : undefined}
		>
			<div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-default-200/60 bg-background shadow-xl">
				{isTop && (
					<>
						<motion.div
							className="absolute top-6 left-6 z-20 rounded-lg border-2 border-emerald-500 px-3 py-1 font-bold text-emerald-500 text-lg"
							style={{ opacity: likeOpacity, rotate: -12 }}
						>
							LIKE
						</motion.div>
						<motion.div
							className="absolute top-6 right-6 z-20 rounded-lg border-2 border-red-500 px-3 py-1 font-bold text-lg text-red-500"
							style={{ opacity: nopeOpacity, rotate: 12 }}
						>
							NOPE
						</motion.div>
					</>
				)}
				<div
					className={`flex h-40 items-center justify-center bg-gradient-to-br ${card.gradient}`}
				>
					<span className="font-bold text-5xl text-white/90">
						{card.initials}
					</span>
				</div>
				<div className="flex flex-1 flex-col p-5">
					<h3 className="font-bold text-default-900 text-xl">{card.name}</h3>
					<p className="mb-3 text-default-500 text-sm">{card.role}</p>
					<p className="flex-1 text-default-600 text-sm leading-relaxed">
						{card.bio}
					</p>
					<div className="mt-3 flex gap-2">
						{["Creative", "Driven"].map((tag) => (
							<span
								key={tag}
								className="rounded-full bg-default-100 px-3 py-1 text-default-600 text-xs"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export function SwipeCardsDemo() {
	const [cards, setCards] = useState(cardData);
	const directionRef = useRef<"left" | "right">("left");

	const handleSwipe = (direction: "left" | "right") => {
		directionRef.current = direction;
		setCards((prev) => prev.slice(1));
	};
	const resetCards = () => {
		setCards(cardData);
	};

	return (
		<div className="flex min-h-[600px] flex-col items-center justify-center gap-8 p-8">
			<motion.div
				className="flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<h2 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-bold text-2xl text-transparent">
					Swipe Cards
				</h2>
				<p className="text-default-500 text-sm">Drag to swipe left or right</p>
			</motion.div>

			<div className="relative h-[380px] w-[300px]">
				<AnimatePresence custom={directionRef.current}>
					{cards.map((card, i) => (
						<SwipeCard
							key={card.id}
							card={card}
							isTop={i === 0}
							stackIndex={i}
							onSwipe={handleSwipe}
						/>
					))}
				</AnimatePresence>
				{cards.length === 0 && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						className="flex h-full flex-col items-center justify-center text-center"
					>
						<p className="mb-4 text-default-400 text-lg">No more cards!</p>
					</motion.div>
				)}
			</div>

			<motion.div
				className="flex items-center gap-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				<motion.button
					type="button"
					onClick={() => handleSwipe("left")}
					className="flex h-14 w-14 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500 shadow-sm"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					disabled={cards.length === 0}
				>
					<X className="h-6 w-6" />
				</motion.button>
				<motion.button
					type="button"
					onClick={resetCards}
					className="flex h-10 w-10 items-center justify-center rounded-full border border-default-200 bg-default-50 text-default-500 shadow-sm"
					whileHover={{ scale: 1.1, rotate: -180 }}
					whileTap={{ scale: 0.9 }}
				>
					<RotateCcw className="h-4 w-4" />
				</motion.button>
				<motion.button
					type="button"
					onClick={() => handleSwipe("right")}
					className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-500 shadow-sm"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					disabled={cards.length === 0}
				>
					<Heart className="h-6 w-6" />
				</motion.button>
			</motion.div>
		</div>
	);
}
