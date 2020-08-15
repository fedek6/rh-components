# Spinner preloader

Minimalistic spinner preloader with JS controller.

![preview](preview.png "preview")

## Instructions

Constructor params are:

* @param {Node} el Main preloader wrapper.
* @param {boolean} controlBody Should we add -loading modifier to body tag?
* @param {boolean} visible Is preloader already visible for example (when loading page)?

```js
import Preloader from "../components/molecules/preloader/preloader";

// Preload object for controlling preloader behaviour.
const MainPreloader = new Preloader(document.getElementById('main-preloader'), true, true);

// Hide preloader on content loaded.
document.addEventListener("DOMContentLoaded", (event) => { 
  MainPreloader.hidePreloader().then((state) => console.log('preloader state', state));
}); 

// Show when nedded.
MainPreloader.showPreloader().then((state) => console.log('preloader state', state));
```

https://github.com/lukeed/webpack-critical

## Demo 

### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.
