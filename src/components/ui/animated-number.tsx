import { motion } from "framer-motion";
import { useMemo } from "react";

interface AnimatedNumberProps {
	value: number;
	decimals?: number;
	prefix?: string;
	suffix?: string;
	className?: string;
	minIntegerDigits?: number;
}

function AnimatedDigit({ digit }: { digit: string }) {
	const isNumber = !Number.isNaN(Number.parseInt(digit, 10));

	if (!isNumber) {
		return <span className="inline-block">{digit}</span>;
	}

	const numericValue = Number.parseInt(digit, 10);

	return (
		<span
			className="relative inline-flex overflow-hidden"
			style={{
				width: "0.62em",
				height: "1em",
			}}
		>
			<motion.span
				className="flex flex-col items-center"
				animate={{
					y: `${-numericValue * 100}%`,
				}}
				transition={{
					type: "spring",
					stiffness: 200,
					damping: 30,
					mass: 0.8,
				}}
				style={{
					width: "0.62em",
				}}
			>
				{/* Render all digits 0-9 in a vertical column */}
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
					<span
						key={num}
						className="inline-flex items-center justify-center"
						style={{
							width: "0.62em",
							height: "1em",
						}}
					>
						{num}
					</span>
				))}
			</motion.span>
		</span>
	);
}

export function AnimatedNumber({
	value,
	decimals = 0,
	prefix = "",
	suffix = "",
	className = "",
	minIntegerDigits = 1,
}: AnimatedNumberProps) {
	// Memoize the display string to prevent unnecessary re-renders
	const displayParts = useMemo(() => {
		// Split the number into integer and decimal parts BEFORE formatting
		const absValue = Math.abs(value);
		const integerPart = Math.floor(absValue);

		// Calculate how many integer digits we need
		const requiredDigits = Math.max(
			minIntegerDigits,
			integerPart === 0 ? 1 : Math.floor(Math.log10(integerPart)) + 1,
		);

		// Format the integer part with padding
		const paddedIntPart = integerPart.toString().padStart(requiredDigits, "0");

		// Format the decimal part if needed
		let numberPart = paddedIntPart;
		if (decimals > 0) {
			const decimalPart = (absValue - integerPart)
				.toFixed(decimals)
				.substring(2); // Remove "0."
			numberPart = `${paddedIntPart}.${decimalPart}`;
		}

		// Build the full display string
		const fullString = `${prefix}${numberPart}${suffix}`;

		// Create stable keys based on the role of each character
		// prefix chars, integer digits (right-aligned), decimal point, decimal digits, suffix chars
		const prefixLen = prefix.length;
		const integerLen = requiredDigits;
		const hasDecimal = decimals > 0;
		const decimalLen = decimals;

		const parts = fullString.split("").map((char, index) => {
			let key: string;

			if (index < prefixLen) {
				// Prefix character
				key = `prefix-${index}`;
			} else if (index < prefixLen + integerLen) {
				// Integer digit (count from right to left for stability)
				const digitPosition = integerLen - (index - prefixLen) - 1;
				key = `int-${digitPosition}`;
			} else if (hasDecimal && index === prefixLen + integerLen) {
				// Decimal point
				key = "decimal-point";
			} else if (
				hasDecimal &&
				index < prefixLen + integerLen + 1 + decimalLen
			) {
				// Decimal digit
				const decimalPosition = index - (prefixLen + integerLen + 1);
				key = `dec-${decimalPosition}`;
			} else {
				// Suffix character
				const suffixPosition =
					index - (prefixLen + integerLen + (hasDecimal ? 1 + decimalLen : 0));
				key = `suffix-${suffixPosition}`;
			}

			return { char, key };
		});

		return parts;
	}, [value, decimals, prefix, suffix, minIntegerDigits]);

	return (
		<span className={`inline-flex items-center ${className}`}>
			{displayParts.map(({ char, key }) => (
				<AnimatedDigit key={key} digit={char} />
			))}
		</span>
	);
}
