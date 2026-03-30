import { useEffect, useRef, useState } from "react";

export type TypewriterProps = {
	text: string;
	speed?: number;
	delay?: number;
	cursor?: boolean;
	onComplete?: () => void;
	className?: string;
};

export function Typewriter({
	text,
	speed = 50,
	delay = 0,
	cursor = false,
	onComplete,
	className = "",
}: TypewriterProps) {
	const [displayed, setDisplayed] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const onCompleteRef = useRef(onComplete);

	// Keep ref in sync without re-triggering the effect
	useEffect(() => {
		onCompleteRef.current = onComplete;
	}, [onComplete]);

	useEffect(() => {
		setDisplayed("");
		setIsTyping(false);
		setIsDone(false);

		// Respect the optional start delay
		const delayTimer = setTimeout(() => {
			setIsTyping(true);
		}, delay);

		return () => clearTimeout(delayTimer);
	}, [text, delay, speed]);

	useEffect(() => {
		if (!isTyping) return;

		if (displayed.length >= text.length) {
			setIsTyping(false);
			setIsDone(true);
			onCompleteRef.current?.();
			return;
		}

		const timer = setTimeout(() => {
			setDisplayed(text.slice(0, displayed.length + 1));
		}, speed);

		return () => clearTimeout(timer);
	}, [isTyping, displayed, text, speed]);

	// Show cursor while typing, or always when `cursor` prop is true
	const showCursor = isTyping || (cursor && isDone) || (!isDone && delay > 0);

	return (
		<span className={className}>
			{displayed}
			<span
				className={
					showCursor ? "typewriter-cursor" : "typewriter-cursor--hidden"
				}
				aria-hidden="true"
			/>
		</span>
	);
}
