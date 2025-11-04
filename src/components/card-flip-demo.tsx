import { motion } from "framer-motion";
import {
	ArrowRight,
	Award,
	Briefcase,
	Calendar,
	Mail,
	MapPin,
	Phone,
	Star,
} from "lucide-react";
import { useState } from "react";

export function CardFlipDemo() {
	const [isFlipped, setIsFlipped] = useState(false);

	return (
		<div className="flex min-h-[600px] items-center justify-center p-8">
			<div className="perspective-1000 h-[480px] w-[340px]">
				<motion.div
					className="relative h-full w-full cursor-pointer"
					style={{ transformStyle: "preserve-3d" }}
					animate={{ rotateY: isFlipped ? 180 : 0 }}
					whileHover={{ scale: 1.02 }}
					transition={{
						type: "spring",
						stiffness: 260,
						damping: 20,
					}}
					onClick={() => setIsFlipped(!isFlipped)}
				>
					{/* Front Face */}
					<motion.div
						className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-default-200 bg-linear-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 p-6 shadow-xl backdrop-blur-sm"
						style={{
							backfaceVisibility: "hidden",
							WebkitBackfaceVisibility: "hidden",
						}}
					>
						{/* Flip Icon Indicator */}
						<motion.div
							className="absolute right-4 bottom-4"
							animate={{ x: [0, 4, 0] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<ArrowRight className="h-5 w-5 text-default-400" />
						</motion.div>

						{/* Avatar */}
						<motion.div
							className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 font-bold text-3xl text-white shadow-lg"
							whileHover={{ scale: 1.1, rotate: 5 }}
							transition={{ type: "spring", stiffness: 400, damping: 15 }}
						>
							JD
						</motion.div>

						{/* Name */}
						<h2 className="mb-1 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-2xl text-transparent">
							Jane Doe
						</h2>

						{/* Title */}
						<p className="mb-5 text-default-600 text-sm">
							Senior Product Designer
						</p>

						{/* Quick Info */}
						<div className="w-full space-y-2.5">
							<div className="flex items-center gap-3 text-default-700 text-sm">
								<Mail className="h-4 w-4 flex-shrink-0 text-purple-500" />
								<span className="truncate">jane.doe@example.com</span>
							</div>
							<div className="flex items-center gap-3 text-default-700 text-sm">
								<MapPin className="h-4 w-4 flex-shrink-0 text-pink-500" />
								<span>San Francisco, CA</span>
							</div>
							<div className="flex items-center gap-3 text-default-700 text-sm">
								<Phone className="h-4 w-4 flex-shrink-0 text-rose-500" />
								<span>+1 (555) 123-4567</span>
							</div>
						</div>
					</motion.div>

					{/* Back Face */}
					<motion.div
						className="absolute inset-0 flex flex-col rounded-2xl border border-default-200 bg-linear-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 p-6 shadow-xl backdrop-blur-sm"
						style={{
							backfaceVisibility: "hidden",
							WebkitBackfaceVisibility: "hidden",
							rotateY: 180,
						}}
					>
						{/* Flip Icon Indicator */}
						<motion.div
							className="absolute right-4 bottom-4 rotate-180"
							animate={{ x: [0, 4, 0] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<ArrowRight className="h-5 w-5 text-default-400" />
						</motion.div>

						{/* Header */}
						<div className="mb-5 text-center">
							<h3 className="mb-1 bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text font-bold text-transparent text-xl">
								Professional Details
							</h3>
							<p className="text-default-500 text-xs">More about Jane</p>
						</div>

						{/* Details */}
						<div className="flex-1 space-y-3 overflow-y-auto">
							<div className="rounded-lg bg-background/50 p-3">
								<div className="mb-1 flex items-center gap-2 font-semibold text-default-900 text-sm">
									<Briefcase className="h-4 w-4 flex-shrink-0 text-blue-500" />
									<span>Experience</span>
								</div>
								<p className="text-default-600 text-xs">
									8+ years in UX/UI Design
								</p>
							</div>

							<div className="rounded-lg bg-background/50 p-3">
								<div className="mb-1 flex items-center gap-2 font-semibold text-default-900 text-sm">
									<Award className="h-4 w-4 flex-shrink-0 text-cyan-500" />
									<span>Achievements</span>
								</div>
								<p className="text-default-600 text-xs">
									Led design for 50+ products
								</p>
							</div>

							<div className="rounded-lg bg-background/50 p-3">
								<div className="mb-1 flex items-center gap-2 font-semibold text-default-900 text-sm">
									<Calendar className="h-4 w-4 flex-shrink-0 text-teal-500" />
									<span>Availability</span>
								</div>
								<p className="text-default-600 text-xs">
									Available for projects
								</p>
							</div>

							<div className="rounded-lg bg-background/50 p-3">
								<div className="mb-1 flex items-center gap-2 font-semibold text-default-900 text-sm">
									<Star className="h-4 w-4 flex-shrink-0 text-yellow-500" />
									<span>Rating</span>
								</div>
								<div className="flex gap-1">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className="h-3 w-3 fill-yellow-500 text-yellow-500"
										/>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
