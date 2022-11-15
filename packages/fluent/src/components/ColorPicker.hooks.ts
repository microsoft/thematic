/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

export function useSliderChange(key: string, onChange: (params: any) => void) {
	return useCallback((v: number) => onChange({ [key]: v }), [key, onChange])
}
