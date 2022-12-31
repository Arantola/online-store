import Filter from "./Filter";
import QueryParams from "./QueryParams";

class Product {
  constructor(public filter: Filter, public queryParams: QueryParams) {}

  renderPage() {
    return;
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
