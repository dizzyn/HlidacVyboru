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

// api.api
//   .apiV2DatasetyGetAll()
//   .then(async (res) => console.log(res.data))
//   .catch(console.error);

export const getHlidac = (id: string): THlidacData =>
  api.apiV2DatasetyDatasetItemGet("vybory-psp", id) as any;
