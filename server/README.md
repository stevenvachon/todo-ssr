# todo-ssr-server
> A progressively enhanced to-do application written with [Express](https://npmjs.com/express).

* Supports multiple instances (not a singleton)
* Simple setup
* SQL migrations
* No SQL concatenation (via a query builder)
* Form validations
* Logger

Not done yet:
* restart server when files change
* test suite


## Installation

Be sure that [Node.js](http://nodejs.org) `>= 8` and [PostgreSQL](https://postgresql.org) `>= 9` are installed.

Create the database and user:
```shell
npm run createdb
```

Install all dependencies:
```shell
npm install
```


## Serving and Testing

The server can be both built and started via:
```shell
npm start
```

The test suite can be ran manually via:
```shell
npm test
```

…or automatically as you make changes to files via:
```shell
npm run watch
```


## Utilities

You can check to see if any dependencies have updates available with:
```shell
npm run check-updates
```

You can remove the database and its user with:
```shell
npm run dropdb
```

You can update the database after breaking changes with:
```js
npm run migrate-up
```

Advanced migrations will require using `knex` directly:
```js
npx knex
```


## FAQ

1. **What's the difference between the `cjs` and `esm` directories?**<br>
The former is a Node.js-compatible build of the latter. Do your development in `esm`.
