// import Loader from "./Loader";
// import Renderer from "./Renderer";

import Cart from "./Cart";
import Catalog from "./Catalog";
import Item from "./Item";
import Error from "./Error";

class App {
  constructor(
    // public loader: Loader = new Loader(),
    // public renderer: Renderer = new Renderer(),

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

  // async renderCatalog(pageURL: URL) {
  //   console.log(pageURL);
  //   await this.loader.passDataToRender(pageURL, this.renderer.drawCards);
  // }

  checkURL(pageURL: URL) {
    // Получить pathname
    switch (pageURL.pathname) {
      case "/catalog":
        alert(`Ты в каталоге`);
        // this.loader.passDataToRender('url', this.renderer.drawCards());
        break;
      case "/cart":
        alert(`Ты в каталоге`);
        // this.cartPage.renderPage();
        break;
      case "/item":
        alert(`Ты в товаре`);
        // this.itemPage.renderPage();
        break;
      default:
        // this.errorPage.renderPage();
    }
  }

}

export default App;
