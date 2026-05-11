import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MapPin, UtensilsCrossed, Clock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { data } = useSiteContent();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-24">
        <p className="text-xs uppercase tracking-[0.25em] text-primary/70">Kom langs</p>
        <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">
          {data.copy.contactTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-foreground/75">{data.copy.contactIntro}</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h2 className="font-serif text-2xl text-primary">{data.business.name}</h2>
          <address className="mt-4 not-italic text-foreground/80">
            {data.business.street}
            <br />
            {data.business.city}
            <br />
            {data.business.country}
          </address>

          <div className="mt-6 space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />{" "}
              <a href={`tel:${data.business.phoneIntl}`} className="hover:text-primary">
                {data.business.phone}
              </a>
            </p>
            <p className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-primary" />
              <span>Zie actuele openingsuren hieronder</span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${data.business.phoneIntl}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" /> Bel {data.business.phone}
            </a>
            <a
              href={data.business.mapsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-primary hover:bg-accent"
            >
              <MapPin className="h-4 w-4" /> Open in Google Maps
            </a>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
            >
              <UtensilsCrossed className="h-4 w-4" /> Bekijk menu
            </Link>
          </div>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-foreground/70">
            Openingsuren
          </h3>
          <ul className="mt-3 divide-y divide-border text-sm">
            {data.openingHours.map((d) => (
              <li key={d.day} className="flex justify-between py-2">
                <span>{d.day}</span>
                <span className="text-muted-foreground">
                  {d.open ? `${d.open} – ${d.close}` : "Gesloten"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {mapLoaded ? (
            <iframe
              title="Locatie De Prater op Google Maps"
              src={data.business.mapsEmbed}
              className="h-full min-h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 bg-secondary/40 p-8 text-center">
              <MapPin className="h-10 w-10 text-primary" />
              <p className="max-w-sm text-sm text-muted-foreground">
                Voor je privacy laden we de Google-kaart enkel op verzoek.
              </p>
              <button
                type="button"
                onClick={() => setMapLoaded(true)}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Kaart laden
              </button>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
