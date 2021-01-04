// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import Crawler from "crawler";

const crawl = () =>
  new Promise((resolve, reject) => {
    new Crawler({
      maxConnections: 10,
      // This will be called for each crawled page
      callback: function (error, res, done) {
        if (error) {
          reject(error);
        } else {
          var $ = res.$;
          const data = $(".link-list > li > a")
            .map((index, a) => {
              return { title: $(a).text(), href: $(a).attr("href") };
            })
            .toArray();
          console.log(data);
          resolve(data);
        }
        done();
      },
    }).queue("https://www.psp.cz/sqw/hp.sqw?k=194");
  });

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await crawl();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
