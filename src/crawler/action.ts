import crawler from ".";
import documents, { fetchDocumentFromLink, TDocument } from "./documents";
import { COMMITTEE_NAMES, TCommitteeName } from "../enums";
import {
  createHlidacDocLink,
  createHlidacId,
  createURL,
  getDate,
  getNumber,
  getOnlyNodeText,
  removeDate,
  removeNumber,
} from "../utils";
import { fetchHlidac, THlidacData } from "../dao";

export interface THlidacOnlyDoc {
  title: string;
  documentUrl: string;
  hlidacLink: string;
}

export interface THlidacOnlyRecord {
  title: string;
  documentUrl: string;
  hlidacLink: string;
}

const removeDuplicities = (docs: TDocument[]) =>
  docs.reduce(
    (acc: TDocument[], doc) =>
      acc.find(({ documentUrl }) => documentUrl === doc.documentUrl)
        ? acc
        : [...acc, doc],
    []
  );

export interface TActionDetail {
  title: string;
  date: string;
  committee: TCommitteeName;
  number: number;
  documents: TDocument[];
  records: TDocument[];
  hlidacOnlyDocuments: THlidacOnlyDoc[];
  hlidacOnlyRecords: THlidacOnlyRecord[];
  sourceUrl: string;
  hlidacId: string;
  hlidacJson: THlidacData | null;
}

export default (sourceUrl: string) =>
  crawler<TActionDetail>(sourceUrl, async ($) => {
    const title = $("#main-content b").text();
    const desc = ($("#main-content").text() ?? "").trim();
    const date = getDate(title) ?? getDate(desc);
    const documentsHref = $("a:contains('Dokumenty')").attr("href");
    const number = parseInt(
      getNumber(removeDate(title)) ?? getNumber(removeDate(desc)) ?? "",
      10
    );
    const committee = getOnlyNodeText($("#left-column h2")).trim();
    // console.log("a", $("#left-column").html());
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
      number,
      committee as TCommitteeName
    );

    if (!hlidacId) {
      throw `Nepodařilo se vypočítat ID pro hlídač (${sourceUrl})`;
    }

    const hlidacJson = await fetchHlidac(hlidacId);

    const docsRaw = await documents(
      createURL(documentsHref),
      date,
      number,
      hlidacJson
    );

    const docs = docsRaw.filter(({ type }) => type !== "ZAZNAM");
    const records = docsRaw.filter(({ type }) => type === "ZAZNAM");

    const hlidacOnlyDocuments =
      hlidacJson?.dokumenty?.reduce(
        (acc: THlidacOnlyDoc[], doc, i: number) =>
          docs.find(({ documentUrl }) => doc.DocumentUrl === documentUrl)
            ? acc
            : [
                ...acc,
                {
                  title: doc.jmeno,
                  documentUrl: doc.DocumentUrl,
                  hlidacLink: createHlidacDocLink(hlidacId, i),
                },
              ],
        []
      ) ?? [];

    const hlidacOnlyRecords =
      hlidacJson?.audio?.reduce(
        (acc: THlidacOnlyRecord[], rec: any, i: number) =>
          records.find(({ documentUrl }) => rec.DocumentUrl === documentUrl)
            ? acc
            : [
                ...acc,
                {
                  title: rec.jmeno,
                  documentUrl: rec.DocumentUrl,
                  hlidacLink: createHlidacDocLink(hlidacId, i),
                },
              ],
        []
      ) ?? [];

    // Pozvánka přimo z novinky
    await fetchDocumentFromLink(
      docs,
      `a:contains('pozvánka')`,
      "POZVANKA",
      hlidacJson,
      $,
      sourceUrl
    );

    return {
      title: removeDate(removeNumber(title)),
      date: date.trim(),
      committee: committee as TCommitteeName,
      number: number,
      sourceUrl,
      documents: removeDuplicities(docs),
      records: removeDuplicities(records),
      hlidacOnlyDocuments,
      hlidacOnlyRecords,
      hlidacId,
      hlidacJson,
    };
  });
