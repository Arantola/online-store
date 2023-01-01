const catalog = `
<div class="container">
    <div class="filters">
        <div class="filters__title">
            <button class="button_reset">Reset filters</button>
            <button class="button_save">Get link</button>
        </div>
        <div class="filters__box">
            <h3 class="filters__title">Theme</h3>
            <ul class="filters__list" id="theme-filters">
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_1" idAPI="hBqZ3Ar4RJ" type="checkbox">
                    <label class="checkbox__label" for="theme_1">Abstract
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_2" idAPI="KUBCKBkGxV" type="checkbox">
                    <label class="checkbox__label" for="theme_2">Adventure
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_3" idAPI="ODWOjWAJj3" type="checkbox">
                    <label class="checkbox__label" for="theme_3">Building
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_4" idAPI="eX8uuNlQkQ" type="checkbox">
                    <label class="checkbox__label" for="theme_4">Card-game
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_5" idAPI="ge8pIhEUGE" type="checkbox">
                    <label class="checkbox__label" for="theme_5">Cooperative
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_6" idAPI="bCBXJy9qDw" type="checkbox">
                    <label class="checkbox__label" for="theme_6">Deduction
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_7" idAPI="N0TkEGfEsF" type="checkbox">
                    <label class="checkbox__label" for="theme_7">Economic
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_8" idAPI="ZTneo8TaIO" type="checkbox">
                    <label class="checkbox__label" for="theme_8">Fantasy
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_9" idAPI="upXZ8vNfNO" type="checkbox">
                    <label class="checkbox__label" for="theme_9">Fighting
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_10" idAPI="TYnxiuiI3X" type="checkbox">
                    <label class="checkbox__label" for="theme_10">Humor
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_11" idAPI="3B3QpKvXD3" type="checkbox">
                    <label class="checkbox__label" for="theme_11">Sci-Fi
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_theme" id="theme_12" idAPI="jX8asGGR6o" type="checkbox">
                    <label class="checkbox__label" for="theme_12">Wargame
                        <span class="checkbox__counter">23</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="filters__box">
            <h3 class="filters__title">Publishers</h3>
            <ul class="filter-list"  id="publisher-filters">
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_1" idAPI="fLH8tXTBBp" type="checkbox">
                    <label class="checkbox__label" for="brand_1">Fantasy Flight Games
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_2" idAPI="IirRC59g8r" type="checkbox">
                    <label class="checkbox__label" for="brand_2">Hasbro
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_3" idAPI="LjmghcBsOU" type="checkbox">
                    <label class="checkbox__label" for="brand_3">Wizards of the Coast
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_4" idAPI="1LE7oe5KVZ" type="checkbox">
                    <label class="checkbox__label" for="brand_4">Asmodee
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_5" idAPI="u02tuZCku5" type="checkbox">
                    <label class="checkbox__label" for="brand_5">Eagle-Gryphon Games
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_6" idAPI="BrfTva4mEF" type="checkbox">
                    <label class="checkbox__label" for="brand_6">Rio Grande Games
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_7" idAPI="UPqP0MXLqj" type="checkbox">
                    <label class="checkbox__label" for="brand_7">Z-Man Games, Inc.
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_8" idAPI="m4T08lQftL" type="checkbox">
                    <label class="checkbox__label" for="brand_8">Alderac Entertainment Group
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_9" idAPI="Qx6KrgnjCA" type="checkbox">
                    <label class="checkbox__label" for="brand_9">IELLO
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_10" idAPI="OQJtEkBNQV" type="checkbox">
                    <label class="checkbox__label" for="brand_10">Queen Games
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_11" idAPI="YnNKwCizDo" type="checkbox">
                    <label class="checkbox__label" for="brand_11">Portal Games
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
                <li class="checkbox__box">
                    <input class="checkbox__input checkbox_publisher" id="brand_12" idAPI="fp9ajXmUFW" type="checkbox">
                    <label class="checkbox__label" for="brand_12">Stronghold Games
                        <span class="checkbox__counter">11</span>
                    </label>
                </li>
            </ul>
        </div>

        <div class="filters__box slider">
        <h3 class="filters__title">Price</h3>
        <span class="slider__data">5 - 300</span>
        <div class="slider__double-range">
            <div class="slider__track"></div>
            <input class="slider__input" id="players-slider-min" type="range" min="5" max="300" value="5" step="5">
            <input class="slider__input" id="players-slider-max" type="range" min="5" max="300" value="300" step="5">
        </div>
    </div>
        <div class="filters__box slider">
            <h3 class="filters__title">Playtime</h3>
            <span class="slider__data">5 - 120</span>
            <div class="slider__double-range">
                <div class="slider__track"></div>
                <input class="slider__input" id="time-slider-min" type="range" min="5" max="120" value="5" step="5">
                <input class="slider__input" id="time-slider-max" type="range" min="5" max="120" value="120" step="5">
            </div>
        </div>
        <div class="filters__box slider">
            <h3 class="filters__title">Number of players</h3>
            <span class="slider__data">1 - 20</span>
            <div class="slider__double-range">
                <div class="slider__track"></div>
                <input class="slider__input" id="players-slider-min" type="range" min="1" max="20" value="1" step="1">
                <input class="slider__input" id="players-slider-max" type="range" min="1" max="20" value="20" step="1">
            </div>
        </div>
    </div>

    <div class="products">
        <div class="sort-products">
            <form class="sort-bar" name="sort">
                <select name="sortList" id="sort-list">
                    <option value="">Default</option>
                    <option value="price" data-ascending="true">Ascending price</option>
                    <option value="price" data-ascending="false">Descending price</option>
                    <option value="rank" data-ascending="true">Ascending rating</option>
                    <option value="rank" data-ascending="false">Descending rating</option>
                </select>
            </form>
            <div class="total-found"> Found: <span id="total-games-display">0</span></div>
            <div class="search-bar">
                <input type="search" name="" id="searchName" placeholder="Search product">
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
