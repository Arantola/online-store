import { IGame, IParams } from "./types/types";
import gamesDataArray from "../data/gamesDataArray";

export default class Filter {
  constructor(
    private initialCollection: string = JSON.stringify(gamesDataArray),
    public collection?: Array<IGame>
  ) {}

  public getSingle(id: string) {
    const tempCollection =
      this.collection || JSON.parse(this.initialCollection);
    return tempCollection?.filter((game: IGame) => {
      return game.id == id;
    });
  }

  public filterByQueryParams(query: IParams) {
    let collection = JSON.parse(this.initialCollection);
    for (const key in query) {
      if (query[key][0] !== undefined && query[key] !== undefined) {
        switch (key) {
          case "categories":
          case "publishers":
          case "name":
            collection = this.filterByField(collection, key, query[key]);
            break;
          case "min_players":
          case "min_playtime":
            collection = this.filterByRange(collection, key, query[key], true);
            break;
          case "max_players":
          case "max_playtime":
            collection = this.filterByRange(collection, key, query[key], false);
            break;
          case "min_price":
            collection = this.filterByRange(collection, "price", query[key], true);
            break;
          case "max_price":
            collection = this.filterByRange(collection, "price", query[key], false);
            break;
          case "order_by":
            collection = this.orderBy(collection, query[key], query.ascending);
        }
      }
    }
    this.collection = collection;
    return collection;
  }

  // min-max price, players, playtime
  private filterByRange(
    collection: Array<IGame>,
    field: string,
    value: string,
    ascending: boolean
  ) {
    return collection.filter((game: IGame) => {
      if (ascending) {
        return Number(game[field as keyof IGame]) >= Number(value);
      } else {
        return Number(game[field as keyof IGame]) <= Number(value);
      }
    });
  }

  // categories, publisher, name
  private filterByField(
    collection: Array<IGame>,
    field: string,
    value: string
  ) {
    return collection.filter((game: IGame) => {
      return String(game[field as keyof IGame])
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  }

  // price, rank
  private orderBy(collection: Array<IGame>, field: string, ascending: string) {
    return collection.sort((a: IGame, b: IGame) => {
      const keyA = +a[field as keyof IGame];
      const keyB = +b[field as keyof IGame];
      return ascending == "true" ? keyA - keyB : keyB - keyA;
    });
  }

}
