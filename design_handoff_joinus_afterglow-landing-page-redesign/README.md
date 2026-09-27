# Handoff: JoinUs.lk landing page, "Afterglow" redesign

## Overview
A new landing page for JoinUs.lk, which makes invitation websites (per-guest links, live RSVPs, a host dashboard) for couples, planners and venues in Sri Lanka. The look is a festival at night: deep navy, soft glowing orbs, yellow and periwinkle light, and the pigeon mascot as the hero. The main action is **WhatsApp**.

## About the design files
`JoinUs Festival Redesign.dc.html` is an **HTML design reference**, not production code. Recreate it in the target codebase's existing stack and patterns. If there is no stack yet, a static-site or React setup such as Astro or Next is fine. Open the file in a browser; `support.js` must sit next to it. Only turn **3** matters (options **3a** mobile and **3b** desktop). Turns 1 and 2 are earlier explorations.

## Fidelity
**High-fidelity.** Colours, type, spacing, copy and interactions are final. Image areas (striped boxes) are placeholders.

## Breakpoints
- **< 768px:** mobile layout (3a, designed at 390px, 24px side padding).
- **≥ 1024px:** desktop layout (3b, designed at 1280px, 64px side padding). Content max-width is 1152px, centred.
- **768–1023px:** in between. Use 40px padding, a hero stacked like mobile but with larger type, and a 2-column features grid.

## Design tokens
**Colours**
- `--night` #0E1330: page background
- `--night-2` #161C48: raised panels, CTA background, browser chrome
- `--night-3` #1A2150: template card
- `--placeholder` stripes #252D5E / #20285A
- `--glow` #FFD35A: primary accent (eyebrows, step dots, active states)
- `--periwinkle` #A9B8E8: secondary accent (headline highlight, rings)
- `--dusk` #7083AE: orb and glow colour
- `--ink` #F3F1FF: text. Muted text uses the same colour at 0.78, 0.72, 0.6 or 0.5 opacity.
- `--wa` #25D366 (WhatsApp green) with text #062B14
- Hairlines: rgba(243,241,255,.1). Panel rings: inset 0 0 0 1px rgba(243,241,255,.08–.1).

**Type.** Lexend is used for headlines and titles, Poppins for everything else (Google Fonts).
- Eyebrow: Poppins 600, 11–12px, letter-spacing .28–.3em, uppercase, colour `--glow`
- H1: Lexend 800, 46/1.0 on mobile and 88/0.96 on desktop, letter-spacing -.04 to -.045em. The second line is `--periwinkle`.
- H2: Lexend 800, 30/1.05 on mobile and 52/1.0 on desktop, letter-spacing -.03 to -.035em
- Card title: Lexend 700, 18px mobile / 22px desktop
- Lead: Poppins 300, 16/1.6 mobile, 19/1.6 desktop
- Body: Poppins 300, 14–15/1.55–1.6
- Buttons: Poppins 700, 16px
- Marquee: Lexend 800, 24px mobile / 40px desktop

**Radii.** Buttons 14px, feature cards 20px, panels and quotes 22px, CTA 24px mobile / 28px desktop, pills 999px.

**Glow recipes**
- Dot: 12–16px circle, fill = accent, `box-shadow: 0 0 14px 3px <accent>`
- Hero halo: `radial-gradient(circle, rgba(255,211,90,.45), rgba(112,131,174,.18) 55%, transparent 72%)`
- Template card: `0 0 0 1px rgba(169,184,232,.25), 0 0 50–80px -12px rgba(112,131,174,.8)`
- CTA panel: `radial-gradient(120% 90% at 50% 0%, rgba(255,211,90,.35), transparent 70%), #161C48`

## Sections, top to bottom

1. **Nav**
   - Mobile: logo (36px pigeon, then "JoinUs" and ".lk" in `--glow`, Lexend 800 19px) on the left, a round 44px WhatsApp icon button on the right.
   - Desktop: 44px logo; centred links (Features · How it works · Templates · Kind words, Poppins 500 14px at 78% opacity); on the right, a "Client portal" text link and a green "WhatsApp us" button.
2. **Hero**
   - Mobile: centred. A 170px halo with the 130px pigeon, then the eyebrow "INVITES THAT GLOW", the H1 "Every guest, / on the list.", and the lead "Invitation websites with personal guest links and live RSVPs, for couples, planners and venues in Sri Lanka." Below that, a full-width 56px green button "Chat on WhatsApp" (with chat icon), then a caption "+94 78 943 6808 · replies within the hour".
   - Desktop: a 2-column grid (1.15fr / 1fr, 48px gap). Left: eyebrow, H1 on two lines, lead (max-width 520), then two buttons: green "Chat on WhatsApp" and an outlined "See templates" (inset ring rgba(169,184,232,.5)), with the caption below. Right: a 460px halo, rings of 380px (periwinkle 25%) and 300px (glow 20%), and the 300px pigeon.
3. **Event strip.** A full-bleed marquee listing: Weddings · Homecomings · Engagements · Birthdays · Corporate galas · Anniversaries · Launch nights.
   - Separators are 45°-rotated diamonds, alternating `--glow` and `--periwinkle`, each with a glow.
   - Background `linear-gradient(90deg,#161C48,#1E2660 50%,#161C48)`, with 1px top and bottom borders in rgba(255,211,90,.35).
   - Text shadow `0 0 18px rgba(169,184,232,.55)`.
   - Vertical padding is 16px on mobile and 26px on desktop. It scrolls left continuously on a 40s linear loop (duplicate the content and translate -50%).
4. **What lights up.** Four features, each with its own accent dot:
   - "One link per guest" (glow): "Personal URLs keep seating, dietary notes and headcounts sorted."
   - "Live RSVPs" (periwinkle): "Friendly deadlines and instant replies — watch the list fill up."
   - "Ready-made templates" (WhatsApp green): "Story, gallery, map and RSVP without a blank page."
   - "Host portal" (ink): "Hosts and planners export guests and manage invites securely."

   Mobile shows a list, with the dot on the left and a hairline between rows. Desktop shows a 4-column card grid (min-height 240, the title pushed to the bottom), and on the right of the heading the note "Everything your guests need, without the spreadsheet chaos."
5. **Brief to doors open.** Three steps: 01 Brief / 02 Build / 03 Launch. The body copy for each step is in the HTML file.
   - Mobile: a vertical timeline, with a 2px line and 14px glowing dots.
   - Desktop: a horizontal line with 3 columns.
6. **Templates.** Three templates: Wedding Classic, Beach Modern and Night Glow. **There is no horizontal scroller.**
   - Mobile: a segmented pill switcher (Classic / Beach / Night; the active pill is `--glow` with dark text), above one large preview card (380px image) that has a title, a one-line description and an outlined "Preview" pill.
   - Desktop: a 320px column on the left with a heading, the subtitle "Pick a look. We tailor it to your event." and three selectable rows. The active row has a glow ring and a tinted background. On the right is a browser-frame preview: a 40px chrome bar with the URL `joinus.lk/<slug>` above a 460px image.
7. **Kind words** (placeholders).
   - Mobile: one quote card with a large yellow opening quote mark. Dots at the bottom right switch quotes; the active dot is 22px wide and yellow, the others are 8px.
   - Desktop: all three quote cards side by side.
8. **CTA.** "Send the pigeon." with "Tell us the date, venue and guest count. We'll take it from there." and the button "WhatsApp +94 78 943 6808". Desktop adds a text line "or info@isurumsoysa.com".
9. **Footer.** "© 2026 JoinUs.lk" on the left (desktop adds "· Colombo, Sri Lanka") and "Client portal" on the right, in 12–13px text at 50% opacity.

## Interactions and motion
- **Orbs:** 3 large blurred radial circles, positioned absolutely behind the content, drifting via `translate(12px,-18px)` on a 9, 11 and 13s ease-in-out loop.
- **Marquee:** as described above.
- **Template switcher and quote dots:** clicking changes state; colours and dot width transition over 200–250ms. Optionally auto-advance the quotes every 6s, pausing on hover.
- **WhatsApp buttons:** link to `https://wa.me/94789436808`. Pre-filled text is optional.
- **Reduced motion:** stop the orbs and the marquee (show the strip static, clipped).

## State
- `activeTemplate`: 0–2
- `activeQuote`: 0–2, mobile only

## Assets
- `assets/joinus-pigeon.png`: the mascot and logo mark, supplied by the client.
- Placeholders to replace: template screenshots (3), testimonials (3). The icon is a Lucide-style `message-circle`.

## Files
- `JoinUs Festival Redesign.dc.html`: design reference; see turn 3 (3a and 3b)
- `support.js`: needed only to view the reference file
- `assets/joinus-pigeon.png`
- `PROMPT.md`: a ready-to-paste prompt for Claude Code
