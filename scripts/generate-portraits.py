#!/usr/bin/env python3
"""
Generate brand-aligned SVG portrait placeholders for athletes, advisors,
testimonials and the founder. Each portrait uses a soft cream/sand gradient,
a subtle silhouette suggesting head + shoulders, a category-keyed accent colour
and the name + role rendered inside the SVG (so it's clearly a placeholder).

Run from project root:
    python3 scripts/generate-portraits.py
"""
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public' / 'images'
DATA = ROOT / 'src' / 'data'

# Palette presets per category (top, bottom, halo, silhouette)
PALETTES = {
    'athletic': ('#F4EFE6', '#E0D2B8', '#A0522D', '#3a2818'),
    'medical':  ('#F8F6F1', '#E8E4D8', '#2D5016', '#1f1f1f'),
    'founder':  ('#EDE5D5', '#D4C8B0', '#0A0A0A', '#1a1a1a'),
    'creative': ('#F4EFE6', '#E8DCC5', '#A0522D', '#2a2a2a'),
}

def palette_for(role: str) -> tuple:
    r = (role or '').lower()
    if any(k in r for k in ['physician', 'md', 'oncolog', 'cardio', 'doctor',
                            'nutrition', 'dietit', 'medicine', 'microbiome',
                            'agency', 'longevity', 'ortho', 'sports medicine',
                            'integrative']):
        return PALETTES['medical']
    if any(k in r for k in ['founder', 'author', 'co-found']):
        return PALETTES['founder']
    if any(k in r for k in ['coach', 'biohacker', 'optim']):
        return PALETTES['creative']
    return PALETTES['athletic']  # default for athletes


def svg_portrait(name: str, role: str, palette: tuple, seed: int = 3) -> str:
    top, bot, halo, sil = palette

    # text escaping: handle [Brackets]
    safe_name = (name or '').replace('&', '&amp;').replace('<', '&lt;')
    safe_role = (role or '').replace('&', '&amp;').replace('<', '&lt;').upper()

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{top}"/>
      <stop offset="100%" stop-color="{bot}"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.32" r="0.55">
      <stop offset="0%" stop-color="{halo}" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="{halo}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.85">
      <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.10"/>
    </radialGradient>
    <linearGradient id="silGrad" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="{sil}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="{sil}" stop-opacity="0.36"/>
    </linearGradient>
    <filter id="grain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="{seed}"/>
      <feColorMatrix values="0 0 0 0 0.6  0 0 0 0 0.55  0 0 0 0 0.48  0 0 0 0.06 0"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
    <filter id="silShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="12"/>
      <feOffset dx="0" dy="6"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.10"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#bg)"/>
  <rect width="600" height="800" fill="url(#halo)"/>

  <!-- horizontal surface line suggesting depth -->
  <line x1="0" y1="560" x2="600" y2="560" stroke="#0A0A0A" stroke-width="0.5" opacity="0.07"/>

  <!-- abstracted head + shoulders silhouette (very soft) -->
  <g filter="url(#silShadow)">
    <ellipse cx="300" cy="230" rx="98" ry="116" fill="url(#silGrad)"/>
    <rect x="266" y="328" width="68" height="46" fill="url(#silGrad)"/>
    <path d="M 130 410 Q 220 360 300 360 Q 380 360 470 410 L 510 560 L 90 560 Z" fill="url(#silGrad)"/>
  </g>

  <!-- soft accent shape behind shoulders -->
  <circle cx="300" cy="240" r="160" fill="none" stroke="{halo}" stroke-width="0.8" opacity="0.18"/>

  <!-- decorative thin line above name -->
  <line x1="240" y1="650" x2="360" y2="650" stroke="#0A0A0A" stroke-width="0.6" opacity="0.4"/>

  <!-- name + role -->
  <text x="300" y="690" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="26"
        fill="#0A0A0A" font-weight="500">{safe_name}</text>
  <text x="300" y="722" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="10"
        fill="#6B6B6B" letter-spacing="2.2">{safe_role}</text>

  <!-- vignette + grain -->
  <rect width="600" height="800" fill="url(#vignette)"/>
  <rect width="600" height="800" filter="url(#grain)" opacity="0.55"/>
</svg>
"""


def write_svg(path: Path, name: str, role: str, seed: int = 3):
    palette = palette_for(role)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(svg_portrait(name, role, palette, seed))


def process_athletes():
    data = json.loads((DATA / 'athletes.json').read_text())
    updated = []
    for i, a in enumerate(data['athletes']):
        out = PUBLIC / 'athletes' / f"{a['id']}.svg"
        write_svg(out, a['name'], a['role'], seed=i + 1)
        a['image'] = f"/images/athletes/{a['id']}.svg"
        updated.append(a)
    data['athletes'] = updated
    (DATA / 'athletes.json').write_text(json.dumps(data, indent=2, ensure_ascii=False))
    print(f"  athletes: {len(updated)}")


def process_advisors():
    data = json.loads((DATA / 'scientific-advisors.json').read_text())
    updated = []
    for i, a in enumerate(data['advisors']):
        out = PUBLIC / 'advisors' / f"{a['id']}.svg"
        # role for medical category detection — use credentials or specialty
        role_for_palette = a.get('credentials', '') + ' ' + a.get('specialty', '')
        # Render the role line as the specialty (shorter & nicer)
        display_role = a.get('specialty', a.get('credentials', ''))
        # Use the medical palette regardless via the credentials hit
        palette = palette_for(role_for_palette)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(svg_portrait(a['name'], display_role, palette, seed=i + 10))
        a['image'] = f"/images/advisors/{a['id']}.svg"
        updated.append(a)
    data['advisors'] = updated
    (DATA / 'scientific-advisors.json').write_text(json.dumps(data, indent=2, ensure_ascii=False))
    print(f"  advisors: {len(updated)}")


def process_testimonials():
    data = json.loads((DATA / 'testimonials.json').read_text())
    updated = []
    for i, t in enumerate(data['miniTestimonials']):
        out = PUBLIC / 'testimonials' / f"{t['id']}.svg"
        write_svg(out, t['name'], t['role'], seed=i + 20)
        t['image'] = f"/images/testimonials/{t['id']}.svg"
        updated.append(t)
    data['miniTestimonials'] = updated
    (DATA / 'testimonials.json').write_text(json.dumps(data, indent=2, ensure_ascii=False))
    print(f"  testimonials: {len(updated)}")


def process_founder():
    """Single portrait for the FounderNote section, slightly larger composition."""
    out = PUBLIC / 'founder' / 'portrait.svg'
    out.parent.mkdir(parents=True, exist_ok=True)
    # Reuse the same template but with founder palette
    out.write_text(svg_portrait('[Founder Name]', 'CO-FOUNDER · PURIST', PALETTES['founder'], seed=7))
    print('  founder: 1')


if __name__ == '__main__':
    print('Generating portraits…')
    process_athletes()
    process_advisors()
    process_testimonials()
    process_founder()
    print('Done.')
