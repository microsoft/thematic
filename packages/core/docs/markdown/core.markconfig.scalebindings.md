<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@thematic/core](./core.md) &gt; [MarkConfig](./core.markconfig.md) &gt; [scaleBindings](./core.markconfig.scalebindings.md)

## MarkConfig.scaleBindings property

Scale binding map to apply for nodes rendered with this mark config.

<b>Signature:</b>

```typescript
scaleBindings?: {
        [key: string]: {
            scale: (datum: any) => any;
            accessor?: (datum: any) => string | number;
        };
    };
```
