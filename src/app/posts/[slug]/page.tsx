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
  const siteUrl = "https://blog.lunastev.org";

  return {
    title: post.meta.title,
    description: post.meta.description,

    alternates: {
      canonical: `${siteUrl}/posts/${post.slug}`,
    },

    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      url: `${siteUrl}/posts/${post.slug}`,
      images: [`${siteUrl}/api/og/${post.slug}`],
    },

    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: [`${siteUrl}/api/og/${post.slug}`],
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
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(post.content);

  const contentHtml = String(file);

  return (    
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Posts",
                item: "https://blog.lunastev.org/posts",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: post.meta.title,
                item: `https://blog.lunastev.org/posts/${post.slug}`,
              },
            ],
          }),
        }}
      />
      <h1 className="fw-bold mb-2">{post.meta.title}</h1>
      <p className="text-muted mb-4">{post.meta.date}</p>

      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
