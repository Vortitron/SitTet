## SirTet – Project Outline

- Vision: A cupboard-themed twist on Tetris where formed pieces fly upwards and must be sorted into cupboards at the top. Mobile friendly and playable in a browser.
- Key mechanics:
	- Random rows appear at the bottom over time, pushing the stack upwards.
	- Periodically, a tetromino flies upwards; the player moves it horizontally and rotates it to fit a cupboard.
	- Each cupboard is 4x2 tiles. The first accepted piece sets its required type; only matching types are accepted thereafter.
	- Misplaced pieces add a garbage row and cost a life.
- Rendering: Canvas 2D, ES Modules, no frameworks.
- Input: Arrow keys / WASD / Space; touch buttons for mobile.
- Server: Minimal static Node ESM server on port 3025.

### Code structure
- `public/`: static assets and HTML.
- `src/constants.mjs`: numeric constants and colour getters.
- `src/utils.mjs`: assertions, random helpers, time.
- `src/pieces.mjs`: internal tetromino definitions and operations; no direct object/array exports.
- `src/board.mjs`: board model and garbage generation.
- `src/cupboards.mjs`: cupboard rules and acceptance.
- `src/input.mjs`: input handling for keyboard and touch.
- `src/render.mjs`: renderer for board, cupboards, and pieces.
- `src/game.mjs`: game loop, state, spawning, scoring.
- `tests/`: unit tests for core logic.

### Improvements considered
- Scoring combos for consecutive correct placements.
- "Close door" action to reset a cupboard (assign to a new piece type).
- Multiple concurrent flying pieces with priority to the highest.
- Special handling for the `I` piece (e.g., wild-card cupboard, or double score).


