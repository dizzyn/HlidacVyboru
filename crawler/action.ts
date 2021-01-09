import crawler from ".";
import { createURL } from "../pages";
import documents, { TDocument } from "./documents";
import { getDate, getNumber, removeDate, removeNumber } from "./utils";

export interface TActionDetail {
  title: string;
  date: string | null;
  committee: string | null;
  number: string | null;
  desc: string;
  documents: TDocument[];
  sourceHref: string;
}

export default (uri: string) =>
  crawler<TActionDetail>(createURL(uri), async ($) => {
    const title = $("#main-content b").text();
    const date = getDate(title);
    const documentsHref = $("a:contains('Dokumenty')").attr("href");
    const number = getNumber(title);
    console.log("documentsHref", documentsHref);
    if (!documentsHref) {
      throw `Nepodařilo se získat link na dokumenty (${uri})`;
    }
    if (!date) {
      throw `Nepodařilo se získat datum (${uri})`;
    }
    if (!number) {
      throw `Nepodařilo se získat číslo jednání (${uri})`;
    }
    return {
      title: removeDate(removeNumber(title)),
      date,
      committee: $("#left-column h2").text(),
      number,
      desc: "",
      sourceHref: createURL(uri),
      documents: await documents(documentsHref, date, number),
    };
  });
