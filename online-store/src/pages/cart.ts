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
                                <input  type="text" id="inpName" required>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Name</label>
                            </div>
                            <div class="input-error">Error</div>
                        </div>
                        <div class="info-input">
                            <div class="group">
                                <input type="text" id="inpPhone" required>
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
                            <img class="card-num-img" src="" alt="visa">
                            <input id="cardNumber" value="" type="text">
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
                    <button id="buyBtn" class="buy">buy now</button>
                </div>
            </div>
</div>`;

export default cart;
