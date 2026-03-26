import { AnimatedSection } from "../../../components/shared/AnimatedSection";
import { type EventContent } from "../../../types/template";

type MapSectionProps = {
  content: EventContent;
  mapEmbedSrc: string;
};

export function MapSection({ content, mapEmbedSrc }: MapSectionProps) {
  return (
    <section id="map" className="py-16">
      <AnimatedSection>
        <div className="text-center mb-16">
          <h2 className="font-round text-3xl md:text-5xl text-secondary font-bold mb-4">
            {content.mapTitle}
          </h2>
          <p className="font-round text-text/60 uppercase tracking-widest">{content.venueName}</p>
        </div>
        <div className="glass p-4 rounded-[3rem] border-primary/20 overflow-hidden shadow-2xl">
          <div className="rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
            <iframe
              src={mapEmbedSrc}
              width="100%"
              height="500"
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
