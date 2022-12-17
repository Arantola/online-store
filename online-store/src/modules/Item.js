export default class Item {
  constructor(item) {
    this.section = document.getElementById('items-section');
    this.template = document.getElementById('product-card');
    this.item = item;
  }

  renderPage() {
    this.getAndPlaceData(this.formURL());
  }
}