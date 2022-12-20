import Cart from "./Cart";
import Catalog from "./Catalog";
import Item from "./Item";
import Error from "./Error";

class App {
  constructor(
    public catalogPage: Catalog = new Catalog(),
    public cartPage: Cart = new Cart(),
    public itemPage: Item = new Item(),
    public errorPage: Error = new Error(),
    public cart: Array<any> = [],
    public totalCost = 0
  ) {}

  renderHeaderFooter() {
    this.totalCost;
  }

  checkURL(pageURL: URL) {
    // Получить pathname
    switch (pageURL.pathname) {
      case "/catalog":
        this.catalogPage.renderPage();
        break;
      case "/cart":
        this.cartPage.renderPage();
        break;
      case "/item":
        this.itemPage.renderPage();
        break;
      default:
        this.errorPage.renderPage();
    }
  }
}

export default App;
