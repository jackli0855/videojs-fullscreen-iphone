/**
 * videojs-fullscreen-iphone
 * @version 0.0.0
 * @copyright 2018 libao <lb.funward@gmail.com>
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
	typeof define === 'function' && define.amd ? define(['video.js'], factory) :
	(global.videojsFullscreenIphone = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

var version = "0.0.0";

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');

// Default options for the plugin.
var defaults = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
var onPlayerReady = function onPlayerReady(player, options) {
  player.addClass('vjs-fullscreen-iphone');
  // console.log('========= aa ============');
  player.fullscreenIphone = player.addChild('fullscreenIphoneButton', options);
  player.controlBar.el().appendChild(player.fullscreenIphone.el());
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function fullscreenIphone
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var fullscreenIphone = function fullscreenIphone(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, videojs.mergeOptions(defaults, options));
  });
};

/**
 * Button to full screen in iphone
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class SeekToggle
 */

var FullscreenIphoneButton = function (_Button) {
  inherits(FullscreenIphoneButton, _Button);

  function FullscreenIphoneButton(player, options) {
    classCallCheck(this, FullscreenIphoneButton);

    var _this2 = possibleConstructorReturn(this, _Button.call(this, player, options));

    _this2.controlText('Fullscreen');
    return _this2;
  }

  FullscreenIphoneButton.prototype.buildCSSClass = function buildCSSClass() {
    /* Each button will have the classes:
       `vjs-fullscreen-iphone-button
       So you could have a generic icon for "skip back" and a more
       specific one for "skip back 30 seconds"
    */
    return "vjs-fullscreen-iphone-control vjs-control vjs-button";
  };

  FullscreenIphoneButton.prototype.handleClick = function handleClick() {

    console.log('I am clicked');
    console.log(this.options_);
    //if openNewPage is true, open a new page
    //else show at current page with the window size, but loation bar cann't be remove.
    if (this.options_.openNewPage) {
      if (this.options_.closeMe) {
        window.close();
      } else if (typeof this.options_.redirectTo !== 'undefined' && this.options_.redirectTo !== '') {
        // console.log(this.options_.redirectTo);
        this.player_.pause();
        top.open(this.options_.redirectTo, '', 'resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, location=no');
      }
    } else {
      if (this.player_.hasClass('vjs-fullscreen-iphone-video')) {
        //scale down
        this.player_.removeClass('vjs-fullscreen-iphone-on');
        this.player_.removeClass('vjs-fullscreen-iphone-video');
        if (jQuery('#logo').size() > 0) jQuery('#logo').show();
        if (jQuery('.btn_back').size() > 0) jQuery('.btn_back').show();
        if (jQuery('.question').size() > 0) jQuery('.question').show();
        if (jQuery('#footer').size() > 0) jQuery('#footer').show();
        if (jQuery('#content').size() > 0) jQuery('#content').css('padding', '10px 0');
        if (jQuery('.cartoon').size() > 0) jQuery('.cartoon').css('padding', '10px');
      } else {
        if (jQuery('#logo').size() > 0) jQuery('#logo').hide();
        if (jQuery('.btn_back').size() > 0) jQuery('.btn_back').hide();
        if (jQuery('.question').size() > 0) jQuery('.question').hide();
        if (jQuery('#footer').size() > 0) jQuery('#footer').hide();
        if (jQuery('#content').size() > 0) jQuery('#content').css('padding', '0');
        if (jQuery('.cartoon').size() > 0) jQuery('.cartoon').css('padding', '0');
        if (jQuery('#content').size() > 0) this.player_.addClass('vjs-fullscreen-iphone-on');
        this.player_.addClass('vjs-fullscreen-iphone-video');
      }
    }
  };

  return FullscreenIphoneButton;
}(Button);

Component.registerComponent('FullscreenIphoneButton', FullscreenIphoneButton);

// Register the plugin with video.js.
registerPlugin('fullscreenIphone', fullscreenIphone);

// Include the version number.
fullscreenIphone.VERSION = version;

return fullscreenIphone;

})));
