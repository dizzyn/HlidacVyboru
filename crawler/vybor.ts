import Crawler from "crawler";
import { BASE_URL } from "../pages";

export default (uri: string) => {
  // console.log("`${BASE_URL}${uri}`", `${BASE_URL}${uri}`);
  return new Promise((resolve, reject) => {
    new Crawler({
      callback: function (error, { $ }, done) {
        if (error) {
          reject(error);
        } else {
          const data = $(".news-item.no-date .news-item-title a")
            .map((_, a) => {
              return { title: $(a).text(), href: $(a).attr("href") };
            })
            .toArray();

          resolve(data);
        }
        done();
      },
    }).queue(`${BASE_URL}${uri}`);
  });
};
