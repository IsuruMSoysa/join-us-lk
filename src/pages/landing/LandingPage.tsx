import { useEffect } from "react";
import { Link } from "react-router-dom";
import { brand, getDefaultDocumentTitle } from "../../config/brand";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export function LandingPage() {
  useEffect(() => {
    document.title = getDefaultDocumentTitle();
  }, []);

  return (
    <div className="min-h-screen bg-background text-text">
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-20">
        <section className="text-center space-y-6">
          <Badge variant="secondary">{brand.marketingTagline}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-round tracking-tight">
            Beautiful Digital Invitations for Your Special Day
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-text/75">
            {brand.displayName} creates personalized invitation websites with
            custom templates, RSVP tracking, invitee links, and a secure client
            portal.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={`mailto:${brand.supportEmail}`}
              className="px-6 py-3 rounded-2xl bg-primary text-background font-semibold"
            >
              Contact Us
            </a>
            <Link
              to="/portal"
              className="px-6 py-3 rounded-2xl border border-secondary/30 text-secondary font-semibold"
            >
              Client Portal
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {[
            "Template-based invite websites",
            "Unique URL per invitee with RSVP",
            "Admin and client dashboards",
          ].map((item) => (
            <Card key={item} className="glass rounded-3xl">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl">{item}</h3>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-round text-center">
            Template Showcase
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass rounded-3xl">
              <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-3">Wedding Classic</h3>
              <p className="text-text/70 mb-6">
                Elegant wedding invitation with sections for story, details,
                gallery, map, and RSVP.
              </p>
              </CardContent>
            </Card>
            <Card className="glass rounded-3xl">
              <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-3">More Templates</h3>
              <p className="text-text/70">
                Additional template families can be added in code and instantly
                used in your admin setup flow.
              </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
