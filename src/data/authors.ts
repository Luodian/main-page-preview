// Centralized author database
// This file loads author information from authors.yaml in the project root
// When authors are defined in frontmatter without URLs, this database will be used as fallback

import * as yaml from "js-yaml";
import * as fs from "fs";
import * as path from "path";

export interface AuthorData {
  name: string;
  url: string;
  affiliation?: string;
}

// Load authors from YAML file
function loadAuthorsFromYaml(): Record<string, AuthorData> {
  try {
    const yamlPath = path.join(process.cwd(), "authors.yaml");
    const fileContents = fs.readFileSync(yamlPath, "utf8");
    const data = yaml.load(fileContents) as {
      authors: Record<string, AuthorData>;
    };
    return data.authors || {};
  } catch (error) {
    console.error("Error loading authors.yaml:", error);
    return {};
  }
}

export const AUTHORS: Record<string, AuthorData> = loadAuthorsFromYaml();

// Helper function to get author data with URL priority
export function getAuthorWithUrl(authorInput: {
  name: string;
  url?: string | undefined;
  main?: boolean | undefined;
}): {
  name: string;
  url?: string;
  main?: boolean;
} {
  const { name, url, main } = authorInput;

  // If URL is explicitly provided in frontmatter, use it (highest priority)
  if (url) {
    return { name, url, main };
  }

  // Otherwise, try to find in centralized database
  const centralAuthor = AUTHORS[name];
  if (centralAuthor) {
    return { name, url: centralAuthor.url, main };
  }

  // Fallback: return name without URL
  return { name, main };
}

// Helper function to get all author data for a list
export function processAuthorsList(
  authors: Array<{
    name: string;
    url?: string | undefined;
    main?: boolean | undefined;
  }>
): Array<{ name: string; url?: string; main?: boolean }> {
  return authors.map(getAuthorWithUrl);
}
