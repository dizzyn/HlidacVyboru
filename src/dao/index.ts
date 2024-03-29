import { createHlidacAPIGetLink, createHlidacAPISetLink } from "../utils";
import fetch from "node-fetch";

require("dotenv").config();

export type THlidacData = {
  Id: string;
  datum: string;
  cisloJednani: number;
  vec?: string | null;
  vybor: string;
  vyborId: number;
  vyborUrl: string;
  zapisJednani?: string | null;
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
    "Content-Type": "application/json",
  },
};

export const fetchHlidac = async (id: string): Promise<THlidacData | null> => {
  const res = await fetch(createHlidacAPIGetLink(id), options);

  let json;
  try {
    json = await res.json();
  } catch (e) {
    console.log("fetchHlidac error:", e);
    return null;
  }

  if (json.Error) {
    // console.log("fetchHlidac error:", createHlidacAPIGetLink(id), json);
    return null;
  }
  // console.log("fetchHlidac data:", createHlidacAPIGetLink(id), json);
  return json;
};

export const insertHlidac = async (data: THlidacData) => {
  try {
    const res = await fetch(createHlidacAPISetLink(data.Id), {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });

    // console.log("res", res);
    const json = await res.json();
    // console.log("json", json);
    return json;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
