import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <p className="text-muted mb-5 blog-header-desc" style={{ fontSize: "1.15rem" }}>
        컴파일러, 운영체제, 프로그래밍 언어, 시스템 설계에 관심이 많은 개발자의 기술 블로그입니다.
      </p>

      <h2 className="fw-bold mb-3">Latest Posts</h2>

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
