import { IParams } from "./types/types";

class Query {
  constructor(
    public params: IParams = {
      categories: "",
      publishers: "",
      input: "",
      order_by: "",
      ascending: "",
      id: "",
      view: "card",
      min_price: "5",
      max_price: "250",
      min_players: "1",
      max_players: "8",
      min_playtime: "5",
      max_playtime: "150",
      items: "5",
      page: "1",
      pages: "10",
    }
  ) {}

  setDefault() {
    this.setParam("min_price", "5");
    this.setParam("max_price", "250");
    this.setParam("min_players", "1");
    this.setParam("max_players", "8");
    this.setParam("min_playtime", "5");
    this.setParam("max_playtime", "150");
  }

  getQueryFromURL() {
    const params = new URLSearchParams(window.location.search);
    const paramsObj: IParams = Array.from(params.keys()).reduce(
      (acc, val) => ({ ...acc, [val]: params.get(val) }),
      {}
    );
    for (const key of Object.keys(this.params)) {
      if (Object.prototype.hasOwnProperty.call(paramsObj, key)) {
        this.params[key] = paramsObj[key];
      } else {
        if (
          "categories, publishers, input, order_by, ascending, id".includes(key)
        )
          this.params[key] = "";
      }
    }
  }

  goTowithQuery(searchParams: URLSearchParams | string) {
    console.log("aha!")
    window.history.pushState(
      {},
      "",
      window.location.origin +
        window.location.pathname +
        `${String(searchParams)
            ? "?" + String(searchParams).replace(/%2C/g, ",")
            : ""
        }`
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

    this.goTowithQuery(searchParams);
  }

  setParam(field: string, value: string) {
    const searchParams = new URLSearchParams(document.location.search);
    searchParams.delete(field);
    searchParams.append(field, value);

    this.goTowithQuery(searchParams);
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

    this.goTowithQuery(searchParams);
  }
}

export default Query;
