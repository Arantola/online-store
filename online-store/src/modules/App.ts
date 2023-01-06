import Cart from "./Cart";
import Catalog from "./Catalog";
import Filter from "./Filter";
import Product from "./Product";
import Query from "./Query";
import Router from "./Router";
import { IGame } from "./types/types";

class App {
  constructor(
    public cart: Array<IGame> = [],
    public totalCost = 0,
    public router?: Router,
    public filter?: Filter,
    public queryParams?: Query,
    public catalogPage?: Catalog,
    public productPage?: Product,
    public cartPage?: Cart
  ) {}

  init() {
    this.filter = new Filter();
    this.queryParams = new Query();
    this.catalogPage = new Catalog(this.filter, this.queryParams);
    this.productPage = new Product(this.filter, this.queryParams);
    this.cartPage = new Cart(this.filter);
    this.setRouter();
  }

  setRouter() {
    this.router = new Router(
      <Catalog>this.catalogPage,
      <Cart>this.cartPage,
      <Product>this.productPage
    );
    this.router.setRoutes();
  }
}

export default App;
