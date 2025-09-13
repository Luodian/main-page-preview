import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export function remarkLazyImages(): Plugin<[], Root> {
  return (tree) => {
    visit(tree, "image", (node, index, parent) => {
      if (!parent || index === undefined) return;

      // Skip external images (starting with http/https) as they might not work well with LazyImage
      if (node.url.startsWith("http://") || node.url.startsWith("https://")) {
        return;
      }

      // Skip all relative paths and local assets - let Astro handle them
      if (
        node.url.startsWith("./") ||
        !node.url.startsWith("/") ||
        node.url.includes("_images/") ||
        node.url.includes("images/")
      ) {
        console.log("Skipping image (let Astro handle):", node.url);
        return;
      }

      // Only process absolute paths that start with / and are not local assets
      console.log("Processing image with skeleton:", node.url);

      // Transform the image node to HTML that uses skeleton loading
      const html = `
<div class="relative" style="display: block; width: 100%; height: 100%;">
  <div class="skeleton-loader absolute top-0 left-0 w-full h-full z-20 rounded-lg" style="width: 100%; height: 200px; background: linear-gradient(90deg, transparent 25%, rgba(0, 0, 0, 0.08) 50%, transparent 75%); background-size: 200% 100%; animation: skeleton-loading 1.5s infinite;"></div>
  <img 
    src="${node.url}" 
    alt="${node.alt || ""}" 
    class="opacity-0 transition-opacity duration-300 relative z-10 w-full h-auto rounded-lg"
    loading="lazy"
    onload="this.style.opacity = '1'; this.previousElementSibling.style.display = 'none';"
  />
</div>`;

      parent.children[index] = {
        type: "html",
        value: html,
      };
    });
  };
}
