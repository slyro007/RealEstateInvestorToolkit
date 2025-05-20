import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

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