export default () => {
  const bgFill = document.querySelector(`.bg-fill`);

  bgFill.addEventListener(`animationend`, () => {
    bgFill.classList.remove(`active`);
  });

};
