import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { verifyPassword } from "@/app/lib/auth";
import { rateLimit } from "@/app/lib/rateLimiter";
import { jwtVerify } from "jose";
import redis from "@/app/lib/redis";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: "Logged out" });

  const token = req.cookies.get("auth")?.value;

  if (token) {
    try {
      // ---- 3.  Decode it to learn *who* is logging out
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );
      const userId = payload.sub as string; // we stored sub = userId
      const exp = payload.exp as number; // seconds since epoch

      // ---- 4.  Work out how long the token has left to live
      const ttl = Math.max(exp - Math.floor(Date.now() / 1000), 0);

      // ---- 5.  Mark that userId as revoked for the same TTL
      // key  →  revokedUsers:<userId>   value → "true"   TTL → token’s remaining life
      await redis.set(`revokedUsers:${userId}`, "true", "EX", ttl);
    } catch {
      // token might already be expired / malformed – ignore
    }
  }

  res.cookies.set({
    name: "auth",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // 15 minutes
  });

  return res;
}
