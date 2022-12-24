import { IGame, IGamesArray, IQueryParams } from "./types/types";

export default class Filter {
  constructor(
    public initialCollection: IGamesArray,
    public collection: any = [],

    // enum type? It is possible not to store parameters here at all, just in Catalog.ts
    public queryParams: IQueryParams = {
      categories: undefined,
      publisher: undefined,
      name: undefined,
      min_price: undefined,
      max_price: undefined,
      min_players: undefined,
      max_players: undefined,
      min_playtime: undefined,
      max_playtime: undefined,
      order_by: undefined,
      ascending: undefined,
      client_id: "XZAmoxZ2qA",
    }
  ) {}

  // If pass parameters directly, this function useless
  public setQueryParams(query: IQueryParams) {
    this.queryParams = query;
  }

  public getCurrentCollection() {
    return this.collection;
  }

  // Possible pass parameters directly to this function in Catalog
  public filterByQueryParams() {
    const query: any = this.queryParams;
    for (const key in query) {
      if (query[key]) {
        switch (key) {
          case undefined:
          case "client_id":
            console.log("skip");
            break;
          case "categories":
            this.filterByFieldWithID(key, query[key].join());
            break;
          case "primary_publisher":
            this.filterByFieldWithID(key, query[key]);
            break;
          case "name":
            this.filterByFieldValue(key, query[key]);
            break;
          case "min_players":
          case "min_playtime":
            this.filterByRange(key, query[key], true);
            break;
          case "max_players":
          case "max_playtime":
            this.filterByRange(key, query[key], false);
            break;
          case "min_price":
            this.filterByRange("price", query[key], true);
            break;
          case "max_price":
            this.filterByRange("price", query[key], false);
            break;
          case "order_by":
            this.orderBy(query[key], query.ascending);
        }
      }
    }
  }

  // min-max price, players, playtime
  private filterByRange(field: string, value: number, ascending: boolean) {
    this.collection.games = this.collection.games.filter((game: IGame) => {
      if (ascending) {
        return Number(game[field as keyof IGame]) >= value;
      } else {
        return Number(game[field as keyof IGame]) <= value;
      }
    });
  }

  // categories and publisher
  private filterByFieldWithID(field: string, value: string) {
    this.collection.games = this.collection.games.filter((game: IGame) => {
      return this.isContainsID(game[field as keyof IGame], value);
    });
  }

  private isContainsID(array: any, value: string) {
    return array.find((i: any) => {
      if (i.id === value) return true;
      return false;
    });
  }

  // name
  private filterByFieldValue(field: string, value: string) {
    this.collection.games = this.collection.games.filter((game: IGame) => {
      return game[field as keyof IGame] == value;
    });
  }

  // price, rank
  private orderBy(field: string, ascending: boolean) {
    return this.collection.games.sort((a: IGame, b: IGame) => {
      return Number(a[field as keyof IGame]) > Number(b[field as keyof IGame])
        ? ascending
          ? 1
          : -1
        : ascending
        ? -1
        : 1;
    });
  }
}
