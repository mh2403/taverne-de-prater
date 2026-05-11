// Centrale content — pas hier teksten, menu en openingsuren aan.

export const business = {
  name: "De Prater",
  tagline: "Brasserie · Taverne",
  street: "Grote Markt 28",
  city: "9100 Sint-Niklaas",
  country: "België",
  phone: "03 766 06 40",
  phoneIntl: "+3237660640",
  priceRange: "€€",
  pricePerPerson: "€20–30 p.p.",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Grote+Markt+28,+9100+Sint-Niklaas,+België",
  mapsEmbed: "https://www.google.com/maps?q=Grote+Markt+28,+9100+Sint-Niklaas&output=embed",
};

// 0 = zondag, 1 = maandag, ...
export const openingHours: Array<{ day: string; open: string | null; close: string | null }> = [
  { day: "Maandag", open: null, close: null },
  { day: "Dinsdag", open: "10:00", close: "22:00" },
  { day: "Woensdag", open: "10:00", close: "22:00" },
  { day: "Donderdag", open: "10:00", close: "22:00" },
  { day: "Vrijdag", open: "10:00", close: "22:00" },
  { day: "Zaterdag", open: "10:00", close: "22:00" },
  { day: "Zondag", open: "10:00", close: "22:00" },
];

export type MenuCategory = {
  id: string;
  title: string;
  intro?: string;
  items: { name: string; description?: string; price?: string }[];
};

export const menu: MenuCategory[] = [
  {
    id: "lunch",
    title: "Lunch",
    intro: "Lichte gerechten, ideaal tussen de middag.",
    items: [
      { name: "Dagsoep", description: "Vers bereid, met brood." },
      { name: "Croque De Prater", description: "Klassieke croque met ham en kaas, geserveerd met salade." },
      { name: "Lunchsalade", description: "Frisse salade met seizoensgroenten." },
    ],
  },
  {
    id: "warm",
    title: "Warme gerechten",
    items: [
      { name: "Steak met frietjes", description: "Met huisbereide saus naar keuze." },
      { name: "Vol-au-vent", description: "Brasserieklassieker met frietjes." },
      { name: "Stoofvlees op Vlaamse wijze", description: "Met frietjes en mayonaise." },
      { name: "Vispannetje", description: "Met aardappelpuree." },
    ],
  },
  {
    id: "snacks",
    title: "Snacks & kleine honger",
    items: [
      { name: "Bitterballen", description: "Met mosterd." },
      { name: "Kaas- en charcuterieplank", description: "Voor twee personen." },
      { name: "Nacho's", description: "Met kaas, salsa en guacamole." },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      { name: "Dame Blanche", description: "Vanille-ijs, warme chocoladesaus en slagroom." },
      { name: "Tiramisu", description: "Huisgemaakt." },
      { name: "Crème brûlée" },
    ],
  },
  {
    id: "koffie",
    title: "Koffie & warme dranken",
    items: [
      { name: "Espresso" },
      { name: "Cappuccino" },
      { name: "Verse muntthee" },
      { name: "Warme chocolademelk" },
    ],
  },
  {
    id: "bieren",
    title: "Bieren & frisdranken",
    items: [
      { name: "Pils van het vat" },
      { name: "Trappist & speciaalbieren" },
      { name: "Frisdranken & vers fruitsap" },
    ],
  },
  {
    id: "cocktails",
    title: "Cocktails",
    items: [
      { name: "Aperol Spritz" },
      { name: "Mojito" },
      { name: "Gin-tonic", description: "Met diverse premium gins." },
      { name: "Negroni" },
    ],
  },
  {
    id: "suggesties",
    title: "Suggesties & seizoensgerechten",
    intro: "Vraag onze bediening naar de actuele seizoenssuggesties.",
    items: [
      { name: "Wisselend aanbod", description: "Aangepast aan het seizoen en lokale leveranciers." },
    ],
  },
];

// Pas hieronder dagelijks het dagmenu aan.
export const dagmenu = {
  date: "Vandaag",
  soup: "Tomatenroomsoep met balletjes",
  main: "Stoofvlees op Vlaamse wijze met frietjes",
  dessert: "Dame Blanche",
  price: "€19,50",
};

export const reviews = [
  { text: "Vriendelijke bediening en lekker eten.", author: "Google review" },
  { text: "Gezellige plek voor een drankje op de markt.", author: "Google review" },
  { text: "Fijn terras en vlotte service.", author: "Google review" },
];
