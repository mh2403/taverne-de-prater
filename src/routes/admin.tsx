import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, FileDown, UtensilsCrossed } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { cloneSiteData, type MenuCategory, type SiteData } from "@/lib/content";
import { downloadDagmenuPdf, downloadWeekmenuPdf } from "@/lib/menu-pdf";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const adminSections = [
  { key: "weekmenu", label: "Weekmenu" },
  { key: "photos", label: "Kaartfoto's" },
  { key: "menu", label: "Menu" },
  { key: "content", label: "Teksten" },
  { key: "business", label: "Zaak" },
  { key: "hours", label: "Uren" },
  { key: "dagmenu", label: "Dagmenu" },
  { key: "reviews", label: "Reviews" },
  { key: "seo", label: "SEO" },
] as const;

type AdminSectionKey = (typeof adminSections)[number]["key"];

const adminSectionHints: Record<AdminSectionKey, string> = {
  weekmenu: "Wekelijkse gerechten en prijzen aanpassen",
  photos: "Kaartfoto's tonen op de menupagina",
  menu: "Alle categorieën en items van de kaart beheren",
  content: "Titels en teksten op de website wijzigen",
  business: "Adres, telefoon en route-instellingen",
  hours: "Openingsuren per dag updaten",
  dagmenu: "Dagmenu van vandaag publiceren",
  reviews: "Quotes en testimonials beheren",
  seo: "Site titel en meta beschrijving",
};

function AdminPage() {
  const { data, setData, resetData } = useSiteContent();
  const isMobile = useIsMobile();
  const [draft, setDraft] = useState<SiteData>(() => cloneSiteData(data));
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [activeSection, setActiveSection] = useState<AdminSectionKey>("weekmenu");

  useEffect(() => {
    setDraft(cloneSiteData(data));
  }, [data]);

  const menuItemCount = useMemo(
    () => draft.menu.reduce((acc, category) => acc + category.items.length, 0),
    [draft.menu],
  );

  const reviewCount = draft.reviews.length;
  const weekDayCount = draft.weeklyMenu.days.length;
  const menuPhotoCount = draft.menuPhotos.filter((photo) => photo.src.trim()).length;
  const activeSectionIndex = adminSections.findIndex((section) => section.key === activeSection);
  const activeSectionMeta = adminSections[activeSectionIndex] ?? adminSections[0];

  const updateCopy = (key: keyof SiteData["copy"], value: string) => {
    setDraft((prev) => ({ ...prev, copy: { ...prev.copy, [key]: value } }));
  };

  const updateBusiness = (key: keyof SiteData["business"], value: string) => {
    setDraft((prev) => ({ ...prev, business: { ...prev.business, [key]: value } }));
  };

  const updateSeo = (key: keyof SiteData["seo"], value: string) => {
    setDraft((prev) => ({ ...prev, seo: { ...prev.seo, [key]: value } }));
  };

  const saveChanges = () => {
    setData(draft);
    setStatusMessage(`Wijzigingen opgeslagen om ${new Date().toLocaleTimeString("nl-BE")}.`);
  };

  const restorePublished = () => {
    setDraft(cloneSiteData(data));
    setStatusMessage("Lokale wijzigingen verworpen. Terug naar laatst opgeslagen versie.");
  };

  const restoreDefaults = () => {
    resetData();
    setStatusMessage("Standaard inhoud hersteld.");
  };

  const exportWeekmenuPdf = async () => {
    try {
      await downloadWeekmenuPdf(draft);
      setStatusMessage("Weekmenu PDF aangemaakt en gedownload.");
    } catch {
      setStatusMessage("Kon weekmenu PDF niet aanmaken.");
    }
  };

  const exportDagmenuPdf = async () => {
    try {
      await downloadDagmenuPdf(draft);
      setStatusMessage("Dagmenu PDF aangemaakt en gedownload.");
    } catch {
      setStatusMessage("Kon dagmenu PDF niet aanmaken.");
    }
  };

  const showSection = (section: AdminSectionKey) => !isMobile || activeSection === section;

  return (
    <SiteLayout showMobileCta={false}>
      <section className="mx-auto max-w-7xl px-4 pb-44 pt-10 md:px-6 md:pb-28 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary/70">Beheeromgeving</p>
            <h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">Website admin</h1>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
              Alles hieronder is aanpasbaar vanaf telefoon, tablet en desktop. Weekmenu en
              kaartfoto's kan je hier wekelijks vernieuwen.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground sm:w-auto sm:grid-cols-1">
            <div>{draft.menu.length} categorieën</div>
            <div>{menuItemCount} menu-items</div>
            <div>{weekDayCount} weekmenu-dagen</div>
            <div>{menuPhotoCount} actieve kaartfoto's</div>
            <div>{reviewCount} reviews</div>
          </div>
        </div>

        {isMobile ? (
          <div className="surface-glass sticky top-[116px] z-20 mt-6 rounded-2xl p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
              Secties
            </p>
            <label className="block">
              <span className="sr-only">Kies adminsectie</span>
              <select
                value={activeSection}
                onChange={(event) => setActiveSection(event.target.value as AdminSectionKey)}
                className="min-h-11 w-full rounded-xl border border-input bg-card px-3 text-base font-semibold"
              >
                {adminSections.map((section, index) => (
                  <option key={section.key} value={section.key}>
                    {index + 1}. {section.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveSection(adminSections[Math.max(activeSectionIndex - 1, 0)].key)
                }
                disabled={activeSectionIndex === 0}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-card px-3 text-sm font-semibold text-foreground disabled:opacity-45"
              >
                Vorige
              </button>
              <p className="text-center text-xs text-muted-foreground">
                {activeSectionIndex + 1} / {adminSections.length}
              </p>
              <button
                type="button"
                onClick={() =>
                  setActiveSection(
                    adminSections[Math.min(activeSectionIndex + 1, adminSections.length - 1)].key,
                  )
                }
                disabled={activeSectionIndex === adminSections.length - 1}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-card px-3 text-sm font-semibold text-foreground disabled:opacity-45"
              >
                Volgende
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong className="font-semibold text-foreground">{activeSectionMeta.label}:</strong>{" "}
              {adminSectionHints[activeSectionMeta.key]}
            </p>
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/[0.04] p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/75">
                Prioriteit: weekmenu & dagmenu
              </p>
              <h2 className="mt-1 font-serif text-2xl text-primary">
                Snelle weekflow voor telefoon
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Werkvolgorde: bewerk weekmenu, bewerk dagmenu, klik publiceren, download PDF en
                plaats op Facebook.
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-2 md:w-auto">
              <button
                type="button"
                onClick={() => setActiveSection("weekmenu")}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold md:flex-none"
              >
                <CalendarDays className="h-4 w-4" />
                Weekmenu
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("dagmenu")}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold md:flex-none"
              >
                <UtensilsCrossed className="h-4 w-4" />
                Dagmenu
              </button>
              <button
                type="button"
                onClick={exportWeekmenuPdf}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground md:flex-none"
              >
                <FileDown className="h-4 w-4" />
                Weekmenu PDF
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {showSection("weekmenu") ? (
            <Card title="Weekmenu van deze week">
              <p className="text-sm text-muted-foreground">
                Dit is je belangrijkste blok. Pas hier de hele week aan en maak daarna meteen een
                deelbare PDF.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={exportWeekmenuPdf}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <FileDown className="h-4 w-4" />
                  Download weekmenu PDF
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection("dagmenu")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-semibold"
                >
                  <UtensilsCrossed className="h-4 w-4" />
                  Ga naar dagmenu
                </button>
              </div>
              <Input
                label="Titel"
                value={draft.weeklyMenu.title}
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    weeklyMenu: { ...prev.weeklyMenu, title: value },
                  }));
                }}
              />
              <Input
                label="Weeklabel (bv. Dinsdag 05/05 t.e.m. zondag 10/05)"
                value={draft.weeklyMenu.weekLabel}
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    weeklyMenu: { ...prev.weeklyMenu, weekLabel: value },
                  }));
                }}
              />
              <Input
                label="Telefoon voor reservatie"
                value={draft.weeklyMenu.phone}
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    weeklyMenu: { ...prev.weeklyMenu, phone: value },
                  }));
                }}
              />

              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setDraft((prev) => {
                      const next = cloneSiteData(prev);
                      next.weeklyMenu.days = [
                        { label: "Dinsdag", dish: "" },
                        { label: "Woensdag", dish: "" },
                        { label: "Donderdag", dish: "" },
                        { label: "Vrijdag", dish: "" },
                        { label: "Weekend", dish: "" },
                      ];
                      return next;
                    });
                  }}
                  className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  Zet standaard weekstructuur
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraft((prev) => {
                      const next = cloneSiteData(prev);
                      if (next.weeklyMenu.days.length < 2) return next;
                      const lastDish = next.weeklyMenu.days[next.weeklyMenu.days.length - 2]?.dish;
                      if (!lastDish) return next;
                      next.weeklyMenu.days[next.weeklyMenu.days.length - 1].dish = lastDish;
                      return next;
                    });
                  }}
                  className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  Kopieer vorige gerecht
                </button>
              </div>

              <div className="space-y-3">
                {draft.weeklyMenu.days.map((day, dayIndex) => (
                  <div
                    key={`${day.label}-${dayIndex}`}
                    className="rounded-xl border border-border p-3"
                  >
                    <Input
                      label="Dag label"
                      value={day.label}
                      onChange={(value) => {
                        setDraft((prev) => {
                          const next = cloneSiteData(prev);
                          next.weeklyMenu.days[dayIndex].label = value;
                          return next;
                        });
                      }}
                    />
                    <Textarea
                      label="Gerecht"
                      value={day.dish}
                      onChange={(value) => {
                        setDraft((prev) => {
                          const next = cloneSiteData(prev);
                          next.weeklyMenu.days[dayIndex].dish = value;
                          return next;
                        });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setDraft((prev) => {
                          const next = cloneSiteData(prev);
                          next.weeklyMenu.days.splice(dayIndex, 1);
                          return next;
                        });
                      }}
                      className="mt-2 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                    >
                      Dag verwijderen
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDraft((prev) => {
                      const next = cloneSiteData(prev);
                      next.weeklyMenu.days.push({ label: "Nieuwe dag", dish: "Nieuw gerecht" });
                      return next;
                    });
                  }}
                  className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  Dag toevoegen
                </button>
              </div>

              <Textarea
                label="Weekend voorgerecht"
                value={draft.weeklyMenu.weekendStarter}
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    weeklyMenu: { ...prev.weeklyMenu, weekendStarter: value },
                  }));
                }}
              />
              <Textarea
                label="Weekend hoofdgerecht"
                value={draft.weeklyMenu.weekendMain}
                onChange={(value) => {
                  setDraft((prev) => ({
                    ...prev,
                    weeklyMenu: { ...prev.weeklyMenu, weekendMain: value },
                  }));
                }}
              />

              <div className="space-y-3">
                {draft.weeklyMenu.prices.map((price, priceIndex) => (
                  <div
                    key={`${price.label}-${priceIndex}`}
                    className="rounded-xl border border-border p-3"
                  >
                    <Input
                      label="Prijslabel"
                      value={price.label}
                      onChange={(value) => {
                        setDraft((prev) => {
                          const next = cloneSiteData(prev);
                          next.weeklyMenu.prices[priceIndex].label = value;
                          return next;
                        });
                      }}
                    />
                    <Input
                      label="Prijs"
                      value={price.price}
                      onChange={(value) => {
                        setDraft((prev) => {
                          const next = cloneSiteData(prev);
                          next.weeklyMenu.prices[priceIndex].price = value;
                          return next;
                        });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setDraft((prev) => {
                          const next = cloneSiteData(prev);
                          next.weeklyMenu.prices.splice(priceIndex, 1);
                          return next;
                        });
                      }}
                      className="mt-2 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                    >
                      Prijsregel verwijderen
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setDraft((prev) => {
                    const next = cloneSiteData(prev);
                    next.weeklyMenu.prices.push({ label: "Nieuwe prijs", price: "€ 0,00" });
                    return next;
                  });
                }}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                Prijsregel toevoegen
              </button>

              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                  Live voorbeeld PDF-inhoud
                </p>
                <h3 className="mt-2 font-serif text-xl text-primary">{draft.weeklyMenu.title}</h3>
                <p className="text-sm text-muted-foreground">{draft.weeklyMenu.weekLabel}</p>
                <div className="mt-3 space-y-2">
                  {draft.weeklyMenu.days.map((day, dayIndex) => (
                    <div key={`${day.label}-preview-${dayIndex}`} className="text-sm">
                      <p className="font-semibold text-primary">{day.label}</p>
                      <p className="text-foreground/85">{day.dish || "-"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ) : null}

          {showSection("photos") ? (
            <Card title="Kaartfoto's (URL of upload)">
              <p className="text-sm text-muted-foreground">
                Je kan per foto een URL plakken of rechtstreeks uploaden vanaf je telefoon.
              </p>
              <div className="space-y-3">
                {draft.menuPhotos.map((photo, photoIndex) => (
                  <div
                    key={`${photo.title}-${photoIndex}`}
                    className="rounded-xl border border-border p-3"
                  >
                    <Input
                      label="Fototitel"
                      value={photo.title}
                      onChange={(value) => {
                        setDraft((prev) => {
                          const next = cloneSiteData(prev);
                          next.menuPhotos[photoIndex].title = value;
                          return next;
                        });
                      }}
                    />
                    <Input
                      label="Alt tekst"
                      value={photo.alt}
                      onChange={(value) => {
                        setDraft((prev) => {
                          const next = cloneSiteData(prev);
                          next.menuPhotos[photoIndex].alt = value;
                          return next;
                        });
                      }}
                    />
                    <Input
                      label="Foto URL"
                      value={photo.src}
                      onChange={(value) => {
                        setDraft((prev) => {
                          const next = cloneSiteData(prev);
                          next.menuPhotos[photoIndex].src = value;
                          return next;
                        });
                      }}
                    />
                    <label className="mt-2 block text-xs text-muted-foreground">
                      Upload foto
                      <input
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full text-base md:text-sm"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          const dataUrl = await fileToDataUrl(file);
                          setDraft((prev) => {
                            const next = cloneSiteData(prev);
                            next.menuPhotos[photoIndex].src = dataUrl;
                            return next;
                          });
                        }}
                      />
                    </label>
                    {photo.src.trim() ? (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="mt-3 h-24 w-24 rounded-md border border-border object-cover"
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        setDraft((prev) => {
                          const next = cloneSiteData(prev);
                          next.menuPhotos.splice(photoIndex, 1);
                          return next;
                        });
                      }}
                      className="mt-2 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                    >
                      Foto verwijderen
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setDraft((prev) => {
                    const next = cloneSiteData(prev);
                    next.menuPhotos.push({
                      title: "Nieuwe kaartfoto",
                      alt: "Kaartfoto De Prater",
                      src: "",
                    });
                    return next;
                  });
                }}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                Foto toevoegen
              </button>
            </Card>
          ) : null}

          {showSection("business") ? (
            <Card title="Bedrijfsgegevens">
              <Input
                label="Naam"
                value={draft.business.name}
                onChange={(v) => updateBusiness("name", v)}
              />
              <Input
                label="Tagline"
                value={draft.business.tagline}
                onChange={(v) => updateBusiness("tagline", v)}
              />
              <Input
                label="Straat"
                value={draft.business.street}
                onChange={(v) => updateBusiness("street", v)}
              />
              <Input
                label="Stad"
                value={draft.business.city}
                onChange={(v) => updateBusiness("city", v)}
              />
              <Input
                label="Land"
                value={draft.business.country}
                onChange={(v) => updateBusiness("country", v)}
              />
              <Input
                label="Telefoon (leesbaar)"
                value={draft.business.phone}
                onChange={(v) => updateBusiness("phone", v)}
              />
              <Input
                label="Telefoon (internationaal)"
                value={draft.business.phoneIntl}
                onChange={(v) => updateBusiness("phoneIntl", v)}
              />
              <Input
                label="Prijsklasse"
                value={draft.business.priceRange}
                onChange={(v) => updateBusiness("priceRange", v)}
              />
              <Input
                label="Gemiddelde prijs per persoon"
                value={draft.business.pricePerPerson}
                onChange={(v) => updateBusiness("pricePerPerson", v)}
              />
              <Input
                label="Google Maps route link"
                value={draft.business.mapsUrl}
                onChange={(v) => updateBusiness("mapsUrl", v)}
              />
              <Input
                label="Google Maps embed link"
                value={draft.business.mapsEmbed}
                onChange={(v) => updateBusiness("mapsEmbed", v)}
              />
            </Card>
          ) : null}

          {showSection("seo") ? (
            <Card title="SEO basis">
              <Input
                label="Site titel"
                value={draft.seo.siteTitle}
                onChange={(v) => updateSeo("siteTitle", v)}
              />
              <Textarea
                label="Meta beschrijving"
                value={draft.seo.siteDescription}
                onChange={(v) => updateSeo("siteDescription", v)}
                rows={4}
              />
            </Card>
          ) : null}

          {showSection("hours") ? (
            <Card title="Openingsuren">
              <div className="space-y-3">
                {draft.openingHours.map((day, dayIndex) => (
                  <div key={day.day} className="rounded-xl border border-border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-foreground">{day.day}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setDraft((prev) => {
                            const next = cloneSiteData(prev);
                            next.openingHours[dayIndex].open = null;
                            next.openingHours[dayIndex].close = null;
                            return next;
                          });
                        }}
                        className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-accent"
                      >
                        Gesloten
                      </button>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <label className="text-xs text-muted-foreground">
                        Open
                        <input
                          type="time"
                          value={day.open ?? ""}
                          onChange={(event) => {
                            const value = event.target.value;
                            setDraft((prev) => {
                              const next = cloneSiteData(prev);
                              next.openingHours[dayIndex].open = value || null;
                              return next;
                            });
                          }}
                          className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                        />
                      </label>
                      <label className="text-xs text-muted-foreground">
                        Sluit
                        <input
                          type="time"
                          value={day.close ?? ""}
                          onChange={(event) => {
                            const value = event.target.value;
                            setDraft((prev) => {
                              const next = cloneSiteData(prev);
                              next.openingHours[dayIndex].close = value || null;
                              return next;
                            });
                          }}
                          className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {showSection("dagmenu") ? (
            <Card title="Dagmenu">
              <p className="text-sm text-muted-foreground">
                Dit menu verschijnt ook op home. Werk dit dagelijks bij en exporteer meteen voor
                socials.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={exportDagmenuPdf}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <FileDown className="h-4 w-4" />
                  Download dagmenu PDF
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraft((prev) => {
                      const next = cloneSiteData(prev);
                      const fallback = next.weeklyMenu.days[0]?.dish ?? "";
                      next.dagmenu.main = next.dagmenu.main || fallback;
                      return next;
                    });
                  }}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-card px-3 text-sm font-semibold"
                >
                  Vul hoofdgerecht uit weekmenu
                </button>
              </div>
              <Input
                label="Label datum (bv. Vandaag of Maandag 12 mei)"
                value={draft.dagmenu.date}
                onChange={(value) => {
                  setDraft((prev) => ({ ...prev, dagmenu: { ...prev.dagmenu, date: value } }));
                }}
              />
              <Input
                label="Prijs"
                value={draft.dagmenu.price}
                onChange={(value) => {
                  setDraft((prev) => ({ ...prev, dagmenu: { ...prev.dagmenu, price: value } }));
                }}
              />
              <Textarea
                label="Soep / voorgerecht"
                value={draft.dagmenu.soup}
                onChange={(value) => {
                  setDraft((prev) => ({ ...prev, dagmenu: { ...prev.dagmenu, soup: value } }));
                }}
              />
              <Textarea
                label="Hoofdgerecht"
                value={draft.dagmenu.main}
                onChange={(value) => {
                  setDraft((prev) => ({ ...prev, dagmenu: { ...prev.dagmenu, main: value } }));
                }}
              />
              <Textarea
                label="Dessert"
                value={draft.dagmenu.dessert}
                onChange={(value) => {
                  setDraft((prev) => ({ ...prev, dagmenu: { ...prev.dagmenu, dessert: value } }));
                }}
              />
            </Card>
          ) : null}
        </div>

        {showSection("content") ? (
          <Card title="Pagina teksten" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Home badge"
                value={draft.copy.homeHeroBadge}
                onChange={(v) => updateCopy("homeHeroBadge", v)}
              />
              <Input
                label="Home hero titel"
                value={draft.copy.homeHeroTitle}
                onChange={(v) => updateCopy("homeHeroTitle", v)}
              />
              <Textarea
                label="Home hero tekst"
                value={draft.copy.homeHeroText}
                onChange={(v) => updateCopy("homeHeroText", v)}
              />
              <Input
                label="Home intro titel"
                value={draft.copy.homeIntroTitle}
                onChange={(v) => updateCopy("homeIntroTitle", v)}
              />
              <Textarea
                label="Home intro tekst"
                value={draft.copy.homeIntroText}
                onChange={(v) => updateCopy("homeIntroText", v)}
              />
              <Input
                label="Home dagmenu titel"
                value={draft.copy.homeDagmenuTitle}
                onChange={(v) => updateCopy("homeDagmenuTitle", v)}
              />
              <Textarea
                label="Home dagmenu tekst"
                value={draft.copy.homeDagmenuText}
                onChange={(v) => updateCopy("homeDagmenuText", v)}
              />
              <Input
                label="Home sfeer titel"
                value={draft.copy.homeSfeerTitle}
                onChange={(v) => updateCopy("homeSfeerTitle", v)}
              />
              <Input
                label="Home reviews titel"
                value={draft.copy.homeReviewsTitle}
                onChange={(v) => updateCopy("homeReviewsTitle", v)}
              />
              <Input
                label="Home contact titel"
                value={draft.copy.homeContactTitle}
                onChange={(v) => updateCopy("homeContactTitle", v)}
              />
              <Input
                label="Menu pagina titel"
                value={draft.copy.menuTitle}
                onChange={(v) => updateCopy("menuTitle", v)}
              />
              <Textarea
                label="Menu intro"
                value={draft.copy.menuIntro}
                onChange={(v) => updateCopy("menuIntro", v)}
              />
              <Input
                label="Dagmenu titel"
                value={draft.copy.dagmenuTitle}
                onChange={(v) => updateCopy("dagmenuTitle", v)}
              />
              <Textarea
                label="Dagmenu intro"
                value={draft.copy.dagmenuIntro}
                onChange={(v) => updateCopy("dagmenuIntro", v)}
              />
              <Input
                label="Contact titel"
                value={draft.copy.contactTitle}
                onChange={(v) => updateCopy("contactTitle", v)}
              />
              <Textarea
                label="Contact intro"
                value={draft.copy.contactIntro}
                onChange={(v) => updateCopy("contactIntro", v)}
              />
              <Input
                label="Sfeer titel"
                value={draft.copy.sfeerTitle}
                onChange={(v) => updateCopy("sfeerTitle", v)}
              />
              <Textarea
                label="Sfeer intro"
                value={draft.copy.sfeerIntro}
                onChange={(v) => updateCopy("sfeerIntro", v)}
              />
            </div>
          </Card>
        ) : null}

        {showSection("reviews") ? (
          <Card title="Reviews" className="mt-6">
            <div className="space-y-3">
              {draft.reviews.map((review, reviewIndex) => (
                <div key={reviewIndex} className="rounded-xl border border-border p-3">
                  <Input
                    label="Auteur"
                    value={review.author}
                    onChange={(value) => {
                      setDraft((prev) => {
                        const next = cloneSiteData(prev);
                        next.reviews[reviewIndex].author = value;
                        return next;
                      });
                    }}
                  />
                  <Textarea
                    label="Review tekst"
                    value={review.text}
                    onChange={(value) => {
                      setDraft((prev) => {
                        const next = cloneSiteData(prev);
                        next.reviews[reviewIndex].text = value;
                        return next;
                      });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setDraft((prev) => {
                        const next = cloneSiteData(prev);
                        next.reviews.splice(reviewIndex, 1);
                        return next;
                      });
                    }}
                    className="mt-2 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                  >
                    Review verwijderen
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setDraft((prev) => {
                  const next = cloneSiteData(prev);
                  next.reviews.push({ author: "Nieuwe review", text: "Nieuwe reviewtekst" });
                  return next;
                });
              }}
              className="mt-4 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Review toevoegen
            </button>
          </Card>
        ) : null}

        {showSection("menu") ? (
          <Card title="Menu editor" className="mt-6">
            <div className="space-y-6">
              {draft.menu.map((category, categoryIndex) => (
                <MenuCategoryEditor
                  key={`${category.id}-${categoryIndex}`}
                  category={category}
                  onChange={(nextCategory) => {
                    setDraft((prev) => {
                      const next = cloneSiteData(prev);
                      next.menu[categoryIndex] = nextCategory;
                      return next;
                    });
                  }}
                  onDelete={() => {
                    setDraft((prev) => {
                      const next = cloneSiteData(prev);
                      next.menu.splice(categoryIndex, 1);
                      return next;
                    });
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setDraft((prev) => {
                  const next = cloneSiteData(prev);
                  const nextIndex = next.menu.length + 1;
                  next.menu.push({
                    id: `nieuwe-categorie-${nextIndex}`,
                    title: `Nieuwe categorie ${nextIndex}`,
                    intro: "",
                    items: [{ name: "Nieuw item", description: "", price: "" }],
                  });
                  return next;
                });
              }}
              className="mt-4 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Categorie toevoegen
            </button>
          </Card>
        ) : null}
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="mx-auto max-w-7xl px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <p className="mb-2 text-xs text-muted-foreground">
            {statusMessage || "Wijzigingen blijven lokaal tot je publiceert."}
          </p>
          <button
            type="button"
            onClick={saveChanges}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Publiceer wijzigingen
          </button>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={restorePublished}
              className="rounded-xl border border-border px-2 py-2.5 text-sm font-semibold hover:bg-accent"
            >
              Verwerp wijzigingen
            </button>
            <button
              type="button"
              onClick={restoreDefaults}
              className="rounded-xl border border-border px-2 py-2.5 text-sm font-semibold hover:bg-accent"
            >
              Herstel defaults
            </button>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 hidden border-t border-border bg-background/95 backdrop-blur md:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <p className="text-xs text-muted-foreground">
            {statusMessage || "Niet opgeslagen wijzigingen blijven enkel in dit formulier."}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={restorePublished}
              className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Verwerp wijzigingen
            </button>
            <button
              type="button"
              onClick={restoreDefaults}
              className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Herstel defaults
            </button>
            <button
              type="button"
              onClick={saveChanges}
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Publiceer wijzigingen
            </button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
        return;
      }
      reject(new Error("Kon upload niet lezen"));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Kon upload niet lezen"));
    reader.readAsDataURL(file);
  });
}

function MenuCategoryEditor({
  category,
  onChange,
  onDelete,
}: {
  category: MenuCategory;
  onChange: (nextCategory: MenuCategory) => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          label="Categorie ID"
          value={category.id}
          onChange={(value) =>
            onChange({ ...category, id: value.trim().toLowerCase().replace(/\s+/g, "-") })
          }
        />
        <Input
          label="Titel"
          value={category.title}
          onChange={(value) => onChange({ ...category, title: value })}
        />
      </div>
      <Textarea
        label="Intro (optioneel)"
        value={category.intro || ""}
        onChange={(value) => onChange({ ...category, intro: value })}
      />

      <div className="mt-4 space-y-3">
        {category.items.map((item, itemIndex) => (
          <div key={`${item.name}-${itemIndex}`} className="rounded-xl border border-border p-3">
            <Input
              label="Naam"
              value={item.name}
              onChange={(value) => {
                const nextItems = [...category.items];
                nextItems[itemIndex] = { ...nextItems[itemIndex], name: value };
                onChange({ ...category, items: nextItems });
              }}
            />
            <Textarea
              label="Beschrijving"
              value={item.description || ""}
              onChange={(value) => {
                const nextItems = [...category.items];
                nextItems[itemIndex] = { ...nextItems[itemIndex], description: value };
                onChange({ ...category, items: nextItems });
              }}
              rows={2}
            />
            <Input
              label="Prijs"
              value={item.price || ""}
              onChange={(value) => {
                const nextItems = [...category.items];
                nextItems[itemIndex] = { ...nextItems[itemIndex], price: value };
                onChange({ ...category, items: nextItems });
              }}
            />
            <button
              type="button"
              onClick={() => {
                const nextItems = [...category.items];
                nextItems.splice(itemIndex, 1);
                onChange({ ...category, items: nextItems });
              }}
              className="mt-2 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
            >
              Item verwijderen
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            const nextItems = [
              ...category.items,
              { name: "Nieuw item", description: "", price: "" },
            ];
            onChange({ ...category, items: nextItems });
          }}
          className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
        >
          Item toevoegen
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
        >
          Categorie verwijderen
        </button>
      </div>
    </div>
  );
}

function Card({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 ${className ?? ""}`}
    >
      <h2 className="font-serif text-2xl text-primary">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (nextValue: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (nextValue: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
      />
    </label>
  );
}
