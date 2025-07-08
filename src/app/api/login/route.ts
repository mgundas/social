import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { verifyPassword } from "../../lib/auth";
import { rateLimit } from "../../lib/rateLimiter";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Basic field check
  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (
    !(await rateLimit(`login:ip:${ip}`, 10, 15)) ||
    !(await rateLimit(`login:user:${email}`, 5, 10))
  ) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }

  // Look up user
  const db = (await clientPromise).db();
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Verify password
  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Create JWT  (userId + exp 15 min)
  const token = await new SignJWT({ sub: user._id.toString() })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  const res = NextResponse.json({ message: "Logged in" });

  res.cookies.set({
    name: "auth",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15, // 15 minutes
  });

  return res;
}
