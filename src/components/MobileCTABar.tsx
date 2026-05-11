import { Link } from "@tanstack/react-router";
import { Phone, MapPin, UtensilsCrossed } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";

export function MobileCTABar() {
  const { data } = useSiteContent();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/94 backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2 px-3 py-2 text-xs">
        <a
          href={`tel:${data.business.phoneIntl}`}
          className="inline-flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg bg-primary text-primary-foreground"
        >
          <Phone className="h-4 w-4" />
          <span className="font-semibold">Bel</span>
        </a>
        <a
          href={data.business.mapsUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-card text-foreground"
        >
          <MapPin className="h-4 w-4" />
          <span className="font-semibold">Route</span>
        </a>
        <Link
          to="/menu"
          className="inline-flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-card text-foreground"
        >
          <UtensilsCrossed className="h-4 w-4" />
          <span className="font-semibold">Menu</span>
        </Link>
      </div>
    </div>
  );
}
