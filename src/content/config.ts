import { defineCollection, z } from "astro:content";

// Common schema for frontmatter
const commonSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	publishDate: z.coerce.date(),
	draft: z.boolean().optional(),
});

// Schema for blog posts
const postSchema = commonSchema.extend({
	tags: z.array(z.string()).optional().default([]),
	seriesId: z.string().optional(),
	orderInSeries: z.number().optional(),
	// Add other post-specific fields if needed
});

// Schema for documentation pages
const docsSchema = commonSchema.extend({
	// Add docs-specific fields if needed
	// For now, it inherits the common fields
	// Omitting 'draft' initially unless you confirm it's used for docs
}).omit({ draft: true }); // Explicitly remove draft if not used in docs yet

// Schema for notes (adjust if needed)
const noteSchema = commonSchema.extend({
	// Add note-specific fields if needed
});

// Schema for series (adjust if needed)
const seriesSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
});

export const collections = {
	post: defineCollection({ schema: postSchema }),
	docs: defineCollection({ schema: docsSchema }),
	note: defineCollection({ schema: noteSchema }),
	series: defineCollection({ schema: seriesSchema }),
}; 