/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IconButton } from '@fluentui/react';
import { contrast } from '@thematic/color';
import type { CSSProperties, FC } from 'react';
import { useMemo } from 'react';

export interface ContrastProps {
	foreground: string;
	background: string;
	error: string;
	showLink?: boolean;
}

const WCAG = 4.5;
const ICON_SIZE = '0.7em';
const NOTE = 'WCAG guidelines recommend a minimum contrast ratio of 4.5:1';

export const Contrast: FC<ContrastProps> = ({ foreground, background, error, showLink }) => {
	const c = useMemo(() => contrast(foreground, background), [foreground, background]);
	const low = c < WCAG;
	const style = useMemo(() => {
		const s: CSSProperties = {};
		if (low) {
			s.color = error;
		}
		return s;
	}, [low, error]);

	const display = Math.round(c * 100) / 100;
	return (
		<>
			<span style={style} title={NOTE}>
				{display}
			</span>
			{showLink && low ? (
				<IconButton
					iconProps={{ iconName: 'NavigateExternalInline' }}
					styles={buttonStyles}
					href="https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast"
					title={NOTE}
					target="_blank"
				/>
			) : null}
		</>
	);
};

const buttonStyles = {
	root: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
	icon: {
		fontSize: ICON_SIZE,
	},
};
