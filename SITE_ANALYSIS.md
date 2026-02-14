# Zaplead Site Analysis & Documentation

**Last Updated:** 2025-11-11
**Purpose:** Comprehensive reference for Zaplead website structure, design system, and implementation details

---

## Executive Summary

**What is Zaplead?**
Zaplead builds engagement systems that capture, qualify, and move leads through sales pipelines automatically. They position themselves as builders of serious engineering platforms for pipeline automation, NOT just "AI chatbots."

**Key Differentiation:**
- Results-first approach (measure impact by leads moved, not features)
- Built around existing tech stacks (CRM, booking systems, spreadsheets)
- Ships fast and improves continuously (live in weeks, iterate based on data)

**Target Markets:**
- Real Estate (Marathon Realty)
- Salons & Beauty (Love.Hair)
- Education (Next School)

**Contact:** hello@zaplead.in | **Founded by:** Sanchit Patil & Aryan Iyer | **Location:** Mumbai → Global

---

## Tech Stack

### Core Framework
- **Next.js 15** with App Router
- **React 19**
- **TypeScript** for type safety
- **TailwindCSS 3.4** for styling

### Animation & Effects
- **GSAP 3.13** + ScrollTrigger plugin
- **OGL 1.0** for WebGL rendering
- **Three.js 0.181** for 3D graphics
- Custom Aurora background with Perlin noise

### UI & Utilities
- **Lucide React** for icons
- **Class Variance Authority** for component variants
- Shadcn-style component architecture
- Server Actions for form handling

---

## Project Structure

```
/Users/mandar/Downloads/Zaplead new/
├── app/
│   ├── layout.tsx              # Root layout with Inter font
│   ├── page.tsx                # Home page (6 sections)
│   ├── globals.css             # Design tokens & CSS variables
│   ├── contact/
│   │   ├── page.tsx            # Contact form page
│   │   └── actions.ts          # Server action for form submission
│   └── work/
│       └── page.tsx            # Case studies (3 projects)
│
├── components/
│   ├── ui/                     # Base UI components
│   │   ├── button.tsx          # Button with variants
│   │   ├── card.tsx            # Card container system
│   │   ├── badge.tsx           # Tags/badges
│   │   ├── input.tsx           # Form input
│   │   ├── label.tsx           # Form label
│   │   └── textarea.tsx        # Multi-line input
│   │
│   └── Advanced Components:
│       ├── Aurora.tsx          # WebGL animated background
│       ├── AnimatedContent.tsx # GSAP fade-in animations
│       ├── SplitText.tsx       # Character-level text animation
│       ├── ScrollBlurReveal.tsx# Scroll-triggered reveals
│       ├── SpotlightCard.tsx   # Interactive spotlight effect
│       ├── ColorBends.tsx      # Gradient animations
│       ├── StaggeredMenu.tsx   # Animated hamburger menu
│       ├── contact-form.tsx    # Contact form component
│       ├── footer.tsx          # Site footer
│       └── navigation.tsx      # Navigation component
│
├── lib/
│   ├── utils.ts                # cn() helper for Tailwind
│   └── integrations.ts         # Type-safe integration types
│
└── public/
    └── zaplead.png             # Logo
```

---

## Design System

### Color Palette (CSS Variables)

```css
/* Dark Theme (Current) */
--background: 0 0% 0%              /* Pure black #000000 */
--foreground: 0 0% 98%             /* Almost white #F7F7F7 */
--muted: 0 0% 10%                  /* Dark gray surfaces */
--muted-foreground: 0 0% 60%       /* Medium gray text */
--border: 0 0% 20%                 /* Subtle borders */
--input: 0 0% 20%                  /* Input borders */
--primary: 210 100% 60%            /* Electric blue #60A5FA */
--primary-foreground: 0 0% 0%      /* Black on blue */
--secondary: 0 0% 15%              /* Lighter black */
--accent: 210 100% 60%             /* Same as primary */
--ring: 210 100% 60%               /* Focus ring */
```

### Typography

**Current Font:**
- **Inter** (Google Fonts via next/font)
- Variable font: `--font-inter`
- Display: swap (prevents FOUT)
- Subsets: Latin only

**Typography Scale:**
- Hero: `text-6xl` to `text-9xl` (responsive)
- Section headings: `text-3xl` to `text-6xl`
- Body text: `text-base` to `text-2xl`
- Small/labels: `text-sm`
- Tight letter-spacing on headings

### Spacing System
- Max content width: `7xl` (80rem)
- Container padding: `px-6` for mobile responsiveness
- Section vertical spacing: `py-24` / `py-32`
- Border radius: `0.5rem` (md) base

### Design Aesthetic
- Black-first UI with pure black backgrounds
- Almost-white text (#F7F7F7)
- Single accent color: Electric blue
- Dark gray surfaces for cards
- Generous whitespace
- WCAG AA compliant contrast
- Subtle hover/focus states
- Minimal heavy animations

---

## Page Structure & Content

### 1. Home Page (`/app/page.tsx`)

#### Section 1: Aurora Background
- Fixed WebGL animated background (Perlin noise-based)
- Overlay to tone down brightness
- Performance-optimized rendering

#### Section 2: Hero
- **Headline:** "You have the power to reshape your destiny"
- **Tagline:** "Stop losing leads in the cracks. Let AI handle the busywork while you focus on closing deals."
- **CTAs:**
  - Primary: "Get Started Free" → `/contact`
  - Secondary: "View Case Studies" → `/work`
- Animated entrance with staggered GSAP animations

#### Section 3: How It Works (3-Step Process)
1. **Capture & qualify:** Conversational intake across web, WhatsApp, Instagram with automatic lead scoring
2. **Automate handoffs:** Sync to CRM, schedule bookings, send reminders, trigger follow-up cadences
3. **See & improve:** Ops dashboard shows where leads drop off, helps iterate

#### Section 4: What's Inside
Feature checklist in glass-morphism card:
- Conversational intake (web, WhatsApp, Instagram)
- Lead scoring (qualify automatically)
- Booking + reminders (Google/Calendly/Notion)
- CRM/Sheets/Airtable sync
- Follow-up cadences (drip campaigns, reactivation)
- Ops dashboard & analytics

#### Section 5: Selected Work (3 Case Studies)
- **Marathon Realty** (Real Estate)
- **Love.Hair** (Salon)
- **Next School** (Education)
- Each with spotlight card hover effect

#### Section 6: Why ZapLead (3 Pillars)
1. **Results-first:** Measure impact by leads moved, not features shipped
2. **Built around your stack:** Integrate with tools you already use
3. **Ships fast, improves continuously:** Live in weeks, iterate based on pipeline data
- **CTA:** "Talk to an engineer, not a salesperson"

---

### 2. Contact Page (`/app/contact/page.tsx`)

**Heading:** "Tell us where your pipeline stalls"

**Form Fields:**
- Name (required)
- Email (required, validated)
- Company
- Current tools (text area)
- Biggest bottleneck (dropdown):
  - "Leads go cold after first contact"
  - "Takes too long to follow up"
  - "Can't tell which leads are worth pursuing"
  - "Follow-ups fall through the cracks"
  - "Don't have visibility into what's working"
  - "Other"
- Additional details (textarea)

**Email Fallback:** hello@zaplead.in prominently displayed
**Success Message:** "We'll get back to you within 24 hours to discuss your pipeline"

---

### 3. Work/Case Studies Page (`/app/work/page.tsx`)

#### Case Study 1: Marathon Realty
- **Problem:** Manual lead follow-up, slow response times
- **System:** WhatsApp intake → Auto-qualify → Schedule site visits → CRM sync
- **Impact:** Specific metrics and results

#### Case Study 2: Love.Hair
- **Problem:** Missed bookings, no-shows
- **System:** Instagram/Web chat → Booking assistant → Reminders → Feedback loop
- **Impact:** Improved booking rate and reduced no-shows

#### Case Study 3: Next School
- **Problem:** High-volume inquiries, qualification bottleneck
- **System:** Multi-channel intake → Lead scoring → Parent engagement → Enrollment tracking
- **Impact:** Faster enrollment, better qualified leads

**SEO:** JSON-LD structured data for Organization and CreativeWork

---

## Current CTAs & Messaging

### Primary CTAs
1. **"Get Started Free"** (Hero)
   - Large white button with shadow
   - Links to `/contact`
   - Emphasizes free access

2. **"View Case Studies"** (Hero)
   - Outline button style
   - Links to `/work`

3. **"Talk to an engineer, not a salesperson"** (Why ZapLead section)
   - Large white button
   - Links to `/contact`
   - Reinforces technical credibility

4. **"View all work"** (Selected Work section)
   - Subtle outline button
   - Links to `/work`

### Form CTA
- Submit button: "Send message"
- Loading state: "Sending..."
- Email fallback always visible

### Key Messaging Themes
- "Stop losing leads in the cracks"
- "Let AI handle the busywork while you focus on closing deals"
- "Fix the gaps where leads go cold"
- "Results-first", "Built around your stack", "Ships fast"
- "Talk to an engineer, not a salesperson"

---

## Component Inventory

### UI Base Components (6)
Located: `/components/ui/`

| Component | Variants | Use Cases |
|-----------|----------|-----------|
| `button.tsx` | default, ghost, link | CTAs, navigation, forms |
| `card.tsx` | - | Content containers, features |
| `badge.tsx` | outline | Tags, labels |
| `input.tsx` | - | Form fields |
| `label.tsx` | - | Form labels |
| `textarea.tsx` | - | Multi-line input |

### Advanced Components (10)
Located: `/components/`

| Component | Technology | Purpose |
|-----------|------------|---------|
| `Aurora.tsx` | WebGL (OGL) | Animated background gradient |
| `AnimatedContent.tsx` | GSAP | Fade-in on scroll |
| `SplitText.tsx` | GSAP | Character-level animation |
| `ScrollBlurReveal.tsx` | CSS + JS | Blur reveal on scroll |
| `SpotlightCard.tsx` | Mouse tracking | Interactive card effect |
| `ColorBends.tsx` | Advanced CSS | Gradient animations |
| `StaggeredMenu.tsx` | GSAP | Animated navigation |
| `contact-form.tsx` | React state | Contact form UI |
| `footer.tsx` | - | Site footer |
| `navigation.tsx` | - | Nav component |

---

## Performance & SEO

### Performance Optimizations
- App Router for automatic code splitting
- `next/font` for self-hosted fonts (no external requests)
- Dynamic imports for Aurora (SSR-disabled)
- `willChange` and `force3D` flags for animations
- Minimal dependency footprint

### SEO Implementation
- Metadata on all pages (title, description, OG tags, social cards)
- JSON-LD structured data
- Semantic HTML with proper heading hierarchy
- Responsive meta viewport
- Optimized font loading with `display: swap`

### Accessibility
- Skip link to main content (`#main-content`)
- WCAG AA color contrast compliance
- Visible focus rings on interactive elements
- ARIA labels on navigation and forms
- Semantic HTML structure
- Form validation with clear error messages

---

## Animation System

### GSAP Animations
- **ScrollTrigger:** Viewport-based animation triggers
- **SplitText:** Character-level staggered animations
- **Stagger effects:** Sequential element animations
- **Easing:** Custom easing curves for smooth transitions

### WebGL Effects
- **Aurora background:** OGL-based WebGL renderer
- **Perlin noise:** Organic movement patterns
- **Three color stops:** Gradient control points
- **60fps target:** Performance-optimized rendering

### CSS Animations
- **Transitions:** Hover states, focus rings
- **Transforms:** Scale, translate for micro-interactions
- **Backdrop blur:** Glass-morphism effects on cards
- **Opacity fades:** Smooth state changes

---

## Form Handling

### Contact Form Architecture
- **Client Component:** `contact-form.tsx`
- **Server Action:** `/app/contact/actions.ts`
- **Validation:** Server-side with email regex
- **State Management:** React useState for form status
- **Error Handling:** Clear error messages
- **Success Flow:** Confirmation message with timeline

### Form Fields & Validation
```typescript
{
  name: string (required),
  email: string (required, email validation),
  company: string (optional),
  tools: string (optional, textarea),
  bottleneck: string (optional, dropdown),
  message: string (optional, textarea)
}
```

---

## Integration Points

### Current Integrations Mentioned
- CRM systems (generic)
- Google Calendar / Calendly / Notion Calendar
- Google Sheets / Airtable
- WhatsApp API
- Instagram API
- Email systems (for cadences)

### Integration Architecture
Type-safe integration definitions in `/lib/integrations.ts`

---

## Improvement Opportunities

### Design Enhancements
1. **Typography:** Consider multiple font pairings (display + body)
2. **Glass Morphism:** Add more Apple-style liquid glass effects
3. **Micro-interactions:** Enhanced hover states and transitions
4. **Color depth:** Consider subtle gradients vs flat colors

### CTA Optimization
1. **Specificity:** More specific CTAs based on section context
2. **Value prop:** Clearer benefit-driven messaging
3. **Urgency:** Consider adding social proof near CTAs
4. **Hierarchy:** Visual weight adjustments for primary vs secondary

### Content Strategy
1. **Hero:** Could be more specific about "reshape destiny" → actual business outcomes
2. **Features:** Add more specific metrics/results
3. **Case studies:** Expand with actual numbers and quotes
4. **Trust signals:** Add logos of companies using Zaplead

### Technical Improvements
1. **Performance:** Lazy load images, optimize bundle size
2. **Analytics:** Add event tracking for CTA clicks
3. **A/B testing:** Infrastructure for testing different CTAs
4. **Internationalization:** Multi-language support if going global

---

## Brand Voice & Positioning

### Tone
- Technical but accessible
- Results-driven, not feature-focused
- Confident without being salesy
- Engineer-to-engineer communication

### Key Differentiators
- "Talk to an engineer, not a salesperson"
- "Engagement systems" not "chatbots"
- "Results-first" measurement
- Fast shipping and continuous improvement
- Built around existing tools

### Target Audience
- Operations managers
- Sales leaders
- Technical decision-makers
- Businesses with high lead volume
- Companies struggling with pipeline leakage

---

## Maintenance Notes

### Regular Updates Needed
- Case studies with new customers
- Metrics and results (as they improve)
- Integration list (as new ones are added)
- Pricing information (if applicable)

### Content Calendar
- Blog/resources section (potential addition)
- Video testimonials (potential addition)
- Interactive ROI calculator (potential addition)

### Dependencies to Monitor
- GSAP license (commercial use)
- Next.js updates (currently on v15)
- React updates (currently on v19)
- TailwindCSS updates (currently on 3.4)

---

## Contact & Team

- **Email:** hello@zaplead.in
- **Founders:** Sanchit Patil & Aryan Iyer
- **Location:** Mumbai → Global
- **Social:** LinkedIn (links in footer)

---

## Revision History

| Date | Changes | Author |
|------|---------|--------|
| 2025-11-11 | Initial site analysis documentation | Claude Code |

---

**End of Document**
