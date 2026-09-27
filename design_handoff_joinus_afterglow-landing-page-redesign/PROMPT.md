# Prompt for Claude Code

Paste this into Claude Code from the root of the JoinUs.lk website repo, with this folder copied into it.

---

Redesign the JoinUs.lk landing page to match the "Afterglow" design in `design_handoff_joinus_afterglow/`.

- Read `design_handoff_joinus_afterglow/README.md` first. It is the full spec.
- The reference is `JoinUs Festival Redesign.dc.html`. Open it in a browser and look at option **3a** (mobile, 390px) and **3b** (desktop, 1280px), in the "3" section at the top. Ignore turns 1 and 2; those are older explorations.
- The HTML is a design reference, not production code. Rebuild it using this repo's existing framework, component patterns and styling approach. Don't copy the inline-style markup or `support.js`.
- Build one responsive page. Mobile-first: under 768px follow 3a, and from 1024px up follow 3b. Between those, blend the two sensibly (for example, a 2-column feature grid).
- Use the exact colours, fonts, sizes and copy listed in the README.
- Keep the existing WhatsApp number, email, client-portal link and any analytics or SEO tags.
- Put `assets/joinus-pigeon.png` into the project's asset pipeline, and export it as optimised WebP/PNG at 1x and 2x.
- Template previews and testimonials are placeholders. Wire them to real data if the repo has it; otherwise leave clearly marked TODOs.
- Respect `prefers-reduced-motion`: turn off the floating orbs and pause the marquee.
- Check accessibility: body text at 4.5:1 contrast, tap targets at least 44px, and the template switcher and quote dots usable from the keyboard (use a proper tablist and buttons with aria labels).
- When you're done, list any deviations from the spec and why.
