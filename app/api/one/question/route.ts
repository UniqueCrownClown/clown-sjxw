import { NextResponse } from "next/server";

const questionItems = [
  {
    id: 1,
    title: "文章11",
  },
  {
    id: 2,
    title: "文章22",
  },
  {
    id: 3,
    title: "文章33",
  },
];

export async function GET() {
  return NextResponse.json({ data: questionItems }, { status: 200 });
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
