import Filter from "./Filter";
import QueryParams from "./Query";

interface game {
  id: string;
  name: string;
  price: string;
  min_players: number;
  max_players: number;
  min_playtime: number;
  max_playtime: number;
  categories: string;
  designer: string;
  art: string;
  publishers: string;
  images: {
    logo: string;
    box: string;
    background: string;
    photo1: string;
    photo2: string;
  };
  description: string;
}

class Product {
  constructor(public filter: Filter, public queryParams: QueryParams) {}

  renderPage() {
    const id = String(new URLSearchParams(document.location.search).get("id"));
    const currentGame = this.filter.getSingle(id)[0];
    this.addCardInfo(currentGame);
    this.ImgExpansion();
    this.filter.updateCartDisplay();
    this.filter.updateTotalCost();
    this.listenCartButton(currentGame.id);
    this.listenCartButtonsNow(currentGame.id);
  }

  listenCartButton(game: string) {
    const btn = document.getElementById("product-buy-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        if (e.target instanceof HTMLButtonElement) {
          const curCart = JSON.parse(localStorage.getItem("cart") as string);
          if (curCart[`${game}`] > 0) {
            curCart[`${game}`] += 1;
          } else {
            curCart[`${game}`] = 1;
            const buyBtnChange = document.getElementById("product-buy-btn");
            if (buyBtnChange) buyBtnChange.innerHTML = `Add another to cart`;
          }
          localStorage.setItem("cart", JSON.stringify(curCart));
          this.filter.updateCartDisplay();
          this.filter.updateTotalCost();
        }
      });
    }
  }

  listenCartButtonsNow(game: string) {
    const btn = document.getElementById("product-buy-now-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        if (e.target instanceof HTMLButtonElement) {
          const curCart = JSON.parse(localStorage.getItem("cart") as string);
          if (!curCart[`${game}`]) {
            curCart[`${game}`] = 1;
          }
          localStorage.setItem("cart", JSON.stringify(curCart));
          localStorage.setItem("modal", "true");
          this.filter.updateCartDisplay();
          this.filter.updateTotalCost();
          window.location.href = "/cart";
        }
      });
    }
  }

  addCardInfo(game: game) {
    const info = [
      {
        text: "Price",
        info: game.price,
      },
      {
        text: "Art by",
        info: game.art,
      },
      {
        text: "Designed by",
        info: game.designer,
      },
      {
        text: "Publishers by",
        info: game.publishers,
      },
      {
        text: "Number of players",
        info: `${game.min_players}-${game.max_players}`,
      },
      {
        text: "Playtime",
        info: `${game.min_playtime}-${game.max_playtime}`,
      },
      {
        text: "Theme",
        info: game.categories,
      },
    ];
    // Либо передаём обьект игры из списка в каталоге
    // Либо делаем запрос по id на сервер
    if (game) {
      // Добавляем информацию в поля
      const breadTheme = document.getElementById("bread-theme");
      if (breadTheme)
        breadTheme.innerHTML = `${game.categories.split(/\s*,\s*/)[0]}`;
      const breadBrand = document.getElementById("bread-brand");
      if (breadBrand) breadBrand.innerHTML = `${game.publishers}`;
      const breadName = document.getElementById("bread-name");
      if (breadName) breadName.innerHTML = `${game.name}`;

      const backgroundImg = document.querySelector<HTMLElement>(".item");
      if (backgroundImg) {
        backgroundImg.style.background = `linear-gradient( rgba(0, 0, 0, 0.80) 100%, rgba(0, 0, 0, 0.5)100%), url(${game.images.background})`;
        backgroundImg.style.backgroundSize = `cover`;
        backgroundImg.style.backgroundPosition = `center`;
      }
      const nameLogo = document.getElementById("name-logo");
      if (nameLogo)
        nameLogo.innerHTML = `<img src="${game.images.logo}" alt="${game.name}">`;
      const mainImg = document.querySelector<HTMLElement>(".main-img");
      if (mainImg)
        mainImg.innerHTML = `<img src="${game.images.box}" alt="${game.name}">`;
      const newImg = document.querySelector<HTMLElement>(".small-img");
      if (newImg)
        newImg.innerHTML = `<img src="${game.images.photo1}" alt="${game.name}"><img src="${game.images.photo2}" alt="${game.name}">`;

      const allInfo = document.querySelector<HTMLElement>(".characteristic");
      if (allInfo) {
        for (let i = 0; i < info.length; i++) {
          const detailDiv = `
          <div class="detail">
            <div class="">${info[i].text}</div>
            <div class="">${info[i].info}</div>
          </div>`;
          allInfo.insertAdjacentHTML("beforeend", detailDiv);
        }
      }
      const descText = document.getElementById("desc-text");
      if (descText) descText.innerHTML = `${game.description}`;

      const curCart = JSON.parse(localStorage.getItem("cart") as string);
      const buyBtnChange = document.getElementById("product-buy-btn");
      if (curCart[`${game.id}`] > 0) {
        if (buyBtnChange) buyBtnChange.innerHTML = `Add another to cart`;
      }
    } else {
      // Делаем запрос на сервер
      // Добавляем информацию в поля
    }
  }

  ImgExpansion() {
    const modal = document.querySelector<HTMLElement>(".modal-container");
    const openImg = document.querySelector<HTMLElement>(".all-img");
    const span = document.querySelector<HTMLElement>(".close");

    if (openImg) {
      openImg.addEventListener("click", (e: Event) => {
        const urlImg = e.target as HTMLImageElement;
        if (e.target instanceof HTMLImageElement) {
          const modalImg = document.querySelector<HTMLElement>(".modal-img");
          if (modal) {
            modal.style.display = "block";
            if (modalImg)
              modalImg.innerHTML = `<img src="${urlImg.src}" alt="${urlImg.alt}">`;
          }
        }
      });
    }

    if (span) {
      span.onclick = function () {
        if (modal) {
          modal.style.display = "none";
        }
      };
    }
    window.onclick = function (event) {
      if (event.target == modal && modal) {
        modal.style.display = "none";
      }
    };
  }

  addListeners() {
    // добавляем обработчики
  }
}

export default Product;
