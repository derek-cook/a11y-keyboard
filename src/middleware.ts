import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { rateLimiterMiddleware } from "./server/middleware/rateLimiter";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/api/text-completion",
  "/api/text-to-speech",
  "/keyboards/default",
]);

export default clerkMiddleware(async (auth, req, context) => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'middleware.ts:12',message:'Clerk middleware entry',data:{method:req.method,url:req.url,pathname:req.nextUrl.pathname,isPublic:isPublicRoute(req)},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'C,D'})}).catch(()=>{/* ignore */});
  // #endregion
  if (!isPublicRoute(req)) await auth.protect();

  const result = await rateLimiterMiddleware(req, context);
  // #region agent log
  const resultData: Record<string, unknown> = { method: req.method, url: req.url };
  if (result instanceof Response) {
    resultData.resultType = 'Response';
    resultData.resultStatus = result.status;
    resultData.resultHeaders = Object.fromEntries(result.headers.entries());
  } else if (result) {
    resultData.resultType = typeof result;
  }
  fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'middleware.ts:16',message:'Clerk middleware exit',data:resultData,timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'C,D'})}).catch(()=>{/* ignore */});
  // #endregion
  return result;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
