import { createHlidacJsonLink } from "../utils";
import { Api } from "./hlidacAPI";

export type THlidacData = {
  Id: string;
  dokumenty: any[];
  audio: any[];
  Error?: string;
};

const api = new Api({
  baseApiParams: {
    headers: { Authorization: `Token ${process.env.HLIDAC_API_TOKEN}` },
  },
}).api;

export const getHlidac = async (id: string) => {
  try {
    return (await api.apiV2DatasetyDatasetItemGet("vybory-psp", id)) as any;
  } catch (e) {
    return Promise.resolve({
      Error: e.error ?? "Zaznam nenalezen.",
      Detail: null,
    });
  }
};

export const fetchHlidac = async (id: string) =>
  await (
    await fetch(createHlidacJsonLink(id), {
      headers: { Authorization: `Token ${process.env.HLIDAC_API_TOKEN}` },
    })
  ).json();
