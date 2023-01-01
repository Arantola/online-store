import { getElementBySelector, IGame } from "./types/types";
import Filter from "./Filter";
import Query from "./Query";

export default class Catalog {
  constructor(public filter: Filter, public query: Query) {}

  renderPage() {
    const main = getElementBySelector("#main");
    main.innerHTML = "";
    this.filter.resetColection();
    this.filterAndDrawCards();
    // this.setFilters();
    this.addListeners();
    this.query.getQueryFromURL();
  }

  addListeners() {
    this.listenBoxFilters();
    this.listenOrderFilters();
    this.listenNameFilter();
    this.listenRangeInput();
    this.listenResetButton();
    this.listenSaveButton();
  }

  refreshTotalGamesFound(value: number) {
    getElementBySelector("#total-games-display").innerHTML = String(value);
  }

  filterAndDrawCards() {
    this.filter.filterByQueryParams(this.query.params);
    if (this.filter.collection) {
      this.drawCards(this.filter.collection);
      this.refreshTotalGamesFound(this.filter.collection.length);
    }
  }

  drawCards(items: Array<IGame> | undefined) {
    if (items) {
      const catalogGameList = getElementBySelector("#catalog-list");
      catalogGameList.innerHTML = "";
      items.forEach((item: IGame) => {
        const clone: any =
          getElementBySelector<HTMLTemplateElement>(
            "#product-card"
          ).content.cloneNode(true);

        clone.querySelector(".card__link").href = `/product?id=${item.id}`;
        clone.querySelector(".card__img").src = `${
          item.images.box
            ? item.images.box
            : "https://w7.pngwing.com/pngs/380/764/png-transparent-paper-box-computer-icons-symbol-random-icons-miscellaneous-angle-text-thumbnail.png"
        }`;
        clone.querySelector(".card__img").alt = `${item.name}`;
        clone.querySelector(".card__name").textContent = `${item.name}`;
        clone.querySelector(".card__price").textContent = `${item.price}`;

        catalogGameList.appendChild(clone);
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
            this.filterAndDrawCards();
          } else {
            this.query.delParam(
              section[1],
              String((e.target as HTMLInputElement).getAttribute("idapi"))
            );
            console.log(this.filter.collection);
            this.filterAndDrawCards();
        }
      });
    }
  }

  listenOrderFilters() {
    const form: HTMLFormElement = document.forms[0]; // обращение к life-коллекции элементов form
    const formSelect: HTMLFormElement = form.sortList;
    formSelect.addEventListener("change", () => {
      const selectedIndex = formSelect.selectedIndex;
      // formSelect                 форма с именем sortList
      //.options                    коллекция опций
      //[selectedIndex]             идекс выбранной опции в options
      //.dataset                    обращение к data-атрибутам элемента
      //.ascending);                имя data-атрибута
      switch (formSelect.value) {
        case "rank":
          this.query.params.order_by = "rank";
          this.query.params.ascending = `${formSelect.options[selectedIndex].dataset.ascending}`;
          this.filterAndDrawCards();
          break;
        case "price":
          this.query.params.order_by = "price";
          this.query.params.ascending = `${formSelect.options[selectedIndex].dataset.ascending}`;
          this.filterAndDrawCards();
          break;
      }
    });
  }

  listenNameFilter() {
    getElementBySelector("#searchName").addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          this.query.params.name = (e.target as HTMLInputElement).value;
          this.filterAndDrawCards();
        }
    });
  }

  getInputValues(parent: HTMLInputElement, x: number) {
    const slides = parent.getElementsByTagName("input");
    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);

    if (slide1 > slide2) {
      [slide1, slide2] = [slide2, slide1];
    }
    const displayElement = parent.getElementsByClassName("slider__data")[0];

    displayElement.innerHTML = slide1 + " - " + slide2;
    switch (x) {
      case 0:
        this.query.setParam("min_price", String(slide1));
        this.query.setParam("max_price", String(slide2));
        this.filterAndDrawCards();
        break;
      case 1:
        this.query.setParam("min_playtime", String(slide2));
        this.query.setParam("max_playtime", String(slide2));
        this.filterAndDrawCards();
        break;
      case 2:
        this.query.setParam("min_players", String(slide2));
        this.query.setParam("max_players", String(slide2));
        this.filterAndDrawCards();
        break;
    }
  }

  listenRangeInput() {
    const sliderSections = document.getElementsByClassName("slider");

    for (let x = 0; x < sliderSections.length; x++) {
      const sliders: HTMLCollectionOf<HTMLInputElement> =
        sliderSections[x].getElementsByTagName("input");

      for (let y = 0; y < sliders.length; y++) {
        if (sliders[y].type === "range") {
          sliders[y].addEventListener("change", () => {
            this.getInputValues(<HTMLInputElement>sliderSections[x], x);
          });
        }
      }
    }
  }

  listenSaveButton() {
    getElementBySelector(".button_save").addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href);
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
    });
  }
}
