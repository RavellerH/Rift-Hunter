# Rift Hunter

> *"The sky remembers what the earth has forgotten."*

A desktop solo ARPG inspired by Monster Hunter — 2.5D side-scrolling exploration across seven distinct biomes, aerial combat, equipment-driven skills, crafting from monster parts, and a living Guild hub. No skill trees. No grinding for 20 hours. Just hunting, crafting, and getting stronger.

---

## Concept

| Element | Design Decision |
|---|---|
| Genre | Solo ARPG |
| Platform | Desktop — Windows / Mac / Linux |
| Engine | Godot 4 (GDScript) |
| Perspective | 2.5D side-scrolling with depth layers |
| Session Style | Open-ended exploration, quest-driven |
| Core Fantasy | Hunt, craft, master the Rift |
| Art Style | Anime pixel art — 32px / 48px sprites |
| Story | Original IP — world of Aethara, see LORE.md |

---

## Core Game Loop

```
Guild Board → Accept Quest → Enter Biome
          → Explore & hunt Veilkin (gather materials)
          → Fight Riftborn mid-boss (rare parts)
          → Challenge Elder Veilborn boss (unique parts)
          → Return to Veilwatch
          → Craft & upgrade gear (new skills unlock from new armor)
          → Unlock next biome → repeat
```

---

## Key Features

- **Equipment-driven skills** — no skill tree. Your armor and weapon define your abilities. Stacking the same skill across pieces levels it up.
- **Six weapon types** — Sword & Shield, Great Sword, Dual Blades, Bow, Insect Glaive, Lance. Each has a distinct moveset and passive skill.
- **Aerial combat** — flying monsters pull you into a sky combat layer. Insect Glaive players live up there. Bow players thrive. Lance players suffer.
- **Monster intro sequences** — first encounter with any monster triggers a cinematic pan, roar, and music shift. Every boss arrival feels earned.
- **Light grind design** — 3 to 5 hunts for a full gear set, not 20. Every hunt gives something useful.
- **Living Guild hub** — Veilwatch has named NPCs with personality, a meal system, quest board, and lore that evolves with the story.

---

## Biomes

| # | Biome | Guild Rank | Boss |
|---|---|---|---|
| 1 | Ancient Canopy | G1 | Verdanthos (Elder serpent) |
| 2 | Wildspire Waste | G1 | Diablorak (burrowing horned Elder) |
| 3 | Frosted Peaks | G2 | Velkhrath (blizzard mammoth Elder) |
| 4 | Coral Skyland | G2 | Namielle-Keth (bioluminescent flying Elder) |
| 5 | Volcanic Abyss | G3 | Ashmaul (Cult-fed ancient Elder) |
| 6 | Rotten Hollow | G3 | Chaoskrel (deep Rift-corrupted Elder) |
| 7 | Elder Sky Ruins | G4 | Serath + The Sovereign (story final boss) |

---

## Story (No Spoilers)

You arrive at the frontier outpost of **Veilwatch** with a mysterious **Rift Shard** embedded in your palm — crystallized energy from an ancient catastrophe. The world of **Aethara** is destabilizing. Rifts are opening where they shouldn't. Ancient creatures called **Veilborn** are flooding into territories that have been stable for decades.

Someone is doing this deliberately.

Full lore, world history, and story acts in **LORE.md**.

---

## Quick Start — First Claude Code Session

```
I'm building a 2.5D solo ARPG in Godot 4 called Rift Hunter.
Use GDScript for all scripts. Read ARCHITECTURE.md and DESIGN.md first.

The game has:
- 2.5D side-scrolling with depth layers (z_index, YSort)
- Ground combat and a separate aerial combat plane
- Equipment-driven skill system (no skill tree)
- Crafting from monster parts
- 7 biomes gated by Guild rank
- Guild hub at Veilwatch with named NPCs

Start with:
1. Player scene — WASD movement, jump, basic sword attack, dodge roll with i-frames
2. Camera follow with smoothing and slight lookahead in movement direction
3. constants.gd autoload — GRAVITY, MOVE_SPEED, JUMP_FORCE, DODGE_DURATION, IFRAME_DURATION

Keep each system in its own script. Follow the structure in ARCHITECTURE.md.
```

---

## Documentation

| File | Contents |
|---|---|
| `ARCHITECTURE.md` | Godot 4 setup, file structure, sprite strategy, AI agent workflow |
| `DESIGN.md` | Player stats, weapon types, skill system, biomes, combat, monsters, crafting, Guild hub |
| `LORE.md` | World of Aethara, the Great Sundering, Veilborn tiers, full story acts |
| `ROADMAP.md` | 7 development phases with task checklists, open design questions |

---

*Rift Hunter — Design v2.0 — May 2026*
