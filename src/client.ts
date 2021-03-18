import action from "./crawler/action";
import { BASE_URL, createURL, nowTimestam as nowTimestamp } from "./utils";
import { update } from "./updater";
import chalk from "chalk";
import vybory from "./crawler/vybory";
import vybor from "./crawler/vybor";

console.log(chalk.red("Client"));

const runId = nowTimestamp();
const url = createURL(BASE_URL);

const limit = 100;
let counter = 0;
const dry = false;

vybory(url).then(async (vybory) => {
  for (let iVybor = 0; iVybor < vybory.length; iVybor++) {
    const { href } = vybory[iVybor];
    if (!limit || counter < limit) {
      const vyborData = await vybor(href);
      for (let iAction = 0; iAction < vyborData.actions.length; iAction++) {
        const { href: actionHref } = vyborData.actions[iAction];
        console.log(
          chalk.blue(
            `Výbor ${iVybor + 1}/${vybory.length}, Event ${iAction + 1}/${
              vyborData.actions.length
            }`
          ),
          chalk.gray(actionHref)
        );
        if (!limit || counter < limit) {
          counter++;
          const actionData = await action(actionHref);
          update(actionData, runId, counter, dry);
        }
      }
    }
  }
});

// action("https://www.psp.cz/sqw/hp.sqw?k=3612&z=14484").then(async (data) => {
//   console.log("----------- START ", data.hlidacId);
//   await update(data, nowTimestamp(), 0, false);
//   console.log("----------- DONE");
// });
