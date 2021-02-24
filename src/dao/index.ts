import { createHlidacJsonLink } from "../utils";

require("dotenv").config();

export type THlidacData = {
  Id: string;
  datum: string;
  cisloJednani: number;
  vybor: string;
  vyborId: number;
  vyborUrl: string;
  dokumenty: {
    DocumentUrl: string;
    jmeno: string;
    popis: string;
    typ:
      | "Pozvánka"
      | "Zápis z jednání"
      | "Usnesení"
      | "Dokumenty a prezentace"
      | "Zvukový záznam z jednání";
  }[];
  audio: { DocumentUrl: string; jmeno: string }[];
};

const options = {
  headers: {
    Authorization: `Token ${process.env.HLIDAC_API_TOKEN}`,
    // "Content-Type": "application/json",
  },
};

export const fetchHlidac = async (id: string) => {
  const res = await fetch(createHlidacJsonLink(id), {
    headers: { Authorization: `Token ${process.env.HLIDAC_API_TOKEN}` },
  });

  const json = await res.json();

  console.log("JSON", createHlidacJsonLink(id), json);

  return json;
};

export const insertHlidac = async (hlidacId: string, data: THlidacData) => {
  try {
    const res = await api.apiV2DatasetyDatasetItemUpdate(
      "vybory-psp",
      hlidacId,
      data
    );
    console.log("res", res);
    return res?.data;
  } catch (e) {
    console.log(e?.error?.Error === "Zaznam nebylo mozno vlozit.");
    console.error(e);
    throw e;
  }
};
