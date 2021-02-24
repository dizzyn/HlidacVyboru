import { url } from "inspector";

export const COMMITTEES = [
  {
    shorcut: "HV",
    name: "Hospodářský výbor",
    url: "https://www.psp.cz/sqw/hp.sqw?k=3500",
    id: 3500,
  },
  {
    shorcut: "KV",
    name: "Kontrolní výbor",
    url: "https://www.psp.cz/sqw/hp.sqw?k=3600",
    id: 3600,
  },
  {
    shorcut: "MIV",
    name: "Mandátový a imunitní výbor",
    url: "https://www.psp.cz/sqw/hp.sqw?k=3700",
    id: 3700,
  },
  {
    shorcut: "ORGV",
    name: "Organizační výbor",
    url: "https://www.psp.cz/sqw/hp.sqw?k=3800",
    id: 3800,
  },
  {
    shorcut: "PV",
    name: "Petiční výbor",
    url: "https://www.psp.cz/sqw/hp.sqw?k=3900",
    id: 3900,
  },
  {
    shorcut: "RV",
    name: "Rozpočtový výbor",
    url: "https://www.psp.cz/sqw/hp.sqw?k=3400",
    id: 3400,
  },
  {
    shorcut: "UPV",
    name: "Ústavně právní výbor",
    url: "https://www.psp.cz/sqw/hp.sqw?k=4000",
    id: 4000,
  },
  {
    shorcut: "VOV",
    name: "Volební výbor",
    url: "https://www.psp.cz/sqw/hp.sqw?k=4100",
    id: 4100,
  },
  {
    shorcut: "VB",
    name: "Výbor pro bezpečnost",
    url: "https://www.psp.cz/sqw/hp.sqw?k=4900",
    id: 4900,
  },
  {
    shorcut: "VEZ",
    name: "Výbor pro evropské záležitosti",
    url: "https://www.psp.cz/sqw/hp.sqw?k=5000",
    id: 500,
  },
  {
    shorcut: "VO",
    name: "Výbor pro obranu",
    url: "https://www.psp.cz/sqw/hp.sqw?k=5000",
    id: 5000,
  },
  {
    shorcut: "VSP",
    name: "Výbor pro sociální politiku",
    url: "https://www.psp.cz/sqw/hp.sqw?k=4300",
    id: 4300,
  },
  {
    shorcut: "VVVKM",
    name: "Výbor pro vědu, vzdělání, kulturu, mládež a tělovýchovu",
    url: "https://www.psp.cz/sqw/hp.sqw?k=4500",
    id: 4500,
  },
  {
    shorcut: "VSR",
    name: "Výbor pro veřejnou správu a regionální rozvoj",
    url: "https://www.psp.cz/sqw/hp.sqw?k=4400",
    id: 4400,
  },
  {
    shorcut: "Výboru pro zdravotnictví",
    name: "Výbor pro zdravotnictví",
    url: "https://www.psp.cz/sqw/hp.sqw?k=3202",
    id: 3200,
  },
  {
    shorcut: "VZP",
    url: "https://www.psp.cz/sqw/hp.sqw?k=4600",
    name: "Výbor pro životní prostředí",
    id: 4600,
  },
  {
    shorcut: "ZAV",
    name: "Zahraniční výbor",
    url: "https://www.psp.cz/sqw/hp.sqw?k=3300",
    id: 3300,
  },
  {
    shorcut: "ZEV",
    name: "Zemědělský výbor",
    url: "https://www.psp.cz/sqw/hp.sqw?k=4700",
    id: 4700,
  },
] as const;

export type ValuesOf<T extends any[]> = T[number];
export const COMMITTEE_SHORTCUTS = COMMITTEES.map(({ shorcut }) => shorcut);
export const COMMITTEE_NAMES = COMMITTEES.map(({ name }) => name);
export type TCommitteeShortcut = ValuesOf<typeof COMMITTEE_SHORTCUTS>;
export type TCommitteeName = ValuesOf<typeof COMMITTEE_NAMES>;
export type TCommittee = {
  shorcut: string;
  name: string;
  id: number;
  url: string;
};
export const COMMITTEES_PER_NAME = COMMITTEES.reduce(
  (acc, c) => ({ ...acc, [c.name]: c }),
  {} as { [key in TCommitteeName]: TCommittee }
);

export const MONTHS = [
  "ledna",
  "února",
  "března",
  "dubna",
  "května",
  "června",
  "července",
  "srpna",
  "září",
  "října",
  "listopadu",
  "prosince",
];

export const HLIDAC_TYPE_PER_TYPE = {
  POZVANKA: "Pozvánka",
  ZAPIS: "Zápis z jednání",
  USNESENI: "Usnesení",
  DOKUMENT: "Dokumenty a prezentace",
  ZAZNAM: "Zvukový záznam z jednání",
} as const;
