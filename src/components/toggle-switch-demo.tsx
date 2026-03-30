import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useCallback, useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ToggleProps = {
	checked: boolean;
	onChange: (next: boolean) => void;
	disabled?: boolean;
};

// ---------------------------------------------------------------------------
// Spring preset shared across all variants
// ---------------------------------------------------------------------------

const KNOB_SPRING = { type: "spring" as const, stiffness: 500, damping: 30 };

// ---------------------------------------------------------------------------
// Variant 1 — Basic toggle
// ---------------------------------------------------------------------------

function BasicToggle({ checked, onChange, disabled }: ToggleProps) {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				if (!disabled) onChange(!checked);
			}
		},
		[checked, onChange, disabled],
	);

	return (
		<motion.button
			type="button"
			role="switch"
			aria-checked={checked}
			disabled={disabled}
			onClick={() => !disabled && onChange(!checked)}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			className="relative flex h-7 w-12 cursor-pointer items-center rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40"
			animate={{ backgroundColor: checked ? "#10b981" : "#71717a" }}
			transition={{ duration: 0.2 }}
			whileTap={disabled ? {} : { scale: 0.96 }}
		>
			<motion.span
				layout
				transition={KNOB_SPRING}
				className="h-6 w-6 rounded-full bg-white shadow-md"
				style={{ marginLeft: checked ? "auto" : 0 }}
			/>
		</motion.button>
	);
}

// ---------------------------------------------------------------------------
// Variant 2 — Toggle with labels (Off / On cross-fade)
// ---------------------------------------------------------------------------

function LabelToggle({ checked, onChange }: ToggleProps) {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				onChange(!checked);
			}
		},
		[checked, onChange],
	);

	return (
		<div className="flex items-center gap-3">
			{/* Label left */}
			<span className="w-8 text-right font-medium text-default-500 text-sm">
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={checked ? "on-left" : "off-left"}
						className="inline-block"
						initial={{ opacity: 0, y: -6 }}
						animate={{ opacity: checked ? 0.35 : 1, y: 0 }}
						exit={{ opacity: 0, y: 6 }}
						transition={{ duration: 0.18 }}
					>
						Off
					</motion.span>
				</AnimatePresence>
			</span>

			<motion.button
				type="button"
				role="switch"
				aria-checked={checked}
				onClick={() => onChange(!checked)}
				onKeyDown={handleKeyDown}
				tabIndex={0}
				className="relative flex h-7 w-12 cursor-pointer items-center rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
				animate={{ backgroundColor: checked ? "#3b82f6" : "#71717a" }}
				transition={{ duration: 0.2 }}
				whileTap={{ scale: 0.96 }}
			>
				<motion.span
					layout
					transition={KNOB_SPRING}
					className="h-6 w-6 rounded-full bg-white shadow-md"
					style={{ marginLeft: checked ? "auto" : 0 }}
				/>
			</motion.button>

			{/* Label right */}
			<span className="w-8 font-medium text-default-500 text-sm">
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={checked ? "on-right" : "off-right"}
						className="inline-block"
						initial={{ opacity: 0, y: -6 }}
						animate={{ opacity: checked ? 1 : 0.35, y: 0 }}
						exit={{ opacity: 0, y: 6 }}
						transition={{ duration: 0.18 }}
					>
						On
					</motion.span>
				</AnimatePresence>
			</span>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Variant 3 — Icon toggle (Sun / Moon with rotation)
// ---------------------------------------------------------------------------

function IconToggle({ checked, onChange }: ToggleProps) {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				onChange(!checked);
			}
		},
		[checked, onChange],
	);

	return (
		<motion.button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={checked ? "Switch to light mode" : "Switch to dark mode"}
			onClick={() => onChange(!checked)}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			className="relative flex h-8 w-[3.5rem] cursor-pointer items-center rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
			animate={{
				backgroundColor: checked ? "#18181b" : "#fbbf24",
			}}
			transition={{ duration: 0.25 }}
			whileTap={{ scale: 0.95 }}
		>
			{/* Knob with icon inside */}
			<motion.span
				layout
				transition={KNOB_SPRING}
				className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md"
				style={{ marginLeft: checked ? "auto" : 0 }}
			>
				<AnimatePresence mode="wait" initial={false}>
					{checked ? (
						<motion.span
							key="moon"
							className="absolute inset-0 flex items-center justify-center"
							initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
							animate={{ opacity: 1, rotate: 0, scale: 1 }}
							exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
							transition={{ duration: 0.2 }}
						>
							<Moon className="h-3.5 w-3.5 text-violet-600" strokeWidth={2.5} />
						</motion.span>
					) : (
						<motion.span
							key="sun"
							className="absolute inset-0 flex items-center justify-center"
							initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
							animate={{ opacity: 1, rotate: 0, scale: 1 }}
							exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
							transition={{ duration: 0.2 }}
						>
							<Sun className="h-3.5 w-3.5 text-amber-500" strokeWidth={2.5} />
						</motion.span>
					)}
				</AnimatePresence>
			</motion.span>
		</motion.button>
	);
}

// ---------------------------------------------------------------------------
// Variant 4 — Large toggle with text inside the track (Yes / No)
// ---------------------------------------------------------------------------

function LargeToggle({ checked, onChange }: ToggleProps) {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				onChange(!checked);
			}
		},
		[checked, onChange],
	);

	return (
		<motion.button
			type="button"
			role="switch"
			aria-checked={checked}
			onClick={() => onChange(!checked)}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			className="relative flex h-10 w-24 cursor-pointer items-center overflow-hidden rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
			animate={{ backgroundColor: checked ? "#f43f5e" : "#71717a" }}
			transition={{ duration: 0.2 }}
			whileTap={{ scale: 0.97 }}
		>
			{/* Track label — "Yes" on left, "No" on right */}
			<AnimatePresence initial={false}>
				{checked ? (
					<motion.span
						key="yes"
						className="pointer-events-none absolute left-3 font-semibold text-sm text-white"
						initial={{ opacity: 0, x: -8 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -8 }}
						transition={{ duration: 0.18 }}
					>
						Yes
					</motion.span>
				) : (
					<motion.span
						key="no"
						className="pointer-events-none absolute right-3 font-semibold text-sm text-white"
						initial={{ opacity: 0, x: 8 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 8 }}
						transition={{ duration: 0.18 }}
					>
						No
					</motion.span>
				)}
			</AnimatePresence>

			{/* Knob */}
			<motion.span
				layout
				transition={KNOB_SPRING}
				className="relative z-10 h-8 w-8 flex-shrink-0 rounded-full bg-white shadow-md"
				style={{ marginLeft: checked ? "auto" : 0 }}
			/>
		</motion.button>
	);
}

// ---------------------------------------------------------------------------
// Variant 5 — Toggle group (settings card)
// ---------------------------------------------------------------------------

type SettingRow = {
	id: string;
	label: string;
	description: string;
};

const SETTINGS: SettingRow[] = [
	{
		id: "notifications",
		label: "Notifications",
		description: "Receive alerts for new activity",
	},
	{
		id: "dark-mode",
		label: "Dark mode",
		description: "Use the dark color scheme",
	},
	{
		id: "auto-save",
		label: "Auto-save",
		description: "Save changes automatically",
	},
];

function ToggleGroup() {
	const [state, setState] = useState<Record<string, boolean>>({
		notifications: true,
		"dark-mode": false,
		"auto-save": true,
	});

	const toggle = useCallback((id: string) => {
		setState((prev) => ({ ...prev, [id]: !prev[id] }));
	}, []);

	return (
		<div className="w-full max-w-sm overflow-hidden rounded-2xl border border-default-200 bg-default-50 shadow-md">
			<div className="border-default-200 border-b px-5 py-3.5">
				<h3 className="font-semibold text-default-900 text-sm">Preferences</h3>
			</div>
			<ul className="divide-y divide-default-100">
				{SETTINGS.map(({ id, label, description }) => {
					const checked = state[id] ?? false;
					return (
						<li
							key={id}
							className="flex items-center justify-between px-5 py-4"
						>
							<div className="min-w-0 flex-1 pr-4">
								<p className="font-medium text-default-900 text-sm">{label}</p>
								<p className="mt-0.5 text-default-500 text-xs">{description}</p>
							</div>
							<BasicToggle checked={checked} onChange={() => toggle(id)} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Section wrapper — label + centered content, no entrance animation
// ---------------------------------------------------------------------------

function Section({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-center gap-4">
			<p className="font-semibold text-default-400 text-xs uppercase tracking-widest">
				{label}
			</p>
			<div className="flex items-center justify-center">{children}</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------

export function ToggleSwitchDemo() {
	const [basic, setBasic] = useState(false);
	const [label, setLabel] = useState(true);
	const [icon, setIcon] = useState(false);
	const [large, setLarge] = useState(true);

	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center gap-10 p-8">
			{/* Row 1 — first three variants side by side */}
			<div className="flex w-full max-w-2xl flex-wrap items-start justify-center gap-x-16 gap-y-10">
				<Section label="Basic toggle">
					<BasicToggle checked={basic} onChange={setBasic} />
				</Section>

				<Section label="With labels">
					<LabelToggle checked={label} onChange={setLabel} />
				</Section>

				<Section label="Icon (theme)">
					<IconToggle checked={icon} onChange={setIcon} />
				</Section>
			</div>

			{/* Divider */}
			<div className="flex w-full max-w-2xl items-center gap-4">
				<div className="h-px flex-1 bg-default-200" />
			</div>

			{/* Row 2 — large toggle + settings group */}
			<div className="flex w-full max-w-2xl flex-wrap items-start justify-center gap-x-16 gap-y-10">
				<Section label="Large (yes / no)">
					<LargeToggle checked={large} onChange={setLarge} />
				</Section>

				<Section label="Toggle group">
					<ToggleGroup />
				</Section>
			</div>
		</div>
	);
}
