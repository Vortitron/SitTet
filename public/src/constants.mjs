export const TILE_SIZE_PX = 24;
export const BOARD_COLS = 10;
export const BOARD_ROWS = 22;
export const INITIAL_RANDOM_ROWS = 3;
export const TICK_MS = 1000 / 60;
export const GRAVITY_UP_PX_PER_SEC = 180;
export const HORIZONTAL_PX_PER_SEC = 240;
export const GARBAGE_INTERVAL_MS = 1000;
export const SPAWN_CHECK_MS = 1000;
export const MAX_LIVES = 3;
export const MAX_CONCURRENT_PIECES = 1;

// Horizontal margins (in tile columns) where cupboards sit; allows pieces to move into cupboards
export const LEFT_MARGIN_COLS = 4;
export const RIGHT_MARGIN_COLS = 4;

export function getColourForType(type) {
	switch (type) {
		case 'I': return '#63b3ed';
		case 'O': return '#f6e05e';
		case 'T': return '#b794f4';
		case 'S': return '#68d391';
		case 'Z': return '#fc8181';
		case 'J': return '#81e6d9';
		case 'L': return '#f6ad55';
		default: return '#e2e8f0';
	}
}

export function getBackgroundColour() { return '#000000'; }
export function getCupboardOutlineColour() { return '#94a3b8'; }
export function getCupboardDoorColour() { return '#1f2937'; }
export function getCupboardDoorAccentColour() { return '#374151'; }

// Colour palette for random squares on the board.
// 1..7 are valid colour IDs; 0 means empty.
export function getColourById(id) {
	switch (id) {
		case 1: return '#63b3ed'; // blue
		case 2: return '#f6e05e'; // yellow
		case 3: return '#b794f4'; // purple
		case 4: return '#68d391'; // green
		case 5: return '#fc8181'; // red
		case 6: return '#81e6d9'; // cyan
		case 7: return '#f6ad55'; // orange
		default: return '#334155';
	}
}

export function getRandomColourId(randomIntFn) {
	return randomIntFn(1, 7);
}


