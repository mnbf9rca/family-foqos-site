// Regenerates public/og-image.png (1200x630). Run from repo root: node scripts/og-image.mjs
// sharp comes with Astro, so no extra dependency. The site's web fonts are not
// installed locally, so text uses macOS Avenir Next. Check the PNG by eye after running.
import sharp from 'sharp';

const icon = await sharp('public/app-icon.png')
  .resize(300, 300)
  .composite([{ input: Buffer.from('<svg width="300" height="300"><rect width="300" height="300" rx="66" fill="#fff"/></svg>'), blend: 'dest-in' }])
  .png()
  .toBuffer();

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="0.2" cy="0.1" r="0.9">
      <stop offset="0" stop-color="#5B9A6D" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#FAF7F2" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="w" cx="1" cy="1" r="0.7">
      <stop offset="0" stop-color="#C95D3C" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#FAF7F2" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#2D5A3D" stroke-opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#FAF7F2"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#w)"/>
  <rect x="96" y="161" width="308" height="308" rx="70" fill="none" stroke="#2D5A3D" stroke-width="4"/>
  <g font-family="Avenir Next, Helvetica Neue, sans-serif">
    <text x="470" y="280" font-size="92" font-weight="800" fill="#2D5A3D">Family Foqos</text>
    <text x="472" y="356" font-size="46" font-weight="600" fill="#2A2520">Focus for the <tspan fill="#C95D3C">whole family</tspan></text>
    <text x="474" y="440" font-size="28" font-weight="500" fill="#6B6158">Free on the App Store for iPhone and iPad</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([{ input: icon, left: 100, top: 165 }])
  .png()
  .toFile('public/og-image.png');
