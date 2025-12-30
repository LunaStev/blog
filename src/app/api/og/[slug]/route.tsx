// src/app/api/og/[slug]/route.tsx
import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const runtime = "edge";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const post = getPostBySlug(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#f5f0e3",
          padding: "60px",
          justifyContent: "center",
          border: "6px solid #d8ceb6",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 54,
            fontWeight: "bold",
            color: "#3a352e",
            marginBottom: 20,
          }}
        >
          {post.meta.title}
        </div>

        <div style={{ fontSize: 32, color: "#6a6258" }}>
          by LunaStev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
