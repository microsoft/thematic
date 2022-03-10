/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { loadById } from '@thematic/core'
import { createContext } from 'react'

import { loadFluentTheme } from '../loader.js'
import type { FluentTheme } from '../types.js'

const defaultTheme = loadById('default')
const defaultFluentTheme = loadFluentTheme(defaultTheme)

/**
 * Thematic context object for use in React apps
 */
export const ThematicFluentContext: React.Context<FluentTheme> =
	createContext(defaultFluentTheme)
