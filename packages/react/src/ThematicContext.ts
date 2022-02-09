/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { loadById, Theme } from '@thematic/core'
import { createContext } from 'react'
export const defaultTheme = loadById('default') as Theme

/**
 * Thematic context object for use in React apps
 */
export const ThematicContext: React.Context<Theme> = createContext(defaultTheme)
