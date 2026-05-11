import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileCTABar } from "./MobileCTABar";
import { BackToTopButton } from "./BackToTopButton";

export function SiteLayout({
  children,
  showMobileCta = true,
}: {
  children: React.ReactNode;
  showMobileCta?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <SiteHeader />
      <main className={`flex-1 ${showMobileCta ? "pb-24 md:pb-3" : "pb-6 md:pb-3"}`}>
        {children}
      </main>
      <SiteFooter />
      <BackToTopButton hasMobileCta={showMobileCta} />
      {showMobileCta ? <MobileCTABar /> : null}
    </div>
  );
}
