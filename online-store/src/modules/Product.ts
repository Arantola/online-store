import Filter from "./Filter";
import QueryParams from "./Query";

class Product {
  constructor(public filter: Filter, public queryParams: QueryParams) {}

  renderPage() {
    const id = String(new URLSearchParams(document.location.search).get("id"));
    const currentGame: any = this.filter.getSingle(id)[0];
    console.log(currentGame);
    this.addCardInfo(currentGame);
    this.ImgExpansion();
  }

  addCardInfo(game?: any) {
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
      if (breadTheme != undefined) breadTheme.innerHTML = `${game.categories[0]}`;
      const breadBrand = document.getElementById("bread-brand");
      if (breadBrand != undefined) breadBrand.innerHTML = `${game.publishers}`;
      const breadName = document.getElementById("bread-name");
      if (breadName != undefined) breadName.innerHTML = `${game.name}`;

      const backgroundImg = document.querySelector<HTMLElement>(".item");
      if (backgroundImg != undefined) {
        backgroundImg.style.background = `linear-gradient( rgba(0, 0, 0, 0.80) 100%, rgba(0, 0, 0, 0.5)100%), url(${game.images.background})`;
        backgroundImg.style.backgroundSize = `cover`;
        backgroundImg.style.backgroundPosition = `center`;
      }
      const nameLogo = document.getElementById("name-logo");
      if (nameLogo != undefined)
        nameLogo.innerHTML = `<img src="${game.images.logo}" alt="${game.name}">`;
      const mainImg = document.querySelector<HTMLElement>(".main-img");
      if (mainImg != undefined)
        mainImg.innerHTML = `<img src="${game.images.box}" alt="${game.name}">`;
      const newImg = document.querySelector<HTMLElement>(".small-img");
      if (newImg != undefined)
        newImg.innerHTML = `<img src="${game.images.photo1}" alt="${game.name}"><img src="${game.images.photo2}" alt="${game.name}">`;

      const allInfo = document.querySelector<HTMLElement>(".characteristic");
      if (allInfo != undefined) {
        for (let i = 0; i < info.length; i++) {
          const detailDiv = `
          <div class="detail">
            <div class="">${info[i].text}</div>
            <div class="">${info[i].info}</div>
          </div>`
          allInfo.insertAdjacentHTML("beforeend", detailDiv);
        }
      }
      const descText = document.getElementById("desc-text");
      if (descText != undefined) descText.innerHTML = `${game.description}`;
    } else {
      // Делаем запрос на сервер
      // Добавляем информацию в поля
    }
  }

  ImgExpansion() {
    const modal = document.querySelector<HTMLElement>(".modal-container");
    const openImg = document.querySelector<HTMLElement>(".all-img");
    const span = document.querySelector<HTMLElement>(".close");

    if (openImg != null) {
      openImg.addEventListener("click", (e: Event) => {
        console.log(e);
        const urlImg = e.target as HTMLImageElement;
        const modalImg = document.querySelector<HTMLElement>(".modal-img");
        console.log(urlImg);
        if (modal != null) {
          modal.style.display = "block";
          if (modalImg != undefined) modalImg.innerHTML = `<img src="${urlImg.src}" alt="${urlImg.alt}">`;
        }
      });
    }


    if (span != null) {
      span.onclick = function () {
        if (modal != null) {
          modal.style.display = "none";
        }
      };
    }
    window.onclick = function (event) {
      if (event.target == modal && modal != null) {
        modal.style.display = "none";
      }
    };
  }

  addListeners() {
    // добавляем обработчики
  }

}

export default Product;
