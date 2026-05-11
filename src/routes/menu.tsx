import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
});

function MenuPage() {
  const { data } = useSiteContent();
  const visiblePhotos = data.menuPhotos.filter((photo) => photo.src.trim().length > 0);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-24">
        <p className="text-xs uppercase tracking-[0.25em] text-primary/70">De kaart</p>
        <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">{data.copy.menuTitle}</h1>
        <p className="mt-4 max-w-2xl text-foreground/75">{data.copy.menuIntro}</p>

        <nav
          aria-label="Categorieën"
          className="surface-glass mt-10 flex gap-2 overflow-x-auto rounded-2xl p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {data.menu.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/85 hover:border-primary hover:text-primary"
            >
              {c.title}
            </a>
          ))}
        </nav>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="section-shell rounded-2xl p-5 shadow-sm">
          <h2 className="font-serif text-2xl text-primary">Originele kaartfoto's</h2>
          {visiblePhotos.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {visiblePhotos.map((photo, index) => (
                <figure
                  key={`${photo.title}-${index}`}
                  className="overflow-hidden rounded-xl border border-border"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
                    {photo.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Nog geen foto toegevoegd. Upload of plak kaartfoto's via de adminpagina om ze hier te
              tonen.
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 md:px-6 md:pb-16">
        <div className="grid gap-10 md:grid-cols-2">
          {data.menu.map((cat) => (
            <article
              id={cat.id}
              key={cat.id}
              className="section-shell scroll-mt-24 rounded-2xl p-7 shadow-sm"
            >
              <h2 className="font-serif text-2xl text-primary">{cat.title}</h2>
              {cat.intro && <p className="mt-2 text-sm text-muted-foreground">{cat.intro}</p>}
              <ul className="mt-5 divide-y divide-border">
                {cat.items.map((item, itemIndex) => (
                  <li
                    key={`${item.name}-${itemIndex}`}
                    className="flex items-start justify-between gap-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      {item.description && (
                        <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                    {item.price && (
                      <span className="font-serif text-base text-primary">{item.price}</span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
