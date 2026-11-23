// News Image: Sunday 22 November 2026 in one image (REVISED full-day edition).
// A dense newspaper front page summing up the whole day: 52 verified stories
// (6 leads, 12 picture stories, 34 briefs) across 7 regions — rebuilt after
// the early-morning entry, with the day's biggest stories: Democrats take the
// House with 258 seats, COP31 collapses with no deal, Iran strikes US bases
// in Bahrain, and the Sparta II drone strike in the Gulf of Finland.
// Deterministic: the same entry.png bytes are copied every run.
// The image itself is built by the generator from stories-2026-11-22.json.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const bytes = readFileSync(source);
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error(
    "entry.png is not a PNG file (expected magic 89 50 4E 47 0D 0A 1A 0A)",
  );
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.png");
writeFileSync(outPath, bytes);
const written = readFileSync(outPath);
if (!written.equals(bytes)) {
  throw new Error("output bytes differ from entry.png");
}
console.log(`wrote ${outPath} (${bytes.length} bytes)`);
