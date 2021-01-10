import crawler from ".";

import { createHlidacDocLink, createURL, getDate, removeDate } from "./utils";

type TDocumentType = "POZVANKA" | "ZAPIS" | "ZAZNAM" | "USNESENI";

export interface TDocument {
  title: string;
  type: TDocumentType;
  documentUrl: string;
  sourceUrl: string;
  hlidacLink: string | null;
}

const loadDocument = async (
  sourceUrl: string,
  type: TDocumentType,
  hlidacJson: any
) =>
  crawler<TDocument>(sourceUrl, async ($) => {
    const title = $(".page-title h1").text();
    const href = $("a:contains('Originál dokumentu')").attr("href");

    if (!title) {
      throw `Nepodařilo se získat titulek dokumentu (${sourceUrl})`;
    }

    if (!href) {
      throw `Nepodařilo se získat adresu dokumentu (${sourceUrl})`;
    }

    const documentUrl = createURL("text/" + href);

    const hlidacDocIndex = hlidacJson.dokumenty?.findIndex(
      ({ DocumentUrl }: any) => {
        return DocumentUrl === documentUrl;
      }
    );

    return {
      title: removeDate(title),
      type,
      documentUrl,
      sourceUrl,
      hlidacLink:
        hlidacDocIndex > -1
          ? createHlidacDocLink(hlidacJson.Id, hlidacDocIndex)
          : null,
    };
  });

const loadMeta = async (sourceUrl: string, number: string, hlidacJson: any) =>
  crawler<TDocument[]>(sourceUrl, async ($) => {
    const documents: TDocument[] = [];

    // Pozvanka
    const pozvankaHref = $(`h4:contains('Pozvánka')`)
      .next()
      .find(`a:contains(${number})`)
      .attr("href");

    if (pozvankaHref) {
      documents.push(
        await loadDocument(createURL(pozvankaHref), "POZVANKA", hlidacJson)
      );
    }

    // Zápis
    const zapisHref = $(`h4:contains('Zápis z jednání')`)
      .next()
      .find(`a:contains(${number})`)
      .attr("href");

    if (zapisHref) {
      documents.push(
        await loadDocument(createURL(zapisHref), "ZAPIS", hlidacJson)
      );
    }

    // Zvukovy zaznam
    const zaznamHref = $(`h4:contains('Zvukový záznam z jednání')+* a`).attr(
      "href"
    );

    if (zaznamHref) {
      const absUrl = createURL(zaznamHref);
      const hlidacDocIndex = hlidacJson.dokumenty?.findIndex(
        ({ DocumentUrl }: any) => {
          console.log(DocumentUrl, absUrl);
          return DocumentUrl === absUrl;
        }
      );

      // console.log("POZOR", hlidacDocIndex, zaznamHref);

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

    let documents = metaHref
      ? await loadMeta(createURL(metaHref), number, hlidacJson)
      : [];

    // Usnesení
    const pozvankaHref = $(`h2:contains('Pozvánky na schůze')`)
      .next()
      .find(`a:contains(${number})`)
      .attr("href");

    if (pozvankaHref) {
      documents.push(
        await loadDocument(createURL(pozvankaHref), "POZVANKA", hlidacJson)
      );
    }

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
            return loadDocument(createURL(href), "USNESENI", hlidacJson);
          }
        })
        .toArray()
    )) as any;

    return [...documents, ...usneseni].filter((a) => a);
  });
