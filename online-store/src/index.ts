import { getElementBySelector } from "./modules/types/types";

import "./assets/styles/_reset.css";
import "./assets/styles/_catalog.css";
import "./assets/styles/_cart.css";
import "./assets/styles/_description.css";
import "./assets/styles/_all.css";
import "./assets/styles/_card.css";
import "./assets/styles/_modal.css";
import App from "./modules/App";
import catalog from "./pages/catalog";
import cart from "./pages/cart";
import product from "./pages/product";
import errorPage from "./pages/404";

const app = new App();

const routes = {
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
};

const rootDiv: any = getElementBySelector("#root");
const pageTitle: any = getElementBySelector("#page-title");

(function () {
  window.history.pushState({}, "", window.location.origin + "/catalog");
  rootDiv.innerHTML = "";
  rootDiv.insertAdjacentHTML("afterbegin", routes["/catalog"].template);
  pageTitle.innerHTML = routes["/catalog"].title;
  app.catalogPage.renderPage();

  // Хороший вариант отрисовывать 404 на непонятный запрос или страницу на правильный, но не работает хз
  // rootDiv.innerHTML = "";
  // rootDiv.insertAdjacentHTML(
  //   "afterbegin",
  //   routes[window.location.pathname as keyof typeof routes].template || routes["/404"].template
  // );
  // pageTitle.innerHTML =
  //   routes[window.location.pathname as keyof typeof routes].title || routes["/404"].title;
  // if (window.location.pathname == "/catalog") {
  //   app.catalogPage.renderPage();
  // }
})();

// const onNavigate = (pathname: string) => {
//   window.history.pushState({}, pathname, window.location.origin + pathname);
//   rootDiv.innerHTML = routes[pathname as keyof typeof routes];
// };

// function addListenerWithRouting(selector: string) {
//   const elem = document.getElementById(selector) as HTMLElement;
//   elem.addEventListener("click", (e) => {
//     e.preventDefault();
//     window.history.pushState({}, "", window.location.origin + selector);
//     rootDiv.innerHTML = "";
//     rootDiv.insertAdjacentHTML(
//       "afterbegin",
//       routes[selector.slice(1) as keyof typeof routes].template);
//     pageTitle.innerHTML =
//       routes[selector.slice(1) as keyof typeof routes].title;
//   });
// }
// for (const selector of ["#/404", "#/cart", "#/product", "#/"]) {
//   addListenerWithRouting(selector);
// }

// for (const route in routes) {
//   getElementBySelector(route["selector"]).addEventListener("click", (e) => {
//     e.preventDefault();
//     window.history.pushState({}, "", window.location.origin + "/404");
//     rootDiv.innerHTML = "";
//     rootDiv.insertAdjacentHTML("afterbegin", routes["/404"].template);
//     pageTitle.innerHTML = routes["/404"].title;
//   });
// }

getElementBySelector("#error").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState({}, "/404", window.location.origin + "/404");
  rootDiv.innerHTML = "";
  rootDiv.insertAdjacentHTML("afterbegin", routes["/404"].template);
  pageTitle.innerHTML = routes["/404"].title;
});

getElementBySelector("#cart").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState({}, "/cart", window.location.origin + "/cart");
  rootDiv.innerHTML = "";
  rootDiv.insertAdjacentHTML("afterbegin", routes["/cart"].template);
  pageTitle.innerHTML = routes["/cart"].title;
  app.cartPage.renderPage();
});

getElementBySelector("#product").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState({}, "/product", window.location.origin + "/product");
  rootDiv.innerHTML = "";
  rootDiv.insertAdjacentHTML("afterbegin", routes["/product"].template);
  pageTitle.innerHTML = routes["/product"].title;
});

getElementBySelector("#catalog").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState({}, "", window.location.origin + "/catalog");
  rootDiv.innerHTML = "";
  rootDiv.insertAdjacentHTML("afterbegin", routes["/catalog"].template);
  pageTitle.innerHTML = routes["/catalog"].title;
  app.catalogPage.renderPage();
});

// window.onpopstate = (event) => {
//   console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));

//   console.log(routes[window.location.pathname as keyof typeof routes]);
//   if (!routes[window.location.pathname as keyof typeof routes]) {
//     window.history.pushState({}, "/404", window.location.origin + "/404");
//   } else {
//     window.history.pushState(
//       {},
//       window.location.pathname,
//       window.location.origin + window.location.pathname
//     );
//   }
//   window.history.go();
//   rootDiv.innerHTML = "";
//   rootDiv.insertAdjacentHTML(
//     "afterbegin",
//     routes[window.location.pathname as keyof typeof routes] || routes["/404"]
//   );
//   pageTitle.innerHTML = routes["/"].title;
// };

// Способ импорта HTML
// var doc= document.querySelector('link[rel="import"]').import;
