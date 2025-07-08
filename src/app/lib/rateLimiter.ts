import redis from "./redis";

/**
 * A simple fixed-window rate limiter.
 *
 * @param key        Unique identifier, e.g. "signup:1.2.3.4"
 * @param limit      Max allowed hits in the window
 * @param windowSec  Window length in seconds
 * @returns          true  → allow
 *                   false → block (over limit)
 */
export async function rateLimit(
  key: string,
  limit = 5,
  windowSec = 60
): Promise<boolean> {
  // 1️⃣ Atomically increment the counter for this key
  const count = await redis.incr(key);

  // 2️⃣ If this is the *first* hit, start the TTL countdown
  if (count === 1) {
    await redis.expire(key, windowSec);
  }

  // 3️⃣ Decide whether to allow or block
  return count <= limit;      // ← ✏️ you can tweak logic or return details
}
