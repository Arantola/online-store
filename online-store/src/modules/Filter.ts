import { IGame, IGamesArray, IQueryParams } from "./types/types";
import gamesDataArray from "../data/gamesDataArray";

export default class Filter {
  constructor(
    public initialCollection: any = JSON.stringify(gamesDataArray),
    public collection: any = undefined
  ) {}

  public filterByQueryParams(queryParams: IQueryParams) {
    this.collection = JSON.parse(this.initialCollection);
    const query: any = queryParams;
    for (const key in query) {
      if (query[key][0] !== undefined && query[key] !== undefined) {
        switch (key) {
          case "categories":
            console.log("categories goes");
            this.filterByFieldWithID(key, query[key].join());
            break;
          case "publishers":
            this.filterByFieldWithID(key, query[key].join());
            break;
          case "name":
            this.filterByFieldValue(key, query[key].join());
            break;
          case "min_players":
          case "min_playtime":
            this.filterByRange(key, query[key].join(), true);
            break;
          case "max_players":
          case "max_playtime":
            this.filterByRange(key, query[key].join(), false);
            break;
          case "min_price":
            this.filterByRange("price", query[key].join(), true);
            break;
          case "max_price":
            this.filterByRange("price", query[key].join(), false);
            break;
          case "order_by":
            this.orderBy(query[key].join(), query.ascending.join());
        }
      }
    }
  }

  public filterForDisplay(key: string, value: string) {
    switch (key) {
      case "hBqZ3Ar4RJ":
        this.filterByFieldNoRecord(key, "hBqZ3Ar4RJ");
        break;
      case "KUBCKBkGxV":
        this.filterByFieldNoRecord(key, "KUBCKBkGxV");
        break;
      case "ODWOjWAJj3":
        this.filterByFieldNoRecord(key, "ODWOjWAJj3");
        break;
      // case "min_players":
      // case "min_playtime":
      //   this.filterByRange(key, query[key].join(), true);
      //   break;
      // case "max_players":
      // case "max_playtime":
      //   this.filterByRange(key, query[key].join(), false);
      //   break;
      // case "min_price":
      //   this.filterByRange("price", query[key].join(), true);
      //   break;
      // case "max_price":
      //   this.filterByRange("price", query[key].join(), false);
      //   break;
      // case "order_by":
      //   this.orderBy(query[key].join(), query.ascending.join());

      // "Abstract":"hBqZ3Ar4RJ",
      // "Adventure": "KUBCKBkGxV",
      // "Building": "ODWOjWAJj3",

      // "Card-game": "eX8uuNlQkQ",
      // "Cooperative": "ge8pIhEUGE",
      // "Deduction": "bCBXJy9qDw",

      // "Economic": "N0TkEGfEsF",
      // "Fantasy": "ZTneo8TaIO",
      // "Fighting": "upXZ8vNfNO",

      // "Humor": "TYnxiuiI3X",
      // "Sci-Fi": "3B3QpKvXD3",
      // "Wargame": "jX8asGGR6o",
    }
  }

  // min-max price, players, playtime
  private filterByRange(field: string, value: number, ascending: boolean) {
    if (this.collection) {
      this.collection = this.collection.filter((game: IGame) => {
        if (ascending) {
          return Number(game[field as keyof IGame]) >= value;
        } else {
          return Number(game[field as keyof IGame]) <= value;
        }
      });
    }
  }

  private filterByFieldNoRecord(field: string, value: string) {
    const tempCollection = this.collection;
    const tempLenght = tempCollection.filter((game: IGame) => {
      this.isContainsID(game[field as keyof IGame], value);
    }).length;
    console.log(tempLenght);
    return tempLenght;
  }

  // categories and publisher
  private filterByFieldWithID(field: string, value: string) {
    if (this.collection) {
      this.collection = this.collection.filter((game: IGame) => {
        return this.isContainsID(game[field as keyof IGame], value);
      });
    }
  }

  private isContainsID(array: any, value: string) {
    return array.find((i: any) => {
      return i === value;
    });
  }

  // name
  private filterByFieldValue(field: string, value: string) {
    if (this.collection) {
      this.collection = this.collection.filter((game: IGame) => {
        return String(game[field as keyof IGame])
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    }
  }

  // price, rank
  private orderBy(field: string, ascending: string) {
    if (this.collection) {
      return this.collection.sort((a: IGame, b: IGame) => {
        if (ascending == "true") {
          return Number(a[field as keyof IGame]) >
            Number(b[field as keyof IGame])
            ? 1
            : -1;
        } else {
          return Number(a[field as keyof IGame]) <
            Number(b[field as keyof IGame])
            ? 1
            : -1;
        }
      });
    }
  }
}
