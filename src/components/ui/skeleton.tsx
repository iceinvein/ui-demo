import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";

interface SkeletonProps extends HTMLMotionProps<"div"> {
	className?: string;
	variant?: "default" | "shimmer" | "pulse" | "wave";
}

/**
 * Base Skeleton component with multiple animation variants
 */
export function Skeleton({
	className = "",
	variant = "shimmer",
	...props
}: SkeletonProps) {
	const baseClasses = "rounded-lg bg-default-200";

	const variants = {
		default: {},
		pulse: {
			animate: {
				opacity: [0.5, 1, 0.5],
			},
			transition: {
				duration: 1.5,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut" as const,
			},
		},
		shimmer: {
			animate: {
				backgroundPosition: ["200% 0", "-200% 0"],
			},
			transition: {
				duration: 2,
				repeat: Number.POSITIVE_INFINITY,
				ease: "linear" as const,
			},
		},
		wave: {
			animate: {
				backgroundPosition: ["0% 0%", "100% 100%"],
			},
			transition: {
				duration: 1.5,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut" as const,
			},
		},
	};

	const shimmerStyle =
		variant === "shimmer"
			? {
					backgroundImage:
						"linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
					backgroundSize: "200% 100%",
				}
			: {};

	const waveStyle =
		variant === "wave"
			? {
					backgroundImage:
						"linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
					backgroundSize: "200% 200%",
				}
			: {};

	return (
		<motion.div
			className={`${baseClasses} ${className}`}
			style={{ ...shimmerStyle, ...waveStyle }}
			{...variants[variant]}
			{...props}
		/>
	);
}

/**
 * Card Skeleton - Image + Title + Description
 */
export function SkeletonCard({
	variant = "shimmer",
}: {
	variant?: SkeletonProps["variant"];
}) {
	return (
		<div className="w-full overflow-hidden rounded-xl border border-default-200 bg-content1 p-4">
			{/* Image */}
			<Skeleton variant={variant} className="mb-4 h-48 w-full" />

			{/* Title */}
			<Skeleton variant={variant} className="mb-3 h-6 w-3/4" />

			{/* Description lines */}
			<div className="space-y-2">
				<Skeleton variant={variant} className="h-4 w-full" />
				<Skeleton variant={variant} className="h-4 w-5/6" />
				<Skeleton variant={variant} className="h-4 w-4/6" />
			</div>

			{/* Footer */}
			<div className="mt-4 flex items-center gap-3">
				<Skeleton variant={variant} className="h-10 w-10 rounded-full" />
				<div className="flex-1 space-y-2">
					<Skeleton variant={variant} className="h-3 w-24" />
					<Skeleton variant={variant} className="h-3 w-32" />
				</div>
			</div>
		</div>
	);
}

/**
 * List Item Skeleton
 */
export function SkeletonListItem({
	variant = "shimmer",
}: {
	variant?: SkeletonProps["variant"];
}) {
	return (
		<div className="flex items-center gap-4 rounded-lg border border-default-200 bg-content1 p-4">
			<Skeleton variant={variant} className="h-12 w-12 rounded-full" />
			<div className="flex-1 space-y-2">
				<Skeleton variant={variant} className="h-4 w-3/4" />
				<Skeleton variant={variant} className="h-3 w-1/2" />
			</div>
			<Skeleton variant={variant} className="h-8 w-20 rounded-md" />
		</div>
	);
}

/**
 * Profile Skeleton
 */
export function SkeletonProfile({
	variant = "shimmer",
}: {
	variant?: SkeletonProps["variant"];
}) {
	return (
		<div className="w-full rounded-xl border border-default-200 bg-content1 p-6">
			{/* Cover */}
			<Skeleton variant={variant} className="mb-4 h-32 w-full rounded-lg" />

			{/* Avatar & Info */}
			<div className="flex items-start gap-4">
				<Skeleton
					variant={variant}
					className="-mt-16 h-24 w-24 rounded-full border-4 border-content1"
				/>
				<div className="flex-1 space-y-3 pt-2">
					<Skeleton variant={variant} className="h-6 w-48" />
					<Skeleton variant={variant} className="h-4 w-32" />
				</div>
			</div>

			{/* Stats */}
			<div className="mt-6 grid grid-cols-3 gap-4">
				{[1, 2, 3].map((i) => (
					<div key={i} className="space-y-2 text-center">
						<Skeleton variant={variant} className="mx-auto h-8 w-16" />
						<Skeleton variant={variant} className="mx-auto h-3 w-20" />
					</div>
				))}
			</div>

			{/* Bio */}
			<div className="mt-6 space-y-2">
				<Skeleton variant={variant} className="h-4 w-full" />
				<Skeleton variant={variant} className="h-4 w-full" />
				<Skeleton variant={variant} className="h-4 w-3/4" />
			</div>
		</div>
	);
}

/**
 * Table Skeleton
 */
export function SkeletonTable({
	rows = 5,
	variant = "shimmer",
}: {
	rows?: number;
	variant?: SkeletonProps["variant"];
}) {
	return (
		<div className="w-full overflow-hidden rounded-xl border border-default-200 bg-content1">
			{/* Header */}
			<div className="grid grid-cols-4 gap-4 border-default-200 border-b bg-default-100 p-4">
				{[1, 2, 3, 4].map((i) => (
					<Skeleton key={i} variant={variant} className="h-4" />
				))}
			</div>

			{/* Rows */}
			{Array.from({ length: rows }).map((_, i) => (
				<div
					key={i}
					className="grid grid-cols-4 gap-4 border-default-200 border-b p-4 last:border-b-0"
				>
					<Skeleton variant={variant} className="h-4" />
					<Skeleton variant={variant} className="h-4" />
					<Skeleton variant={variant} className="h-4" />
					<Skeleton variant={variant} className="h-4" />
				</div>
			))}
		</div>
	);
}

/**
 * Text Lines Skeleton
 */
export function SkeletonText({
	lines = 3,
	variant = "shimmer",
}: {
	lines?: number;
	variant?: SkeletonProps["variant"];
}) {
	return (
		<div className="space-y-2">
			{Array.from({ length: lines }).map((_, i) => (
				<Skeleton
					key={i}
					variant={variant}
					className="h-4"
					style={{
						width: i === lines - 1 ? "60%" : "100%",
					}}
				/>
			))}
		</div>
	);
}

/**
 * Avatar Skeleton
 */
export function SkeletonAvatar({
	size = "md",
	variant = "shimmer",
}: {
	size?: "sm" | "md" | "lg";
	variant?: SkeletonProps["variant"];
}) {
	const sizes = {
		sm: "h-8 w-8",
		md: "h-12 w-12",
		lg: "h-16 w-16",
	};

	return (
		<Skeleton variant={variant} className={`${sizes[size]} rounded-full`} />
	);
}

/**
 * Button Skeleton
 */
export function SkeletonButton({
	variant = "shimmer",
	size = "md",
}: {
	variant?: SkeletonProps["variant"];
	size?: "sm" | "md" | "lg";
}) {
	const sizeClasses = {
		sm: "h-8 w-20",
		md: "h-10 w-24",
		lg: "h-12 w-28",
	};

	return (
		<Skeleton variant={variant} className={`${sizeClasses[size]} rounded-lg`} />
	);
}
