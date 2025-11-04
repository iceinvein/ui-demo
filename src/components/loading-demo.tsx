import { useEffect, useState } from "react";
import {
	CircularProgress,
	GradientProgress,
	IndeterminateProgress,
	LinearProgress,
} from "./ui/progress";
import {
	BarsSpinner,
	CircularSpinner,
	DotsSpinner,
	GridSpinner,
} from "./ui/spinner";

export function LoadingDemo() {
	const [progress, setProgress] = useState(0);

	// Simulate progress
	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
		}, 50);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="w-full space-y-12 p-8">
			{/* Spinners */}
			<section>
				<div className="mb-6">
					<h3 className="font-semibold text-xl">Loading Indicators</h3>
					<p className="text-default-500 text-sm">
						Animated loading indicators
					</p>
				</div>
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<div className="flex flex-col items-center gap-3">
						<CircularSpinner size="lg" color="#006FEE" />
						<span className="text-default-500 text-sm">Circular</span>
					</div>
					<div className="flex flex-col items-center gap-3">
						<DotsSpinner size="lg" color="#7828C8" />
						<span className="text-default-500 text-sm">Dots</span>
					</div>
					<div className="flex flex-col items-center gap-3">
						<BarsSpinner size="lg" color="#17C964" />
						<span className="text-default-500 text-sm">Bars</span>
					</div>
					<div className="flex flex-col items-center gap-3">
						<GridSpinner size="lg" color="#0E793C" />
						<span className="text-default-500 text-sm">Grid</span>
					</div>
				</div>
			</section>

			{/* Progress Indicators */}
			<section>
				<div className="mb-6">
					<h3 className="font-semibold text-xl">Progress Indicators</h3>
					<p className="text-default-500 text-sm">
						Track progress with bars, circles, and step indicators
					</p>
				</div>
				<div className="space-y-8">
					{/* Linear Progress */}
					<div>
						<p className="mb-3 font-medium text-default-600 text-sm">
							Linear Progress
						</p>
						<LinearProgress value={progress} showLabel />
					</div>

					{/* Circular Progress */}
					<div>
						<p className="mb-3 font-medium text-default-600 text-sm">
							Circular Progress
						</p>
						<div className="flex items-center gap-8">
							<CircularProgress value={progress} size="sm" />
							<CircularProgress value={progress} size="md" />
							<CircularProgress value={progress} size="lg" />
						</div>
					</div>

					{/* Gradient Progress */}
					<div>
						<p className="mb-3 font-medium text-default-600 text-sm">
							Gradient Progress
						</p>
						<GradientProgress value={progress} />
					</div>

					{/* Indeterminate Progress */}
					<div>
						<p className="mb-3 font-medium text-default-600 text-sm">
							Indeterminate Progress
						</p>
						<IndeterminateProgress />
					</div>
				</div>
			</section>
		</div>
	);
}
