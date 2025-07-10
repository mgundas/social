import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getUserById(id: string) {
  const client = await clientPromise;
  const db = client.db(); // uses default DB from URI
  return db.collection("users").findOne({ _id: new ObjectId(id) });
}

export async function updateUserById(id: string, data: { firstName?: string; lastName?: string }) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("users").updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}
