// src/app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: post.meta.title,
    openGraph: {
      title: post.meta.title,
      images: [`/api/og/${post.slug}`],
    },
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(remarkGfm)
    .use(rehypeStringify)
    .process(post.content);

  const contentHtml = String(file);

  return (
    <div>
      <h1 className="fw-bold mb-2">{post.meta.title}</h1>
      <p className="text-muted mb-4">{post.meta.date}</p>

      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
