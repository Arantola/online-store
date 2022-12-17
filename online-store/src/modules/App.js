import Cart from"./Cart";
import Catalog from "./Catalog";
import Item from "./Item";
import Error from "./Error";

class App {
  constructor() {
    this.catalogPage = new Catalog();
    this.cartPage    = new Cart();
    this.itemPage    = new Item();
    this.errorPage   = new Error();
    this.cart        = [];
    this.totalCost = 0;
  }

  renderHeaderFooter() {
    this.totalCost;
  }

  checkURL(pageURL) {
    // Получить pathname
    switch(pageURL.pathname) {
      case '/catalog':
        this.catalogPage.renderPage();
        break;
      case '/cart':
        this.catalogPage.renderPage();
        break;
      case '/item':
        this.itemPage.renderPage();
        break;
      default:
        this.errorPage.renderPage();
    }
  }
}

export default App;