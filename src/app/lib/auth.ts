import bcrypt from "bcrypt";

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