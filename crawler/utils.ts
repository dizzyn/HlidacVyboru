import {
  COMMITTEES_PER_NAME,
  COMMITTEE_SHORTCUTS,
  MONTHS,
  TCommitteeName,
} from "./enums";
import { TAction } from "./vybor";
import moment from "moment";
import { TDocument } from "./documents";

const REGEXP_DATE = `\\d{1,2}.\\s(${MONTHS.join("|")})\\s\\d{4}`;
const REGEXP_DATE_INDEXED = `\\d{1,2}.\\s\\d{1,2}\\.\\s\\d{4}`;

const extRegexp = (regexp: string) => `((\\s)?-\\s)?(\\()?${regexp}(\\))?`;

export const getDate = (str: string) => {
  const found = [REGEXP_DATE, REGEXP_DATE_INDEXED]
    .map((regexp) => str.match(RegExp(regexp)))
    .find((x) => x);

  return found && found.length ? found[0] : null;
};

// @ts-ignore
export const createHlidacUpdate = (hlidacJson: any, documents: TDocument[]) => {
  // console.log("AA", hlidacJson);
};

export const removeDate = (str: string) => {
  const found = [REGEXP_DATE, REGEXP_DATE_INDEXED]
    .map((regexp) => str.match(RegExp(extRegexp(regexp))))
    .find((x) => x);
  const date = found && found.length ? found[0] : null;
  return date ? str.replace(date, "") : str;
};

export const getNumber = (str: string) => {
  const found = str.match(RegExp("\\d{1,2}"));
  return found && found.length ? found[0] : null;
};

export const removeNumber = (str: string) => {
  const found = str.match(RegExp("\\d{1,2}.\\s"));
  const date = found && found.length ? found[0] : null;
  return date ? str.replace(date, "") : str;
};

export const filterActions = (items: TAction[]) =>
  items.filter((item) => {
    if (
      item.title.match(
        RegExp(`(s|S)chůze\\s(\\b${COMMITTEE_SHORTCUTS.join("|\\b")})`, "g")
      )
    ) {
      return true;
    }
    return false;
  });

export const createHlidacJsonLink = (hlidacId: string) => {
  return `https://www.hlidacstatu.cz/api/v2/datasety/vybory-psp/zaznamy/${hlidacId}`;
};

export const createHlidacLink = (hlidacId: string) => {
  return `https://www.hlidacstatu.cz/data/Detail/vybory-psp/${hlidacId}`;
};

export const createHlidacDocLink = (hlidacId: string, index: number) => {
  return `https://www.hlidacstatu.cz/data/DetailText/Vybory-PSP/${hlidacId}?p=dokumenty[${index}]`;
};

export const createHlidacRecordLink = (hlidacId: string, index: number) => {
  return `https://www.hlidacstatu.cz/data/DetailText/Vybory-PSP/${hlidacId}?p=audio[${index}]`;
};

export const createURL = (path: string) => {
  if (path && path.includes("https://")) {
    return path;
  } else if (path.includes("http://")) {
    return path;
  } else if (path && path.includes("sqw/")) {
    return `https://www.psp.cz/${path ?? ""}`;
  }
  return `https://www.psp.cz/sqw/${path ?? ""}`;
};

export const getOnlyNodeText = ($item: cheerio.Cheerio) =>
  $item.contents().not($item.children()).text();

export const createHlidacId = (
  date: string,
  number: string,
  name: TCommitteeName
) => {
  MONTHS.map((month, i) => {
    date = date.replace(month, `${i + 1}.`);
  });

  const committee = COMMITTEES_PER_NAME[name];

  const m = moment(date, "DD. MM. YYYY");
  return `${committee.id}-${number}-${m.format("YYYYMMDD")}`;
};

export const mergeActions = (items: TAction[]) => items;
// items.reduce(
//   (acc: TAction[], action) =>
//     acc.find(({ date }) => date === action.date) ? acc : [...acc, action],
//   []
// );
