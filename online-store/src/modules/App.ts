import Cart from "./Cart";
import Catalog from "./Catalog";
import Product from "./Product";
import Router from "./Router";

class App {
  constructor(
    public catalogPage: Catalog = new Catalog(),
    public cartPage: Cart = new Cart(),
    public productPage: Product = new Product(),
    public cart: Array<any> = [],
    public totalCost = 0,
    public router: undefined | Router = undefined
  ) {}

  init() {
    this.setRouter();
  }

  setRouter() {
    this.router = new Router(this.catalogPage, this.cartPage, this.productPage);
    this.router.setRoutes();
  }
}

export default App;
