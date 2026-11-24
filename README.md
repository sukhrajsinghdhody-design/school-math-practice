# Block Wars — 3D voxel BedWars-style prototype

An original Three.js first-person block arena with two team islands, beds, destructible defenses, block bridging, a rival, a coin generator, and a simple shop. It is not affiliated with Bloxd.io and does not use Bloxd.io source or proprietary assets.

## Run locally

Serve the repository over HTTP because browsers restrict JavaScript modules from `file://`:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` in a modern browser with internet access (Three.js loads from jsDelivr).

## Controls

- **WASD** move · **Mouse** look · **Space** jump · **Shift** sprint
- **Left click** break blocks, attack the rival, or damage the enemy bed
- **Right click** place the selected block on the aimed face
- **1–5** select Grass, Stone, Planks, Brick, Lantern
- **Q** open/close the shop · **Esc** pause/release mouse

## Video references

These videos are community guides about creating custom BedWars maps in Bloxd.io or showing gameplay. They are useful for visual reference, not coding tutorials for this Three.js project:

- [How To build a CUSTOM BEDWARS MAP IN BLOXD.IO!](https://www.youtube.com/watch?v=hGAVKJkz_gE)
- [How to Make CUSTOM Bedwars Maps on Bloxd.io?](https://www.youtube.com/watch?v=vhzaQ3Xov1g)
- [THIS is HOW to MAKE your BEDWARS MAP](https://www.youtube.com/watch?v=jGoYkQb9gjQ)
- [How To Actually Play BedWars In Bloxd.io](https://www.youtube.com/watch?v=a3bmtmvYDlo)

These are not tutorials on recreating Bloxd.io's proprietary game implementation. Exact parity would require its original assets and code, which are not included.
