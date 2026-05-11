export type OpeningHour = { day: string; open: string | null; close: string | null };

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  intro?: string;
  items: MenuItem[];
};

export type WeeklyMenuDay = {
  label: string;
  dish: string;
};

export type WeeklyMenuPrice = {
  label: string;
  price: string;
};

export type WeeklyMenu = {
  title: string;
  weekLabel: string;
  days: WeeklyMenuDay[];
  weekendStarter: string;
  weekendMain: string;
  prices: WeeklyMenuPrice[];
  phone: string;
};

export type MenuPhoto = {
  title: string;
  alt: string;
  src: string;
};

export type BusinessInfo = {
  name: string;
  tagline: string;
  street: string;
  city: string;
  country: string;
  phone: string;
  phoneIntl: string;
  priceRange: string;
  pricePerPerson: string;
  mapsUrl: string;
  mapsEmbed: string;
};

export type Dagmenu = {
  date: string;
  soup: string;
  main: string;
  dessert: string;
  price: string;
};

export type Review = {
  text: string;
  author: string;
};

export type PageCopy = {
  homeHeroBadge: string;
  homeHeroTitle: string;
  homeHeroText: string;
  homeIntroTitle: string;
  homeIntroText: string;
  homeDagmenuTitle: string;
  homeDagmenuText: string;
  homeSfeerTitle: string;
  homeReviewsTitle: string;
  homeContactTitle: string;
  menuTitle: string;
  menuIntro: string;
  dagmenuTitle: string;
  dagmenuIntro: string;
  contactTitle: string;
  contactIntro: string;
  sfeerTitle: string;
  sfeerIntro: string;
};

export type SeoData = {
  siteTitle: string;
  siteDescription: string;
};

export type SiteData = {
  business: BusinessInfo;
  openingHours: OpeningHour[];
  menu: MenuCategory[];
  weeklyMenu: WeeklyMenu;
  menuPhotos: MenuPhoto[];
  dagmenu: Dagmenu;
  reviews: Review[];
  copy: PageCopy;
  seo: SeoData;
};

export const SITE_DATA_STORAGE_KEY = "de-prater-site-data-v2";

export const defaultSiteData: SiteData = {
  business: {
    name: "De Prater",
    tagline: "Brasserie · Taverne",
    street: "Grote Markt 28",
    city: "9100 Sint-Niklaas",
    country: "België",
    phone: "03 766 06 40",
    phoneIntl: "+3237660640",
    priceRange: "€€",
    pricePerPerson: "€20–30 p.p.",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Grote+Markt+28,+9100+Sint-Niklaas,+België",
    mapsEmbed: "https://www.google.com/maps?q=Grote+Markt+28,+9100+Sint-Niklaas&output=embed",
  },
  openingHours: [
    { day: "Maandag", open: null, close: null },
    { day: "Dinsdag", open: "10:00", close: "22:00" },
    { day: "Woensdag", open: "10:00", close: "22:00" },
    { day: "Donderdag", open: "10:00", close: "22:00" },
    { day: "Vrijdag", open: "10:00", close: "22:00" },
    { day: "Zaterdag", open: "10:00", close: "22:00" },
    { day: "Zondag", open: "10:00", close: "22:00" },
  ],
  menu: [
    {
      id: "suggesties-prijzen",
      title: "Suggesties & prijzen",
      intro: "Actuele basisprijzen zoals gecommuniceerd in de zaak.",
      items: [
        { name: "Dagschotel", price: "€ 15,00" },
        { name: "Dagmenu", price: "€ 18,00" },
        { name: "Weekendschotel", price: "€ 20,00" },
        { name: "Weekendmenu", price: "€ 24,00" },
      ],
    },
    {
      id: "bieren-vat",
      title: "Bieren van 't vat",
      items: [
        {
          name: "Estaminet",
          description: "25 cl / 33 cl / 50 cl",
          price: "€ 2,70 / € 3,20 / € 5,40",
        },
        { name: "Palm", description: "25 cl / 33 cl", price: "€ 2,70 / € 3,20" },
        { name: "Rodenbach", description: "25 cl / 33 cl", price: "€ 2,80 / € 3,30" },
        { name: "Steenbrugge Wit", description: "25 cl", price: "€ 2,70" },
        { name: "Steenbrugge Blond", description: "25 cl / 33 cl", price: "€ 3,00 / € 3,40" },
        {
          name: "Steenbrugge Dubbel Bruin",
          description: "25 cl / 33 cl",
          price: "€ 3,00 / € 3,40",
        },
        { name: "Brugge Tripel", description: "25 cl / 33 cl", price: "€ 3,30 / € 4,00" },
        { name: "Cornet", description: "33 cl", price: "€ 4,20" },
        { name: "Grimbergen", description: "33 cl", price: "€ 3,40" },
      ],
    },
    {
      id: "bieren-fles-speciaal",
      title: "Bieren op fles (specials)",
      items: [
        { name: "Cornet Smoked", description: "33 cl", price: "€ 4,40" },
        { name: "Rodenbach Fruitage", description: "25 cl", price: "€ 3,40" },
        { name: "Rodenbach Grand Cru", description: "33 cl", price: "€ 3,80" },
        { name: "Rodenbach Alexander", description: "33 cl", price: "€ 3,80" },
      ],
    },
    {
      id: "alcoholvrij",
      title: "Alcoholvrije bieren",
      items: [
        { name: "Cornet Alcohol-Free 0.3%", description: "33 cl", price: "€ 4,00" },
        { name: "La Trappe Nillis", description: "33 cl", price: "€ 4,00" },
        { name: "Jupiler 0,0", price: "€ 2,70" },
        { name: "Carlsberg 0,0", price: "€ 3,00" },
        { name: "Sportzot 0,0", price: "€ 3,00" },
        { name: "Vicaris 0,0", price: "€ 4,00" },
      ],
    },
    {
      id: "bieren-fles",
      title: "Bieren op fles",
      items: [
        { name: "Boon Kriek", description: "25 cl", price: "€ 3,00" },
        { name: "Boon Geuze", description: "25 cl", price: "€ 3,00" },
        { name: "Carlsberg", description: "25 cl", price: "€ 3,00" },
        { name: "Zinnebier", description: "25 cl", price: "€ 3,30" },
        { name: "Cuvée de Briquville", description: "33 cl", price: "€ 3,30" },
        { name: "Hoegaarden Grand Cru", description: "33 cl", price: "€ 3,60" },
        { name: "Corsendonk Pater / Agnus", description: "33 cl", price: "€ 3,40" },
        { name: "Tripel Karmeliet", description: "33 cl", price: "€ 4,00" },
        { name: "Westmalle Dubbel", description: "33 cl", price: "€ 4,20" },
        { name: "Westmalle Tripel", description: "33 cl", price: "€ 4,40" },
        { name: "Brigand", description: "33 cl", price: "€ 4,20" },
        { name: "Duvel", description: "33 cl", price: "€ 4,40" },
        { name: "Vedett", description: "33 cl", price: "€ 3,20" },
        { name: "Omer", description: "33 cl", price: "€ 4,20" },
        { name: "Trappist Rochefort 8", description: "33 cl", price: "€ 4,30" },
        { name: "Trappist Rochefort 10", description: "33 cl", price: "€ 4,60" },
        { name: "Chimay Wit", description: "33 cl", price: "€ 4,00" },
        { name: "Chimay Blauw", description: "33 cl", price: "€ 4,00" },
        { name: "Kasteelbier", description: "33 cl", price: "€ 4,00" },
        { name: "Kasteelbier Rouge", description: "33 cl", price: "€ 4,00" },
        { name: "Orval", description: "33 cl", price: "€ 4,40" },
        { name: "Basta Pale Ale", description: "25 cl", price: "€ 3,00" },
        { name: "La Trappe Donker", description: "33 cl", price: "€ 4,30" },
        { name: "La Trappe Quadrupel", description: "33 cl", price: "€ 6,40" },
        { name: "Bronzen Baron Premium", description: "33 cl", price: "€ 3,10" },
        { name: "Bronzen Baron Tripel", description: "33 cl", price: "€ 3,40" },
        { name: "Bronzen Baron Blond", description: "33 cl", price: "€ 3,40" },
        { name: "Troubadour Magma", description: "33 cl", price: "€ 3,80" },
        { name: "Vicaris", description: "33 cl", price: "€ 3,40" },
        { name: "4kant", description: "33 cl", price: "€ 3,40" },
        { name: "Lindemans Kriek", description: "25 cl", price: "€ 3,00" },
      ],
    },
    {
      id: "frisdranken",
      title: "Frisdranken",
      items: [
        { name: "Spa plat", price: "€ 2,60" },
        { name: "Spa bruis", price: "€ 2,60" },
        { name: "Perrier", price: "€ 2,60" },
        { name: "Minute Maid Sinaas", price: "€ 2,60" },
        { name: "Minute Maid Ace", price: "€ 2,60" },
        { name: "Minute Maid Pompelmoes", price: "€ 2,60" },
        { name: "Minute Maid Appel", price: "€ 2,60" },
        { name: "Minute Maid Appel/Kers", price: "€ 2,60" },
        { name: "Minute Maid Tomaat", price: "€ 2,60" },
        { name: "Sprite", price: "€ 2,60" },
        { name: "Fanta", price: "€ 2,60" },
        { name: "Coca Cola", price: "€ 2,60" },
        { name: "Coca Cola Light / Zero", price: "€ 2,60" },
        { name: "Royal Bliss Tonic", price: "€ 2,60" },
        { name: "Royal Bliss Tonic Berry", price: "€ 2,60" },
        { name: "Schweppes Agrum Zero", price: "€ 2,60" },
        { name: "Lipton Ice Tea Original Bruisend", price: "€ 2,60" },
        { name: "Lipton Ice Tea Zero Bruisend", price: "€ 2,60" },
        { name: "Lipton Ice Tea Green", price: "€ 2,60" },
        { name: "Gini", price: "€ 2,60" },
        { name: "Appletiser", price: "€ 3,00" },
        { name: "Canada Dry", price: "€ 2,60" },
        { name: "Cécémel", price: "€ 2,60" },
        { name: "Red Bull", price: "€ 3,50" },
        { name: "Tönissteiner Appelsien", price: "€ 2,60" },
        { name: "Tönissteiner Citroen", price: "€ 2,60" },
        { name: "Tönissteiner Naranja", price: "€ 2,60" },
        { name: "Tönissteiner Vruchtenkorf", price: "€ 2,60" },
      ],
    },
    {
      id: "warme-dranken",
      title: "Warme dranken",
      items: [
        { name: "Espresso", price: "€ 2,90" },
        { name: "Decafeïne Espresso", price: "€ 2,90" },
        { name: "Mokka", price: "€ 2,90" },
        { name: "Cappuccino (slagroom/melk)", price: "€ 3,00" },
        { name: "Lait Russe", price: "€ 3,00" },
        { name: "Macchiato", price: "€ 3,00" },
        { name: "Thee natuur/citroen/melk", price: "€ 2,70" },
        { name: "Thee rozenbottel", price: "€ 2,70" },
        { name: "Thee kamille", price: "€ 2,70" },
        { name: "Thee munt", price: "€ 2,70" },
        { name: "Thee groen", price: "€ 2,70" },
        { name: "Thee linde", price: "€ 2,70" },
        { name: "Thee earl grey", price: "€ 2,70" },
        { name: "Warme Cécémel", price: "€ 2,80" },
        { name: "Chocomelk", price: "€ 2,90" },
        { name: "Verse soep", price: "€ 3,20" },
        { name: "Gluck", price: "€ 6,00" },
        { name: "Hasselts koffie", price: "€ 7,00" },
        { name: "Irish coffee (whisky)", price: "€ 8,50" },
        { name: "French coffee (cognac/Grand Marnier)", price: "€ 8,50" },
        { name: "Italian coffee (amaretto)", price: "€ 8,50" },
        { name: "Rüdesheimer coffee (Asbach)", price: "€ 8,50" },
      ],
    },
    {
      id: "aperitieven-likeuren",
      title: "Aperitieven en likeuren",
      items: [
        { name: "Pineau de Charentes", price: "€ 4,90" },
        { name: "Martini rood/wit/fiero", price: "€ 4,90" },
        { name: "Porto rood / wit", price: "€ 4,90" },
        { name: "Sherry dry", price: "€ 4,90" },
        { name: "Gancia", price: "€ 4,90" },
        { name: "Kir", price: "€ 4,90" },
        { name: "Advocaat", price: "€ 4,90" },
        { name: "Campari natur", price: "€ 5,00" },
        { name: "Pisang / Safari natur", price: "€ 5,00" },
        { name: "Ricard (5 cl)", price: "€ 6,00" },
        { name: "Amaretto Disaronno Originale", price: "€ 7,00" },
        { name: "Baileys Original Irish Cream", price: "€ 7,00" },
      ],
    },
    {
      id: "sterke-dranken",
      title: "Sterke dranken",
      items: [
        { name: "Bacardi Rum", price: "€ 7,00" },
        { name: "Gin Gordon's Special Dry", price: "€ 8,00" },
        { name: "Vodka Eristoff wit/rood", price: "€ 7,50" },
        { name: "Calvados Père Magloire", price: "€ 8,00" },
        { name: "Cognac Martell VS", price: "€ 8,00" },
        { name: "Cointreau", price: "€ 8,00" },
        { name: "Grand Marnier", price: "€ 8,00" },
        { name: "Johnnie Walker Red Label", price: "€ 7,00" },
        { name: "J&B Old Scotch", price: "€ 7,00" },
        { name: "Jameson Irish Whiskey", price: "€ 7,00" },
        { name: "Glenfiddich Pure Malt", price: "€ 9,00" },
        { name: "Chivas Regal", price: "€ 9,00" },
      ],
    },
    {
      id: "jenevers",
      title: "Jenevers",
      items: [
        { name: "Buggenhoutse jong", price: "€ 3,20" },
        {
          name: "Buggenhoutse appel/bessen/citroen/passievrucht/vanille",
          price: "€ 3,20",
        },
        { name: "Filliers oud 5j", price: "€ 3,70" },
        { name: "Jägermeister", price: "€ 3,20" },
      ],
    },
    {
      id: "wijnen",
      title: "Wijnen en bubbels",
      intro: "Prijsvolgorde per wijn: glas / 0.25 / 0.50 / fles.",
      items: [
        { name: "Bubbels - Huiscuvée", price: "€ 5,20 / - / - / € 24,00" },
        {
          name: "Les Croisières Chardonnay-Vermentino (Languedoc)",
          price: "€ 3,80 / € 6,70 / € 13,30 / € 20,00",
        },
        {
          name: "Vermentino di Sardegna DOC (Sardegna)",
          price: "€ 3,80 / € 6,70 / € 13,30 / € 20,00",
        },
        {
          name: "Château des Eyssards Côtes de Bergerac Moelleux",
          price: "€ 3,80 / € 6,70 / € 13,30 / € 20,00",
        },
        {
          name: "La Torre Rosato IGP Salento (Italië)",
          price: "€ 3,80 / € 6,70 / € 13,30 / € 20,00",
        },
        {
          name: "Mathios Rosé",
          price: "€ 3,80 / € 6,70 / € 13,30 / € 20,00",
        },
        {
          name: "Les Croisières Rouge (Languedoc)",
          price: "€ 3,80 / € 6,70 / € 13,30 / € 20,00",
        },
        {
          name: "Cabernet Sauvignon Estate Series (Chili)",
          price: "€ 3,80 / € 6,70 / € 13,30 / € 20,00",
        },
        { name: "Sangria rood/wit van 't vat", price: "€ 7,50" },
      ],
    },
    {
      id: "knabbeltjes",
      title: "Knabbeltjes",
      items: [
        { name: "Portie kaas / salami / gemengd", price: "€ 7,00" },
        { name: "Bitterballen (10 stuks)", price: "€ 7,00" },
        { name: "Warm gemengd (10 stuks)", price: "€ 9,00" },
        { name: "Chips zout / paprika", price: "€ 2,00" },
      ],
    },
    {
      id: "croques",
      title: "Croques",
      intro: "Prijsvolgorde: enkel / dubbel.",
      items: [
        { name: "Uit het vuistje", price: "€ 4,00 / € 6,00" },
        { name: "Monsieur", price: "€ 8,00 / € 10,00" },
        { name: "Hawai", price: "€ 9,00 / € 11,00" },
        { name: "Madame (spiegelei)", price: "€ 9,00 / € 11,00" },
        { name: "De Prater (bolognese)", price: "€ 11,00 / € 14,00" },
        { name: "Van de chef (vol-au-vent)", price: "€ 11,00 / € 14,00" },
      ],
    },
    {
      id: "baguettes",
      title: "Baguettes",
      items: [
        { name: "Kaas", price: "€ 6,00" },
        { name: "Hesp", price: "€ 6,00" },
        { name: "Kaas + hesp", price: "€ 7,00" },
        { name: "Americain", price: "€ 6,00" },
        { name: "Martino (ui, tomaat en ansjovis)", price: "€ 7,00" },
        { name: "Supplement smos", price: "€ 1,50" },
      ],
    },
    {
      id: "omelet",
      title: "Omelet met brood of frietjes",
      items: [
        { name: "Natuur", price: "€ 11,00" },
        { name: "Kaas of hesp of spek", price: "€ 14,00" },
        { name: "Tomaat", price: "€ 14,00" },
        { name: "Champignons", price: "€ 14,00" },
        { name: "De Prater", price: "€ 16,00" },
      ],
    },
    {
      id: "snacks",
      title: "Snacks",
      items: [
        { name: "Toast kannibaal", price: "€ 14,00" },
        { name: "Toast champignon", price: "€ 15,00" },
        { name: "Uitsmijter", price: "€ 14,00" },
        { name: "Spaghetti bolognese", price: "€ 10,00" },
        { name: "Macaroni kaas-hesp", price: "€ 14,00" },
        { name: "Vegetarische pasta", price: "€ 14,00" },
        { name: "Lasagne", price: "€ 16,00" },
        { name: "Loempia kip met brood/frietjes", price: "€ 16,00" },
        { name: "Kaaskroketten (2 st) met brood/frietjes", price: "€ 15,00" },
        { name: "Garnaalkroketten (2 st) met brood/frietjes", price: "€ 17,50" },
        { name: "Twijfelaar (kaas-garnaal) met brood/frietjes", price: "€ 16,00" },
        { name: "Supplement frieten/kroketten", price: "€ 1,50" },
        { name: "Supplement mayonaise/ketchup", price: "€ 0,50" },
      ],
    },
    {
      id: "voorgerechten",
      title: "Voorgerechten met brood",
      items: [
        { name: "Verse soep", price: "€ 3,20" },
        { name: "Carpaccio van rund", price: "€ 9,50" },
        { name: "Loempia met kip", price: "€ 11,00" },
        { name: "Kaaskroketten (2 st)", price: "€ 11,00" },
        { name: "Garnaalkroketten (2 st)", price: "€ 14,00" },
        { name: "Duo van kroketten", price: "€ 13,50" },
      ],
    },
    {
      id: "koude-schotels",
      title: "Koude schotels met brood / frieten",
      items: [
        { name: "Salade natuur", price: "€ 15,00" },
        { name: "Salade kip (warm)", price: "€ 19,00" },
        { name: "Salade nicoise", price: "€ 17,00" },
        { name: "Salade americain", price: "€ 19,00" },
        { name: "Salade geitenkaas", price: "€ 20,00" },
        { name: "Salade scampi (warm)", price: "€ 22,00" },
        { name: "Salade kip en scampi", price: "€ 24,00" },
        { name: "Supplement mayonaise/ketchup", price: "€ 0,50" },
      ],
    },
    {
      id: "kindergerechten",
      title: "Kindergerechten",
      items: [
        { name: "Fishsticks (5 st)", price: "€ 7,00" },
        { name: "Halve kipfilet", price: "€ 10,00" },
        { name: "Curryworst", price: "€ 10,00" },
        { name: "Kindervol-au-vent", price: "€ 13,00" },
        { name: "Bordje frieten met mayo/ketchup", price: "€ 4,00" },
      ],
    },
    {
      id: "vleesgerechten",
      title: "Vleesgerechten",
      intro: "Frieten, kroketten, rust of puree inbegrepen.",
      items: [
        { name: "Hamburger (200 g)", price: "€ 19,00" },
        { name: "Vol-au-vent", price: "€ 21,00" },
        { name: "Vlaamse stoofkarbonaden", price: "€ 21,00" },
        { name: "Kipfilet natuur (200 g)", price: "€ 19,00" },
        { name: "Steak natuur (220 g)", price: "€ 25,00" },
        { name: "Filet pure (220 g)", price: "€ 28,00" },
        {
          name: "Supplement saus",
          description:
            "peper / champignon / stroganoff / knoflook / provençale / roquefort / curry / ananas-curry",
          price: "€ 2,50",
        },
        { name: "Supplement mayonaise/ketchup", price: "€ 0,50" },
        { name: "Supplement warme groenten", price: "€ 2,00" },
        { name: "Supplement frieten", price: "€ 2,00" },
      ],
    },
    {
      id: "visgerechten",
      title: "Visgerechten",
      intro: "Frieten, kroketten, rust of puree inbegrepen.",
      items: [
        { name: "Scampi (8 st) lookboter", price: "€ 23,00" },
        { name: "Scampi (8 st) roomsaus", price: "€ 23,00" },
        { name: "Scampi (8 st) op Indische wijze", price: "€ 24,00" },
        { name: "Forel gebakken natuur", price: "€ 25,00" },
        { name: "Forel gebakken en gevuld met roquefort", price: "€ 26,00" },
        { name: "Zalmfilet natuur (200 g)", price: "€ 25,00" },
        { name: "Zalmfilet mousselinesaus (200 g)", price: "€ 26,00" },
        { name: "Vispannetje De Prater (3 soorten vis)", price: "€ 26,00" },
      ],
    },
    {
      id: "roomijs",
      title: "Ambachtelijk bereid roomijs",
      items: [
        { name: "Coupe vanille", price: "€ 6,00" },
        { name: "Coupe brésilienne", description: "karamel + nootjes", price: "€ 6,00" },
        {
          name: "Coupe dame blanche",
          description: "warme chocoladesaus",
          price: "€ 6,50",
        },
        { name: "Coupe dame d'or", description: "advocaat", price: "€ 7,00" },
        { name: "Coupe De Prater", description: "vers fruit (seizoen)", price: "€ 8,00" },
        { name: "Coupe verse aardbeien", description: "seizoen", price: "€ 9,00" },
        { name: "Kinderijsje", price: "€ 4,00" },
        { name: "Hoorntje met 1 bol", price: "€ 2,00" },
        { name: "Supplement slagroom", price: "€ 0,50" },
        { name: "Supplement bol ijs", price: "€ 2,00" },
      ],
    },
    {
      id: "pannenkoeken",
      title: "Vers gebakken pannenkoeken",
      intro: "Enkel tussen 14u en 17u30.",
      items: [
        { name: "Suiker", price: "€ 5,00" },
        { name: "Boter", price: "€ 5,00" },
        { name: "Confituur", price: "€ 5,00" },
        { name: "Kandijsiroop", price: "€ 5,00" },
        { name: "Appeltjes natuur", price: "€ 6,20" },
        { name: "Met ijs", price: "€ 6,50" },
        { name: "Mikado (ijs en chocoladesaus)", price: "€ 6,50" },
        { name: "Supplement slagroom", price: "€ 0,50" },
      ],
    },
    {
      id: "dessert",
      title: "Dessert",
      items: [
        { name: "Brusselse wafel met suiker", price: "€ 3,50" },
        { name: "Brusselse wafel met slagroom", price: "€ 3,50" },
      ],
    },
  ],
  weeklyMenu: {
    title: "Weekmenu van deze week",
    weekLabel: "Dinsdag 05/05 t.e.m. zondag 10/05",
    days: [
      { label: "Dinsdag 05/05", dish: "Kipblokjes met pasta en kruidensaus" },
      {
        label: "Woensdag 06/05",
        dish: "Varkenslapje met mosterdsaus, broccoli en natuuraardappelen",
      },
      { label: "Donderdag 07/05", dish: "Huisbereide goulash met frietjes" },
      { label: "Vrijdag 08/05", dish: "Koolvisfilet met witte wijnsaus en puree" },
      { label: "Weekend 09/05 – 10/05", dish: "Weekendselectie" },
    ],
    weekendStarter: "VG: Toastie kannibaal",
    weekendMain: "HG: Kalkoenhaasje met champignonsaus en rösti",
    prices: [
      { label: "Dagmenu", price: "€ 17,00" },
      { label: "Dagschotel", price: "€ 15,00" },
      { label: "Weekendmenu", price: "€ 24,00" },
      { label: "Weekendschotel", price: "€ 20,00" },
    ],
    phone: "+32 3 766 06 40",
  },
  menuPhotos: [
    {
      title: "Kaart voorpagina",
      alt: "Voorpagina van de menukaart van De Prater",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/ia0d31d3c077b1db3/version/1757528793/image.png",
    },
    {
      title: "Bieren van 't vat",
      alt: "Menukaart pagina met bieren van het vat",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/i7c52e6bfe450bc7d/version/1757528963/image.png",
    },
    {
      title: "Bieren op fles en alcoholvrij",
      alt: "Menukaart pagina met bieren op fles en alcoholvrije bieren",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/i3bd2f0b3547bf87b/version/1757528963/image.png",
    },
    {
      title: "Bieren op fles overzicht",
      alt: "Menukaart pagina met overzicht bieren op fles",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/i817034dd65efcc82/version/1757528963/image.png",
    },
    {
      title: "Frisdranken",
      alt: "Menukaart pagina met frisdranken",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/if675a7d258b75189/version/1757528963/image.png",
    },
    {
      title: "Warme dranken",
      alt: "Menukaart pagina met warme dranken",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/i461c9d1aec6da3c8/version/1757528963/image.png",
    },
    {
      title: "Aperitieven en likeuren",
      alt: "Menukaart pagina met aperitieven, likeuren en sterke dranken",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/i5c21bb57547f1275/version/1757528963/image.png",
    },
    {
      title: "Wijnen",
      alt: "Menukaart pagina met wijnen en bubbels",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/ib3cf5953775d9d73/version/1757528963/image.png",
    },
    {
      title: "Knabbeltjes en croques",
      alt: "Menukaart pagina met knabbeltjes, croques en baguettes",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/id3abc7f20a5ce324/version/1757528963/image.png",
    },
    {
      title: "Snacks en voorgerechten",
      alt: "Menukaart pagina met snacks en voorgerechten",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/i356ffd48e7954e57/version/1757528963/image.png",
    },
    {
      title: "Koude schotels en kindergerechten",
      alt: "Menukaart pagina met koude schotels en kindergerechten",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/ic728dc7e55384e65/version/1757528963/image.png",
    },
    {
      title: "Vlees- en visgerechten",
      alt: "Menukaart pagina met vleesgerechten en visgerechten",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/i1a0dd14e398c1c02/version/1757528963/image.png",
    },
    {
      title: "Roomijs en desserts",
      alt: "Menukaart pagina met roomijs, pannenkoeken en dessert",
      src: "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Dpng/path/s33a68ffd396e4903/image/ie87637d2fad7d473/version/1757528963/image.png",
    },
  ],
  dagmenu: {
    date: "Vandaag",
    soup: "Tomatenroomsoep met balletjes",
    main: "Stoofvlees op Vlaamse wijze met frietjes",
    dessert: "Dame Blanche",
    price: "€19,50",
  },
  reviews: [
    { text: "Vriendelijke bediening en lekker eten.", author: "Google review" },
    { text: "Gezellige plek voor een drankje op de markt.", author: "Google review" },
    { text: "Fijn terras en vlotte service.", author: "Google review" },
  ],
  copy: {
    homeHeroBadge: "Brasserie · Taverne · Sinds altijd",
    homeHeroTitle: "Gezellig tafelen en genieten op de Grote Markt van Sint-Niklaas",
    homeHeroText:
      "Welkom bij De Prater: jouw vertrouwde brasserie voor lunch, diner, koffie, cocktails en gezellige momenten.",
    homeIntroTitle: "Gezelligheid, gastvrijheid en lekker genieten",
    homeIntroText:
      "Of je nu langskomt voor een snelle lunch, een uitgebreid diner, een frisse pint, een cocktail of een koffie op het terras: je bent altijd welkom op onze vertrouwde plek aan de Grote Markt.",
    homeDagmenuTitle: "Vers, vertrouwd en met zorg geserveerd",
    homeDagmenuText: "Bekijk hier ons dagmenu. Dagelijks vers samengesteld door onze keuken.",
    homeSfeerTitle: "Binnen of buiten, je zit altijd goed",
    homeReviewsTitle: "Wat onze gasten zeggen",
    homeContactTitle: "Tot snel bij De Prater",
    menuTitle: "Onze kaart",
    menuIntro:
      "Hieronder vind je de volledige actuele kaart als gestructureerde data. Prijzen kunnen altijd aangepast worden in de admin.",
    dagmenuTitle: "Dagmenu",
    dagmenuIntro: "Bekijk hier ons dagmenu. Dagelijks vers, vertrouwd en met zorg geserveerd.",
    contactTitle: "Contact & route",
    contactIntro: "Bel ons voor reservaties of vragen. We helpen je graag verder.",
    sfeerTitle: "Sfeer & terras",
    sfeerIntro:
      "Of je nu binnen gezellig plaatsneemt of buiten geniet op het terras, bij De Prater zit je altijd goed.",
  },
  seo: {
    siteTitle: "De Prater Sint-Niklaas | Brasserie op de Grote Markt",
    siteDescription:
      "Welkom bij De Prater, een gezellige brasserie op de Grote Markt in Sint-Niklaas. Geniet van lunch, diner, drankjes, cocktails en terras.",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function cloneSiteData(data: SiteData): SiteData {
  return JSON.parse(JSON.stringify(data)) as SiteData;
}

function hasMinimumSiteShape(value: unknown): value is SiteData {
  if (!isRecord(value)) return false;
  return (
    isRecord(value.business) &&
    Array.isArray(value.openingHours) &&
    Array.isArray(value.menu) &&
    isRecord(value.weeklyMenu) &&
    Array.isArray(value.menuPhotos) &&
    isRecord(value.dagmenu) &&
    Array.isArray(value.reviews) &&
    isRecord(value.copy) &&
    isRecord(value.seo)
  );
}

export function loadSiteData(): SiteData {
  if (typeof window === "undefined") {
    return cloneSiteData(defaultSiteData);
  }

  const raw = window.localStorage.getItem(SITE_DATA_STORAGE_KEY);
  if (!raw) return cloneSiteData(defaultSiteData);

  try {
    const parsed = JSON.parse(raw);
    if (!hasMinimumSiteShape(parsed)) {
      return cloneSiteData(defaultSiteData);
    }

    const current = parsed as SiteData;
    const hasUsableMenuPhotos = current.menuPhotos.some((photo) => photo.src.trim().length > 0);
    if (hasUsableMenuPhotos) {
      return current;
    }

    return {
      ...current,
      menuPhotos: cloneSiteData(defaultSiteData).menuPhotos,
    };
  } catch {
    return cloneSiteData(defaultSiteData);
  }
}

export function saveSiteData(nextData: SiteData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SITE_DATA_STORAGE_KEY, JSON.stringify(nextData));
}

export const business = defaultSiteData.business;
export const openingHours = defaultSiteData.openingHours;
export const menu = defaultSiteData.menu;
export const dagmenu = defaultSiteData.dagmenu;
export const reviews = defaultSiteData.reviews;
