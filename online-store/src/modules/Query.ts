import { IParams } from "./types/types";

class Query {
  constructor(
    public params: IParams = {
      categories: "",
      publishers: "",
      name: "",
      order_by: "",
      ascending: "",
      id: "",
      min_price: "1",
      max_price: "300",
      min_players: "1",
      max_players: "50",
      min_playtime: "5",
      max_playtime: "180",
    }
  ) {}

  getQueryFromURL() {
    const params = new URLSearchParams(window.location.search);
    const paramsObj: IParams = Array.from(params.keys()).reduce(
      (acc, val) => ({ ...acc, [val]: params.get(val) }),
      {}
    );
    for (const key of Object.keys(this.params)) {
      if (Object.prototype.hasOwnProperty.call(paramsObj, key)) {
        this.params[key] = paramsObj[key];
      }
    }
  }

  goTowithQuery(searchParams: string) {
    window.history.pushState(
      {},
      "/catalog",
      window.location.origin +
        "/catalog" +
        `${searchParams ? "?" + searchParams : ""}`
    );
    this.getQueryFromURL();
  }

  addParam(field: string, value: string) {
    const searchParams = new URLSearchParams(document.location.search);
    const newValue = searchParams.get(field)
      ? searchParams.get(field) + `,${value}`
      : value;
    searchParams.delete(field);
    searchParams.append(field, newValue);

    this.goTowithQuery(String(searchParams));
  }

  setParam(field: string, value: string) {
    const searchParams = new URLSearchParams(document.location.search);
    searchParams.delete(field);
    searchParams.append(field, value);

    this.goTowithQuery(String(searchParams));
  }

  delParam(field: string, value: string) {
    const searchParams = new URLSearchParams(document.location.search);
    const valueArray = searchParams.get(field)?.split(",");
    searchParams.delete(field);

    const i = valueArray?.indexOf(value);
    if ((i as number) >= 0) {
      valueArray?.splice(i as number, 1);
    }

    if (valueArray?.length != 0) {
      searchParams.append(field, (valueArray as Array<string>).join());
    }

    this.goTowithQuery(String(searchParams));
  }
}
export default Query;
