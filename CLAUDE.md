# Luigi A. Moretti - Personal Website Context

**Last Updated:** September 2026  
**Website URL:** https://luigiandreamoretti.com  
**Version:** 1.0 (Cloudflare Pages deployment)

---

## 1. Project Overview

### Purpose
Personal portfolio and professional website for Luigi A. Moretti, a PhD researcher transitioning from academia to industry roles in wearable health technology and digital mental health. The site serves three primary audiences:

1. **Recruiters & Hiring Managers** - Product Management and Research Scientist roles at companies like Google Health, Apple, Oura, Whoop, Microsoft
2. **Academic Collaborators** - Researchers, clinicians, and institutions interested in affective computing and digital mental health
3. **MEMoPAD Community** - Participants, stakeholders, and followers of the MEMoPAD research project

### Design Philosophy
- **Professional yet approachable** - Warm, human tone balanced with technical credibility
- **Evidence-based storytelling** - Quantified achievements (6/7 co-design phases, 19-25 participants per phase, £10.5K funding, 600+ newsletter subscribers) over vague claims
- **Unique positioning** - Emphasizes rare combination of clinical insight (MD), technical execution (startup experience), and academic rigor (PhD)
- **Action-oriented** - Clear CTAs for recruiters (Download CV, "Open to new roles"), collaborators (MEMoPAD Project), and connections (LinkedIn)

---

## 2. Technical Architecture

### Hosting & Deployment
- **Platform:** Cloudflare Pages (migrated from Firebase Hosting Oct 2025)
- **Deployment:** Automatic via GitHub push to `main` branch (other branches get Cloudflare preview URLs)
- **Repository:** https://github.com/LuigiAM/luigiandreamoretti.com
- **Domain:** luigiandreamoretti.com (managed via Cloudflare DNS)
- **SSL:** Automatic HTTPS enforcement, www → non-www redirects via Page Rules

### Technology Stack
- **HTML5** - Semantic markup with accessibility considerations
- **CSS3** - Custom properties (CSS variables), responsive design, mobile-first approach
- **Vanilla JavaScript** - No frameworks; progressive enhancement for core functionality
- **No external dependencies** - Self-contained for performance and maintainability (Inter font self-hosted in `/fonts/`; YouTube loads only on click)

### Key Files Structure
```
/
├── index.html              # Single-page site
├── privacy.html            # Privacy policy (served at /privacy)
├── 404.html                # Not-found page (prevents SPA soft-404s on Cloudflare Pages)
├── _headers                # Cloudflare Pages security + cache headers
├── robots.txt              # Search engine directives (must stay at repo root)
├── sitemap.xml             # SEO sitemap (update <lastmod> on content changes)
├── favicon.ico             # 16/32/48px favicon (root, for Google results)
├── Luigi-Andrea-Moretti-CV.pdf  # Downloadable CV (hero + availability CTAs)
├── css/style.css           # All styling (no preprocessor)
├── js/main.js              # Interactive features (one IIFE per feature)
├── fonts/                  # Self-hosted Inter (latin + latin-ext woff2, OFL.txt)
├── images/                 # WebP images, resized to ~2x display size
│   ├── og-image.jpg        # 1200x630 social preview (LinkedIn / X)
│   ├── hero-linkedin.webp  # 800px (+ hero-linkedin-400.webp for srcset)
│   ├── gallery/*.webp
│   ├── logos/*.webp        # 160px max
│   └── video-thumbs/*.webp # Self-hosted YouTube thumbnails (click-to-load)
└── favicon/                # PNG favicons + apple-touch-icon
```

### Performance Targets
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Lighthouse Score:** 90+ across all metrics
- **Image optimization:** WebP format, lazy loading for gallery
- **Mobile-first:** Responsive breakpoints at 968px, 768px, 480px

---

## 3. Content Strategy

### Brand Voice
- **Tone:** Conversational yet professional, reflective, human
- **Avoid:** Corporate jargon, excessive self-promotion, technical gatekeeping
- **Embrace:** Concrete examples, quantified achievements, honest challenges
- **Writing style:** Short paragraphs (2-4 sentences), bullet points for scannability, active voice

### Key Messaging Pillars

**1. Clinical Implementability**
> "MD background + product thinking = tools clinicians actually adopt"
- Positions Luigi as someone who understands healthcare system constraints
- Differentiates from pure engineers or academics

**2. User-Centered Rigor**
> "7-phase co-design (19-25 patients, carers and clinicians per phase) ensures research translates to real-world use"
- Emphasizes methodological thoroughness
- Demonstrates commitment to stakeholder inclusion

**3. Startup-Trained Execution**
> "Built 3 companies—understands speed, scale, and market fit"
- Addresses common concern: "Can this academic deliver in industry?"
- Shows entrepreneurial mindset and shipping experience

**4. Multidisciplinary Bridge**
> "Bridges medicine, engineering, and psychology"
- Highlights unique value proposition
- Positions for PM roles requiring cross-functional leadership

### Content Hierarchy (Homepage)
1. **Hero Section** - Name, tagline, availability, photo, primary CTAs
2. **About Section** - Story arc: Clinical medicine → Healthtech → PhD → Industry transition
3. **Current Focus (MEMoPAD Spotlight)** - Featured project with video, metrics, narrative
4. **Experience Timeline** - Expandable cards, reverse chronological, emphasis on impact
5. **Achievements** - Filterable by category (Funding, Awards, Publications, Community)
6. **Photo Gallery** - Humanizing element, conference/research/community moments
7. **Availability Dashboard** - Clear signals: Timeline, Location preferences, Role types
8. **Footer** - Contact, MEMoPAD link, Privacy policy, Social profiles

---

## 4. SEO & Discoverability

### Schema.org Structured Data
**Enhanced JSON-LD with @graph structure:**
- **Person** entity (Luigi A. Moretti) - complete credentials, expertise, affiliations
- **WebSite** entity - site metadata, language, publisher info
- **EducationalOrganization** (UWE Bristol) - institutional links
- **ResearchProject** (MEMoPAD) - separate entity with funding, description
- **DefinedTerm** entries - Wikipedia-linked expertise areas (Affective Computing, Wearable Technology, etc.)

**Benefits:**
- Google Knowledge Graph eligibility
- AI chatbot training data accuracy (ChatGPT, Claude, Perplexity)
- Academic profile linking (Google Scholar, ORCID)
- Recruiter search matching (LinkedIn integration)

### Target Keywords (Primary)
- Luigi Moretti researcher
- Wearable mental health technology
- Affective computing PhD
- Digital health product manager
- MEMoPAD anxiety monitoring
- Clinical wearable technology
- Emotion recognition systems

### Search Console Status
- **Property:** luigiandreamoretti.com (verified Oct 2025)
- **Sitemap:** Submitted and indexed
- **Mobile usability:** Passing
- **Core Web Vitals:** Good across all metrics
- **Index coverage:** Monitoring for "Redirect error" resolution (fixed Oct 2025)

### External Profile Links (Maintain Consistency)
All should point to `https://luigiandreamoretti.com`:
- LinkedIn: https://www.linkedin.com/in/luigiandreamoretti/
- ORCID: https://orcid.org/0009-0002-6180-0565
- Google Scholar: https://scholar.google.co.uk/citations?user=KJTGED4AAAAJ
- ResearchGate: https://www.researchgate.net/profile/Luigi-Moretti-2
- GitHub: https://github.com/LuigiAM
- X/Twitter: https://x.com/LuigiAndreaM

---

## 5. Design System

### Color Palette
```css
/* Actual tokens in css/style.css :root */
--color-primary: #41A08D         /* Teal-green brand colour (large/decorative use only) */
--color-primary-strong: #2E7D6E  /* AA-compliant teal (4.9:1 on white): buttons, links, small text */
--color-accent: #E74C3C          /* Red */
--color-accent-2: #6C5CE7        /* Purple (gradient end) */
--color-dark / --color-text: #2C3E50  /* Headings and body text */
--color-text-muted: #6C757D
--color-bg: #FFFFFF / --color-bg-light: #F8F9FA
--gradient-hero: linear-gradient(135deg, #2E7D6E 0%, #6C5CE7 100%)  /* hero + availability */
```

**Usage principles:**
- Use `--color-primary-strong` for any teal text or button background; `--color-primary` (#41A08D) is only ~3.2:1 on white and fails WCAG AA for normal-size text
- White text on `--gradient-hero` is AA-compliant (the gradient starts at the strong teal on purpose)
- Accent: limited to high-priority highlights

### Typography
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif
--font-display: 'Inter', sans-serif
```

**Scale:**
- H1 (Hero): 4rem (64px) desktop, 2.5rem (40px) mobile
- H2 (Sections): 2.5rem (40px) desktop, 2rem (32px) mobile
- H3 (Cards): 1.5rem (24px)
- Body: 1.125rem (18px) - larger than typical for readability
- Small: 0.875rem (14px) - metadata, captions

**Line height:** 1.6 (body), 1.2 (headings)  
**Font weight:** 400 (normal), 600 (semibold for headers), 700 (bold for emphasis)

### Spacing System
```css
--spacing-xs: 0.5rem    /* 8px */
--spacing-sm: 1rem      /* 16px */
--spacing-md: 2rem      /* 32px */
--spacing-lg: 4rem      /* 64px */
--spacing-xl: 6rem      /* 96px */
```

**Container width:** 1200px max (1000px on 14" laptops via media query)  
**Padding:** 2rem horizontal on all sections for consistency

### Component Patterns

**Cards (Experience, Achievements):**
- White background with subtle shadow (0 2px 8px rgba(0,0,0,0.1))
- Border radius: 12px
- Padding: 2rem
- Hover: Lift effect (transform: translateY(-4px), increased shadow)
- Transition: 0.3s ease for smooth interactions

**Buttons:**
- Primary: Teal background, white text, 48px height, 16px padding
- Secondary: White background, teal border/text
- Hover: Darken primary by 10%, subtle scale (1.02)
- Border radius: 8px

**Expandable Sections (Experience Timeline):**
- Chevron icon rotates 180° on expand
- Content fades in with 0.3s transition
- Max-height animation for smooth reveal
- Mobile: Auto-expand first item for immediate context

---

## 6. Interactive Features

### Implemented
1. **Navigation** - Always visible; transparent over the hero, solid (`.scrolled`) after 50px; active section highlighted via `aria-current`
2. **Mobile Hamburger Menu** - Slide-in drawer with overlay, closes on link click or ESC key (`aria-expanded` kept in sync)
3. **Experience Timeline** - Click to expand/collapse job details; "Show More Roles" progressive disclosure
4. **Achievements Filter** - Category tabs (All, Funding, Awards, Publications, Memberships, Speaking), one row by default + "Show All N"
5. **About Slideshow** - Autoplay with pause/play button, swipe, pauses on hover/focus; no autoplay with reduced motion
6. **Click-to-load Videos** - Self-hosted thumbnails (`.video-thumb` / `.product-card` with `data-video-id`) open YouTube in a native `<dialog>`
7. **Smooth Scrolling** - CSS `scroll-behavior` + `scroll-margin-top` (no JS); disabled under `prefers-reduced-motion`
8. **Availability Status** - Pulsing green dot on the "Open to new roles" badge

### JavaScript Architecture
- **Modular pattern** - Each feature wrapped in IIFE (Immediately Invoked Function Expression)
- **Progressive enhancement** - Core content accessible without JS
- **Event delegation** - Efficient event handling for dynamic content
- **Debouncing** - Scroll events throttled for performance
- **Accessibility** - Keyboard navigation, focus management, ARIA attributes

### Known Issues (To Fix)
- **Mobile menu** - Previously broken. Fixed Sep 2026 by moving the navbar's `backdrop-filter` to `.navbar::before` (a `backdrop-filter` on `.navbar` made the fixed drawer position relative to the navbar) and making the navbar visible at page load. Verify on real iOS/Android devices.
- **CSP** - Enforced via `_headers` (Sep 2026). New third-party embeds or scripts must be allowed there first, or they will be blocked.

---

## 7. Responsive Design

### Breakpoints
```css
/* Desktop first approach */
@media (max-width: 968px)  /* Tablet */
@media (max-width: 768px)  /* Mobile landscape */
@media (max-width: 480px)  /* Mobile portrait */

/* Laptop optimization */
@media (min-width: 1024px) and (max-width: 1600px)  /* 14" laptops */
```

### Layout Adaptations

**Hero Section:**
- Desktop: 60/40 split (text/image)
- Tablet: 50/50 split, reduced gap
- Mobile: Single column, image above text

**Navigation:**
- Desktop: Horizontal links, right-aligned
- Tablet: Same as desktop (collapses at 968px)
- Mobile: Hamburger menu with slide-in drawer

**Experience Timeline:**
- Desktop: Full-width cards with left-aligned content
- Mobile: Reduced padding, smaller text, auto-expand first item

**Photo Gallery:**
- Desktop: 3 columns (CSS Grid)
- Tablet: 2 columns
- Mobile: 1 column with lazy loading

**Typography Scale:**
- Desktop: Full scale (64px H1)
- Tablet: 80% scale (51px H1)
- Mobile: 60% scale (40px H1)

---

## 8. Privacy & Compliance

### Data Collection
**Minimal approach - no analytics by default:**
- No Google Analytics
- No Facebook Pixel
- No third-party tracking cookies
- Cloudflare Web Analytics only (privacy-first, GDPR compliant)

### Privacy Policy
- Located at: `/privacy.html`
- Covers: Contact form (if added), Cloudflare analytics, external links
- Updated: October 2025
- Linked in footer for transparency

### External Embeds
- **YouTube videos:** Shown as self-hosted thumbnails; nothing is requested from YouTube until the visitor clicks play, then the video loads in privacy-enhanced mode (`youtube-nocookie.com`)
- **Fonts:** Inter is self-hosted (no Google Fonts requests)
- **Social links:** Direct links, no embedded widgets
- **No email capture forms** - Contact via email link only

### GDPR/CCPA Compliance
- No cookies requiring consent (Cloudflare analytics exempt)
- Right to access: Contact email provided
- Data retention: No user data stored on website
- Third-party processors: Cloudflare (DPA in place)

---

## 9. Content Updates & Maintenance

### Regular Updates (Owner Responsibility)
**Monthly:**
- Add new achievements to Achievements section (publications, awards, grants)
- Update MEMoPAD participant count if phase completed
- Review Experience Timeline for accuracy

**Quarterly:**
- Refresh photo gallery with recent conference/research photos
- Update Availability Dashboard if timeline changes
- Review and update Privacy Policy if data practices change

**Annually:**
- Refresh hero tagline if research focus shifts
- Update credentials (new certifications, memberships)
- Review all external links for accuracy

### Version Control
- **GitHub repository:** https://github.com/LuigiAM/luigiandreamoretti.com
- **Branch strategy:** `main` is production; use a short-lived branch for larger changes to get a Cloudflare preview URL
- **Commit convention:** Descriptive messages ("Update: Added Q4 2025 achievements")
- **Deployment:** Automatic via Cloudflare Pages on push to `main`

### Backup Strategy
- **Git history:** Full version control in GitHub
- **Cloudflare:** Automatic deployment history (rollback available)
- **Local backup:** Recommended monthly download of `/images/` folder

---

## 10. Future Enhancements (Roadmap)

### Short-term (Next 3 months)
- [x] Fix mobile hamburger menu bug (Sep 2026 - verify on real devices)
- [ ] Add blog section for research updates (optional)
- [ ] Implement contact form with spam protection
- [ ] Add testimonials section (from MEMoPAD participants, collaborators)
- [x] Create downloadable CV/resume PDF (Sep 2026)

### Medium-term (6 months)
- [ ] Add case study pages for major projects (IntelliHearts, FabCraft)
- [ ] Implement newsletter signup integration (Substack or Mailchimp)
- [ ] Add interactive MEMoPAD timeline/journey visualization
- [ ] Create "Publications" dedicated page with abstracts
- [ ] Add language toggle (English/Italian) for broader reach

### Long-term (12+ months)
- [ ] Build blog with research insights, methodology posts
- [ ] Add resources section (guides, templates for co-design)
- [ ] Implement search functionality for content discovery
- [ ] Create video series on digital health innovation
- [ ] Integrate with academic profile APIs (ORCID, Google Scholar)

### Nice-to-Have (Deprioritized)
- Dark mode toggle (not essential for professional portfolio)
- Animated data visualizations (MEMoPAD metrics)
- Interactive emotion wheel from MEMoPAD research
- Live chat widget (overkill for personal site)

---

## 11. Common Issues & Solutions

### Issue: "Redirect error" in Google Search Console
**Cause:** HTTP and www variations not redirecting properly  
**Solution:** Cloudflare Page Rules:
1. `*www.luigiandreamoretti.com/*` → 301 to `https://luigiandreamoretti.com/$1`
2. `http://luigiandreamoretti.com/*` → Always Use HTTPS  
**Status:** Fixed Oct 2025, monitoring for resolution

### Issue: Images not loading
**Cause:** Incorrect path or WebP format not supported  
**Solution:** Check `/images/` folder structure, provide JPEG fallback if needed  
**Prevention:** Test in Safari (strictest WebP support)

### Issue: Mobile menu not working
**Cause:** `backdrop-filter` on `.navbar` created a containing block for the fixed `.nav-links` drawer, and the navbar was hidden (`top: -100px`) until 100px of scroll  
**Solution:** Blur moved to `.navbar::before`; navbar always visible (Sep 2026)  
**Status:** Fixed - confirm on real iOS Safari / Android Chrome

### Issue: Slow initial load time
**Cause:** Large hero image, blocking JavaScript  
**Solution:** WebP compression, lazy loading for below-fold content, defer non-critical JS  
**Target:** TTFB <1s, FCP <1.5s

### Issue: Schema.org validation warnings
**Cause:** Experimental properties (e.g., `about` on ResearchProject)  
**Solution:** Move experimental data to `description` field  
**Status:** Resolved, 0 errors in validator

---

## 12. AI Assistant Guidelines

### When Helping with Updates

**Content:**
- Maintain consistent brand voice (professional yet approachable)
- Quantify achievements when possible (numbers, metrics, outcomes)
- Avoid jargon unless audience-appropriate (technical for academic, accessible for recruiters)
- Keep paragraphs short (2-4 sentences max)

**Code:**
- Preserve existing architecture (no frameworks, vanilla JS)
- Follow established naming conventions (kebab-case for CSS classes)
- Test responsive breakpoints (especially 14" laptop optimization)
- Maintain accessibility (semantic HTML, ARIA labels, keyboard navigation)

**SEO:**
- Update schema.org when major changes occur (new credentials, projects)
- Keep meta descriptions under 160 characters
- Ensure all images have descriptive alt text
- Maintain consistent URL structure

**Deployment:**
- Always test locally first (Live Server extension in VS Code)
- Commit with descriptive messages
- Push to `main` triggers auto-deploy (wait 2 min); other branches deploy to a preview URL
- Verify on preview URL before DNS propagation

### When User Asks for Website Changes

**Always clarify:**
1. **What section?** (Hero, About, Experience, etc.)
2. **What content?** (Text, image, link, new achievement)
3. **Priority?** (Update now, backlog, nice-to-have)

**Before suggesting changes:**
1. Check if change aligns with brand voice
2. Verify technical feasibility (no breaking changes)
3. Consider SEO impact (URL changes, schema updates)
4. Estimate deployment complexity (simple text vs. layout refactor)

**After providing code:**
1. Specify which file(s) to update
2. Provide exact line numbers or search terms
3. Include testing instructions
4. Remind about git commit/push for deployment

---

## 13. Contact & Support

### Owner
**Luigi A. Moretti**  
Email: hello@luigimoretti.com  
LinkedIn: https://www.linkedin.com/in/luigiandreamoretti/  
GitHub: https://github.com/LuigiAM

### Technical Support
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Google Search Console:** https://search.google.com/search-console/
- **GitHub Issues:** https://github.com/LuigiAM/luigiandreamoretti.com/issues

### Related Projects
- **MEMoPAD Website:** https://memopad.luigiandreamoretti.com/
- **MEMoPAD Research:** https://memopad.luigiandreamoretti.com/research/
- **Personal GitHub:** https://github.com/LuigiAM

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Oct 2025 | Initial creation after Cloudflare Pages migration |
| 1.1 | Sep 2026 | Site audit fixes: SEO files at root, favicon/OG image, 404 page, self-hosted font, click-to-load video, image optimisation, `_headers`, AA contrast token, mobile nav fix, CV download |

---

**End of Document**