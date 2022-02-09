/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import essexViteConfig from '@essex/vite-config'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
const merged = {
	...defineConfig(essexViteConfig),
	base: '',
}
export default merged
