import Crawler from "crawler";
import { Moment } from "moment";
import moment from "moment";
import { BASE_URL } from "../pages";
import { TAction } from "./action";

export interface TVyborDetail {
  title: string;
  actions: TAction[];
  desc: string;
}

export default (uri: string): Promise<TVyborDetail> => {
  // console.log("`${BASE_URL}${uri}`", `${BASE_URL}${uri}`);
  return new Promise((resolve, reject) => {
    new Crawler({
      callback: function (error, { $ }, done) {
        if (error) {
          reject(error);
        } else {
          const title = $("h1").text();
          const desc = $(".news-item.no-date .news-item-title").text();

          const actions: TAction[] = $(".news-item.no-date .news-item-title")
            .map((_, item) => {
              const dateStr = "";
              const a = $(item).find("a");
              return {
                title: a.text(),
                desc: $(item).text(),
                href: a.attr("href"),
                date: dateStr,
              };
            })
            .toArray() as any;

          resolve({ actions, title, desc });
        }
        done();
      },
    }).queue(`${BASE_URL}${uri}`);
  });
};
