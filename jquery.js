(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){let a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);let f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}let i=typeof require=="function"&&require;for(let o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
  try {
    let ce = new window.CustomEvent('test');
      ce.preventDefault();
      if (ce.defaultPrevented !== true) {
          throw new Error('Could not prevent default');
      }
  } catch(e) {
    let CustomEvent = function(event, params) {
      let evt, origPrevent;
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };

      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      origPrevent = evt.preventDefault;
      evt.preventDefault = function () {
        origPrevent.call(this);
        try {
          Object.defineProperty(this, 'defaultPrevented', {
            get: function () {
              return true;
            }
          });
        } catch(e) {
          this.defaultPrevented = true;
        }
      };
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }

  },{}],2:[function(require,module,exports){
  'use strict';

  function assign(target, firstSource) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert first argument to object');
    }

    let to = Object(target);
    for (let i = 1; i < arguments.length; i++) {
      let nextSource = arguments[i];
      if (nextSource === undefined || nextSource === null) {
        continue;
      }

      let keysArray = Object.keys(Object(nextSource));
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
        let nextKey = keysArray[nextIndex];
        let desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
    return to;
  }

  function polyfill() {
    if (!Object.assign) {
      Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: assign
      });
    }
  }

  module.exports = {
    assign: assign,
    polyfill: polyfill
  };

  },{}],3:[function(require,module,exports){
  'use strict';

  let ModalVideo = require('../index');

  let applyJQuery = function applyJQuery(jQuery) {
    jQuery.fn.modalVideo = function (settings) {
      if (typeof settings === 'strings') {} else {
        new ModalVideo(this, settings);
      }
      return this;
    };
  };

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], applyJQuery);
  } else {
    let jq = window.jQuery ? window.jQuery : window.$;
    if (typeof jq !== 'undefined') {
      applyJQuery(jq);
    }
  }

  module.exports = applyJQuery;

  },{"../index":5}],4:[function(require,module,exports){
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  let _createClass = function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { let descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
  require('custom-event-polyfill');

  let _util = require('../lib/util');
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); }

  let assign = require('es6-object-assign').assign;
  let defaults = {
    channel: 'youtube',
    facebook: {},
    youtube: {
      autoplay: 1,
      cc_load_policy: 1,
      color: null,
      controls: 1,
      disablekb: 0,
      enablejsapi: 0,
      end: null,
      fs: 1,
      h1: null,
      iv_load_policy: 1,
      loop: 0,
      modestbranding: null,
      mute: 0,
      origin: null,
      playsinline: null,
      rel: 0,
      showinfo: 1,
      start: 0,
      wmode: 'transparent',
      theme: 'dark',
      nocookie: false
    },
    ratio: '16:9',
    vimeo: {
      api: false,
      autopause: true,
      autoplay: true,
      byline: true,
      callback: null,
      color: null,
      controls: true,
      height: null,
      loop: false,
      maxheight: null,
      maxwidth: null,
      muted: false,
      player_id: null,
      portrait: true,
      title: true,
      width: null,
      xhtml: false
    },
    allowFullScreen: true,
    allowAutoplay: true,
    animationSpeed: 300,
    classNames: {
      modalVideo: 'modal-video',
      modalVideoClose: 'modal-video-close',
      modalVideoBody: 'modal-video-body',
      modalVideoInner: 'modal-video-inner',
      modalVideoIframeWrap: 'modal-video-movie-wrap',
      modalVideoCloseBtn: 'modal-video-close-btn'
    },
    aria: {
      openMessage: 'You just openned the modal video',
      dismissBtnMessage: 'Close the modal by clicking here'
    }
  };

  let ModalVideo = function () {
    function ModalVideo(ele, option) {
      let _this = this;
      _classCallCheck(this, ModalVideo);
      let opt = assign({}, defaults, option);
      let selectors = typeof ele === 'string' ? document.querySelectorAll(ele) : ele;
      let body = document.querySelector('body');
      let classNames = opt.classNames;
      let speed = opt.animationSpeed;
      [].forEach.call(selectors, function (selector) {
        selector.addEventListener('click', function (event) {
          if (selector.tagName === 'A') {
            event.preventDefault();
          }
          let videoId = selector.dataset.videoId;
          let channel = selector.dataset.channel || opt.channel;
          let id = (0, _util.getUniqId)();
          let videoUrl = selector.dataset.videoUrl || _this.getVideoUrl(opt, channel, videoId);
          let html = _this.getHtml(opt, videoUrl, id);
          (0, _util.append)(body, html);
          let modal = document.getElementById(id);
          let btn = modal.querySelector('.js-modal-video-dismiss-btn');
          let timeout = void 0;
          let resizeModalVideoWhenHeightGreaterThanWindowHeight = function resizeModalVideoWhenHeightGreaterThanWindowHeight() {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
              let width = _this.getWidthFulfillAspectRatio(opt.ratio, window.innerHeight, window.innerWidth);
              let modalVideoInner = document.getElementById('modal-video-inner-' + id);
              if (modalVideoInner.style.maxWidth !== width) {
                modalVideoInner.style.maxWidth = width;
              }
            }, 10);
          };
          modal.focus();
          modal.addEventListener('click', function () {
            (0, _util.addClass)(modal, classNames.modalVideoClose);
            window.removeEventListener('resize', resizeModalVideoWhenHeightGreaterThanWindowHeight);
            setTimeout(function () {
              (0, _util.remove)(modal);
              selector.focus();
            }, speed);
          });

          modal.addEventListener('keydown', function (e) {
            if (e.which === 9) {
              e.preventDefault();
              if (document.activeElement === modal) {
                btn.focus();
              } else {
                modal.setAttribute('aria-label', '');
                modal.focus();
              }
            }
          });
          window.addEventListener('resize', resizeModalVideoWhenHeightGreaterThanWindowHeight);
          btn.addEventListener('click', function () {
            (0, _util.triggerEvent)(modal, 'click');
          });
        });
      });
    }
    _createClass(ModalVideo, [{
      key: 'getPadding',
      value: function getPadding(ratio) {
        let arr = ratio.split(':');
        let width = Number(arr[0]);
        let height = Number(arr[1]);
        let padding = height * 100 / width;
        return padding + '%';
      }
    }, {
      key: 'getWidthFulfillAspectRatio',
      value: function getWidthFulfillAspectRatio(ratio, maxHeight, maxWidth) {
        let arr = ratio.split(':');
        let width = Number(arr[0]);
        let height = Number(arr[1]);
        let videoHeight = maxWidth * (height / width);
        if (maxHeight < videoHeight) {
          return Math.floor(width / height * maxHeight) + 'px';
        }
        return '100%';
      }
    }, {
      key: 'getQueryString',
      value: function getQueryString(obj) {
        let url = '';
        Object.keys(obj).forEach(function (key) {
          url += key + '=' + obj[key] + '&';
        });
        return url.substr(0, url.length - 1);
      }
    }, {
      key: 'getVideoUrl',
      value: function getVideoUrl(opt, channel, videoId) {
        if (channel === 'youtube') {
          return this.getYoutubeUrl(opt.youtube, videoId);
        } else if (channel === 'vimeo') {
          return this.getVimeoUrl(opt.vimeo, videoId);
        } else if (channel === 'facebook') {
          return this.getFacebookUrl(opt.facebook, videoId);
        } else if (channel === 'custom') {
          return opt.url;
        }
        return '';
      }
    }, {
      key: 'getVimeoUrl',
      value: function getVimeoUrl(vimeo, videoId) {
        let query = this.getQueryString(vimeo);
        return '//player.vimeo.com/video/' + videoId + '?' + query;
      }
    }, {
      key: 'getYoutubeUrl',
      value: function getYoutubeUrl(youtube, videoId) {
        let query = this.getQueryString(youtube);
        if (youtube.nocookie === true) {
          return '//www.youtube-nocookie.com/embed/' + videoId + '?' + query;
        }
        return '//www.youtube.com/embed/' + videoId + '?' + query;
      }
    }, {
      key: 'getFacebookUrl',
      value: function getFacebookUrl(facebook, videoId) {
        return '//www.facebook.com/v2.10/plugins/video.php?href=https://www.facebook.com/facebook/videos/' + videoId + '&' + this.getQueryString(facebook);
      }
    }, {
      key: 'getHtml',
      value: function getHtml(opt, videoUrl, id) {
        let padding = this.getPadding(opt.ratio);
        let classNames = opt.classNames;
        return '\n      <div class="' + classNames.modalVideo + '" tabindex="-1" role="dialog" aria-label="' + opt.aria.openMessage + '" id="' + id + '">\n        <div class="' + classNames.modalVideoBody + '">\n          <div class="' + classNames.modalVideoInner + '" id="modal-video-inner-' + id + '">\n            <div class="' + classNames.modalVideoIframeWrap + '" style="padding-bottom:' + padding + '">\n              <button class="' + classNames.modalVideoCloseBtn + ' js-modal-video-dismiss-btn" aria-label="' + opt.aria.dismissBtnMessage + '"></button>\n              <iframe width=\'460\' height=\'230\' src="' + videoUrl + '" frameborder=\'0\' allowfullscreen=' + opt.allowFullScreen + ' tabindex="-1" allow="' + (opt.allowAutoplay ? 'autoplay;' : '') + ' accelerometer; encrypted-media; gyroscope; picture-in-picture" />\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
      }
    }]);
    return ModalVideo;
  }();

  exports.default = ModalVideo;
  module.exports = exports['default'];
  },{"../lib/util":6,"custom-event-polyfill":1,"es6-object-assign":2}],5:[function(require,module,exports){
  'use strict';
  module.exports = require('./core/');
  },{"./core/":4}],6:[function(require,module,exports){
  'use strict';
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  let append = exports.append = function append(element, string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    while (div.children.length > 0) {
      element.appendChild(div.children[0]);
    }
  };
  let getUniqId = exports.getUniqId = function getUniqId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  };
  let remove = exports.remove = function remove(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };
  let addClass = exports.addClass = function addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  };
  let triggerEvent = exports.triggerEvent = function triggerEvent(el, eventName, options) {
    let event = void 0;
    if (window.CustomEvent) {
      event = new CustomEvent(eventName, { cancelable: true });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, false, false, options);
    }
    el.dispatchEvent(event);
  };
  },{}]},{},[3]);
