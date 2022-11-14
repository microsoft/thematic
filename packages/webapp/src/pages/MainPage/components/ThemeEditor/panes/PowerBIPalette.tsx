/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { PowerBITheme } from '@thematic/core';
import type { FC } from 'react';
import { useMemo } from 'react';

import type { ColorDefinition } from '../../../../../components/ColorStrip.js';
import { ColorStrip } from '../../../../../components/ColorStrip.js';
import { useStyles } from './hooks.js';

export interface PowerBIPaletteProps {
	colors: PowerBITheme;
}

const mainKeys = ['foreground', 'background', 'tableAccent'];

const mapkeys = (theme: PowerBITheme, keys: string[]) =>
	keys.map((key) => ({
		color: theme[key as keyof PowerBITheme],
		label: key,
		secondaryLabel: theme[key as keyof PowerBITheme],
	}));

export const PowerBIPalette: FC<PowerBIPaletteProps> = ({ colors }) => {
	const mains = useMemo(() => mapkeys(colors, mainKeys) as ColorDefinition[], [colors]);
	const dataColorsLeft = useMemo(
		() =>
			colors.dataColors.slice(0, 6).map((c) => ({
				color: c,
				label: c,
			})),
		[colors],
	);
	const dataColorsRight = useMemo(
		() =>
			colors.dataColors.slice(6).map((c) => ({
				color: c,
				secondaryLabel: c,
			})),
		[colors],
	);
	const styles = useStyles();
	return (
		<div style={styles.root}>
			<div>
				<div style={styles.header}>Primary</div>
				<ColorStrip vertical={true} colorDefinitions={mains} swatchStyle={styles.swatch} />
			</div>
			<div>
				<div style={styles.header}>Data Colors</div>
				<div style={{ display: 'flex', alignItems: ' flex-start' }}>
					<ColorStrip vertical={true} colorDefinitions={dataColorsLeft} swatchStyle={styles.swatch} />
					<ColorStrip vertical={true} colorDefinitions={dataColorsRight} swatchStyle={styles.swatch} />
				</div>
			</div>
		</div>
	);
};
