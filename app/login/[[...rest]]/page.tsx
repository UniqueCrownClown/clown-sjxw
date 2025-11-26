// app/login/[[...rest]]/page.tsx
'use client';

import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignIn 
        // 使用哈希路由以避免路由配置问题
        routing="hash"
        // 可选配置：自定义登录页标题、logo、认证方式等
        appearance={{
          variables: {
            colorPrimary: '#4f46e5', // 主题色
          },
        }}
        // 登录成功后重定向到仪表盘
        redirectUrl="/"
      />
    </div>
  );
}