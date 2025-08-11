import test from 'node:test';
import assert from 'node:assert/strict';
import { Board } from '../public/src/board.mjs';

test('board initial random rows present', () => {
	const b = new Board();
	let bottomNonZero = 0;
	for (let x = 0; x < b.cols; x++) {
		if (b.grid[x + (b.rows - 1) * b.cols]) bottomNonZero++;
	}
	assert.ok(bottomNonZero > 0);
});


