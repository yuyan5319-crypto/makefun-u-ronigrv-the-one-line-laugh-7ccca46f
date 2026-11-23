// The One-Line Laugh — make.fun bounty u-ronigrv-the-one-line-laugh-7ccca46f
//
// Writes exactly one funny line (a single sentence, at most 200
// characters) to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// The line is a fixed, hand-written one-liner: no network, no randomness,
// no dependencies — the same bytes on every run, so the entry the judge
// reads is the entry tested here.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My smartwatch just applauded me for standing up \u2014 finally, a standing ovation for doing the bare minimum.";

const MAX_CHARS = 200;

// Gate guard: the sealed scorer only accepts 1–200 characters of
// non-whitespace text in a single line, so refuse to write anything
// that would fail the gate instead of shipping an invalid entry.
const trimmed = LINE.trim();
if (trimmed.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(
    `Line must be 1-${MAX_CHARS} characters, got ${LINE.length}.`,
  );
}
if (LINE.includes("\n") || trimmed.split(/\s+/).length < 2) {
  throw new Error("Line must be exactly one non-empty sentence.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`Wrote ${LINE.length} characters to ${join(outDir, "entry.txt")}`);
