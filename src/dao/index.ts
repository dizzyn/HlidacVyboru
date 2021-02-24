import { Api } from "./hlidacAPI";

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

const api = new Api({
  baseApiParams: {
    headers: {
      Authorization: `Token ${process.env.HLIDAC_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  },
}).api;

export const getHlidac = async (id: string): Promise<THlidacData | null> => {
  try {
    const res = (await api.apiV2DatasetyDatasetItemGet(
      "vybory-psp",
      id
    )) as any;

    return res?.data;
  } catch (e) {
    console.log(e?.error?.Error === "Zaznam nenalezen.");
    if (e?.error?.Error === "Zaznam nenalezen.") {
      return Promise.resolve(null);
    }
    console.error(e);
    throw e;
  }
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
