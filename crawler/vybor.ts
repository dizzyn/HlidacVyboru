import crawler from ".";
import { createURL } from "../pages";
import { getDate, removeDate } from "./utils";

export interface TAction {
  title: string;
  date: string;
  href: string;
  desc: string;
}
export interface TVyborDetail {
  title: string;
  actions: TAction[];
  desc: string;
}

export default (uri: string) =>
  crawler<TVyborDetail>(createURL(uri), ($) => {
    const title = $("h1").text();
    const desc = $(".news-item.no-date .news-item-title").text();

    const getOnlyNodeText = (item: cheerio.Element) =>
      $(item).contents().not($(item).children()).text();

    const actions: TAction[] = $(".news-item.no-date")
      .map((_, item) => {
        const $title = $(item).find(".news-item-title");
        const $a = $($title).find("a");
        const dateStr =
          getDate($title.text()) ?? getDate(getOnlyNodeText(item));

        return {
          title: removeDate($title.text()),
          desc: removeDate(getOnlyNodeText(item)).replace(/(,(\s)?)?viz /, ""),
          href: $a.attr("href"),
          date: dateStr,
        };
      })
      .toArray() as any;

    return Promise.resolve({ actions, title, desc });
  });
