import {
  COMMITTEES_PER_NAME,
  COMMITTEE_SHORTCUTS,
  MONTHS,
  TCommitteeName,
} from "./enums";
import { TAction } from "./crawler/vybor";
import moment from "moment";

export const BASE_URL = "hp.sqw?k=194";

const REGEXP_DATE = `\\d{1,2}.\\s(${MONTHS.join("|")})\\s\\d{4}`;
const REGEXP_DATE_INDEXED = `\\d{1,2}.\\s\\d{1,2}\\.\\s\\d{4}`;

const extRegexp = (regexp: string) => `((\\s)?-\\s)?(\\()?${regexp}(\\))?`;

export const getDate = (str: string) => {
  const found = [REGEXP_DATE, REGEXP_DATE_INDEXED]
    .map((regexp) => str.match(RegExp(regexp)))
    .find((x) => x);

  return found && found.length ? found[0] : null;
};

export const padWithZeroes = (number: number, length: number) => {
  let my_string = "" + number;
  while (my_string.length < length) {
    my_string = "0" + my_string;
  }

  return my_string;
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

export const createHlidacAPIGetLink = (hlidacId: string) => {
  return `https://www.hlidacstatu.cz/api/v2/datasety/vybory-psp/zaznamy/${hlidacId}`;
};

export const createHlidacAPISetLink = (hlidacId: string) => {
  return `https://www.hlidacstatu.cz/api/v1/DatasetItem/vybory-psp/${hlidacId}?mode=rewrite`;
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
    return `https://www.psp.cz/${path || ""}`;
  }
  return `https://www.psp.cz/sqw/${path || ""}`;
};

export const getOnlyNodeText = ($item: cheerio.Cheerio) =>
  $item.contents().not($item.children()).text();

export const createHlidacId = (
  date: string,
  number: number,
  name: TCommitteeName
) => {
  MONTHS.map((month, i) => {
    date = date.replace(month, `${i + 1}.`);
  });

  const committee = COMMITTEES_PER_NAME[name];

  const m = moment(date, "DD. MM. YYYY");
  return `${committee.id}-${number}-${m.format("YYYYMMDD")}`;
};

export const mergeActions = (items: TAction[]) =>
  items.reduce(
    (acc: TAction[], action) =>
      acc.find(({ date }) => date === action.date) ? acc : [...acc, action],
    []
  );

export const nowTimestam = () => {
  return moment().format("YYYYMMDDHHmmss");
};

export const createDocFileName = (
  title: string,
  type: "doc" | "docx" | "pdf" | "mp3" | "pptx"
) => {
  let str = title.trim().replace(/\\|\/|\s/g, "_");
  if (!["doc", "docx", "pdf", "mp3", "pptx"].find((ext) => str.includes(ext))) {
    str = str.trim() + "." + type;
  }
  return str.replace(/_+/g, "_");
};
