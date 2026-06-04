import { ImageResponse } from '@vercel/og';

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') ?? 'Production-grade business automation';
  const description = url.searchParams.get('description') ?? 'Workflow automation and AI agents deployed in days. 99.97% uptime. 500+ production deployments.';
  const type = url.searchParams.get('type') ?? 'default'; // 'article' | 'default'

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0A',
          padding: '60px 70px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        },
        children: [
          // Top: logo + eyebrow
          {
            type: 'div',
            props: {
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
              children: [
                // Wordmark
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 28,
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                      fontFamily: 'Georgia, serif',
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
                      color: '#E8B4B0',
                      background: 'rgba(232,180,176,0.10)',
                      border: '1px solid rgba(232,180,176,0.25)',
                      borderRadius: 100,
                      padding: '5px 14px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    },
                    children: type === 'article' ? 'Blog' : 'purist.online',
                  },
                },
              ],
            },
          },

          // Middle: title
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'center', paddingTop: 40, paddingBottom: 40 },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: title.length > 60 ? 38 : 48,
                      fontWeight: 400,
                      color: '#ffffff',
                      lineHeight: 1.12,
                      letterSpacing: '-0.025em',
                      maxWidth: 900,
                    },
                    children: title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 18,
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.55,
                      maxWidth: 780,
                    },
                    children: description.length > 120 ? description.slice(0, 120) + '…' : description,
                  },
                },
              ],
            },
          },

          // Bottom: stats strip
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 28,
                borderTop: '1px solid rgba(255,255,255,0.08)',
              },
              children: [
                // Stats
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', gap: 40 },
                    children: [
                      ...[
                        { n: '500+', l: 'Deployments' },
                        { n: '99.97%', l: 'Uptime' },
                        { n: '14h', l: 'Saved/week' },
                      ].map(s => ({
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', gap: 2 },
                          children: [
                            { type: 'div', props: { style: { fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }, children: s.n } },
                            { type: 'div', props: { style: { fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase' }, children: s.l } },
                          ],
                        },
                      })),
                    ],
                  },
                },
                // Pink accent dot
                {
                  type: 'div',
                  props: {
                    style: { width: 48, height: 48, borderRadius: 24, background: '#E8B4B0' },
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
