import { Link } from "@heroui/link";
import {
	Navbar as HeroUINavbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@heroui/navbar";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
	return (
		<HeroUINavbar maxWidth="xl" position="sticky">
			<NavbarContent justify="start">
				<NavbarBrand className="max-w-fit gap-3">
					<Link
						className="flex items-center justify-start gap-2"
						color="foreground"
						href="/"
					>
						<img alt="logo" className="h-6 w-6" src="/logo.png" />
						<p className="font-bold text-inherit">{siteConfig.name}</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem>
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>
		</HeroUINavbar>
	);
};
