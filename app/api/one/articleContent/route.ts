import { db } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleId: string = searchParams.get("articleId") || "";
  try {
    const article = await db.articleContent.findUnique({
      where: {
        id: articleId,
      },
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
