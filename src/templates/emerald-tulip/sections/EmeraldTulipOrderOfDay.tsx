import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type EmeraldTulipOrderOfDayProps = {
  content: EventContent;
};

/**
 * The optional schedule. Three independent gates decide whether this renders:
 * the template carries an `orderOfDay` entry in its sectionRegistry, the site
 * enables the section in `config.sections`, and — here — the site has at least
 * one row to show.
 *
 * `orderOfDayItems` / `orderOfDayTitle` are optional on EventContent because
 * InviteSiteLoader copies the Firestore document's `content` verbatim without
 * merging template defaults, so every site saved before the section existed has
 * neither key. The guards below are load-bearing.
 */
export function EmeraldTulipOrderOfDay({
  content,
}: EmeraldTulipOrderOfDayProps) {
  const items = content.orderOfDayItems ?? [];
  if (!items.length) return null;

  const title = content.orderOfDayTitle?.trim() || "Order of the day";

  return (
    <section id="order-of-day" className="scroll-mt-6 pt-[86px]">
      <AnimatedSection>
        <div className="flex items-center gap-6">
          <h2 className="et-display shrink-0 text-[clamp(30px,4.4vw,54px)] font-light text-[#eaf7ef]">
            {title}
          </h2>
          <span className="h-px grow bg-gradient-to-r from-[#8ff0c0]/50 to-transparent" />
        </div>

        {/* gap:1px over a tinted background draws the hairline dividers, so the
            grid needs no per-cell borders and stays clean at any column count. */}
        <div
          className="mt-9 grid gap-px overflow-hidden rounded-[22px] border border-[#8ff0c0]/[0.16] [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]"
          style={{ background: "rgba(143,240,192,.16)" }}
        >
          {items.map((item, i) => {
            // The design highlights its final cell; with an editable list that
            // becomes "the last row", whatever the row count is.
            const highlighted = i === items.length - 1 && items.length > 1;

            return (
              <div
                key={`${item.time}-${item.title}-${i}`}
                className={`px-[26px] py-[30px] transition-colors ${
                  highlighted
                    ? "bg-[#1fa971]/[0.16] hover:bg-[#1fa971]/[0.26]"
                    : "bg-[#050f0a]/[0.55] hover:bg-[#1fa971]/[0.14]"
                }`}
              >
                {item.time ? (
                  <p
                    className={`et-ui text-[10px] uppercase tracking-[0.3em] ${
                      highlighted ? "text-[#c8fbe1]" : "text-[#7fbfa0]"
                    }`}
                  >
                    {item.time}
                  </p>
                ) : null}
                <p
                  className={`et-display mt-3 text-[26px] font-normal leading-[1.15] ${
                    highlighted ? "text-white" : "text-[#eaf7ef]"
                  }`}
                >
                  {item.title}
                </p>
                {item.description ? (
                  <p
                    className={`et-ui mt-2.5 text-[13px] font-light leading-[1.6] ${
                      highlighted ? "text-[#d3f2e2]" : "text-[#a9c9b8]"
                    }`}
                  >
                    {item.description}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </AnimatedSection>
    </section>
  );
}
