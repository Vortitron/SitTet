import { TILE_SIZE_PX, BOARD_COLS, BOARD_ROWS, getBackgroundColour, getCupboardOutlineColour, getCupboardDoorColour, getCupboardDoorAccentColour, getColourForType, getColourById, LEFT_MARGIN_COLS, RIGHT_MARGIN_COLS } from './constants.mjs';

export class Renderer {
	constructor(canvas) { this.canvas = canvas; this.ctx = canvas.getContext('2d'); }
	clear() { const ctx = this.ctx; ctx.fillStyle = getBackgroundColour(); ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); }
		drawBoard(board) { const ctx = this.ctx; for (let y = 0; y < BOARD_ROWS; y++) for (let x = 0; x < BOARD_COLS; x++) { const id = board.grid[x + y * BOARD_COLS]; if (id) this.drawCell(x, y, getColourById(id)); } ctx.strokeStyle = '#111827'; ctx.lineWidth = 2; ctx.strokeRect(0.5, 0.5, BOARD_COLS * TILE_SIZE_PX - 1, BOARD_ROWS * TILE_SIZE_PX - 1); }
	drawCell(col, row, colour) { const ctx = this.ctx; const x = col * TILE_SIZE_PX; const y = row * TILE_SIZE_PX; ctx.fillStyle = colour; ctx.fillRect(x + 1, y + 1, TILE_SIZE_PX - 2, TILE_SIZE_PX - 2); }
		drawPiece(piece, worldX, worldY) { const colour = piece.colourId ? getColourById(piece.colourId) : getColourForType(piece.type); for (const { x, y } of piece.cells) this.drawCell(worldX + x, worldY + y, colour); }
	drawCupboards(cupboards) { const ctx = this.ctx; for (const s of cupboards.getSlots()) { const px = s.colStart * TILE_SIZE_PX; const py = s.rowStart * TILE_SIZE_PX; ctx.save(); ctx.translate(px, py); ctx.fillStyle = getCupboardDoorColour(); ctx.fillRect(0, 0, TILE_SIZE_PX * 4, TILE_SIZE_PX * 2); ctx.strokeStyle = getCupboardOutlineColour(); ctx.strokeRect(0.5, 0.5, TILE_SIZE_PX * 4 - 1, TILE_SIZE_PX * 2 - 1); ctx.fillStyle = getCupboardDoorAccentColour(); const handleX = s.side === 'L' ? TILE_SIZE_PX * 4 - TILE_SIZE_PX * 0.5 : TILE_SIZE_PX * 0.25; ctx.fillRect(handleX, TILE_SIZE_PX * 0.75, TILE_SIZE_PX * 0.2, TILE_SIZE_PX * 0.5); if (s.requiredType) { ctx.fillStyle = '#cbd5e1'; ctx.font = `${Math.floor(TILE_SIZE_PX * 0.8)}px system-ui`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s.requiredType, TILE_SIZE_PX * 2, TILE_SIZE_PX); } ctx.restore(); } }
	translateToPlayfieldOrigin() { const playfieldWidth = (BOARD_COLS + LEFT_MARGIN_COLS + RIGHT_MARGIN_COLS) * TILE_SIZE_PX; const offsetX = Math.floor((this.canvas.width - playfieldWidth) / 2) + LEFT_MARGIN_COLS * TILE_SIZE_PX; this.ctx.save(); this.ctx.translate(offsetX, 16); }
	restoreOrigin() { this.ctx.restore(); }
}


