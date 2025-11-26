import { db } from "@/db/db"
import { auth } from "@clerk/nextjs/server"

// 获取用户或创建用户
async function getOrCreateUser() {
    const { userId } = await auth()
  
    if (!userId) {
      throw new Error('请先登录')
    }
  
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    })
  
    if (!user) {
      // Instead of creating the user automatically, redirect to a page that will handle user creation
      throw new Error('需要完成账户设置')
    }
  
    return user
  }