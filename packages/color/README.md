Contains color transforms and helpers, as well as the core color compute logic to generate themes from a set of input parameters. This package also contains color blindness simulation logic that you can apply to themes to see how your app will look to people with various color blindnesses.

## Schemes

A Thematic [Scheme](src/interfaces.ts) is the core color definition derived from a set of input parameters.

The idea here is that users can submit basic color parameters such as an accent color and some preferences about contrast,
and get back a core set of semantic colors for the theme, along with a basic set of scales.

The scheme forms the underlying basis for all mappings within a Theme instance, such as the specific fills for marks.

You can think of the Scheme as the basic color set, and the Theme instance as a live API to apply it to different mark types and scale configurations.
