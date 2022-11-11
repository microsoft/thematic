## API Report File for "@thematic/fluent"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="react" />

import type { ContinuousColorScaleFunction } from '@thematic/core';
import type { CSSProperties } from 'react';
import type { FC } from 'react';
import type { IChoiceGroupStyles } from '@fluentui/react';
import type { IDropdownOption } from '@fluentui/react';
import type { IDropdownProps } from '@fluentui/react';
import type { NominalColorScaleFunction } from '@thematic/core';
import type { ReactNode } from 'react';
import type { ScaleType } from '@thematic/core';
import type { Theme } from '@thematic/core';
import type { Theme as Theme_2 } from '@fluentui/react';

// Warning: (ae-missing-release-tag) "ChipsProps" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface ChipsProps {
    // (undocumented)
    height?: number;
    // (undocumented)
    maxItems?: number;
    // (undocumented)
    scale: ContinuousColorScaleFunction | NominalColorScaleFunction;
    // (undocumented)
    width?: number;
}

// Warning: (ae-missing-release-tag) "ColorPicker" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export const ColorPicker: FC<ColorPickerProps>;

// Warning: (ae-missing-release-tag) "ColorPickerButton" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export const ColorPickerButton: FC<ColorPickerButtonProps>;

// Warning: (ae-missing-release-tag) "ColorPickerButtonProps" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface ColorPickerButtonProps {
    // (undocumented)
    label?: string;
    // (undocumented)
    onChange?: (theme: Theme) => void;
    // (undocumented)
    styles?: ColorPickerButtonStyles;
}

// Warning: (ae-missing-release-tag) "ColorPickerButtonStyles" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface ColorPickerButtonStyles {
    // (undocumented)
    label?: CSSProperties;
}

// Warning: (ae-missing-release-tag) "ColorPickerLayout" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export enum ColorPickerLayout {
    // (undocumented)
    PickerOnly = "pickeronly",
    // (undocumented)
    SideBySide = "sidebyside"
}

// Warning: (ae-missing-release-tag) "ColorPickerProps" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface ColorPickerProps {
    // (undocumented)
    layout?: ColorPickerLayout;
    // (undocumented)
    onChange?: (theme: Theme) => void;
    // (undocumented)
    styles?: ColorPickerStyles;
}

// Warning: (ae-missing-release-tag) "ColorPickerStyles" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface ColorPickerStyles {
    // (undocumented)
    slider?: CSSProperties;
    // (undocumented)
    sliders?: CSSProperties;
}

// Warning: (ae-missing-release-tag) "FluentTheme" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export interface FluentTheme extends Theme_2, Theme {
    name: string;
    toFluent: () => Theme_2;
    toThematic: () => Theme;
}

// Warning: (ae-missing-release-tag) "loadFluentTheme" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function loadFluentTheme(theme: Theme): FluentTheme;

// Warning: (ae-missing-release-tag) "ScaleDropdown" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export const ScaleDropdown: FC<ScaleDropdownProps>;

// Warning: (ae-missing-release-tag) "ScaleDropdownItemProps" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface ScaleDropdownItemProps {
    // (undocumented)
    option: IDropdownOption;
    // (undocumented)
    paletteHeight: number;
    // (undocumented)
    paletteWidth: number;
    // (undocumented)
    style?: React.CSSProperties;
}

// Warning: (ae-missing-release-tag) "ScaleDropdownProps" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type ScaleDropdownProps = Omit<IDropdownProps, 'options'>;

// Warning: (ae-missing-release-tag) "ScaleTypeChoiceGroup" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export const ScaleTypeChoiceGroup: FC<ScaleTypeChoiceGroupProps>;

// Warning: (ae-missing-release-tag) "ScaleTypeChoiceGroupProps" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface ScaleTypeChoiceGroupProps {
    // (undocumented)
    label: string;
    // (undocumented)
    onChange?: (scaleType: ScaleType) => void;
    // (undocumented)
    selectedType: ScaleType;
    // (undocumented)
    styles?: IChoiceGroupStyles;
    // (undocumented)
    suppressQuantile?: boolean;
}

// Warning: (ae-missing-release-tag) "ThematicFluentProvider" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export const ThematicFluentProvider: FC<ThematicFluentProviderProps>;

// Warning: (ae-missing-release-tag) "ThematicFluentProviderProps" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface ThematicFluentProviderProps {
    // (undocumented)
    children?: ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    // (undocumented)
    theme: Theme;
}

// Warning: (ae-missing-release-tag) "useThematicFluent" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public
export function useThematicFluent(dark?: boolean): FluentTheme;

// (No @packageDocumentation comment for this package)

```