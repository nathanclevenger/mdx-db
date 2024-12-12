import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxjs } from 'micromark-extension-mdxjs';
import { mdxFromMarkdown } from 'mdast-util-mdx';
export function processMDXString(content) {
    return fromMarkdown(content, {
        extensions: [mdxjs()],
        mdastExtensions: [mdxFromMarkdown()]
    });
}
//# sourceMappingURL=string.js.map