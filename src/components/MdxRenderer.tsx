import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

interface MdxRendererProps {
  source: string;
}

export async function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
              [
                rehypePrettyCode,
                {
                  theme: "github-dark-dimmed",
                  keepBackground: true,
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
