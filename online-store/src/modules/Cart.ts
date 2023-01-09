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
    this.filter.cartTotalCost();
    this.filter.updateCartDisplayCart();
    promoCode(this.filter.cartTotalCost());

    this.query.getQueryFromURL();
    this.setPageCount();
    this.setCurrentPageDisplay();
    this.setOnPageDisplay();
    this.listenPageNumber();
    this.listenOnPageCount();
    this.listenCards();
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

  listenCards() {
    getElementBySelector("#cart-items").addEventListener("click", (e) => {
      if (e.target instanceof HTMLButtonElement) {
        if (e.target.parentElement?.parentElement) {
          const curCart = JSON.parse(localStorage.getItem("cart") as string);
          const cardInterface: HTMLElement = e.target.parentElement.parentElement;
          const displayCount = getElementBySelector(".card__count-display", cardInterface);
          const displayStock: HTMLElement = getElementBySelector(".card__stock", cardInterface);
          const totalPrice: HTMLElement = getElementBySelector(".card__total-price-display", cardInterface);

          if (e.target.getAttribute("name") === "more") {
            if (+displayCount.innerText < +displayStock.innerText) {
              displayCount.innerText = `${+displayCount.innerText + 1}`;
              curCart[`${cardInterface.id}`] += 1;
              localStorage.setItem("cart", JSON.stringify(curCart));

              totalPrice.innerText = `${(
                +(cardInterface.getAttribute("price") as string) *
                curCart[`${cardInterface.id}`]
              ).toFixed(2)} $`;
            }
          }
          if (e.target.getAttribute("name") === "less") {
            if (+displayCount.innerText > 1) {
              displayCount.innerText = `${+displayCount.innerText - 1}`;
              curCart[`${cardInterface.id}`] -= 1;
              localStorage.setItem("cart", JSON.stringify(curCart));

              totalPrice.innerText = `${(
                +(cardInterface.getAttribute("price") as string) *
                curCart[`${cardInterface.id}`]
              ).toFixed(2)} $`;
            } else if (+displayCount.innerText === 1) {
              delete curCart[`${cardInterface.id}`];
              localStorage.setItem("cart", JSON.stringify(curCart));
              this.drawCards(this.getOnePageCollection());
            }
          }
          this.filter.updateTotalCost();
          this.filter.updateCartDisplay();
          this.filter.cartTotalCost();
          this.filter.updateCartDisplayCart();
          promoCode(this.filter.cartTotalCost());
        }
      }
    });
  }

  getOnePageCollection() {
    const items: Array<IGame> = this.filter.getCart();
    const currentPage = +this.query.params.page;
    const onPage = +this.query.params.items;
    return items.slice(currentPage * onPage - onPage, currentPage * onPage);
  }

  drawCards(collection: Array<IGame>) {
    const cartList = getElementBySelector("#cart-items");
    const cartArray = this.filter.getCart();
    const curCart = JSON.parse(localStorage.getItem("cart") as string);
    cartList.innerHTML = "";
    if (collection.length === 0) {
      cartList.classList.add("cart_no-items");
    } else {
      cartList.classList.remove("cart_no-items");
      collection.forEach((item: IGame) => {
        const clone: Node =
          (
            document.getElementById(
              "card-interface-for-cart"
            ) as HTMLTemplateElement
          ).content.cloneNode(true) || null;

        if (clone instanceof DocumentFragment) {
          getElementBySelector(".card__index", clone).innerText = `${
            cartArray.findIndex((elem: IGame) => {
              return elem.id === item.id;
            }) + 1
          }`;

          (
            getElementBySelector(".card__link", clone) as HTMLLinkElement
          ).href = `/product?id=${item.id}`;
          (
            getElementBySelector(".card__img", clone) as HTMLImageElement
          ).src = `${
            item.images.box
              ? item.images.box
              : "https://w7.pngwing.com/pngs/380/764/png-transparent-paper-box-computer-icons-symbol-random-icons-miscellaneous-angle-text-thumbnail.png"
          }`;
          (
            getElementBySelector(".card__img_logo", clone) as HTMLImageElement
          ).src = item.images.logo;
          (
            getElementBySelector(".card__img_background", clone) as HTMLImageElement
          ).src = `${item.images.background}`;
          (
            getElementBySelector(".card__img", clone) as HTMLImageElement
          ).alt = `${item.name}`;

          getElementBySelector(".card__name", clone).textContent = `${item.name}`;
          getElementBySelector(".card__price", clone).textContent = `${item.price} $`;
          getElementBySelector(".card__description", clone).textContent = `${item.description}`;

          getElementBySelector(".card", clone).classList.add("card_wide");
          getElementBySelector(".card__img", clone).classList.add("card__img_wide");
          getElementBySelector(".card__img_logo", clone).style.display = "block";
          getElementBySelector(".card__img_background", clone).style.display = "block";
          getElementBySelector(".card__img-wrapper", clone).classList.add("card__img-wrapper_wide");
          getElementBySelector(".card__info", clone).classList.add("card__info_wide");
          getElementBySelector(".card__name", clone).classList.add("card__name_wide");
          getElementBySelector(".card__description", clone).style.display = "block";
          getElementBySelector(".card__button_cart", clone).style.display = "none";
          const cardInterface = getElementBySelector(".card__interface", clone);
          cardInterface.id = `${item.id}`;
          cardInterface.setAttribute("price", `${item.price}`);

          getElementBySelector(".card__total-price-display", cardInterface).innerText = `${curCart[`${item.id}`] * +item.price} $`
          getElementBySelector(".card__stock", clone).textContent= `${item.store}`;
          getElementBySelector(".card__count-display", cardInterface).innerText = curCart[`${item.id}`];
          
          cartList.appendChild(clone);
        }
      });
    }
  }
}

function CreateModal() {
  const modal = document.querySelector<HTMLElement>(".modal-container");
  const btn = document.getElementById("buyBtn");
  const span = document.querySelector<HTMLElement>(".close");

  if (localStorage.getItem("modal") == "true") {
    if (modal) modal.style.display = "block";
    localStorage.setItem("modal", "{}");
  }

  if (btn != null) {
    btn.onclick = function () {
      if (modal) modal.style.display = "block";
    };
  }
  if (span != null) {
    span.onclick = function () {
      if (modal) modal.style.display = "none";
    };
  }
  window.onclick = function (event) {
    if (event.target == modal && modal) {
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
    if (checkString(parts)) {
      note.style.display = "none";
      valAddress = true;
    } else {
      note.style.display = "block";
      valAddress = false;
    }
    btnActive();
    return value;
  }

  function inpEmail_format(value: string) {
    const v = CheckEmail(value);
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
    const parts = TakeNumber(v);
    const note = document.querySelector<HTMLElement>(".card-error__number");
    if (note) {
      if (parts.join("").length == 16) {
        note.style.display = "none";
        valNumber = true;
      } else {
        note.style.display = "block";
        valNumber = false;
      }
      btnActive();
    }
  }

  function cardData_format(value: string) {
    const v = value.replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{2,4}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    const note = document.querySelector<HTMLElement>(".card-error__data");
    for (let i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2));
    }
    if (note) {
      if (parts.join("").length === 4) {
        note.style.display = "none";
        valData = true;
      } else {
        note.style.display = "block";
        valData = false;
      }
      btnActive();
      return parts.join("/");
    } else {
      return value;
    }
  }

  function cardSecurity_format(value: string) {
    const note = document.querySelector<HTMLElement>(".card-error__cvv");
    if (note) {
      if (value.length === 3) {
        note.style.display = "none";
        valSecurity = true;
      } else {
        note.style.display = "block";
        valSecurity = false;
      }
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
        const tyText = document.querySelector<HTMLElement>(".modal-content");
        if (tyText) {
          tyText.innerHTML = "order is processed";
          setTimeout(() => (window.location.href = "/catalog"), 3000);
        }
      } else {
        btn.classList.remove("active");
      }
    }
  }

  const makeBtnActive = [false, false, false, false, false, false, false];
  const inpName = <HTMLInputElement>document.getElementById("inpName");
  inpName?.addEventListener("input", () => {
    const v = inpName.value.replace(/\s[^A-Za-z]/g, "");
    inpName.value = v;
    makeBtnActive[0] = true;
    if (v == "") makeBtnActive[0] = false;
    fMakeBtnActive();
  });

  const inpPhone = <HTMLInputElement>document.getElementById("inpPhone");
  inpPhone?.addEventListener("input", () => {
    const v = inpPhone.value.replace(/[^0-9.]+/g, "");
    inpPhone.value = v;
    if (v.length > 0 && v[0] !== "+") {
      inpPhone.value = v.replace(/^/, "+");
    }
    makeBtnActive[1] = true;
    if (v == "") makeBtnActive[1] = false;
    fMakeBtnActive();
  });

  const inpAddress = <HTMLInputElement>document.getElementById("inpAddress");
  inpAddress?.addEventListener("input", () => {
    makeBtnActive[2] = true;
    if (inpName.value == "") makeBtnActive[2] = false;
    fMakeBtnActive();
  });

  const inpEmail = <HTMLInputElement>document.getElementById("inpAddress");
  inpEmail?.addEventListener("input", () => {
    makeBtnActive[3] = true;
    if (inpName.value == "") makeBtnActive[3] = false;
    fMakeBtnActive();
  });

  const cardNumber = <HTMLInputElement>document.getElementById("cardNumber");
  cardNumber?.addEventListener("input", () => {
    const v = cardNumber.value.replace(/[^0-9.]+/g, "");
    cardNumber.value = v;
    const matches = v.match(/\d{1,4}/g);
    if (matches) cardNumber.value = matches.join(" ");
    for (let i = 0; i < cardimg.length; i++) {
      const re = checkRegex(cardimg[i].regex);
      const cardImg = document.querySelector<HTMLElement>(".card-num-img");
      console.log(RegNotNull(re, cardNumber.value));
      if (RegNotNull(re, cardNumber.value) != null) {
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
    makeBtnActive[4] = true;
    if (inpName.value == "") makeBtnActive[4] = false;
    fMakeBtnActive();
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
    makeBtnActive[5] = true;
    if (inpName.value == "") makeBtnActive[5] = false;
    fMakeBtnActive();
  });

  const cardSecurity = <HTMLInputElement>(
    document.getElementById("cardSecurity")
  );
  cardSecurity?.addEventListener("input", () => {
    const v = cardSecurity.value.replace(/[^0-9.]+/g, "");
    cardSecurity.value = v;
    makeBtnActive[6] = true;
    if (inpName.value == "") makeBtnActive[6] = false;
    fMakeBtnActive();
  });

  function fMakeBtnActive() {
    const btn = document.querySelector<HTMLElement>(".order-btn");
    if (btn)
      if (
        Array.from(new Set(makeBtnActive))[0] &&
        Array.from(new Set(makeBtnActive)).length == 1
      ) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
  }
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
            promBtn.classList.remove("active");
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
        const inText = String(
          (evt.target as HTMLElement).parentElement?.textContent
        );
        for (let i = 0; i < promo.length; i++) {
          if (promo[i].name == inText.substring(5, 5 + promo[i].name.length)) {
            promo[i].used = false;
            (evt.target as HTMLElement).parentElement?.remove();
            getElementBySelector(".total-dicount-cost__cart").innerText =
              String(countDisc(Number(value), promo));
            if (countDisc(Number(value), promo) === Number(value)) {
              getElementBySelector(".total").style.textDecoration = "none";
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
    if (promo[i].used) {
      allDis += promo[i].discount;
    }
  }
  return CalculateDisc(value, allDis);
}
function CalculateDisc(value: number, allDis: number) {
  return Math.round((value - (value / 100) * allDis) * 100) / 100;
}
function checkString(parts: string[]) {
  let count = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length >= 5) {
      count += 1;
    }
  }
  if (parts.length == count && parts.length >= 3) {
    return true;
  }
  return false;
}
function TakeNumber(value: string) {
  const matches = value.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  return parts;
}
function RegNotNull(re: RegExp, val: string) {
  return val.match(re);
}
function checkRegex(re: string) {
  return new RegExp(re);
}
function CheckEmail(val: string) {
  return val;
}

export {
  CalculateDisc,
  checkString,
  TakeNumber,
  checkRegex,
  RegNotNull,
  CheckEmail,
};
