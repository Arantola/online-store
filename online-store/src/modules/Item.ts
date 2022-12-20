import { getElementBySelector } from "./types/index";

export default class Item {
  constructor(
    public section: HTMLElement = getElementBySelector("#product-list"),
    public template: any = getElementBySelector("#product-card")
  ) {}

  renderPage() {
    return;
  }
}
