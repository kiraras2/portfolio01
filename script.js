const navFunc = function () {
  const navBtn = document.querySelector('.nav__btn');
  const navContent = document.querySelector('.nav__wrapper');
  const navLinks = document.querySelectorAll('.linkBtn');
  const barTop = document.querySelector('.nav__bar--1');
  const barMid = document.querySelector('.nav__bar--2');
  const barBotm = document.querySelector('.nav__bar--3');

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

const fvEl = document.querySelector('.fv');
const conceptEl = document.querySelector('.concept');
const gelEl = document.querySelector('.gel');
const oilEl = document.querySelector('.oil');
const milkEl = document.querySelector('.milk');
const aboutEl = document.querySelector('.about__ttlBox');
const clearEl = document.querySelector('.clear');
const whiteEl = document.querySelector('.white');
const shopEl = document.querySelector('.shop');
const newsEl = document.querySelector('.news');
const lastEl = document.querySelector('.last');
const footerEl = document.querySelector('.footer');
const imgNum = document.querySelectorAll('.imageNum');
const otherImg = document.querySelectorAll('.imageNum-9');
const switchImgRightUp = document.querySelectorAll('.pc__switchImgRightUp');
const switchImgLeftDown = document.querySelectorAll('.pc__switchImgLeftDown');

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
targetObs.observe(fvEl);
targetObs.observe(conceptEl);
targetObs.observe(gelEl);
targetObs.observe(oilEl);
targetObs.observe(milkEl);
targetObs.observe(aboutEl);
targetObs.observe(clearEl);
targetObs.observe(shopEl);
targetObs.observe(whiteEl);
targetObs.observe(newsEl);
targetObs.observe(lastEl);
targetObs.observe(footerEl);

const indexContainer = document.querySelectorAll('.container');

const navEffect = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    activateIndex(entry.target.dataset.index);
  }
};
function activateIndex(element) {
  const currentActiveIndex = document.querySelector('#indexList .active');
  if (currentActiveIndex !== null) {
    currentActiveIndex.classList.remove('active');
  }
  const newActiveIndex = document.querySelector(`a[href='#${element}']`);

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

window.smoothScroll = function () {
  $('a[href^="#"]').on('click', function () {
    var href = $(this).attr('href');
    if (href != '#') {
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $(href == '#top' ? 'html' : href).offset().top - 80,
          },
          500
        );
      return false;
    }
  });
};

$(function () {
  smoothScroll();
});

let cursor = $('.cursor'),
  follower = $('.follower'),
  cWidth = 8,
  fWidth = 40,
  mWidth = 150,
  sWidth = 120,
  delay = 5,
  mouseX = 0,
  mouseY = 0,
  posX = 0,
  posY = 0;

$(window).on('load resize', function () {
  TweenMax.to({}, 0.0001, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / delay;
      posY += (mouseY - posY) / delay;
      TweenMax.set(follower, {
        css: {
          left: posX - fWidth / 2,
          top: posY - fWidth / 2,
        },
      });

      TweenMax.set(cursor, {
        css: {
          'background-color': '#000',
          left: mouseX - cWidth / 2,
          top: mouseY - cWidth / 2,
        },
      });
    },
  });
  $(document).on('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  $('a, .clickable').on({
    mouseenter: function () {
      cursor.addClass('is-active');
      follower.addClass('is-active');
    },
    mouseleave: function () {
      cursor.removeClass('is-active');
      follower.removeClass('is-active');
    },
  });
});

$(document).ready(function(){
  var $slider  = $('.lpLoading__count > ul');
  var $slide   = $slider.children();
  var slideLen = $slide.length;
  $slider
  .slick({
    autoplay: true,
    infinite:false,
    autoplaySpeed:5,
    fade: false,
    speed: 4,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    centerPadding: '70px',
    centerMode: true,
    slidesToShow: 1
  })
  .on('afterChange', function(event, slick, currentSlide, nextSlide) {
    let $self = $(this);
    switch (currentSlide){
      case 19:
        $(this).slick("slickSetOption", "autoplaySpeed", 125);
      break;
      case 20:
        $(this).slick("slickSetOption", "autoplaySpeed", 125);
      break;
      case 21:
        $(this).slick("slickSetOption", "autoplaySpeed", 200);
      break;
      case 22:
        $(this).slick("slickSetOption", "autoplaySpeed", 300);
      break;
      case 23:
        $(this).slick("slickSetOption", "autoplaySpeed", 350);
      break;
      default:
        $(this).slick("slickSetOption", "autoplaySpeed", 5);
        break;
    }
    if((slideLen - 1) <= $self.slick('slickCurrentSlide')){
      $self.slick('slickSetOption', 'autoplay', false);
      $(".lpLoading").addClass("countNone");
    }
  });
});
$('.lpLoading').delay(2600).queue(function(next) {
  $(this).addClass('loadingNone');
  next();
});

window.onload = function () {
  setTimeout('test()', 100);
}
function test(){
  document.getElementById('body').style.display = 'block';
}

$(function () {
  if ($(".js-modal-video").length) {
    $(".js-modal-video").modalVideo({
      channel: "youtube",
      youtube: {
        controls: 0,
        autoplay: 1,
      },
    });
  }
});

$('.lpLoading').delay(1000).queue(function(next) {
  $(".popupBanner").removeClass("popupBanner-close");
});
$(function () {
  $(".popupBanner").on('click', function () {
    $(".popupBanner").addClass("popupBanner-close");
    $("body").removeClass("noScroll");
  });
});
