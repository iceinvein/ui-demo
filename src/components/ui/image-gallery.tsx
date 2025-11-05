import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

export interface GalleryImage {
	id: string;
	src: string;
	alt: string;
	title?: string;
	description?: string;
}

interface ImageGalleryProps {
	images: GalleryImage[];
	columns?: number;
	className?: string;
}

export function ImageGallery({
	images,
	columns = 3,
	className = "",
}: ImageGalleryProps) {
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

	return (
		<div>
			{/* Gallery Grid */}
			<div
				className={`grid gap-4 ${className}`}
				style={{
					gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
				}}
			>
				{images.map((image, index) => (
					<motion.div
						key={image.id}
						layoutId={`image-${image.id}`}
						onClick={() => setSelectedImage(image)}
						className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.4,
							delay: index * 0.05,
							ease: "easeOut",
						}}
						whileHover={{
							scale: 1.05,
							transition: { duration: 0.2 },
						}}
						whileTap={{ scale: 0.95 }}
					>
						<motion.img
							src={image.src}
							alt={image.alt}
							className="h-full w-full object-cover"
							loading="lazy"
						/>

						{/* Overlay on hover */}
						<motion.div
							className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							initial={false}
						>
							{image.title && (
								<p className="font-semibold text-sm text-white">
									{image.title}
								</p>
							)}
						</motion.div>
					</motion.div>
				))}
			</div>

			{/* Expanded View - Rendered via Portal to escape stacking context */}
			{createPortal(
				<AnimatePresence>
					{selectedImage && (
						<>
							{/* Backdrop */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="fixed inset-0 bg-black/95 backdrop-blur-lg"
								style={{ zIndex: 99999 }}
								onClick={() => setSelectedImage(null)}
							/>

							{/* Expanded Image Container */}
							<div
								className="pointer-events-none fixed inset-0 flex items-center justify-center p-8 md:p-12"
								style={{ zIndex: 99999 }}
							>
								{/* Image */}
								<motion.div
									layoutId={`image-${selectedImage.id}`}
									className="pointer-events-auto relative"
									onClick={(e) => e.stopPropagation()}
								>
									<img
										src={selectedImage.src}
										alt={selectedImage.alt}
										className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
									/>
								</motion.div>

								{/* Close Button - Fixed to viewport */}
								<motion.button
									type="button"
									onClick={() => setSelectedImage(null)}
									className="pointer-events-auto fixed top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition-colors hover:bg-black/90"
									style={{ zIndex: 100000 }}
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0 }}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 25,
										delay: 0.2,
									}}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<X className="h-6 w-6" />
								</motion.button>

								{/* Image Info - Fixed to bottom */}
								{(selectedImage.title || selectedImage.description) && (
									<motion.div
										className="pointer-events-auto fixed inset-x-0 bottom-0 bg-linear-to-t from-black via-black/95 to-transparent px-6 pt-24 pb-10 sm:px-10 sm:pb-12 md:px-16 md:pt-32 md:pb-16"
										style={{ zIndex: 100000 }}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: 0.3 }}
									>
										<div className="mx-auto max-w-3xl">
											{selectedImage.title && (
												<h3 className="mb-3 font-bold text-white text-xl leading-tight sm:text-2xl md:mb-4 md:text-3xl">
													{selectedImage.title}
												</h3>
											)}
											{selectedImage.description && (
												<p className="text-sm text-white/90 leading-relaxed sm:text-base md:text-lg">
													{selectedImage.description}
												</p>
											)}
										</div>
									</motion.div>
								)}
							</div>
						</>
					)}
				</AnimatePresence>,
				document.body,
			)}
		</div>
	);
}
