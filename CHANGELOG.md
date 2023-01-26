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

## React Testing Library

```bash
npm install --save-dev @testing-library/react
```

## Install ESLint

```
npm init @eslint/config
```

Some extra configs needed (jsx support). More info: https://eslint.org/docs/latest/use/configure/
