Changes:

## Pin node version with Volta

https://volta.sh/

- Installation: `curl https://get.volta.sh | bash`

- Pin node version in the project:

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
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

More info:
* https://babeljs.io/docs/en/babel-preset-env
* https://babeljs.io/docs/en/babel-preset-react

> Why?
> Transform JSX to JS.
> More info: https://babeljs.io/docs/en/babel-plugin-transform-react-jsx

* https://babeljs.io/docs/en/babel-plugin-transform-runtime

> Why?
> Babel uses very small helpers for common functions such as _extend. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.
>
> This is where the @babel/plugin-transform-runtime plugin comes in: all of the helpers will reference the module @babel/runtime to avoid duplication across your compiled output. The runtime will be compiled into your build.

## React Testing Library

```bash
npm install --save-dev @testing-library/react@release-12.x
```

Last versions of React Testing Library doesn't support React 16.x.
We are forced to use an old version (currently).
More info: https://stackoverflow.com/questions/71713405/cannot-find-module-react-dom-client-from-node-modules-testing-library-react#comment127543807_71716438

## Install ESLint

```
npm init @eslint/config
```

Some extra configs needed (jsx support). More info: https://eslint.org/docs/latest/use/configure/
