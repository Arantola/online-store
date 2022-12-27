import { getElementBySelector } from "./types/types";

class Item {
  constructor(
    public main: HTMLElement = getElementBySelector("#main"),
    public template: any = getElementBySelector("#description"),
    public apiUrl: URL = new URL('https://api.boardgameatlas.com/'),
    public pathname = "/api/search",
    public gameID: string = ""
  ) {}

  renderPage() {
    this.main.innerHTML = "";
    const clone = this.template.content.cloneNode(true);
    this.main.appendChild(clone);
    this.addCardInfo();
    this.addListeners();
  }

  addCardInfo(game?: any) {
    // Либо передаём обьект игры из списка в каталоге
    // Либо делаем запрос по id на сервер
    if (game) {
      // Добавляем информацию в поля
    } else {
      // Делаем запрос на сервер
      // Добавляем информацию в поля
    }
  }

  addListeners() {
    // добавляем обработчики
  }

}

export default Item;
