/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function isNominal(name?: string): boolean {
	return name === 'nominal' || name === 'nominalBold' || name === 'nominalMuted'
}
