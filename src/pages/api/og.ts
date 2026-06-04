import { ImageResponse } from '@vercel/og';

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') ?? 'Production-grade business automation';
  const description = url.searchParams.get('description') ?? 'Workflow automation and AI agents deployed in days. 99.97% uptime. 500+ production deployments.';
  const type = url.searchParams.get('type') ?? 'default';

  const shortDesc = description.length > 110 ? description.slice(0, 110) + '…' : description;
  const titleSize = title.length > 55 ? 40 : title.length > 35 ? 48 : 56;

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0A0A0A',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [

          // ── Giant watermark wordmark (like footer) ──
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: -30,
                left: 50,
                fontSize: 240,
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 0.85,
                color: '#E8B4B0',
                opacity: 0.13,
                userSelect: 'none',
                fontFamily: 'Georgia, serif',
              },
              children: 'PURIST',
            },
          },

          // ── Top bar: wordmark + badge ──
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '48px 64px 0 64px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 52,
                      fontWeight: 500,
                      color: '#ffffff',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      fontFamily: 'Georgia, serif',
                    },
                    children: 'PURIST®',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#E8B4B0',
                      background: 'rgba(232,180,176,0.10)',
                      border: '1px solid rgba(232,180,176,0.25)',
                      borderRadius: 100,
                      padding: '6px 16px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    },
                    children: type === 'article' ? 'Blog · purist.online' : 'purist.online',
                  },
                },
              ],
            },
          },

          // ── Middle: title + description ──
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                flex: 1,
                justifyContent: 'center',
                padding: '0 64px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: titleSize,
                      fontWeight: 400,
                      color: '#ffffff',
                      lineHeight: 1.1,
                      letterSpacing: '-0.025em',
                      maxWidth: 960,
                    },
                    children: title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 17,
                      color: 'rgba(255,255,255,0.42)',
                      lineHeight: 1.55,
                      maxWidth: 740,
                    },
                    children: shortDesc,
                  },
                },
              ],
            },
          },

          // ── Bottom: stats + CTA ──
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 64px 48px 64px',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', gap: 44, alignItems: 'center' },
                    children: [
                      ...[
                        { n: '500+', l: 'Deployments' },
                        { n: '99.97%', l: 'Uptime' },
                        { n: '14h', l: 'Saved / week' },
                      ].map(s => ({
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', gap: 3 },
                          children: [
                            { type: 'div', props: { style: { fontSize: 22, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.015em' }, children: s.n } },
                            { type: 'div', props: { style: { fontSize: 10, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.16em', textTransform: 'uppercase' }, children: s.l } },
                          ],
                        },
                      })),
                    ],
                  },
                },
                // CTA pill
                {
                  type: 'div',
                  props: {
                    style: {
                      background: '#E8B4B0',
                      color: '#0A0A0A',
                      fontSize: 13,
                      fontWeight: 700,
                      padding: '12px 24px',
                      borderRadius: 12,
                      letterSpacing: '-0.01em',
                    },
                    children: 'purist.online →',
                  },
                },
              ],
            },
          },

        ],
      },
    },
    { width: 1200, height: 630 },
  );
}
