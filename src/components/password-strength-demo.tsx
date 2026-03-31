import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff, ShieldCheck, X } from "lucide-react";
import { useMemo, useState } from "react";

type Requirement = {
	label: string;
	test: (pw: string) => boolean;
};

const REQUIREMENTS: Requirement[] = [
	{ label: "At least 8 characters", test: (pw) => pw.length >= 8 },
	{ label: "Uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
	{ label: "Lowercase letter", test: (pw) => /[a-z]/.test(pw) },
	{ label: "Number", test: (pw) => /\d/.test(pw) },
	{ label: "Special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

const STRENGTH_CONFIG = [
	{ label: "Too weak", color: "#ef4444", bg: "bg-red-500", width: "20%" },
	{ label: "Weak", color: "#f97316", bg: "bg-orange-500", width: "40%" },
	{ label: "Fair", color: "#eab308", bg: "bg-yellow-500", width: "60%" },
	{ label: "Strong", color: "#22c55e", bg: "bg-green-500", width: "80%" },
	{ label: "Very strong", color: "#10b981", bg: "bg-emerald-500", width: "100%" },
];

function getStrength(password: string): number {
	if (password.length === 0) return -1;
	const passed = REQUIREMENTS.filter((r) => r.test(password)).length;
	return Math.min(passed, STRENGTH_CONFIG.length) - 1;
}

export function PasswordStrengthDemo() {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [focused, setFocused] = useState(false);

	const strength = useMemo(() => getStrength(password), [password]);
	const config = strength >= 0 ? STRENGTH_CONFIG[strength] : null;
	const results = useMemo(
		() => REQUIREMENTS.map((r) => ({ ...r, passed: r.test(password) })),
		[password],
	);

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8">
			{/* Header */}
			<motion.div
				className="flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
			>
				<h2 className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text font-bold text-2xl text-transparent">
					Password Strength
				</h2>
				<p className="text-default-500 text-sm">
					Real-time validation with animated feedback
				</p>
			</motion.div>

			{/* Card */}
			<motion.div
				className="w-full max-w-sm rounded-2xl border border-default-200/60 bg-default-50 p-6 shadow-lg"
				initial={{ opacity: 0, scale: 0.97 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.15 }}
			>
				{/* Icon */}
				<div className="mb-5 flex justify-center">
					<motion.div
						className="flex h-12 w-12 items-center justify-center rounded-xl"
						style={{
							backgroundColor: config
								? `${config.color}18`
								: "rgba(99,102,241,0.1)",
						}}
						animate={{
							scale: focused ? 1.05 : 1,
						}}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
					>
						<ShieldCheck
							className="h-6 w-6"
							style={{ color: config?.color ?? "#6366f1" }}
						/>
					</motion.div>
				</div>

				{/* Input */}
				<div className="relative mb-4">
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						placeholder="Enter a password"
						className="w-full rounded-xl border border-default-200 bg-default-100 px-4 py-3 pr-10 text-default-800 text-sm outline-none transition-all placeholder:text-default-400 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
					/>
					<button
						type="button"
						onClick={() => setShowPassword((s) => !s)}
						className="absolute top-1/2 right-3 -translate-y-1/2 text-default-400 transition-colors hover:text-default-600"
					>
						{showPassword ? (
							<EyeOff className="h-4 w-4" />
						) : (
							<Eye className="h-4 w-4" />
						)}
					</button>
				</div>

				{/* Strength bar — uses scaleX (transform) instead of width
			    to avoid layout recalculation that corrupts layoutId morphs */}
				<div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-default-200">
					<motion.div
						className="h-full w-full origin-left rounded-full"
						style={{
							backgroundColor: config?.color ?? "transparent",
						}}
						animate={{
							scaleX: config
								? Number.parseFloat(config.width) / 100
								: 0,
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 30,
						}}
					/>
				</div>

				{/* Strength label */}
				<div className="mb-5 flex items-center justify-between">
					<AnimatePresence mode="wait">
						{config && (
							<motion.span
								key={config.label}
								className="font-medium text-xs"
								style={{ color: config.color }}
								initial={{ opacity: 0, y: -4 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 4 }}
								transition={{ duration: 0.15 }}
							>
								{config.label}
							</motion.span>
						)}
					</AnimatePresence>
					{password.length > 0 && (
						<motion.span
							className="font-mono text-default-400 text-[10px]"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							{results.filter((r) => r.passed).length}/{REQUIREMENTS.length}
						</motion.span>
					)}
				</div>

				{/* Requirements checklist */}
				<div className="space-y-2">
					{results.map((req, i) => (
						<motion.div
							key={req.label}
							className="flex items-center gap-2.5"
							initial={{ opacity: 0, x: -8 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.05 * i }}
						>
							<motion.div
								className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
								animate={{
									backgroundColor:
										password.length === 0
											? "rgba(128,128,128,0.15)"
											: req.passed
												? "rgba(34,197,94,0.15)"
												: "rgba(239,68,68,0.15)",
									scale: req.passed && password.length > 0 ? 1.3 : 1,
								}}
								transition={{
									backgroundColor: { duration: 0.2 },
									scale: {
										type: "spring",
										stiffness: 500,
										damping: 15,
									},
								}}
							>
								{password.length > 0 ? (
									req.passed ? (
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{
												type: "spring",
												stiffness: 500,
												damping: 20,
											}}
										>
											<Check className="h-2.5 w-2.5 text-green-500" />
										</motion.div>
									) : (
										<X className="h-2.5 w-2.5 text-red-400" />
									)
								) : (
									<div className="h-1 w-1 rounded-full bg-default-300" />
								)}
							</motion.div>
							<span
								className={`text-xs transition-colors duration-200 ${
									password.length === 0
										? "text-default-400"
										: req.passed
											? "text-green-500"
											: "text-default-500"
								}`}
							>
								{req.label}
							</span>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Preset buttons */}
			<motion.div
				className="flex flex-wrap justify-center gap-2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<span className="mr-1 self-center font-mono text-default-400 text-xs">
					Try:
				</span>
				{[
					{ label: "Weak", value: "abc" },
					{ label: "Fair", value: "Hello1" },
					{ label: "Strong", value: "Hello1!" },
					{ label: "Max", value: "P@ssw0rd!X" },
				].map((preset) => (
					<button
						key={preset.label}
						type="button"
						onClick={() => setPassword(preset.value)}
						className="rounded-full border border-default-200/60 px-3 py-1 font-mono text-default-500 text-xs transition-all hover:border-indigo-500/30 hover:text-indigo-400"
					>
						{preset.label}
					</button>
				))}
			</motion.div>
		</div>
	);
}
