import { IGame, IParams } from "./types/types";
import gamesDataArray from "../data/gamesDataArray";
import { getElementBySelector } from "./types/types";

export default class Filter {
  constructor(
    private collection: string = JSON.stringify(gamesDataArray),
    private curentCollection?: Array<IGame>
  ) {}

  public getSingle(id: string) {
    return JSON.parse(this.collection).filter((game: IGame) => {
      return game.id == id;
    });
  }

  public getCart() {
    const tempCollection = JSON.parse(this.collection);
    const curCart = JSON.parse(localStorage.getItem("cart") as string);
    return tempCollection.filter((game: IGame) => {
      return Object.keys(curCart).includes(game.id);
    });
  }

  public updateCartDisplay() {
    const curCart = JSON.parse(localStorage.getItem("cart") as string);
    if (Object.keys(curCart).length > 0) {
      let sum = 0;
      for (const key in curCart) {
        sum += curCart[key];
      }
      getElementBySelector(".cart__display").innerText = `${sum}`;
    } else {
      getElementBySelector(".cart__display").innerText = `${0}`;
    }
  }

  public updateTotalCost() {
    const curCart = JSON.parse(localStorage.getItem("cart") as string);
    const cost = this.getCart()
      .reduce(
        (acc: number, game: IGame) => acc + +game.price * +curCart[game.id],
        0
      )
      .toFixed(2);
    getElementBySelector(".total-cost__display").innerText = cost;
  }

  public cartTotalCost() {
    const curCart = JSON.parse(localStorage.getItem("cart") as string);
    const cost = this.getCart()
      .reduce(
        (acc: number, game: IGame) => acc + +game.price * +curCart[game.id],
        0
      )
      .toFixed(2);
    getElementBySelector(".total-cost__cart").innerText = cost;
    return cost;
  }

  public filterByQueryParams(
    inputQuery: IParams,
    field?: string,
    value?: string
  ) {
    const query = JSON.parse(JSON.stringify(inputQuery));
    if (field && value) {
      const oldValue = query[field];
      query[field] = oldValue + "," + value;
    }
    let collection = JSON.parse(this.collection);
    for (const key in query) {
      if (query[key][0] !== undefined && query[key] !== undefined) {
        switch (key) {
          case "input":
            collection = this.filterByInput(collection, query[key]);
            break;
          case "categories":
          case "publishers":
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
    let result;
    if (field && value) {
      result = collection.length;
    } else {
      this.curentCollection = collection;
      result = collection;
    }

    return result;
  }

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

  public filterByField(collection: Array<IGame>, field: string, value: string) {
    return collection.filter((game: IGame) => {
      let flag = false;
      for (const cat of (game[field as keyof IGame] as string).split(",")) {
        if (value.includes(cat.trim())) {
          flag = true;
        }
      }
      return flag;
    });
  }

  private filterByInput(collection: Array<IGame>, value: string) {
    const rgx = new RegExp(value, "i");
    return collection.filter((item) => {
      return rgx.test(JSON.stringify(Object.values(item)));
    });
  }

  private orderBy(collection: Array<IGame>, field: string, ascending: string) {
    return collection.sort((a: IGame, b: IGame) => {
      const keyA = +a[field as keyof IGame];
      const keyB = +b[field as keyof IGame];
      return ascending == "true" ? keyA - keyB : keyB - keyA;
    });
  }
}
