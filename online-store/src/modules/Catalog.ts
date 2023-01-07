import { getElementBySelector, IGame, IParams } from "./types/types";
import Filter from "./Filter";
import Query from "./Query";

export default class Catalog {
  constructor(public filter: Filter, public query: Query) {}

  renderPage() {
    const main = getElementBySelector("#main");
    main.innerHTML = "";
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "{}");
    }
    this.query.getQueryFromURL();
    this.addListeners();
    this.setFilters(this.query.params);
    this.filter.updateCartDisplay();
    this.filter.updateTotalCost();
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
      this.setPreviewCount();
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
            getElementBySelector(".card__button_cart", clone) as HTMLButtonElement
          ).innerText = "Add to cart";
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

  getInputValues(parent: HTMLElement, index: number) {
    const slides = parent.getElementsByTagName("input");
    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);
     // slides[0].value = (slides[0].getAttribute("value") as string);
    // slides[1].value = (slides[1].getAttribute("value") as string);

    if (slide1 > slide2) {
      [slide1, slide2] = [slide2, slide1];
    }
    const displayElement = parent.getElementsByClassName("slider__data")[0];
    displayElement.innerHTML = slide1 + " - " + slide2;

    const list = ["price", "playtime", "players"];
    console.log(String(slide1));
    console.log(String(slide2));
    this.query.setParam(`min_${list[index]}`, String(slide1));
    this.query.setParam(`max_${list[index]}`, String(slide2));

    this.filterAndDrawCards();
  }

  setInputValues(parent: HTMLElement, index: number, params: IParams) {
    const slides = parent.getElementsByTagName("input");
    const list = ["price", "playtime", "players"];
    slides[0].setAttribute("value", params[`min_${list[index]}`]);
    slides[1].setAttribute("value", params[`max_${list[index]}`]);
    this.getInputValues(parent, index);
  }

  sliderSections = document.getElementsByClassName("slider");

  listenRangeInput() {
    for (let index = 0; index < this.sliderSections.length; index++) {
      const sliders: HTMLCollectionOf<HTMLInputElement> =
        this.sliderSections[index].getElementsByTagName("input");

      for (let y = 0; y < sliders.length; y++) {
        if (sliders[y].type === "range") {
          sliders[y].addEventListener("change", () => {
            this.getInputValues(<HTMLInputElement>this.sliderSections[index], index);
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
      this.query.setDefault();
      // console.log(this.query.params);
      this.query.getQueryFromURL();
      console.log(this.query.params);
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
        const curCart = JSON.parse(localStorage.getItem("cart") as string);
        e.target.classList.contains("card__button_in-cart")
          ? delete curCart[`${e.target.id}`]
          : (curCart[`${e.target.id}`] = 1);
        localStorage.setItem("cart", JSON.stringify(curCart));

        this.filter.updateCartDisplay();
        this.filter.updateTotalCost();
        this.filterAndDrawCards();
      }
    });
  }

  listenViewBar() {
    getElementBySelector(".view-bar").addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target instanceof HTMLDivElement) {
        if (
          e.target.classList.contains("view-card") &&
          this.query.params.view === "list"
        ) {
          this.query.setParam("view", "card");
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

  setFilters(currentQuery: IParams) {
    const params = JSON.parse(JSON.stringify(currentQuery));
    params.min_price = "5";
    params.max_price = "250";
    params.min_players = "1";
    params.max_players = "8";
    params.min_playtime = "5";
    params.max_playtime = "150";
    console.log("We goin to", params);
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
      document.querySelectorAll(`.input_${filter}`).forEach((box) => {
        (box as HTMLInputElement).checked = false;
        for (const value of params[filter].split(",")) {
          if (box.getAttribute("idAPI") == value) {
            (box as HTMLInputElement).checked = true;
          }
        }
      });
    }

    const view = this.query.params.view;
    getElementBySelector(`.view-${view}`).style.background = "orange";

    this.setInputValues(this.sliderSections[0] as HTMLElement, 0, params);
    this.setInputValues(this.sliderSections[1] as HTMLElement, 1, params);
    this.setInputValues(this.sliderSections[2] as HTMLElement, 2, params);
  }

  setPreviewCount() {
    for (const section of ["categories", "publishers"]) {
      document
        .querySelectorAll(`.checkbox_${section}`)
        .forEach((box: Element) => {
          const span = getElementBySelector(
            ".checkbox__counter",
            box as HTMLElement
          );
          const txt = document.createTextNode(
            String(
              this.filter.filterByQueryParams(
                this.query.params,
                `${section}, ${box.getAttribute("id")}`
              ).length
            )
          );
          span.innerHTML = "";
          span.appendChild(txt);
        });
    }
  }
}
