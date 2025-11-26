import { db } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type: string = searchParams.get("type") || "1";
  try {
    const article = await db.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        type,
      },
      take: 7,
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

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Received data:", data);
  const result = {};
  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const data = await request.json();
  console.log("Received data:", data);
  const result = {};
  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const data = await request.json();
  console.log("Received data:", data);
  const result = {};
  return NextResponse.json(result);
}
