import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "tailwind-variants";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
