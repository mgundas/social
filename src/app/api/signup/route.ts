import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { hashPassword } from "@/app/lib/auth";
import { rateLimit } from "@/app/lib/rateLimiter";
import { sendVerificationEmail } from "@/app/lib/mailgun";
import { SignJWT } from "jose";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  // 5 sign-ups per IP per hour
  if (!(await rateLimit(`signup:${ip}`, 5, 60 * 60))) {
    return NextResponse.json(
      { error: "Too many sign-up attempts. Please try again later." },
      { status: 429 }
    );
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing email or password" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db(); // use default DB from URI
  const users = db.collection("users");

  // Check if user already exists
  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash password (we’ll plug your hashPassword() here next)
  const hashedPassword = await hashPassword(password);

  // Save user
  const user = await users.insertOne({
    email,
    password: hashedPassword,
    verified: false,
    createdAt: new Date(),
  });

  const token = await new SignJWT({ sub: user.insertedId.toString(), type: "email_verification" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30m")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  await sendVerificationEmail(email, token);

  return NextResponse.json({ message: "User created" });
}
