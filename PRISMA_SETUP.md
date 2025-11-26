# Prisma 设置指南

本项目使用 Prisma 作为 ORM，PostgreSQL 作为数据库。

## 设置步骤

### 1. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 2. 配置数据库连接

在 `.env` 文件中设置数据库连接字符串：

```
DATABASE_URL="postgresql://username:password@localhost:5432/todos_db?schema=public"
```

请将 `username`、`password` 和 `todos_db` 替换为您的实际数据库信息。

### 3. 生成 Prisma Client

```bash
npm run db:generate
# 或
pnpm db:generate
```

### 4. 推送数据库模式

```bash
npm run db:push
# 或
pnpm db:push
```

### 5. 运行种子脚本（可选）

```bash
npm run db:seed
# 或
pnpm db:seed
```

## 可用脚本

- `npm run db:generate` - 生成 Prisma Client
- `npm run db:push` - 推送数据库模式到数据库
- `npm run db:migrate` - 运行数据库迁移
- `npm run db:studio` - 打开 Prisma Studio（数据库可视化工具）
- `npm run db:seed` - 运行种子脚本，初始化示例数据

## 注意事项

- 确保您的 PostgreSQL 数据库正在运行
- 确保数据库用户有足够的权限创建表和修改数据
- 在生产环境中，请使用环境变量来存储敏感信息，如数据库连接字符串