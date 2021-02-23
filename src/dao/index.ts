import { createHlidacJsonLink } from "../utils";

export type THlidacData = {
  Id: string;
  dokumenty: any[];
  audio: any[];
  Error?: string;
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
