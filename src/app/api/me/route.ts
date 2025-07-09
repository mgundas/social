// /app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth")?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    return NextResponse.json({ user: payload.sub });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
