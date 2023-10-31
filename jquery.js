(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
  // Polyfill for creating CustomEvents on IE9/10/11
  
  // code pulled from:
  // https://github.com/d4tocchini/customevent-polyfill
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
  
  try {
      var ce = new window.CustomEvent('test');
      ce.preventDefault();
      if (ce.defaultPrevented !== true) {
          // IE has problems with .preventDefault() on custom events
          // http://stackoverflow.com/questions/23349191
          throw new Error('Could not prevent default');
      }
  } catch(e) {
    var CustomEvent = function(event, params) {
      var evt, origPrevent;
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
    window.CustomEvent = CustomEvent; // expose definition to window
  }
  
  },{}],2:[function(require,module,exports){
  /**
   * Code refactored from Mozilla Developer Network:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
   */
  
  'use strict';
  
  function assign(target, firstSource) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert first argument to object');
    }
  
    var to = Object(target);
    for (var i = 1; i < arguments.length; i++) {
      var nextSource = arguments[i];
      if (nextSource === undefined || nextSource === null) {
        continue;
      }
  
      var keysArray = Object.keys(Object(nextSource));
      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
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
  
  var ModalVideo = require('../index');
  
  var applyJQuery = function applyJQuery(jQuery) {
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
    var jq = window.jQuery ? window.jQuery : window.$;
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
  
  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
  
  require('custom-event-polyfill');
  
  var _util = require('../lib/util');
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  var assign = require('es6-object-assign').assign;
  
  var defaults = {
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
  
  var ModalVideo = function () {
    function ModalVideo(ele, option) {
      var _this = this;
  
      _classCallCheck(this, ModalVideo);
  
      var opt = assign({}, defaults, option);
      var selectors = typeof ele === 'string' ? document.querySelectorAll(ele) : ele;
      var body = document.querySelector('body');
      var classNames = opt.classNames;
      var speed = opt.animationSpeed;
      [].forEach.call(selectors, function (selector) {
        selector.addEventListener('click', function (event) {
          if (selector.tagName === 'A') {
            event.preventDefault();
          }
          var videoId = selector.dataset.videoId;
          var channel = selector.dataset.channel || opt.channel;
          var id = (0, _util.getUniqId)();
          var videoUrl = selector.dataset.videoUrl || _this.getVideoUrl(opt, channel, videoId);
          var html = _this.getHtml(opt, videoUrl, id);
          (0, _util.append)(body, html);
          var modal = document.getElementById(id);
          var btn = modal.querySelector('.js-modal-video-dismiss-btn');
          var timeout = void 0; // used for resize
          var resizeModalVideoWhenHeightGreaterThanWindowHeight = function resizeModalVideoWhenHeightGreaterThanWindowHeight() {
            clearTimeout(timeout);
            // Resize modal-video-iframe-wrap when window size changed when the height of the video is greater than the height of the window.
            timeout = setTimeout(function () {
              var width = _this.getWidthFulfillAspectRatio(opt.ratio, window.innerHeight, window.innerWidth);
  
              var modalVideoInner = document.getElementById('modal-video-inner-' + id);
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
        var arr = ratio.split(':');
        var width = Number(arr[0]);
        var height = Number(arr[1]);
        var padding = height * 100 / width;
        return padding + '%';
      }
  
      /**
       * Calculate the width of the video fulfill aspect ratio.
       * When the height of the video is greater than the height of the window,
       * this function return the width that fulfill the aspect ratio for the height of the window.
       * In other cases, this function return '100%'(the height relative to the width is determined by css).
       *
       * @param string ratio
       * @param number maxHeight
       * @param number maxWidth
       * @returns string
       */
  
    }, {
      key: 'getWidthFulfillAspectRatio',
      value: function getWidthFulfillAspectRatio(ratio, maxHeight, maxWidth) {
        var arr = ratio.split(':');
        var width = Number(arr[0]);
        var height = Number(arr[1]);
  
        // Height that fulfill the aspect ratio for maxWidth.
        var videoHeight = maxWidth * (height / width);
  
        if (maxHeight < videoHeight) {
          // when the height of the video is greater than the height of the window.
          // calculate the width that fulfill the aspect ratio for the height of the window.
  
          // ex: 16:9 aspect ratio
          // 16:9 = width : height
          // 竊� width = 16 / 9 * height
          return Math.floor(width / height * maxHeight) + 'px';
        }
  
        return '100%';
      }
    }, {
      key: 'getQueryString',
      value: function getQueryString(obj) {
        var url = '';
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
        var query = this.getQueryString(vimeo);
        return '//player.vimeo.com/video/' + videoId + '?' + query;
      }
    }, {
      key: 'getYoutubeUrl',
      value: function getYoutubeUrl(youtube, videoId) {
        var query = this.getQueryString(youtube);
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
        var padding = this.getPadding(opt.ratio);
        var classNames = opt.classNames;
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
  var append = exports.append = function append(element, string) {
    var div = document.createElement('div');
    div.innerHTML = string;
    while (div.children.length > 0) {
      element.appendChild(div.children[0]);
    }
  };
  
  var getUniqId = exports.getUniqId = function getUniqId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  };
  
  var remove = exports.remove = function remove(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };
  
  var addClass = exports.addClass = function addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  };
  
  var triggerEvent = exports.triggerEvent = function triggerEvent(el, eventName, options) {
    var event = void 0;
    if (window.CustomEvent) {
      event = new CustomEvent(eventName, { cancelable: true });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, false, false, options);
    }
    el.dispatchEvent(event);
  };
  
  },{}]},{},[3]);