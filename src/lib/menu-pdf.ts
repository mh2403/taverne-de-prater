import type { SiteData } from "./content";

type PdfDoc = import("jspdf").jsPDF;

const COLOR = {
  bordeaux: [91, 31, 31] as const,
  text: [34, 28, 24] as const,
  muted: [110, 90, 76] as const,
  card: [252, 248, 241] as const,
  line: [220, 201, 178] as const,
  gold: [192, 139, 63] as const,
};

async function createPdf(): Promise<PdfDoc> {
  const { jsPDF } = await import("jspdf");
  return new jsPDF({ unit: "mm", format: "a4" });
}

function normalizeText(value: string): string {
  return value
    .replace(/\u2013|\u2014/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...");
}

function setColor(doc: PdfDoc, color: readonly [number, number, number]) {
  doc.setTextColor(color[0], color[1], color[2]);
}

function split(doc: PdfDoc, value: string, width: number): string[] {
  return doc.splitTextToSize(normalizeText(value), width) as string[];
}

function ensureSpace(doc: PdfDoc, y: number, neededHeight: number): number {
  if (y + neededHeight <= 276) return y;
  doc.addPage();
  return 18;
}

function drawFooter(doc: PdfDoc) {
  const today = new Date().toLocaleDateString("nl-BE");
  const footerLabel = `Gemaakt op ${today}`;
  doc.setDrawColor(...COLOR.line);
  doc.line(16, 284, 194, 284);
  setColor(doc, COLOR.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.text(footerLabel, 105, 289, { align: "center" });
}

function fileStamp() {
  return new Date().toISOString().slice(0, 10);
}

function stripWeekendPrefix(value: string): string {
  return normalizeText(value)
    .replace(/^\s*(VG|HG)\s*[:-]\s*/i, "")
    .trim();
}

export async function downloadWeekmenuPdf(siteData: SiteData) {
  const doc = await createPdf();
  const { business, weeklyMenu } = siteData;

  doc.setFillColor(248, 243, 234);
  doc.rect(0, 0, 210, 297, "F");

  doc.setDrawColor(...COLOR.line);
  doc.setLineWidth(0.6);
  doc.rect(10, 10, 190, 277, "S");

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(16, 16, 60, 26, 3, 3, "F");
  doc.setDrawColor(...COLOR.line);
  doc.roundedRect(16, 16, 60, 26, 3, 3, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  setColor(doc, COLOR.bordeaux);
  doc.text("PLAATS HIER LOGO", 46, 26, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  setColor(doc, COLOR.muted);
  doc.text("PNG/JPG", 46, 33, { align: "center" });

  doc.setFillColor(...COLOR.card);
  doc.roundedRect(82, 16, 112, 30, 3, 3, "F");

  doc.setFont("times", "bold");
  doc.setFontSize(25);
  setColor(doc, COLOR.bordeaux);
  doc.text(normalizeText(business.name.toUpperCase()), 138, 28, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  setColor(doc, COLOR.muted);
  doc.text(normalizeText(weeklyMenu.title), 138, 35, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(normalizeText(weeklyMenu.weekLabel), 138, 42, { align: "center" });

  let y = 56;

  for (const day of weeklyMenu.days) {
    y = ensureSpace(doc, y, 26);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    setColor(doc, COLOR.bordeaux);
    doc.text(normalizeText(day.label), 20, y);

    const lines = split(doc, day.dish, 166);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(13.5);
    setColor(doc, COLOR.text);
    doc.text(lines, 20, y + 8);

    y += Math.max(13, lines.length * 6.2 + 9);

    doc.setDrawColor(...COLOR.line);
    doc.setLineWidth(0.2);
    doc.line(20, y, 190, y);
    y += 5.5;
  }

  const weekendStarter = stripWeekendPrefix(weeklyMenu.weekendStarter);
  const weekendMain = stripWeekendPrefix(weeklyMenu.weekendMain);
  const weekendLines1 = split(doc, `VG: ${weekendStarter}`, 158);
  const weekendLines2 = split(doc, `HG: ${weekendMain}`, 158);
  const weekendHeight = 19 + weekendLines1.length * 5.8 + weekendLines2.length * 5.8;
  y = ensureSpace(doc, y, weekendHeight + 10);

  doc.setFillColor(255, 252, 246);
  doc.roundedRect(16, y, 178, weekendHeight, 3, 3, "F");
  doc.setDrawColor(...COLOR.line);
  doc.roundedRect(16, y, 178, weekendHeight, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  setColor(doc, COLOR.bordeaux);
  doc.text("WEEKEND", 20, y + 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  setColor(doc, COLOR.text);
  doc.text(weekendLines1, 20, y + 16);
  doc.text(weekendLines2, 20, y + 16 + weekendLines1.length * 5.8 + 2);

  y += weekendHeight + 9;

  y = ensureSpace(doc, y, 38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  setColor(doc, COLOR.text);
  doc.text(`Tel.: ${normalizeText(weeklyMenu.phone || business.phone)}`, 20, y);

  const prices = weeklyMenu.prices;
  const left = prices.filter((_, index) => index % 2 === 0);
  const right = prices.filter((_, index) => index % 2 === 1);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  const maxRows = Math.max(left.length, right.length);

  for (let row = 0; row < maxRows; row += 1) {
    const leftItem = left[row];
    const rightItem = right[row];
    const rowY = y + 11 + row * 8.2;

    if (leftItem) {
      doc.text(`${normalizeText(leftItem.label)}: ${normalizeText(leftItem.price)}`, 20, rowY);
    }
    if (rightItem) {
      doc.text(`${normalizeText(rightItem.label)}: ${normalizeText(rightItem.price)}`, 110, rowY);
    }
  }

  doc.setFillColor(...COLOR.gold);
  doc.circle(20, 20, 1.8, "F");
  doc.circle(190, 20, 1.8, "F");

  drawFooter(doc);
  doc.save(`weekmenu-${fileStamp()}.pdf`);
}

export async function downloadDagmenuPdf(siteData: SiteData) {
  const doc = await createPdf();
  const { business, dagmenu } = siteData;

  doc.setFillColor(248, 243, 234);
  doc.rect(0, 0, 210, 297, "F");

  doc.setDrawColor(...COLOR.line);
  doc.setLineWidth(0.6);
  doc.rect(10, 10, 190, 277, "S");

  doc.setFillColor(...COLOR.bordeaux);
  doc.rect(16, 16, 178, 34, "F");

  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 249, 242);
  doc.text(normalizeText(business.name.toUpperCase()), 105, 30, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11.5);
  doc.text(normalizeText(dagmenu.date), 105, 38, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 238, 206);
  doc.text(`DAGMENU  ${normalizeText(dagmenu.price)}`, 105, 45, { align: "center" });

  let y = 64;
  const blocks = [
    { label: "SOEP / VOORGERECHT", value: dagmenu.soup },
    { label: "HOOFDGERECHT", value: dagmenu.main },
    { label: "DESSERT", value: dagmenu.dessert },
  ];

  for (const block of blocks) {
    const lines = split(doc, block.value, 160);
    const height = 16 + lines.length * 6;
    y = ensureSpace(doc, y, height + 8);

    doc.setFillColor(...COLOR.card);
    doc.roundedRect(20, y, 170, height, 3, 3, "F");
    doc.setDrawColor(...COLOR.line);
    doc.roundedRect(20, y, 170, height, 3, 3, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...COLOR.bordeaux);
    doc.text(block.label, 26, y + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(...COLOR.text);
    doc.text(lines, 26, y + 15);

    y += height + 8;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...COLOR.text);
  doc.text(`Reserveren: ${normalizeText(business.phone)}`, 20, y + 2);
  doc.text(normalizeText(`${business.street}, ${business.city}`), 20, y + 9);

  drawFooter(doc);
  doc.save(`dagmenu-${fileStamp()}.pdf`);
}
