const navFunc = function () {
  const navBtn = document.querySelector('.p-nav__btn');
  const navContent = document.querySelector('.p-nav__wrapper');
  const navLinks = document.querySelectorAll('.linkBtn');
  const barTop = document.querySelector('.p-nav__bar--1');
  const barMid = document.querySelector('.p-nav__bar--2');
  const barBotm = document.querySelector('.p-nav__bar--3');
  const openClose = function () {
    navContent.classList.toggle('navShow');
    barTop.classList.toggle('rotate');
    barMid.classList.toggle('disappearBar');
    barBotm.classList.toggle('rotateRev');
  };

  navBtn.addEventListener('click', openClose);
  navLinks.forEach((navLink) => {
    navLink.addEventListener('click', openClose);
  });
};

const blockFadeIns = function () {
  const fadeIns = document.querySelectorAll('.fadeIn');
  fadeIns.forEach((el) => el.classList.add('hideEl'));

  const blockFadeIn = function (entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      entry.target.classList.remove('hideEl');
      observer.unobserve(entry.target);
    }
  };

  const targetObs = new IntersectionObserver(blockFadeIn, {
    root: null,
    threshold: 0,
    rootMargin: '-40px',
  });
  fadeIns.forEach((el) => targetObs.observe(el));
};

// const fvEl = document.querySelector('.p-fv');
// const conceptEl = document.querySelector('.p-concept');
const gelEl = document.querySelector('.gel');
const oilEl = document.querySelector('.oil');
const milkEl = document.querySelector('.milk');
// const aboutEl = document.querySelector('.about__ttlBox');
const clearEl = document.querySelector('.clear');
const whiteEl = document.querySelector('.white');
const shopEl = document.querySelector('.shop');
const newsEl = document.querySelector('.news');
const lastEl = document.querySelector('.last');
const footerEl = document.querySelector('.footer');
const imgNum = document.querySelectorAll('.imageNum');
const otherImg = document.querySelectorAll('.imageNum-9');
const switchImgRightUp = document.querySelectorAll('.p-pc__switchImgRightUp');
const switchImgLeftDown = document.querySelectorAll('.p-pc__switchImgLeftDown');

const SwitchImg = function (entries) {
  const [entry] = entries;
  const els = document.querySelectorAll(
    `.imageNum-${entry.target.dataset.num}`
  );
  if (entry.target.dataset.num !== '10') {
    if (entry.isIntersecting) {
      otherImg.forEach((img) => img.classList.remove('on'));
      els.forEach((el) => el.classList.add('on'));
    } else {
      els.forEach((el) => el.classList.remove('on'));
    }
  } else {
    otherImg.forEach((img) => img.classList.add('on'));
  }
};

const targetObs = new IntersectionObserver(SwitchImg, {
  root: null,
  threshold: 0.1,
});
// targetObs.observe(fvEl);
// targetObs.observe(conceptEl);
targetObs.observe(gelEl);
targetObs.observe(oilEl);
targetObs.observe(milkEl);
// targetObs.observe(aboutEl);
targetObs.observe(clearEl);
// targetObs.observe(shopEl);
targetObs.observe(whiteEl);
// targetObs.observe(newsEl);
// targetObs.observe(lastEl);
// targetObs.observe(footerEl);

const indexContainer = document.querySelectorAll('.container');

const navEffect = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    activateIndex(entry.target.dataset.index);
  }
};
function activateIndex(element) {
  const currentActiveIndex = document.querySelector('#indexList .active');
}
const targetContainer = new IntersectionObserver(navEffect, {
  root: null,
  rootMargin: '-20% 0px',
  threshold: 0,
});

indexContainer.forEach((container) => targetContainer.observe(container));

const init = function () {
  navFunc();
  blockFadeIns();
};
init();

$(function(){
  let num1 = 0;
  let num2 = 0;
  let p1 = $("p:nth-child(1)");
  let p2 = $("p:nth-child(2)");
  setInterval(function(){
    p1.css("transform","translateX(" + -num1 + "%)");
    p2.css("transform","translateX(" + -num2 + "%)");
    num1++;
    num2++;
    if(num1 >= 200){
      num1 = 0;
    }
    if(num2 >= 300){
      num2 = 100;
    }
  },100);
});
