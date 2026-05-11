import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu as MenuIcon, X, Phone, MapPin } from "lucide-react";
import { isOpenNow } from "@/lib/hours";
import { useSiteContent } from "@/lib/site-content";

const nav = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/dagmenu", label: "Dagmenu" },
  { to: "/sfeer", label: "Sfeer" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { data } = useSiteContent();
  const status = isOpenNow(data.openingHours);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="border-b border-border/60 bg-primary px-4 py-2 text-primary-foreground md:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
          <span className="inline-flex items-center gap-2 font-medium">
            <span
              className={`inline-block h-2 w-2 rounded-full ${status.open ? "bg-emerald-300" : "bg-primary-foreground/55"}`}
              aria-hidden
            />
            {status.label}
          </span>
          <span className="inline-flex items-center gap-2 text-primary-foreground/85">
            <MapPin className="h-3.5 w-3.5" /> {data.business.street}, {data.business.city}
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          to="/"
          className="flex items-baseline gap-2"
          aria-label={`${data.business.name} home`}
        >
          <span className="font-serif text-3xl text-primary md:text-4xl">{data.business.name}</span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            {data.business.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Hoofdnavigatie">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="border-b border-transparent pb-1 text-sm font-semibold tracking-wide text-foreground/80 hover:border-primary/40 hover:text-primary"
              activeProps={{ className: "border-primary text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Admin
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${data.business.phoneIntl}`}
            className="hover-lift inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-warm hover:bg-primary/90"
          >
            <Phone className="h-4 w-4" /> {data.business.phone}
          </a>
        </div>

        <button
          type="button"
          aria-label="Menu openen"
          aria-expanded={open}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/45 md:hidden" onClick={() => setOpen(false)}>
          <nav
            className="surface-glass ml-auto flex h-full w-[84%] max-w-sm flex-col gap-2 px-4 py-6"
            aria-label="Mobiele navigatie"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-serif text-2xl text-primary">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-card"
                aria-label="Sluit menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-border/60 bg-card px-4 py-3 text-base font-semibold text-foreground/90"
                activeProps={{ className: "border-primary/40 bg-primary/10 text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-primary/30 bg-primary px-4 py-3 text-base font-semibold text-primary-foreground"
            >
              Admin
            </Link>
            <a
              href={`tel:${data.business.phoneIntl}`}
              className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-base font-semibold text-primary"
            >
              <Phone className="h-4 w-4" /> {data.business.phone}
            </a>
            <p className="mt-1 text-xs text-muted-foreground">{status.label}</p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
