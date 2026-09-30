# Family Foqos Website

Marketing and support website for [Family Foqos](https://github.com/mnbf9rca/family-foqos), a screen time and focus app for iPhone and iPad, with App Store download links, privacy information, and device sync guidance.

**Live site**: https://family-foqos.app

## Tech Stack

- **Framework**: [Astro](https://astro.build) 5 with static site generation
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4 via its Vite plugin
- **Build runtime**: Node.js 24 and npm
- **Hosting**: Cloudflare Pages
- **CI/CD**: GitHub Actions builds; Cloudflare GitHub integration deploys

## Development

Use Node.js 24. Run these commands from the repository root:

```bash
# Install locked dependencies
npm ci

# Start development server
npm run dev

# Build the static site into dist/
npm run build

# Preview production build
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── Comparison.astro    # Feature comparison table
│   ├── Download.astro      # App Store download links
│   ├── FAQ.astro           # Expandable FAQ section
│   ├── Features.astro      # App features
│   ├── Footer.astro        # Footer with links
│   ├── Header.astro        # Shared navigation
│   ├── Hero.astro          # App branding and screenshot
│   └── HowItWorks.astro    # Setup guide
├── layouts/
│   └── Layout.astro        # Shared page layout and metadata
├── pages/
│   ├── index.astro         # Home page
│   ├── privacy.astro       # Privacy policy
│   ├── support.astro       # Support and usage guidance
│   └── sync.astro          # Device sync guidance
└── styles/
    └── global.css          # Global styles and Tailwind theme
public/
├── _headers               # Cloudflare Pages response headers
├── .well-known/
│   └── apple-app-site-association
└── ...                    # Screenshot, app icons, favicons, and manifest
```

## Screenshots

The hero uses `public/family-controls.PNG`. Replace that file to update the screenshot; preserve the filename's case.

## Cloudflare Pages

The `family-foqos-site` project deploys automatically through the Cloudflare GitHub integration connected to `mnbf9rca/family-foqos-site`.

- **Production branch**: `main`
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Environment variable**: `NODE_VERSION=24`
- **Custom domains**: `family-foqos.app` and `www.family-foqos.app`
- **Pull requests**: Each PR gets a preview deployment and a bot comment with its URL.

GitHub Actions only checks the build. Astro copies `public/_headers` into `dist/_headers`, where Pages reads the rule that serves `/.well-known/apple-app-site-association` with `Content-Type: application/json`.

## License

MIT License - see [LICENSE](LICENSE).
