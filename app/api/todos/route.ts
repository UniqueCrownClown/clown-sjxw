import { NextResponse } from 'next/server';
import { type Todo } from '@/app/types/todo';

// 模拟数据库
let todos: Todo[] = [
  { id: 1, text: '学习 Next.js', completed: false },
  { id: 2, text: '掌握 TypeScript', completed: true },
  { id: 3, text: '了解 shadcn/ui', completed: false },
];

// GET /api/todos
export async function GET() {
  return NextResponse.json(todos);
}

// POST /api/todos
export async function POST(request: Request) {
  const data = await request.json();
  
  const newTodo: Todo = {
    id: +Date.now(),
    text: data.text,
    completed: false
  };
  
  todos.push(newTodo);
  return NextResponse.json(newTodo);
}

// PUT /api/todos
export async function PUT(request: Request) {
  const data = await request.json();
  
  todos = todos.map(todo =>
    todo.id === data.id ? { ...todo, completed: data.completed } : todo
  );
  
  return NextResponse.json(todos);
}

// DELETE /api/todos
export async function DELETE(request: Request) {
  const data = await request.json();
  
  todos = todos.filter(todo => todo.id !== data.id);
  return NextResponse.json(todos);
}