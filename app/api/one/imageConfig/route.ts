import { db } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const imageConfig = await db.imageConfig.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 7,
    });
    return NextResponse.json(imageConfig);
  } catch (error) {
    console.error("Error fetching image config:", error);
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
