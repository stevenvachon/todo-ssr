# todo-ssr-client
> A progressively enhanced to-do application written with [React](https://npmjs.com/react).

* Uni-directional flow with app state via [Redux](https://npmjs.com/redux).
* Most components are functional/stateless, to avoid async issues with unmounting.
* Native browser form validation for new browsers, server-side validation for old browsers.


## Installation

Be sure that [Node.js](http://nodejs.org) `>= 8` is installed.

Install all dependencies:
```shell
npm install
```


## Building and Testing

A build can be performed manually via:
```shell
npm run build
```

…or automatically as you make changes to files via:
```shell
npm run watch
```

The test suite can be ran manually via:
```shell
npm test
```

…or automatically as you make changes to files via:
```shell
npm run test-watch
```


## Utilities

You can check to see if any dependencies have updates available with:
```shell
npm run check-updates
```


## FAQ

1. **What's the difference between the `cjs` and `esm` directories?**<br>
The former is a Node.js-compatible build of the latter. Do your development in `esm`.
