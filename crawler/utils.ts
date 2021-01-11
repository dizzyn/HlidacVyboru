import {
  COMMITTEES_PER_NAME,
  COMMITTEE_SHORTCUTS,
  MONTHS,
  TCommitteeName,
} from "./enums";
import { TAction } from "./vybor";
import moment from "moment";

const REGEXP_DATE = `\\d{1,2}.\\s(${MONTHS.join("|")})\\s\\d{4}`;

const REGEXP_DATE_EXT = `((\\s)?-\\s)?(\\()?${REGEXP_DATE}(\\))?`;

export const getDate = (str: string) => {
  const found = str.match(RegExp(REGEXP_DATE));
  return found && found.length ? found[0] : null;
};

export const removeDate = (str: string) => {
  const found = str.match(RegExp(REGEXP_DATE_EXT));
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

export const filterAction = (items: TAction[]) => {
  return items.filter((item) => {
    if (
      item.title.match(
        RegExp(`schůze\\s(\\b${COMMITTEE_SHORTCUTS.join("\\b|\\b")}\\b)`, "g")
      )
    ) {
      return true;
    }
    return false;
  });
};

export const createHlidacJsonLink = (hlidacId: string) => {
  return `https://www.hlidacstatu.cz/api/v2/datasety/vybory-psp/zaznamy/${hlidacId}`;
};

export const createHlidacLink = (hlidacId: string) => {
  return `https://www.hlidacstatu.cz/data/Detail/vybory-psp/${hlidacId}`;
};

export const createHlidacDocLink = (hlidacId: string, index: number) => {
  return `https://www.hlidacstatu.cz/data/DetailText/Vybory-PSP/${hlidacId}?p=dokumenty[${index}]`;
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
