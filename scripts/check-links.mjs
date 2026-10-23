#!/usr/bin/env node
// Kontrollerar länkar i det byggda _site/.
//
//   npm run check:links              # interna länkar (snabbt, körs i CI)
//   npm run check:links -- --external  # även externa länkar (kan ge falska larm)
//
// Interna länkar kontrolleras mot filsystemet: filen måste finnas, och om
// länken har ett #ankare måste ankaret finnas i mål-HTML:en.

import fs from "node:fs";
import path from "node:path";

const ROOT = "_site";
const checkExternal = process.argv.includes("--external");
const MAX_REPORTED = 50;

if (!fs.existsSync(ROOT)) {
  console.error(`Hittar inte ${ROOT}/. Kör "npm run build" först.`);
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function pageUrl(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  return "/" + rel.replace(/index\.html$/, "");
}

function collectRefs(html) {
  const refs = [];
  for (const m of html.matchAll(/\b(?:href|src)\s*=\s*"([^"]*)"/gi)) {
    refs.push(m[1]);
  }
  for (const m of html.matchAll(/\bsrcset\s*=\s*"([^"]*)"/gi)) {
    for (const part of m[1].split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url) refs.push(url);
    }
  }
  return refs;
}

const SKIP = /^(?:mailto:|tel:|javascript:|data:|#|\/\/)/i;

function internalCandidates(pathname) {
  const clean = decodeURIComponent(pathname);
  const candidates = [clean];
  // Sidan kan vara publicerad under en underkatalog (t.ex. /sicklaSluss/)
  const segments = clean.split("/").filter(Boolean);
  for (let i = 1; i < segments.length; i++) {
    candidates.push("/" + segments.slice(i).join("/"));
  }
  return candidates;
}

function resolveTarget(pathname) {
  for (const candidate of internalCandidates(pathname)) {
    const base = path.join(ROOT, candidate);
    const tries = [base];
    if (candidate.endsWith("/")) tries.push(path.join(base, "index.html"));
    else {
      tries.push(path.join(base, "index.html"));
      tries.push(base + ".html");
    }
    for (const file of tries) {
      if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
    }
  }
  return null;
}

const pages = walk(ROOT);
const errors = [];
const warnings = [];
const external = new Map();

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const url = pageUrl(file);

  for (const ref of collectRefs(html)) {
    const value = ref.trim();
    if (!value || SKIP.test(value)) continue;

    if (/^https?:/i.test(value)) {
      if (checkExternal) external.set(value, url);
      continue;
    }

    let resolved;
    try {
      resolved = new URL(value, "https://example.invalid" + url);
    } catch {
      warnings.push(`${url}: ogiltig länk "${value}"`);
      continue;
    }

    if (resolved.origin !== "https://example.invalid") {
      if (checkExternal) external.set(resolved.href, url);
      continue;
    }

    if (resolved.pathname === "/sicklaSluss/") {
      // Roten för testpubliceringen
      if (!fs.existsSync(path.join(ROOT, "index.html"))) {
        errors.push(`${url}: "${value}" → saknar index.html`);
      }
      continue;
    }

    const target = resolveTarget(resolved.pathname);
    if (!target) {
      errors.push(`${url}: "${value}" → filen finns inte`);
      continue;
    }

    if (resolved.hash && target.endsWith(".html")) {
      const id = decodeURIComponent(resolved.hash.slice(1));
      if (id) {
        const targetHtml = fs.readFileSync(target, "utf8");
        const hasId =
          targetHtml.includes(`id="${id}"`) ||
          targetHtml.includes(`name="${id}"`);
        if (!hasId) errors.push(`${url}: "${value}" → ankaret #${id} finns inte`);
      }
    }
  }
}

if (checkExternal && external.size) {
  console.log(`Kontrollerar ${external.size} externa länkar …`);
  const entries = [...external.keys()];
  const queue = [...entries];
  let checked = 0;

  async function worker() {
    while (queue.length) {
      const href = queue.shift();
      checked++;
      if (checked % 25 === 0) {
        process.stdout.write(`  ${checked}/${entries.length}\r`);
      }
      try {
        let res = await fetch(href, {
          method: "HEAD",
          redirect: "follow",
          signal: AbortSignal.timeout(15000),
          headers: { "user-agent": "Mozilla/5.0 (link checker)" },
        });
        // En del servrar svarar 404/405 på HEAD men fungerar med GET
        if (res.status >= 400) {
          res = await fetch(href, {
            method: "GET",
            redirect: "follow",
            signal: AbortSignal.timeout(15000),
            headers: { "user-agent": "Mozilla/5.0 (link checker)" },
          });
        }
        if (res.status >= 400) {
          warnings.push(`extern ${res.status}: ${href} (från ${external.get(href)})`);
        }
      } catch (e) {
        warnings.push(`extern fel (${e.name}): ${href} (från ${external.get(href)})`);
      }
    }
  }

  // Begränsa parallelliteten så vi inte spammar externa servrar
  await Promise.all(Array.from({ length: 5 }, worker));
  process.stdout.write("\n");
}

console.log(`Kontrollerade ${pages.length} HTML-sidor.`);

if (warnings.length) {
  console.log(`\nVarningar (${warnings.length}):`);
  for (const w of warnings.slice(0, MAX_REPORTED)) console.log("  - " + w);
  if (warnings.length > MAX_REPORTED) {
    console.log(`  … och ${warnings.length - MAX_REPORTED} till`);
  }
}

if (errors.length) {
  console.error(`\nTrasiga interna länkar (${errors.length}):`);
  for (const e of errors.slice(0, MAX_REPORTED)) console.error("  - " + e);
  if (errors.length > MAX_REPORTED) {
    console.error(`  … och ${errors.length - MAX_REPORTED} till`);
  }
  process.exit(1);
}

console.log("\nInga trasiga interna länkar hittades.");
