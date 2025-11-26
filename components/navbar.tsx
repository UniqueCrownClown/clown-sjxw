// app/components/navbar.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";  // Added import
import { UserButton, useUser } from "@clerk/nextjs";
import { createOrUpdateUser } from "@/lib/user-actions";
// import { Button } from "./ui/button";

export default function Navbar() {
  // 获取用户信息和加载状态
  const { user, isLoaded, isSignedIn } = useUser();
  
  // 使用useEffect来处理副作用，避免在渲染期间执行异步操作
  // 注意：useEffect必须放在条件渲染之前，遵循React Hooks规则
  useEffect(() => {
    // 只有在用户已加载且已登录时才执行
    if (isLoaded && isSignedIn) {
      createOrUpdateUser().catch((err) =>
        console.error("Failed to create/update user:", err)
      );
    }
  }, [isLoaded, isSignedIn, user?.id]); // 添加isLoaded和isSignedIn作为依赖项
  
  // 加载中显示loading
  if (!isLoaded) return <div>Loading...</div>;

  // 未登录（理论上中间件已拦截，此处为兜底）
  if (!isSignedIn) {
    return (
      <div>
        <Link href="/login" className="text-gray-600">
          Login
        </Link>
        {/* <Button onClick={() => (window.location.href = "/login")}>登录</Button> */}
      </div>
    );
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <div className="flex items-center gap-4">
        {/* Clerk 内置用户菜单（自动适配登录状态） */}
        <UserButton />
      </div>
    </nav>
  );
}