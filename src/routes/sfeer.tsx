import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useSiteContent } from "@/lib/site-content";
import terras from "@/assets/terras.jpg";
import interior from "@/assets/interior.jpg";
import dish from "@/assets/dish.jpg";
import cocktail from "@/assets/cocktail.jpg";
import markt from "@/assets/markt.jpg";
import dessert from "@/assets/dessert.jpg";
import coffee from "@/assets/coffee.jpg";

export const Route = createFileRoute("/sfeer")({
  component: SfeerPage,
});

const photos = [
  { src: terras, alt: "Terras van De Prater met parasols en gasten" },
  { src: interior, alt: "Warm houten interieur van de brasserie" },
  { src: markt, alt: "Grote Markt van Sint-Niklaas in de avondzon" },
  { src: dish, alt: "Steak met frietjes en frisse salade" },
  { src: cocktail, alt: "Cocktail aan de bar" },
  { src: dessert, alt: "Dame Blanche dessert" },
  { src: coffee, alt: "Verse cappuccino" },
];

function SfeerPage() {
  const { data } = useSiteContent();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-24">
        <p className="text-xs uppercase tracking-[0.25em] text-primary/70">Een blik binnen</p>
        <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">
          {data.copy.sfeerTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-foreground/75">{data.copy.sfeerIntro}</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
          {photos.map((p, i) => (
            <img
              key={i}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="w-full break-inside-avoid rounded-2xl object-cover transition hover:brightness-105"
            />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {[
            "Terras",
            "Cocktails",
            "Eten aan de bar",
            "Grote Markt",
            "Gezellig met vrienden",
            "Lunch & diner",
          ].map((b) => (
            <span
              key={b}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground/75"
            >
              {b}
            </span>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
