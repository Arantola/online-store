import { expect, jest, test } from "@jest/globals";
import Filter from "../modules/Filter";
const filter = new Filter();

const {
  CalculateDisc,
  checkString,
  TakeNumber,
  checkRegex,
  RegNotNull,
  CheckEmail
} = require("../modules/Cart.ts");

const testObj = [
  {
    id: "i5Oqu5VZgP",
    name: "Azul",
    price: "26.99",
    discount: "0.33",

    rank: 3.854164176531431,
    min_players: 2,
    max_players: 4,
    min_playtime: 30,
    max_playtime: 60,
    categories: "abstract",
    designer: "Michael Kiesling",
    art: "Chris Quilliams",
    publishers: "IELLO",
    average_learning_complexity: 2.083333333333333,
    store: "16",
    images: {
      logo: "https://x.boardgamearena.net/data/gamemedia/azul/title/en_2000.png?h=1651660181",
      box: "https://x.boardgamearena.net/data/gamemedia/azul/box/en_280.png?h=1651658184",
      background:
        "https://x.boardgamearena.net/data/gamemedia/azul/banner/default.jpg?h=1651658186",
      photo1:
        "https://x.boardgamearena.net/data/gamemedia/azul/display/1.jpg?h=1651658186",
      photo2:
        "https://x.boardgamearena.net/data/gamemedia/azul/display/0.jpg?h=1651658186",
    },
    description:
      'Azul was designed by the world famous, award-winning game author Michael Riesling. Azul captures the beautiful aesthetics of Moorish art in a contemporary board game. \r\n Players compete as artisans decorating the walls of the royal Palace of Dvora. By carefully drafting the correct Quantity and style of tiles, the most clever of artisans plan ahead to maximize the beauty of their work (not to mention their scores!) while ensuring they wasted no supplies in the process. \r\n Introduced by the moors, "azulejos" (originally white and blue ceramic tiles) were fully embraced by the Portuguese, when their King Manuel I, on a visit to the Alhambra Palace in Southern Spain, was mesmerized by the stunning beauty of the Moorish decorative tiles. The King, awestruck by the interior beauty of the Alhambra, immediately ordered that his own Palace in Portugal be decorated with similar wall tiles. \r\n As a tile-laying artist, you have been challenged to embellish the walls of the royal Palace of Dvora. ',
  },
];

const newTestObj = [{
    id: "i5Oqu5VZgP",
    name: "Azul",
    price: "26.99",
    discount: "0.33",

    rank: 3.854164176531431,
    average_learning_complexity: 2.083333333333333,

    min_players: 1,
    max_players: 2,
    max_playtime: 5,
    min_playtime: 10,

    art: "Chris Quilliams",
    designer: "Michael Kiesling",
    categories: "abstract",
    publisher: {
      id: "i5Oqu5VZgP",
      name: "Azul",
    },

    store: "16",
    description: "Azul was designed",

    images: {
      logo: "https://x.boardgamearena.net/data/gamemedia/azul/title/en_2000.png?h=1651660181",
      box: "https://x.boardgamearena.net/data/gamemedia/azul/box/en_280.png?h=1651658184",
      background:
        "https://x.boardgamearena.net/data/gamemedia/azul/banner/default.jpg?h=1651658186",
      photo1:
        "https://x.boardgamearena.net/data/gamemedia/azul/display/1.jpg?h=1651658186",
      photo2:
        "https://x.boardgamearena.net/data/gamemedia/azul/display/0.jpg?h=1651658186",
    },
  },
];

test("test object", () => {
  expect(filter.getSingle("i5Oqu5VZgP")).toMatchObject(testObj);
});
test("find my discount", () => {
  expect(CalculateDisc(24.99, 10)).toBe(22.49);
});
test("added string to address", () => {
  expect(checkString(["asdasdasd", "asdasd", "asda"])).not.toBeTruthy();
});
test("check length string", () => {
  expect(TakeNumber("12331233123")).toHaveLength(3);
});
test("check regexp card number", () => {
  expect(
    checkRegex("^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}")
  ).toBeInstanceOf(RegExp);
});
test("regexp card number not null", () => {
  expect(
    RegNotNull(
      /^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}/,
      "1323 2312 3123 1231"
    )
  ).toBeNull();
});
test("mergeByProperty is undefined", () => {
  expect(filter.mergeByProperty(newTestObj, newTestObj, "a")).toBeUndefined();
});
test("input filter", () => {
  expect(filter.filterByInput(newTestObj, "Azul")).toEqual(newTestObj);
});
test("regexp email addres", () => {
  expect(CheckEmail("asdasdasd@mail.ru")).toMatch(/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/);
});
test("Defined orderBy", () => {
  expect(filter.orderBy(newTestObj, "40", "130")).toBeDefined();
});
