import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Bell, Mail, MessageCircle, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Rolling digit – animates each character up or down on change
// ---------------------------------------------------------------------------

type RollingDirection = "up" | "down";

const rollingVariants = {
	enterUp: { y: "100%", opacity: 0 },
	enterDown: { y: "-100%", opacity: 0 },
	center: { y: "0%", opacity: 1 },
	exitUp: { y: "-100%", opacity: 0 },
	exitDown: { y: "100%", opacity: 0 },
};

type RollingDigitProps = {
	value: string;
	direction: RollingDirection;
};

function RollingDigit({ value, direction }: RollingDigitProps) {
	const enterVariant = direction === "up" ? "enterUp" : "enterDown";
	const exitVariant = direction === "up" ? "exitUp" : "exitDown";

	return (
		<span
			className="relative inline-block overflow-hidden leading-none"
			style={{ width: "0.6em", height: "1em" }}
		>
			<AnimatePresence mode="popLayout" initial={false}>
				<motion.span
					key={value}
					variants={rollingVariants}
					initial={enterVariant}
					animate="center"
					exit={exitVariant}
					transition={{ type: "spring", stiffness: 400, damping: 30 }}
					className="absolute inset-0 flex items-center justify-center"
				>
					{value}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}

// ---------------------------------------------------------------------------
// Rolling number – splits a label into RollingDigit characters
// ---------------------------------------------------------------------------

type RollingNumberProps = {
	label: string;
	direction: RollingDirection;
};

function RollingNumber({ label, direction }: RollingNumberProps) {
	return (
		<span className="flex items-center justify-center">
			{label.split("").map((ch, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: positional chars in a fixed-length label
				<RollingDigit key={`${ch}-${i}`} value={ch} direction={direction} />
			))}
		</span>
	);
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function formatCount(n: number, max = 99): string {
	return n > max ? `${max}+` : String(n);
}

// ---------------------------------------------------------------------------
// Icon wrapper – relative positioning context for a badge overlay
// ---------------------------------------------------------------------------

type IconBadgeWrapperProps = {
	children: React.ReactNode;
	badge: React.ReactNode;
	label: string;
};

function IconBadgeWrapper({ children, badge, label }: IconBadgeWrapperProps) {
	return (
		<div className="flex flex-col items-center gap-3">
			<div className="relative inline-flex">
				<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 shadow-lg backdrop-blur-sm">
					{children}
				</div>
				{badge}
			</div>
			<span className="text-default-400 text-xs">{label}</span>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Section card wrapper
// ---------------------------------------------------------------------------

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
			<h3 className="font-semibold text-default-500 text-xs uppercase tracking-widest">
				{title}
			</h3>
			{children}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Action button
// ---------------------------------------------------------------------------

type ActionButtonProps = {
	onClick: () => void;
	children: React.ReactNode;
	colorClass?: string;
	disabled?: boolean;
};

function ActionButton({
	onClick,
	children,
	colorClass = "border-primary/20 bg-primary/10 text-primary hover:border-primary/30 hover:bg-primary/20",
	disabled = false,
}: ActionButtonProps) {
	return (
		<motion.button
			type="button"
			onClick={onClick}
			disabled={disabled}
			whileHover={{ scale: disabled ? 1 : 1.03 }}
			whileTap={{ scale: disabled ? 1 : 0.97 }}
			className={[
				"rounded-xl border px-4 py-2 font-medium text-sm transition-colors",
				colorClass,
				disabled ? "cursor-not-allowed opacity-40" : "",
			]
				.filter(Boolean)
				.join(" ")}
		>
			{children}
		</motion.button>
	);
}

// ---------------------------------------------------------------------------
// Bell section – count badge, pulses briefly on each new notification,
//               rolling number animates up/down, springs in/out
// ---------------------------------------------------------------------------

function BellSection() {
	const [count, setCount] = useState(3);
	const [pulse, setPulse] = useState(false);
	const [direction, setDirection] = useState<RollingDirection>("up");
	const prevCountRef = useRef(count);
	const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	function addNotification() {
		setDirection("up");
		prevCountRef.current = count;
		setCount((c) => c + 1);
		setPulse(true);
		if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current);
		pulseTimerRef.current = setTimeout(() => setPulse(false), 1500);
	}

	function clearAll() {
		setDirection("down");
		prevCountRef.current = count;
		setCount(0);
		setPulse(false);
	}

	const label = formatCount(count);

	return (
		<Section title="Bell — count + pulse">
			<IconBadgeWrapper
				label="Notifications"
				badge={
					<AnimatePresence mode="popLayout">
						{count > 0 && (
							<motion.span
								key="bell-badge"
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								transition={{ type: "spring", stiffness: 500, damping: 22 }}
								className={[
									"-right-1.5 -top-1.5 absolute z-10 flex min-w-[1.25rem] select-none items-center justify-center rounded-full bg-red-500 px-1 font-bold text-[0.65rem] text-white leading-none",
									pulse ? "animate-pulse" : "",
								]
									.filter(Boolean)
									.join(" ")}
								style={{ height: "1.25rem", originX: 0.5, originY: 0.5 }}
							>
								<RollingNumber label={label} direction={direction} />
							</motion.span>
						)}
					</AnimatePresence>
				}
			>
				<Bell className="h-6 w-6" />
			</IconBadgeWrapper>

			<div className="flex gap-2">
				<ActionButton onClick={addNotification}>Add notification</ActionButton>
				<ActionButton
					onClick={clearAll}
					disabled={count === 0}
					colorClass="border-danger/20 bg-danger/10 text-danger hover:border-danger/30 hover:bg-danger/20"
				>
					Clear all
				</ActionButton>
			</div>
		</Section>
	);
}

// ---------------------------------------------------------------------------
// Mail section – dot badge, continuous pulse, springs in/out
// ---------------------------------------------------------------------------

function MailSection() {
	const [hasUnread, setHasUnread] = useState(true);

	return (
		<Section title="Mail — dot badge">
			<IconBadgeWrapper
				label="Unread mail"
				badge={
					<AnimatePresence mode="popLayout">
						{hasUnread && (
							<motion.span
								key="mail-dot"
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								transition={{ type: "spring", stiffness: 500, damping: 22 }}
								className="-right-1 -top-1 absolute z-10 h-3 w-3 animate-pulse rounded-full bg-blue-500 ring-2 ring-white/10"
								style={{ originX: 0.5, originY: 0.5 }}
							/>
						)}
					</AnimatePresence>
				}
			>
				<Mail className="h-6 w-6" />
			</IconBadgeWrapper>

			<div className="flex gap-2">
				<ActionButton onClick={() => setHasUnread(true)} disabled={hasUnread}>
					Mark unread
				</ActionButton>
				<ActionButton
					onClick={() => setHasUnread(false)}
					disabled={!hasUnread}
					colorClass="border-danger/20 bg-danger/10 text-danger hover:border-danger/30 hover:bg-danger/20"
				>
					Mark read
				</ActionButton>
			</div>
		</Section>
	);
}

// ---------------------------------------------------------------------------
// Chat section – 99+ overflow badge, rolling number, springs in/out
// ---------------------------------------------------------------------------

function ChatSection() {
	const [count, setCount] = useState(99);
	const [direction, setDirection] = useState<RollingDirection>("up");

	function addMessage() {
		setDirection("up");
		setCount((c) => c + 1);
	}

	function clearMessages() {
		setDirection("down");
		setCount(0);
	}

	const label = formatCount(count);

	return (
		<Section title="Chat — overflow 99+">
			<IconBadgeWrapper
				label="Messages"
				badge={
					<AnimatePresence mode="popLayout">
						{count > 0 && (
							<motion.span
								key="chat-badge"
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								transition={{ type: "spring", stiffness: 500, damping: 22 }}
								className="-right-1.5 -top-1.5 absolute z-10 flex select-none items-center justify-center rounded-full bg-violet-500 px-1 font-bold text-[0.6rem] text-white leading-none"
								style={{
									minWidth: "1.6rem",
									height: "1.25rem",
									originX: 0.5,
									originY: 0.5,
								}}
							>
								<RollingNumber label={label} direction={direction} />
							</motion.span>
						)}
					</AnimatePresence>
				}
			>
				<MessageCircle className="h-6 w-6" />
			</IconBadgeWrapper>

			<div className="flex gap-2">
				<ActionButton onClick={addMessage}>Add message</ActionButton>
				<ActionButton
					onClick={clearMessages}
					disabled={count === 0}
					colorClass="border-danger/20 bg-danger/10 text-danger hover:border-danger/30 hover:bg-danger/20"
				>
					Clear all
				</ActionButton>
			</div>
		</Section>
	);
}

// ---------------------------------------------------------------------------
// Cart section – badge bounces on each increment, springs in on first add,
//               springs out when cart is cleared
// ---------------------------------------------------------------------------

function CartSection() {
	const [count, setCount] = useState(0);
	// addCount tracks how many times "Add to cart" was pressed.
	// The effect fires on each increment and reads addCount to distinguish
	// first-appearance (addCount === 1) from subsequent bounce (addCount > 1).
	const [addCount, setAddCount] = useState(0);
	const badgeControls = useAnimation();

	useEffect(() => {
		if (addCount === 0) return;
		if (addCount === 1) {
			// Badge just mounted – spring it in from scale 0
			badgeControls.set({ scale: 0, opacity: 0 });
			badgeControls.start({
				scale: 1,
				opacity: 1,
				transition: { type: "spring", stiffness: 500, damping: 22 },
			});
		} else {
			// Subsequent additions – bounce the existing badge
			badgeControls.start({
				y: [0, -10, 3, -5, 0],
				scale: [1, 1.25, 0.92, 1.1, 1],
				transition: { duration: 0.45, ease: "easeOut" },
			});
		}
	}, [addCount, badgeControls]);

	function addToCart() {
		setCount((c) => c + 1);
		setAddCount((n) => n + 1);
	}

	function clearCart() {
		setCount(0);
	}

	const label = formatCount(count);

	return (
		<Section title="Cart — bounce on add">
			<IconBadgeWrapper
				label="Cart items"
				badge={
					<AnimatePresence mode="popLayout">
						{count > 0 && (
							<motion.span
								key="cart-badge"
								// animate is controlled imperatively via badgeControls
								animate={badgeControls}
								exit={{ scale: 0, opacity: 0 }}
								className="-right-1.5 -top-1.5 absolute z-10 flex h-5 min-w-[1.25rem] select-none items-center justify-center rounded-full bg-amber-500 px-1 font-bold text-[0.65rem] text-white leading-none"
								style={{ originX: 0.5, originY: 0.5 }}
							>
								<RollingNumber label={label} direction="up" />
							</motion.span>
						)}
					</AnimatePresence>
				}
			>
				<ShoppingCart className="h-6 w-6" />
			</IconBadgeWrapper>

			<div className="flex gap-2">
				<ActionButton onClick={addToCart}>Add to cart</ActionButton>
				<ActionButton
					onClick={clearCart}
					disabled={count === 0}
					colorClass="border-danger/20 bg-danger/10 text-danger hover:border-danger/30 hover:bg-danger/20"
				>
					Clear cart
				</ActionButton>
			</div>
		</Section>
	);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function NotificationBadgeDemo() {
	return (
		<div className="flex min-h-[400px] items-center justify-center p-8">
			<div className="w-full max-w-4xl space-y-6">
				<div className="mb-2 text-center">
					<h2 className="mb-1 font-bold text-2xl text-default-900 tracking-tight">
						Notification Badges
					</h2>
					<p className="text-default-500 text-sm">
						Spring entry/exit, rolling number counts, pulse, and bounce
						animations
					</p>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<BellSection />
					<MailSection />
					<ChatSection />
					<CartSection />
				</div>
			</div>
		</div>
	);
}
