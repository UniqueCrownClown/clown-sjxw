import { NextResponse } from "next/server";
import { db } from "@/db/db"; // 确保导入你的 Prisma 客户端

// GET /api/todos
export async function GET() {
  try {
    const todos = await db.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("Todos fetched successfully:", todos);

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch todos",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

// POST /api/todos
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received data:", data);

    if (!data.text || typeof data.text !== "string") {
      return NextResponse.json(
        { error: "Text is required and must be a string" },
        { status: 400 }
      );
    }

    console.log("Creating new todo...");
    const newTodo = await db.todo.create({
      data: {
        text: data.text,
        completed: false,
      },
    });
    console.log("New todo created:", newTodo);

    return NextResponse.json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      {
        error: "Failed to create todo",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT /api/todos
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    console.log("Received data:", data);

    if (!data.id || typeof data.id !== "number") {
      return NextResponse.json(
        { error: "ID is required and must be a number" },
        { status: 400 }
      );
    }

    if (typeof data.completed !== "boolean") {
      return NextResponse.json(
        { error: "Completed status is required and must be a boolean" },
        { status: 400 }
      );
    }

    console.log("Updating todo...");
    const updatedTodo = await db.todo.update({
      where: { id: data.id },
      data: { completed: data.completed },
    });
    console.log("Todo updated:", updatedTodo);

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      {
        error: "Failed to update todo",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/todos
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    console.log("Received data:", data);

    if (!data.id || typeof data.id !== "number") {
      return NextResponse.json(
        { error: "ID is required and must be a number" },
        { status: 400 }
      );
    }

    console.log("Deleting todo...");
    await db.todo.delete({
      where: { id: data.id },
    });
    console.log("Todo deleted successfully");

    console.log("Fetching remaining todos...");
    const todos = await db.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("Remaining todos:", todos);

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      {
        error: "Failed to delete todo",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
