import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { getPostBySlug } from "@/lib/posts";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = getPostBySlug(params.slug);

  return new ImageResponse(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#f5f0e3",
          padding: "60px",
          justifyContent: "center",
          border: "6px solid #d8ceb6",
          fontFamily: "Noto Serif KR",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                fontSize: 54,
                fontWeight: "bold",
                color: "#3a352e",
                marginBottom: 20,
              },
              children: post.meta.title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: 32,
                color: "#6a6258",
              },
              children: "by LunaStev",
            },
          },
        ],
      },
    },
    { width: 1200, height: 630 }
  );
}
