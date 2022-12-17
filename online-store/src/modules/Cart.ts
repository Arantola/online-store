import { getElementBySelector } from "./types/index";

export default class Cart {
  constructor(
    public section: HTMLElement = getElementBySelector("#product-list"),
    public template: any = getElementBySelector("#product-card"),
    public itemsOnPage = 12,
    public cart = []
  ) {}

  renderPage() {
    return;
  }
}
