import { Link, Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteContentProvider, useSiteContent } from "@/lib/site-content";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Pagina niet gevonden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Deze pagina bestaat niet of is verplaatst.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Deze pagina kon niet geladen worden
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Er is iets misgelopen. Je kan opnieuw proberen of terug naar home gaan.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Probeer opnieuw
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    </div>
  );
}

function SeoSync() {
  const { data } = useSiteContent();

  useEffect(() => {
    document.title = data.seo.siteTitle;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", data.seo.siteDescription);
      return;
    }

    const meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", data.seo.siteDescription);
    document.head.appendChild(meta);
  }, [data.seo.siteDescription, data.seo.siteTitle]);

  return null;
}

function RootComponent() {
  return (
    <SiteContentProvider>
      <SeoSync />
      <Outlet />
    </SiteContentProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
