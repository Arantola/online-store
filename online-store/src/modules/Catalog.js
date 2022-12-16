export default class Catalog {
  constructor() {
    this.section = document.getElementById('product-list');
    this.template = document.getElementById('product-card');
    this.itemsOnPage = 10;
    this.itemsSkip = 0;
    this.browserURL = 'http://localhost:8080/';
    this.apiUrl = new URL('https://api.boardgameatlas.com/');
  }

  renderPage() {
    this.getAndPlaceData(this.formURL());
  }

  formURL(origin='https://api.boardgameatlas.com/', pathname='/api/search', query='') {
    // this.apiUrl.origin = origin;
    this.apiUrl.pathname = pathname;
    // (query) ? this.apiUrl.searchParams.append([query[0], query[1]]) : '';
    this.apiUrl.searchParams.append('limit', this.itemsOnPage);
    this.apiUrl.searchParams.append('skip', this.itemsSkip);
    this.apiUrl.searchParams.append('client_id', 'XZAmoxZ2qA');
    console.log(this.apiUrl);
    return this.apiUrl;
  }

  getAndPlaceData(url, errorMsg = 'Something went wrong') {
    return fetch(url).then( response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
      }).then( data => this.drawCards(data.games) );
  };

  drawCards(items) {
    this.section.innerHTML = '';
    items.forEach(item => {
      const clone = this.template.content.cloneNode(true);

      clone.querySelector("img").src = `${item.image_url}`;
      clone.querySelector(".name").textContent = `${item.name}`;;
      clone.querySelector(".small-di").textContent = `${item.description_preview}`;
      clone.querySelector("button").textContent = `${item.price_text}`;
  
      this.section.appendChild(clone);
    });
  }

  setItemsOnPage(n) {
    itemsOnPage = n;
  }

}