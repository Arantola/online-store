import Cart from "./Cart";
import Catalog from "./Catalog";
import Filter from "./Filter";
import Product from "./Product";
import QueryParams from "./QueryParams";
import Router from "./Router";
import { IGame } from "./types/types";

class App {
  constructor(
    public filter: Filter | undefined = undefined,
    public queryParams: QueryParams | undefined = undefined,
    public catalogPage: Catalog | undefined = undefined,
    public productPage: Product | undefined = undefined,
    public cartPage: Cart | undefined = undefined,
    public cart: Array<IGame> = [],
    public product: IGame | undefined = undefined,
    public totalCost = 0,
    public router: Router | undefined = undefined
  ) {}

  init() {
    this.filter = new Filter();
    this.queryParams = new QueryParams();
    this.catalogPage = new Catalog(this.filter, this.queryParams);
    this.productPage = new Product(this.filter, this.queryParams);
    this.cartPage = new Cart();
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
