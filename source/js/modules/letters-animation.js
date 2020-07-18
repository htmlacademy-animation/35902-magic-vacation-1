export default class LettersAnimation {
  constructor(selector, duration, animatedClass, addClass, property, splitWords = false) {
    this.BASE_DELAY = 50;
    this.WORD_OFFSET_DELAY = duration;

    this._selector = selector;
    this._duration = duration;
    this._animatedClass = animatedClass;
    this._addClass = addClass;
    this._property = property;
    this._splitWords = splitWords;

    this._element = document.querySelector(this._selector);
    this._delay = 0;

    this.prepareText();
  }

  createLetter(letter, letterIndex, wordIndex) {
    const span = document.createElement(`span`);
    const extraDelay = this._splitWords ? wordIndex * this.WORD_OFFSET_DELAY : null;
    span.textContent = letter;
    span.classList.add(`${letterIndex}`);

    switch (letterIndex % 3) {
      case 1:
        this._delay = this.BASE_DELAY + extraDelay;
        break;
      case 2:
        this._delay = this.BASE_DELAY * 2 + extraDelay;
        break;
      default: this._delay = 0 + extraDelay;
    }

    span.style.transition = `${this._property} ${this._duration}ms ease ${this._delay}ms`;
    return span;
  }

  prepareText() {
    if (!this._element) {
      return;
    }

    const text = this._element.textContent.trim().split(` `).filter((word) => word !== ``);

    const content = text.reduce((fragmentParent, word, wordIndex) => {
      const letterContainer = Array.from(word).reduce((fragment, letter, letterIndex) => {
        fragment.appendChild(this.createLetter(letter, letterIndex, wordIndex));
        return fragment;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`word`);
      wordContainer.classList.add(this._addClass);
      wordContainer.appendChild(letterContainer);
      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.textContent = ``;
    // this._element.innerHtml = ``;
    // - почему-то так не очищается контент
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._animatedClass);
  }

  destroyAnimation() {
    this._element.classList.remove(this._animatedClass);
  }
}
