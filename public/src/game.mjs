import { TILE_SIZE_PX, BOARD_COLS, BOARD_ROWS, TICK_MS, GRAVITY_UP_PX_PER_SEC, HORIZONTAL_PX_PER_SEC, GARBAGE_INTERVAL_MS, SPAWN_CHECK_MS, MAX_LIVES, MAX_CONCURRENT_PIECES } from './constants.mjs';
import { Board } from './board.mjs';
import { Cupboards } from './cupboards.mjs';
import { Renderer } from './render.mjs';
import { Input } from './input.mjs';
import { assert, clamp, nowMs } from './utils.mjs';
import { createRandomPiece, rotatePieceClockwise, getPieceBoundingBox } from './pieces.mjs';
import { detectTetrominoInTopRows } from './detect.mjs';

const canvas = document.getElementById('game-canvas');
const renderer = new Renderer(canvas);
const input = new Input();

class FlyingPiece { constructor(piece, worldXCols, worldYCols) { this.piece = piece; this.x = worldXCols; this.y = worldYCols; } }

class GameState {
	constructor() { this.board = new Board(); this.cupboards = new Cupboards(); this.activePieces = []; this.score = 0; this.level = 1; this.lives = MAX_LIVES; this._lastTick = nowMs(); this._accum = 0; this._garbageTimer = 0; this._spawnTimer = 0; }
	update(dtMs) {
		this._garbageTimer += dtMs; this._spawnTimer += dtMs;
		const gravityRowsPerMs = (GRAVITY_UP_PX_PER_SEC / TILE_SIZE_PX) / 1000;
		const horizontalRowsPerMs = (HORIZONTAL_PX_PER_SEC / TILE_SIZE_PX) / 1000;
		if (this._garbageTimer >= GARBAGE_INTERVAL_MS) { this._garbageTimer = 0; this.board.appendRandomTopRow(); }
		if (this._spawnTimer >= SPAWN_CHECK_MS && this.activePieces.length < MAX_CONCURRENT_PIECES) {
			this._spawnTimer = 0;
			const found = detectTetrominoInTopRows(this.board);
			if (found) {
				this.board.clearCells(found.cells.map(({ x, y }) => ({ x: found.baseX + x, y: found.baseY + y })));
				// Create flying piece matching detected type and detected colour (to keep cupboards consistent)
				const p = { type: found.type, rotation: 0, cells: found.cells.map(c => ({ ...c })), colourId: found.colourId };
				const startX = found.baseX;
				const startY = found.baseY;
				this.activePieces.push(new FlyingPiece(p, startX, startY));
			}
		}
		if (input.consumeRotate()) { for (let i = 0; i < this.activePieces.length; i++) { const ap = this.activePieces[i]; const rotated = rotatePieceClockwise(ap.piece); ap.piece = rotated; } }
		for (let i = 0; i < this.activePieces.length; i++) { const ap = this.activePieces[i]; let dx = 0; if (input.left) dx -= horizontalRowsPerMs * dtMs; if (input.right) dx += horizontalRowsPerMs * dtMs; ap.x = ap.x + dx; }
		for (let i = this.activePieces.length - 1; i >= 0; i--) { const ap = this.activePieces[i]; const dy = -gravityRowsPerMs * dtMs; const targetY = Math.max(0, ap.y + dy); const stopY = this.board.getTopCollisionYForPiece(ap.piece.cells, Math.round(ap.x), Math.round(ap.y)); ap.y = Math.max(targetY, stopY); const accept = this.cupboards.getAcceptanceForPiece(ap.piece, Math.round(ap.x), Math.round(ap.y)); if (accept.accepted) { if (this.cupboards.acceptInto(accept.slotIndex, ap.piece.type)) { this.score += 100; this.activePieces.splice(i, 1); continue; } } if (Math.round(ap.y) <= 0) { this.board.addGarbageRowFromPiece(); this.lives -= 1; this.activePieces.splice(i, 1); } }
		if (this.lives <= 0 || this.board.anyCellAtTopRow()) this.reset();
	}
	reset() { this.board = new Board(); this.cupboards = new Cupboards(); this.activePieces = []; this.score = 0; this.level = 1; this.lives = MAX_LIVES; this._garbageTimer = 0; this._spawnTimer = 0; }
}

const state = new GameState();

function updateHud(state) { const s = document.getElementById('score'); const l = document.getElementById('level'); const lv = document.getElementById('lives'); if (s) s.textContent = String(state.score); if (l) l.textContent = String(state.level); if (lv) lv.textContent = String(state.lives); }
function render(state) { renderer.clear(); renderer.translateToPlayfieldOrigin(); renderer.drawBoard(state.board); renderer.drawCupboards(state.cupboards); for (const ap of state.activePieces) renderer.drawPiece(ap.piece, Math.round(ap.x), Math.round(ap.y)); renderer.restoreOrigin(); }
function gameLoop() { const now = nowMs(); const dt = now - state._lastTick; state._lastTick = now; state._accum += dt; while (state._accum >= TICK_MS) { state.update(TICK_MS); state._accum -= TICK_MS; } render(state); updateHud(state); requestAnimationFrame(gameLoop); }

assert(canvas instanceof HTMLCanvasElement, 'Canvas not found');
requestAnimationFrame(gameLoop);


