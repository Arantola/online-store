import { getElementBySelector } from "./types/types";

export default class Cart {
  constructor(
    public main: HTMLElement = getElementBySelector("#main"),
    public templateCart: any = getElementBySelector("#cart"),
    public itemsOnPage = 6,
    public cart = []
  ) {}

  renderPage() {
    CreateModal();
    Validation();
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
      console.log(123);
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
    if (parts[1]) {
      if (parts[0].length <= 3 || parts[1].length <= 3) {
        note.style.display = "block";
        valName = false;
      } else {
        note.style.display = "none";
        valName = true;
      }
    }
    btnActive();
    return value;
  }

  function inpPhone_format(value: string) {
    const v = value;
    const note = document.querySelectorAll<HTMLElement>(".input-error")[1];
    if (v.length <= 9) {
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

  function inpAddress_format(value: any) {
    const v = value;
    const parts = v.split(" ");
    const note = document.querySelectorAll<HTMLElement>(".input-error")[2];
    if (parts[2]){
      if (
        parts[0].length <= 5 ||
        parts[1].length <= 5 ||
        parts[2].length <= 5
      ) {
        note.style.display = "block";
        valAddress = false;
      } else {
        note.style.display = "none";
        valAddress = true;
      }
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

  // // function cardNumber(event) {
  // //   if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false
  // // }

  function cardData_format(value: string) {
    const v = value.replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{2,4}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2));
    }
    if (parts.length) {
      if (Number(parts[0]) > 12) {
        parts.splice(0, 1);
      }
      // if(parts[1] > 32) {
      //   parts.splice(1,1)
      // }
      if (parts.join("").length == 4) {
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
  // // function cardData(event) {
  // //   if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
  // // }

  function cardSecurity_format(value: string | any[]) {
    if (value.length == 3) {
      valSecurity = true;
    } else {
      valSecurity = false;
    }
    btnActive();
    return value;
  }
  // // function securityCode(event) {
  // //   if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
  // // }

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
}
