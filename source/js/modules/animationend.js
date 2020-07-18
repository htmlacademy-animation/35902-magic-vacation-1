export default () => {
  const bgFill = document.querySelector(`.bg-fill`);
  const lastRule = document.querySelector(`.rules__item:last-child p`);
  const rulesLink = document.querySelector(`.rules__link`);
  const animatedClass = `animated`;

  // the addEventListener below is for the cases of several screen with filled animation (currently, it's applicable for prizes screen only)
  bgFill.addEventListener(`animationend`, () => {
    bgFill.classList.remove(animatedClass);
  });

  lastRule.addEventListener(`animationend`, () => {
    rulesLink.classList.add(animatedClass);
  });
};
