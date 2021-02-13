require("dotenv").config();
import vybory from "./crawler/vybory";
import vybor from "./crawler/vybor";
import { BASE_URL, createURL } from "./utils";
import action from "./crawler/action";
import { update } from "./updater";
import chalk from "chalk";

console.log(chalk.red("Client"));

const url = createURL(BASE_URL);

const limit = 0;
let counter = 0;

vybory(url).then(async (vybory) => {
  for (let iVybor = 0; iVybor < vybory.length; iVybor++) {
    const { href } = vybory[iVybor];
    if (!limit || counter < limit) {
      const vyborData = await vybor(href);
      for (let iAction = 0; iAction < vyborData.actions.length; iAction++) {
        if (!limit || counter < limit) {
          counter++;
          const { href: actionHref } = vyborData.actions[iAction];
          const actionData = await action(actionHref);
          update(actionData);
        }
      }
    }
  }
});
