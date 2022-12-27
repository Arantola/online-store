import { IGame, IGamesArray, IQueryParams } from "./types/types";

export default class Filter {
  constructor(
    public initialCollection: any = undefined,
    public collection: IGamesArray | undefined = undefined
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

  // min-max price, players, playtime
  private filterByRange(field: string, value: number, ascending: boolean) {
    if (this.collection) {
      this.collection.games = this.collection.games.filter((game: IGame) => {
        if (ascending) {
          return Number(game[field as keyof IGame]) >= value;
        } else {
          return Number(game[field as keyof IGame]) <= value;
        }
      });
    }
  }

  // categories and publisher
  private filterByFieldWithID(field: string, value: string) {
    if (this.collection) {
      this.collection.games = this.collection.games.filter((game: IGame) => {
        return this.isContainsID(game[field as keyof IGame], value);
      });
    }
  }

  private isContainsID(array: any, value: string) {
    return array.find((i: any) => {
      if (i.id === value) return true;
      return false;
    });
  }

  // name
  private filterByFieldValue(field: string, value: string) {
    if (this.collection) {
      this.collection.games = this.collection.games.filter((game: IGame) => {
        return String(game[field as keyof IGame])
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    }
  }

  // price, rank
  private orderBy(field: string, ascending: string) {
    if (this.collection) {
      return this.collection.games.sort((a: IGame, b: IGame) => {
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
