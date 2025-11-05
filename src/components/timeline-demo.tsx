import { Briefcase, GraduationCap, Rocket, Trophy, Zap } from "lucide-react";
import { Timeline, type TimelineItem } from "./ui/timeline";

export function TimelineDemo() {
	const timelineItems: TimelineItem[] = [
		{
			id: "1",
			title: "Project Kickoff",
			description:
				"Initiated the new product development cycle with stakeholder alignment and resource planning.",
			date: "January 2024",
			icon: <Rocket className="h-5 w-5" />,
			color: "#3b82f6",
		},
		{
			id: "2",
			title: "Design Phase Complete",
			description:
				"Finalized UI/UX designs, created design system, and completed user research with 50+ participants.",
			date: "February 2024",
			icon: <Zap className="h-5 w-5" />,
			color: "#8b5cf6",
		},
		{
			id: "3",
			title: "Development Milestone",
			description:
				"Reached 80% code completion with all core features implemented and initial testing completed.",
			date: "March 2024",
			icon: <Briefcase className="h-5 w-5" />,
			color: "#ec4899",
		},
		{
			id: "4",
			title: "Beta Launch",
			description:
				"Released beta version to 1,000 early adopters and gathered valuable feedback for improvements.",
			date: "April 2024",
			icon: <GraduationCap className="h-5 w-5" />,
			color: "#f59e0b",
		},
		{
			id: "5",
			title: "Public Release",
			description:
				"Successfully launched to the public with 10,000+ users in the first week and 4.8★ rating.",
			date: "May 2024",
			icon: <Trophy className="h-5 w-5" />,
			color: "#10b981",
		},
	];

	return (
		<div className="flex min-h-[600px] items-center justify-center p-8">
			<div className="w-full max-w-3xl">
				<Timeline items={timelineItems} />
			</div>
		</div>
	);
}
