/**
 * PURIST — Google Indexing API bulk submission
 *
 * Setup:
 * 1. Go to console.cloud.google.com → create project "purist-indexing"
 * 2. Enable "Web Search Indexing API"
 * 3. Create service account → download JSON key → save as scripts/service-account.json
 * 4. In Google Search Console → Settings → Users and permissions
 *    → Add the service account email as OWNER
 * 5. Run: node scripts/index-urls.mjs
 *
 * Limit: 200 URLs per day (Google quota)
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';

// ── Config ────────────────────────────────────────────────────────────────────
const SITEMAP_URL   = 'https://www.purist.online/sitemap.xml';
const CREDENTIALS   = './scripts/service-account.json'; // your downloaded JSON key
const BATCH_SIZE    = 200;  // Google daily quota
const DELAY_MS      = 300;  // delay between requests to avoid rate limit
const START_INDEX   = 600;  // change each day: Day1=0, Day2=200, Day3=400, Day4=600

// ── Auth ──────────────────────────────────────────────────────────────────────
async function getAuth() {
  const credentials = JSON.parse(readFileSync(CREDENTIALS, 'utf8'));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  return auth.getClient();
}

// ── Fetch & parse sitemap ─────────────────────────────────────────────────────
async function getUrlsFromSitemap() {
  console.log(`Fetching sitemap: ${SITEMAP_URL}`);
  const res  = await fetch(SITEMAP_URL);
  const xml  = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim());
  console.log(`Found ${urls.length} URLs in sitemap`);
  return urls;
}

// ── Submit one URL ────────────────────────────────────────────────────────────
async function submitUrl(authClient, url) {
  const indexing = google.indexing({ version: 'v3', auth: authClient });
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: 'URL_UPDATED',
      },
    });
    return { url, status: res.status, ok: true };
  } catch (err) {
    return { url, status: err.code, error: err.message, ok: false };
  }
}

// ── Sleep helper ──────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const authClient = await getAuth();
  const allUrls    = await getUrlsFromSitemap();

  // Take batch starting at START_INDEX (200/day limit)
  const urls = allUrls.slice(START_INDEX, START_INDEX + BATCH_SIZE);
  console.log(`\nBatch: URLs ${START_INDEX + 1} to ${START_INDEX + urls.length} of ${allUrls.length}`);
  console.log(`Submitting ${urls.length} URLs to Google Indexing API...\n`);

  const results = { ok: [], failed: [] };

  for (let i = 0; i < urls.length; i++) {
    const url    = urls[i];
    const result = await submitUrl(authClient, url);

    if (result.ok) {
      results.ok.push(url);
      console.log(`[${i + 1}/${urls.length}] ✓ ${url}`);
    } else {
      results.failed.push({ url, error: result.error });
      console.log(`[${i + 1}/${urls.length}] ✗ ${url} — ${result.error}`);
    }

    // Respect rate limit
    if (i < urls.length - 1) await sleep(DELAY_MS);
  }

  // Summary
  console.log('\n─────────────────────────────────────────');
  console.log(`Done. ${results.ok.length} submitted, ${results.failed.length} failed.`);

  if (results.failed.length > 0) {
    console.log('\nFailed URLs:');
    results.failed.forEach(f => console.log(`  ${f.url} — ${f.error}`));
  }

  if (allUrls.length > BATCH_SIZE) {
    const remaining = allUrls.length - BATCH_SIZE;
    console.log(`\n${remaining} URLs remaining — run again tomorrow (200/day quota).`);
    console.log(`Next batch starts at index ${BATCH_SIZE}.`);
  }
}

main().catch(console.error);
