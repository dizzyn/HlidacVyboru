import crawler from ".";
import documents, { TDocument } from "./documents";
import { COMMITTEE_NAMES, TCommitteeName } from "./enums";
import {
  createHlidacId,
  getDate,
  getNumber,
  getOnlyNodeText,
  removeDate,
  removeNumber,
} from "./utils";
import { fetchHlidac } from "./vybor";

export interface TActionDetail {
  title: string;
  date: string;
  committee: TCommitteeName;
  number: string;
  documents: TDocument[];
  sourceUrl: string;
  hlidacId: string;
  hlidacError: string | null;
}

export default (sourceUrl: string) =>
  crawler<TActionDetail>(sourceUrl, async ($) => {
    const title = $("#main-content b").text();
    const date = getDate(title);
    const documentsHref = $("a:contains('Dokumenty')").attr("href");
    const number = getNumber(title);
    const committee = getOnlyNodeText($("#left-column h2")).trim();

    if (!documentsHref) {
      throw `Nepodařilo se získat link na dokumenty (${sourceUrl})`;
    }

    if (!date) {
      throw `Nepodařilo se získat datum (${sourceUrl})`;
    }

    if (!number) {
      throw `Nepodařilo se získat číslo jednání (${sourceUrl})`;
    }

    if (!COMMITTEE_NAMES.includes(committee as any)) {
      throw `Nepodařilo najít název výboru: '${committee}' (${sourceUrl})`;
    }

    const hlidacId = createHlidacId(
      date.trim(),
      number.trim(),
      committee as TCommitteeName
    );

    if (!hlidacId) {
      throw `Nepodařilo se vypočítat ID pro hlídač (${sourceUrl})`;
    }

    const hlidacJson = await fetchHlidac(hlidacId);

    if (!hlidacJson || typeof hlidacJson !== "object") {
      throw `Nepodařilo se získat data z hlídače (${sourceUrl})`;
    }

    return {
      title: removeDate(removeNumber(title)),
      date: date.trim(),
      committee: committee as TCommitteeName,
      number: number.trim(),
      sourceUrl,
      documents: await documents(documentsHref, date, number, hlidacJson),
      hlidacError: hlidacJson.Error ?? null,
      hlidacId,
    };
  });
