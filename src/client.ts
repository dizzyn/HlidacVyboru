import vybory from "./crawler/vybory";
import vybor from "./crawler/vybor";
import action from "./crawler/action";
import { BASE_URL, createURL, nowTimestam } from "./utils";
import { createHlidacData, update } from "./updater";
import chalk from "chalk";

console.log(chalk.red("Client"));
const runId = nowTimestam();
const url = createURL(BASE_URL);

// const limit = 0;
// let counter = 0;

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
//           update(actionData, runId, counter);
//         }
//       }
//     }
//   }
// });

action("https://www.psp.cz/sqw/hp.sqw?k=3512&z=14486").then(async (data) => {
  console.log("----------- START ", data.hlidacId);
  await update(data, nowTimestam(), 0);
  console.log("----------- DONE");
});
