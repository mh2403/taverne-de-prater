import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin, UtensilsCrossed, Clock, Star, Sun, Wine } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSiteContent } from "@/lib/site-content";
import terras from "@/assets/terras.jpg";
import interior from "@/assets/interior.jpg";
import dish from "@/assets/dish.jpg";
import cocktail from "@/assets/cocktail.jpg";
import markt from "@/assets/markt.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { data } = useSiteContent();

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img
          src={terras}
          alt="Terras van De Prater op de Grote Markt in Sint-Niklaas"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1120}
          height={612}
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/40 to-black/70"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-4 py-24 text-primary-foreground sm:py-32 md:px-6 md:py-40">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {data.copy.homeHeroBadge}
          </span>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl md:text-6xl">
            {data.copy.homeHeroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
            {data.copy.homeHeroText}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition hover:brightness-95"
            >
              <UtensilsCrossed className="h-4 w-4" /> Bekijk het menu
            </Link>
            <a
              href={`tel:${data.business.phoneIntl}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/95 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary-foreground"
            >
              <Phone className="h-4 w-4" /> Bel ons
            </a>
            <a
              href={data.business.mapsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <MapPin className="h-4 w-4" /> Route openen
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center md:px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-primary/70">Welkom</p>
        <h2 className="mt-3 font-serif text-3xl text-primary sm:text-4xl">
          {data.copy.homeIntroTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg">
          {data.copy.homeIntroText}
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            { icon: Sun, title: "Gezellig terras", text: "Buiten genieten op de Grote Markt." },
            { icon: Clock, title: "Openingsuren", text: "Raadpleeg live openingsuren hieronder." },
            { icon: MapPin, title: "Centrale ligging", text: "Midden op de Grote Markt." },
          ].map((u) => (
            <div
              key={u.title}
              className="rounded-2xl border border-border bg-card p-6 text-left shadow-sm"
            >
              <u.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-serif text-xl">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="bg-primary px-6 py-5 text-primary-foreground">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Deze week</p>
            <h2 className="mt-2 font-serif text-3xl">{data.weeklyMenu.title}</h2>
            <p className="mt-1 text-sm text-primary-foreground/80">{data.weeklyMenu.weekLabel}</p>
          </div>
          <div className="grid gap-4 p-6 lg:grid-cols-2">
            <div className="space-y-3">
              {data.weeklyMenu.days.map((day) => (
                <div key={day.label} className="rounded-xl border border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {day.label}
                  </p>
                  <p className="mt-1 text-sm text-foreground/85">{day.dish}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Weekend menu
                </p>
                <p className="mt-1 text-sm text-foreground/85">{data.weeklyMenu.weekendStarter}</p>
                <p className="mt-1 text-sm text-foreground/85">{data.weeklyMenu.weekendMain}</p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Prijzen
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  {data.weeklyMenu.prices.map((price) => (
                    <li key={price.label} className="flex items-center justify-between gap-2">
                      <span>{price.label}</span>
                      <strong className="font-serif text-primary">{price.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`tel:${data.business.phoneIntl}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Phone className="h-4 w-4" /> Reserveer: {data.weeklyMenu.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Dagmenu</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{data.copy.homeDagmenuTitle}</h2>
            <p className="mt-4 text-primary-foreground/80">{data.copy.homeDagmenuText}</p>
            <Link
              to="/dagmenu"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground hover:brightness-95"
            >
              Volledig dagmenu
            </Link>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-8 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                {data.dagmenu.date}
              </span>
              <span className="font-serif text-xl text-gold">{data.dagmenu.price}</span>
            </div>
            <dl className="mt-6 space-y-5">
              <Row label="Soep" value={data.dagmenu.soup} />
              <Row label="Hoofdgerecht" value={data.dagmenu.main} />
              <Row label="Dessert" value={data.dagmenu.dessert} />
            </dl>
            <a
              href={`tel:${data.business.phoneIntl}`}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary hover:bg-white"
            >
              <Phone className="h-4 w-4" /> Bel om te reserveren
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary/70">Sfeer</p>
            <h2 className="mt-2 font-serif text-3xl text-primary sm:text-4xl">
              {data.copy.homeSfeerTitle}
            </h2>
          </div>
          <Link to="/sfeer" className="text-sm font-medium text-primary hover:underline">
            Meer foto's →
          </Link>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:grid-rows-2">
          <img
            src={interior}
            alt="Sfeervol interieur van brasserie De Prater"
            loading="lazy"
            className="row-span-2 h-full w-full rounded-2xl object-cover sm:aspect-auto"
          />
          <img
            src={dish}
            alt="Klassiek brasseriegerecht steak frites"
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover"
          />
          <img
            src={cocktail}
            alt="Verse cocktail aan de bar"
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover"
          />
          <img
            src={markt}
            alt="Grote Markt van Sint-Niklaas"
            loading="lazy"
            className="col-span-2 aspect-[2/1] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < 4 ? "fill-gold text-gold" : "fill-gold/40 text-gold/40"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">4,3 / 5</span>
              <span className="text-sm text-muted-foreground">· 329 reviews</span>
            </div>
            <h2 className="mt-5 font-serif text-3xl text-primary sm:text-4xl">
              {data.copy.homeReviewsTitle}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {data.reviews.map((r, i) => (
              <figure key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <Wine className="h-5 w-5 text-gold" />
                <blockquote className="mt-3 text-foreground/85">"{r.text}"</blockquote>
                <figcaption className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
                  {r.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-warm text-primary-foreground shadow-warm">
          <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl">{data.copy.homeContactTitle}</h2>
              <p className="mt-3 text-primary-foreground/85">
                {data.business.street}, {data.business.city}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${data.business.phoneIntl}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground"
                >
                  <Phone className="h-4 w-4" /> {data.business.phone}
                </a>
                <a
                  href={data.business.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  <MapPin className="h-4 w-4" /> Route
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-6">
              <h3 className="font-serif text-xl text-gold">Openingsuren</h3>
              <ul className="mt-3 space-y-1 text-sm text-primary-foreground/85">
                {data.openingHours.map((day) => (
                  <li key={day.day} className="flex justify-between">
                    <span>{day.day}</span>
                    <span>{day.open ? `${day.open} – ${day.close}` : "Gesloten"}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">{label}</dt>
      <dd className="mt-1 font-serif text-lg">{value}</dd>
    </div>
  );
}
