import { IGame, IParams } from "./types/types";
import gamesDataArray from "../data/gamesDataArray";
import { getElementBySelector } from "./types/types";

export default class Filter {
  constructor(
    private initialCollection: string = JSON.stringify(gamesDataArray),
    public collection?: Array<IGame>
  ) {}

  public getSingle(id: string) {
    const tempCollection = JSON.parse(this.initialCollection);
    return tempCollection?.filter((game: IGame) => {
      return game.id == id;
    });
  }

  public getCart() {
    const tempCollection = JSON.parse(this.initialCollection);
    const curCart = JSON.parse(localStorage.getItem("cart") as string);
    return tempCollection.filter((game: IGame) => {
      return Object.keys(curCart).includes(game.id);
    });
  }

  public updateCartDisplay() {
    getElementBySelector(".cart__display").innerText = this.getCart().length;
  }

  public updateTotalCost() {
    const curCart = JSON.parse(localStorage.getItem("cart") as string);
    const cost = this.getCart().reduce(
        (acc: number, game: IGame) => acc + +game.price * +curCart[game.id],
        0
      )
      .toFixed(2);
    getElementBySelector(".total-cost__display").innerText = cost;
  }

  public filterByQueryParams(query: IParams) {
    let collection = JSON.parse(this.initialCollection);
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
    this.collection = collection;
    return this.filterByPage(collection, query.view, query.page);
  }

  private filterByPage(collection: Array<IGame>, mode: string ,page: string) {
    const count = mode === "list" ? 4 : 16;
    return collection.slice(+page, +page + +count);
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

  // categories, publisher
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

  public filterForPreview(field: string, value: string) {
    let expectCollection = JSON.parse(this.initialCollection);
    const currentCollection = this.collection || JSON.parse(this.initialCollection);
    // console.log("Текущая коллекция: ", currentCollection);
    expectCollection = this.filterByField(expectCollection, field, value);
    // console.log("Ожидаемая коллекция: ", expectCollection);
    this.mergeByProperty(currentCollection, expectCollection, "id");
    // currentCollection?.map((game: IGame) => JSON.stringify(game));
    // expectCollection.map((game: IGame) => JSON.stringify(game));
    // console.log(value)
    // console.log(currentCollection)
    // console.log(expectCollection)
    // return expectCollection.length - (currentCollection?.length as number)
    console.log(value);
    return expectCollection.length;
  }

  private mergeByProperty = (
    target: Array<IGame>,
    source: Array<IGame>,
    field: string
  ) => {
    source.forEach((sourceElement) => {
      const targetElement = target.find((targetElement) => {
        return (
          sourceElement[field as keyof typeof sourceElement] ===
          targetElement[field as keyof typeof targetElement]
        );
      });
      targetElement
        ? Object.assign(targetElement, sourceElement)
        : target.push(sourceElement);
    });
  };

  // input
  private filterByInput(collection: Array<IGame>, value: string) {
    const rgx = new RegExp(value, "i");
    return collection.filter((item) => {
      return rgx.test(JSON.stringify(Object.values(item)));
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
