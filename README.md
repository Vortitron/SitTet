# SirTet
A cupboard-themed twist on Tetris for those who secretly enjoy putting things away neatly.

The layout is centred on the familiar black column; at the bottom are 3 rows of random squares.
At the top side there are cupboards, 3 each side, 2 squares high. The user decides which cupboard is for which piece by placing the first in it. (The I piece may be special in future updates.)

Random rows appear at the bottom. Periodically a tetromino flies upwards; the player must guide it into a cupboard and rotate it so that it fits exactly (the first piece sets that cupboard’s type). If a flying piece reaches the top without being accepted, a garbage row is added at the bottom, pushing the stack upwards.
Multiple pieces could end up flying at the same time. In this demo, we keep it to one active piece for clarity, but the architecture supports more.
Mobile friendly: tap left/right buttons to move; tap the rotate button to rotate.
Cursor keys (or WASD) for those with a keyboard; Space rotates.
Cupboard contents slide off-screen to make room for more. A forthcoming “close door” action will reset a cupboard so it can accept any type again.
Each piece can only have one cupboard at a time; if a cupboard is assigned for a piece type, other cupboards will reject that piece unless they’re empty and unassigned.

Game plays until the screen is full or you run out of lives, similar to normal Tetris.

## Running

- Ensure Node 18+ is available.
- Port defaults to 3025. Start the static server:

```
npm start
```

Then open `http://localhost:3025` in a browser. The server auto-serves the `public/` folder. The server is optional; any static file host will do.

## Controls

- Keyboard: Arrow keys or WASD to move; Space/Up to rotate.
- Touch: Use on-screen left/rotate/right buttons.

## Notes

- ES Modules throughout; no dynamic imports used.
- No arrays or objects are exported directly from modules; values are passed via functions.
- Tabs are used for indentation.
- Future improvements: cupboard closing, multiple concurrent flying pieces, scoring combos, special `I` behaviour.
