import { getDate, removeDate } from "./utils";

test("Get date", () => {
  expect(
    getDate(
      "Podvýbor pro kontrolu hospodaření veřejného sektoru - 11. června 2020, viz ."
    )
  ).toBe("11. června 2020");
  expect(getDate("- 1. ledna 2020 -")).toBe("1. ledna 2020");
  expect(getDate("- 12. února 2020 -")).toBe("12. února 2020");
  expect(getDate("- 22. června 2020 -")).toBe("22. června 2020");
  expect(getDate("- 31. července 2020 -")).toBe("31. července 2020");
  expect(getDate("- 11. srpna 2020 -")).toBe("11. srpna 2020");
  expect(getDate("- 11. září 2020 -")).toBe("11. září 2020");
  expect(getDate("- 11. října 2020 -")).toBe("11. října 2020");
  expect(getDate("-11. listopadu 2020-")).toBe("11. listopadu 2020");
  expect(getDate("11. srpna 2020")).toBe("11. srpna 2020");
  expect(getDate("- 11. krtka 2020 -")).toBe(null);
});

test("Remove date", () => {
  expect(
    removeDate(
      "Podvýbor pro kontrolu hospodaření veřejného sektoru - 11. června 2020, viz ."
    )
  ).toBe("Podvýbor pro kontrolu hospodaření veřejného sektoru, viz .");
  expect(removeDate("- 1. ledna 2020")).toBe("");
  expect(removeDate(" - 12. února 2020")).toBe("");
  expect(removeDate("22. června 2020 -")).toBe(" -");
  expect(removeDate("31. července 2020")).toBe("-  -");
  expect(removeDate("11. srpna 2020")).toBe("-  -");
  expect(removeDate("x 11. září 2020 x")).toBe("x  x");
  expect(removeDate("11. října 2020")).toBe("");
  expect(removeDate("11. listopadu 2020")).toBe("");
  expect(removeDate("11. srpna 2020")).toBe("");
  expect(removeDate("11. krtka 2020")).toBe("11. krtka 2020");
});
