import crawler from ".";

import {
  createHlidacDocLink,
  createHlidacRecordLink,
  createURL,
  getDate,
  removeDate,
} from "./utils";

export type TDocumentType =
  | "POZVANKA"
  | "ZAPIS"
  | "ZAZNAM"
  | "USNESENI"
  | "DOKUMENT";

export interface TDocument {
  title: string;
  type: TDocumentType;
  documentUrl: string;
  sourceUrl: string;
  hlidacLink: string | null;
}

export const getHlidacDocLink = (documentUrl: string, hlidacJson: any) => {
  const hlidacDocIndex = hlidacJson.dokumenty?.findIndex(
    ({ DocumentUrl }: any) => {
      return DocumentUrl === documentUrl;
    }
  );

  return hlidacDocIndex > -1
    ? createHlidacDocLink(hlidacJson.Id, hlidacDocIndex)
    : null;
};

export const getHlidacRecordLink = (documentUrl: string, hlidacJson: any) => {
  const hlidacDocIndex = hlidacJson.audio?.findIndex(({ DocumentUrl }: any) => {
    return DocumentUrl === documentUrl;
  });

  return hlidacDocIndex > -1
    ? createHlidacRecordLink(hlidacJson.Id, hlidacDocIndex)
    : null;
};

export const fetchDocumentFromLink = async (
  documents: TDocument[],
  selector: string,
  type: TDocumentType,
  hlidacJson: any,
  $: cheerio.CheerioAPI,
  sourceUrl: string
) => {
  const $docElements = $(selector);
  for (let i = 0; i < $docElements.length; i++) {
    const $docElement = $($docElements[i]);
    const docHref = $docElement.attr("href");
    if (docHref) {
      const documentUrl = createURL(docHref);
      if (docHref.includes("orig2.sqw")) {
        documents.push({
          title: removeDate($docElement.text()),
          type,
          documentUrl,
          sourceUrl,
          hlidacLink:
            type === "ZAZNAM"
              ? getHlidacRecordLink(documentUrl, hlidacJson)
              : getHlidacDocLink(documentUrl, hlidacJson),
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
  hlidacJson: any,
  $: cheerio.CheerioAPI,
  sourceUrl: string
) => {
  const href = $(selector).attr("href");

  if (!href) {
    throw `Nepodařilo se získat odkaz na stránku archivu (${sourceUrl})`;
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
        const doc = await loadDocument(createURL(docHref), type, hlidacJson);
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
  hlidacJson: any
) =>
  crawler<TDocument>(sourceUrl, async ($) => {
    const title = $(".page-title h1").text();
    const href =
      $("a:contains('Originál dokumentu')").attr("href") ??
      $("a:contains('Verze PDF')").attr("href");

    if (!title) {
      throw `Nepodařilo se získat titulek dokumentu (${sourceUrl})`;
    }

    if (!href) {
      throw `Nepodařilo se získat adresu dokumentu (${sourceUrl})`;
    }

    const documentUrl = createURL("text/" + href);

    return {
      title: removeDate(title),
      type,
      documentUrl,
      sourceUrl,
      hlidacLink: getHlidacDocLink(documentUrl, hlidacJson),
    };
  });

const loadAlternateMetaHref = async (
  sourceUrl: string,
  number: string
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

const loadMeta = async (sourceUrl: string, number: string, hlidacJson: any) =>
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
    const zaznamHref = $(`h4:contains('Zvukový záznam z jednání')+* a`).attr(
      "href"
    );

    if (zaznamHref) {
      const absUrl = createURL(zaznamHref);
      const hlidacDocIndex = hlidacJson.dokumenty?.findIndex(
        ({ DocumentUrl }: any) => {
          return DocumentUrl === absUrl;
        }
      );

      documents.push({
        title: `Zvukový záznam z jednání č ${number}.`,
        type: "ZAZNAM",
        documentUrl: createURL(zaznamHref),
        sourceUrl,
        hlidacLink:
          hlidacDocIndex > -1
            ? createHlidacDocLink(hlidacJson.Id, hlidacDocIndex)
            : null,
      });
    }

    return documents;
  });

export default (
  sourceUrl: string,
  date: string,
  number: string,
  hlidacJson: any
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
            throw `Nepodařilo se získat datum usnesení (${sourceUrl})`;
          }

          if (!href) {
            throw `Nepodařilo se získat link na usnesení (${sourceUrl})`;
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
