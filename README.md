# Block Wars

A small first-person voxel Bed Wars-style browser game. It uses original procedural block geometry and is not affiliated with Bloxd.io.

## Run

Open `index.html` in a modern browser with internet access (Three.js is loaded from jsDelivr). For a stable local run, serve the repository with any static web server, e.g. `python -m http.server`.

## Controls

- **WASD / arrows** — move; mouse — look around (click the game to capture the pointer)
- **Space** — jump; **Shift** — sneak/walk slowly
- **Left click** — break blocks / attack; **right click** — place the selected block on the face you aim at
- **1–4** — wool, wood, stone, glass; **Q** — shop; **Esc** — release mouse

## Current gameplay

- First-person 3D arena with team islands, center island, void, and block-by-block bridging
- Layered beds, destructible defense blocks, bed hit points, respawns while your bed survives
- Rival AI, sword combat, a timed coin generator, and a simple shop

The public repository suggested by the user, `Isaac-digangi/Bloxd.io-Codes`, contains community scripts for Bloxd.io world lobbies (such as practice-lobby and combat-related scripts), not the BedWars game source. Its repository has no declared license. This implementation therefore does not copy its code; it is a fresh, original browser game.
