import { getElementBySelector, IGame } from "./types/index";

export default class Catalog {
  constructor(
    public section: HTMLElement = getElementBySelector("#product-list"),
    public template: any = getElementBySelector("#product-card"),
    public itemsOnPage = 12,
    public itemsSkip = 0,
    public browserURL = 'http://localhost:8080/',
    public apiUrl: URL = new URL('https://api.boardgameatlas.com/')
  ) {}

  renderPage() {
    this.getAndPlaceData(this.formURL());
  }

  formURL(origin ='https://api.boardgameatlas.com/', pathname='/api/search', query='') {
    // this.apiUrl.origin = origin;
    this.apiUrl.pathname = pathname;
    // (query) ? this.apiUrl.searchParams.append([query[0], query[1]]) : '';
    this.apiUrl.searchParams.append("limit", String(this.itemsOnPage));
    this.apiUrl.searchParams.append("skip", String(this.itemsSkip));
    this.apiUrl.searchParams.append("client_id", "XZAmoxZ2qA");
    console.log(this.apiUrl);
    return this.apiUrl;
  }

  getAndPlaceData(url: URL, errorMsg = "Something went wrong") {
    return fetch(url).then((response: Response) => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

        return response.json();
      })
      .then((data: any) => this.drawCards(data.games));
  }

  drawCards(items: Array<IGame>) {
    this.section.innerHTML = "";
    items.forEach((item: IGame) => {
      const clone = this.template.content.cloneNode(true);

      clone.querySelector("img").src = `${item.image_url}`;
      clone.querySelector(".name").textContent = `${item.name}`;
      clone.querySelector(".small-di").textContent = `${item.description_preview}`;
      clone.querySelector("button").textContent = `${item.price_text}`;

      this.section.appendChild(clone);
    });
  }

  setItemsOnPage(n: number) {
    this.itemsOnPage = n;
  }
}
