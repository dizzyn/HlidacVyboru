import Crawler from "crawler";
import { BASE_URL } from "../pages";

export default () =>
  new Promise((resolve, reject) => {
    new Crawler({
      callback: function (error, res, done) {
        if (error) {
          reject(error);
        } else {
          var $ = res.$;
          const data = $(".link-list > li > a")
            .map((_, a) => {
              return { title: $(a).text(), href: $(a).attr("href") };
            })
            .toArray();
          //   console.log(data);
          resolve(data);
        }
        done();
      },
    }).queue(`${BASE_URL}hp.sqw?k=194`);
  });
