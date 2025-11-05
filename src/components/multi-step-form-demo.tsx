import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Select, SelectItem } from "@heroui/select";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Settings, User } from "lucide-react";
import { useState } from "react";
import { type FormStep, MultiStepForm } from "./ui/multi-step-form";

export function MultiStepFormDemo() {
	const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
		"horizontal",
	);
	const [isCompleted, setIsCompleted] = useState(false);
	const [resetKey, setResetKey] = useState(0);
	const [formData, setFormData] = useState({
		name: "John Doe",
		email: "john.doe@example.com",
		company: "Acme Corporation",
		role: "Senior Product Designer",
		preferences: ["design", "development"] as string[],
		notifications: true,
	});

	const steps: FormStep[] = [
		{
			id: "personal",
			title: "Personal Info",
			description: "Tell us about yourself",
			icon: <User className="h-6 w-6" />,
			content: (
				<div className="space-y-4">
					<div>
						<label htmlFor="name" className="mb-2 block font-medium text-sm">
							Full Name
						</label>
						<input
							id="name"
							type="text"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							className="w-full rounded-lg border border-default-300 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none"
							placeholder="John Doe"
						/>
					</div>
					<div>
						<label htmlFor="email" className="mb-2 block font-medium text-sm">
							Email Address
						</label>
						<input
							id="email"
							type="email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							className="w-full rounded-lg border border-default-300 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none"
							placeholder="john@example.com"
						/>
					</div>
				</div>
			),
		},
		{
			id: "professional",
			title: "Professional",
			description: "Your work information",
			icon: <Briefcase className="h-6 w-6" />,
			content: (
				<div className="space-y-4">
					<div>
						<label htmlFor="company" className="mb-2 block font-medium text-sm">
							Company
						</label>
						<input
							id="company"
							type="text"
							value={formData.company}
							onChange={(e) =>
								setFormData({ ...formData, company: e.target.value })
							}
							className="w-full rounded-lg border border-default-300 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none"
							placeholder="Acme Inc."
						/>
					</div>
					<div>
						<Select
							label="Role"
							placeholder="Select a role"
							selectedKeys={formData.role ? [formData.role] : []}
							onSelectionChange={(keys) => {
								const value = Array.from(keys)[0] as string;
								setFormData({ ...formData, role: value || "" });
							}}
							variant="bordered"
							classNames={{
								trigger: "border-default-300 hover:border-default-400",
							}}
						>
							<SelectItem key="Senior Product Designer">
								Senior Product Designer
							</SelectItem>
							<SelectItem key="Product Manager">Product Manager</SelectItem>
							<SelectItem key="Software Engineer">Software Engineer</SelectItem>
							<SelectItem key="UX Designer">UX Designer</SelectItem>
							<SelectItem key="Frontend Developer">
								Frontend Developer
							</SelectItem>
							<SelectItem key="Backend Developer">Backend Developer</SelectItem>
							<SelectItem key="DevOps Engineer">DevOps Engineer</SelectItem>
							<SelectItem key="Data Scientist">Data Scientist</SelectItem>
						</Select>
					</div>
				</div>
			),
		},
		{
			id: "preferences",
			title: "Preferences",
			description: "Customize your experience",
			icon: <Settings className="h-6 w-6" />,
			content: (
				<div className="space-y-4">
					<CheckboxGroup
						label="Interests"
						value={formData.preferences}
						onValueChange={(value) =>
							setFormData({ ...formData, preferences: value })
						}
						classNames={{
							label: "font-medium text-sm",
						}}
					>
						<Checkbox value="design" color="primary">
							Design
						</Checkbox>
						<Checkbox value="development" color="primary">
							Development
						</Checkbox>
						<Checkbox value="marketing" color="primary">
							Marketing
						</Checkbox>
						<Checkbox value="sales" color="primary">
							Sales
						</Checkbox>
					</CheckboxGroup>
				</div>
			),
		},
		{
			id: "review",
			title: "Review",
			description: "Check your information",
			icon: <CheckCircle className="h-6 w-6" />,
			content: (
				<div className="space-y-4">
					<div className="rounded-lg border border-default-200 bg-default-50 p-6">
						<h4 className="mb-4 font-semibold text-lg">Summary</h4>
						<div className="space-y-3 text-sm">
							<div className="flex justify-between">
								<span className="text-default-600">Name:</span>
								<span className="font-medium">
									{formData.name || "Not provided"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-default-600">Email:</span>
								<span className="font-medium">
									{formData.email || "Not provided"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-default-600">Company:</span>
								<span className="font-medium">
									{formData.company || "Not provided"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-default-600">Role:</span>
								<span className="font-medium">
									{formData.role || "Not provided"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-default-600">Interests:</span>
								<span className="font-medium">
									{formData.preferences.length > 0
										? formData.preferences.join(", ")
										: "None selected"}
								</span>
							</div>
						</div>
					</div>
				</div>
			),
		},
	];

	return (
		<div className="relative min-h-[700px] p-8">
			{/* Orientation Toggle */}
			<div className="mb-8 flex justify-center">
				<div className="inline-flex rounded-xl border-2 border-default-200 bg-default-100 p-1">
					<button
						type="button"
						onClick={() => setOrientation("horizontal")}
						className={`rounded-lg px-6 py-2 font-semibold text-sm transition-all ${
							orientation === "horizontal"
								? "bg-primary text-white shadow-lg shadow-primary/20"
								: "text-default-600 hover:text-foreground"
						}`}
					>
						Horizontal
					</button>
					<button
						type="button"
						onClick={() => setOrientation("vertical")}
						className={`rounded-lg px-6 py-2 font-semibold text-sm transition-all ${
							orientation === "vertical"
								? "bg-primary text-white shadow-lg shadow-primary/20"
								: "text-default-600 hover:text-foreground"
						}`}
					>
						Vertical
					</button>
				</div>
			</div>

			{/* Form Container */}
			<div
				className={`mx-auto ${orientation === "vertical" ? "max-w-5xl" : "max-w-3xl"}`}
			>
				<MultiStepForm
					key={resetKey}
					steps={steps}
					orientation={orientation}
					onComplete={() => {
						console.log("Form completed!", formData);
						setIsCompleted(true);
					}}
					onStepChange={(step) => {
						console.log("Step changed to:", step);
					}}
				/>
			</div>

			{/* Success Modal */}
			{isCompleted && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
					onClick={() => setIsCompleted(false)}
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 25,
						}}
						className="relative mx-4 max-w-md overflow-hidden rounded-3xl border border-default-200 bg-background shadow-2xl"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Success Icon */}
						<div className="flex flex-col items-center px-8 pt-12 pb-8">
							<motion.div
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								transition={{
									type: "spring",
									stiffness: 200,
									damping: 15,
									delay: 0.1,
								}}
								className="relative mb-6"
							>
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10">
									<CheckCircle
										className="h-14 w-14 text-success"
										strokeWidth={2}
									/>
								</div>
								<motion.div
									className="absolute inset-0 rounded-full bg-success/20 blur-2xl"
									animate={{
										scale: [1, 1.2, 1],
										opacity: [0.5, 0.8, 0.5],
									}}
									transition={{
										duration: 2,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									}}
								/>
							</motion.div>

							{/* Success Message */}
							<motion.h3
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="mb-2 text-center font-bold text-2xl"
							>
								Form Submitted!
							</motion.h3>
							<motion.p
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className="mb-6 text-center text-default-600"
							>
								Your information has been successfully submitted.
							</motion.p>

							{/* Form Data Summary */}
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
								className="mb-6 w-full rounded-xl border border-default-200 bg-default-50 p-4"
							>
								<div className="space-y-2 text-sm">
									{formData.name && (
										<div className="flex justify-between">
											<span className="text-default-600">Name:</span>
											<span className="font-medium">{formData.name}</span>
										</div>
									)}
									{formData.email && (
										<div className="flex justify-between">
											<span className="text-default-600">Email:</span>
											<span className="font-medium">{formData.email}</span>
										</div>
									)}
									{formData.company && (
										<div className="flex justify-between">
											<span className="text-default-600">Company:</span>
											<span className="font-medium">{formData.company}</span>
										</div>
									)}
									{formData.role && (
										<div className="flex justify-between">
											<span className="text-default-600">Role:</span>
											<span className="font-medium">{formData.role}</span>
										</div>
									)}
								</div>
							</motion.div>

							{/* Action Buttons */}
							<div className="flex w-full gap-3">
								<motion.button
									type="button"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 }}
									onClick={() => {
										setIsCompleted(false);
										setResetKey((prev) => prev + 1);
										setFormData({
											name: "John Doe",
											email: "john.doe@example.com",
											company: "Acme Corporation",
											role: "Senior Product Designer",
											preferences: ["design", "development"],
											notifications: true,
										});
									}}
									className="flex-1 rounded-xl border-2 border-default-300 bg-background px-4 py-3 font-semibold text-sm transition-all hover:border-default-400 hover:bg-default-100"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									Start Over
								</motion.button>
								<motion.button
									type="button"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6 }}
									onClick={() => setIsCompleted(false)}
									className="flex-1 rounded-xl bg-linear-to-r from-primary to-primary/90 px-4 py-3 font-semibold text-sm text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/30 hover:shadow-xl"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									Close
								</motion.button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</div>
	);
}
