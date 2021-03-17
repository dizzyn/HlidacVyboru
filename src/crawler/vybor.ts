import crawler from ".";
import {
  getDate,
  removeDate,
  filterActions,
  getOnlyNodeText,
  mergeActions,
  createURL,
} from "../utils";

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

export default (sourceUrl: string) =>
  crawler<TVyborDetail>(sourceUrl, ($) => {
    const title = $("h1").text();
    const desc = ($(".news-item.no-date .news-item-title").text() ?? "").trim();

    const actions: TAction[] = $(".news-item.no-date")
      .map((_, item) => {
        const $title = $(item).find(".news-item-title");
        const dateStr =
          getDate($title.text()) ?? getDate(getOnlyNodeText($(item)));
        const $a = $($title).find("a");
        const url = $a.attr("href");
        if (!url) {
          throw new Error(
            `Nepodařilo se získat URL detailu výboru (${sourceUrl})`
          );
        }
        return {
          title: removeDate($title.text()),
          desc: removeDate(getOnlyNodeText($(item)))
            .replace(/(,(\s)?)?viz /, "")
            .trim(),
          href: createURL(url),
          date: dateStr,
        } as TAction;
      })
      .toArray() as any;

    return Promise.resolve({
      actions: mergeActions(filterActions(actions)),
      title,
      desc,
    });
  });
