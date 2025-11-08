import getReadingTime from "reading-time";

/**
 * Calculate reading time from text content
 * @param content - The text content to analyze
 * @returns Formatted reading time string
 */
export function calculateReadingTime(content: string): string {
  if (!content || content.trim().length === 0) {
    return "Less than one minute read";
  }

  try {
    const result = getReadingTime(content);
    return result.text;
  } catch (error) {
    console.warn("Failed to calculate reading time:", error);
    return "Less than one minute read";
  }
}

/**
 * Extract plain text from HTML/markdown content
 * @param content - Raw content string
 * @returns Plain text without markup
 */
export function extractPlainText(content: string): string {
  if (!content) return "";

  return (
    content
      // Remove HTML tags
      .replace(/<[^>]*>/g, "")
      // Remove markdown links [text](url)
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      // Remove markdown images ![alt](url)
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "")
      // Remove markdown headers
      .replace(/^#+\s/gm, "")
      // Remove markdown bold/italic
      .replace(/(\*\*|__)(.*?)\1/g, "$2")
      .replace(/(\*|_)(.*?)\1/g, "$2")
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      // Remove inline code
      .replace(/`([^`]*)`/g, "$1")
      // Remove markdown blockquotes
      .replace(/^>\s?/gm, "")
      // Clean up extra whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * Get reading time from Astro content entry
 * @param content - Astro CollectionEntry
 * @returns Formatted reading time string
 */
export function getReadingTimeFromContent(content: any): string {
  // First try to get it from the remark plugin
  const remarkReadingTime =
    content.rendered?.metadata?.frontmatter?.readingTime;
  if (remarkReadingTime) {
    return remarkReadingTime;
  }

  // Fallback: calculate from body content
  if (content.body) {
    const plainText = extractPlainText(content.body);
    return calculateReadingTime(plainText);
  }

  // If we have rendered content, try that
  if (content.rendered?.html) {
    const plainText = extractPlainText(content.rendered.html);
    return calculateReadingTime(plainText);
  }

  return "Less than one minute read";
}
