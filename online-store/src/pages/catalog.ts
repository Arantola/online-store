const catalog = `
<div class="container">
    <div class="filters">
        <div class="filters__title no-roll">
            <button class="button_reset">Reset filters</button>
            <button class="button_save">Get link</button>
        </div>
        <div class="filters__box">
            <h3 class="filters__title">Theme</h3>
            <ul class="filters__list" id="theme-filters">
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_1" idAPI="abstract" type="checkbox">
                    <label class="checkbox__label" for="theme_1">Abstract
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_2" idAPI="adventure" type="checkbox">
                    <label class="checkbox__label" for="theme_2">Adventure
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_3" idAPI="building" type="checkbox">
                    <label class="checkbox__label" for="theme_3">Building
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_4" idAPI="card-game" type="checkbox">
                    <label class="checkbox__label" for="theme_4">Card-game
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_5" idAPI="cooperative" type="checkbox">
                    <label class="checkbox__label" for="theme_5">Cooperative
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_6" idAPI="deduction" type="checkbox">
                    <label class="checkbox__label" for="theme_6">Deduction
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_7" idAPI="economic" type="checkbox">
                    <label class="checkbox__label" for="theme_7">Economic
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_8" idAPI="fantasy" type="checkbox">
                    <label class="checkbox__label" for="theme_8">Fantasy
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_9" idAPI="fighting" type="checkbox">
                    <label class="checkbox__label" for="theme_9">Fighting
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_11" idAPI="sci-fi" type="checkbox">
                    <label class="checkbox__label" for="theme_11">Sci-Fi
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_categories" id="theme_12" idAPI="wargame" type="checkbox">
                    <label class="checkbox__label" for="theme_12">Wargame
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="filters__box">
            <h3 class="filters__title">Publishers</h3>
            <ul class="filters__list"  id="publisher-filters">
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publishers" id="brand_1" idAPI="Stonemaier-Games" type="checkbox">
                    <label class="checkbox__label" for="brand_1">Stonemaier Games
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publishers" id="brand_2" idAPI="Space-Cowboys" type="checkbox">
                    <label class="checkbox__label" for="brand_2">Space Cowboys
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publishers" id="brand_3" idAPI="IELLO" type="checkbox">
                    <label class="checkbox__label" for="brand_3">IELLO
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publishers" id="brand_4" idAPI="Feuerland-Spiele" type="checkbox">
                    <label class="checkbox__label" for="brand_4">Feuerland Spiele
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publishers" id="brand_5" idAPI="Repos-Production" type="checkbox">
                    <label class="checkbox__label" for="brand_5">Repos Production
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publishers" id="brand_6" idAPI="Rio-Grande-Games" type="checkbox">
                    <label class="checkbox__label" for="brand_6">Rio Grande Games
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publishers" id="brand_7" idAPI="Z-Man-Games" type="checkbox">
                    <label class="checkbox__label" for="brand_7">Z-Man Games
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
            </ul>
        </div>

        <div class="filters__box slider">
        <h3 class="filters__title">Price</h3>
        <div class="filters__list">
        <span class="slider__data">5 - 300</span>
        <div class="slider__double-range">
            <div class="slider__track"></div>
            <input class="slider__input" id="min-price" type="range" min="5" max="250" value="5" step="5">
            <input class="slider__input" id="max-price" type="range" min="5" max="250" value="250" step="5">
        </div>
        </div>
    </div>
        <div class="filters__box slider">
            <h3 class="filters__title">Playtime</h3>
        <div class="filters__list">
            <span class="slider__data">5 - 120</span>
            <div class="slider__double-range">
                <div class="slider__track"></div>
                <input class="slider__input" id="min-time" type="range" min="5" max="120" value="5" step="5">
                <input class="slider__input" id="max-time" type="range" min="5" max="120" value="120" step="5">
        </div>
            </div>
        </div>
        <div class="filters__box slider">
            <h3 class="filters__title">Players</h3>
        <div class="filters__list">
            <span class="slider__data">1 - 8</span>
            <div class="slider__double-range">
                <div class="slider__track"></div>
                <input class="slider__input" id="min-players" type="range" min="1" max="8" value="1" step="1">
                <input class="slider__input" id="max-players" type="range" min="1" max="8" value="8" step="1">
        </div>
            </div>
        </div>
    </div>

    <div class="products">
        <div class="sort-products">
            <form class="sort-bar" name="sort">
                <select name="sortList" id="sort-list">
                    <option value="none" data-ascending="undefined">No sorting</option>
                    <option value="price" data-ascending="true">Ascending price</option>
                    <option value="price" data-ascending="false">Descending price</option>
                    <option value="rank" data-ascending="true">Ascending rating</option>
                    <option value="rank" data-ascending="false">Descending rating</option>
                </select>
            </form>
            <div class="total-found"> Found: <span id="total-games-display">0</span></div>
            <div class="search-bar">
                <input type="search" name="" id="search" placeholder="Search product">
            </div>
            <div class="view-bar">
                <div class="view-card"><img src="../../assets/icons/cards.svg" alt="cards"></div>
                <div class="view-list"><img src="../../assets/icons/list.svg" alt="list"></div>
            </div>
        </div>
        <div class="products__list" id="catalog-list">
        </div>
    </div>
</div>`;

export default catalog;
