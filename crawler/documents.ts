import crawler from ".";
import { createURL } from "../pages";
import { getDate, getNumber, removeDate, removeNumber } from "./utils";

type TDocumentType = "POZVANKA" | "ZAPIS" | "ZAZNAM" | "USNESENI";

export interface TDocument {
  title: string;
  type: TDocumentType;
  href: string;
  sourceHref: string;
}

const loadDocument = async (uri: string, type: TDocumentType) =>
  crawler<TDocument>(uri, async ($) => {
    const title = $(".page-title h1").text();
    const href = $("a:contains('Originál dokumentu')").attr("href");

    if (!title) {
      throw `Nepodařilo se získat titulek dokumentu (${uri})`;
    }

    if (!href) {
      throw `Nepodařilo se získat adresu dokumentu (${uri})`;
    }

    return {
      title: removeDate(title),
      type,
      href: createURL(href),
      sourceHref: uri,
    };
  });

const loadMeta = async (uri: string, number: string) =>
  crawler<TDocument[]>(uri, async ($) => {
    const documents: TDocument[] = [];

    // Pozvanka
    const pozvankaHref = $(`h4:contains('Pozvánka')`)
      .next()
      .find(`a:contains(${number})`)
      .attr("href");

    if (pozvankaHref) {
      documents.push(await loadDocument(createURL(pozvankaHref), "POZVANKA"));
    }

    // Zápis
    const zapisHref = $(`h4:contains('Zápis z jednání')`)
      .next()
      .find(`a:contains(${number})`)
      .attr("href");

    if (zapisHref) {
      documents.push(await loadDocument(createURL(zapisHref), "ZAPIS"));
    }

    // Zvukovy zaznam
    const zaznamHref = $(`h4:contains('Zvukový záznam z jednání')+* a`).attr(
      "href"
    );

    if (zaznamHref) {
      documents.push({
        title: `Zvukový záznam z jednání č ${number}.`,
        type: "ZAZNAM",
        href: createURL(zaznamHref),
        sourceHref: uri,
      });
    }

    return documents;
  });

export default (uri: string, date: string, number: string) =>
  crawler<TDocument[]>(createURL(uri), async ($) => {
    const metaHref = $(`.section-title:nth-of-type(1)`)
      .next()
      .find(`a:contains(${number})`)
      .attr("href");

    if (!metaHref) {
      throw `Nepodařilo se získat link na meta záznamy (${uri})`;
    }

    const documents = await loadMeta(createURL(metaHref), number);

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
            throw `Nepodařilo se získat datum usnesení (${uri})`;
          }

          if (!href) {
            throw `Nepodařilo se získat link na usnesení (${uri})`;
          }

          if (trDate === date) {
            return loadDocument(createURL(href), "USNESENI");
          }
        })
        .toArray()
    )) as any;

    return [...documents, ...usneseni].filter((a) => a);
  });
