import { Link } from "@tanstack/react-router";
import { Phone, MapPin, UtensilsCrossed } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";

export function MobileCTABar() {
  const { data } = useSiteContent();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-3 text-xs">
        <a
          href={`tel:${data.business.phoneIntl}`}
          className="flex flex-col items-center gap-1 py-3 text-primary"
        >
          <Phone className="h-5 w-5" />
          <span className="font-medium">Bel</span>
        </a>
        <a
          href={data.business.mapsUrl}
          target="_blank"
          rel="noopener"
          className="flex flex-col items-center gap-1 border-x border-border/60 py-3 text-foreground/85"
        >
          <MapPin className="h-5 w-5" />
          <span className="font-medium">Route</span>
        </a>
        <Link to="/menu" className="flex flex-col items-center gap-1 py-3 text-foreground/85">
          <UtensilsCrossed className="h-5 w-5" />
          <span className="font-medium">Menu</span>
        </Link>
      </div>
    </div>
  );
}
