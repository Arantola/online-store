import { getElementBySelector } from "./types/types";

export default class Cart {
  constructor(
    public main: HTMLElement = getElementBySelector("#main"),
    public templateCart: any = getElementBySelector("#cart"),
    public itemsOnPage = 6,
    public cart = []
  ) {}

  renderPage() {
    return;
  }

  // getAndPlaceData(url: any, errorMsg = "Something went wrong") {
  //   return fetch(url)
  //     .then((response: any) => {
  //       if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

  //       return response.json();
  //     })
  //     .then((data: any) => this.drawCard(data.games ? data.games : console.log("Wrong data, boi!")));
  // }

  // drawCard() {

  // }
}
