import { BOARD_COLS, BOARD_ROWS, INITIAL_RANDOM_ROWS, getRandomColourId } from './constants.mjs';
import { randomInt } from './utils.mjs';

export class Board {
	constructor() {
		this.cols = BOARD_COLS;
		this.rows = BOARD_ROWS;
		this.grid = new Array(this.cols * this.rows).fill(0);
		this.fillInitialRandomRows();
	}
	index(x, y) { return x + y * this.cols; }
	inside(x, y) { return x >= 0 && x < this.cols && y >= 0 && y < this.rows; }
	isOccupied(x, y) { if (!this.inside(x, y)) return false; return this.grid[this.index(x, y)] !== 0; }
	setCell(x, y, value) { if (!this.inside(x, y)) return; this.grid[this.index(x, y)] = value; }
	fillInitialRandomRows() {
		for (let y = this.rows - INITIAL_RANDOM_ROWS; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				this.setCell(x, y, getRandomColourId(randomInt));
			}
		}
	}
	appendRandomBottomRow() {
		for (let y = 0; y < this.rows - 1; y++) for (let x = 0; x < this.cols; x++) this.grid[this.index(x, y)] = this.grid[this.index(x, y + 1)];
		for (let x = 0; x < this.cols; x++) this.grid[this.index(x, this.rows - 1)] = getRandomColourId(randomInt);
	}

	appendRandomTopRow() {
		// Shift all rows down by 1 but keep the bottom three rows (initial base) intact
		for (let y = this.rows - 1; y > 0; y--) {
			for (let x = 0; x < this.cols; x++) {
				// If we're about to overwrite one of the initial base rows, skip moving into it
				if (y >= this.rows - INITIAL_RANDOM_ROWS) continue;
				this.grid[this.index(x, y)] = this.grid[this.index(x, y - 1)];
			}
		}
		// New random row at top
		for (let x = 0; x < this.cols; x++) this.grid[this.index(x, 0)] = getRandomColourId(randomInt);
	}
	clearCells(cellPositions) { for (const { x, y } of cellPositions) this.setCell(x, y, 0); }
	addGarbageRowFromPiece() { for (let y = 0; y < this.rows - 1; y++) for (let x = 0; x < this.cols; x++) this.grid[this.index(x, y)] = this.grid[this.index(x, y + 1)]; for (let x = 0; x < this.cols; x++) this.grid[this.index(x, this.rows - 1)] = 1; }
	getTopCollisionYForPiece(cells, worldX, worldY) { let y = worldY; while (y > 0) { let collision = false; for (const { x, y: cy } of cells) { const bx = worldX + x; const by = y + cy - 1; if (this.isOccupied(bx, by)) { collision = true; break; } } if (collision) break; y -= 1; } return y; }
	anyCellAtTopRow() { for (let x = 0; x < this.cols; x++) if (this.grid[this.index(x, 0)] !== 0) return true; return false; }
}


