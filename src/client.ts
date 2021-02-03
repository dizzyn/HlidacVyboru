import { Api } from "./dao/hlidacAPI";

require("dotenv").config();

console.log("Client");

// 3900-35-20201208

const api = new Api({
  baseApiParams: {
    headers: { Authorization: `Token ${process.env.HLIDAC_API_TOKEN}` },
  },
});
api.api
  .apiV2DatasetyGetAll()
  .then(async (res) => console.log(res.data))
  .catch(console.error);
