import Crawler from "crawler";

const crawler = <TResult>(
  uri: string,
  callback: ($: cheerio.CheerioAPI) => Promise<TResult>
) =>
  new Promise<TResult>((resolve, reject) => {
    new Crawler({
      callback: async (error, { $ }, done) => {
        if (error) {
          return reject(error);
        }

        try {
          resolve((await callback($)) as TResult);
        } catch (e) {
          reject(e);
        }

        done();
      },
    }).queue(uri);
  });

export default crawler;
