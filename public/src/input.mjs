export class Input {
	constructor() { this.left = false; this.right = false; this.rotate = false; this._bind(); }
	_bind() {
		window.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') this.left = true; if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') this.right = true; if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w' || e.key === ' ') this.rotate = true; });
		window.addEventListener('keyup', (e) => { if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') this.left = false; if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') this.right = false; });
		const leftBtn = document.getElementById('btn-left'); const rightBtn = document.getElementById('btn-right'); const rotBtn = document.getElementById('btn-rotate');
		if (leftBtn && rightBtn && rotBtn) {
			const setHold = (btn, prop) => { btn.addEventListener('touchstart', (e) => { e.preventDefault(); this[prop] = true; }); btn.addEventListener('touchend', (e) => { e.preventDefault(); this[prop] = false; }); btn.addEventListener('mousedown', (e) => { e.preventDefault(); this[prop] = true; }); btn.addEventListener('mouseup', (e) => { e.preventDefault(); this[prop] = false; }); };
			setHold(leftBtn, 'left'); setHold(rightBtn, 'right'); rotBtn.addEventListener('click', (e) => { e.preventDefault(); this.rotate = true; });
		}
	}
	consumeRotate() { const r = this.rotate; this.rotate = false; return r; }
}


