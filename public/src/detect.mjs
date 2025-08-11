import { BOARD_COLS, BOARD_ROWS } from './constants.mjs';
import { createPieceOfType, rotatePieceClockwise } from './pieces.mjs';

function getAllRotationsForType(type) {
	const p0 = createPieceOfType(type);
	const rots = [p0];
	for (let i = 0; i < 3; i++) rots.push(rotatePieceClockwise(rots[rots.length - 1]));
	return rots.map(p => p.cells);
}

const SHAPE_CELLS = (() => {
	const map = new Map();
	for (const t of ['I','O','T','S','Z','J','L']) map.set(t, getAllRotationsForType(t));
	return map;
})();

export function detectTetrominoInTopRows(board) {
    // Search ONLY within the top three rows (y = 0..2)
    const maxScanRow = Math.min(3, BOARD_ROWS);
    for (let y = 0; y < maxScanRow; y++) {
        for (let x = 0; x < BOARD_COLS; x++) {
            const baseId = board.grid[x + y * BOARD_COLS];
            if (!baseId) continue;
            for (const [type, rotations] of SHAPE_CELLS.entries()) {
                for (const cells of rotations) {
                    let fits = true;
                    for (const { x: cx, y: cy } of cells) {
                        const bx = x + cx; const by = y + cy;
                        if (bx < 0 || bx >= BOARD_COLS || by < 0 || by >= maxScanRow) { fits = false; break; }
                        if (board.grid[bx + by * BOARD_COLS] !== baseId) { fits = false; break; }
                    }
                    if (fits) {
                        return { type, baseX: x, baseY: y, cells, colourId: baseId };
                    }
                }
            }
        }
    }
    return null;
}


