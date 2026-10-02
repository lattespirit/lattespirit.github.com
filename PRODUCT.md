# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user: the author, Jeffrey Yeung (lattespirit.com), maintaining a
first-person record of life, work, and reflection. The site states its purpose
directly: "本博只用于个人对生活的一些记录."

Secondary audience: readers who visit to read posts, browse the archives,
explore the author's gear (Uses), trace the site's history (About timeline),
and read testimonials. One testimonial (from LanternD) also refers to "this
static website template by Lattespirit," which suggests some visitors read the
site as a reusable template/design reference rather than purely a personal blog
— that framing is left open below.

[inferred — pending your confirmation] The site is journal-first: the visitor's
success is an engaged, warm reading/browsing experience, not a conversion.

## Product Purpose

A continuously-published personal blog by Jeffrey Yeung ("Lattespirit" /
拿铁精神) that records life, reflection, travel, work, and front-end/design
craft. It has run since 2012 (WordPress → GitHub/Jekyll · Bootstrap → Gatsby
v3/v4) and doubles as the author's demonstration of web design and engineering
taste.

Success means the author's living record and 14-year history stay intact and
are genuinely pleasant to read, browse, and explore on phones, tablets, and
desktops.

## Positioning

The meaningfully different thing: a long-lived personal blog whose visual
product is itself the proof of the author's craft — an opinionated, warm
"latte paper + sunset/twilight" design system instead of a default template
look.

[open] Template framing: a testimonial on the site calls it "this static
website template by Lattespirit," implying it may be used or distributed as a
Gatsby template. That framing is not confirmed by the site's own navigation or
copy and is recorded as an undecided fact, not a claim.

## Operating Context

- Content lives in `src/posts/*.md`; the date and title in each filename drive
  the slug, and posts are grouped by year on `/archives`.
- The home page is a paginated listing (`/`, `/page/N`), 20 posts per page,
  with a staggered card entrance and a "NEW" badge for posts newer than 15 days.
- Full-text search (Fuse.js, `s` key), RSS (`/rss.xml`), and Disqus comments on
  posts and the About page.
- Community gear is maintained in `src/content/uses.json`; the site's history
  lives in `src/content/events.json` and renders as an interactive timeline on
  About.
- A small "typography" microsite (`/logos`, `/colors`, `/typeface`,
  `/hierarchy`) documents the visual system; its nav entry is commented out.
- The site is bilingual in practice: page `lang="zh"`, most copy is Chinese,
  and nav/labels are English.

## Capabilities and Constraints

Confirmed:
- Static Gatsby 5 + React 18 site with MDX/Markdown posts, image optimization
  (gatsby-plugin-image/sharp), offline/PWA precache, RSS, Google gtag, and
  Microsoft Clarity analytics.
- Search, paginated listing, archives, Uses, About (with history timeline),
  Testimonials, typography microsite, and a branded 404 with search.
- Accessibility: skip-to-content link, visible `:focus-visible` ring,
  `prefers-reduced-motion` support, image alt text, `lang="zh"`.

Constraints / technical facts:
- Node >= 20; `gatsby build` then deploy to GitHub Pages `master` via
  `npm run deploy` / `upload`.
- Env vars: `SITE_URL`, `GATSBY_DISQUS_NAME` (dev vs production).
- Analytics (Google gtag `G-5J0G3B1Y05`, Clarity) run unconditionally; a
  cookie-consent banner was deliberately deferred, not built.
- No client-fetched content; Disqus is the only third-party runtime load, with
  a deliberate loading/offline state.
- [undecided] Whether the site is offered/distributed as a Gatsby template
  (see Positioning).

## Brand Commitments

- Identity: "Lattespirit" (拿铁精神), author "Jeffrey Yeung", domain
  lattespirit.com, blog title "Jeffrey Yeung's Blog", PWA manifest name
  "Lattespirit".
- Voice/personality (from About): warm and easygoing (随和), loving life
  (热爱生活), unburdened by material excess, pursuing freedom and inner
  contentment; the author also now reads 拿铁 as gym/fitness (撸铁) — "人近中年，
  应该更加注重自己的身体."
- Existing assets: `src/images/typography/logo-black.svg`,
  `logo-white.svg`, `src/images/lattespirit.jpg` (avatar),
  `src/images/lattespirit-rounded.png` (icon).
- Chinese-first voice with English navigation.

The incumbent visual world — warm "latte paper" neutrals, sunset/twilight
palette, Outfit font, film grain, ambient glow — is the committed, existing
identity and is recorded here only as durability, not reshaped during init;
visual direction is owned by the design layer.

## Evidence on Hand

- Site history timeline: `src/content/events.json` (2012 WordPress → 2014
  GitHub/Jekyll/Bootstrap → 2015 Disqus → 2017 Bootstrap v3 + search → 2019
  v3.0 UI rebuild → 2020 Gatsby).
- 100+ posts in `src/posts/` (2012–2026): travel, life reflection, tech/editor
  posts, annual recaps, microblogs, 3D/design.
- `src/content/uses.json` gear list (last updated 2026-07-18).
- Testimonial card (`src/pages/testimonials.js`, from LanternD) describing it
  as a static website template.
- Local (gitignored) `plans/` audits documenting the 2026 redesign and
  animation work.
- Absence to not fabricate: no invented customers, testimonials beyond the
  single existing one, benchmarks, pricing, or claims that the blog is publicly
  offered as a template.

## Product Principles

1. Recorder first — the blog is the author's personal record and reflection;
   real copy wins over invention, and readers are the audience, never the
   subject.
2. Preserve the history — a continuous 2012→today record and a warm, personal
   voice are durable assets refinement should protect, not churn.
3. Reading ease is the product — calm, uncluttered reading, browsing, and
   searching across phones, tablets, and desktops is the experience to protect.
4. Craft is demonstrable — front-end/design quality is part of what the
   product is and should remain visibly crafted rather than default.
5. Harden the experience — accessibility, reduced-motion, performance, and
   graceful states (search empty, 404, Disqus loading/offline) are durable
   constraints.

## Accessibility & Inclusion

- Page language `zh`; skip link to main content; consistent `:focus-visible`
  outline; `prefers-reduced-motion` respected; image alt text; aria-labels on
  search and nav.
- No explicit WCAG target or documented assistive-technology requirement is
  established in the repo; that remains an open, non-binding item.
