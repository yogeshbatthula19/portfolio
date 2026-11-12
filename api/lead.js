// Saves a FaceUnlock download lead (name + email) as one row in a CSV file
// inside a PRIVATE GitHub repo. The CSV opens directly in Excel.
//
// Vercel environment variables:
//   LEADS_GITHUB_TOKEN  fine-grained token with "Contents: Read and write" on the leads repo
//   LEADS_REPO          e.g. "yogeshbatthula19/faceunlock-leads" (must be private)
//   LEADS_PATH          optional, defaults to "leads.csv"

const BOM = '﻿';
const HEADER = 'Date (UTC),Name,Email,Source\n';

// Stop spreadsheet formula injection and CSV breakage.
const cell = (v) => {
  let s = String(v ?? '').replace(/[\r\n]+/g, ' ').trim();
  if (/^[=+\-@\t]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
};

async function gh(path, token, init = {}) {
  return fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'faceunlock-leads',
      ...(init.headers || {}),
    },
  });
}

async function appendRow(repo, path, token, row) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const cur = await gh(`/repos/${repo}/contents/${encodeURIComponent(path)}`, token);
    let text = BOM + HEADER;
    let sha;
    if (cur.status === 200) {
      const j = await cur.json();
      sha = j.sha;
      text = Buffer.from(j.content, 'base64').toString('utf8');
      if (text && !text.endsWith('\n')) text += '\n';
    } else if (cur.status !== 404) {
      throw new Error(`GitHub read failed: ${cur.status}`);
    }
    const put = await gh(`/repos/${repo}/contents/${encodeURIComponent(path)}`, token, {
      method: 'PUT',
      body: JSON.stringify({
        message: 'New FaceUnlock download',
        content: Buffer.from(text + row + '\n', 'utf8').toString('base64'),
        ...(sha ? { sha } : {}),
      }),
    });
    if (put.ok) return;
    if (put.status !== 409 && put.status !== 422) throw new Error(`GitHub write failed: ${put.status}`);
    // someone else wrote at the same moment: re-read and try again
  }
  throw new Error('GitHub write kept conflicting');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const name = String(body.name || '').trim().slice(0, 80);
  const email = String(body.email || '').trim().slice(0, 120);

  if (body.website) return res.status(200).json({ ok: true, saved: false }); // honeypot: bots fill this in
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter your name and a valid email.' });
  }

  const token = process.env.LEADS_GITHUB_TOKEN;
  const repo = process.env.LEADS_REPO;
  const path = process.env.LEADS_PATH || 'leads.csv';
  if (!token || !repo) {
    console.error('Leads not saved: LEADS_GITHUB_TOKEN / LEADS_REPO are not set.');
    return res.status(200).json({ ok: true, saved: false }); // never block the download
  }

  try {
    const row = [new Date().toISOString().replace('T', ' ').slice(0, 19), name, email, 'faceunlock-page'].map(cell).join(',');
    await appendRow(repo, path, token, row);
    return res.status(200).json({ ok: true, saved: true });
  } catch (err) {
    console.error('Leads not saved:', err.message);
    return res.status(200).json({ ok: true, saved: false });
  }
}
