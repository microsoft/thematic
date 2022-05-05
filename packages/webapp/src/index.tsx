/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { initializeIcons } from '@fluentui/font-icons-mdl2'
import { createRoot } from 'react-dom/client'

import { App } from './components/App'

function mount(): void {
	try {
		const rootElement = document.getElementById('root')
		initializeIcons(undefined, { disableWarnings: true })
		const root = createRoot(rootElement!)
		root.render(<App />)
	} catch (err) {
		console.error('error rendering application', err)
	}
}
initializeIcons()
mount()
