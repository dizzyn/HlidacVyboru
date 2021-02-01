import crawler from ".";

export interface TVybor {
  title: string;
  href: string;
}

export default (sourceUrl: string) =>
  crawler<TVybor[]>(sourceUrl, ($) => {
    const data = $(".section .link-list > li > a")
      .map((_, a) => {
        return { title: $(a).text(), href: $(a).attr("href") };
      })
      .toArray() as any;

    return data;
  });
