import Filter from "./Filter";
import { getElementBySelector } from "./types/types";

interface Promo {
  name: string;
  discount: number;
  used: boolean;
}

export default class Cart {
  constructor(public filter: Filter) {}
  renderPage() {
    CreateModal();
    Validation();
    this.filter.updateCartDisplay();
    this.filter.updateTotalCost();
    this.filter.cartTotalCost();
    TotalProduct();
    promoCode(this.filter.cartTotalCost());
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

export { CalculateDisc, checkString };
