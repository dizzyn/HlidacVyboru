import crawler from ".";
import { THlidacData } from "../dao";

import {
  createDocFileName,
  createHlidacDocLink,
  createURL,
  getDate,
  removeDate,
} from "../utils";

export type TDocumentType =
  | "POZVANKA"
  | "ZAPIS"
  | "ZAZNAM"
  | "USNESENI"
  | "DOKUMENT";

export interface TDocument {
  filename: string;
  desc: string;
  type: TDocumentType;
  documentUrl: string;
  sourceUrl: string;
  hlidacLink: string | null;
}

export const getHlidacDocLink = (
  documentUrl: string,
  hlidacJson: THlidacData | null,
  type: TDocumentType
) => {
  if (!hlidacJson) {
    return null;
  }
  const hlidacDocIndex = hlidacJson[
    type === "ZAZNAM" ? "audio" : "dokumenty"
  ]?.findIndex(({ DocumentUrl }: any) => {
    return DocumentUrl === documentUrl;
  });

  return hlidacDocIndex > -1
    ? type === "ZAZNAM"
      ? "N/A" // no detail of audio at the Hlidac
      : createHlidacDocLink(hlidacJson.Id, hlidacDocIndex)
    : null;
};

export const fetchDocumentFromLink = async (
  documents: TDocument[],
  selector: string,
  type: TDocumentType,
  hlidacJson: THlidacData | null,
  $: cheerio.CheerioAPI,
  sourceUrl: string
) => {
  const $docElements = $(selector);
  for (let i = 0; i < $docElements.length; i++) {
    const $docElement = $($docElements[i]);
    const docHref = $docElement.attr("href");
    if (docHref) {
      const documentUrl = createURL(docHref);
      const desc = (removeDate($docElement.text()) ?? "").trim();
      const definitiveType = desc.toLowerCase().includes("mp3")
        ? "ZAZNAM"
        : type;
      if (docHref.includes("orig2.sqw")) {
        documents.push({
          desc,
          filename: createDocFileName(
            desc,
            definitiveType === "ZAZNAM"
              ? "mp3"
              : docHref.includes("pdf=1")
              ? "pdf"
              : "doc"
          ),
          type: definitiveType,
          documentUrl,
          sourceUrl,
          hlidacLink: getHlidacDocLink(documentUrl, hlidacJson, type),
        });
      } else if (docHref.includes("text2.sqw")) {
        documents.push(
          await loadDocument(createURL(docHref), type, hlidacJson)
        );
      }
    }
  }
};

export const loadDocumentArchive = async (
  documents: TDocument[],
  selector: string,
  date: string,
  type: TDocumentType,
  hlidacJson: THlidacData | null,
  $: cheerio.CheerioAPI,
  sourceUrl: string
) => {
  const href = $(selector).attr("href");

  if (!href) {
    throw new Error(
      `Nepodařilo se získat odkaz na stránku archivu (${sourceUrl})`
    );
  }

  await crawler(createURL(href), async ($) => {
    const nextHref = $(".next").attr("href");

    const $docElements = $(`td:contains(${date.split(" ").join("\u00a0")})`)
      .prev()
      .find("a");

    for (let i = 0; i < $docElements.length; i++) {
      const $docElement = $($docElements[i]);
      const docHref = $docElement.attr("href") ?? "";
      if (docHref) {
        const doc = await loadDocument(
          createURL(docHref),
          type,
          hlidacJson,
          $docElement.parent("td").next("td").text()
        );
        documents.push(doc);
      }
    }

    if (nextHref) {
      await loadDocumentArchive(
        documents,
        ".next",
        date,
        type,
        hlidacJson,
        $,
        sourceUrl
      );
    }
  });
};

export const loadDocument = async (
  sourceUrl: string,
  type: TDocumentType,
  hlidacJson: THlidacData | null,
  desc?: string
) =>
  crawler<TDocument>(sourceUrl, async ($) => {
    const title = $(".page-title h1").text();
    const href =
      $("a:contains('Originál dokumentu')").attr("href") ??
      $("a:contains('Verze PDF')").attr("href");

    if (!title) {
      throw new Error(`Nepodařilo se získat titulek dokumentu (${sourceUrl})`);
    }

    if (!href) {
      throw new Error(`Nepodařilo se získat adresu dokumentu (${sourceUrl})`);
    }

    const documentUrl = createURL("text/" + href);
    return {
      desc: desc ?? removeDate(title),
      filename: createDocFileName(title, "docx"),
      type,
      documentUrl,
      sourceUrl,
      hlidacLink: getHlidacDocLink(documentUrl, hlidacJson, type),
    };
  });

const loadAlternateMetaHref = async (
  sourceUrl: string,
  number: number
): Promise<string | null> =>
  crawler<string | null>(sourceUrl, async ($) => {
    // console.log("Hledám meta", number, sourceUrl);

    const metaHref = $(`a:contains(${number})`).attr("href");
    // console.log("Nalezl jsem", metaHref);
    if (metaHref) {
      return metaHref;
    }

    const nextHref = $(".next").attr("href");
    // console.log("Zkouším next", nextHref);
    if (nextHref) {
      return await loadAlternateMetaHref(createURL(nextHref), number);
    }
    return null;
  });

const loadMeta = async (
  sourceUrl: string,
  number: number,
  hlidacJson: THlidacData | null
) =>
  crawler<TDocument[]>(sourceUrl, async ($) => {
    const documents: TDocument[] = [];

    // Pozvanka z meta
    await fetchDocumentFromLink(
      documents,
      `h4:contains('Pozvánka') + table a:contains(${number})`,
      "POZVANKA",
      hlidacJson,
      $,
      sourceUrl
    );

    // Zápis z meta
    await fetchDocumentFromLink(
      documents,
      `h4:contains('Zápis z jednání') + table a:contains(${number})`,
      "ZAPIS",
      hlidacJson,
      $,
      sourceUrl
    );

    // Dokumenty, prezentace
    await fetchDocumentFromLink(
      documents,
      `h4:contains('Dokumenty a prezentace') + table a`,
      "DOKUMENT",
      hlidacJson,
      $,
      sourceUrl
    );

    // Dokumenty, prezentace
    await fetchDocumentFromLink(
      documents,
      `h4:contains('MP3') + table a`,
      "ZAZNAM",
      hlidacJson,
      $,
      sourceUrl
    );

    // Zaznam
    const $zaznamLink = $(`h4:contains('Zvukový záznam z jednání')+* a`);
    const zaznamHref = $zaznamLink.attr("href");
    if (zaznamHref) {
      const documentUrl = createURL(zaznamHref);

      documents.push({
        desc: `Zvukový záznam z jednání č ${number}.`,
        filename: $zaznamLink.text(),
        type: "ZAZNAM",
        documentUrl,
        sourceUrl,
        hlidacLink: getHlidacDocLink(documentUrl, hlidacJson, "ZAZNAM"),
      });
    }

    return documents;
  });

export default (
  sourceUrl: string,
  date: string,
  number: number,
  hlidacJson: THlidacData | null
) =>
  crawler<TDocument[]>(sourceUrl, async ($) => {
    const metaHref = $(
      `h2:contains('Pozvánky, zvukové záznamy a prezentace ze schůzí')`
    )
      .next()
      .find(`a:contains(${number})`)
      .attr("href");

    const nextMetaHref = $(
      `h2:contains('Pozvánky, zvukové záznamy a prezentace ze schůzí')`
    )
      .next()
      .next()
      .find(`a:contains(další)`)
      .attr("href");

    let documents: TDocument[] = [];

    if (metaHref) {
      documents = [
        ...documents,
        ...(await loadMeta(createURL(metaHref), number, hlidacJson)),
      ];
    } else if (nextMetaHref) {
      const alternateMetaHref = await loadAlternateMetaHref(
        createURL(nextMetaHref),
        number
      );
      // console.log("Alternate meta href", alternateMetaHref);
      if (alternateMetaHref) {
        documents = [
          ...documents,
          ...(await loadMeta(createURL(alternateMetaHref), number, hlidacJson)),
        ];
      }
    }

    // Pozvánka přimo bez Meta
    await fetchDocumentFromLink(
      documents,
      `h2:contains('Pozvánky na schůze') + table a:contains(${number})`,
      "POZVANKA",
      hlidacJson,
      $,
      sourceUrl
    );

    // Usnesení
    const usneseni = (await Promise.all(
      $(`h2:contains('Usnesení')`)
        .next()
        .find("tr")
        .map(async (_, tr) => {
          const $tr = $(tr);
          const trDate = getDate($tr.find("em").text());
          const href = $tr.find("a").attr("href");

          if (!href) {
            throw new Error(
              `Nepodařilo se získat datum usnesení (${sourceUrl})`
            );
          }

          if (!href) {
            throw new Error(
              `Nepodařilo se získat link na usnesení (${sourceUrl})`
            );
          }

          if (trDate === date) {
            return await loadDocument(createURL(href), "USNESENI", hlidacJson);
          }
        })
        .toArray()
    )) as any;

    // Usnesení z archivu
    await loadDocumentArchive(
      documents,
      `h2:contains('Usnesení') + table + p a`,
      date,
      "USNESENI",
      hlidacJson,
      $,
      sourceUrl
    );

    return [...documents, ...usneseni].filter((a) => a);
  });
