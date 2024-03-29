## API Report File for "@thematic/color"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// Warning: (ae-missing-release-tag) "Color" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export class Color {
    constructor(css: string, alpha?: number);
    // (undocumented)
    css(alpha?: number): string;
    // (undocumented)
    hex(alpha?: number): string;
    // (undocumented)
    hsl(): Hsl;
    // (undocumented)
    hsluv(): HslVector;
    get raw(): string;
    // (undocumented)
    rgba(alpha?: number): Rgba;
    // (undocumented)
    rgbaint(alpha?: number): number;
    // (undocumented)
    rgbav(alpha?: number): RGBAV;
    // (undocumented)
    toString(): string;
}

// Warning: (ae-missing-release-tag) "colorBlindness" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function colorBlindness(scheme: Scheme, mode?: ColorBlindnessMode): Scheme;

// Warning: (ae-missing-release-tag) "colorBlindnessInfo" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function colorBlindnessInfo(mode: ColorBlindnessMode): ColorBlindnessMeta;

// Warning: (ae-missing-release-tag) "ColorBlindnessMeta" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export interface ColorBlindnessMeta {
    // (undocumented)
    description: string;
    // (undocumented)
    incidence: number;
}

// Warning: (ae-missing-release-tag) "ColorBlindnessMode" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export enum ColorBlindnessMode {
    Achromatopsia = "achromatopsia",
    Deuteranomaly = "deuteranomaly",
    Deuteranopia = "deuteranopia",
    None = "none",
    Protanomaly = "protanomaly",
    Protanopia = "protanopia",
    Tritanomaly = "tritanomaly",
    Tritanopia = "tritanopia"
}

// Warning: (ae-missing-release-tag) "ColorSpace" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export enum ColorSpace {
    CSS = "css",
    HEX = "hex",
    HSL = "hsl",
    HSLUV = "hsluv",
    RGB = "rgb",
    RGBA = "rgba",
    RGBA_NUMBER = "rgbaint",
    RGBA_VECTOR = "rgbav"
}

// Warning: (ae-missing-release-tag) "contrast" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function contrast(foreground: string, background: string): number;

// Warning: (ae-missing-release-tag) "css2css" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function css2css(css: string, alpha?: number): string;

// Warning: (ae-missing-release-tag) "css2hex" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function css2hex(css: string, alpha?: number): string;

// Warning: (ae-missing-release-tag) "css2hsl" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function css2hsl(css: string, _alpha?: number): Hsl;

// Warning: (ae-missing-release-tag) "css2hsluv" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function css2hsluv(css: string): HslVector;

// Warning: (ae-missing-release-tag) "css2hsv" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function css2hsv(css: string, _alpha?: number): Hsv;

// Warning: (ae-missing-release-tag) "css2lch" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function css2lch(css: string): HslVector;

// Warning: (ae-missing-release-tag) "css2rgb" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function css2rgb(css: string, _alpha?: number): Rgb;

// Warning: (ae-missing-release-tag) "css2rgba" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function css2rgba(css: string, alpha?: number): Rgba;

// Warning: (ae-missing-release-tag) "css2rgbaint" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function css2rgbaint(css: string, alpha?: number): number;

// Warning: (ae-missing-release-tag) "css2rgbav" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function css2rgbav(css: string, alpha?: number): [number, number, number, number];

// Warning: (ae-missing-release-tag) "darken" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function darken(css: string, value?: number): string;

// Warning: (ae-missing-release-tag) "defaultParams" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export const defaultParams: {
    accentHue: number;
    accentSaturation: number;
    accentLightness: number;
    scaleSaturation: number;
    scaleLightness: number;
    greyHue: number;
    greySaturation: number;
};

// Warning: (ae-missing-release-tag) "getNamedSchemeColor" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function getNamedSchemeColor(scheme: Scheme, path?: string): Color;

// Warning: (ae-missing-release-tag) "getScheme" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function getScheme(params: SchemeParams, nominalItemCount: number, sequentialItemCount: number, light: boolean, tuning?: Partial<TuningParameters>): Scheme;

// Warning: (ae-missing-release-tag) "Hsl" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface Hsl {
    // (undocumented)
    h: number;
    // (undocumented)
    l: number;
    // (undocumented)
    s: number;
}

// Warning: (ae-missing-release-tag) "hsluv2hex" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function hsluv2hex(hsluv: HslVector): string;

// Warning: (ae-missing-release-tag) "hsluv2hsl" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function hsluv2hsl(hsluv: HslVector): HslVector;

// Warning: (ae-missing-release-tag) "HslVector" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HslVector = [number, number, number];

// Warning: (ae-missing-release-tag) "Hsv" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface Hsv {
    // (undocumented)
    h: number;
    // (undocumented)
    s: number;
    // (undocumented)
    v: number;
}

// Warning: (ae-missing-release-tag) "isNominal" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function isNominal(name?: string): boolean;

// Warning: (ae-missing-release-tag) "lch2hex" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function lch2hex(l: number, c: number, h: number): string;

// Warning: (ae-missing-release-tag) "lighten" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function lighten(css: string, value?: number): string;

// Warning: (ae-missing-release-tag) "nearest" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function nearest(input: Color, list: Color[]): Color;

// Warning: (ae-missing-release-tag) "Rgb" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface Rgb {
    // (undocumented)
    b: number;
    // (undocumented)
    g: number;
    // (undocumented)
    r: number;
}

// Warning: (ae-missing-release-tag) "Rgba" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface Rgba extends Rgb {
    // (undocumented)
    a?: number;
}

// Warning: (ae-missing-release-tag) "rgba2hex" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function rgba2hex(rgba: Rgba): string;

// Warning: (ae-missing-release-tag) "RGBAV" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type RGBAV = [number, number, number, number];

// Warning: (ae-missing-release-tag) "rgbav2hex" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function rgbav2hex(rgbav: RGBAV): string;

// Warning: (ae-missing-release-tag) "Scheme" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export interface Scheme {
    // (undocumented)
    accent: string;
    // (undocumented)
    background: string;
    dataPrimary: string;
    // (undocumented)
    dataPrimaryBold: string;
    // (undocumented)
    dataPrimaryMuted: string;
    // (undocumented)
    diverging: string[];
    // (undocumented)
    diverging2: string[];
    // (undocumented)
    error: string;
    // (undocumented)
    faintAnnotation: string;
    // (undocumented)
    foreground: string;
    // (undocumented)
    greys: string[];
    // (undocumented)
    highContrastAnnotation: string;
    // (undocumented)
    lowContrastAnnotation: string;
    // (undocumented)
    lowMidContrastAnnotation: string;
    // (undocumented)
    midContrastAnnotation: string;
    // (undocumented)
    midHighContrastAnnotation: string;
    // (undocumented)
    nominal: string[];
    // (undocumented)
    nominalBold: string[];
    // (undocumented)
    nominalMuted: string[];
    // (undocumented)
    offsetBackground: string;
    // (undocumented)
    rainbow: string[];
    // (undocumented)
    sequential: string[];
    // (undocumented)
    sequential2: string[];
    // (undocumented)
    warning: string;
}

// Warning: (ae-missing-release-tag) "SchemeParams" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export interface SchemeParams {
    accentHue: number;
    accentLightness: number;
    accentSaturation: number;
    greyHue?: number;
    greySaturation?: number;
    scaleLightness?: number;
    scaleSaturation?: number;
}

// Warning: (ae-missing-release-tag) "TuningParameters" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export interface TuningParameters {
    // (undocumented)
    analogousRange: number;
    // (undocumented)
    backgroundHueShift: number;
    // (undocumented)
    backgroundLevel: number;
    // (undocumented)
    complementaryRange: number;
    // (undocumented)
    darkBackgroundLightnessShift: number;
    // (undocumented)
    darkestGrey: number;
    // (undocumented)
    darkMaxLightnessOffet: number;
    // (undocumented)
    darkTextLightness: number;
    // (undocumented)
    lightBackgroundLightnessShift: number;
    // (undocumented)
    lightestGrey: number;
    // (undocumented)
    lightMaxLightnessOffset: number;
    // (undocumented)
    lightTextLightness: number;
    // (undocumented)
    lowContrastBackgroundShift: number;
    // (undocumented)
    maxBackgroundChroma: number;
    // (undocumented)
    minNominalLightness: number;
    // (undocumented)
    minNominalSaturation: number;
    // (undocumented)
    nominalBoldLightnessShift: number;
    // (undocumented)
    nominalBoldSaturationShift: number;
    // (undocumented)
    nominalHueStep: number;
    // (undocumented)
    nominalMutedLightnessShift: number;
    // (undocumented)
    nominalMutedSaturationShift: number;
    // (undocumented)
    offsetBackgroundLightnessShift: number;
    // (undocumented)
    polynomialExponent: number;
    // (undocumented)
    reservedDataColors: number;
}

// (No @packageDocumentation comment for this package)

```
