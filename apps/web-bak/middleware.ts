import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export default authMiddleware({
  afterAuth: async (auth, req) => {
    // If the user is signed in and the request is for the API
    if (auth.userId && req.nextUrl.pathname.startsWith("/api")) {
      try {
        // Check if user exists in database
        const user = await prisma.user.findUnique({
          where: { clerkId: auth.userId },
        })

        // If user doesn't exist, create them
        if (!user) {
          await prisma.user.create({
            data: {
              clerkId: auth.userId,
              email: auth.sessionClaims?.email as string,
              name: auth.sessionClaims?.name as string,
            },
          })
        }
      } catch (error) {
        console.error("[USER_CREATION_ERROR]", error)
      }
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
} 