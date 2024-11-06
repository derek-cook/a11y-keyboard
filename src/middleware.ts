import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { rateLimiterMiddleware } from "./server/middleware/rateLimiter";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/api/text-completion",
]);

export default clerkMiddleware(async (auth, req, context) => {
  if (!isPublicRoute(req)) await auth.protect();

  return rateLimiterMiddleware(req, context);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
