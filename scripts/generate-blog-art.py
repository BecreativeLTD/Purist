#!/usr/bin/env python3
"""Generate brand-aligned SVG hero illustrations for blog articles.
Each article gets a category-themed atmospheric composition.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public' / 'images' / 'blog'
DATA = ROOT / 'src' / 'data' / 'blog.json'

# Category-specific palettes (top, mid, accent)
CAT_PALETTE = {
    'wellness':            ('#F8F6F1', '#EDE5D5', '#A0522D'),
    'space-science':       ('#1a1a1a', '#0A0A0A', '#A0522D'),
    'disease-prevention':  ('#F4EFE6', '#E8DCC5', '#2D5016'),
    'gut-health':          ('#F8F6F1', '#EDE5D5', '#A0522D'),
    'healthy-aging':       ('#F4EFE6', '#D4C8B0', '#0A0A0A'),
    'general-health':      ('#F8F6F1', '#E8DCC5', '#2D5016'),
    'nutritional-science': ('#F4EFE6', '#EDE5D5', '#A0522D'),
}

CAT_LABEL = {
    'wellness':            'WELLNESS',
    'space-science':       'SPACE SCIENCE',
    'disease-prevention':  'DISEASE PREVENTION',
    'gut-health':          'GUT HEALTH',
    'healthy-aging':       'HEALTHY AGING',
    'general-health':      'GENERAL HEALTH',
    'nutritional-science': 'NUTRITIONAL SCIENCE',
}

def shape_for(category: str) -> str:
    """Return an SVG fragment with a category-themed abstract motif."""
    if category == 'space-science':
        # constellation + arc suggesting orbit
        return """
  <g opacity="0.4">
    <circle cx="900" cy="280" r="180" fill="none" stroke="#F8F6F1" stroke-width="0.6"/>
    <circle cx="900" cy="280" r="120" fill="none" stroke="#F8F6F1" stroke-width="0.4"/>
    <circle cx="900" cy="280" r="60" fill="#F8F6F1" opacity="0.18"/>
  </g>
  <g fill="#F8F6F1" opacity="0.7">
    <circle cx="280" cy="120" r="2"/>
    <circle cx="420" cy="200" r="1.5"/>
    <circle cx="580" cy="100" r="2.5"/>
    <circle cx="700" cy="220" r="1.5"/>
    <circle cx="200" cy="380" r="2"/>
    <circle cx="350" cy="460" r="1.5"/>
    <circle cx="1100" cy="180" r="2"/>
    <circle cx="1300" cy="380" r="1.5"/>
  </g>"""
    if category == 'gut-health':
        # organic curved lines
        return """
  <g stroke="#A0522D" stroke-width="1.2" fill="none" opacity="0.25">
    <path d="M 100 360 C 300 240, 500 480, 700 360 S 1100 240, 1300 360"/>
    <path d="M 100 420 C 300 300, 500 540, 700 420 S 1100 300, 1300 420"/>
    <path d="M 100 480 C 300 360, 500 600, 700 480 S 1100 360, 1300 480"/>
  </g>
  <g fill="#A0522D" opacity="0.4">
    <circle cx="280" cy="200" r="42"/>
    <circle cx="380" cy="240" r="28"/>
    <circle cx="450" cy="180" r="18"/>
  </g>"""
    if category == 'healthy-aging':
        # concentric arcs suggesting growth rings
        return """
  <g fill="none" stroke="#0A0A0A" stroke-width="0.8" opacity="0.18">
    <circle cx="700" cy="340" r="60"/>
    <circle cx="700" cy="340" r="110"/>
    <circle cx="700" cy="340" r="160"/>
    <circle cx="700" cy="340" r="220"/>
    <circle cx="700" cy="340" r="280"/>
    <circle cx="700" cy="340" r="340"/>
  </g>"""
    if category == 'disease-prevention':
        # shield-like emblem
        return """
  <g opacity="0.32" transform="translate(700, 340)">
    <path d="M 0 -180 L 140 -120 L 140 60 Q 140 160 0 220 Q -140 160 -140 60 L -140 -120 Z" fill="none" stroke="#2D5016" stroke-width="1.5"/>
    <path d="M 0 -140 L 110 -90 L 110 50 Q 110 130 0 180 Q -110 130 -110 50 L -110 -90 Z" fill="#2D5016" opacity="0.18"/>
    <path d="M -50 20 L -10 60 L 60 -20" stroke="#2D5016" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>"""
    if category == 'wellness':
        # leaf + sun
        return """
  <g opacity="0.3" transform="translate(820, 280)">
    <circle r="120" fill="none" stroke="#A0522D" stroke-width="1"/>
    <circle r="80" fill="#A0522D" opacity="0.25"/>
  </g>
  <g transform="translate(380, 380) rotate(-15)" opacity="0.55">
    <ellipse cx="0" cy="0" rx="180" ry="60" fill="#2D5016" opacity="0.35"/>
    <line x1="-180" y1="0" x2="180" y2="0" stroke="#1d3a0a" stroke-width="0.6"/>
  </g>"""
    if category == 'nutritional-science':
        # molecular structure
        return """
  <g opacity="0.32" transform="translate(700, 340)">
    <line x1="-180" y1="-100" x2="0" y2="0" stroke="#A0522D" stroke-width="1"/>
    <line x1="0" y1="0" x2="180" y2="-100" stroke="#A0522D" stroke-width="1"/>
    <line x1="0" y1="0" x2="-100" y2="120" stroke="#A0522D" stroke-width="1"/>
    <line x1="0" y1="0" x2="100" y2="120" stroke="#A0522D" stroke-width="1"/>
    <line x1="-180" y1="-100" x2="-260" y2="-180" stroke="#A0522D" stroke-width="1"/>
    <line x1="180" y1="-100" x2="260" y2="-180" stroke="#A0522D" stroke-width="1"/>
    <circle cx="0" cy="0" r="14" fill="#A0522D"/>
    <circle cx="-180" cy="-100" r="10" fill="#A0522D" opacity="0.7"/>
    <circle cx="180" cy="-100" r="10" fill="#A0522D" opacity="0.7"/>
    <circle cx="-100" cy="120" r="8" fill="#A0522D" opacity="0.6"/>
    <circle cx="100" cy="120" r="8" fill="#A0522D" opacity="0.6"/>
    <circle cx="-260" cy="-180" r="6" fill="#A0522D" opacity="0.5"/>
    <circle cx="260" cy="-180" r="6" fill="#A0522D" opacity="0.5"/>
  </g>"""
    # default — general health, simple radiating sun
    return """
  <g opacity="0.32" transform="translate(700, 340)">
    <circle r="100" fill="#2D5016" opacity="0.2"/>
    <circle r="70" fill="#2D5016" opacity="0.35"/>
    <g stroke="#2D5016" stroke-width="1">
      <line x1="-160" y1="0" x2="-130" y2="0"/>
      <line x1="160" y1="0" x2="130" y2="0"/>
      <line x1="0" y1="-160" x2="0" y2="-130"/>
      <line x1="0" y1="160" x2="0" y2="130"/>
      <line x1="-110" y1="-110" x2="-90" y2="-90"/>
      <line x1="110" y1="-110" x2="90" y2="-90"/>
      <line x1="-110" y1="110" x2="-90" y2="90"/>
      <line x1="110" y1="110" x2="90" y2="90"/>
    </g>
  </g>"""


def blog_svg(category: str, title_short: str) -> str:
    top, mid, accent = CAT_PALETTE.get(category, ('#F4EFE6', '#EDE5D5', '#A0522D'))
    is_dark = category == 'space-science'
    text_fill = '#F8F6F1' if is_dark else '#0A0A0A'
    label_fill = '#F8F6F1' if is_dark else '#6B6B6B'
    motif = shape_for(category)
    label = CAT_LABEL.get(category, 'INSIGHT')

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 720" width="1400" height="720" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{top}"/>
      <stop offset="100%" stop-color="{mid}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.7" cy="0.3" r="0.6">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/>
      <feColorMatrix values="0 0 0 0 0.6  0 0 0 0 0.55  0 0 0 0 0.48  0 0 0 0.06 0"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>

  <rect width="1400" height="720" fill="url(#bg)"/>
  <rect width="1400" height="720" fill="url(#glow)"/>

  {motif}

  <text x="80" y="620" font-family="Inter, sans-serif" font-size="14"
        fill="{label_fill}" letter-spacing="4" font-weight="500">{label}</text>
  <text x="80" y="670" font-family="Georgia, serif" font-size="36"
        fill="{text_fill}" font-weight="500">PURIST · The Healthspan Blog</text>

  <rect width="1400" height="720" filter="url(#grain)" opacity="0.5"/>
</svg>
"""


if __name__ == '__main__':
    PUBLIC.mkdir(parents=True, exist_ok=True)
    data = json.loads(DATA.read_text())
    count = 0
    for article in data['articles']:
        cat = article['category']
        img_path = article['image']  # e.g. /images/blog/sleep.svg
        filename = img_path.split('/')[-1]
        out = PUBLIC / filename
        out.write_text(blog_svg(cat, article['title'][:40]))
        count += 1
    print(f"  blog illustrations: {count}")
