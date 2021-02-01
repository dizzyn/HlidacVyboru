import { Api } from "./hlidacAPI";

console.log("Client");

// 3900-35-20201208

const api = new Api();
api.api
  .apiV2DatasetyGetAll({
    headers: { Authorization: `Token ${process.env.HLIDAC_API_TOKEN}` },
  })
  .then((res) => console.log(res))
  .catch(console.error);
