# Family Foqos Website

Marketing website for [Family Foqos](https://github.com/mnbf9rca/family-foqos), a family-focused screen time and focus management iOS app.

**Live site**: https://family-foqos.app

## Tech Stack

- **Framework**: [Astro](https://astro.build) with static site generation
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4
- **Hosting**: AWS S3 + CloudFront
- **CI/CD**: GitHub Actions

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

## AWS Setup

### Prerequisites

1. AWS Account with access to S3, CloudFront, ACM, and Route 53
2. Domain configured: `family-foqos.app`

### S3 Bucket Setup

1. Create an S3 bucket (e.g., `family-foqos-app`)
2. Enable static website hosting
3. Set index document to `index.html`
4. Set error document to `index.html` (for SPA-style 404 handling)
5. Bucket policy for CloudFront access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontAccess",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::family-foqos-app/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

### SSL Certificate (ACM)

1. Request a certificate in ACM (us-east-1 region for CloudFront)
2. Add domain names: `family-foqos.app`, `www.family-foqos.app`
3. Validate via DNS (add CNAME records to Route 53)

### CloudFront Distribution

1. Create distribution with S3 origin
2. Use Origin Access Control (OAC) for S3 access
3. Redirect HTTP to HTTPS
4. Attach ACM certificate
5. Set alternate domain names: `family-foqos.app`, `www.family-foqos.app`
6. Default root object: `index.html`
7. Custom error responses: 404 → `/index.html` with 200 status

### Route 53 DNS

1. Create A record for `family-foqos.app` → CloudFront distribution (Alias)
2. Create A record for `www.family-foqos.app` → CloudFront distribution (Alias)
3. Optionally redirect `familyfoqos.app` to `family-foqos.app`

### GitHub Secrets

Add these secrets to your GitHub repository:

- `AWS_ACCESS_KEY_ID` - IAM user access key
- `AWS_SECRET_ACCESS_KEY` - IAM user secret key
- `S3_BUCKET` - S3 bucket name (e.g., `family-foqos-app`)
- `CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID

### IAM Policy

Create an IAM user with this policy for GitHub Actions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::family-foqos-app",
        "arn:aws:s3:::family-foqos-app/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
    }
  ]
}
```

## Deployment

Deployments are automatic via GitHub Actions on push to `main`.

Manual deployment:
```bash
npm run build
aws s3 sync ./dist s3://family-foqos-app --delete
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
```

## License

MIT License - see the main [Family Foqos](https://github.com/mnbf9rca/family-foqos) repository.
