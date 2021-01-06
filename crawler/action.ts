import Crawler from "crawler";
import { BASE_URL } from "../pages";

export interface TActionDetail {
  title: string;
  date: string;
  href: string;
}
export interface TAction {
  title: string;
  date: string;
  href: string;
  desc: string;
}

export default (uri: string): Promise<TAction> => {
  console.log("`${BASE_URL}${uri}`", `${BASE_URL}${uri}`);
  return new Promise((resolve, reject) => {
    new Crawler({
      callback: function (error, { $ }, done) {
        if (error) {
          reject(error);
        } else {
          const title = $("#main-content b").text();
          // const items = $(".news-item.no-date .news-item-title a")
          //   .map((_, a) => {
          //     return { title: $(a).text(), href: $(a).attr("href") };
          //   })
          //   .toArray();

          resolve({ title, date: "", href: "", desc: "" });
        }
        done();
      },
    }).queue(`${BASE_URL}${uri}`);
  });
};
