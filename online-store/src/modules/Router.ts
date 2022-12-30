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
        title: "Catalog | Online-store",
        template: catalog,
      },
      "/cart": {
        title: "Cart | Online-store",
        template: cart,
      },
      "/product": {
        title: "Product | Online-store",
        template: product,
      },
      "/404": {
        title: "404 | Online-store",
        template: errorPage,
      },
    }
  ) {}

  addRoute(route: string) {
    window.history.pushState({}, route, window.location.origin + route + document.location.search);
    getElementBySelector("#root").innerHTML = "";
    getElementBySelector("#root").insertAdjacentHTML(
      "afterbegin",
      this.routes[route as keyof typeof this.routes].template
    );
    getElementBySelector("#page-title").innerHTML =
      this.routes[route as keyof typeof this.routes].title;
  }

  setRoutes() {
    // Dont work correctly enough:
    // Cases catalog/something or cart/something  must do default but don't
    // Work with search query params after 404
    switch (window.location.pathname) {
      case "/":
      case "/catalog":
        this.addRoute("/catalog");
        // Здесь нужно передать query параметры в filter
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
