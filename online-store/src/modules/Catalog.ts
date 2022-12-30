import { getElementBySelector, IGame, IQueryParams } from "./types/types";
import Filter from "./Filter";
import QueryParams from "./QueryParams";
import gamesDataArray from "../data/gamesDataArray";

export default class Catalog {
  constructor(
    public apiUrl: URL = new URL('https://api.boardgameatlas.com/api/game/images?limit=6&game_id=i5Oqu5VZgP&client_id=XZAmoxZ2qA'),
    public queryParams: IQueryParams = new QueryParams(),
    public gameList = gamesDataArray,
    public filter = new Filter(),
    public newGameList: Array<any> = []
  ) {}

  renderPage() {
    this.filter.initialCollection = JSON.stringify(gamesDataArray);
    const main = getElementBySelector("#main");
    main.innerHTML = "";
    this.filterAndDrawCards();
    this.addListeners();
  }

  addListeners() {
    this.addListenerToFilters(".checkbox__box", this.queryParams.categories);
    this.addListenerToFilters(
      ".checkbox_publisher",
      this.queryParams.publishers
    );
    this.addListenerToFiltersOrder();
    this.addListenerToNameInput();
    this.addListenerToRangeInput();
    this.addButtonSaveListener();
  }

  refreshTotalGamesFound(value: number) {
    getElementBySelector("#total-games-display").innerHTML = String(value);
  }

  filterAndDrawCards() {
    this.filter.filterByQueryParams(this.queryParams);
    if (this.filter.collection) {
      this.drawCards(this.filter.collection);
      this.refreshTotalGamesFound(this.filter.collection.length);
    }
  }

  deleteSearchParam() {
    for (const parameter in this.queryParams) {
      this.apiUrl.searchParams.delete(parameter);
    }
  }

  drawCards(items: Array<IGame> | undefined) {
    if (items){
      const catalogGameList = getElementBySelector("#catalog-list");
      catalogGameList.innerHTML = "";
      items.forEach((item: IGame) => {
        const clone: any =
          getElementBySelector<HTMLTemplateElement>(
            "#product-card"
          ).content.cloneNode(true);

        clone.querySelector(".card__link").setAttribute("apiID", item.id);
        clone.querySelector(".card__img").src = `${
          item.images.box ? item.images.box : "/placeholder.svg"
        }`;
        clone.querySelector(".card__img").alt = `${item.name}`;
        clone.querySelector(".card__name").textContent = `${item.name}`;
        clone.querySelector(".card__price").textContent = `${item.price}`;

        catalogGameList.appendChild(clone);
      });
    }
  }

  // Из-за асихронности промиса в запросе, нужно отрисовывать только после рендера
  addListenerToCards() {
    setTimeout(() => {
      const cards = document.querySelectorAll(".item__link");
      cards.forEach((card) => {
        card.addEventListener("click", (e) => {
          const cardID = card.getAttribute("apiID");
          history.pushState({}, null as any, `item/${cardID}`);
          e.preventDefault();
        });
      });
    }, 2000);
  }

  removeFromQuery(query: Array<string | undefined>, param: string) {
    const i = query.indexOf(param);
    if (i !== -1) {
      query.splice(i, 1);
    }
  }

  addListenerToFilters(selector: string, query: Array<string | undefined>) {
    const checkboxes = document.querySelectorAll(selector);

    checkboxes.forEach((checkbox: any) => {
      checkbox.addEventListener("change", (e: any) => {
        const input: any = getElementBySelector(".checkbox_theme", checkbox);
        const counter: any = getElementBySelector(".checkbox__counter", checkbox);
        console.log(counter);
        counter.innerHTML = this.filter.filterForDisplay(
          "categories",
          input.getAttribute("idapi")
        );
        if (input.checked) {
          window.history.pushState({}, "", window.location.origin + "/catalog" + `/search?categories=${input.getAttribute("idapi")}`);
          this.filterAndDrawCards();
          counter.innerHTML = this.filter.filterForDisplay(
            "categories",
            input.getAttribute("idapi")
          );
          console.log(query);
        } else {
          window.history.pushState({}, "", window.location.origin + "/catalog");
          this.removeFromQuery(query, input.getAttribute("idapi"));
          this.filterAndDrawCards();
          counter.innerHTML = this.filter.filterForDisplay(
            "categories",
            input.getAttribute("idapi")
          );
          console.log(query);
        }
      });
    });
  }

  addListenerToFiltersOrder() {
    const form: any = document.forms[0]; // обращение к life-коллекции элементов form
    const formSelect: any = form.sortList;
    // console.log(formSelect.options);
    formSelect.addEventListener("change", () => {
      this.queryParams.ascending = [undefined];
      this.queryParams.order_by = [undefined];
      const formSelectSelectedIndex = formSelect.selectedIndex;
      // formSelect                 форма с именем sortList
      //.options                    коллекция опций
      //[formSelectSelectedIndex]   идекс выбранной опции в options
      //.dataset                    обращение к data-атрибутам элемента
      //.ascending);                имя data-атрибута

      switch (formSelect.value) {
        case "rank":
          this.queryParams.order_by = ["rank"];
          this.queryParams.ascending = [
            `${formSelect.options[formSelectSelectedIndex].dataset.ascending}`,
          ];
          this.filterAndDrawCards();
          break;
        case "price":
          this.queryParams.order_by = ["price"];
          this.queryParams.ascending = [
            `${formSelect.options[formSelectSelectedIndex].dataset.ascending}`,
          ];
          this.filterAndDrawCards();
          break;
      }
    });
  }

  addListenerToNameInput() {
    getElementBySelector("#searchName").addEventListener(
      "keydown",
      (e: any) => {
        // KeyboardEvent?
        if (e.keyCode === 13) {
          this.queryParams.name = [e.target.value];

          this.filterAndDrawCards();
        }
    });
  }

  getInputValues(parent: any, x: number) {
    const slides = parent.getElementsByTagName("input");
    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);

    if (slide1 > slide2) {
      [slide1, slide2] = [slide2, slide1];
    }
    const displayElement = parent.getElementsByClassName("slider__data")[0];

    displayElement.innerHTML = slide1 + " - " + slide2;
    if (x == 0) {
      this.queryParams.min_playtime = [slide1];
      this.queryParams.max_playtime = [slide2];
      this.filterAndDrawCards();
    } else if (x == 1) {
      this.queryParams.min_players = [slide1];
      this.queryParams.max_players = [slide2];
      this.filterAndDrawCards();
    }
  }

  addListenerToRangeInput() {
    // Initialize Sliders
    const sliderSections = document.getElementsByClassName("slider");

    for (let x = 0; x < sliderSections.length; x++) {
      const sliders: any = sliderSections[x].getElementsByTagName("input");

      for (let y = 0; y < sliders.length; y++) {
        if (sliders[y].type === "range") {
          sliders[y].addEventListener("change", (e: any) => {
            this.getInputValues(sliderSections[x], x);
          });
        }
      }
    }
  }

  addButtonSaveListener() {
    getElementBySelector(".button_save").addEventListener("click", (e) => {
      e.preventDefault();
    });
  }

  addButtonResetListener() {
    getElementBySelector(".button_reset").addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
}
