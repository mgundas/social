import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PEPPER = process.env.PEPPER!;   // non-null assert for now
const COST = 12;

export async function hashPassword(raw: string) {
  const peppered = PEPPER + raw;
  return bcrypt.hash(peppered, COST);
}

export async function verifyPassword(raw: string, hashed: string) {
  const peppered = PEPPER + raw;
  return bcrypt.compare(peppered, hashed);
}

// The secret used to sign the JWT
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getUserFromToken(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("auth")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.sub as string;
  } catch (err) {
    return null;
  }
}
