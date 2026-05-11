import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileCTABar } from "./MobileCTABar";

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
      <main className="flex-1 pb-3">{children}</main>
      <SiteFooter />
      {showMobileCta ? <MobileCTABar /> : null}
    </div>
  );
}
