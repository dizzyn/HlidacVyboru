import crawler from ".";
import { createURL } from "../utils";

export interface TVybor {
  title: string;
  href: string;
}

export default (sourceUrl: string) =>
  crawler<TVybor[]>(sourceUrl, ($) => {
    const data = $(".section .link-list > li > a")
      .map((_, a) => {
        const url = $(a).attr("href");
        if (!url) {
          throw new Error(`Nepodařilo se získat URL výboru (${sourceUrl})`);
        }
        return { title: $(a).text(), href: createURL(url) };
      })
      .toArray() as any;

    return data;
  });
