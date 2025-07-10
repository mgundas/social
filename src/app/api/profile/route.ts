import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUserById } from "@/app/lib/mongo/users";
import { getUserFromToken } from "@/app/lib/auth"; // however you decode JWT
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const requestedId = url.searchParams.get("userId");

  if (!requestedId || !ObjectId.isValid(requestedId))
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const user = await getUserById(requestedId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // ✅ Only expose public-safe fields
  return NextResponse.json({
    id: user._id.toString(),
    firstName: user.firstName || "",
    lastName: user.lastName || ""
  });
}

export async function POST(req: NextRequest) {
  const userId = await getUserFromToken(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { firstName, lastName } = await req.json();
  await updateUserById(userId, { firstName, lastName });

  return NextResponse.json({ message: "Profile updated" });
}