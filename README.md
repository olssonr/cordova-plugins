# cordova-plugins

A simple plugin manager for Cordova.

## Installation

```bash
$ npm install https://github.com/olssonr/cordova-plugins
```

## plugins.json

cordova-plugins keeps tracks of the required plugins in plugins.json. It should contain a list of the plugins you want to install for your project. cordova-plugins expects this file to exist in the projects root folder.

```json
[
  "de.appplant.cordova.plugin.hidden-statusbar-overlay@1.2.0"
]
```

## API usage

### plugins.verify

Checks if the plugins in plugins.json are installed using `cordova plugin ls`. Throws an exception if a plugin is missing.

```js
var plugins = require('cordova-plugins');

plugins.verify
```

### plugins.install

Installs all plugins in plugins.json using `cordova plugin install`.

```js
var plugins = require('cordova-plugins');

plugins.verify
```

## CLI usage

If you want to use the cli it's recommend you install it globally:

```bash
$ npm install -g https://github.com/olssonr/cordova-plugins
$ cordova-plugins -h
```

However you can also use it with a local installation:

```bash
$ npm install
$ node_modules/cordova-plugins/index.js -h
```
