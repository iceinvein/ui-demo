import { Button } from "@heroui/button";
import { useState } from "react";
import { SplitText } from "./ui/split-text";

export function SplitTextDemo() {
	const [key, setKey] = useState(0);

	const replay = () => {
		setKey((prev) => prev + 1);
	};

	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center gap-8 p-8">
			<div key={key} className="text-center">
				<SplitText
					text="Beautiful Split Text Animation"
					className="mb-4 bg-gradient-to-r from-primary via-secondary to-success bg-clip-text font-bold text-4xl text-transparent md:text-5xl"
					delay={0.1}
					duration={0.04}
				/>
				<SplitText
					text="Each character animates individually"
					className="text-default-600 text-lg"
					as="p"
					delay={0.5}
					duration={0.03}
				/>
			</div>

			<Button
				color="primary"
				variant="shadow"
				onPress={replay}
				className="mt-4"
			>
				Replay Animation
			</Button>
		</div>
	);
}
