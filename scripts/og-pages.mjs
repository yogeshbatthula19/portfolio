// After `vite build`, write a copy of index.html for each case study with its
// own title, description and share image. Link previews (LinkedIn, WhatsApp,
// Slack) don't run JavaScript, so they only see what is in the raw HTML.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const SITE = 'https://www.yogeshbattula.online';
const pages = [
  {
    slug: 'trosky',
    title: 'Trosky 365: a coach in your pocket · Yogesh Battula',
    description: 'Case study: turning drill videos into a 10-minute daily practice routine for young baseball players. 30-day streak retention went from 26% to 62%.',
  },
  {
    slug: 'ahamx',
    title: 'AhamX: one learning platform, three roles · Yogesh Battula',
    description: 'Case study: helping learners resume, educators trust AI drafts, and organization leads approve with context. Shipped in 3 months.',
  },
  {
    slug: 'ryzeup',
    title: 'Ryzeup: a more connected workplace · Yogesh Battula',
    description: 'Case study: a mobile feed, search and team views that keep managers in context. Switching to a team member went from about 28s to under 3s.',
  },
];

const base = readFileSync('dist/index.html', 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const setMeta = (html, attr, key, value) =>
  html.replace(new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, 's'), `$1${esc(value)}$2`);

for (const p of pages) {
  const url = `${SITE}/case-study/${p.slug}`;
  const image = `${SITE}/og/${p.slug}.jpg`;
  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, 'name', 'description', p.description);
  for (const [k, v] of [['og:url', url], ['og:title', p.title], ['og:description', p.description], ['og:image', image], ['og:image:alt', p.title]]) {
    html = setMeta(html, 'property', k, v);
  }
  for (const [k, v] of [['twitter:url', url], ['twitter:title', p.title], ['twitter:description', p.description], ['twitter:image', image]]) {
    html = setMeta(html, 'name', k, v);
  }
  mkdirSync(`dist/case-study/${p.slug}`, { recursive: true });
  writeFileSync(`dist/case-study/${p.slug}/index.html`, html);
  console.log(`og page: /case-study/${p.slug}`);
}
