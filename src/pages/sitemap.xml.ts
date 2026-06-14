export const prerender = true;

import skillsData from '~/data/skills.json';
import { terms, slugifyTerm } from '~/data/glossary';
import blogData from '~/data/blog.json';

const site = 'https://www.purist.online';

const skillPages = [
  { url: '/skills', changefreq: 'weekly', priority: '0.9' },
  ...skillsData.skills.map(s => ({
    url: `/skills/${s.slug}`,
    changefreq: 'monthly' as const,
    priority: '0.8',
  })),
];

const glossaryTermPages = terms.map(t => ({
  url: `/pages/glossary/${slugifyTerm(t.term)}`,
  changefreq: 'monthly' as const,
  priority: '0.6',
}));

const blogPages = blogData.articles.map(a => ({
  url: `/pages/blog/${a.slug}`,
  changefreq: 'monthly' as const,
  priority: '0.7',
}));

const pages = [
  { url: '/',                                    changefreq: 'weekly',  priority: '1.0' },
  { url: '/collections/all',                     changefreq: 'weekly',  priority: '0.9' },
  { url: '/collections/core-services',           changefreq: 'weekly',  priority: '0.8' },
  { url: '/collections/merchandise',             changefreq: 'weekly',  priority: '0.7' },
  { url: '/products/foundation-pro',             changefreq: 'monthly', priority: '0.9' },
  { url: '/products/longevity-protocol',         changefreq: 'monthly', priority: '0.9' },
  { url: '/products/founder-stack',              changefreq: 'monthly', priority: '0.9' },
  { url: '/pages/welcome',                       changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/onboarding',                    changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/workflow-library',              changefreq: 'weekly',  priority: '0.8' },
  { url: '/pages/stack-dna',                     changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/blog',                          changefreq: 'weekly',  priority: '0.8' },
  { url: '/pages/faq',                           changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/about-us',                      changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/contact-us',                    changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/science',                       changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/quality',                       changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/ingredients',                   changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/wall-of-health',                changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/purist-vs-green-powders',       changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/purist-vs-multivitamins',       changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/purist-vs-meal-replacements',   changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/demo',                          changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/automation-maturity',           changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/true-cost',                     changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/automation-playbook',           changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/sop-converter',                 changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/impact',                        changefreq: 'monthly', priority: '0.6' },
  { url: '/pages/glossary',                      changefreq: 'weekly',  priority: '0.8' },
  { url: '/pages/press',                         changefreq: 'monthly', priority: '0.5' },
  { url: '/pages/refer',                         changefreq: 'monthly', priority: '0.5' },
  { url: '/pages/ambassador-program',            changefreq: 'monthly', priority: '0.5' },
  { url: '/pages/ai-readiness',                  changefreq: 'monthly', priority: '0.6' },
  { url: '/pages/fable-5',                       changefreq: 'monthly', priority: '0.7' },
  { url: '/pages/docs',                          changefreq: 'monthly', priority: '0.6' },
  { url: '/pages/services',                       changefreq: 'monthly', priority: '0.9' },
  { url: '/pages/n8n-agency',                    changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/automation-consultant',         changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/workflow-automation-services',  changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/ai-agent-development',          changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/zapier-alternative-agency',     changefreq: 'monthly', priority: '0.8' },
  { url: '/pages/site-audit',                     changefreq: 'monthly', priority: '0.9' },
  { url: '/pages/status',                        changefreq: 'daily',   priority: '0.4' },
  { url: '/pages/returns',                       changefreq: 'monthly', priority: '0.4' },
  { url: '/pages/privacy-policy',                changefreq: 'monthly', priority: '0.3' },
  { url: '/pages/terms-of-service',              changefreq: 'monthly', priority: '0.3' },
  { url: '/pages/accessibility',                 changefreq: 'monthly', priority: '0.3' },
];

const now = new Date().toISOString().split('T')[0];
const allPages = [...pages, ...blogPages, ...skillPages, ...glossaryTermPages];

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
