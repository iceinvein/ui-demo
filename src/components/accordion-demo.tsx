import { Code, Palette, Rocket, Settings } from "lucide-react";
import { Accordion, type AccordionItem } from "./ui/accordion";

export function AccordionDemo() {
	const accordionItems: AccordionItem[] = [
		{
			id: "1",
			title: "Getting Started",
			icon: <Rocket className="h-5 w-5" />,
			content: (
				<div className="space-y-3">
					<p>
						Welcome to our platform! Getting started is easy and takes just a
						few minutes. Follow these simple steps:
					</p>
					<ol className="ml-4 list-decimal space-y-2">
						<li>Create your account with email or social login</li>
						<li>Complete your profile with basic information</li>
						<li>Explore the dashboard and available features</li>
						<li>Start your first project or join an existing team</li>
					</ol>
					<p className="text-sm">
						Need help? Check out our comprehensive documentation or contact
						support.
					</p>
				</div>
			),
		},
		{
			id: "2",
			title: "Customization Options",
			icon: <Palette className="h-5 w-5" />,
			content: (
				<div className="space-y-3">
					<p>
						Personalize your experience with our extensive customization
						options:
					</p>
					<ul className="ml-4 list-disc space-y-2">
						<li>
							<strong>Themes:</strong> Choose from light, dark, or auto mode
						</li>
						<li>
							<strong>Colors:</strong> Customize accent colors to match your
							brand
						</li>
						<li>
							<strong>Layout:</strong> Adjust sidebar position and density
						</li>
						<li>
							<strong>Notifications:</strong> Configure alerts and preferences
						</li>
					</ul>
					<p className="text-sm">
						All settings are saved automatically and sync across devices.
					</p>
				</div>
			),
		},
		{
			id: "3",
			title: "Developer API",
			icon: <Code className="h-5 w-5" />,
			content: (
				<div className="space-y-3">
					<p>
						Integrate our platform into your applications with our powerful REST
						API:
					</p>
					<div className="rounded-lg bg-default-100 p-4 font-mono text-sm">
						<code className="text-primary">
							curl -X GET https://api.example.com/v1/data \<br />
							&nbsp;&nbsp;-H "Authorization: Bearer YOUR_TOKEN"
						</code>
					</div>
					<ul className="ml-4 list-disc space-y-2">
						<li>RESTful endpoints with JSON responses</li>
						<li>OAuth 2.0 authentication</li>
						<li>Rate limiting: 1000 requests/hour</li>
						<li>Comprehensive SDK for JavaScript, Python, and Ruby</li>
					</ul>
				</div>
			),
		},
		{
			id: "4",
			title: "Advanced Settings",
			icon: <Settings className="h-5 w-5" />,
			content: (
				<div className="space-y-3">
					<p>Fine-tune your workspace with advanced configuration options:</p>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="rounded-lg border border-default-200 p-3">
							<h4 className="mb-2 font-semibold text-sm">Security</h4>
							<p className="text-sm">
								Two-factor authentication, session management, and IP
								whitelisting
							</p>
						</div>
						<div className="rounded-lg border border-default-200 p-3">
							<h4 className="mb-2 font-semibold text-sm">Integrations</h4>
							<p className="text-sm">
								Connect with Slack, GitHub, Jira, and 50+ other tools
							</p>
						</div>
						<div className="rounded-lg border border-default-200 p-3">
							<h4 className="mb-2 font-semibold text-sm">Automation</h4>
							<p className="text-sm">
								Create workflows with triggers, actions, and conditions
							</p>
						</div>
						<div className="rounded-lg border border-default-200 p-3">
							<h4 className="mb-2 font-semibold text-sm">Analytics</h4>
							<p className="text-sm">
								Track usage, performance metrics, and custom events
							</p>
						</div>
					</div>
				</div>
			),
		},
	];

	return (
		<div className="flex min-h-[600px] items-center justify-center p-8">
			<div className="w-full max-w-3xl">
				<Accordion items={accordionItems} allowMultiple={false} />
			</div>
		</div>
	);
}
