export const COMMITTEES = [
  {
    shorcut: "HV",
    name: "Hospodářský výbor",
    id: 3500,
  },
  {
    shorcut: "KV",
    name: "Kontrolní výbor",
    id: 3600,
  },
  {
    shorcut: "MIV",
    name: "Mandátový a imunitní výbor",
    id: 3700,
  },
  {
    shorcut: "ORGV",
    name: "Organizační výbor",
    id: 3800,
  },
  {
    shorcut: "PV",
    name: "Petiční výbor",
    id: 3900,
  },
  {
    shorcut: "RV",
    name: "Rozpočtový výbor",
    id: 3400,
  },
  {
    shorcut: "UPV",
    name: "Ústavně právní výbor",
    id: 4000,
  },
  {
    shorcut: "VOV",
    name: "Volební výbor",
    id: 4100,
  },
  {
    shorcut: "VB",
    name: "Výbor pro bezpečnost",
    id: 4900,
  },
  {
    shorcut: "VEZ",
    name: "Výbor pro evropské záležitosti",
    id: 500,
  },
  {
    shorcut: "VO",
    name: "Výbor pro obranu",
    id: 5000,
  },
  {
    shorcut: "VSP",
    name: "Výbor pro sociální politiku",
    id: 4300,
  },
  {
    shorcut: "VVVKM",
    name: "Výbor pro vědu, vzdělání, kulturu, mládež a tělovýchovu",
    id: 4500,
  },
  {
    shorcut: "VSR",
    name: "Výbor pro veřejnou správu a regionální rozvoj",
    id: 4400,
  },
  {
    shorcut: "Výboru pro zdravotnictví",
    name: "Výbor pro zdravotnictví",
    id: 3200,
  },
  {
    shorcut: "VZP",
    name: "Výbor pro životní prostředí",
    id: 4600,
  },
  {
    shorcut: "ZAV",
    name: "Zahraniční výbor",
    id: 3300,
  },
  {
    shorcut: "ZEV",
    name: "Zemědělský výbor",
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
