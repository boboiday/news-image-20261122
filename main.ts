// News Image: Sunday 22 November 2026 in one image (REVISED full-day edition).
// A dense newspaper front page summing up the whole day: 52 verified stories
// (6 leads, 12 picture stories, 34 briefs) across 7 regions — rebuilt after
// the early-morning entry, with the day's biggest stories: Democrats take the
// House with 258 seats, COP31 collapses with no deal, Iran strikes US bases
// in Bahrain, and the Sparta II drone strike in the Gulf of Finland.
// Deterministic: the same entry.png bytes are copied every run.
// The image itself is built by the generator from stories-2026-11-22.json.
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const PNG_SIGNATURE = Buffer.from("89504E470D0A1A0A", "hex");

function copyEntry(): void {
  const source = fileURLToPath(new URL("entry.png", import.meta.url));
  const payload = fs.readFileSync(source);
  if (payload.length === 0) {
    throw new Error("entry.png is empty; refusing to copy");
  }
  const ONE_MIB = 1024 * 1024;
  if (payload.length > ONE_MIB) {
    throw new Error(
      `entry.png is ${payload.length} bytes, over the 1 MiB cap; refusing to copy`,
    );
  }
  if (!payload.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
    throw new Error("entry.png lacks the PNG signature; refusing to copy");
  }
  const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outputDirectory, { recursive: true });
  const destination = path.join(outputDirectory, "entry.png");
  fs.writeFileSync(destination, payload);
  const roundTripped = fs.readFileSync(destination);
  if (!roundTripped.equals(payload)) {
    throw new Error("round-trip mismatch: output differs from entry.png");
  }
  console.log(`copied entry.png to ${destination} (${payload.length} bytes)`);
}

copyEntry();
