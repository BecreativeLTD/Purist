export const prerender = true;

import skillsData from '~/data/skills.json';
import { terms, slugifyTerm } from '~/data/glossary';

const site = 'https://purist.online';

const skillPages = [
  { url: '/skills', changefreq: 'weekly', priority: '0.9' },
  ...skillsData.skills.map(s => ({
    url: `/skills/${s.slug}`,
    changefreq: 'monthly' as const,
    priority: '0.7',
  })),
];

const glossaryTermPages = terms.map(t => ({
  url: `/pages/glossary/${slugifyTerm(t.term)}`,
  changefreq: 'monthly' as const,
  priority: '0.6',
}));

const pages = [
  { url: '/',                                      changefreq: 'weekly',  priority: '1.0' },
  { url: '/collections/all',                       changefreq: 'weekly',  priority: '0.9' },
  { url: '/products/foundation-pro',               changefreq: 'monthly', priority: '0.9' },
  { url: '/products/longevity-protocol',           changefreq: 'monthly', priority: '0.9' },
  { url: '/products/founder-stack',                changefreq: 'monthly', priority: '0.9' },
  { url: '/pages/welcome',                         changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/workflow-library',                changefreq: 'weekly',  priority: '0.8' },
  { url: '/pages/stack-dna',                       changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog',                            changefreq: 'weekly',  priority: '0.8' },
  { url: '/pages/blog/future-of-automation-engineering-team',                    changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/the-plumber-paradox-why-free-tools-need-paid-experts',     changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/how-a-dental-group-saved-60-percent-front-desk-time',      changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/your-crm-is-lying-to-you-data-quality-automation',         changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/ai-agents-in-2026-what-actually-works',                    changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/calculating-automation-roi-the-honest-guide',              changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/n8n-vs-make-vs-zapier-honest-comparison',                  changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/scaling-without-hiring-the-automation-playbook',           changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/how-we-automated-a-45-client-marketing-agency-in-6-weeks', changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/n8n-vs-make-vs-zapier-500-production-deployments',         changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/7-automation-mistakes-that-kill-roi',                      changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/ai-agents-in-production-what-actually-works',              changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/how-a-dental-group-cut-patient-admin-by-60-percent',       changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/the-operations-stack-we-recommend-for-scaling-startups-2026', changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/webhook-vs-polling-automation-architecture-decision',      changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog/building-24-7-error-handling-system-for-automations',      changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/faq',                             changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/about-us',                        changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/contact-us',                      changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/science',                           changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/quality',                           changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/ingredients',                       changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/wall-of-health',                    changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/purist-vs-green-powders',           changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/purist-vs-multivitamins',           changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/purist-vs-meal-replacements',       changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/demo',                            changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/impact',                          changefreq: 'monthly', priority: '0.6' },
  { url: '/pages/glossary',                        changefreq: 'weekly',  priority: '0.8' },
  { url: '/pages/press',                           changefreq: 'monthly', priority: '0.5' },
  { url: '/pages/refer',                           changefreq: 'monthly', priority: '0.5' },
  { url: '/pages/ambassador-program',              changefreq: 'monthly', priority: '0.5' },
  { url: '/pages/ai-readiness',                    changefreq: 'monthly', priority: '0.6' },
  { url: '/pages/status',                          changefreq: 'daily',   priority: '0.4' },
  { url: '/pages/returns',                         changefreq: 'monthly', priority: '0.4' },
  { url: '/pages/privacy-policy',                  changefreq: 'monthly', priority: '0.3' },
  { url: '/pages/terms-of-service',                changefreq: 'monthly', priority: '0.3' },
  { url: '/pages/accessibility',                   changefreq: 'monthly', priority: '0.3' },
];

const now = new Date().toISOString().split('T')[0];

const allPages = [...pages, ...skillPages, ...glossaryTermPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${site}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

export function GET() {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
