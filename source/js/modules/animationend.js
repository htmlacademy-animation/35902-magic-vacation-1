export default () => {
  const bgFill = document.querySelector(`.bg-fill`);
  const lastRule = document.querySelector(`.rules__item:last-child p`);
  const rulesLink = document.querySelector(`.rules__link`);
  // const introTitleElement = document.querySelector(`.intro__title span:last-child`);
  const introMessage = document.querySelector(`.intro__message`);
  const animatedClass = `animated`;

  // the addEventListener below is for the cases of several screen with filled animation (currently, it's applicable for prizes screen only)
  bgFill.addEventListener(`animationend`, () => {
    bgFill.classList.remove(animatedClass);
  });

  lastRule.addEventListener(`animationend`, () => {
    rulesLink.classList.add(animatedClass);
  });

  // introTitleElement.addEventListener(`transitionend`, () => {
  //   introMessage.style.color = `red`;
  //   introMessage.style.animationName = `introFadeIn`;
  //   introMessage.style.animationDuration = `1s`;
  // });

};
