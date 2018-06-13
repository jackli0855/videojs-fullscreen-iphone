(function (QUnit,sinon,videojs) {
'use strict';

QUnit = QUnit && QUnit.hasOwnProperty('default') ? QUnit['default'] : QUnit;
sinon = sinon && sinon.hasOwnProperty('default') ? sinon['default'] : sinon;
videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var empty = {};


var empty$1 = (Object.freeze || Object)({
	'default': empty
});

var minDoc = ( empty$1 && empty ) || empty$1;

var topLevel = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal :
    typeof window !== 'undefined' ? window : {};


var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

var document_1 = doccy;

var version = "0.0.0";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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
      } else {
        this.player_.addClass('vjs-fullscreen-iphone-on');
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

var Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function (assert) {
  assert.strictEqual(_typeof(Array.isArray), 'function', 'es5 exists');
  assert.strictEqual(typeof sinon === 'undefined' ? 'undefined' : _typeof(sinon), 'object', 'sinon exists');
  assert.strictEqual(typeof videojs === 'undefined' ? 'undefined' : _typeof(videojs), 'function', 'videojs exists');
  assert.strictEqual(typeof fullscreenIphone === 'undefined' ? 'undefined' : _typeof(fullscreenIphone), 'function', 'plugin is a function');
});

QUnit.module('videojs-fullscreen-iphone', {
  beforeEach: function beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document_1.getElementById('qunit-fixture');
    this.video = document_1.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },
  afterEach: function afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function (assert) {
  assert.expect(2);

  assert.strictEqual(_typeof(Player.prototype.fullscreenIphone), 'function', 'videojs-fullscreen-iphone plugin was registered');

  this.player.fullscreenIphone();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(this.player.hasClass('vjs-fullscreen-iphone'), 'the plugin adds a class to the player');
});

}(QUnit,sinon,videojs));
