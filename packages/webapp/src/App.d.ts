/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme } from '@thematic/core'
import './App.css'
export interface AppProps {
	theme: Theme
}
export declare const App: import('react-redux').ConnectedComponent<
	({ theme }: AppProps) => JSX.Element,
	import('react-redux').Omit<AppProps, 'theme'>
>
