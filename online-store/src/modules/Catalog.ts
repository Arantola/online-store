import { getElementBySelector, IGame, IParams } from "./types/types";
import Filter from "./Filter";
import Query from "./Query";

export default class Catalog {
  constructor(public filter: Filter, public query: Query) {}

  renderPage() {
    const main = getElementBySelector("#main");
    main.innerHTML = "";
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify({}));
    }
    this.query.getQueryFromURL();
    this.addListeners();
    this.setFilters(this.query.params);
    this.filterAndDrawCards();
  }

  addListeners() {
    this.listenBoxFilters();
    this.listenOrderFilters();
    this.listenInputFilter();
    this.listenRangeInput();
    this.listenResetButton();
    this.listenSaveButton();
    this.listenTitlesRoll();
    this.listenViewBar();
    this.listenCartButtons();
  }

  refreshTotalGamesFound(value: number) {
    getElementBySelector("#total-games-display").innerHTML = String(value);
    if (value == 0) {
      getElementBySelector("#catalog-list").insertAdjacentHTML(
        "afterbegin",
        `<div class="not-found">Found nothing. Try to change search parameters</div>`
      );
    }
  }

  filterAndDrawCards() {
    const collection = this.filter.filterByQueryParams(this.query.params);
    if (collection) {
      this.drawCards(collection);
      this.refreshTotalGamesFound(collection.length);
    }
  }

  drawCards(items: Array<IGame>) {
    if (items) {
      const catalogGameList = getElementBySelector("#catalog-list");
      catalogGameList.innerHTML = "";
      if (this.query.params.view == "list") {
        catalogGameList.classList.add("list_flex");
      } else {
        catalogGameList.classList.remove("list_flex");
      }
      items.forEach((item: IGame) => {
        const clone: Node =
          (
            document.getElementById("product-card") as HTMLTemplateElement
          ).content.cloneNode(true) || null;

        if (clone instanceof DocumentFragment) {
          (
            getElementBySelector(".card__link", clone) as HTMLLinkElement
          ).href = `/product?id=${item.id}`;
          (
            getElementBySelector(".card__img", clone) as HTMLImageElement
          ).src = `${
            item.images.box
              ? item.images.box
              : "https://w7.pngwing.com/pngs/380/764/png-transparent-paper-box-computer-icons-symbol-random-icons-miscellaneous-angle-text-thumbnail.png"
          }`;
          (
            getElementBySelector(".card__img_logo", clone) as HTMLImageElement
          ).src = item.images.logo;
          (
            getElementBySelector(".card__img_background", clone) as HTMLImageElement
          ).src = `${item.images.background}`;
          (
            getElementBySelector(".card__img", clone) as HTMLImageElement
          ).alt = `${item.name}`;
          (
            getElementBySelector(".card__name", clone) as HTMLElement
          ).textContent = `${item.name}`;
          (
            getElementBySelector(".card__price", clone) as HTMLElement
          ).textContent = `${item.price} $`;
          (
          getElementBySelector(".card__button_cart", clone) as HTMLButtonElement
          ).id = `${item.id}`;
          (
            getElementBySelector(".card__description", clone) as HTMLElement
          ).innerText = `${item.description}`;

          if (this.query.params.view == "list") {
            getElementBySelector(".card", clone).classList.add("card_wide");
            getElementBySelector(".card__img", clone).classList.add("card__img_wide");
            getElementBySelector(".card__img_logo", clone).style.display = "block";
            getElementBySelector(".card__img_background", clone).style.display = "block";
            getElementBySelector(".card__img-wrapper", clone).classList.add("card__img-wrapper_wide");
            getElementBySelector(".card__info", clone).classList.add("card__info_wide");
            getElementBySelector(".card__name", clone).classList.add("card__name_wide");
            getElementBySelector(".card__description", clone).style.display = "block";
            getElementBySelector(".card__button_cart", clone).classList.add("card__button_cart_wide");
          }

          // check if item in cart
          const cart: string = localStorage.getItem("cart") as string;
          if (cart.includes(item.id)) {
            getElementBySelector(".card__link", clone).classList.add("card_in-cart");
            getElementBySelector(".card__button_cart", clone).classList.add("card__button_in-cart");
            getElementBySelector(".card__button_cart", clone).innerText = "Added";
          }

          catalogGameList.appendChild(clone);
        }
      });
    }
  }

  listenBoxFilters() {
    for (const section of [
      ["#theme-filters", "categories"],
      ["#publisher-filters", "publishers"],
    ]) {
      getElementBySelector(section[0]).addEventListener(
        "change",
        (e: Event) => {
          if ((e.target as HTMLInputElement).checked) {
            this.query.addParam(
              section[1],
              String((e.target as HTMLInputElement).getAttribute("idapi"))
            );
          } else {
            this.query.delParam(
              section[1],
              String((e.target as HTMLInputElement).getAttribute("idapi"))
            );
          }
          this.filterAndDrawCards();
      });
    }
  }

  listenOrderFilters() {
    const form: HTMLFormElement = document.forms[0];
    const formSelect: HTMLFormElement = form.sortList;
    formSelect.addEventListener("change", () => {
      const selectedIndex = formSelect.selectedIndex;
      const ascending = `${formSelect.options[selectedIndex].dataset.ascending}`;
      this.query.setParam("order_by", formSelect.value);
      this.query.setParam("ascending", ascending);
      this.filterAndDrawCards();
    });
  }

  listenInputFilter() {
    getElementBySelector("#search").addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          if ((e.target as HTMLInputElement).value == "") {
            this.query.delParam("input", (e.target as HTMLInputElement).value);
          } else {
            this.query.setParam("input", (e.target as HTMLInputElement).value);
          }
          this.filterAndDrawCards();
        }
      }
    );
  }

  getInputValues(parent: HTMLInputElement, index: number) {
    const slides = parent.getElementsByTagName("input");
    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);

    if (slide1 > slide2) {
      [slide1, slide2] = [slide2, slide1];
    }
    const displayElement = parent.getElementsByClassName("slider__data")[0];
    displayElement.innerHTML = slide1 + " - " + slide2;

    const list = ["price", "playtime", "players"];
    this.query.setParam(`min_${list[index]}`, String(slide1));
    this.query.setParam(`max_${list[index]}`, String(slide2));

    this.filterAndDrawCards();
  }

  setInputValues(parent: HTMLInputElement, index: number) {
    const slides = parent.getElementsByTagName("input");
    const list = ["price", "playtime", "players"];
    slides[0].value = this.query.params[`min_${list[index]}`];
    slides[1].value = this.query.params[`max_${list[index]}`];
    console.log(slides[0].value);
    console.log(slides[1].value);
  }

  listenRangeInput() {
    const sliderSections = document.getElementsByClassName("slider");

    for (let index = 0; index < sliderSections.length; index++) {
      const sliders: HTMLCollectionOf<HTMLInputElement> =
        sliderSections[index].getElementsByTagName("input");

      for (let y = 0; y < sliders.length; y++) {
        if (sliders[y].type === "range") {
          sliders[y].addEventListener("change", () => {
            this.getInputValues(<HTMLInputElement>sliderSections[index], index);
          });
          sliders[y].addEventListener("onpopstate", () => {
            console.log("function works!");
            this.setInputValues(<HTMLInputElement>sliderSections[index], index);
          });
        }
      }
    }
  }

  listenSaveButton() {
    getElementBySelector(".button_save").addEventListener("click", (e) => {
      e.preventDefault();
      const button = e.target as HTMLButtonElement;
      navigator.clipboard.writeText(window.location.href);
      button.textContent = "Link saved!";
      button.disabled = true;
      setTimeout(() => {
        button.textContent = "Get link";
        button.disabled = false;
      }, 2000);
    });
  }

  listenResetButton() {
    getElementBySelector(".button_reset").addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState(
        {},
        "/catalog",
        window.location.origin + "/catalog"
      );
      this.query.getQueryFromURL();
      this.setFilters(this.query.params);
      this.filterAndDrawCards();
    });
  }

  listenTitlesRoll() {
    document.querySelectorAll(".filters__box").forEach((box) => {
      getElementBySelector(
        ".filters__title",
        box as HTMLElement
      ).addEventListener("click", (e) => {
        getElementBySelector(
          ".filters__title",
          box as HTMLElement
        ).classList.toggle("roll-up")
        getElementBySelector(".filters__list", box as HTMLElement).classList.toggle("none");
      });
    })
  }

  listenCartButtons() {
    const catalogList = getElementBySelector("#catalog-list");
    catalogList.addEventListener("click", (e) => {
      if (
        e.target instanceof HTMLButtonElement &&
        e.target.classList.contains("card__button_cart")
      ) {
        e.preventDefault();
        e.target.classList.contains("card__button_in-cart")
          ? this.delfromCart(e.target.id)
          : this.addtoCart(e.target.id);
      }
    });
  }

  delfromCart(id: string) {
    const curCart = JSON.parse(localStorage.getItem("cart") as string);
    delete curCart[`${id}`];
    localStorage.setItem("cart", JSON.stringify(curCart));

    this.filterAndDrawCards();
  }

  addtoCart(id: string) {
    const curCart = JSON.parse(localStorage.getItem("cart") as string);
    curCart[`${id}`] = 1;
    localStorage.setItem("cart", JSON.stringify(curCart));

    this.filterAndDrawCards();
  }
  // addToCart() {
  //   if (!localStorage.getItem("cart")) {
  //     const newCart = [{ id: target.id, count: 1 }];
  //     localStorage.setItem("cart", JSON.stringify(newCart));
  //   } else {
  //     // Array<{id: string, count: number}>
  //     const curCart = JSON.parse(localStorage.getItem("cart") as string);
  //     for (const item of curCart) {
  //       if (item.id !== target.id) {
  //         curCart.push({ id: target.id, count: 1 });
  //       } else {
          
  //       }
  //     }
  //   }

  //   cart.set(e.target.id, 1);
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }

  listenViewBar() {
    console.log("function works");
    getElementBySelector(".view-bar").addEventListener("click", (e) => {
      e.preventDefault();
      console.log("target is", e.target);
      if (e.target instanceof HTMLDivElement) {
        if (
          e.target.classList.contains("view-card") &&
          this.query.params.view === "list"
        ) {
          this.query.setParam("view", "card");
          console.log("click");
          e.target.style.background = "orange";
          getElementBySelector(".view-list").style.background = "#231f20";
          this.filterAndDrawCards();
        } else if (
          e.target.classList.contains("view-list") &&
          this.query.params.view === "card"
        ) {
          this.query.setParam("view", "list");
          e.target.style.background = "orange";
          getElementBySelector(".view-card").style.background = "#231f20";
          this.filterAndDrawCards();
        }
      }
    });
  }

  setFilters(params: IParams) {
    let sortOption = 0;
    switch (params.order_by) {
      case "price":
        sortOption = params.ascending === "true" ? 1 : 2;
        break;
      case "rank":
        sortOption = params.ascending === "true" ? 3 : 4;
        break;
    }
    (getElementBySelector("#sort-list") as HTMLSelectElement).selectedIndex =
      sortOption;

    (getElementBySelector("#search") as HTMLInputElement).value = params.input;

    for (const filter of ["categories", "publishers"]) {
      document.querySelectorAll(`.checkbox_${filter}`).forEach((box) => {
        for (const value of params[filter].split(",")) {
          if (box.getAttribute("idAPI") == value) {
            (box as HTMLInputElement).checked = true;
          } else {
            (box as HTMLInputElement).checked = false;
          }
        }
      });
    }

    const view = this.query.params.view;
    getElementBySelector(`.view-${view}`).style.background = "orange";

    // console.log(params);
    // console.log(getElementBySelector("#min-price"));
    // (getElementBySelector("#min-price") as HTMLInputElement).value = "50";
    //   // params.min_price;
    // (getElementBySelector("#max-price") as HTMLInputElement).value = params.min_price;

    // (getElementBySelector("#min-time") as HTMLInputElement).value = params.min_playtime;
    // (getElementBySelector("#max-time") as HTMLInputElement).value = params.min_playtime;

    // (getElementBySelector("#min-players") as HTMLInputElement).value = params.min_players;
    // (getElementBySelector("#max-players") as HTMLInputElement).value = params.min_players;

  }
}
