import Filter from "./Filter";
import QueryParams from "./Query";

class Product {
  constructor(public filter: Filter, public queryParams: QueryParams) {}

  renderPage() {
    const id = String(new URLSearchParams(document.location.search).get("id"));
    const currentGame: any = this.filter.getSingle(id)[0];
    console.log(currentGame);
    this.filter.updateCartDisplay();
    this.filter.updateTotalCost();
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

export default Product;
