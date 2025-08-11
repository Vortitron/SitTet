import { randomChoiceIndex } from './utils.mjs';

const SHAPES = (() => {
	const I = [0,0,0,0, 1,1,1,1, 0,0,0,0, 0,0,0,0];
	const O = [0,1,1,0, 0,1,1,0, 0,0,0,0, 0,0,0,0];
	const T = [0,1,0,0, 1,1,1,0, 0,0,0,0, 0,0,0,0];
	const S = [0,1,1,0, 1,1,0,0, 0,0,0,0, 0,0,0,0];
	const Z = [1,1,0,0, 0,1,1,0, 0,0,0,0, 0,0,0,0];
	const J = [1,0,0,0, 1,1,1,0, 0,0,0,0, 0,0,0,0];
	const L = [0,0,1,0, 1,1,1,0, 0,0,0,0, 0,0,0,0];
	return { I, O, T, S, Z, J, L };
})();

const TYPES = ['I','O','T','S','Z','J','L'];

function rotateIndexClockwise(x, y) { return { x: 3 - y, y: x }; }

function getOccupiedCells(shapeArray16, rotationQuarterTurns) {
	let coords = [];
	for (let y = 0; y < 4; y++) {
		for (let x = 0; x < 4; x++) {
			const idx = x + y * 4; if (shapeArray16[idx]) coords.push({ x, y });
		}
	}
	for (let r = 0; r < ((rotationQuarterTurns % 4) + 4) % 4; r++) coords = coords.map(({ x, y }) => rotateIndexClockwise(x, y));
	let minX = Infinity, minY = Infinity; for (const c of coords) { if (c.x < minX) minX = c.x; if (c.y < minY) minY = c.y; }
	return coords.map(c => ({ x: c.x - minX, y: c.y - minY }));
}

export function createRandomPiece() { const type = TYPES[randomChoiceIndex(TYPES.length)]; return createPieceOfType(type); }
export function createPieceOfType(type) { const base = SHAPES[type]; const rotation = 0; const cells = getOccupiedCells(base, rotation); return { type, rotation, cells }; }
export function rotatePieceClockwise(piece) { const base = SHAPES[piece.type]; const rotation = (piece.rotation + 1) % 4; const cells = getOccupiedCells(base, rotation); return { type: piece.type, rotation, cells }; }
export function getPieceBoundingBox(cells) { let maxX = 0, maxY = 0; for (const { x, y } of cells) { if (x > maxX) maxX = x; if (y > maxY) maxY = y; } return { width: maxX + 1, height: maxY + 1 }; }


