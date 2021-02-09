import vybory from "./crawler/vybory";
import vybor from "./crawler/vybor";
import { BASE_URL, createURL } from "./utils";
import action from "./crawler/action";

require("dotenv").config();

const x: string = "";

console.log("Client", x);

const url = createURL(BASE_URL);

const limit = 1;
let counter = 0;

vybory(url).then(async (vybory) => {
  for (let iVybor = 0; iVybor < vybor.length; iVybor++) {
    const { href } = vybory[0];
    if (limit && counter < limit) {
      const vyborData = await vybor(href);
      for (let iAction = 0; iAction < vyborData.actions.length; iAction++) {
        if (limit && counter < limit) {
          counter++;
          const actionData = await action(href);
          console.log(actionData);
        }
      }
    }
  }
});
