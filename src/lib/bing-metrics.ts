const BING_SITE_URL = 'https://www.purist.online';

export interface BingOverview {
  available: boolean;
  clicks: number;
  impressions: number;
  prevClicks: number;
  prevImpressions: number;
  daily: { date: string; clicks: number; impressions: number }[];
  topQueries: { query: string; clicks: number; impressions: number; position: number }[];
}

const EMPTY_BING: BingOverview = { available: false, clicks: 0, impressions: 0, prevClicks: 0, prevImpressions: 0, daily: [], topQueries: [] };

function bingDateToISO(bingDate: string): string {
  // Bing returns dates as ASP.NET JSON ticks: "/Date(1780617600000)/"
  const ms = Number(bingDate.replace(/[^0-9]/g, ''));
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * Bing Webmaster Tools traffic (GetRankAndTrafficStats) and top-query data
 * (GetQueryStats). Uses the real API key already validated against
 * purist.online's Bing Webmaster property, not a mock.
 */
export async function fetchBingOverview(days = 90): Promise<BingOverview> {
  const apiKey = import.meta.env.BING_API_KEY;
  if (!apiKey) return EMPTY_BING;

  try {
    const siteParam = encodeURIComponent(BING_SITE_URL);
    const [trafficRes, queryRes] = await Promise.all([
      fetch(`https://ssl.bing.com/webmaster/api.svc/json/GetRankAndTrafficStats?apikey=${apiKey}&siteUrl=${siteParam}`),
      fetch(`https://ssl.bing.com/webmaster/api.svc/json/GetQueryStats?apikey=${apiKey}&siteUrl=${siteParam}`),
    ]);
    if (!trafficRes.ok) return EMPTY_BING;

    const trafficData = await trafficRes.json();
    const rows: { Date: string; Clicks: number; Impressions: number }[] = trafficData?.d ?? [];
    const sorted = rows
      .map((r) => ({ date: bingDateToISO(r.Date), clicks: r.Clicks, impressions: r.Impressions }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const daily = sorted.slice(-days);
    const prevDaily = sorted.slice(-days * 2, -days);
    const clicks = daily.reduce((s, d) => s + d.clicks, 0);
    const impressions = daily.reduce((s, d) => s + d.impressions, 0);
    const prevClicks = prevDaily.reduce((s, d) => s + d.clicks, 0);
    const prevImpressions = prevDaily.reduce((s, d) => s + d.impressions, 0);

    let topQueries: BingOverview['topQueries'] = [];
    if (queryRes.ok) {
      const queryData = await queryRes.json();
      const qRows: { Query: string; Clicks: number; Impressions: number; AvgImpressionPosition: number; Date: string }[] = queryData?.d ?? [];
      const byQuery = new Map<string, { clicks: number; impressions: number; posSum: number; posCount: number }>();
      const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      qRows.forEach((r) => {
        const date = bingDateToISO(r.Date);
        if (date < cutoff) return;
        const cur = byQuery.get(r.Query) ?? { clicks: 0, impressions: 0, posSum: 0, posCount: 0 };
        cur.clicks += r.Clicks;
        cur.impressions += r.Impressions;
        if (r.AvgImpressionPosition > 0) { cur.posSum += r.AvgImpressionPosition; cur.posCount += 1; }
        byQuery.set(r.Query, cur);
      });
      topQueries = Array.from(byQuery.entries())
        .map(([query, v]) => ({ query, clicks: v.clicks, impressions: v.impressions, position: v.posCount ? v.posSum / v.posCount : 0 }))
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 10);
    }

    return { available: true, clicks, impressions, prevClicks, prevImpressions, daily, topQueries };
  } catch (e) {
    console.error('[bing-metrics] fetch failed', e instanceof Error ? e.message : String(e));
    return EMPTY_BING;
  }
}
