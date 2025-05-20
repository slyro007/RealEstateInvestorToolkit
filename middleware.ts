import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/auth(.*)" // Allow auth-related API routes
  ],
  debug: process.env.NODE_ENV === 'development'
});

export const config = {
  // Matcher configuration for Next.js
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Original code:
/*
import { clerkMiddleware } from '@clerk/nextjs/server';

// Define a debug function to log middleware processing
function debugLog(message) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Clerk Middleware] ${message}`);
  }
}

export default clerkMiddleware((auth, req) => {
  debugLog(`Processing request to: ${req.url}`);
});

export const config = {
  // Matcher configuration for Next.js
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
*/ 