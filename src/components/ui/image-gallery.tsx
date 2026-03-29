import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRef, useState } from "react";
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
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(
		null,
	);
	const originRef = useRef<DOMRect | null>(null);
	const clipRef = useRef<string>("inset(0% round 12px)");

	const handleSelect = (
		image: GalleryImage,
		e: React.MouseEvent<HTMLDivElement>,
	) => {
		const rect = e.currentTarget.getBoundingClientRect();
		originRef.current = rect;

		// Scale factor for the morph
		const scale = rect.width / Math.min(window.innerWidth * 0.85, 900);
		// Compensate border radius so it visually matches grid's rounded-xl (12px) after scaling
		const radius = Math.round(12 / scale);

		// Calculate clipPath to crop expanded image to square (matching grid thumbnail)
		const imgEl = e.currentTarget.querySelector("img");
		if (imgEl && imgEl.naturalWidth && imgEl.naturalHeight) {
			const aspect = imgEl.naturalWidth / imgEl.naturalHeight;
			if (aspect > 1) {
				const clipX = (((aspect - 1) / aspect) * 50).toFixed(1);
				clipRef.current = `inset(0% ${clipX}% 0% ${clipX}% round ${radius}px)`;
			} else if (aspect < 1) {
				const clipY = (((1 - aspect) / 1) * 50).toFixed(1);
				clipRef.current = `inset(${clipY}% 0% ${clipY}% 0% round ${radius}px)`;
			} else {
				clipRef.current = `inset(0% round ${radius}px)`;
			}
		}

		setSelectedImage(image);
	};

	const getMorphTransform = () => {
		const rect = originRef.current;
		if (!rect) return { scale: 0.85, opacity: 0 };
		const vpCenterX = window.innerWidth / 2;
		const vpCenterY = window.innerHeight / 2;
		const imgCenterX = rect.left + rect.width / 2;
		const imgCenterY = rect.top + rect.height / 2;
		return {
			x: imgCenterX - vpCenterX,
			y: imgCenterY - vpCenterY,
			scale: rect.width / Math.min(window.innerWidth * 0.85, 900),
		};
	};

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
						onClick={(e) => handleSelect(image, e)}
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
						<img
							src={image.src}
							alt={image.alt}
							className="h-full w-full object-cover"
							loading="lazy"
						/>

						{/* Overlay on hover */}
						<div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							{image.title && (
								<p className="font-semibold text-sm text-white">
									{image.title}
								</p>
							)}
						</div>
					</motion.div>
				))}
			</div>

			{/* Expanded View - Portal with manual position morph */}
			{createPortal(
				<AnimatePresence>
					{selectedImage && (
						<>
							{/* Backdrop */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.25 }}
								className="fixed inset-0 bg-black/95 backdrop-blur-lg"
								style={{ zIndex: 99999 }}
								onClick={() => setSelectedImage(null)}
							/>

							{/* Expanded Image — morphs from grid position via measured transform */}
							<div
								className="pointer-events-none fixed inset-0 flex items-center justify-center p-8 md:p-12"
								style={{ zIndex: 99999 }}
							>
								<motion.div
									className="pointer-events-auto relative overflow-hidden"
									initial={{
										...getMorphTransform(),
										clipPath: clipRef.current,
									}}
									animate={{
										x: 0,
										y: 0,
										scale: 1,
										opacity: 1,
										clipPath: "inset(0% round 16px)",
									}}
									exit={{
										...getMorphTransform(),
										clipPath: clipRef.current,
										opacity: 0,
									}}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 30,
										// Brief crossfade at tail end to bridge spring settling → grid thumbnail
										opacity: { delay: 0.22, duration: 0.1 },
									}}
									onClick={(e) => e.stopPropagation()}
								>
									<img
										src={selectedImage.src}
										alt={selectedImage.alt}
										className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
									/>
								</motion.div>

								{/* Close Button */}
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

								{/* Image Info */}
								{(selectedImage.title ||
									selectedImage.description) && (
									<motion.div
										className="pointer-events-auto fixed inset-x-0 bottom-0 bg-linear-to-t from-black via-black/95 to-transparent px-6 pt-24 pb-10 sm:px-10 sm:pb-12 md:px-16 md:pt-32 md:pb-16"
										style={{ zIndex: 100000 }}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 20 }}
										transition={{
											duration: 0.3,
											delay: 0.3,
										}}
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
