import { getElementBySelector, IGame, IQueryParams } from "./types/types";
import Filter from "./Filter";


export default class Catalog {
  constructor(
    public main: HTMLElement = getElementBySelector("#main"),
    public templateFilters: any = getElementBySelector("#catalog-filters"),
    public templateCard: any = getElementBySelector("#product-card"),
    public totalGamesFound: any = undefined,
    public catalogGameList: any = undefined,
    public itemsOnPage = 100,
    public itemsSkip = 0,

    public apiUrl: URL = new URL('https://api.boardgameatlas.com/'),
    public pathname = "/api/search",

    public collection: any = [],
    // Преобразовать в объект или класс
    public qThemes: Array<string> = [],
    public qPublishers: Array<string> = [],
    public qAscending: Array<string> = [],
    public qOrder: Array<string> = [],
    public qName: Array<string> = [],  
    public qMinPlayers: Array<string> = [],
    public qMaxPlayers: Array<string> = [],
    public qMinTime: Array<string> = [],
    public qMaxTime: Array<string> = [],
    public queryParams: IQueryParams = {
      categories: ["ZTneo8TaIO"],
      publisher: "fLH8tXTBBp",
      name: undefined,
      min_price: 1,
      max_price: 1000,
      min_players: 1,
      max_players: 20,
      min_playtime: 5,
      max_playtime: 120,
      order_by: undefined,
      ascending: undefined,
      client_id: "XZAmoxZ2qA",
    }
  ) {}

  renderPage() {
    this.main.innerHTML = "";
    this.renderFilters();
    this.addListenerToFilters(".checkbox_theme", this.qThemes);
    this.addListenerToFilters(".checkbox_publisher", this.qPublishers);
    this.addListenerToFiltersOrder();
    this.addListenerToNameInput();
    this.addListenerToRangeInput();
    this.addButtonSaveListener();
    this.totalGamesFound = getElementBySelector("#total-games-display");
    this.catalogGameList = getElementBySelector("#catalog-list");
    this.addDefaultQuery();
    this.getAndPlaceData(this.formRequestURL());
    this.addListeners();
  }

  renderFilters() {
    this.main.appendChild(this.templateFilters.content.cloneNode(true));
  }

  refreshTotalGamesFound(value: number) {
    this.totalGamesFound.innerHTML = value;
  }

  getAndPlaceData(url: any, errorMsg = "Something went wrong") {
    return fetch(url)
      .then((response: any) => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

        return response.json();
      })
      .then((data: any) => {
        // console.log(data.games);
        const filter = new Filter(data);
        filter.collection = data;
        // console.log(filter.collection);
        // Применение фильтров //
        filter.setQueryParams(this.queryParams);
        filter.filterByQueryParams();
        // console.log(filter.collection);
        this.drawCards(filter.collection.games);
        this.refreshTotalGamesFound(filter.collection.count);
      });
  }

  addQueryParamsFrom(queryName: string, query: Array<string>) {
    if (query.length > 0) {
      const params = query.join();
      this.apiUrl.searchParams.append(queryName, params);
    }
  }

  deleteSearchParam(parameters: Array<string>) {
    for (const parameter of parameters) {
      this.apiUrl.searchParams.delete(parameter);
    }
  }

  resetQueryParams() {
    const queryParams = [
      "categories",
      "publisher",
      "order_by",
      "ascending",
      "name",
      "min_players",
      "max_players",
      "min_playtime",
      "max_playtime",
    ];
    this.deleteSearchParam(queryParams);

    this.addQueryParamsFrom("categories", this.qThemes);
    this.addQueryParamsFrom("publisher", this.qPublishers);
    this.addQueryParamsFrom("order_by", this.qOrder);
    this.addQueryParamsFrom("ascending", this.qAscending);
    this.addQueryParamsFrom("name", this.qName);

    this.addQueryParamsFrom("min_players", this.qMinPlayers);
    this.addQueryParamsFrom("max_players", this.qMaxPlayers);
    this.addQueryParamsFrom("min_playtime", this.qMinTime);
    this.addQueryParamsFrom("max_playtime", this.qMaxTime);
  }

  formRequestURL() {
    this.apiUrl.pathname = this.pathname;
    this.resetQueryParams();
    console.log(this.apiUrl);
    return this.apiUrl;
  }

  drawCards(items: Array<IGame>) {
    this.catalogGameList.innerHTML = "";
    console.log(items);
    items.forEach((item: IGame) => {
      const clone = this.templateCard.content.cloneNode(true);

      // Сохраняем id из бд сервера, чтобы можно было обратиться к конкретной карточке по клику.
      // Либо нужно сохранять где-то пришедшую коллекцию, и сюда записывать номер в коллекции, чтобы не делать дополнительный запрос
      clone.querySelector(".card__link").setAttribute("apiID", item.id);

      clone.querySelector(".card__img").src = `${item.image_url ? item.image_url : "/placeholder.svg"}`;
      clone.querySelector(".card__img").alt = `${item.name}`;
      clone.querySelector(".card__name").textContent = `${item.name}`;
      // clone.querySelector(".card__description").textContent = `${item.description_preview}`;
      clone.querySelector(".card__price").textContent = `${item.price_text}`;

      this.catalogGameList.appendChild(clone);
    });
  }

  setPathname(path: string) {
    this.pathname = path; // pathname = '/api/search'
  }

  addListeners() {
    this.addListenerToCards();
  }

  // Из-за асихронности промиса в запросе, нужно отрисовывать только после рендера
  addListenerToCards() {
    setTimeout(() => {
      const cards = document.querySelectorAll(".item__link");
      cards.forEach((card) => {
        card.addEventListener("click", (e) => {
          const cardID = card.getAttribute("apiID");
          console.log(cardID);
          history.pushState({}, null as any, `item/${cardID}`);
          e.preventDefault();
          this.setPathname("/api/search");
        })
      });
    }, 3000);
  }

  //["publisher", "fLH8tXTBBp"]
  //["categories" "hBqZ3Ar4RJ"]
  //["order_by", "price"]

  addDefaultQuery() {
    this.apiUrl.searchParams.append("limit", String(this.itemsOnPage));
    this.apiUrl.searchParams.append("client_id", "XZAmoxZ2qA");
  }


  removeFromQuery(query: Array<string>, param: string) {
    const i = query.indexOf(param);
    if (i !== -1) {
      query.splice(i, 1);
    }
  }

  addToQuery(query: Array<string>, param: string) {
    query.push(param);
  }

  addListenerToFilters(selector: string, query: Array<string>) {
    const checkboxes = document.querySelectorAll(selector);
    checkboxes.forEach((checkbox: any) => {
      checkbox.addEventListener("change", (e: any) => {
        const box: any = e.target;
        if (box.checked) {
          this.addToQuery(query, box.getAttribute("idapi"));
        } else {
          this.removeFromQuery(query, box.getAttribute("idapi"));
        }
        const form: any = document.forms[0];
        console.log(form.sortList.options[0].value);
        this.getAndPlaceData(this.formRequestURL());
      });
    });
  }

  addListenerToFiltersOrder() {
    const form: any = document.forms[0]; // обращение к life-коллекции элементов form
    const formSelect: any = form.sortList;
    console.log(formSelect.options);
    formSelect.addEventListener("change", (e: Event) => {
      this.apiUrl.searchParams.delete("order_by");
      this.apiUrl.searchParams.delete("ascending");
      this.qAscending = [];
      this.qOrder = [];
      const formSelectSelectedIndex = formSelect.selectedIndex;
      // formSelect                 форма с именем sortList
      //.options                    коллекция опций
      //[formSelectSelectedIndex]   идекс выбранной опции в options
      //.dataset                    обращение к data-атрибутам элемента
      //.ascending);                имя data-атрибута

      switch (formSelect.value) {
        case "rank":
          this.addToQuery(this.qOrder, "rank");
          this.addToQuery(this.qAscending, formSelect.options[formSelectSelectedIndex].dataset.ascending);
          console.log(this.qOrder, this.qAscending);
          break;
        case "price":
          this.addToQuery(this.qOrder, "price");
          this.addToQuery(this.qAscending, formSelect.options[formSelectSelectedIndex].dataset.ascending);
          console.log(this.qOrder, this.qAscending);
          break;
      }
      this.getAndPlaceData(this.formRequestURL());
    });

    // this.addToQuery(query, AscendingPrice.getAttribute("idapi"));
    // this.addQueryParamsFrom("order_by", this.qOrder);
    // this.addQueryParamsFrom("ascending", this.qAscending);
  }

  // input.addEventListener('input', () => { input.value += '5'; });
  addListenerToNameInput() {
    getElementBySelector('#searchName').addEventListener('keydown', (e: any) => { // KeyboardEvent?
        if (e.keyCode === 13) {
          this.qName = [];
          this.addToQuery(this.qName, e.target.value);
          console.log(e.target.value);
          this.getAndPlaceData(this.formRequestURL());
        }
    });
  }

  getInputVals(parent: any, x: number) {
    // Get slider values
    // const parent = getElementBySelector("slider")
    const slides = parent.getElementsByTagName("input");
    // console.log(slides);
    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);
    // console.log(slide1, slide2);
    // Neither slider will clip the other, so make sure we determine which is larger
    if (slide1 > slide2) {
      [slide1, slide2] = [slide2, slide1];
    }
    const displayElement = parent.getElementsByClassName("slider__data")[0];
    // console.log(displayElement);
    displayElement.innerHTML = slide1 + " - " + slide2;
    if (x == 0) {
      this.qMinTime = [];
      this.qMaxTime = [];
      this.addToQuery(this.qMinTime, String(slide1));
      this.addToQuery(this.qMaxTime, String(slide2));
      // console.log(this.qMinTime, this.qMaxTime);
    } else if (x == 1) {
      this.qMinPlayers = [];
      this.qMaxPlayers = [];
      this.addToQuery(this.qMinPlayers, String(slide1));
      this.addToQuery(this.qMaxPlayers, String(slide2));
      // console.log(this.qMinPlayers, this.qMaxPlayers);
    }
    this.getAndPlaceData(this.formRequestURL());
  }

  addListenerToRangeInput() {
    // Initialize Sliders
    const sliderSections = document.getElementsByClassName("slider");
    // console.log(sliderSections);
    for (let x = 0; x < sliderSections.length; x++) {
      const sliders: any = sliderSections[x].getElementsByTagName("input");
      // console.log(sliderSections[x]);
      // console.log(sliders);
      for (let y = 0; y < sliders.length; y++) {
        // console.log(sliders[y]);
        if (sliders[y].type === "range") {
          sliders[y].addEventListener("change", (e: any) => {
            this.getInputVals(sliderSections[x], x);
          });
        }
      }
    }
  }

  addButtonSaveListener() {
    getElementBySelector(".button_save").addEventListener("click", (e) => {
      e.preventDefault();
      console.log(String(this.apiUrl)); // Запоминать в кэш
      this.apiUrl.searchParams.append("categories", "lolka");
      console.log(this.apiUrl.searchParams.toString());
    });
  }

  addButtonResetListener() {
    getElementBySelector(".button_reset").addEventListener("click", (e) => {
      // Добавить сброс всего выделенного на странице
      e.preventDefault();
      this.apiUrl.searchParams.delete("categories");
      this.apiUrl.searchParams.delete("publisher");
      this.apiUrl.searchParams.delete("order_by");
      this.apiUrl.searchParams.delete("ascending");
      this.apiUrl.searchParams.delete("name");
      this.qThemes = [];
      this.qPublishers = [];
      this.qAscending = [];
      this.qOrder = [];
      this.qName = [];
      this.qMinPlayers = [];
      this.qMaxPlayers = [];
      this.qMinTime = [];
      this.qMaxTime = [];
    });
  }
}
