import catalog from "../pages/catalog";
import cart from "../pages/cart";
import product from "../pages/product";
import errorPage from "../pages/404";
import { getElementBySelector, Iroutes } from "./types/types";
import Catalog from "./Catalog";
import Cart from "./Cart";
import Product from "./Product";

class Router {
  constructor(
    public catalogPage: Catalog,
    public cartPage: Cart,
    public productPage: Product,
    private routes: Iroutes = {
      "/catalog": {
        title: "Online-store | Catalog",
        template: catalog,
      },
      "/cart": {
        title: "Online-store | Cart",
        template: cart,
      },
      "/product": {
        title: "Online-store | Product",
        template: product,
      },
      "/404": {
        title: "Online-store | Page not found",
        template: errorPage,
      },
    }
  ) {}

  addRoute(route: string) {
    getElementBySelector("#root").innerHTML = "";
    getElementBySelector("#root").insertAdjacentHTML(
      "afterbegin",
      this.routes[route as keyof typeof this.routes].template
    );
    getElementBySelector("#page-title").innerHTML =
      this.routes[route as keyof typeof this.routes].title;
    getElementBySelector("#main-title").innerHTML =
      this.routes[route as keyof typeof this.routes].title.split("|")[1];
  }

  setRoutes() {
    // Dont work correctly enough:
    // Cases catalog/something or cart/something  must do default but don't
    switch (window.location.pathname) {
      case "/":
        window.history.pushState(
          {},
          "/catalog",
          window.location.origin + "/catalog" + document.location.search
        );
        this.addRoute("/catalog");
        this.catalogPage.renderPage();
        break;
      case "/catalog":
        this.addRoute("/catalog");
        this.catalogPage.renderPage();
        break;
      case "/cart":
        this.addRoute("/cart");
        this.cartPage.renderPage();
        break;
      case "/product":
        this.addRoute("/product");
        this.productPage.renderPage();
        break;
      default:
        this.addRoute("/404");
    }
  }
}

export default Router;
