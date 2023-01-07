import Filter from "./Filter";
import { getElementBySelector, IGame } from "./types/types";

export default class Cart {
  constructor(
    public filter: Filter,
    private pageCount = 5,
    private itemsOnPage = 5
  ) {}

  renderPage() {
    CreateModal();
    Validation();
    this.filter.updateCartDisplay();
    this.filter.updateTotalCost();
    this.drawCards(this.getOnePageCollection());
    this.listenPageNumber();
    this.listenOnPageCount();
  }

  // combine with listenOnPageCount() DRY
  listenPageNumber() {
    const pageInterface = getElementBySelector("#page-number-interface");
    const display = getElementBySelector("#page-number", pageInterface);
    let currentPage = +display.innerText;

    pageInterface.addEventListener("click", (e) => {
      if (e.target instanceof HTMLButtonElement) {
        if (e.target.getAttribute("name") === "less") {
          display.innerText = `${currentPage === 1 ? 1 : --currentPage}`;
        }
        if (e.target.getAttribute("name") === "more") {
          display.innerText = `${currentPage === this.pageCount ? this.pageCount : ++currentPage}`;
        }
      }
      this.drawCards(this.getOnePageCollection());
    });
  }

  // combine with listenPageNumber() DRY
  listenOnPageCount() {
    const onPageInterface = getElementBySelector("#on-page-interface");
    const display = getElementBySelector("#on-page", onPageInterface);
    let currentOnPage = +display.innerText;

    onPageInterface.addEventListener("click", (e) => {
      if (e.target instanceof HTMLButtonElement) {
        if (e.target.getAttribute("name") === "less") {
          display.innerText = `${currentOnPage === 1 ? 1 : --currentOnPage}`;
        }
        if (e.target.getAttribute("name") === "more") {
          display.innerText = `${currentOnPage === this.itemsOnPage ? this.itemsOnPage : ++currentOnPage}`;
        }
      }
      this.drawCards(this.getOnePageCollection());
    });
  }

  getOnePageCollection() {
    const items: Array<IGame> = this.filter.getCart();

    const currentPage = +(getElementBySelector("#page-number") as HTMLSpanElement).innerText
    const onPage = +(getElementBySelector("#on-page") as HTMLSpanElement).innerText

    return items.slice(currentPage * onPage - onPage, currentPage * onPage);
  }

  drawCards(collection: Array<IGame>) {
    if (collection) {
      const cartList = getElementBySelector("#cart-items");
      cartList.innerHTML = "";

      collection.forEach((item: IGame) => {
        const outer: Node = getElementBySelector("#card-interface-for-cart");

        if (outer instanceof HTMLTemplateElement) {
          const card = document.importNode(outer.content, true);

          // Example
          // var outer = document.querySelector('#outer');
          // var outerClone = document.importNode(outer.content, true);
          // var check = outerClone.querySelector('template');
          // var innerClone = document.importNode(check.content,true);
          // outerClone.appendChild(innerClone);
          // var tDiv = document.querySelector('#temp');
          // tDiv.appendChild(outerClone);

          if (card instanceof DocumentFragment) {
            (
              getElementBySelector(".card__link", card) as HTMLLinkElement
            ).href = `/product?id=${item.id}`;
            (
              getElementBySelector(".card__img", card) as HTMLImageElement
            ).src = `${
              item.images.box
                ? item.images.box
                : "https://w7.pngwing.com/pngs/380/764/png-transparent-paper-box-computer-icons-symbol-random-icons-miscellaneous-angle-text-thumbnail.png"
            }`;
            (
              getElementBySelector(".card__img_logo", card) as HTMLImageElement
            ).src = item.images.logo;
            (
              getElementBySelector(".card__img_background", card) as HTMLImageElement
            ).src = `${item.images.background}`;
            (
              getElementBySelector(".card__img", card) as HTMLImageElement
            ).alt = `${item.name}`;
            (
              getElementBySelector(".card__name", card) as HTMLElement
            ).textContent = `${item.name}`;
            (
              getElementBySelector(".card__price", card) as HTMLElement
            ).textContent = `${item.price} $`;
            (
            getElementBySelector(".card__button_cart", card) as HTMLButtonElement
            ).id = `${item.id}`;
            (
              getElementBySelector(".card__button_cart", card) as HTMLButtonElement
            ).innerText = "Add to cart";
            (
              getElementBySelector(".card__description", card) as HTMLElement
            ).innerText = `${item.description}`;

            getElementBySelector(".card", card).classList.add("card_wide");
            getElementBySelector(".card__img", card).classList.add("card__img_wide");
            getElementBySelector(".card__img_logo", card).style.display = "block";
            getElementBySelector(".card__img_background", card).style.display = "block";
            getElementBySelector(".card__img-wrapper", card).classList.add("card__img-wrapper_wide");
            getElementBySelector(".card__info", card).classList.add("card__info_wide");
            getElementBySelector(".card__name", card).classList.add("card__name_wide");
            getElementBySelector(".card__description", card).style.display = "block";
            getElementBySelector(".card__button_cart", card).classList.add("card__button_cart_wide");

            cartList.appendChild(card);
          }
        }
      });
    }
  }
}

function CreateModal() {
  const modal = document.querySelector<HTMLElement>(".modal-container");
  const btn = document.getElementById("buyBtn");
  const span = document.querySelector<HTMLElement>(".close");

  if (btn != null) {
    btn.onclick = function () {
      if (modal != null) {
        modal.style.display = "block";
      }
    };
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
function Validation() {
  const cardimg = [
    {
      regex: "^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}",
      cardtype: "discover",
      img: "https://cdn2.downdetector.com/static/uploads/c/300/dfa84/Discover-logo.png",
    },
    {
      regex: "^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}",
      cardtype: "mastercard",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png",
    },
    {
      regex: "^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}",
      cardtype: "maestro",
      img: "https://maintransport.ru/assets/images/articles/Maestro_logo.png",
    },
    {
      regex: "^4\\d{0,15}",
      cardtype: "visa",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/1200px-Visa_2021.svg.png",
    },
    {
      regex: "^62\\d{0,14}",
      cardtype: "unionpay",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/1200px-UnionPay_logo.svg.png",
    },
  ];

  let valName = false;
  let valPhone = false;
  let valAddress = false;
  let valEmail = false;
  let valNumber = false;
  let valData = false;
  let valSecurity = false;

  const createbtn = document.getElementById("btnOrder");

  if (createbtn != null) {
    createbtn.addEventListener("click", () => {
      const inpName = (document.getElementById("inpName") as HTMLInputElement)
        .value;
      const inpPhone = (document.getElementById("inpPhone") as HTMLInputElement)
        .value;
      const inpAddress = (
        document.getElementById("inpAddress") as HTMLInputElement
      ).value;
      const inpEmail = (document.getElementById("inpEmail") as HTMLInputElement)
        .value;
      const cardNumber = (
        document.getElementById("cardNumber") as HTMLInputElement
      ).value;
      const cardData = (document.getElementById("cardData") as HTMLInputElement)
        .value;
      const cardSecurity = (
        document.getElementById("cardSecurity") as HTMLInputElement
      ).value;
      inName_format(inpName);
      inpPhone_format(inpPhone);
      inpAddress_format(inpAddress);
      inpEmail_format(inpEmail);
      cardNumber_format(cardNumber);
      cardData_format(cardData);
      cardSecurity_format(cardSecurity);
    });
  }
  function inName_format(value: string) {
    const v = value;
    const parts = v.split(" ");
    const note = document.querySelectorAll<HTMLElement>(".input-error")[0];
    if (parts[0].length < 3 || parts[1].length < 3) {
      note.style.display = "block";
      valName = false;
    } else {
      note.style.display = "none";
      valName = true;
    }
    btnActive();
    return value;
  }

  function inpPhone_format(value: string) {
    const v = value;
    const note = document.querySelectorAll<HTMLElement>(".input-error")[1];
    if (v.length < 9) {
      note.style.display = "block";
      valPhone = false;
    } else {
      note.style.display = "none";
      valPhone = true;
    }
    if (value[0] !== "+" && value.length > 0) {
      return "+" + value;
    }
    btnActive();
    return value;
  }

  function inpAddress_format(value: string) {
    const v = value;
    const parts = v.split(" ");
    const note = document.querySelectorAll<HTMLElement>(".input-error")[2];
    if (parts[0].length < 5 || parts[1].length < 5 || parts[2].length < 5) {
      note.style.display = "block";
      valAddress = false;
    } else {
      note.style.display = "none";
      valAddress = true;
    }
    btnActive();
    return value;
  }

  function inpEmail_format(value: string) {
    const v = value;
    const parts = v.split(
      /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    );
    const note = document.querySelectorAll<HTMLElement>(".input-error")[3];
    if (!parts[5]) {
      note.style.display = "block";
      valEmail = false;
    } else {
      note.style.display = "none";
      valEmail = true;
    }
    btnActive();
    return value;
  }

  function cardNumber_format(value: string) {
    const v = value.replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      if (parts.join("").length == 16) {
        valNumber = true;
      } else {
        valNumber = false;
      }
      btnActive();
      return parts.join(" ");
    } else {
      return value;
    }
  }

  function cardData_format(value: string) {
    const v = value.replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{2,4}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2));
    }
    if (parts.length) {
      if (Number(parts[0]) > 12) {
        parts.splice(0, 1);
      }
      if (parts.join("").length === 4) {
        valData = true;
      } else {
        valData = false;
      }
      btnActive();
      return parts.join("/");
    } else {
      return value;
    }
  }

  function cardSecurity_format(value: string) {
    if (value.length === 3) {
      valSecurity = true;
    } else {
      valSecurity = false;
    }
    btnActive();
    return value;
  }

  function btnActive() {
    const btn = document.querySelector<HTMLElement>(".order-btn");
    if (btn != null) {
      if (
        valName &&
        valPhone &&
        valAddress &&
        valEmail &&
        valNumber &&
        valData &&
        valSecurity
      ) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  }

  const inpName = <HTMLInputElement>document.getElementById("inpName");
  inpName?.addEventListener("input", () => {
    const v = inpName.value.replace(/\s[^A-Za-z]/g, "");
    inpName.value = v;
  });

  const inpPhone = <HTMLInputElement>document.getElementById("inpPhone");
  inpPhone?.addEventListener("input", () => {
    const v = inpPhone.value.replace(/[^0-9.]+/g, "");
    inpPhone.value = v;
    if (v.length > 0 && v[0] !== "+") {
      inpPhone.value = v.replace(/^/, "+");
    }
  });

  const cardNumber = <HTMLInputElement>document.getElementById("cardNumber");
  cardNumber?.addEventListener("input", () => {

    const v = cardNumber.value.replace(/[^0-9.]+/g, "");
    cardNumber.value = v;
    const matches = v.match(/\d{1,4}/g);
    if (matches) cardNumber.value = matches.join(" ");
    for (let i = 0; i < cardimg.length; i++) {
      const re = new RegExp(cardimg[i].regex);
      const cardImg = document.querySelector<HTMLElement>(".card-num-img");
      if (cardNumber.value.match(re) != null) {
        if (cardImg) {
          cardImg.remove();
          cardNumber.insertAdjacentHTML(
            "beforebegin",
            `<img class="card-num-img" src=${cardimg[i].img} alt=${cardimg[i].cardtype}>`
          );
        }
        break;
      } else {
        if (cardImg) {
          cardImg.remove();
          cardNumber.insertAdjacentHTML(
            "beforebegin",
            `<img class="card-num-img" src="https://static.thenounproject.com/png/524369-200.png" alt="unknown">`
          );
        }
      }
    }
  });

  const cardData = <HTMLInputElement>document.getElementById("cardData");
  cardData?.addEventListener("input", () => {
    const v = cardData.value.replace(/[^0-9.]+/g, "");
    cardData.value = v;
    const matches = v.match(/\d{1,2}/g);
    if (matches) {
      if (Number(matches[0]) > 12) {
        matches[0] = "12";
      }
      cardData.value = matches.join("/");
    }
  });

  const cardSecurity = <HTMLInputElement>(
    document.getElementById("cardSecurity")
  );
  cardSecurity?.addEventListener("input", () => {
    const v = cardSecurity.value.replace(/[^0-9.]+/g, "");
    cardSecurity.value = v;
  });
}
