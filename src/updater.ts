import { TActionDetail } from "./crawler/action";
import chalk from "chalk";
import fs from "fs";
import { padWithZeroes as padWithZeroes } from "./utils";
import { insertHlidac, THlidacData } from "./dao";
import { COMMITTEES_PER_NAME, HLIDAC_TYPE_PER_TYPE, MONTHS } from "./enums";
import moment from "moment";
import { domainToASCII } from "url";

const logPath = __dirname + "/../logs";

const logInsert = async (
  runId: string,
  index: number,
  hlidacId: string,
  newData: Partial<THlidacData>,
  dry: boolean
) => {
  const filePath = `${logPath}/${runId}-${padWithZeroes(index, 3)}-INSERT-${
    dry ? "DRY" : ""
  }-${hlidacId}.json`;

  console.log("FILE - ", filePath);

  try {
    fs.writeFile(filePath, JSON.stringify(newData), () => {});
  } catch (e) {
    console.error("Could not write insert log file");
  }
};

export const createHlidacDate = (date: string) => {
  MONTHS.map((month, i) => {
    date = date.replace(month, `${i + 1}.`);
  });

  const m = moment(date, "DD. MM. YYYY");
  return `${m.format("YYYY-MM-DD")}-T00:00:00`;
};

export const createHlidacData = (data: TActionDetail): THlidacData => {
  return {
    Id: data.hlidacId,
    datum: createHlidacDate(data.date),
    cisloJednani: data.number,
    vybor: data.committee,
    vyborId: COMMITTEES_PER_NAME[data.committee].id,
    vyborUrl: COMMITTEES_PER_NAME[data.committee].url,
    dokumenty: data.documents.map((doc) => ({
      HsProcessType: "documentsave",
      DocumentUrl: doc.documentUrl,
      jmeno: doc.filename,
      popis: doc.desc,
      typ: HLIDAC_TYPE_PER_TYPE[doc.type],
    })),
    audio: data.records.map((rec) => ({
      HsProcessType: "documentsave",
      DocumentUrl: rec.documentUrl,
      jmeno: rec.filename,
    })),
  };
};

const dry = {
  insert: async (runId: string, index: number, data: TActionDetail) => {
    console.log(chalk.green(data.hlidacId, " - To be inserted"));
    insertHlidac(data.hlidacId, createHlidacData(data));
    await logInsert(runId, index, data.hlidacId, createHlidacData(data), true);
  },
};

export const update = async (
  data: TActionDetail,
  runId: string,
  index: number
) => {
  if (!data.hlidacJson) {
    await dry.insert(runId, index, data);
  } else {
    console.log(chalk.blue(data.hlidacId), " ---- ok");
  }
};
