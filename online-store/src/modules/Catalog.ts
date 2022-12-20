import { getElementBySelector, IGame } from "./types/types";

export default class Catalog {
  constructor(
    public main: HTMLElement = getElementBySelector("#main"),
    public templateFilters: any = getElementBySelector("#catalog-filters"),
    public templateCard: any = getElementBySelector("#product-card"),
    public itemsOnPage = 12,
    public itemsSkip = 0,
    public apiUrl: URL = new URL('https://api.boardgameatlas.com/'),
    public pathname = "/api/search",
    public query: Array<any> = []
  ) {}

  renderPage() {
    this.main.innerHTML = "";
    this.renderFilters();
    this.getAndPlaceData(this.formRequestURL());
    this.addListeners();
  }

  renderFilters() {
    const clone = this.templateFilters.content.cloneNode(true);
    this.main.appendChild(clone);
  }

  getAndPlaceData(url: any, errorMsg = "Something went wrong") {
    return fetch(url)
      .then((response: any) => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

        return response.json();
      })
      .then((data: any) => console.log(data))
        // this.drawCards(data.games ? data.games : console.log("Wrong data, boi!")));
        ;
  }

  formRequestURL(origin ='https://api.boardgameatlas.com/', query = [["ids", "TAAifFP590"]]) {
    this.apiUrl.pathname = this.pathname;
    for (const pairs of query) {
      this.apiUrl.searchParams.append(pairs[0], pairs[1]);
    }
    this.apiUrl.searchParams.append("limit", String(this.itemsOnPage));
    this.apiUrl.searchParams.append("skip", String(this.itemsSkip));
    this.apiUrl.searchParams.append("client_id", "XZAmoxZ2qA");
    console.log(this.apiUrl);
    return this.apiUrl;
  }

  async drawCards(items: Array<IGame>) {
    const catalogList = getElementBySelector("#catalog-list");
    catalogList.innerHTML = "";
    items.forEach((item: IGame) => {
      const clone = this.templateCard.content.cloneNode(true);

      // Сохраняем id из бд сервера, чтобы можно было обратиться к конкретной карточке по клику.
      // Либо нужно сохранять где-то пришедшую коллекцию, и сюда записывать номер в коллекции, чтобы не делать дополнительный запрос
      clone.querySelector(".item__link").setAttribute("apiID", item.id);

      clone.querySelector("img").src = `${item.image_url}`;
      clone.querySelector(".name").textContent = `${item.name}`;
      clone.querySelector(".small-di").textContent = `${item.description_preview}`;
      clone.querySelector("button").textContent = `${item.price_text}`;

      catalogList.appendChild(clone);
    });
  }

  setPathname(path: string) {
    this.pathname = path; // pathname = '/api/search'
  }

  addToQuery(query: Array<any>) {
    if (!this.query.includes(query)) {
      this.query.push(query); // query = [["name", "Catan"], ["ids", "TAAifFP590"]]
    }
  }

  removeFromQuery(query: Array<any>) {
    const i = this.query.indexOf(query);
    if (i !== -1) {
      this.query.splice(i, 1);
    }
  }

  addListeners() {
    this.addListenerToCards();
    this.addListenerToFilter();
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
          this.addToQuery(["id", cardID]);
        })
      });
    }, 3000);
  }


  addListenerToFilter() {
    const checkboxes = document.querySelectorAll(".checkbox");

  }
}

// Categories
const categories = {
  "Abstract":"hBqZ3Ar4RJ",
  "Adventure": "KUBCKBkGxV",
  "Building": "ODWOjWAJj3",
  "Card-game": "eX8uuNlQkQ",
  "Cooperative": "ge8pIhEUGE",
  "Deduction": "bCBXJy9qDw",
  "Economic": "N0TkEGfEsF",
  "Fantasy": "ZTneo8TaIO",
  "Fighting": "upXZ8vNfNO",
  "Humor": "TYnxiuiI3X",
  "Sci-Fi": "3B3QpKvXD3",
  "Wargame": "jX8asGGR6o",
}

// Более унифицированная функция которая может получать любые данные
// getData(url: URL, callback: Function, errorMsg = "Something went wrong") {
//   return fetch(url)
//     .then((response: any) => {
//       if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//       return response.json();
//     })
//     .then((data: any) => callback(data));
// }