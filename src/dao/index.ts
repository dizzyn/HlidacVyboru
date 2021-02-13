import { createHlidacJsonLink } from "../utils";
import { Api } from "./hlidacAPI";

export type THlidacData = {
  Id: string;
  dokumenty: any[];
  audio: any[];
  Error?: string;
};

const api = new Api().api;
const options = {
  headers: { Authorization: `Token ${process.env.HLIDAC_API_TOKEN}` },
};

export const getHlidac = async (id: string) => {
  try {
    return (await api.apiV2DatasetyDatasetItemGet(
      "vybory-psp",
      id,
      options
    )) as any;
  } catch (e) {
    return {
      Error: "Zaznam nenalezen.",
      Detail: null,
    };
  }
};

// export const fetchHlidac = async (id: string) =>
//   await (
//     await fetch(createHlidacJsonLink(id), {
//       headers: { Authorization: `Token ${process.env.HLIDAC_API_TOKEN}` },
//     })
//   ).json();
