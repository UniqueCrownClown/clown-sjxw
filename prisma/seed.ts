import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 清空现有的 todos
  await prisma.todo.deleteMany();

  // 创建示例 todos
  const todos = [
    { text: '学习 Next.js', completed: false },
    { text: '掌握 TypeScript', completed: true },
    { text: '了解 shadcn/ui', completed: false },
  ];

  for (const todo of todos) {
    await prisma.todo.create({
      data: todo,
    });
  }

  console.log('数据库已成功初始化！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });