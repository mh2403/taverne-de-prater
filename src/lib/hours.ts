import { openingHours } from "./content";

export function isOpenNow(date = new Date()): { open: boolean; label: string } {
  const dayIdx = date.getDay(); // 0 = zondag
  // map JS day to our array (Maandag = 0)
  const map = [6, 0, 1, 2, 3, 4, 5];
  const today = openingHours[map[dayIdx]];
  if (!today.open || !today.close) return { open: false, label: "Vandaag gesloten" };

  const [oH, oM] = today.open.split(":").map(Number);
  const [cH, cM] = today.close.split(":").map(Number);
  const now = date.getHours() * 60 + date.getMinutes();
  const open = oH * 60 + oM;
  const close = cH * 60 + cM;

  if (now >= open && now < close) {
    return { open: true, label: `Nu open · tot ${today.close}` };
  }
  if (now < open) {
    return { open: false, label: `Vandaag open vanaf ${today.open}` };
  }
  return { open: false, label: "Nu gesloten" };
}
