import test from 'node:test';
import assert from 'node:assert/strict';
import { createPieceOfType, rotatePieceClockwise, getPieceBoundingBox } from '../public/src/pieces.mjs';

test('O piece bounding box remains 2x2 on rotation', () => {
	const p0 = createPieceOfType('O');
	const bb0 = getPieceBoundingBox(p0.cells);
	assert.equal(bb0.width, 2);
	assert.equal(bb0.height, 2);
	const p1 = rotatePieceClockwise(p0);
	const bb1 = getPieceBoundingBox(p1.cells);
	assert.equal(bb1.width, 2);
	assert.equal(bb1.height, 2);
});

test('I piece toggles between 4x1 and 1x4', () => {
	let p = createPieceOfType('I');
	let bb = getPieceBoundingBox(p.cells);
	assert.equal(bb.width, 4);
	assert.equal(bb.height, 1);
	p = rotatePieceClockwise(p);
	bb = getPieceBoundingBox(p.cells);
	assert.equal(bb.width, 1);
	assert.equal(bb.height, 4);
});


