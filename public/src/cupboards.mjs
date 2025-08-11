import { BOARD_COLS, LEFT_MARGIN_COLS, RIGHT_MARGIN_COLS } from './constants.mjs';

export class Cupboards {
	constructor() {
		this.slots = [
			// Left side margin
			{ side: 'L', colStart: -LEFT_MARGIN_COLS, rowStart: 1, requiredType: null },
			{ side: 'L', colStart: -LEFT_MARGIN_COLS, rowStart: 4, requiredType: null },
			{ side: 'L', colStart: -LEFT_MARGIN_COLS, rowStart: 7, requiredType: null },
			// Right side margin
			{ side: 'R', colStart: BOARD_COLS, rowStart: 1, requiredType: null },
			{ side: 'R', colStart: BOARD_COLS, rowStart: 4, requiredType: null },
			{ side: 'R', colStart: BOARD_COLS, rowStart: 7, requiredType: null }
		];
	}
	getSlots() { return this.slots.map(s => ({ ...s })); }
	getAcceptanceForPiece(piece, worldX, worldY) {
		for (let i = 0; i < this.slots.length; i++) {
			const s = this.slots[i];
			let fits = true;
			for (const { x, y } of piece.cells) { const cx = worldX + x; const cy = worldY + y; if (cx < s.colStart || cx >= s.colStart + 4 || cy < s.rowStart || cy >= s.rowStart + 2) { fits = false; break; } }
			if (!fits) continue;
			// Accept any piece if cupboard unassigned, regardless of type
			if (s.requiredType === null || s.requiredType === piece.type) return { slotIndex: i, accepted: true };
		}
		return { slotIndex: -1, accepted: false };
	}
	acceptInto(slotIndex, pieceType) { if (slotIndex < 0 || slotIndex >= this.slots.length) return false; const s = this.slots[slotIndex]; if (s.requiredType === null) { s.requiredType = pieceType; return true; } if (s.requiredType === pieceType) return true; return false; }
	resetSlot(slotIndex) { if (slotIndex >= 0 && slotIndex < this.slots.length) this.slots[slotIndex].requiredType = null; }
}


