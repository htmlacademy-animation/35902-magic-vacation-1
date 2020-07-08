import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;
    this.VISIBILITY_TIMEOUT = 700;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this._activeClass = `active`;
    this._hiddenClass = `screen--hidden`;

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    const rulesLink = document.querySelector(`.rules__link`);
    rulesLink.classList.remove(this._activeClass);

    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    const filledScreens = [2];
    const bgFill = document.querySelector(`.bg-fill`);

    if (filledScreens.includes(this.activeScreen)) {
      this.screenElements.forEach((el) => {
        setTimeout(() => {
          this.hide(el);
        }, this.VISIBILITY_TIMEOUT);
      });
      bgFill.classList.add(this._activeClass);

      setTimeout(() => {
        this.show(this.screenElements[this.activeScreen]);
      }, this.VISIBILITY_TIMEOUT);
    } else {
      this.screenElements.forEach((el) => {
        this.hide(el);
      });
      bgFill.classList.remove(this._activeClass);
      this.show(this.screenElements[this.activeScreen]);
    }
  }

  hide(screen) {
    screen.classList.add(this._hiddenClass);
    screen.classList.remove(this._activeClass);
  }

  show(screen) {
    screen.classList.remove(this._hiddenClass);
    screen.classList.add(this._activeClass);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(this._activeClass));
      activeItem.classList.add(this._activeClass);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
