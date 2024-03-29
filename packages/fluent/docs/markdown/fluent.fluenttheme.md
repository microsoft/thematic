<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@thematic/fluent](./fluent.md) &gt; [FluentTheme](./fluent.fluenttheme.md)

## FluentTheme interface

This interface provides a mapping from thematic theme config to a theme suitable for use with the Fluent UI library. https://developer.microsoft.com/en-us/fluentui\#/ Dev docs: https://developer.microsoft.com/en-us/fluentui\#/controls/web

<b>Signature:</b>

```typescript
export interface FluentTheme extends IFluentTheme, IThematicTheme 
```
<b>Extends:</b> IFluentTheme, IThematicTheme

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [name](./fluent.fluenttheme.name.md) |  | string | Name of the theme. This is redundant to both, but normalizes the type. |
|  [toFluent](./fluent.fluenttheme.tofluent.md) |  | () =&gt; IFluentTheme | Returns a Fluent-compatible theme object, suitable to apply to the ThemeProvider component See https://developer.microsoft.com/en-us/fluentui\#/controls/web/themes |
|  [toThematic](./fluent.fluenttheme.tothematic.md) |  | () =&gt; IThematicTheme | Returns the core thematic theme used to instantiate this joint instance. |

