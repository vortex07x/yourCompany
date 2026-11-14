import { mkdir, writeFile } from "node:fs/promises";

const KEY = process.env.PIXABAY_KEY;
if (!KEY) {
  console.error("Missing PIXABAY_KEY. Add it to .env first.");
  process.exit(1);
}

// One search per image slot. Edit the queries to taste and re-run any time.
const HERO = [
  { name: "hero-1", q: "festive gift boxes", orientation: "horizontal" },
  { name: "hero-2", q: "chocolate brownies", orientation: "horizontal" },
];
const INTRO = { name: "intro", q: "bakery shop", orientation: "all" };
const CATEGORIES = {
  "Festive Specials": "festive sweets",
  "Combos": "coffee and brownie",
  "Gift Hampers": "gift hamper",
  "Customised Hampers": "gift box chocolates",
  "Cakes": "cake",
  "What’s New": "dessert table",
  "Pastries": "pastry",
  "Brownies": "brownies",
};

const used = new Set(); // keeps the same photo from appearing twice
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function pick(name, query, orientation = "all") {
  const params = new URLSearchParams({
    key: KEY,
    q: query,
    image_type: "photo",
    orientation,
    safesearch: "true",
    per_page: "20",
  });

  const res = await fetch(`https://pixabay.com/api/?${params}`);
  if (!res.ok) throw new Error(`"${query}" failed with HTTP ${res.status}`);

  const { hits } = await res.json();
  const hit = hits.find((h) => !used.has(h.id));
  if (!hit) throw new Error(`No new results for "${query}"`);
  used.add(hit.id);

  // Pixabay doesn't allow permanent hotlinking, so save the file locally.
  const img = await fetch(hit.largeImageURL, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!img.ok) throw new Error(`Download failed for "${query}" (HTTP ${img.status})`);
  const file = `${slug(name)}.jpg`;
  await writeFile(`public/images/${file}`, Buffer.from(await img.arrayBuffer()));

  console.log(`✓ ${name}: "${query}" by ${hit.user}`);
  return { url: `/images/${file}`, alt: hit.tags, credit: hit.user, page: hit.pageURL };
}

await mkdir("public/images", { recursive: true });
const out = { hero: [], intro: null, categories: {} };

for (const h of HERO) out.hero.push(await pick(h.name, h.q, h.orientation));
out.intro = await pick(INTRO.name, INTRO.q, INTRO.orientation);
for (const [label, q] of Object.entries(CATEGORIES)) {
  out.categories[label] = await pick(label, q);
}

await writeFile("src/images.json", JSON.stringify(out, null, 2));
console.log("\nSaved src/images.json and the photos in public/images/");