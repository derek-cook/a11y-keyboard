import { type NextMiddleware, NextResponse } from "next/server";
import { ipAddress } from "@vercel/functions";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createRouteMatcher } from "@clerk/nextjs/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  ephemeralCache: new Map(),
  prefix: "@upstash/ratelimit",
  analytics: true,
});

const isRateLimitedRoute = createRouteMatcher(["/api(.*)"]);

export const rateLimiterMiddleware: NextMiddleware = async (
  request,
  context,
) => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'rateLimiter.ts:17',message:'Rate limiter entry',data:{method:request.method,url:request.url,pathname:request.nextUrl.pathname,isRateLimited:isRateLimitedRoute(request)},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'B,E'})}).catch(()=>{/* ignore */});
  // #endregion
  if (!isRateLimitedRoute(request)) return NextResponse.next();

  const ip = ipAddress(request) ?? "127.0.0.1";
  if (!ip) return NextResponse.json({ error: "IP not found" }, { status: 403 });

  const { success, pending, limit, remaining } = await ratelimit.limit(ip);
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'rateLimiter.ts:26',message:'Rate limit check result',data:{success,limit,remaining,ip},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'B,E'})}).catch(()=>{/* ignore */});
  // #endregion

  context.waitUntil(pending);
  const res = success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/api/too-many-requests", request.url));
  // #region agent log
  const redirectUrl = res instanceof NextResponse ? res.headers.get('location') : null;
  fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'rateLimiter.ts:31',message:'Rate limiter response',data:{success,resType:res.constructor.name,resStatus:res.status,redirectUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'B,E'})}).catch(()=>{/* ignore */});
  // #endregion

  res.headers.set("X-RateLimit-Success", success.toString());
  res.headers.set("X-RateLimit-Limit", limit.toString());
  res.headers.set("X-RateLimit-Remaining", remaining.toString());

  return res;
};
