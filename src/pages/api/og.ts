import { ImageResponse } from '@vercel/og';

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') ?? 'Workflow Automation and AI Agents for Business';
  const description = url.searchParams.get('description') ?? '500+ production deployments across dental, real estate, agencies, e-commerce, legal and staffing. Deployed in days, 99.97% uptime.';
  const type = url.searchParams.get('type') ?? 'default';

  const shortDesc = description.length > 115 ? description.slice(0, 115) + '…' : description;
  const titleSize = title.length > 55 ? 40 : title.length > 35 ? 46 : 54;

  const displayFont = 'serif';

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
          fontFamily: displayFont,
          position: 'relative',
          overflow: 'hidden',
        },
        children: [

          // ── Giant PURIST watermark — identical to footer ──
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: -60,
                left: 40,
                fontSize: 280,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 0.85,
                color: 'rgba(232,180,176,0.70)',   // same as footer: brand-pink/70
                userSelect: 'none',
                fontFamily: displayFont,
              },
              children: 'PURIST',
            },
          },

          // ── Top bar: PURIST® wordmark + badge ──
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '48px 64px 0 64px',
                position: 'relative',
                zIndex: 10,
              },
              children: [
                // PURIST® in pink — same colour as footer watermark
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 48,
                      fontWeight: 500,
                      color: '#E8B4B0',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      fontFamily: displayFont,
                    },
                    children: 'PURIST®',
                  },
                },
                // Badge
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.55)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
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
                gap: 16,
                flex: 1,
                justifyContent: 'center',
                padding: '0 64px',
                position: 'relative',
                zIndex: 10,
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
                      fontFamily: displayFont,
                    },
                    children: title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 17,
                      color: 'rgba(255,255,255,0.40)',
                      lineHeight: 1.55,
                      maxWidth: 720,
                      fontFamily: 'Georgia, serif',
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
                padding: '22px 64px 44px 64px',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                position: 'relative',
                zIndex: 10,
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
                            { type: 'div', props: { style: { fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }, children: s.n } },
                            { type: 'div', props: { style: { fontSize: 9, color: 'rgba(255,255,255,0.30)', letterSpacing: '0.16em', textTransform: 'uppercase' }, children: s.l } },
                          ],
                        },
                      })),
                    ],
                  },
                },
                // CTA pill in pink
                {
                  type: 'div',
                  props: {
                    style: {
                      background: '#E8B4B0',
                      color: '#0A0A0A',
                      fontSize: 13,
                      fontWeight: 700,
                      padding: '11px 22px',
                      borderRadius: 10,
                      letterSpacing: '-0.01em',
                      fontFamily: 'Georgia, serif',
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
    {
      width: 1200,
      height: 630,
    },
  );
}
