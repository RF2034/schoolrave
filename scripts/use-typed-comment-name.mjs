import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const from = "const authorName = user?.name || body.authorName;";
const to = "const authorName = body.authorName;";
const roots = ["node_modules/emdash/src", "node_modules/emdash/dist"];

function files(dir, out) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files(path, out);
    else if (/public-submission/.test(name) && /\.(mjs|js|ts)$/.test(name))
      out.push(path);
  }
  return out;
}

let patched = 0;
let already = 0;
for (const root of roots) {
  for (const file of files(root, [])) {
    const text = readFileSync(file, "utf8");
    if (text.includes(from)) {
      writeFileSync(file, text.replaceAll(from, to));
      patched++;
    } else if (text.includes(to)) already++;
  }
}

if (patched === 0 && already === 0) {
  throw new Error("comment author name override was not found");
}

const dateFile = "node_modules/emdash/src/components/Comments.astro";
const dateFrom = `\thour: "numeric",
\tminute: "2-digit",
});`;
const dateTo = `\thour: "numeric",
\tminute: "2-digit",
\ttimeZone: "Asia/Tokyo",
});`;
const dateText = readFileSync(dateFile, "utf8");
if (dateText.includes(dateFrom)) {
  writeFileSync(dateFile, dateText.replace(dateFrom, dateTo));
} else if (!dateText.includes('timeZone: "Asia/Tokyo"')) {
  throw new Error("comment date format was not found");
}
