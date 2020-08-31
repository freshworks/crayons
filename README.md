![Release](https://github.com/freshworks/crayons/workflows/Release/badge.svg) ![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) ![NPM](https://img.shields.io/npm/l/@freshworks/crayons) ![npm](https://img.shields.io/npm/dw/@freshworks/crayons)

# 🖍️ Crayons

[Freshworks Crayons](https://crayons.freshworks.com) is a library of UI components that are the building blocks to help create an intuitive and uniform user interface for all your apps. This is a collection of [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that will help developers build apps faster that will adhere to the UX standards set by the Freshworks Design System.

### Installation

Please refer to the usage guidelines [here](./src/readme.md).

### Documentation

You can refer to the documentation on the [Crayons Website](https://crayons.freshworks.com).

### Development and Contribution

- Clone the repo:

```bash
git clone https://github.com/freshworks/crayons
cd crayons
npm install
git config core.hooksPath .git/hooks/
```

- To start in dev mode with HMR and [Storybook](https://storybook.js.org/):

```bash
npm run dev
```

- To build the components for production, run:

```bash
npm run build:components
```

- To run the tests for the components, run:

```bash
npm run test
```

- To generate a new component, run:

```bash
npm run generate
```

Please see [CONTRIBUTING GUIDELINES](CONTRIBUTING.md) for more details.

#### Code of Conduct

Please read the Code of Conduct [here](CODE_OF_CONDUCT.md).

##### Naming Components

When generating components, the custom element tags is prefixed with `fw-` while the rest of the name is modified to support web component standards. For example, if a component is generated with the name `Label`, the component that would be generated would be `<fw-label/>`.

#### Read more

This project is built with [StencilJS](https://stenciljs.com/). You can check out the following links for further information:

- [Build components](https://stenciljs.com/docs/decorators)
- [Testing a component](https://stenciljs.com/docs/testing-overview)
- [Using in different frameworks](https://stenciljs.com/docs/overview)
