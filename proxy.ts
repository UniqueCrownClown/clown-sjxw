import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 定义需要保护的路由（示例：/dashboard/* 和 /profile）
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile',
]);

// 定义不需要保护的路由（如登录页）
const isPublicRoute = createRouteMatcher([
  '/login(.*)',
]);

export default clerkMiddleware((auth, request) => {
  // 跳过公共路由的保护
  if (isPublicRoute(request)) {
    return;
  }
  // 若访问受保护路由且未登录，自动重定向到登录页
  if (isProtectedRoute(request)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}