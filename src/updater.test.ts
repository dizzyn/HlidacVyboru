import { TActionDetail } from "./crawler/action";
import { THlidacData } from "./dao";
import { createHlidacData, createHlidacDate } from "./updater";

const data: TActionDetail = {
  date: "1. srpna 1981",
  committee: "Hospodářský výbor",
  hlidacJson: null,
  title: "",
  number: 12,
  records: [],
  documents: [],
  hlidacOnlyDocuments: [],
  hlidacOnlyRecords: [],
  sourceUrl: "",
  hlidacId: "3200-78-20201209",
};

test("Convert to hlidac data", () => {
  expect(createHlidacData(data)).toMatchSnapshot();
});

test("Convert to hlidac data", () => {
  expect(createHlidacDate("1. ledna 2020")).toBe("2020-01-01-T00:00:00");
  expect(createHlidacDate("13. srpna 1981")).toBe("1981-08-13-T00:00:00");
});
