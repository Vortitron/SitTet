export function assert(condition, message = 'Assertion failed') {
	if (!condition) throw new Error(message);
}

export function randomInt(minInclusive, maxInclusive) {
	const min = Math.ceil(minInclusive);
	const max = Math.floor(maxInclusive);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomChoiceIndex(length) {
	return Math.floor(Math.random() * length);
}

export function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

export function nowMs() { return performance.now(); }

export function withErrorLogging(fn, contextLabel) {
	try { return fn(); } catch (error) { console.error(`[SirTet] Error in ${contextLabel}:`, error); return undefined; }
}


