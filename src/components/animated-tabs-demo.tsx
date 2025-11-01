import { type AnimatedTab, AnimatedTabs } from "./ui/animated-tabs";

/**
 * Demo component showcasing the AnimatedTabs component
 */
export function AnimatedTabsDemo() {
	const tabs: AnimatedTab[] = [
		{
			id: "overview",
			label: "Overview",
			color: "#3b82f6",
			content: (
				<>
					<div className="flex items-center gap-3">
						<span className="h-5 w-5 rounded-full bg-blue-500" />
						<h3 className="m-0 font-semibold text-xl">Project Overview</h3>
					</div>
					<p className="text-default-500">
						Welcome to your project dashboard. Track progress, manage tasks, and
						collaborate with your team all in one place.
					</p>
					<div className="mt-4 grid grid-cols-2 gap-3">
						<div className="rounded-lg bg-blue-50 p-3">
							<p className="font-medium text-blue-900 text-xs">Active Tasks</p>
							<p className="font-bold text-2xl text-blue-600">24</p>
						</div>
						<div className="rounded-lg bg-green-50 p-3">
							<p className="font-medium text-green-900 text-xs">Completed</p>
							<p className="font-bold text-2xl text-green-600">156</p>
						</div>
					</div>
				</>
			),
		},
		{
			id: "team",
			label: "Team",
			color: "#ec4899",
			content: (
				<>
					<div className="flex items-center gap-3">
						<span className="h-5 w-5 rounded-full bg-pink-500" />
						<h3 className="m-0 font-semibold text-xl">Team Members</h3>
					</div>
					<p className="text-default-500">
						Collaborate with 12 team members across 3 departments.
					</p>
					<div className="mt-4 space-y-2">
						<div className="flex items-center gap-3 rounded-lg bg-default-100 p-2">
							<div className="h-8 w-8 rounded-full bg-pink-200" />
							<div>
								<p className="font-medium text-sm">Sarah Chen</p>
								<p className="text-default-400 text-xs">Product Designer</p>
							</div>
						</div>
						<div className="flex items-center gap-3 rounded-lg bg-default-100 p-2">
							<div className="h-8 w-8 rounded-full bg-purple-200" />
							<div>
								<p className="font-medium text-sm">Alex Rivera</p>
								<p className="text-default-400 text-xs">Frontend Developer</p>
							</div>
						</div>
					</div>
				</>
			),
		},
		{
			id: "analytics",
			label: "Analytics",
			color: "#8b5cf6",
			content: (
				<>
					<div className="flex items-center gap-3">
						<span className="h-5 w-5 rounded-full bg-purple-500" />
						<h3 className="m-0 font-semibold text-xl">Performance Analytics</h3>
					</div>
					<p className="text-default-500">
						Monitor your project metrics and track key performance indicators.
					</p>
					<p className="mt-2 text-default-500 text-sm">
						This tab demonstrates the dynamic height adjustment feature - notice
						how the container smoothly expands to fit longer content.
					</p>
					<div className="mt-4 space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-default-600 text-sm">User Engagement</span>
							<span className="font-semibold text-purple-600 text-sm">
								+23%
							</span>
						</div>
						<div className="h-2 overflow-hidden rounded-full bg-default-200">
							<div className="h-full w-3/4 bg-purple-500" />
						</div>
					</div>
				</>
			),
		},
		{
			id: "settings",
			label: "Settings",
			color: "#f59e0b",
			content: (
				<>
					<div className="flex items-center gap-3">
						<span className="h-5 w-5 rounded-full bg-amber-500" />
						<h3 className="m-0 font-semibold text-xl">Project Settings</h3>
					</div>
					<p className="text-default-500">
						Configure your project preferences and manage integrations.
					</p>
					<ul className="mt-4 space-y-2 text-default-500 text-sm">
						<li className="flex items-center gap-2">
							<span className="text-amber-500">✓</span>
							Notifications enabled
						</li>
						<li className="flex items-center gap-2">
							<span className="text-amber-500">✓</span>
							Auto-save active
						</li>
						<li className="flex items-center gap-2">
							<span className="text-amber-500">✓</span>
							Dark mode synced
						</li>
						<li className="flex items-center gap-2">
							<span className="text-amber-500">✓</span>
							API integration connected
						</li>
					</ul>
				</>
			),
		},
	];

	return (
		<div className="flex items-center justify-center p-8">
			<div className="w-full max-w-md">
				<div className="mb-4 text-center">
					<h2 className="mb-2 font-bold text-2xl">Animated Tabs Demo</h2>
					<p className="text-default-500 text-sm">
						Switch between tabs to see smooth animations and dynamic height
						adjustment
					</p>
				</div>
				<AnimatedTabs
					tabs={tabs}
					defaultTab="overview"
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					enableBlur={false}
					minHeight={150}
				/>
			</div>
		</div>
	);
}
