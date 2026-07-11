export const prerender = true;

import skillsData from '~/data/skills.json';
import { terms } from '~/data/glossary';
import blogData from '~/data/blog.json';
import { professions } from '~/data/automations';

const site = 'https://www.purist.online';

const skillPages = [
  { url: '/skills', lastmod: '2026-06-18' },
  ...skillsData.skills.map(s => ({
    url: `/skills/${s.slug}`,
    lastmod: '2026-06-18',
  })),
];

const glossaryTermPages = terms.map(t => ({
  url: `/pages/glossary/${t.slug}`,
  lastmod: '2026-06-18',
}));

const blogPages = blogData.articles.map(a => ({
  url: `/pages/blog/${a.slug}`,
  lastmod: '2026-07-11',
}));

const pages = [
  { url: '/',                                    lastmod: '2026-06-18' },
  { url: '/pages/pricing',                        lastmod: '2026-06-18' },
  { url: '/pages/packages',                      lastmod: '2026-06-18' },
  { url: '/pages/add-ons',                       lastmod: '2026-06-18' },
  { url: '/plans/automation-pro',                lastmod: '2026-06-18' },
  { url: '/plans/ai-agent-deploy',               lastmod: '2026-06-18' },
  { url: '/plans/full-stack',                    lastmod: '2026-06-18' },
  { url: '/pages/workflow-library',              lastmod: '2026-06-18' },
  { url: '/pages/stack-dna',                     lastmod: '2026-06-18' },
  { url: '/pages/blog',                          lastmod: '2026-06-18' },
  { url: '/pages/faq',                           lastmod: '2026-06-18' },
  { url: '/pages/about-us',                      lastmod: '2026-06-18' },
  { url: '/pages/contact-us',                    lastmod: '2026-06-18' },
  { url: '/pages/methodology',                   lastmod: '2026-06-18' },
  { url: '/pages/our-standards',                 lastmod: '2026-06-18' },
  { url: '/pages/integrations',                  lastmod: '2026-06-18' },
  { url: '/pages/client-results',                lastmod: '2026-06-18' },
  { url: '/pages/purist-vs-zapier',               lastmod: '2026-06-18' },
  { url: '/pages/purist-vs-make',                lastmod: '2026-06-18' },
  { url: '/pages/purist-vs-inhouse-hire',        lastmod: '2026-06-18' },
  { url: '/pages/welcome',                        lastmod: '2026-06-18' },
  { url: '/pages/demo',                          lastmod: '2026-06-18' },
  { url: '/pages/automation-maturity',           lastmod: '2026-06-18' },
  { url: '/pages/true-cost',                     lastmod: '2026-06-18' },
  { url: '/pages/automation-playbook',           lastmod: '2026-06-18' },
  { url: '/pages/sop-converter',                 lastmod: '2026-06-18' },
  { url: '/pages/impact',                        lastmod: '2026-06-18' },
  { url: '/pages/glossary',                      lastmod: '2026-06-18' },
  { url: '/pages/press',                         lastmod: '2026-06-18' },
  { url: '/pages/refer',                         lastmod: '2026-06-18' },
  { url: '/pages/ambassador-program',            lastmod: '2026-06-18' },
  { url: '/pages/ai-readiness',                  lastmod: '2026-06-18' },
  { url: '/pages/fable-5',                       lastmod: '2026-06-18' },
  { url: '/pages/docs',                          lastmod: '2026-06-18' },
  { url: '/pages/services',                      lastmod: '2026-06-18' },
  { url: '/pages/case-studies',                  lastmod: '2026-07-02' },
  { url: '/pages/hermes-agent',                  lastmod: '2026-06-27' },
  { url: '/pages/research',                      lastmod: '2026-06-27' },
  { url: '/pages/n8n-agency',                    lastmod: '2026-06-18' },
  { url: '/pages/automation-consultant',         lastmod: '2026-06-18' },
  { url: '/pages/workflow-automation-guide',     lastmod: '2026-07-11' },
  { url: '/pages/business-automation-guide',     lastmod: '2026-07-11' },
  { url: '/pages/crm-sales-automation',          lastmod: '2026-07-11' },
  { url: '/pages/ai-agents-guide',               lastmod: '2026-07-11' },
  { url: '/pages/workflow-automation-services',  lastmod: '2026-06-18' },
  { url: '/pages/ai-agent-development',          lastmod: '2026-06-18' },
  { url: '/pages/zapier-alternative-agency',     lastmod: '2026-06-18' },
  { url: '/pages/site-audit',                    lastmod: '2026-06-18' },
  { url: '/pages/roi-calculator',                lastmod: '2026-06-18' },
  { url: '/pages/returns',                       lastmod: '2026-06-18' },
  { url: '/pages/privacy-policy',                lastmod: '2026-06-18' },
  { url: '/pages/terms-of-service',              lastmod: '2026-06-18' },
  { url: '/pages/accessibility',                 lastmod: '2026-06-18' },
];

const automationPages = [
  { url: '/pages/automation', lastmod: '2026-06-27' },
  ...professions.map(p => ({
    url: `/pages/automation/${p.slug}`,
    lastmod: '2026-06-27',
  })),
];

const allPages = [...pages, ...blogPages, ...skillPages, ...glossaryTermPages, ...automationPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${site}${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
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
