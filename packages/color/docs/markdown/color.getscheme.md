<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@thematic/color](./color.md) &gt; [getScheme](./color.getscheme.md)

## getScheme() function

Takes a set of core params and generates all of the scale computes required for a Schema, using HSLuv color space for even perceptual qualities.

<b>Signature:</b>

```typescript
export declare function getScheme(params: SchemeParams, nominalItemCount: number, sequentialItemCount: number, light: boolean, tuning?: Partial<TuningParameters>): Scheme;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  params | [SchemeParams](./color.schemeparams.md) |  |
|  nominalItemCount | number |  |
|  sequentialItemCount | number |  |
|  light | boolean |  |
|  tuning | Partial&lt;[TuningParameters](./color.tuningparameters.md)<!-- -->&gt; | <i>(Optional)</i> |

<b>Returns:</b>

[Scheme](./color.scheme.md)

