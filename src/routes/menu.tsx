import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { menu } from "@/lib/content";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | De Prater Sint-Niklaas" },
      { name: "description", content: "Ontdek het menu van De Prater: brasserieklassiekers, cocktails, koffie en seizoenssuggesties op de Grote Markt." },
      { property: "og:title", content: "Menu | De Prater Sint-Niklaas" },
      { property: "og:description", content: "Brasserieklassiekers, drankjes en suggesties bij De Prater." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-24">
        <p className="text-xs uppercase tracking-[0.25em] text-primary/70">De kaart</p>
        <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">Ons menu</h1>
        <p className="mt-4 max-w-2xl text-foreground/75">
          Ontdek onze brasserieklassiekers, frisse drankjes en gezellige suggesties.
          De prijzen worden door De Prater zelf bijgewerkt — vraag onze bediening voor de actuele kaart.
        </p>
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-primary hover:bg-accent"
        >
          <Download className="h-4 w-4" /> Download menu als PDF
        </a>

        {/* Quick filter */}
        <nav aria-label="Categorieën" className="mt-10 flex flex-wrap gap-2">
          {menu.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground/80 hover:border-primary hover:text-primary">
              {c.title}
            </a>
          ))}
        </nav>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          {menu.map((cat) => (
            <article id={cat.id} key={cat.id} className="rounded-2xl border border-border bg-card p-7 shadow-sm scroll-mt-24">
              <h2 className="font-serif text-2xl text-primary">{cat.title}</h2>
              {cat.intro && <p className="mt-2 text-sm text-muted-foreground">{cat.intro}</p>}
              <ul className="mt-5 divide-y divide-border">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-start justify-between gap-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      {item.description && <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>}
                    </div>
                    {item.price && <span className="font-serif text-base text-primary">{item.price}</span>}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          Allergenen of vragen? Vraag het gerust aan onze bediening.
        </p>
      </section>
    </SiteLayout>
  );
}
