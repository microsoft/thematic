<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@thematic/core](./core.md) &gt; [ColorScales](./core.colorscales.md)

## ColorScales interface

<b>Signature:</b>

```typescript
export interface ColorScales 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [diverging](./core.colorscales.diverging.md) |  | (domain?: number\[\], scaleType?: [ScaleType](./core.scaletype.md)<!-- -->, quantiles?: number) =&gt; [ContinuousColorScaleFunction](./core.continuouscolorscalefunction.md) |  |
|  [diverging2](./core.colorscales.diverging2.md) |  | (domain?: number\[\], scaleType?: [ScaleType](./core.scaletype.md)<!-- -->, quantiles?: number) =&gt; [ContinuousColorScaleFunction](./core.continuouscolorscalefunction.md) |  |
|  [greys](./core.colorscales.greys.md) |  | (domain?: number\[\], scaleType?: [ScaleType](./core.scaletype.md)<!-- -->, quantiles?: number) =&gt; [ContinuousColorScaleFunction](./core.continuouscolorscalefunction.md) |  |
|  [nominal](./core.colorscales.nominal.md) |  | (sizeOrDomain?: number \| string\[\] \| number\[\]) =&gt; [NominalColorScaleFunction](./core.nominalcolorscalefunction.md) |  |
|  [nominalBold](./core.colorscales.nominalbold.md) |  | (sizeOrDomain?: number \| string\[\] \| number\[\]) =&gt; [NominalColorScaleFunction](./core.nominalcolorscalefunction.md) |  |
|  [nominalMuted](./core.colorscales.nominalmuted.md) |  | (sizeOrDomain?: number \| string\[\] \| number\[\]) =&gt; [NominalColorScaleFunction](./core.nominalcolorscalefunction.md) |  |
|  [rainbow](./core.colorscales.rainbow.md) |  | (domain?: number\[\], scaleType?: [ScaleType](./core.scaletype.md)<!-- -->, quantiles?: number) =&gt; [ContinuousColorScaleFunction](./core.continuouscolorscalefunction.md) |  |
|  [sequential](./core.colorscales.sequential.md) |  | (domain?: number\[\], scaleType?: [ScaleType](./core.scaletype.md)<!-- -->, quantiles?: number) =&gt; [ContinuousColorScaleFunction](./core.continuouscolorscalefunction.md) | Constructs a sequential numeric scale based on the input domain and specified ScaleType The input domain should be an array of values. For linear or log scales, the behavior mimics d3-scale. For quantile scales, the domain values are used to construct a quantile division using the requested number of quantile bins |
|  [sequential2](./core.colorscales.sequential2.md) |  | (domain?: number\[\], scaleType?: [ScaleType](./core.scaletype.md)<!-- -->, quantiles?: number) =&gt; [ContinuousColorScaleFunction](./core.continuouscolorscalefunction.md) |  |

