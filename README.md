# todo-ssr
> A progressively enhanced to-do web application.

* Single Page Application (SPA) to avoid page refreshes.
* Server-Side Rendering (SSR) for progressive enhancement.
* Server-side form validation for less redundancy.

Note: Normally, a project like this would be split into separate repositories; one for the client and one for the server. For educational purposes, both are combined here as a multi-package repository (or "monorepo").


## Installation

Be sure that [Git](https://git-scm.com) `>= 2` is installed.

Open a command line at, or change directory (`cd`) to where you'd like the project to exist (as a sub-directory).

Checkout the repository:
```shell
git clone git@github.com:stevenvachon/todo-ssr.git
```

Open the project directory:
```shell
cd todo-ssr
```

Refer to the READMEs in `client/` and `server/` for the remaining instructions.


## FAQ

1. **How to handle the client from the server when not a monorepo?**<br>
Set up a `postinstall` npm script to remove the client's package within `node_modules/` and `npm link` that removed path to the location of the client you plan to develop. Be sure to not have this script run in a production environment; possibly via checking the value of `NODE_ENV`.
