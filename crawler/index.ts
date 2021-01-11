import Crawler from "crawler";
import { Url } from "url";

const crawler = <TResult>(
  sourceUrl: string,
  callback: ($: cheerio.CheerioAPI, uri: Url) => Promise<TResult>
) =>
  new Promise<TResult>((resolve, reject) => {
    new Crawler({
      skipDuplicates: true,
      callback: async (error, { $, request }, done) => {
        if (error) {
          return reject(error);
        }

        try {
          resolve((await callback($, request.uri)) as TResult);
        } catch (e) {
          reject(e);
        }

        done();
      },
    }).queue(sourceUrl);
  });

export default crawler;
