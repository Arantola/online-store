import { getElementBySelector } from "./modules/types/types";

import "./assets/styles/_catalog.css";
import "./assets/styles/_cart.css";
import "./assets/styles/_description.css";
import "./assets/styles/_all.css";

import App from "./modules/App";

const app = new App();
app.catalogPage.renderPage();

// app.catalogPage.getData(new URL("https://api.boardgameatlas.com/api/game/categories?client_id=XZAmoxZ2qA"));

// setTimeout(() => app.renderCatalog(new URL("https://api.boardgameatlas.com/api/search?name=Catan&client_id=XZAmoxZ2qA")), 3000)

window.addEventListener("popstate", e => {
  alert(`location: ${document.location}, state: ${JSON.stringify(e.state)}`)
  app.checkURL(new URL(String(document.location)));
});

const cart = getElementBySelector(".cart__link");

cart.addEventListener('click', function(e) {
  // app.catalogPage.getAndPlaceData("https://api.boardgameatlas.com/api/" + "game/categories?client_id=XZAmoxZ2qA");  // Какое-то изменение на странице
  history.pushState({state: "cartPage"}, null as any, 'cart/');  // запись в историю
  e.preventDefault();
});



// <a href="/" onclick="historyResolver('Cart', '/cart/')></a>
const main = getElementBySelector("#main");

// const historyResolver = (state: any, title: any, location: any) => {
//   this.event.preventDefault();

//   history.pushState(state, title, location);

//   switch (location) {
//     case "/cart/":
//       main.innerHTML = `${location}`;
//       break;
//   }
// }

// Способ импорта HTML
// var doc= document.querySelector('link[rel="import"]').import;
