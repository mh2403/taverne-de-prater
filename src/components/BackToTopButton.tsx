import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTopButton({ hasMobileCta }: { hasMobileCta: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Terug naar boven"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(41,21,16,0.28)] hover:bg-primary/90 ${
        hasMobileCta
          ? "bottom-[max(6.4rem,calc(env(safe-area-inset-bottom)+5.8rem))] md:bottom-6"
          : "bottom-[max(8.7rem,calc(env(safe-area-inset-bottom)+8.2rem))] md:bottom-6"
      }`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
