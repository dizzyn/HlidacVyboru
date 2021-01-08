import Crawler from "crawler";
import { BASE_URL } from "../pages";
import { getDate, getNumber, removeDate, removeNumber } from "./utils";

export interface TDocument {
  title: string;
}
export interface TActionDetail {
  title: string;
  date: string | null;
  number: string | null;
  desc: string;
  documents: TDocument[];
  sourceHref: string;
}

export default (uri: string): Promise<TActionDetail> => {
  console.log("`${BASE_URL}${uri}`", `${BASE_URL}${uri}`);
  return new Promise((resolve, reject) => {
    new Crawler({
      callback: function (error, { $ }, done) {
        if (error) {
          reject(error);
        } else {
          const title = $("#main-content b").text();

          resolve({
            title: removeDate(removeNumber(title)),
            date: getDate(title),
            number: getNumber(title),
            desc: "",
            sourceHref: `${BASE_URL}${uri}`,
            documents: [],
          });
        }
        done();
      },
    }).queue(`${BASE_URL}${uri}`);
  });
};
