const cart = `
<div class="container">
  <div class="cart-lists">
      <div class="cart-info">
          <div>Product in cart</div>
          <div class="cart-page">
              <span>PAGE:</span>
              <button><</button>
              <span>1</span>
              <button>></button>
          </div>
      </div>
      <div class="cart-items">
          <div class="cart-item-container">
              <div class="cart-item">
                  <div class="item-id">1</div>
                  <div class="item-info">
                      <img src="../../assets/images/red-dragon.jpg" alt="game name">
                      <div class="item-description">
                          <h3 class="name">Bobi story</h3>
                          <hr>
                          <div class="description">A baby pig is almost killed because of his status – he is the smallest pig that was born and he is considered to be useless and of no value. The pig is saved by a little girl called Fern Arable. She adopts the pig and takes care of it. She gives him the name Wilbur.</div>
                          <div class="other">
                              <div class="brand">Brand: DDAAS</div>
                              <div class="theme">Theme: cry</div>
                          </div>
                      </div>
                  </div>
                  <div class="stock-info">
                      <div class="item-num">
                          <button class="add">+</button>
                          <span class="item-amount">1</span>
                          <button class="put-away">-</button>
                      </div>
                      <div class="item-price">151$</div>
                  </div>
              </div>
          </div>
          <div class="cart-item-container">
              <div class="cart-item">
                  <div class="item-id">2</div>
                  <div class="item-info">
                      <img src="../../assets/images/red-dragon.jpg" alt="game name">
                      <div class="item-description">
                          <h3 class="name">Bobi story</h3>
                          <hr>
                          <div class="description">A baby pig is almost killed because of his status – he is the smallest pig that was born and he is considered to be useless and of no value. The pig is saved by a little girl called Fern Arable. She adopts the pig and takes care of it. She gives him the name Wilbur.</div>
                          <div class="other">
                              <div class="brand">Brand: DDAAS</div>
                              <div class="theme">Theme: cry</div>
                          </div>
                      </div>
                  </div>
                  <div class="stock-info">
                      <div class="item-num">
                          <button class="add">+</button>
                          <span class="item-amount">1</span>
                          <button class="put-away">-</button>
                      </div>
                      <div class="item-price">151$</div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div class="summary-data">
      <div class="sum-res"><h2>Result</h2></div>
      <div class="sum-desc">
          <div class="total">302$</div>
          <input type="text" name="" id="promocode" placeholder="Enter promo code">
          <button class="act-promo">Activate promo code</button>
          <button class="buy">buy now</button>
      </div>
  </div>
</div>`;

export default cart;
