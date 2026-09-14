import { getGoogleAccessToken } from './google-service-account';

// Values confirmed against the real, already-verified properties earlier in
// this project (real GSC/GA4 API calls, not guessed): GA4 property 540283456,
// GSC domain property sc-domain:purist.online.
const GA4_PROPERTY_ID = '540283456';
const GSC_SITE_URL = 'sc-domain:purist.online';

export interface TrafficOverview {
  available: boolean;
  sessions: number;
  users: number;
  channels: { channel: string; sessions: number }[];
  topPages: { page: string; sessions: number }[];
}

export interface SearchOverview {
  available: boolean;
  clicks: number;
  impressions: number;
  avgPosition: number;
  avgCtr: number;
  topQueries: { query: string; clicks: number; impressions: number; position: number }[];
}

const EMPTY_TRAFFIC: TrafficOverview = { available: false, sessions: 0, users: 0, channels: [], topPages: [] };
const EMPTY_SEARCH: SearchOverview = { available: false, clicks: 0, impressions: 0, avgPosition: 0, avgCtr: 0, topQueries: [] };

export async function fetchTrafficOverview(days = 30): Promise<TrafficOverview> {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/analytics.readonly']);
  if (!token) return EMPTY_TRAFFIC;

  try {
    const dateRange = { startDate: `${days}daysAgo`, endDate: 'today' };

    const [totalsRes, channelRes, pagesRes] = await Promise.all([
      fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateRanges: [dateRange], metrics: [{ name: 'sessions' }, { name: 'totalUsers' }] }),
      }),
      fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateRanges: [dateRange],
          dimensions: [{ name: 'sessionDefaultChannelGroup' }],
          metrics: [{ name: 'sessions' }],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: 6,
        }),
      }),
      fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateRanges: [dateRange],
          dimensions: [{ name: 'pagePath' }],
          metrics: [{ name: 'sessions' }],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: 8,
        }),
      }),
    ]);

    if (!totalsRes.ok || !channelRes.ok || !pagesRes.ok) return EMPTY_TRAFFIC;

    const totals = await totalsRes.json();
    const channels = await channelRes.json();
    const pages = await pagesRes.json();

    const totalsRow = totals.rows?.[0]?.metricValues ?? [];

    return {
      available: true,
      sessions: Number(totalsRow[0]?.value ?? 0),
      users: Number(totalsRow[1]?.value ?? 0),
      channels: (channels.rows ?? []).map((r: any) => ({
        channel: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
      topPages: (pages.rows ?? []).map((r: any) => ({
        page: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
    };
  } catch (e) {
    console.error('[site-metrics] GA4 fetch failed', e instanceof Error ? e.message : String(e));
    return EMPTY_TRAFFIC;
  }
}

export async function fetchSearchOverview(days = 30): Promise<SearchOverview> {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/webmasters.readonly']);
  if (!token) return EMPTY_SEARCH;

  try {
    const end = new Date();
    end.setDate(end.getDate() - 2); // GSC data has a ~2 day lag
    const start = new Date(end);
    start.setDate(start.getDate() - days);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    const [totalsRes, queriesRes] = await Promise.all([
      fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate: fmt(start), endDate: fmt(end) }),
      }),
      fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate: fmt(start), endDate: fmt(end), dimensions: ['query'], rowLimit: 10 }),
      }),
    ]);

    if (!totalsRes.ok || !queriesRes.ok) return EMPTY_SEARCH;

    const totals = await totalsRes.json();
    const queries = await queriesRes.json();
    const totalsRow = totals.rows?.[0];

    return {
      available: true,
      clicks: totalsRow?.clicks ?? 0,
      impressions: totalsRow?.impressions ?? 0,
      avgPosition: totalsRow?.position ?? 0,
      avgCtr: totalsRow?.ctr ?? 0,
      topQueries: (queries.rows ?? []).map((r: any) => ({
        query: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        position: r.position,
      })),
    };
  } catch (e) {
    console.error('[site-metrics] GSC fetch failed', e instanceof Error ? e.message : String(e));
    return EMPTY_SEARCH;
  }
}
