#!/usr/bin/env python3
"""Generate SVG press-logo wordmarks + charity bg + video poster atmospherics."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public' / 'images'
DATA = ROOT / 'src' / 'data'

# ---------- PRESS LOGOS (elegant wordmark placeholders) ----------
PRESS = [
    {'name': '[Business Magazine]', 'mark': 'BUSINESS',     'sub': 'MAGAZINE',     'style': 'condensed'},
    {'name': '[Financial Daily]',   'mark': 'FINANCIAL',    'sub': 'DAILY',        'style': 'serif'},
    {'name': '[Morning TV]',        'mark': 'MORNING',      'sub': 'TODAY',        'style': 'serif-bold'},
    {'name': '[National Paper]',    'mark': 'THE TIMES',    'sub': '',             'style': 'serif-bold'},
    {'name': '[Wellness Outlet]',   'mark': 'WELLNESS',     'sub': 'WEEKLY',       'style': 'modern'},
    {'name': '[Lifestyle Magazine]','mark': 'LIFESTYLE',    'sub': 'NO. 12',       'style': 'serif'},
]

def press_svg(mark: str, sub: str, style: str) -> str:
    """600x180 wordmark on transparent bg, dark grayscale, brand-neutral."""
    if style == 'serif-bold':
        return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180" width="600" height="180">
  <rect width="600" height="180" fill="transparent"/>
  <text x="300" y="115" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="64"
        fill="#1a1a1a" font-weight="700" letter-spacing="-1">{mark}</text>
  {('<text x="300" y="148" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#6B6B6B" letter-spacing="6">' + sub + '</text>') if sub else ''}
</svg>"""
    if style == 'serif':
        return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180" width="600" height="180">
  <rect width="600" height="180" fill="transparent"/>
  <line x1="60" y1="46" x2="540" y2="46" stroke="#1a1a1a" stroke-width="1"/>
  <text x="300" y="115" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="56"
        fill="#1a1a1a" font-style="italic" font-weight="500" letter-spacing="0">{mark}</text>
  {('<text x="300" y="148" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6B6B6B" letter-spacing="8">' + sub + '</text>') if sub else ''}
  <line x1="60" y1="160" x2="540" y2="160" stroke="#1a1a1a" stroke-width="1"/>
</svg>"""
    if style == 'condensed':
        return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180" width="600" height="180">
  <rect width="600" height="180" fill="transparent"/>
  <text x="300" y="105" text-anchor="middle"
        font-family="Inter, 'Helvetica Neue', sans-serif" font-size="58"
        fill="#1a1a1a" font-weight="900" letter-spacing="-2"
        transform="scale(1, 1.05) translate(0, -5)">{mark}</text>
  {('<text x="300" y="148" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#6B6B6B" letter-spacing="6" font-weight="500">' + sub + '</text>') if sub else ''}
</svg>"""
    if style == 'modern':
        return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180" width="600" height="180">
  <rect width="600" height="180" fill="transparent"/>
  <circle cx="80" cy="90" r="14" fill="#1a1a1a"/>
  <text x="300" y="108" text-anchor="middle"
        font-family="Inter, sans-serif" font-size="42"
        fill="#1a1a1a" font-weight="300" letter-spacing="8">{mark}</text>
  {('<text x="300" y="138" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6B6B6B" letter-spacing="6" font-weight="500">' + sub + '</text>') if sub else ''}
</svg>"""
    # default fallback
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180" width="600" height="180"><text x="300" y="100" text-anchor="middle" font-family="Georgia,serif" font-size="40">{mark}</text></svg>'


def process_press():
    out_dir = PUBLIC / 'press'
    out_dir.mkdir(parents=True, exist_ok=True)
    logos = []
    for i, p in enumerate(PRESS):
        slug = p['mark'].lower().replace(' ', '-')
        out = out_dir / f"{slug}.svg"
        out.write_text(press_svg(p['mark'], p['sub'], p['style']))
        logos.append({'name': p['name'], 'src': f"/images/press/{slug}.svg"})
    data = {'logos': logos}
    (DATA / 'press-logos.json').write_text(json.dumps(data, indent=2, ensure_ascii=False))
    print(f"  press logos: {len(logos)}")


# ---------- CHARITY PARTNERSHIP BG ----------
def write_charity_bg():
    """Atmospheric warm dark scene with brand-rust glow, no specific figure."""
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1200" width="2000" height="1200" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="cbase" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="50%" stop-color="#0A0A0A"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <radialGradient id="cglow" cx="0.65" cy="0.4" r="0.55">
      <stop offset="0%" stop-color="#A0522D" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#A0522D" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#A0522D" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cglow2" cx="0.85" cy="0.7" r="0.4">
      <stop offset="0%" stop-color="#2D5016" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#2D5016" stop-opacity="0"/>
    </radialGradient>
    <filter id="cgrain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9"/>
      <feColorMatrix values="0 0 0 0 0.9  0 0 0 0 0.85  0 0 0 0 0.8  0 0 0 0.06 0"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="2000" height="1200" fill="url(#cbase)"/>
  <rect width="2000" height="1200" fill="url(#cglow)"/>
  <rect width="2000" height="1200" fill="url(#cglow2)"/>

  <!-- abstract topography lines suggesting "global reach" -->
  <g stroke="#A0522D" stroke-width="0.5" fill="none" opacity="0.16">
    <path d="M 0 700 Q 500 640 1000 680 T 2000 700"/>
    <path d="M 0 760 Q 500 700 1000 740 T 2000 760"/>
    <path d="M 0 820 Q 500 760 1000 800 T 2000 820"/>
    <path d="M 0 880 Q 500 820 1000 860 T 2000 880"/>
    <path d="M 0 940 Q 500 880 1000 920 T 2000 940"/>
  </g>

  <!-- soft dotted constellation -->
  <g fill="#F8F6F1" opacity="0.35">
    <circle cx="320" cy="280" r="2"/>
    <circle cx="540" cy="220" r="1.5"/>
    <circle cx="720" cy="320" r="2.5"/>
    <circle cx="1080" cy="240" r="2"/>
    <circle cx="1340" cy="300" r="1.5"/>
    <circle cx="1620" cy="260" r="2"/>
    <circle cx="1820" cy="340" r="1.5"/>
    <circle cx="420" cy="420" r="1.5"/>
    <circle cx="880" cy="380" r="2"/>
    <circle cx="1240" cy="450" r="1.5"/>
  </g>

  <rect width="2000" height="1200" filter="url(#cgrain)" opacity="0.6"/>
</svg>"""
    out = PUBLIC / 'hero' / 'charity-bg.svg'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(svg)
    print('  charity bg: 1')


# ---------- VIDEO POSTER ----------
def write_video_poster():
    """Cinematic warm-dark poster with a soft pot silhouette + play affordance hint."""
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="vbase" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#0A0A0A"/>
    </linearGradient>
    <radialGradient id="vspot" cx="0.5" cy="0.45" r="0.45">
      <stop offset="0%" stop-color="#F4EFE6" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#F4EFE6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vwarm" cx="0.8" cy="0.2" r="0.5">
      <stop offset="0%" stop-color="#A0522D" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#A0522D" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vjar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0A0A0A"/>
      <stop offset="50%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#0A0A0A"/>
    </linearGradient>
    <filter id="vgrain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4"/>
      <feColorMatrix values="0 0 0 0 0.95  0 0 0 0 0.9  0 0 0 0 0.85  0 0 0 0.05 0"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>

  <rect width="1920" height="1080" fill="url(#vbase)"/>
  <rect width="1920" height="1080" fill="url(#vspot)"/>
  <rect width="1920" height="1080" fill="url(#vwarm)"/>

  <!-- soft floor reflection line -->
  <line x1="0" y1="820" x2="1920" y2="820" stroke="#F4EFE6" stroke-width="0.5" opacity="0.06"/>

  <!-- distant jar silhouette, very soft -->
  <g opacity="0.22" transform="translate(820, 400)">
    <rect x="40" y="0" width="200" height="36" rx="4" fill="url(#vjar)"/>
    <rect x="20" y="40" width="240" height="380" rx="6" fill="url(#vjar)"/>
    <rect x="60" y="120" width="160" height="220" rx="3" fill="#F8F6F1" opacity="0.08"/>
  </g>

  <!-- caption line -->
  <text x="960" y="980" text-anchor="middle" font-family="Georgia, serif" font-size="22"
        fill="#F8F6F1" opacity="0.5" letter-spacing="3">INSIDE · THE · FORMULA</text>

  <rect width="1920" height="1080" filter="url(#vgrain)" opacity="0.6"/>
</svg>"""
    out = PUBLIC / 'video' / 'poster.svg'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(svg)
    print('  video poster: 1')


if __name__ == '__main__':
    print('Generating press + atmospheric assets…')
    process_press()
    write_charity_bg()
    write_video_poster()
    print('Done.')
