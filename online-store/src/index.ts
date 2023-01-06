import "./assets/styles/_reset.css";
import "./assets/styles/_404.css";
import "./assets/styles/_catalog.css";
import "./assets/styles/_cart.css";
import "./assets/styles/_description.css";
import "./assets/styles/_all.css";
import "./assets/styles/_card.css";
import "./assets/styles/_modal.css";
import App from "./modules/App";

import rs_school from "./assets/icons/rs_school_js.svg";

const app = new App();
app.init();

const RssLogo = document.querySelector<HTMLElement>(".link_RSSchool");
if (RssLogo != undefined)
  RssLogo.innerHTML = `<img src="${rs_school}" alt="rs_school">`;
