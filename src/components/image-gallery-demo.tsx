import { type GalleryImage, ImageGallery } from "./ui/image-gallery";

export function ImageGalleryDemo() {
	const images: GalleryImage[] = [
		{
			id: "1",
			src: "https://plus.unsplash.com/premium_photo-1679355750936-77b24a624ed2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
			alt: "Cosmic Waves",
			title: "Cosmic Waves",
			description: "Nebulae and cosmic waves",
		},
		{
			id: "2",
			src: "https://images.unsplash.com/photo-1530053969600-caed2596d242?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374",
			alt: "Ocean Depths",
			title: "Ocean Depths",
			description: "Underwater shot of ocean depths",
		},
		{
			id: "3",
			src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&h=800&fit=crop",
			alt: "Sunset Glow",
			title: "Sunset Glow",
			description: "Sunset in the canyons",
		},
		{
			id: "4",
			src: "https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
			alt: "Forest Mist",
			title: "Forest Mist",
			description: "Morning mist in the forest",
		},
		{
			id: "5",
			src: "https://images.unsplash.com/photo-1508234562163-534667a7e3ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
			alt: "Aurora Dreams",
			title: "Aurora Dreams",
			description: "Northern light in the landscape",
		},
		{
			id: "6",
			src: "https://images.unsplash.com/photo-1600718303828-4c6a182c2805?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
			alt: "Desert Heat",
			title: "Desert Heat",
			description: "Shot of sand overlooking the mountains",
		},
		{
			id: "7",
			src: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
			alt: "Lavender Fields",
			title: "Lavender Fields",
			description: "Lavender fields in the French countryside",
		},
		{
			id: "8",
			src: "https://images.unsplash.com/photo-1708649290066-5f617003b93f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
			alt: "Coral Reef",
			title: "Coral Reef",
			description: "Underwater shot of a coral reef",
		},
		{
			id: "9",
			src: "https://images.unsplash.com/photo-1518889735218-3e3a03fd3128?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
			alt: "Midnight Sky",
			title: "Midnight Sky",
			description: "Mightnight shot of the sky from the forest",
		},
	];

	return (
		<div className="flex min-h-[600px] items-center justify-center p-8">
			<div className="w-full max-w-5xl">
				<ImageGallery images={images} columns={3} />
			</div>
		</div>
	);
}
