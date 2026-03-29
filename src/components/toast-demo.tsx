import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { ToastProvider, useToast } from "./ui/toast";

function ToastControls() {
	const { addToast } = useToast();

	const triggers = [
		{
			variant: "success" as const,
			label: "Success",
			title: "Changes saved",
			description: "Your profile has been updated successfully.",
			icon: CheckCircle2,
			color:
				"bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20",
		},
		{
			variant: "error" as const,
			label: "Error",
			title: "Upload failed",
			description: "The file exceeds the maximum size limit.",
			icon: XCircle,
			color: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20",
		},
		{
			variant: "warning" as const,
			label: "Warning",
			title: "Storage almost full",
			description: "You've used 90% of your available storage.",
			icon: AlertTriangle,
			color:
				"bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20",
		},
		{
			variant: "info" as const,
			label: "Info",
			title: "New update available",
			description: "Version 2.4.0 is ready to install.",
			icon: Info,
			color:
				"bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20",
		},
	];

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8">
			<div className="flex flex-col items-center gap-2">
				<h2 className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text font-bold text-2xl text-transparent">
					Toast Notifications
				</h2>
				<p className="text-default-500 text-sm">
					Click to trigger — swipe right to dismiss
				</p>
			</div>
			<div className="grid grid-cols-2 gap-3">
				{triggers.map((t) => {
					const Icon = t.icon;
					return (
						<button
							key={t.variant}
							type="button"
							onClick={() =>
								addToast({
									variant: t.variant,
									title: t.title,
									description: t.description,
								})
							}
							className={`flex items-center gap-2.5 rounded-xl border px-5 py-3 font-medium text-sm transition-colors ${t.color}`}
						>
							<Icon className="h-4 w-4" />
							{t.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export function ToastDemo() {
	return (
		<ToastProvider>
			<ToastControls />
		</ToastProvider>
	);
}
