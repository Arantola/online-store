export default class Cart {
  constructor(cart) {
    this.section = document.getElementById('items-section');
    this.template = document.getElementById('product-card');
    this.itemsOnPage = 10;
    this.cart = cart;
  }

  renderPage() {
    this.getAndPlaceData(this.formURL());
  }
}