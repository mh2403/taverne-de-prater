import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/site-content";

export function SiteFooter() {
  const { data } = useSiteContent();

  return (
    <footer className="mt-20 border-t border-border/70 bg-secondary/55">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="section-shell rounded-3xl p-6 shadow-sm md:p-10">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <p className="font-serif text-3xl text-primary">{data.business.name}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {data.business.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/82">
                {data.business.street}
                <br />
                {data.business.city}
                <br />
                <a
                  href={`tel:${data.business.phoneIntl}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {data.business.phone}
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
                Openingsuren
              </h3>
              <ul className="mt-4 space-y-1.5 text-sm text-foreground/80">
                {data.openingHours.map((d) => (
                  <li key={d.day} className="flex justify-between gap-3">
                    <span>{d.day}</span>
                    <span className="text-muted-foreground">
                      {d.open ? `${d.open} – ${d.close}` : "Gesloten"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
                Navigatie
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-foreground/80 hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/menu" className="text-foreground/80 hover:text-primary">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link to="/dagmenu" className="text-foreground/80 hover:text-primary">
                    Dagmenu
                  </Link>
                </li>
                <li>
                  <Link to="/sfeer" className="text-foreground/80 hover:text-primary">
                    Sfeer & terras
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-foreground/80 hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="text-foreground/80 hover:text-primary">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
                Info
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={data.business.mapsUrl}
                    target="_blank"
                    rel="noopener"
                    className="text-foreground/80 hover:text-primary"
                  >
                    Route in Google Maps
                  </a>
                </li>
                <li>
                  <span className="text-foreground/60">Privacybeleid (in opmaak)</span>
                </li>
                <li>
                  <span className="text-foreground/60">Cookiebeleid (in opmaak)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-7 text-center text-xs text-muted-foreground md:px-6">
        © {new Date().getFullYear()} {data.business.name}. Alle rechten voorbehouden.
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </footer>
  );
}
