# Handoff: Wedding Invitation Landing Page (Madhushanka & Salani)

## Overview
A single-page wedding invitation site: hero with the couple's names, live countdown, ceremony &
reception details, an optional order of the day, photo gallery, venue/travel info, and an RSVP form
with inline confirmation state. Dark emerald theme with tulip motifs and ambient motion.

The event: **Madhushanka & Salani**, Wednesday **21 October 2026**, **8.00 AM – 3.30 PM**, with the
**Poruwa ceremony at 9.03 AM**, at **Iris Hall, Purple Sun Resort, New Ratnapura Road, Avissawella**.
RSVP by **7 October 2026**.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended
look and behavior, **not production code to copy directly**. The task is to **recreate these
designs in the target codebase's existing environment** (React, Vue, Next, Astro, etc.) using its
established patterns, component library and styling approach. If no environment exists yet, pick
the framework best suited to the project and implement the designs there.

The HTML files use a lightweight in-house streaming component runtime (\`support.js\`, \`<x-dc>\`,
\`{{ }}\` holes, \`<sc-if>\`). **Do not port that runtime.** Read the markup for structure, styling
and copy; read the trailing \`class Component\` script for the state logic.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, shadows, animation timings and all copy are
final. Recreate pixel-for-pixel using the codebase's own primitives. Images are the only
placeholders (striped boxes with monospace labels).

## Files
- \`Wedding Invite v2.dc.html\` — **the design to build** (dark emerald, current direction).
- \`Wedding Invite.dc.html\` — earlier light/off-white variant, kept for reference only.

## Screens / Views
One continuously scrolling page, max content width **1240px**, horizontal padding **6vw**,
sections separated by \`min(13vh,120px)\` top padding.

### 0. Ambient background (fixed, z-index 0, pointer-events none)
- Three blurred radial "aurora" circles, \`position:fixed\`, each animating \`drift\` (26s / 34s
  reverse / 44s, ease-in-out, infinite):
  - 62vw circle, top −14vh / left −6vw, \`radial-gradient(rgba(31,169,113,.34) → transparent 68%)\`, blur 24px
  - 70vw circle, bottom −24vh / right −12vw, \`rgba(120,222,178,.22)\`, blur 30px
  - 44vw circle, top 30vh / left 38vw, \`rgba(214,232,222,.12)\`, blur 26px
- Five falling "petals": 6–10px wide, 9–14px tall, \`border-radius:60% 40% 55% 45% / 70% 70% 30% 30%\`,
  colors #8ff0c0 / #d9f5e7 / #5fe3a5 / #b9ead2, opacity .45–.6, animating \`petal\`
  (17–27s linear infinite, negative delays −3s…−16s so they are staggered on load).
- All page content sits in a wrapper at \`position:relative;z-index:1\`.

### 1. Top meta bar
Flex row, space-between, padding \`32px 6vw 0\`, animates \`rise .9s ease-out\`.
- Left: "21 · 10 · 2026" — Jost 500, 11px, letter-spacing .3em, uppercase, #7fbfa0
- Right: "Iris Hall · Avissawella" — Jost 400, same treatment

### 2. Hero (centered, padding \`min(12vh,110px) 6vw min(9vh,80px)\`)
- Eyebrow: "Together with their families · we invite you to our wedding" — Jost 400, 11px,
  letter-spacing .4em, uppercase, #7fbfa0. \`rise 1s ease-out .1s\`
- Names, two \`<h1>\`s: "Madhushanka" and "Salani" — Cormorant Garamond 300,
  \`font-size:clamp(58px,12vw,168px)\`, line-height .86, letter-spacing −.02em.
  **Note:** "Madhushanka" is 11 characters — far longer than the placeholder the scale was drawn
  against. Cap the display size against the longer of the two names (or add
  \`font-size:min(…, 18vw / len)\`) so it never overflows the 6vw gutter on a 360px screen.
  Gradient text: \`linear-gradient(100deg,#eaf7ef 0%,#5fe3a5 26%,#eaf7ef 52%,#5fe3a5 78%,#eaf7ef 100%)\`,
  \`background-size:200% auto\`, clipped to text, animating \`shimmer 9s linear infinite\`
  (second name uses \`reverse\`), plus \`rise 1.1s\` at .18s / .38s.
- Divider row between names: 1px gradient rules \`min(18vw,140px)\` wide fading to transparent,
  animating \`wipe 1.3s ease-out .5s\`; centered italic "and" — Cormorant Garamond italic 300,
  \`clamp(30px,5vw,60px)\`, #8ff0c0, animating \`pulse 5s\` (text-shadow glow 22px→40px
  rgba(95,227,165,.25→.6)).
- Sub-copy (max 40ch, Jost 300 \`clamp(16px,1.5vw,19px)\`/1.75, #a9c9b8):
  "Two families, a room full of tulips, and one *I do* we'd love you to witness."
  ("I do" is Cormorant Garamond italic, 1.28em, #8ff0c0.)
- Buttons (flex, gap 14px, centered):
  - Primary "Say you'll come →" — padding 16px 34px, radius 999px,
    \`linear-gradient(120deg,#1fa971,#5fe3a5)\`, text #04140d, Jost 500 12px, letter-spacing .2em,
    uppercase, shadow \`0 12px 40px rgba(31,169,113,.4)\`.
    Hover: \`translateY(-3px)\`, shadow \`0 18px 54px rgba(95,227,165,.55)\`. Links to #rsvp.
  - Secondary "The details" — same metrics, \`border:1px solid rgba(143,240,192,.35)\`,
    background \`rgba(255,255,255,.03)\`, text #dfeee5. Hover: border #8ff0c0,
    background \`rgba(143,240,192,.1)\`. Links to #day.
- Tulip row: four CSS-built tulips (heights 136 / 186 / 112 / 158px), flex end-aligned,
  gap \`min(4vw,40px)\`, wrapper \`filter:drop-shadow(0 0 26px rgba(31,169,113,.45))\`.
  Each tulip = absolutely positioned divs: 2–3px stem (\`linear-gradient(#3c8f68,#16402d)\`),
  1–2 leaves (\`border-radius:0 100% 0 100%\` / \`100% 0 100% 0\`, #276b4d–#38916a), and a bloom of
  three petals — two side petals \`border-radius:60% 40% 45% 55% / 70% 70% 30% 30%\` rotated ±10–12°
  and a front petal \`50% 50% 46% 46% / 66% 66% 34% 34%\` in the brighter tone
  (#1fa971/#177650 sides, #5fe3a5/#8ff0c0/#3ec98d front).
  Each sways: \`sway 7–11s ease-in-out infinite\`, \`transform-origin:50% 100%\`, ±2°, staggered
  \`rise 1.2s\` at .7 / .78 / .86 / .94s.

### 3. Countdown band (conditional — \`showCountdown\` prop)
Glass panel: radius 26px, \`border:1px solid rgba(143,240,192,.16)\`,
\`background:linear-gradient(140deg,rgba(31,169,113,.16),rgba(5,15,10,.5))\`, \`backdrop-filter:blur(10px)\`,
padding \`clamp(30px,4vw,52px)\`, flex wrap space-between, gap 36px.
- Left: eyebrow "Counting down to the aisle" (Jost 11px/.34em/uppercase/#7fbfa0) +
  italic line "until we say the two best words we know." — Cormorant Garamond italic 300,
  \`clamp(26px,3.4vw,42px)\`/1.15, #eaf7ef, max 24ch.
- Right: four cells (min-width 80px, radius 18px, \`border:1px solid rgba(143,240,192,.14)\`,
  background \`rgba(255,255,255,.03)\`, padding \`18px 12px 14px\`), gap \`min(3vw,30px)\`.
  Value: Cormorant Garamond 300 \`clamp(38px,5.4vw,62px)\`, #eaf7ef. Label below: Jost 10px,
  letter-spacing .26em, uppercase, #7fbfa0 — DAYS / HOURS / MINUTES / SECONDS.
  The seconds cell is emphasized: border \`rgba(143,240,192,.22)\`, background \`rgba(31,169,113,.14)\`,
  value #8ff0c0 animating \`glow 2s ease-in-out infinite\` (opacity .35↔.9).
- All values zero-padded to 2 digits; ticks every 1000ms.

### 4. Ceremony & reception (id="day")
Heading row: h2 "Ceremony & reception" — Cormorant Garamond 300 \`clamp(34px,5.2vw,66px)\`, #eaf7ef —
followed by a flexible 1px rule \`linear-gradient(90deg,rgba(143,240,192,.5),transparent)\`.
Grid \`repeat(auto-fit,minmax(250px,1fr))\`, gap 20px. Cards: radius 22px, padding \`34px 30px 36px\`,
\`border:1px solid rgba(143,240,192,.14)\`,
\`background:linear-gradient(160deg,rgba(255,255,255,.055),rgba(255,255,255,.015))\`, blur(8px).
Hover: \`translateY(-6px)\`, border \`rgba(143,240,192,.45)\`, shadow \`0 22px 60px rgba(31,169,113,.22)\`,
transitions .3s.
Card anatomy: label (Jost 10px/.3em/uppercase/#7fbfa0) → title (Cormorant Garamond 400, 34px/1.12,
#eaf7ef) → note (Jost 300 14px/1.65, #a9c9b8).
1. THE DAY — "Wednesday, October 21, 2026" — "A Wednesday morning, chosen for the one hour that
   mattered most."
2. THE HOUR — "8.00 AM until 3.30 PM" — "Doors at eight, the Poruwa at 9.03, and lunch for as long
   as it takes."
3. THE PLACE (accent card: border \`rgba(143,240,192,.4)\`,
   \`linear-gradient(150deg,rgba(31,169,113,.34),rgba(31,169,113,.08))\`,
   shadow \`0 18px 60px rgba(31,169,113,.24)\`, label #c8fbe1, title #fff, note #d3f2e2) —
   "Iris Hall, Purple Sun Resort" — "Ceremony and reception in one place, on New Ratnapura Road.
   Parking is on site."
Below: two ghost pills "Add to calendar" (→ #rsvp) and "Directions" (→ #map): padding 14px 28px,
radius 999px, border \`rgba(143,240,192,.3)\`, bg \`rgba(255,255,255,.03)\`, Jost 400 11px/.2em/uppercase.

### 5. Order of the day (optional — \`orderOfDay\` section, **off by default**)
This whole section is opt-in and CMS-driven, unlike the fixed four cells the design shows. It renders
only when the site enables the \`orderOfDay\` section **and** has at least one schedule row; with the
section on but zero rows it stays hidden. Cell count is therefore **N, not 4** — the "highlighted"
treatment below applies to the *last* row, whatever N is.

Heading (Cormorant Garamond 300 \`clamp(30px,4.4vw,54px)\`) + gradient rule. The heading text is
itself editable, defaulting to "Order of the day".
Grid \`repeat(auto-fit,minmax(190px,1fr))\` with \`gap:1px\` over
\`background:rgba(143,240,192,.16)\` to create hairline dividers; outer border
\`1px solid rgba(143,240,192,.16)\`, radius 22px, \`overflow:hidden\`.
Cells: \`background:rgba(5,15,10,.55)\`, padding \`30px 26px\`; hover \`rgba(31,169,113,.14)\`.
Time (Jost 10px, letter-spacing .3em, #7fbfa0) → title (Cormorant Garamond 26px/1.15, #eaf7ef) →
note (Jost 300 13px/1.6, #a9c9b8).
Suggested seed rows for this event (the couple can edit, reorder or delete any of them):
1. 8.00 AM — Guests arrive — "Come early, find a seat, and let someone hand you a drink."
2. 9.03 AM — The Poruwa — "The auspicious hour. Please be seated by 8.45 — it waits for no one."
3. 10.30 AM — Photographs & greetings — "Milk rice, sweets, and far too many group shots."
4. 12.00 PM — Lunch & celebration — "A long table and a longer afternoon, right through to 3.30."
   (last row is highlighted: bg \`rgba(31,169,113,.16)\` → hover \`.26\`, time #c8fbe1, title #fff,
   note #d3f2e2)

### 6. How we got here (conditional — \`showGallery\` prop)
Heading "How we got here" + gradient rule + right-aligned note (max 28ch, Jost 300 14px/1.7,
#a9c9b8): "Seven years, one bouquet of tulips, and a very easy yes."
Grid \`repeat(auto-fit,minmax(168px,1fr))\`, gap 18px, \`align-items:end\`.
Three image placeholders (aspect ratios 3/4, 3/4.6, 1/1): radius 18px,
\`border:1px solid rgba(143,240,192,.16)\`,
\`background:repeating-linear-gradient(135deg,rgba(255,255,255,.055) 0 10px,rgba(255,255,255,.02) 10px 20px)\`,
centered monospace uppercase label 10px/.12em/#7fbfa0: "THE FIRST PHOTO, 2019", "THE ENGAGEMENT",
"THE FIRST BOUQUET". Hover: \`translateY(-8px) rotate(±1–1.2deg)\`, border \`rgba(143,240,192,.45)\`, .35s.
Fourth cell is a quote card (aspect 3/4, border \`rgba(143,240,192,.4)\`,
\`linear-gradient(150deg,rgba(31,169,113,.3),rgba(5,15,10,.6))\`, shadow \`0 18px 60px rgba(31,169,113,.2)\`,
padding 28px, content bottom-aligned): "Still the best decision either of us has ever made."
(Cormorant Garamond italic 300, 27px/1.22, #f2fbf6) + "M & S" (Jost 10px/.28em/uppercase/#8ff0c0).

### 7. Getting there (id="map")
Two-column grid \`repeat(auto-fit,minmax(280px,1fr))\`, gap 36px, centered.
- Left: h2 "Getting there" (Cormorant Garamond 300 \`clamp(34px,5vw,60px)\`/1.04) + body (max 32ch,
  Jost 300 16px/1.75, #a9c9b8): "The Poruwa and the reception both take place in the Iris Hall at
  Purple Sun Resort, just off the New Ratnapura Road. Parking is on site." Then venue name
  (Jost 500 13px, #8ff0c0) — "Iris Hall, Purple Sun Resort" — and "New Ratnapura Road, Avissawella ·
  parking on site" (Jost 300 13px, #88a897).
- Right: map placeholder, aspect 4/3, radius 22px, same striped fill/border as the gallery,
  monospace label "VENUE MAP EMBED". **Replace with a real embedded map** for Purple Sun Resort,
  New Ratnapura Road, Avissawella.

### 8. RSVP (id="rsvp")
Panel: radius 30px, \`border:1px solid rgba(143,240,192,.22)\`,
\`background:linear-gradient(150deg,rgba(31,169,113,.22),rgba(5,15,10,.65))\`, blur(12px),
shadow \`0 30px 90px rgba(0,0,0,.5)\`, padding \`clamp(36px,5vw,76px)\`, \`overflow:hidden\`.
- Decorative oversized tulip, bottom-right (right −52px, bottom −24px, 230×320px), opacity .14,
  \`z-index:0\`, pointer-events none, \`sway 13s\`; content sits at \`z-index:1\` (max-width 640px).
- Eyebrow "Kindly reply by October 7" (Jost 11px/.34em/uppercase/#7fbfa0).
- h2 "Say you'll come" — Cormorant Garamond 300 \`clamp(38px,6.4vw,78px)\`/.98, #fff.
- Sub: "Two fields, ten seconds — and a seat with your name on it at our wedding." (max 44ch, #a9c9b8)
- Form (flex column, gap 28px):
  - "YOUR NAME" label (Jost 10px/.3em/uppercase/#7fbfa0); text input — transparent, no border except
    \`border-bottom:1px solid rgba(143,240,192,.3)\`, padding \`13px 2px\`, 20px/300 #fff,
    placeholder "Kalum Aiya"; focus → border-bottom #8ff0c0 (.25s).
  - "WILL YOU BE JOINING US?" + two toggle pills "Joyfully, yes" / "Sadly, no": padding 15px 28px,
    radius 999px, \`white-space:nowrap\`, Jost 400 12px, letter-spacing .14em, .25s transitions.
    Unselected: bg \`rgba(255,255,255,.03)\`, text #a9c9b8, border \`rgba(143,240,192,.24)\`.
    Selected: bg \`rgba(143,240,192,.18)\`, text #eaf7ef, border #8ff0c0,
    shadow \`0 0 30px rgba(95,227,165,.35)\`.
  - Submit "Send it →": padding 17px 38px, radius 999px,
    \`linear-gradient(120deg,#1fa971,#8ff0c0)\`, text #04140d, Jost 500 12px/.2em/uppercase,
    shadow \`0 14px 44px rgba(95,227,165,.35)\`; hover \`translateY(-3px)\` + \`0 20px 56px rgba(95,227,165,.55)\`.
  - Hint text beside it (Jost 300 13px, #7fbfa0): "A name and an answer, please." — shown until both
    a non-empty name and an attendance choice exist, then empty.
- On submit the whole form is replaced by a confirmation card (radius 20px,
  border \`rgba(143,240,192,.35)\`, bg \`rgba(143,240,192,.09)\`, padding \`32px 34px\`,
  \`rise .7s ease-out\`):
  - Accepting: headline "You're on the list, {name} — a seat is yours." /
    body "Directions, dress notes and a playlist you can complain about are on their way."
  - Declining: headline "We'll miss you, {name}." /
    body "We'll save you a tulip and send photos from the day."
  - Headline Cormorant Garamond 300 34px/1.16 #fff; body Jost 300 15px/1.7 #c8e5d6.

### 9. Footer
Flex wrap, space-between, padding \`76px 6vw 64px\`.
- "Madhushanka & Salani · 21.10.2026" — Cormorant Garamond italic 300, 27px, #8ff0c0
- "Made with tulips · joinus.lk" — Jost 400 10px, letter-spacing .28em, uppercase, #6da28a

## Interactions & Behavior
- **Nav**: in-page anchors only (#day, #map, #rsvp), \`scroll-margin-top:24px\` on targets.
- **Countdown**: 1s interval; target \`2026-10-21T09:03:00+05:30\` (the Poruwa, not the 8.00 AM
  doors); clamped at 0; each unit
  zero-padded. Clear the interval on unmount.
- **RSVP validation**: submit is inert unless \`name.trim()\` is non-empty AND an attendance option is
  selected; the hint communicates this (no error styling). Currently client-side only — wire to a real
  endpoint and add a submitting/error state on integration.
- **Entrance**: staggered \`rise\` (opacity 0→1, translateY 34px→0) on load, .1s–.94s delays. These are
  load-time, not scroll-triggered; scroll-reveal is an acceptable enhancement.
- **Ambient loops**: drift (26/34/44s), petal (17–27s), sway (7–13s), shimmer (9s), glow (2s), pulse (5s).
  Honor \`prefers-reduced-motion\`: disable drift/petal/sway/shimmer and the entrance animations.
- **Hover**: cards lift 6px; gallery tiles lift 8px with ±1.2° tilt; buttons lift 3px with a stronger
  glow; ghost pills brighten border + fill.
- **Responsive**: all type uses \`clamp()\`; every grid is \`auto-fit/minmax\` so it collapses to one
  column on phones. Hero is centered at all widths. No breakpoints needed.

## State Management
- \`now: number\` — ticks each second, drives countdown.
- \`name: string\` — controlled input.
- \`attending: 'yes' | 'no' | null\` — toggle-pill selection.
- \`sent: boolean\` — false → form, true → confirmation card.
Derived: days/hours/minutes/seconds; hint visibility; confirmation copy (depends on \`attending\` and
\`name\`).
Props/config: \`showCountdown\` (bool, default true), \`showGallery\` (bool, default true),
\`orderOfDay\` (**default false** — see §5; also needs at least one schedule row to render).

## Design Tokens
Colors
- Background: #050f0a; panel fills \`rgba(5,15,10,.55–.65)\`
- Accent green: #1fa971 · #5fe3a5 · #8ff0c0 · #3ec98d · #177650 · #2c7a56 · #38916a
- Deep stems: #16402d · #143526 · #1a4a33
- Text: #eaf7ef (headings), #dfeee5 (body on dark), #a9c9b8 (muted), #7fbfa0 (labels),
  #88a897 / #6da28a (fine print), #fff (accent headings), #04140d (text on bright buttons)
- On-accent text: #c8fbe1 · #d3f2e2 · #c8e5d6 · #f2fbf6
- Hairlines: \`rgba(143,240,192,.14 / .16 / .22 / .24 / .3 / .35 / .4)\`
- Surface tints: \`rgba(255,255,255,.015 / .02 / .03 / .055)\`, \`rgba(31,169,113,.08–.34)\`

Typography — Cormorant Garamond (300/400, italics) for display; Jost (300/400/500) for UI.
Scale: 168/78/66/62/60/54/42/34/30/27/26/20/19/16/14/13/12/11/10px as specified per component.
Uppercase label tracking: .26em–.4em.

Spacing — section rhythm \`min(13vh,120px)\` (86px for Order of the day), page gutter 6vw,
max width 1240px, card padding 28–36px, grid gaps 1px / 18px / 20px / 36px, button padding
14–17px × 26–38px.

Radii — 999px pills · 30px RSVP panel · 26px countdown · 22px cards/map · 20px confirmation ·
18–19px gallery/countdown cells · organic tulip radii as listed.

Shadows — \`0 30px 90px rgba(0,0,0,.5)\` · \`0 26px 70px rgba(95,227,165,.34)\` ·
\`0 22px 60px rgba(31,169,113,.22)\` · \`0 20px 56px rgba(95,227,165,.55)\` ·
\`0 18px 60px rgba(31,169,113,.2–.24)\` · \`0 14px 44px rgba(95,227,165,.35)\` ·
\`0 12px 40px rgba(31,169,113,.4)\` · \`0 0 30px rgba(95,227,165,.35)\`

## Assets
- **Fonts**: Google Fonts — Cormorant Garamond, Jost. Self-host if the codebase already does.
- **Tulips and petals**: pure CSS (positioned divs + organic \`border-radius\`) — no images, no SVG.
  Porting them as an SVG component is fine as long as silhouette, colors and sway are preserved.
- **Photography**: none supplied. Three gallery slots + one portrait-style slot exist as striped
  placeholders labelled with intent ("the first photo, 2019", "the engagement", "the first bouquet").
  Ask the couple for real images; keep the stated aspect ratios.
- **Map**: placeholder box — swap in a real map embed for Purple Sun Resort, New Ratnapura Road,
  Avissawella.
- **Icons**: none used.

## Notes for implementation
- Copy is final; treat the text as content, ideally CMS/config-driven (names, date, venue, timings,
  RSVP deadline) rather than hardcoded.
- The RSVP needs a backend: persist name + attendance, and consider guest-count, dietary notes and
  a confirmation email — none of which are in this design.
