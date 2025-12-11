import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).map((file) =>
    file.replace(/\.md$/, "")
  );
}

export function getPostBySlug(slug: string) {
  if (!slug) throw new Error("slug is undefined");

  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

  return posts;
}
