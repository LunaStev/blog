import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="fw-bold mb-4 blog-header-title">All Posts</h1>
      <p className="text-muted mb-4">
        블로그에 작성된 모든 게시글 목록입니다.
      </p>

      <div>
        {posts.map(({ slug, meta }) => (
          <Link key={slug} href={`/posts/${slug}`}>
            <div className="post-item">
              <h3 className="mb-1">{meta.title}</h3>
              <small className="text-muted">{meta.date}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
