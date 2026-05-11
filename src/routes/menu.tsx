import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  Beer,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Soup,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSiteContent } from "@/lib/site-content";
import type { MenuCategory } from "@/lib/content";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
});

type MenuGroupKey = "all" | "drinks" | "food";
type CategoryKind = "drinks" | "food" | "special";

const groupConfig: Array<{ key: MenuGroupKey; label: string; icon: typeof Beer }> = [
  { key: "all", label: "Alles", icon: UtensilsCrossed },
  { key: "drinks", label: "Dranken", icon: Beer },
  { key: "food", label: "Eten", icon: Soup },
];

function classifyCategory(category: MenuCategory): CategoryKind {
  if (category.id === "suggesties-prijzen") return "special";

  const value = `${category.id} ${category.title}`.toLowerCase();
  const isDrink = /bier|fris|drank|wijn|aperitief|likeur|jenever|koffie|thee|alcohol/.test(value);

  return isDrink ? "drinks" : "food";
}

function toCategoriesForGroup(categories: MenuCategory[], group: MenuGroupKey): MenuCategory[] {
  if (group === "all") return categories;

  return categories.filter((category) => {
    const kind = classifyCategory(category);
    if (group === "drinks") return kind === "drinks";
    return kind === "food" || kind === "special";
  });
}

function MenuPage() {
  const { data } = useSiteContent();
  const visiblePhotos = data.menuPhotos.filter((photo) => photo.src.trim().length > 0);

  const [activeGroup, setActiveGroup] = useState<MenuGroupKey>("drinks");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openCategory, setOpenCategory] = useState("");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const groupCounts = useMemo(() => {
    const all = data.menu.length;
    const drinks = toCategoriesForGroup(data.menu, "drinks").length;
    const food = toCategoriesForGroup(data.menu, "food").length;
    return { all, drinks, food };
  }, [data.menu]);

  const filteredCategories = useMemo(
    () => toCategoriesForGroup(data.menu, activeGroup),
    [activeGroup, data.menu],
  );

  useEffect(() => {
    if (filteredCategories.length === 0) {
      setSelectedCategory("");
      setOpenCategory("");
      return;
    }

    if (!filteredCategories.some((category) => category.id === selectedCategory)) {
      setSelectedCategory(filteredCategories[0].id);
      setOpenCategory(filteredCategories[0].id);
    }
  }, [filteredCategories, selectedCategory]);

  useEffect(() => {
    if (activePhotoIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePhotoIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setActivePhotoIndex((current) => {
          if (current === null) return current;
          return Math.min(current + 1, visiblePhotos.length - 1);
        });
      }

      if (event.key === "ArrowLeft") {
        setActivePhotoIndex((current) => {
          if (current === null) return current;
          return Math.max(current - 1, 0);
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePhotoIndex, visiblePhotos.length]);

  const jumpToCategory = (categoryId: string) => {
    if (!categoryId) return;
    setSelectedCategory(categoryId);
    setOpenCategory(categoryId);

    requestAnimationFrame(() => {
      const el = document.getElementById(categoryId);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const sectionCountLabel =
    activeGroup === "all"
      ? `${groupCounts.all} categorieën`
      : activeGroup === "drinks"
        ? `${groupCounts.drinks} drankencategorieën`
        : `${groupCounts.food} eetcategorieën`;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl overflow-x-clip px-4 pt-12 md:px-6 md:pt-20">
        <p className="text-xs uppercase tracking-[0.25em] text-primary/70">De kaart</p>
        <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">{data.copy.menuTitle}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">
          {data.copy.menuIntro}
        </p>

        <div className="surface-glass mt-8 rounded-2xl p-4 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
            Stap 1: kies hoofdgroep
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {groupConfig.map((group) => {
              const Icon = group.icon;
              const count =
                group.key === "all"
                  ? groupCounts.all
                  : group.key === "drinks"
                    ? groupCounts.drinks
                    : groupCounts.food;

              return (
                <button
                  key={group.key}
                  type="button"
                  onClick={() => setActiveGroup(group.key)}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-base font-semibold ${
                    activeGroup === group.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground"
                  }`}
                  aria-pressed={activeGroup === group.key}
                >
                  <Icon className="h-4 w-4" />
                  {group.label}
                  <span className="text-sm opacity-85">({count})</span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
            Stap 2: kies subcategorie
          </p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="menu-subcategory">
              Subcategorie
            </label>
            <select
              id="menu-subcategory"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-input bg-card px-4 text-lg font-semibold text-foreground sm:text-base"
            >
              {filteredCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => jumpToCategory(selectedCategory)}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary px-4 text-lg font-semibold text-primary-foreground sm:w-auto sm:text-base"
            >
              <ArrowDown className="h-4 w-4" /> Toon
            </button>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => jumpToCategory(category.id)}
                className={`min-h-11 rounded-lg border px-3 py-2 text-left text-base font-semibold ${
                  category.id === selectedCategory
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground/90"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          <p className="mt-3 text-sm text-muted-foreground">Je bekijkt nu: {sectionCountLabel}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 md:px-6 md:py-10">
        <div className="section-shell rounded-2xl p-5 shadow-sm">
          <h2 className="font-serif text-2xl text-primary">Originele kaartfoto's</h2>
          {visiblePhotos.length > 0 ? (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Tik op een foto om groot te bekijken. Swipe links/rechts voor meer.
              </p>
              <div className="mt-3 flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]">
                {visiblePhotos.map((photo, index) => (
                  <button
                    key={`${photo.title}-${index}`}
                    type="button"
                    onClick={() => setActivePhotoIndex(index)}
                    className="group w-34 shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card text-left sm:w-40"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="aspect-[3/4] w-full object-cover transition group-hover:brightness-105"
                      loading="lazy"
                    />
                    <span className="line-clamp-2 border-t border-border/70 bg-secondary/40 px-2 py-2 text-xs text-muted-foreground">
                      {photo.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Nog geen foto toegevoegd. Upload of plak kaartfoto's via de adminpagina om ze hier te
              tonen.
            </p>
          )}
        </div>
      </section>

      {activePhotoIndex !== null ? (
        <div
          className="fixed inset-0 z-[140] bg-black/88 p-3 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-neutral-950/60"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/20 px-3 py-2 text-white sm:px-4">
              <p className="truncate text-sm font-semibold sm:text-base">
                {visiblePhotos[activePhotoIndex]?.title}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={visiblePhotos[activePhotoIndex]?.src}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-white/30 px-2.5 text-xs font-semibold sm:text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open / print
                </a>
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(null)}
                  className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-white/30"
                  aria-label="Sluit foto"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden">
              <img
                src={visiblePhotos[activePhotoIndex]?.src}
                alt={visiblePhotos[activePhotoIndex]?.alt}
                className="max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setActivePhotoIndex((value) => Math.max((value ?? 0) - 1, 0))}
                disabled={activePhotoIndex === 0}
                className="absolute left-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white disabled:opacity-30 sm:left-4"
                aria-label="Vorige foto"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((value) =>
                    Math.min((value ?? 0) + 1, visiblePhotos.length - 1),
                  )
                }
                disabled={activePhotoIndex === visiblePhotos.length - 1}
                className="absolute right-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white disabled:opacity-30 sm:right-4"
                aria-label="Volgende foto"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="mx-auto max-w-6xl overflow-x-clip px-4 pb-6 md:px-6 md:pb-16">
        <div className="space-y-4">
          {filteredCategories.map((category) => {
            const isOpen = openCategory === category.id;

            return (
              <article
                id={category.id}
                key={category.id}
                className="section-shell scroll-mt-28 overflow-hidden rounded-2xl shadow-sm"
              >
                <button
                  type="button"
                  className="flex min-h-14 w-full items-center justify-between gap-3 px-5 py-3 text-left"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenCategory((prev) => (prev === category.id ? "" : category.id))
                  }
                >
                  <h2 className="font-serif text-[1.9rem] leading-tight text-primary md:text-3xl">
                    {category.title}
                  </h2>
                  <span className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground/70">
                    {isOpen ? "Sluit" : "Open"}
                  </span>
                </button>

                {isOpen ? (
                  <div className="border-t border-border/75 px-5 pb-5 pt-4">
                    {category.intro ? (
                      <p className="mb-3 text-base leading-relaxed text-muted-foreground">
                        {category.intro}
                      </p>
                    ) : null}
                    <ul className="divide-y divide-border">
                      {category.items.map((item, itemIndex) => (
                        <li
                          key={`${item.name}-${itemIndex}`}
                          className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:gap-4"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="break-words text-[1.23rem] font-semibold leading-snug text-foreground sm:text-lg">
                              {item.name}
                            </p>
                            {item.description ? (
                              <p className="mt-1 break-words text-base leading-relaxed text-muted-foreground sm:text-[0.98rem]">
                                {item.description}
                              </p>
                            ) : null}
                          </div>
                          {item.price ? (
                            <span className="break-words text-left font-serif text-[1.35rem] leading-snug text-primary sm:max-w-[46%] sm:shrink-0 sm:text-right sm:text-2xl">
                              {item.price}
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
