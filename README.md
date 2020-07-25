# Thematic

This repository holds all of the packages for creating sharable, perceptually-balanced and tastefully complementary (hopefully!) application and data viz themes. There are adapter libraries and tools to apply themes across several environments, which will be detailed below.

This repository is structured as a lerna monorepo. It contains separate packages for all of the theme generation, management, and applications. To use thematic in your app, you should only need to install the relevant packages for your use case(s).

The webapp package is a guide for everything Thematic. In particular, it comprises:

- A running application for configuring theme parameters
- An example app using thematic itself, so you can see what controls and charts look like
- A variety of code examples to explore showing how to use thematic in practice

## Organization

Our thematic packages are published under the `@thematic` scope.

These are the core Thematic libraries, see individual README.md files for greater detail:

- [@thematic/color](packages/color/README.md) - this contains color conversion and scale generation logic. If you need functions to convert between color spaces, this is the place. This also has the color scheme compute logic that dictates how all of the color scales are generated from a few selected input parameters.
- [@thematic/core](packages/core/README.md) - this is the main package for working with Themes. You can load them from a Theme JSON specification, then use the attributes directly in your app to apply the generated colors in a consistent way. We've used SVG notation for all of our mark properties (e.g., 'fill').
- [@thematic/d3](packages/d3/README.md) - this package has helpers to apply the themes to viz created with [d3](https://d3js.org/). We provide a variety of SVG mark primitives that operate on a d3 Selection, so you can apply the theme elements using `selection.call(fn, [params])` as needed.
- [@thematic/fluent](packages/fluent/README.md) - helpers for applying Thematic to the [Fluent UI library](https://developer.microsoft.com/en-us/fluentui#/controls/web)
- [@thematic/react](packages/react/README.md) - helpers to bootstrap theming into React-based apps, particularly a provider and context hook (useThematic) for grabbing the theme anywhere it is needed.
- [@thematic/vega](packages/vega/README.md) - this has a helper that applies our theme spec as default configuration for Vega charts so they automatically adopt the theme.
- [@thematic/webapp](packages/webapp/README.md) - this is the theme editor webapp that you can run or access at https://microsoft.github.io/thematic.

## Getting Started

If you want to run locally and work on the app or any theme components, you can run the whole thing from the root folder. The web app will run using `yarn start` as with our typical development structure, and changes to any of the other packages will be reflected live thanks to lerna and watchers. See the Available Scripts section below.

## Publishing

Commits to `main` will automatically deploy to the hosted website. If changes need to be released so the libraries are published into npm, use `yarn release` and follow the steps presented by lerna.

# Developing

This monorepo uses [lerna](https://lerna.js.org/) to manage packages, and our team's [build infra scripts](https://github.com/microsoft/essex-alpha-build-infra).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
An available port will be selected automatically, such as 8080. Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner using Jest.

### `yarn build`

Builds packages for production to their respective `dist` and `lib` folders. Note that the webapp uses a `bundle` command more appropriate to creating an optimized web bundle. CI systems will want to invoke both of these to produce complete

### `yarn clean`

Cleans build artifacts as well as deleting the node_modules for every package.

### `yarn clean:all`

Cleans out the node_modules and built lib directories for every package.

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
