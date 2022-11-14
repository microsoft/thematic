/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TextField } from '@fluentui/react';
import { gimp } from '@thematic/core';
import { useThematic } from '@thematic/react';
import type { FC } from 'react';
import { useMemo } from 'react';

import { DownloadLink } from '../../../../../components/DownloadLink.js';
// the deep nesting of the component requires several layers of size adjustment
const styles = {
	root: {
		width: '100%',
		height: '90%',
	},
	wrapper: {
		height: '100%',
	},
	fieldGroup: {
		height: '100%',
	},
	field: {
		height: '100%',
		fontFamily: 'monospace',
		fontSize: 11,
	},
};
export const GimpPane: FC = () => {
	const theme = useThematic();
	const value: string = useMemo(() => theme.transform(gimp) as string, [theme]);
	return (
		<div style={{ width: '100%' }}>
			<TextField styles={styles} multiline={true} readOnly={true} value={value} />
			<DownloadLink
				filename={`${theme.name}-${theme.variant}.gpl`}
				blobParts={[value]}
				styles={{ root: { fontSize: '0.5em' } }}
			/>
		</div>
	);
};
