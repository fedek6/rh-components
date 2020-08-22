# 3D instancing background

Based on [webgl instancing performacne demo](https://github.com/mrdoob/three.js/blob/dev/examples/webgl_instancing_performance.html).

Three.js installation guide can be found [here](https://threejs.org/docs/index.html#manual/en/introduction/Installation).

Postprocessing tutorial [here](https://threejsfundamentals.org/threejs/lessons/threejs-post-processing.html).

Range selector styling tutorial [here](https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/).


## Starter pack

https://github.com/wbkd/webpack-starter


# Webpack Frontend Starterkit

[![Dependabot badge](https://flat.badgen.net/dependabot/wbkd/webpack-starter?icon=dependabot)](https://dependabot.com/)

A lightweight foundation for your next webpack based frontend project.

## Model conversion

https://github.com/CesiumGS/obj2gltf

```
obj2gltf -i model.obj

obj2gltf -i model.obj -o model.gltf

obj2gltf -i model.obj -o model.glb
```

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
