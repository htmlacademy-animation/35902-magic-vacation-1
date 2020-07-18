// modules
import pageLoad from './modules/page-load.js';
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import animationend from './modules/animationend.js';
import LettersAnimation from './modules/letters-animation.js';
import FullPageScroll from './modules/full-page-scroll';

// init
pageLoad();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
animationend();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();


const lettersTitleAnimation = new LettersAnimation(`.intro__title`, 400, `animated`, `word--title`, `transform`, true);
const lettersDateAnimation = new LettersAnimation(`.intro__date`, 500, `animated`, `word--date`, `transform`);

setTimeout(() => {
  lettersTitleAnimation.runAnimation();
}, 400);

setTimeout(() => {
  lettersDateAnimation.runAnimation();
}, 1100);
