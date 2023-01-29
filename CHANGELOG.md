# Changelog

# Goals sort by priority

(+ priority)

-   Meet the requirements (Redux + Saga + Ola DS) (mandatory!)
-   Fix security issues (mandatory!)
-   Increase robustness (with testing, clean code, apply programming patterns, etc.)
-   UX: Improve the user experience (accessibility, performance, i18n, etc.)
-   Document as much as possible
-   Add new functionalities not proposed (filters, sorting, etc.) (optional)

(- priority)

## Summary

-   [x] Pine Node version with Volta
-   [ ] Add TypeDoc to document code
-   [ ] Redux + sagas
-   [ ] Use Ola DS
-   [x] Eslint
-   [ ] Migration to TypeScript
-   [ ] Add typings
-   [x] Add prettier
-   [ ] Add Responsive
-   [x] Add Jest
-   [x] Add React Testing Library
-   [x] Unit Tests
-   [x] Add Cypress.io (e2e tests)
-   [x] Add e2e tests
-   [x] Add react-i18next (i18n)
-   [ ] Refact: Big component to small components
-   [ ] Refact: From Class-Components to Function-Components
-   [ ] Refact: Presentation pattern & Render pattern
-   [ ] Refact: Add react-query (query caching)
-   [ ] Add throttling to the API calls (less requests to the server)
-   [ ] Update React, Webpack, Node & other libraries
-   [ ] Create a docker image to run the app

## Pin node version with Volta

https://volta.sh/

-   Installation: `curl https://get.volta.sh | bash`

-   Pin node version in the project:

    ```bash
    $ volta pin node@12
    success: pinned node@12.22.12 (with npm@6.14.16) in package.json
    ```

## Install Jest

```bash
npm install jest@26
```

New versions doesn't work with Node 12.x. Current version is 29.x.

### Support JSX in Jest

```bash
npm install --save-dev @babel/preset-react @babel/preset-env @babel/plugin-transform-runtime
```

Create .babelrc file with and other presets & plugins:

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": ["@babel/plugin-transform-runtime"]
}
```

More info:

-   https://babeljs.io/docs/en/babel-preset-env
-   https://babeljs.io/docs/en/babel-preset-react

> Why?
> Transform JSX to JS.
> More info: https://babeljs.io/docs/en/babel-plugin-transform-react-jsx

-   https://babeljs.io/docs/en/babel-plugin-transform-runtime

> Why?
> Babel uses very small helpers for common functions such as \_extend. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.
>
> This is where the @babel/plugin-transform-runtime plugin comes in: all of the helpers will reference the module @babel/runtime to avoid duplication across your compiled output. The runtime will be compiled into your build.

## React Testing Library

```bash
npm install --save-dev @testing-library/react@release-12.x
```

Last versions of React Testing Library doesn't support React 16.x.
We are forced to use an old version (currently).
More info: https://stackoverflow.com/questions/71713405/cannot-find-module-react-dom-client-from-node-modules-testing-library-react#comment127543807_71716438

Other dependencies:

```bash
npm i -D @testing-library/jest-dom
```

## Instal nock (mocking HTTP requests)

https://www.npmjs.com/package/nock

We can directly mock axios with Jest but we make our test and our code will be even more dependent on Axios. In the future we might want to switch from Axios to other request library.

```bash
npm i -D nock
```

## Install [Cypress.io](https://www.cypress.io/) (e2e tests)

```bash
npm install cypress --save-dev
```

Create `.github/workflows/test.yml` to run the tests in the CI (github).

Install [Cypress ESLint plugin](https://github.com/cypress-io/eslint-plugin-cypress) because Cypress uses global variables and we need to tell ESLint to ignore them:

```bash
npm install eslint-plugin-cypress --save-dev
```

```yaml
on: [push]
jobs:
    cypress:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v3
            - name: Cypress run
              uses: cypress-io/github-action@v5
              with:
                  build: npm run build
                  start: npm start
```

To execute cypress locally (open the cypress UI):

```bash
npm run cypress:open
```

To run Cypress for CI (headless mode):

```bash
npm run cypress:run
```

## Install ESLint

```
npm init @eslint/config
```

Some extra configs needed (jsx support). More info: https://eslint.org/docs/latest/use/configure/

## Install Prettier

https://prettier.io/docs/en/install.html

```bash
npm install --save-dev --save-exact prettier
# Create an empty config file
echo {}> .prettierrc.json
```

There are other options. I use prettier (for now) because it's simple and (almost) standard. But I could use any other code formatter.

## Install Ola DS

```bash
npm i @marketgoo/ola
```
