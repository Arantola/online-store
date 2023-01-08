import Filter from "./Filter";
import Query from "./Query";
import { getElementBySelector, IGame } from "./types/types";

interface Promo {
  name: string;
  discount: number;
  used: boolean;
}

export default class Cart {
  constructor(public filter: Filter, public query: Query) {}

  renderPage() {
    CreateModal();
    Validation();
    this.filter.updateCartDisplay();
    this.filter.updateTotalCost();

    this.query.getQueryFromURL();
    this.setPageCount();
    this.setCurrentPageDisplay();
    this.setOnPageDisplay();
    this.listenPageNumber();
    this.listenOnPageCount();
    this.drawCards(this.getOnePageCollection());
  }

  setPageCount() {
    const length = this.filter.getCart().length;
    this.query.params.pages = String(
      Math.ceil(length / +this.query.params.items)
    );
  }

  setCurrentPageDisplay() {
    getElementBySelector("#page-number").innerText = this.query.params.page;
  }

  setOnPageDisplay() {
    getElementBySelector("#on-page").innerText = this.query.params.items;
  }

  listenPageNumber() {
    getElementBySelector("#page-number-interface").addEventListener(
      "click",
      (e) => {
        if (e.target instanceof HTMLButtonElement) {
          if (e.target.getAttribute("name") === "less") {
            if (+this.query.params.page > 1) {
              this.query.setParam("page", `${+this.query.params.page - 1}`);
              this.setCurrentPageDisplay();
            }
          }
          if (e.target.getAttribute("name") === "more") {
            if (+this.query.params.page < +this.query.params.pages) {
              this.query.setParam("page", `${+this.query.params.page + 1}`);
              this.setCurrentPageDisplay();
            }
          }
        }
        this.drawCards(this.getOnePageCollection());
      }
    );
  }

  listenOnPageCount() {
    getElementBySelector("#on-page-interface").addEventListener(
      "click",
      (e) => {
        if (e.target instanceof HTMLButtonElement) {
          if (e.target.getAttribute("name") === "less") {
            if (+this.query.params.items > 1) {
              this.query.setParam("items", `${+this.query.params.items - 1}`);
              this.setOnPageDisplay();
            }
          }
          if (e.target.getAttribute("name") === "more") {
            if (+this.query.params.items < this.filter.getCart().length) {
              this.query.setParam("items", `${+this.query.params.items + 1}`);
              this.setOnPageDisplay();
            }
          }
          this.setPageCount();

          this.query.setParam("page", this.query.params.pages);
          getElementBySelector("#page-number").innerText =
            this.query.params.pages;
        }
        this.drawCards(this.getOnePageCollection());
      }
    );
  }

  getOnePageCollection() {
    const items: Array<IGame> = this.filter.getCart();
    const currentPage = +this.query.params.page;
    const onPage = +this.query.params.items;
    return items.slice(currentPage * onPage - onPage, currentPage * onPage);
  }

  drawCards(collection: Array<IGame>) {
    const cartList = getElementBySelector("#cart-items");
    cartList.innerHTML = "";
    if (collection.length === 0) {
      cartList.classList.add("cart_no-items");
    } else {
      cartList.classList.remove("cart_no-items");
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
        localStorage.setItem("cart", "{}");
        window.location.href = "/catalog";
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

function TotalProduct() {
  const curCart = JSON.parse(localStorage.getItem("cart") as string);
  const count = Object.keys(curCart).length;
  getElementBySelector(".total-product").innerText = String(count);
}

function promoCode(value: string) {
  const promo: Promo[] = [
    {
      name: "sell",
      discount: 15,
      used: false,
    },
    {
      name: "RSS",
      discount: 10,
      used: false,
    },
  ];
  
  const promBtn = document.querySelector<HTMLElement>(".act-promo");
  const usedPromoDiv = document.querySelector<HTMLElement>(".used-promo");
  const text = <HTMLInputElement>document.getElementById("promocode");

  if (promBtn != null && usedPromoDiv != null) {
    text.addEventListener("input", () => {
      for (let i = 0; i < promo.length; i++) {
        if (text.value === promo[i].name) {
          promBtn.classList.add("active");
          break;
        } else {
          promBtn.classList.remove("active");
        }
      }
    });

    promBtn.onclick = function () {
      if (Number(value) > 0) {
        for (let i = 0; i < promo.length; i++) {
          if (text.value === promo[i].name && !promo[i].used) {
            promo[i].used = true;
            const createPromo = `<div class="used-promo__info">Used ${promo[i].name}:<br> discount ${promo[i].discount} <button class="btn-del">del</button></div>`;
            usedPromoDiv.insertAdjacentHTML("beforeend", createPromo);
            getElementBySelector(".total").style.textDecoration =
              "line-through";
            getElementBySelector(".total-discount").style.display = "block";
            getElementBySelector(".total-dicount-cost__cart").innerText =
              String(countDisc(Number(value), promo));
            text.value = "";
          }
        }
      }
    };

    const containerPromo = document.querySelector<HTMLElement>(".used-promo");
    containerPromo?.addEventListener("click", function (evt) {
      if (
        evt.target != null &&
        (evt.target as HTMLElement).className == "btn-del"
      ) {
        console.log((evt.target as HTMLElement).parentElement);
        const inText = String(
          (evt.target as HTMLElement).parentElement?.textContent
        );
        for (let i = 0; i < promo.length; i++) {
          if (promo[i].name == inText.substring(5, 5 + promo[i].name.length)) {
            promo[i].used = false;
            console.log(promo[i].name);
            (evt.target as HTMLElement).parentElement?.remove();
            getElementBySelector(".total-dicount-cost__cart").innerText =
              String(countDisc(Number(value), promo));
            if (countDisc(Number(value), promo) === Number(value)) {
              getElementBySelector(".total").style.textDecoration ="none";
              getElementBySelector(".total-discount").style.display = "none";
            }
          }
        }
      }
    });
  }
}

function countDisc(value: number, promo: Promo[]) {
  let allDis = 0;
  for (let i = 0; i < promo.length; i++) {
    if (promo[i].used){
      allDis += promo[i].discount;
    }
  }
  return Math.round((value - (value / 100) * allDis) * 100) / 100;
}
