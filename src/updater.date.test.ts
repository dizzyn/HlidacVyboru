import { isToFresh } from "./updater";

beforeAll(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date(2021, 2, 15));
});

test("Is too fresh", () => {
  expect(isToFresh({ date: "1. ledna 2020" } as any)).toBe(false);
  expect(isToFresh({ date: "16. března 2021" } as any)).toBe(true);
  expect(isToFresh({ date: "1. ledna 2072" } as any)).toBe(true);
});

afterAll(() => {
  jest.useRealTimers();
});
