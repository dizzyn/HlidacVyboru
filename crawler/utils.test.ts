import {
  createHlidacId,
  getDate,
  getNumber,
  removeDate,
  removeNumber,
} from "./utils";

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
  expect(removeDate("31. července 2020")).toBe("");
  expect(removeDate("11. srpna 2020")).toBe("");
  expect(removeDate("x 11. září 2020 x")).toBe("x  x");
  expect(removeDate("11. října 2020")).toBe("");
  expect(removeDate("11. listopadu 2020")).toBe("");
  expect(removeDate("11. srpna 2020")).toBe("");
  expect(removeDate("11. krtka 2020")).toBe("11. krtka 2020");
});

test("Get number", () => {
  expect(getNumber("36. schůze KV - 10. prosince 2020")).toBe("36");
});

test("Remove number", () => {
  expect(removeNumber("36. schůze KV - 10. prosince 2020")).toBe(
    "schůze KV - 10. prosince 2020"
  );
});

test("Hlidac ID", () => {
  expect(createHlidacId("10. prosince 2020", "36", "Hospodářský výbor")).toBe(
    "3500-36-20201210"
  );
  expect(createHlidacId("1. ledna 2020", "12", "Petiční výbor")).toBe(
    "3900-12-20200101"
  );
  expect(createHlidacId("10. února 2020", "1", "Hospodářský výbor")).toBe(
    "3500-1-20200210"
  );
  expect(createHlidacId("10. března 1200", "1", "Organizační výbor")).toBe(
    "3800-1-12000310"
  );
});
