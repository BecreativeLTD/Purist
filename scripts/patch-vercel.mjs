import { readFileSync, writeFileSync } from 'fs';

// 1. Patch runtime to nodejs20.x
const vcConfig = '.vercel/output/functions/_render.func/.vc-config.json';
try {
  const c = JSON.parse(readFileSync(vcConfig));
  c.runtime = 'nodejs20.x';
  writeFileSync(vcConfig, JSON.stringify(c, null, '\t'));
  console.log('[patch] runtime → nodejs20.x');
} catch (e) {
  console.log('[patch] vc-config not found, skipping');
}

// 2. Reorder config.json so SSR routes come BEFORE handle:filesystem
const cfgPath = '.vercel/output/config.json';
try {
  const cfg = JSON.parse(readFileSync(cfgPath));

  // Separate routes into: before-filesystem, filesystem-handle, after-filesystem (SSR dests)
  const cacheHeaders = cfg.routes.filter(r => r.headers && !r.dest);
  const ssrRoutes = cfg.routes.filter(r => r.dest === '_render');
  const otherRoutes = cfg.routes.filter(r => !r.headers && !r.dest && !r.handle);

  cfg.routes = [
    ...cacheHeaders,   // _astro static cache headers
    ...ssrRoutes,      // SSR routes FIRST (before filesystem)
    { handle: 'filesystem' }, // then filesystem
    ...otherRoutes,    // then anything else
  ];

  writeFileSync(cfgPath, JSON.stringify(cfg, null, '  '));
  console.log('[patch] SSR routes moved before handle:filesystem');
  console.log('[patch] Final routes:', JSON.stringify(cfg.routes, null, 2));
} catch (e) {
  console.log('[patch] config.json patch failed:', e.message);
}
