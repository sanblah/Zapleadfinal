type Bucket = {
  count: number;
  resetAt: number;
  lastAccessedAt: number;
};

export type RateLimitOptions = {
  windowMs: number;
  max: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

function purgeExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

function evictOldestBuckets() {
  if (buckets.size <= MAX_BUCKETS) {
    return;
  }

  const overflow = buckets.size - MAX_BUCKETS;
  const oldestKeys = [...buckets.entries()]
    .sort((a, b) => a[1].lastAccessedAt - b[1].lastAccessedAt)
    .slice(0, overflow)
    .map(([key]) => key);

  for (const key of oldestKeys) {
    buckets.delete(key);
  }
}

export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  purgeExpiredBuckets(now);

  const current = buckets.get(key);
  const bucket =
    !current || current.resetAt <= now
      ? { count: 0, resetAt: now + options.windowMs, lastAccessedAt: now }
      : current;

  bucket.count += 1;
  bucket.lastAccessedAt = now;
  buckets.set(key, bucket);
  evictOldestBuckets();

  const allowed = bucket.count <= options.max;
  const remaining = allowed ? Math.max(0, options.max - bucket.count) : 0;
  const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

  return {
    allowed,
    limit: options.max,
    remaining,
    retryAfterSeconds,
  };
}
