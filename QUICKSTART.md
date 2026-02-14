# Quick Start Guide

Get ZapLead's website running in 60 seconds.

## Run Locally

```bash
# Navigate to the project
cd zaplead-website

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Status

✅ All dependencies installed (0 vulnerabilities)
✅ Production build tested and passing
✅ ESLint passing with no errors
✅ All pages rendering correctly:
- `/` — Home page with hero, features, and CTAs
- `/work` — Case studies with JSON-LD
- `/contact` — Contact form with server action

## Key Files to Customize

### Content
- `app/page.tsx` — Home page copy and sections
- `app/work/page.tsx` — Case studies
- `app/contact/actions.ts` — Form submission (connect to your CRM)

### Branding
- `app/globals.css` — Colors and design tokens
- `components/navigation.tsx` — Site navigation
- `components/footer.tsx` — Site footer

### SEO
- `app/layout.tsx` — Site-wide metadata
- Individual page `metadata` exports for page-specific SEO

## Next Steps

1. **Add images:** Place in `/public` and reference with Next.js Image component
2. **Connect contact form:** Edit `app/contact/actions.ts` to send to your CRM
3. **Customize copy:** Update content in page files
4. **Deploy:** Push to Vercel or your preferred host

## Need Help?

See `README.md` for full documentation.
