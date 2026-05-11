import { Link } from "@tanstack/react-router";
import { business, openingHours } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <p className="font-serif text-2xl font-semibold text-primary">De Prater</p>
          <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">Brasserie · Taverne</p>
          <p className="mt-4 text-sm text-foreground/80">
            {business.street}<br />
            {business.city}<br />
            <a href={`tel:${business.phoneIntl}`} className="hover:text-primary">{business.phone}</a>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Openingsuren</h3>
          <ul className="mt-4 space-y-1 text-sm text-foreground/80">
            {openingHours.map((d) => (
              <li key={d.day} className="flex justify-between gap-3">
                <span>{d.day}</span>
                <span className="text-muted-foreground">{d.open ? `${d.open} – ${d.close}` : "Gesloten"}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Navigatie</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="text-foreground/80 hover:text-primary">Home</Link></li>
            <li><Link to="/menu" className="text-foreground/80 hover:text-primary">Menu</Link></li>
            <li><Link to="/dagmenu" className="text-foreground/80 hover:text-primary">Dagmenu</Link></li>
            <li><Link to="/sfeer" className="text-foreground/80 hover:text-primary">Sfeer & terras</Link></li>
            <li><Link to="/contact" className="text-foreground/80 hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Info</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={business.mapsUrl} target="_blank" rel="noopener" className="text-foreground/80 hover:text-primary">Route in Google Maps</a></li>
            <li><a href="#" className="text-foreground/80 hover:text-primary">Privacybeleid</a></li>
            <li><a href="#" className="text-foreground/80 hover:text-primary">Cookiebeleid</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-5 text-center text-xs text-muted-foreground md:px-6">
        © {new Date().getFullYear()} De Prater. Alle rechten voorbehouden.
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </footer>
  );
}
