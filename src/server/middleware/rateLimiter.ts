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
  if (!isRateLimitedRoute(request)) return NextResponse.next();

  const ip = ipAddress(request) ?? "127.0.0.1";
  if (!ip) return NextResponse.json({ error: "IP not found" }, { status: 403 });

  const { success, pending, limit, remaining } = await ratelimit.limit(ip);

  context.waitUntil(pending);
  const res = success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/api/too-many-requests", request.url));

  res.headers.set("X-RateLimit-Success", success.toString());
  res.headers.set("X-RateLimit-Limit", limit.toString());
  res.headers.set("X-RateLimit-Remaining", remaining.toString());

  return res;
};
