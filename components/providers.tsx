// app/providers.tsx
'use client'; // 客户端组件标记（因 ClerkProvider 依赖客户端 API）

import { ClerkProvider } from '@clerk/nextjs';

export function ClerkProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>{children}</ClerkProvider>;
}