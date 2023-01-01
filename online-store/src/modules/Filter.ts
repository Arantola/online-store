import { IGame, IParams } from "./types/types";
import gamesDataArray from "../data/gamesDataArray";

export default class Filter {
  constructor(
    public initialCollection: string = JSON.stringify(gamesDataArray),
    public collection?: Array<IGame>
  ) {}

  public getSingle(id: string) {
    return (
      this.collection?.filter((game: IGame) => {
        return game.id == id;
      }) || "error"
    );
  }

  public filterByQueryParams(query: IParams) {
    this.resetColection();
    for (const key in query) {
      if (query[key][0] !== undefined && query[key] !== undefined) {
        switch (key) {
          case "categories":
          case "publishers":
          case "name":
            this.filterByField(key, query[key]);
            // console.log("filtered by CPN")
            break;
          case "min_players":
          case "min_playtime":
            this.filterByRange(key, query[key], true);
            // console.log("filtered by minPlayerTime")
            break;
          case "max_players":
          case "max_playtime":
            this.filterByRange(key, query[key], false);
            // console.log("filtered by maxPlayerTime")
            break;
          case "min_price":
            this.filterByRange("price", query[key], true);
            // console.log("filtered by minPrice")
            break;
          case "max_price":
            this.filterByRange("price", query[key], false);
            // console.log("filtered by maxPrice")
            break;
          case "order_by":
            // console.log("Ordered")
            this.orderBy(query[key], query.ascending);
        }
      }
    }
  }

  public resetColection() {
    this.collection = JSON.parse(this.initialCollection);
  }

  // min-max price, players, playtime
  private filterByRange(field: string, value: string, ascending: boolean) {
    if (this.collection) {
      this.collection = this.collection.filter((game: IGame) => {
        if (ascending) {
          return Number(game[field as keyof IGame]) >= Number(value);
        } else {
          return Number(game[field as keyof IGame]) <= Number(value);
        }
      });
    }
  }

  // categories, publisher, name
  private filterByField(field: string, value: string) {
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
