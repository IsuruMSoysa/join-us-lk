import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type MapSectionProps = {
  content: EventContent;
  mapEmbedSrc: string;
};

export function BeachMap({ content, mapEmbedSrc }: MapSectionProps) {
  return (
    <section id="map" className="py-24">
      <AnimatedSection>
        <div className="text-center mb-20">
          <h2 className="font-sans text-4xl md:text-6xl text-sky-950 font-bold mb-6 tracking-tight">
            {content.mapTitle}
          </h2>
          <p className="font-sans text-sky-600/60 uppercase tracking-[0.3em] font-bold text-sm">{content.venueName}</p>
        </div>
        
        <div className="bg-white/40 backdrop-blur-md p-6 rounded-[4rem] border border-white/60 overflow-hidden shadow-2xl shadow-sky-900/5">
          <div className="rounded-[3rem] overflow-hidden grayscale-[0.5] hover:grayscale-0 transition-all duration-1000 border border-sky-100">
            <iframe
              src={mapEmbedSrc}
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue location"
            />
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
