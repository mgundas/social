import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (payload.type !== "email_verification") {
      return NextResponse.json({ error: "Wrong token type" }, { status: 400 });
    }

    const db = (await clientPromise).db();
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(payload.sub as string) }, { $set: { verified: true } });

    if (!result.modifiedCount) {
      return NextResponse.json({ error: "Already verified?" }, { status: 400 });
    }

    // Optional: redirect to login with a success query-param
    return NextResponse.redirect(new URL("/login?verified=1", req.url));
  } catch (err) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }
}
