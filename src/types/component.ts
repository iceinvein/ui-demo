export interface CodeFile {
	filename: string;
	code: string;
	language?: string;
}

export interface ComponentItem {
	id: string;
	title: string;
	description: string;
	category: string;
	component: React.ComponentType;
	code: string | CodeFile[];
	tags?: string[];
}

export interface Category {
	id: string;
	name: string;
	description: string;
	icon?: string;
}
