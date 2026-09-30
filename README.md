# Family Foqos Website

Marketing website for [Family Foqos](https://github.com/mnbf9rca/family-foqos), a family-focused screen time and focus management iOS app.

**Live site**: https://family-foqos.app

## Tech Stack

- **Framework**: [Astro](https://astro.build) with static site generation
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4
- **Hosting**: Cloudflare Pages
- **CI/CD**: GitHub Actions builds; Cloudflare GitHub integration deploys

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.astro          # Hero section with app branding
│   ├── Features.astro      # 12-feature grid
│   ├── HowItWorks.astro    # 3-step setup guide
│   ├── Comparison.astro    # Feature comparison table
│   ├── FAQ.astro           # Expandable FAQ section
│   ├── Waitlist.astro      # Email signup CTA
│   └── Footer.astro        # Footer with links
├── layouts/
│   └── Layout.astro        # Base layout with meta tags
├── pages/
│   └── index.astro         # Main page
└── styles/
    └── global.css          # Global styles and Tailwind config
```

## Screenshots

Place app screenshots in `public/screenshots/`:
- `home-dashboard.png` - Home dashboard with a profile visible
- `parent-dashboard.png` - Parent dashboard showing family controls
- `child-locked.png` - Child view with locked profile indicator
- `strategy-selection.png` - NFC/QR blocking strategy selection screen

## Cloudflare Pages

The `family-foqos-site` project deploys automatically through the Cloudflare GitHub integration connected to `mnbf9rca/family-foqos-site`.

- **Production branch**: `main`
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Environment variable**: `NODE_VERSION=22`
- **Custom domains**: `family-foqos.app` and `www.family-foqos.app`
- **Pull requests**: Each PR gets a preview deployment and a bot comment with its URL, replacing the staging environment.

GitHub Actions only checks the build. Astro copies `public/_headers` into `dist/_headers`, where Pages reads the rule that serves `/.well-known/apple-app-site-association` with `Content-Type: application/json`.

## License

MIT License - see the main [Family Foqos](https://github.com/mnbf9rca/family-foqos) repository.
