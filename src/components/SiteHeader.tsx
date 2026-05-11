import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu as MenuIcon, X, Phone } from "lucide-react";
import { isOpenNow } from "@/lib/hours";
import { useSiteContent } from "@/lib/site-content";

const nav = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/dagmenu", label: "Dagmenu" },
  { to: "/sfeer", label: "Sfeer & terras" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { data } = useSiteContent();
  const status = isOpenNow(data.openingHours);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          to="/"
          className="flex items-baseline gap-2"
          aria-label={`${data.business.name} home`}
        >
          <span className="font-serif text-2xl font-semibold tracking-tight text-primary">
            {data.business.name}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            {data.business.city}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Hoofdnavigatie">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground/80 hover:bg-accent"
          >
            Admin
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span
              className={`inline-block h-2 w-2 rounded-full ${status.open ? "bg-emerald-600" : "bg-muted-foreground/50"}`}
              aria-hidden
            />
            {status.label}
          </span>
          <a
            href={`tel:${data.business.phoneIntl}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Phone className="h-4 w-4" /> {data.business.phone}
          </a>
        </div>

        <button
          type="button"
          aria-label="Menu openen"
          aria-expanded={open}
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="flex flex-col px-4 py-2" aria-label="Mobiele navigatie">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/85 hover:bg-accent"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium text-primary hover:bg-accent"
            >
              Admin
            </Link>
            <span className="px-3 pb-3 pt-2 text-xs text-muted-foreground">{status.label}</span>
          </nav>
        </div>
      )}
    </header>
  );
}
