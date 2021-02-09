import { Api } from "./dao/hlidacAPI";

require("dotenv").config();

console.log("Client");

// 3900-35-20201208

// const testItem = {
//   Id: "9900-99-19201208",
//   datum: "1920-12-08T00:00:00",
//   cisloJednani: 99,
//   vec: null,
//   vybor: "Test record",
//   vyborId: 9900,
//   vyborUrl: "https://www.psp.cz/sqw/hp.sqw?k=3902",
//   zapisJednani: null,
//   dokumenty: [],
//   audio: [],
// };

// const api = new Api({
//   baseApiParams: {
//     headers: { Authorization: `Token ${process.env.HLIDAC_API_TOKEN}` },
//   },
// });

// api.api
//   .apiV2DatasetyDatasetItemBulkInsert("vybory-psp", testItem)
//   .then(async (res) => console.log(res.data))
//   .catch(console.error);
