/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { linear } from '../scales.js';

test('linear scale', () => {
	const scale = linear([0, 100]);
	expect(scale(0)).toBe(0);
	expect(scale(50)).toBe(0.5);
	expect(scale(100)).toBe(1.0);
});
