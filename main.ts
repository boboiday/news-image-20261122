import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Entry for news-image-20261122: copies the pre-built 1024x1024 PNG
// (Sunday 22 November 2026, six verified stories) to the output dir.
// The image is fully deterministic — same bytes on every run.
const src = new URL("./entry.png", import.meta.url);
const buf = readFileSync(src);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!buf.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a PNG (bad magic bytes)");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
