import { createContext, useContext, useMemo, useState } from "react";
import {
  cloneSiteData,
  defaultSiteData,
  loadSiteData,
  saveSiteData,
  type SiteData,
} from "./content";

type SiteContentContextValue = {
  data: SiteData;
  setData: (nextData: SiteData) => void;
  resetData: () => void;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<SiteData>(() => loadSiteData());

  const value = useMemo<SiteContentContextValue>(
    () => ({
      data,
      setData: (nextData) => {
        const safeCopy = cloneSiteData(nextData);
        setDataState(safeCopy);
        saveSiteData(safeCopy);
      },
      resetData: () => {
        const resetCopy = cloneSiteData(defaultSiteData);
        setDataState(resetCopy);
        saveSiteData(resetCopy);
      },
    }),
    [data],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used inside SiteContentProvider");
  }
  return context;
}
