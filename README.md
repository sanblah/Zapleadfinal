# ZapLead Website

A minimalist, high-performance website for ZapLead — built with Next.js, TypeScript, and TailwindCSS.

## Overview

ZapLead builds engagement systems that capture, qualify, and move leads through your pipeline automatically. This website positions us as builders of engagement systems and pipeline automation, not just "AI chatbots."

**Live URL:** [zaplead.in](https://zaplead.in)

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** Custom components inspired by shadcn/ui
- **Icons:** Lucide React
- **Font:** Inter (via next/font)

## Features

### Design

- **Minimalist aesthetic:** Black-first UI with generous whitespace
- **High contrast:** WCAG AA compliant color ratios
- **Single accent:** Muted electric blue (#60A5FA) for links and CTAs
- **Micro-interactions:** Subtle hover/focus states, no heavy animations
- **Responsive:** Mobile-first, works beautifully on all screen sizes

### SEO & Performance

- **Server-side rendering** with Next.js App Router
- **Optimized fonts** using next/font (no external requests)
- **Structured data:** JSON-LD for Organization and CreativeWork schemas
- **Meta tags:** Complete OpenGraph and social card metadata support
- **Semantic HTML:** Proper heading hierarchy and landmarks

### Accessibility

- **WCAG AA compliant:** Tested color contrast ratios
- **Keyboard navigation:** Visible focus rings on all interactive elements
- **Skip links:** Jump to main content
- **ARIA labels:** Proper labeling on navigation and forms
- **Screen reader friendly:** Semantic HTML and meaningful alt text

### Pages

1. **Home (/)** — Hero, How it works, What's inside, Selected work, Why ZapLead
2. **Work (/work)** — Detailed case studies with JSON-LD
3. **Contact (/contact)** — Form with validation and server action

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

1. Clone or navigate to the project directory:

```bash
cd zaplead-website
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Development

Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The site will auto-reload when you edit files.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

This generates a `.next` folder with the production-ready application.

### Start Production Server

After building, start the production server:

```bash
npm start
# or
pnpm start
# or
yarn start
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

### Security Checks

Run baseline application security checks:

```bash
npm run security:check
```

See `SECURITY.md` for the standards mapping (OWASP ASVS/Top 10, OWASP Cheat Sheets, NIST SSDF, CIS baseline guidance).

## Project Structure

```
zaplead-website/
├── app/
│   ├── contact/
│   │   ├── actions.ts        # Server action for form submission
│   │   └── page.tsx          # Contact page
│   ├── work/
│   │   └── page.tsx          # Work/case studies page
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles and design tokens
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── textarea.tsx
│   ├── contact-form.tsx      # Contact form component
│   ├── footer.tsx            # Site footer
│   └── navigation.tsx        # Site navigation
├── lib/
│   ├── integrations.ts       # Integration connectors (placeholder)
│   └── utils.ts              # Utility functions (cn helper)
├── public/                   # Static assets
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md
```

## Design System

### Colors

Defined in `app/globals.css` as CSS variables:

- **Background:** `hsl(0 0% 0%)` — Pure black
- **Foreground:** `hsl(0 0% 98%)` — Almost white
- **Primary/Accent:** `hsl(210 100% 60%)` — Muted electric blue
- **Muted:** `hsl(0 0% 10%)` — Dark gray surfaces
- **Border:** `hsl(0 0% 20%)` — Subtle borders

### Typography

- **Font:** Inter (variable)
- **Tight tracking** on headings for a modern look
- **Readable line heights** for body text

### Spacing

- **Generous whitespace** between sections
- **Consistent padding:** px-6 for containers, py-24 for sections
- **Max width:** 7xl (80rem) for content areas

## Contact Form

The contact form uses Next.js Server Actions for submission without external services.

### Fields

- Name (required)
- Email (required)
- Company (required)
- Current tools (optional)
- Top pipeline bottleneck (required, select)
- Details (optional, textarea)

### Validation

- Client-side: HTML5 required attributes
- Server-side: Email regex, required field checks
- Error states with clear messaging
- Success state with confirmation message

### Production Setup

To connect the form to your CRM or email service, edit `app/contact/actions.ts`:

```typescript
// Add your CRM API call here
// Examples: HubSpot, Salesforce, Pipedrive, Google Sheets
```

## Integrations Placeholder

`lib/integrations.ts` contains type-safe placeholders for future platform integrations:

- WhatsApp Business API
- Instagram Messaging
- CRM connectors (Salesforce, HubSpot, Zoho)
- Spreadsheet sync (Google Sheets, Airtable)
- Booking systems (Calendly, Cal.com, Fresha)
- Workflow automation (n8n, Zapier, Make)

These are **not implemented** in this version but provide a structure for future development.

## SEO Checklist

- [x] Title and meta description on all pages
- [x] OpenGraph tags for social sharing
- [x] Social card metadata tags
- [x] JSON-LD structured data (Organization on home, CreativeWork on work page)
- [x] Semantic HTML with proper heading hierarchy
- [x] Optimized fonts (no external requests)
- [x] Alt text on images (add images to /public and reference them)

## Performance Optimization

- **Next.js App Router:** Automatic code splitting and optimization
- **next/font:** Self-hosted fonts, no external requests
- **Minimal dependencies:** Only essential packages
- **No blocking scripts:** All JavaScript is non-blocking
- **Responsive images:** Use Next.js Image component when adding images

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Deploy (zero config needed)

### Other Platforms

Build and deploy the `.next` folder:

```bash
npm run build
npm start
```

Ensure your platform supports Node.js 18+ and serves on port 3000 (or configure PORT env var).

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## License

Proprietary — ZapLead, 2025

## Contact

Built by **Sanchit Patil & Aryan Iyer**

- Email: hello@zaplead.in
- Location: Mumbai → Global

---

**Built with Next.js 15, TypeScript, and TailwindCSS.**
