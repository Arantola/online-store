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

}
