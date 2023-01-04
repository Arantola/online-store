import { getElementBySelector, IGame, IParams } from "./types/types";
import Filter from "./Filter";
import Query from "./Query";

export default class Catalog {
  constructor(public filter: Filter, public query: Query) {}

  renderPage() {
    const main = getElementBySelector("#main");
    main.innerHTML = "";
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "VibNUMwsqr, 4rn2FX1Eon");
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

  drawCards(items: Array<IGame> | undefined) {
    if (items) {
      const catalogGameList = getElementBySelector("#catalog-list");
      catalogGameList.innerHTML = "";
      items.forEach((item: IGame) => {
        const clone: Node =
          (
            document.getElementById("product-card") as HTMLTemplateElement
          ).content.cloneNode(true) || null;
        if (clone) {
          (
            getElementBySelector(
              ".card__link",
              clone as HTMLElement
            ) as HTMLLinkElement
          ).href = `/product?id=${item.id}`;
          (
            getElementBySelector(
              ".card__img",
              clone as HTMLElement
            ) as HTMLImageElement
          ).src = `${
            item.images.box
              ? item.images.box
              : "https://w7.pngwing.com/pngs/380/764/png-transparent-paper-box-computer-icons-symbol-random-icons-miscellaneous-angle-text-thumbnail.png"
          }`;
          (
            getElementBySelector(
              ".card__img",
              clone as HTMLElement
            ) as HTMLImageElement
          ).alt = `${item.name}`;
          (
            getElementBySelector(
              ".card__name",
              clone as HTMLElement
            ) as HTMLElement
          ).textContent = `${item.name}`;
          (
            getElementBySelector(
              ".card__price",
              clone as HTMLElement
            ) as HTMLElement
          ).textContent = `${item.price}`;

          // check if item in cart
          const cart: string = localStorage.getItem("cart") as string;
          if (cart.includes(item.id)) {
            getElementBySelector(
              ".card__link",
              clone as HTMLElement
            ).classList.add("in-cart");
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
          this.query.setParam("input", (e.target as HTMLInputElement).value);
          this.filterAndDrawCards();
        }
    });
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
