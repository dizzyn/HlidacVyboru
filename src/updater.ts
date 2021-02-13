import vybory from "./crawler/vybory";
import vybor from "./crawler/vybor";
import { BASE_URL, createURL } from "./utils";
import action, { TActionDetail } from "./crawler/action";
import chalk from "chalk";

export const update = async (data: TActionDetail) => {
  console.log(data.hlidacJson.Error === "Zaznam nenalezen.");

  if (data.hlidacJson.Error === "Zaznam nenalezen.") {
    console.log(chalk.yellow(data.hlidacId), "To be inserted");
  } else {
    console.log(chalk.yellow(data.hlidacId), " ---- ok");
  }
};
