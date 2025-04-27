import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "LMMs-Lab",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "en-GB",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	// Used as the default description meta property and webmanifest description
	description: "Feeling and Building Multimodal Intelligence",
	// HTML lang property, found in src/layouts/Base.astro L:18 & astro.config.ts L:48
	lang: "en-GB",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "en_GB",
	// Used to construct the meta title property found in src/components/BaseHead.astro L:11, and webmanifest name found in astro.config.ts L:42
	title: "LMMs-Lab",
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	// {
	// 	path: "/",
	// 	title: "Home",
	// },
	{
		path: "/posts/",
		title: "Blogs",
	},
	{
		path: "/notes/",
		title: "Notes",
	},
	{
		path: "/posts/lmms-lab-docs/intro/",
		title: "Docs",
	},
	{
		path: "/about/",
		title: "About",
	},
];