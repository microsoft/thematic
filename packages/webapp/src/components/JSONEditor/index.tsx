/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TextField } from '@fluentui/react'
import { FC } from 'react'

interface JSONEditorProps {
	value: any
}

// the deep nesting of the component requires several layers of size adjustment
const styles = {
	root: {
		width: '100%',
		height: '100%',
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
}
export const JSONEditor: FC<JSONEditorProps> = ({ value }: JSONEditorProps) => {
	return (
		<TextField
			styles={styles}
			multiline
			readOnly
			value={JSON.stringify(value, null, 2)}
		/>
	)
}
