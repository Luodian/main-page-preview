import { type CollectionEntry, getCollection } from "astro:content";

/** Get all entries from the docs collection */
export async function getAllDocs(): Promise<CollectionEntry<"docs">[]> {
	// No draft filtering needed as 'draft' is not in the docs schema yet
	return await getCollection("docs"); 
}

// Add other helper functions if needed, similar to post.ts (e.g., grouping, tags) 