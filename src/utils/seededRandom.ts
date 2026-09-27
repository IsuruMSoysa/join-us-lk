/**
 * Deterministic PRNG (mulberry32) so decorative layouts (e.g. leaf garlands)
 * stay stable across re-renders instead of reshuffling on every render.
 */
export function mulberry32(seed: number): () => number {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Returns a `random()` fn in `[min, max)` derived from a seeded generator. */
export function seededRange(random: () => number, min: number, max: number): number {
  return min + random() * (max - min);
}
