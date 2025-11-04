import { useState } from "react";
import {
	SkeletonAvatar,
	SkeletonButton,
	SkeletonCard,
	SkeletonListItem,
	SkeletonProfile,
	SkeletonTable,
	SkeletonText,
} from "./ui/skeleton";

export function SkeletonDemo() {
	const [variant, setVariant] = useState<"shimmer" | "pulse" | "wave">(
		"shimmer",
	);

	return (
		<div className="w-full space-y-8 p-8">
			{/* Variant Switcher */}
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold text-xl">Skeleton Loaders</h3>
					<p className="text-default-500 text-sm">
						Placeholder components with multiple animation variants
					</p>
				</div>
				<div className="flex gap-2">
					{(["shimmer", "pulse", "wave"] as const).map((v) => (
						<button
							key={v}
							type="button"
							onClick={() => setVariant(v)}
							className={`rounded-lg px-3 py-1.5 text-sm capitalize transition-colors ${
								variant === v
									? "bg-primary text-primary-foreground"
									: "bg-default-100 text-default-600 hover:bg-default-200"
							}`}
						>
							{v}
						</button>
					))}
				</div>
			</div>

			{/* Cards */}
			<section>
				<h4 className="mb-4 font-medium text-lg">Cards</h4>
				<div className="grid gap-6 md:grid-cols-2">
					<SkeletonCard variant={variant} />
					<SkeletonCard variant={variant} />
				</div>
			</section>

			{/* Profile */}
			<section>
				<h4 className="mb-4 font-medium text-lg">Profile</h4>
				<SkeletonProfile variant={variant} />
			</section>

			{/* List Items */}
			<section>
				<h4 className="mb-4 font-medium text-lg">List Items</h4>
				<div className="space-y-3">
					<SkeletonListItem variant={variant} />
					<SkeletonListItem variant={variant} />
					<SkeletonListItem variant={variant} />
					<SkeletonListItem variant={variant} />
				</div>
			</section>

			{/* Table */}
			<section>
				<h4 className="mb-4 font-medium text-lg">Table</h4>
				<SkeletonTable variant={variant} rows={5} />
			</section>

			{/* Text & Components */}
			<section>
				<h4 className="mb-4 font-medium text-lg">Text & Components</h4>
				<div className="space-y-6">
					<div>
						<p className="mb-2 text-default-500 text-sm">Text Lines</p>
						<SkeletonText variant={variant} lines={4} />
					</div>
					<div>
						<p className="mb-2 text-default-500 text-sm">Avatars</p>
						<div className="flex items-center gap-4">
							<SkeletonAvatar variant={variant} size="sm" />
							<SkeletonAvatar variant={variant} size="md" />
							<SkeletonAvatar variant={variant} size="lg" />
						</div>
					</div>
					<div>
						<p className="mb-2 text-default-500 text-sm">Buttons</p>
						<div className="flex gap-3">
							<SkeletonButton variant={variant} size="sm" />
							<SkeletonButton variant={variant} size="md" />
							<SkeletonButton variant={variant} size="lg" />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
