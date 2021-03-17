import action from "./crawler/action";
import { BASE_URL, createURL, nowTimestam as nowTimestamp } from "./utils";
import { update } from "./updater";
import chalk from "chalk";
import vybory from "./crawler/vybory";
import vybor from "./crawler/vybor";

console.log(chalk.red("Client"));

const runId = nowTimestamp();
const url = createURL(BASE_URL);

const limit = 3;
let counter = 0;
const dry = true;

// vybory(url).then(async (vybory) => {
//   for (let iVybor = 0; iVybor < vybory.length; iVybor++) {
//     const { href } = vybory[iVybor];
//     if (!limit || counter < limit) {
//       const vyborData = await vybor(href);
//       for (let iAction = 0; iAction < vyborData.actions.length; iAction++) {
//         if (!limit || counter < limit) {
//           counter++;
//           const { href: actionHref } = vyborData.actions[iAction];
//           const actionData = await action(actionHref);
//           console.log(chalk.red("record"), actionHref);
//           update(actionData, runId, counter, idle);
//         }
//       }
//     }
//   }
// });

action("https://www.psp.cz/sqw/hp.sqw?k=3512&z=14533").then(async (data) => {
  console.log("----------- START ", data.hlidacId);
  await update(data, nowTimestamp(), 0, false);
  console.log("----------- DONE");
});
