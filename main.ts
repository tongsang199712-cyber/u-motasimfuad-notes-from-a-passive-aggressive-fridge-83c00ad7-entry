// Entry for "Notes From a Passive-Aggressive Fridge" (make.fun).
// One single-line note a smart fridge leaves for its owner: dry, petty,
// and specific — the leftovers turned six, so the fridge threw them a
// birthday party and did not invite the owner. The gate requires
// /output/entry.txt to be UTF-8 text of 1-200 characters, a single line,
// with no trailing newline, so the line is written exactly as-is.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "The leftovers you swore you'd eat tonight turned six today. I threw them a little birthday party. You weren't invited.";

mkdirSync("/output", { recursive: true });

writeFileSync("/output/entry.txt", LINE, "utf8");

// Validate the gate before trusting the write: 1-200 chars, one line,
// no trailing newline.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry length ${chars} chars is outside the 1-200 gate`);
}
if (LINE.includes("\n") || LINE.endsWith("\n")) {
  throw new Error("entry must be a single line with no trailing newline");
}

// Read back and compare byte-for-byte.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
}

const bytes = Buffer.byteLength(LINE, "utf8");
console.log(`chars: ${chars}`);
console.log(`bytes: ${bytes}`);
console.log(LINE);

