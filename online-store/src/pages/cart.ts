const cart = `
<div class="modal-container">
            <div class="modal-content">
                <div class="modal-close-container">
                    <span class="close">&times;</span>
                </div>
                <h2>Personal details</h2>
                <div class="modal-info-container">
                    <div class="info-container">
                        <div class="info-input">
                            <div class="group">
                                <input type="text" id="inpName" required>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Name</label>
                            </div>
                            <div class="input-error">Error</div>
                        </div>
                        <div class="info-input">
                            <div class="group">
                                <input type="text" id="inpPhone" maxlength="13" required>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Phone number</label>
                            </div>
                            <div class="input-error">Error</div>
                        </div>
                        <div class="info-input">
                            <div class="group">
                                <input type="text" id="inpAddress" required>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Delivery address</label>
                            </div>
                            <div class="input-error">Error</div>
                        </div>
                        <div class="info-input">
                            <div class="group">
                                <input type="text" id="inpEmail" required>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Email address</label>
                            </div>
                            <div class="input-error">Error</div>
                        </div>
                    </div>
                    <div class="card-data-container">
                        <div class="card-number">
                            <img class="card-num-img" src="https://static.thenounproject.com/png/524369-200.png" alt="unknown">
                            <input id="cardNumber" maxlength="19" value="" type="text">
                        </div>
                        <div class="card-other">
                            <div class="card-other-num">
                                <div>Data:</div>
                                <input id="cardData" type="text" maxlength="5">
                            </div>
                            <div class="card-other-num">
                                <div>CVV:</div>
                                <input id="cardSecurity" type="text" maxlength="3">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-order">
                    <button id="btnOrder" class="order-btn">Order</button>
                </div>
            </div>
</div>
<div class="container">
            <div class="cart-lists">
                <div class="cart-info">
                    <div>Product in cart</div>
                    <div class="cart-page" id="page-number-interface">
                        <span>PAGE:</span>
                        <div class="display-and-buttons">
                            <button class="button_cart-input" name="less"><</button>
                            <span id="page-number">1</span>
                            <button class="button_cart-input" name="more">></button>
                        </div>
                    </div>
                    <div class="cart-page"  id="on-page-interface">
                        <span>On page:</span>
                        <div class="display-and-buttons">
                            <button class="button_cart-input" name="less"><</button>
                            <span id="on-page">5</span>
                            <button class="button_cart-input" name="more">></button>
                        </div>
                    </div>
                </div>
                <div class="cart-items" id="cart-items">
                </div>
            </div>
            <div class="summary-data">
                <div class="sum-res"><h2>Result</h2></div>
                <div class="sum-desc">
                    <div class="total">302$</div>
                    <input type="text" name="" id="promocode" placeholder="Enter promo code">
                    <button class="act-promo">Activate promo code</button>
                    <button id="buyBtn" class="buy">buy now</button>
                </div>
            </div>
</div>`;

export default cart;
