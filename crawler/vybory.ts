import crawler from ".";
import { createURL } from "../pages";

export interface TVybor {
  title: string;
  href: string;
}

export default () =>
  crawler<TVybor>(createURL("hp.sqw?k=194"), ($) => {
    const data = $(".link-list > li > a")
      .map((_, a) => {
        return { title: $(a).text(), href: $(a).attr("href") };
      })
      .toArray() as any;

    return data;
  });
