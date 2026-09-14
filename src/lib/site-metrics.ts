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
  newUsers: number;
  bounceRate: number;
  avgEngagementSec: number;
  prevSessions: number;
  prevUsers: number;
  prevBounceRate: number;
  prevAvgEngagementSec: number;
  pagesPerSession: number;
  sessionsPerUser: number;
  channels: { channel: string; sessions: number }[];
  topPages: { page: string; sessions: number }[];
  topLandingPages: { page: string; sessions: number }[];
  daily: { date: string; sessions: number }[];
  devices: { device: string; sessions: number }[];
  countries: { country: string; sessions: number }[];
}

export interface RealtimeOverview {
  available: boolean;
  activeUsers: number;
  topPages: { page: string; users: number }[];
}

export type Granularity = 'day' | 'week' | 'hour';
export interface TimeSeries {
  available: boolean;
  points: { label: string; value: number }[];
}

export interface SearchOverview {
  available: boolean;
  clicks: number;
  impressions: number;
  avgPosition: number;
  avgCtr: number;
  prevClicks: number;
  prevImpressions: number;
  prevAvgPosition: number;
  topQueries: { query: string; clicks: number; impressions: number; position: number }[];
  topPages: { page: string; clicks: number; impressions: number; position: number }[];
  daily: { date: string; clicks: number }[];
  brandClicks: number;
  nonBrandClicks: number;
  positionBuckets: { label: string; queries: number }[];
  queriesTracked: number;
}

const EMPTY_TRAFFIC: TrafficOverview = { available: false, sessions: 0, users: 0, newUsers: 0, bounceRate: 0, avgEngagementSec: 0, prevSessions: 0, prevUsers: 0, prevBounceRate: 0, prevAvgEngagementSec: 0, pagesPerSession: 0, sessionsPerUser: 0, channels: [], topPages: [], topLandingPages: [], daily: [], devices: [], countries: [] };
const EMPTY_REALTIME: RealtimeOverview = { available: false, activeUsers: 0, topPages: [] };

/** GA4 Realtime API: active users on the site right now (last ~30 min window GA4 itself defines). */
export async function fetchRealtimeOverview(): Promise<RealtimeOverview> {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/analytics.readonly']);
  if (!token) return EMPTY_REALTIME;

  try {
    const [totalRes, pagesRes] = await Promise.all([
      fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runRealtimeReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics: [{ name: 'activeUsers' }] }),
      }),
      fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runRealtimeReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dimensions: [{ name: 'unifiedScreenName' }],
          metrics: [{ name: 'activeUsers' }],
          orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
          limit: 6,
        }),
      }),
    ]);
    if (!totalRes.ok) return EMPTY_REALTIME;
    const total = await totalRes.json();
    const pages = pagesRes.ok ? await pagesRes.json() : null;
    return {
      available: true,
      activeUsers: Number(total.rows?.[0]?.metricValues?.[0]?.value ?? 0),
      topPages: (pages?.rows ?? []).map((r: any) => ({ page: r.dimensionValues[0].value, users: Number(r.metricValues[0].value) })),
    };
  } catch (e) {
    console.error('[site-metrics] GA4 realtime fetch failed', e instanceof Error ? e.message : String(e));
    return EMPTY_REALTIME;
  }
}
const EMPTY_SEARCH: SearchOverview = { available: false, clicks: 0, impressions: 0, avgPosition: 0, avgCtr: 0, prevClicks: 0, prevImpressions: 0, prevAvgPosition: 0, topQueries: [], topPages: [], daily: [], brandClicks: 0, nonBrandClicks: 0, positionBuckets: [], queriesTracked: 0 };

export function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}

export async function fetchTrafficOverview(days = 30): Promise<TrafficOverview> {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/analytics.readonly']);
  if (!token) return EMPTY_TRAFFIC;

  try {
    const currentRange = { startDate: `${days}daysAgo`, endDate: 'today' };
    const prevRange = { startDate: `${days * 2}daysAgo`, endDate: `${days + 1}daysAgo` };

    const runReport = (body: object) =>
      fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

    const [totalsRes, prevTotalsRes, channelRes, pagesRes, dailyRes, deviceRes, countryRes, landingRes] = await Promise.all([
      runReport({ dateRanges: [currentRange], metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'newUsers' }, { name: 'bounceRate' }, { name: 'averageSessionDuration' }, { name: 'screenPageViewsPerSession' }, { name: 'sessionsPerUser' }] }),
      runReport({ dateRanges: [prevRange], metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'newUsers' }, { name: 'bounceRate' }, { name: 'averageSessionDuration' }] }),
      runReport({
        dateRanges: [currentRange],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 6,
      }),
      runReport({
        dateRanges: [currentRange],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 8,
      }),
      runReport({
        dateRanges: [currentRange],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
      runReport({
        dateRanges: [currentRange],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      }),
      runReport({
        dateRanges: [currentRange],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 8,
      }),
      runReport({
        dateRanges: [currentRange],
        dimensions: [{ name: 'landingPagePlusQueryString' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 8,
      }),
    ]);

    if (!totalsRes.ok || !channelRes.ok || !pagesRes.ok) return EMPTY_TRAFFIC;

    const totals = await totalsRes.json();
    const prevTotals = prevTotalsRes.ok ? await prevTotalsRes.json() : null;
    const channels = await channelRes.json();
    const pages = await pagesRes.json();
    const daily = dailyRes.ok ? await dailyRes.json() : null;
    const devices = deviceRes.ok ? await deviceRes.json() : null;
    const countries = countryRes.ok ? await countryRes.json() : null;
    const landing = landingRes.ok ? await landingRes.json() : null;

    const totalsRow = totals.rows?.[0]?.metricValues ?? [];
    const prevRow = prevTotals?.rows?.[0]?.metricValues ?? [];

    return {
      available: true,
      sessions: Number(totalsRow[0]?.value ?? 0),
      users: Number(totalsRow[1]?.value ?? 0),
      newUsers: Number(totalsRow[2]?.value ?? 0),
      bounceRate: Number(totalsRow[3]?.value ?? 0),
      avgEngagementSec: Number(totalsRow[4]?.value ?? 0),
      pagesPerSession: Number(totalsRow[5]?.value ?? 0),
      sessionsPerUser: Number(totalsRow[6]?.value ?? 0),
      prevSessions: Number(prevRow[0]?.value ?? 0),
      prevUsers: Number(prevRow[1]?.value ?? 0),
      prevBounceRate: Number(prevRow[3]?.value ?? 0),
      prevAvgEngagementSec: Number(prevRow[4]?.value ?? 0),
      channels: (channels.rows ?? []).map((r: any) => ({
        channel: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
      topPages: (pages.rows ?? []).map((r: any) => ({
        page: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
      topLandingPages: (landing?.rows ?? []).map((r: any) => ({
        page: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
      daily: (daily?.rows ?? []).map((r: any) => ({
        date: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
      devices: (devices?.rows ?? []).map((r: any) => ({
        device: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
      countries: (countries?.rows ?? []).map((r: any) => ({
        country: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
    };
  } catch (e) {
    console.error('[site-metrics] GA4 fetch failed', e instanceof Error ? e.message : String(e));
    return EMPTY_TRAFFIC;
  }
}

/** Traffic time series at day, week, or hour-of-day granularity, for the client-side granularity switcher. */
export async function fetchTrafficSeries(granularity: Granularity, days = 30): Promise<TimeSeries> {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/analytics.readonly']);
  if (!token) return { available: false, points: [] };

  try {
    const dateRange = { startDate: `${days}daysAgo`, endDate: 'today' };
    const dimension = granularity === 'hour' ? 'hour' : granularity === 'week' ? 'yearWeek' : 'date';

    const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [dateRange],
        dimensions: [{ name: dimension }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ dimension: { dimensionName: dimension } }],
      }),
    });
    if (!res.ok) return { available: false, points: [] };
    const data = await res.json();
    const rows = data.rows ?? [];

    if (granularity === 'hour') {
      // GA4 returns each hour bucket already summed across the date range when
      // dimensions is just ['hour'], so this is genuinely "which hours of the
      // day drive traffic", not a single day's breakdown.
      const byHour = new Map<string, number>();
      rows.forEach((r: any) => byHour.set(r.dimensionValues[0].value, (byHour.get(r.dimensionValues[0].value) ?? 0) + Number(r.metricValues[0].value)));
      const points = Array.from({ length: 24 }, (_, h) => ({
        label: `${String(h).padStart(2, '0')}:00`,
        value: byHour.get(String(h).padStart(2, '0')) ?? 0,
      }));
      return { available: true, points };
    }

    return {
      available: true,
      points: rows.map((r: any) => ({ label: r.dimensionValues[0].value, value: Number(r.metricValues[0].value) })),
    };
  } catch (e) {
    console.error('[site-metrics] GA4 series fetch failed', e instanceof Error ? e.message : String(e));
    return { available: false, points: [] };
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
    const prevEnd = new Date(start);
    prevEnd.setDate(prevEnd.getDate() - 1);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevStart.getDate() - days);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    const query = (body: object) =>
      fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

    const [totalsRes, prevTotalsRes, queriesRes, allQueriesRes, pagesRes, dailyRes] = await Promise.all([
      query({ startDate: fmt(start), endDate: fmt(end) }),
      query({ startDate: fmt(prevStart), endDate: fmt(prevEnd) }),
      query({ startDate: fmt(start), endDate: fmt(end), dimensions: ['query'], rowLimit: 10 }),
      query({ startDate: fmt(start), endDate: fmt(end), dimensions: ['query'], rowLimit: 250 }),
      query({ startDate: fmt(start), endDate: fmt(end), dimensions: ['page'], rowLimit: 10 }),
      query({ startDate: fmt(start), endDate: fmt(end), dimensions: ['date'] }),
    ]);

    if (!totalsRes.ok || !queriesRes.ok) return EMPTY_SEARCH;

    const totals = await totalsRes.json();
    const prevTotals = prevTotalsRes.ok ? await prevTotalsRes.json() : null;
    const queries = await queriesRes.json();
    const allQueries = allQueriesRes.ok ? await allQueriesRes.json() : null;
    const pages = pagesRes.ok ? await pagesRes.json() : null;
    const daily = dailyRes.ok ? await dailyRes.json() : null;
    const totalsRow = totals.rows?.[0];
    const prevRow = prevTotals?.rows?.[0];

    // Brand = query contains "purist"; a simple, honest heuristic (no fabricated
    // classification model), computed over up to 250 queries rather than just
    // the top 10 so the split is representative, not dominated by a few rows.
    let brandClicks = 0, nonBrandClicks = 0;
    const posBuckets = { 'Top 3': 0, '4-10': 0, '11-20': 0, '21+': 0 };
    (allQueries?.rows ?? []).forEach((r: any) => {
      if (String(r.keys[0]).toLowerCase().includes('purist')) brandClicks += r.clicks;
      else nonBrandClicks += r.clicks;
      const pos = r.position;
      if (pos <= 3) posBuckets['Top 3']++;
      else if (pos <= 10) posBuckets['4-10']++;
      else if (pos <= 20) posBuckets['11-20']++;
      else posBuckets['21+']++;
    });
    const positionBuckets = Object.entries(posBuckets).map(([label, queries]) => ({ label, queries }));
    const queriesTracked = allQueries?.rows?.length ?? 0;

    return {
      available: true,
      clicks: totalsRow?.clicks ?? 0,
      impressions: totalsRow?.impressions ?? 0,
      avgPosition: totalsRow?.position ?? 0,
      avgCtr: totalsRow?.ctr ?? 0,
      prevClicks: prevRow?.clicks ?? 0,
      prevImpressions: prevRow?.impressions ?? 0,
      prevAvgPosition: prevRow?.position ?? 0,
      topQueries: (queries.rows ?? []).map((r: any) => ({
        query: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        position: r.position,
      })),
      topPages: (pages?.rows ?? []).map((r: any) => ({
        page: r.keys[0].replace('https://www.purist.online', ''),
        clicks: r.clicks,
        impressions: r.impressions,
        position: r.position,
      })),
      daily: (daily?.rows ?? []).map((r: any) => ({
        date: r.keys[0],
        clicks: r.clicks,
      })),
      brandClicks,
      nonBrandClicks,
      positionBuckets,
      queriesTracked,
    };
  } catch (e) {
    console.error('[site-metrics] GSC fetch failed', e instanceof Error ? e.message : String(e));
    return EMPTY_SEARCH;
  }
}

/** Search click time series at day or week granularity (GSC exposes no hourly dimension). */
export async function fetchSearchSeries(granularity: 'day' | 'week', days = 30): Promise<TimeSeries> {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/webmasters.readonly']);
  if (!token) return { available: false, points: [] };

  try {
    const end = new Date();
    end.setDate(end.getDate() - 2);
    const start = new Date(end);
    start.setDate(start.getDate() - days);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate: fmt(start), endDate: fmt(end), dimensions: ['date'] }),
    });
    if (!res.ok) return { available: false, points: [] };
    const data = await res.json();
    const rows = (data.rows ?? []) as { keys: string[]; clicks: number }[];

    if (granularity === 'day') {
      return { available: true, points: rows.map((r) => ({ label: r.keys[0], value: r.clicks })) };
    }

    // Aggregate into ISO weeks client-side, GSC has no native week dimension.
    const byWeek = new Map<string, number>();
    rows.forEach((r) => {
      const d = new Date(r.keys[0]);
      const jan1 = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
      const key = `${d.getFullYear()}-W${String(week).padStart(2, '0')}`;
      byWeek.set(key, (byWeek.get(key) ?? 0) + r.clicks);
    });
    return { available: true, points: Array.from(byWeek.entries()).map(([label, value]) => ({ label, value })) };
  } catch (e) {
    console.error('[site-metrics] GSC series fetch failed', e instanceof Error ? e.message : String(e));
    return { available: false, points: [] };
  }
}
