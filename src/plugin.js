import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Button = videojs.getComponent('Button');
const Component = videojs.getComponent('Component');

// Default options for the plugin.
const defaults = {};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
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
const onPlayerReady = (player, options) => {
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
const fullscreenIphone = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
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
class FullscreenIphoneButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.controlText('Fullscreen')
  }

  buildCSSClass() {
    /* Each button will have the classes:
       `vjs-fullscreen-iphone-button
       So you could have a generic icon for "skip back" and a more
       specific one for "skip back 30 seconds"
    */
    return "vjs-fullscreen-iphone-control vjs-control vjs-button";
  }

  handleClick() {

    console.log('I am clicked');
    console.log(this.options_);
    //if openNewPage is true, open a new page
    //else show at current page with the window size, but loation bar cann't be remove.
    if (this.options_.openNewPage) {
      if (this.options_.closeMe) {
        window.close();
      } else if (typeof(this.options_.redirectTo) !== 'undefined' && this.options_.redirectTo !== ''){
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
    
  }
}

Component.registerComponent('FullscreenIphoneButton', FullscreenIphoneButton);

// Register the plugin with video.js.
registerPlugin('fullscreenIphone', fullscreenIphone);

// Include the version number.
fullscreenIphone.VERSION = VERSION;

export default fullscreenIphone;
