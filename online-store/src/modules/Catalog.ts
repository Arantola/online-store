import { getElementBySelector, IGame } from "./types/types";
import Filter from "./Filter";
import Query from "./Query";

export default class Catalog {
  constructor(public filter: Filter, public query: Query) {}

  renderPage() {
    const main = getElementBySelector("#main");
    main.innerHTML = "";
    this.addListeners();
    // this.setFilters();
    this.query.getQueryFromURL();
    this.filterAndDrawCards();
  }

  addListeners() {
    this.listenBoxFilters();
    this.listenOrderFilters();
    this.listenNameFilter();
    this.listenRangeInput();
    this.listenResetButton();
    this.listenSaveButton();
    this.listenTitlesRoll();
  }

  refreshTotalGamesFound(value: number) {
    getElementBySelector("#total-games-display").innerHTML = String(value);
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

  listenNameFilter() {
    getElementBySelector("#searchName").addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          this.query.setParam("name", (e.target as HTMLInputElement).value);
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
      this.query.getQueryFromURL();
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
}
