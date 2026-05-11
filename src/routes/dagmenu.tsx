import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { business, dagmenu } from "@/lib/content";

export const Route = createFileRoute("/dagmenu")({
  head: () => ({
    meta: [
      { title: "Dagmenu | De Prater Sint-Niklaas" },
      { name: "description", content: "Bekijk het dagmenu van De Prater. Dagelijks vers samengesteld door onze keuken op de Grote Markt." },
      { property: "og:title", content: "Dagmenu | De Prater Sint-Niklaas" },
    ],
  }),
  component: DagmenuPage,
});

function DagmenuPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 pt-16 md:px-6 md:pt-24">
        <p className="text-xs uppercase tracking-[0.25em] text-primary/70">Vandaag bij De Prater</p>
        <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">Dagmenu</h1>
        <p className="mt-4 text-foreground/75">
          Bekijk hier ons dagmenu. Dagelijks vers, vertrouwd en met zorg geserveerd.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-warm">
          <div className="bg-gradient-warm p-8 text-primary-foreground md:p-10">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] text-gold">{dagmenu.date}</span>
              <span className="font-serif text-2xl text-gold">{dagmenu.price}</span>
            </div>
            <p className="mt-3 font-serif text-2xl">Driegangenmenu uit onze keuken</p>
          </div>
          <div className="divide-y divide-border p-8 md:p-10">
            <Course label="Soep / voorgerecht" value={dagmenu.soup} />
            <Course label="Hoofdgerecht" value={dagmenu.main} />
            <Course label="Dessert" value={dagmenu.dessert} />
          </div>
          <div className="border-t border-border bg-secondary/40 p-6 md:p-8">
            <a
              href={`tel:${business.phoneIntl}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" /> Bel om te reserveren — {business.phone}
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Het dagmenu wordt door De Prater dagelijks bijgewerkt. Vraag onze bediening voor de actuele suggesties.
        </p>
      </section>
    </SiteLayout>
  );
}

function Course({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-5">
      <p className="text-xs uppercase tracking-[0.2em] text-primary/70">{label}</p>
      <p className="mt-1 font-serif text-xl text-foreground">{value}</p>
    </div>
  );
}
