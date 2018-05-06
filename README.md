# videojs-fullscreen-iphone



## Installation

```sh
npm install --save videojs-fullscreen-iphone
```

## Usage

To include videojs-fullscreen-iphone on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-fullscreen-iphone.min.js"></script>
<script>
  var player = videojs('my-video');

  player.fullscreenIphone();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-fullscreen-iphone via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-fullscreen-iphone');

var player = videojs('my-video');

player.fullscreenIphone();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-fullscreen-iphone'], function(videojs) {
  var player = videojs('my-video');

  player.fullscreenIphone();
});
```

## License

MIT. Copyright (c) libao &lt;lb.funward@gmail.com&gt;


[videojs]: http://videojs.com/
