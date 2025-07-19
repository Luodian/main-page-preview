import type { Content, Root } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";
import { toString as mdastToString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

export function remarkCollapsible() {
	return (tree: Root) => {
		visit(tree, "containerDirective", (node: ContainerDirective, index, parent) => {
			if (node.name !== "collapsible" || !parent) return;

			const summary = node.attributes?.summary || "";
			const inner = node.children.map((child: Content) => mdastToString(child)).join("\n");

			const html = `
<details class="group mb-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
  <summary class="cursor-pointer list-none rounded-t px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 [&::-webkit-details-marker]:hidden">
    <span class="marker mr-2 inline-block transform transition-transform duration-200 group-open:rotate-90">▶</span>
    ${summary}
  </summary>
  <div class="border-t border-gray-300 p-4 dark:border-gray-700">
    ${inner}
  </div>
</details>`;

			parent.children.splice(index as number, 1, {
				type: "html",
				value: html,
			});
		});
	};
}
