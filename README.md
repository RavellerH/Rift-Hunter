# Monster Hunter IO

A browser-based multiplayer PvPvE io game blending Monster Hunter's hunting loop with fast io-style matchmaking and short session gameplay.

---

## Concept

| Element | Design Decision |
|---|---|
| Genre | PvPvE IO Game (browser-based) |
| Session Length | 5–10 minutes per match |
| Players per Match | 8–20 players |
| Perspective | Top-down 2.5D or isometric |
| Core Fantasy | Hunt, grow stronger, survive, extract |
| Monetization | Cosmetics, skins, weapon variants |

---

## Core Game Loop

```
Spawn → Gather Power (small monsters / pickups)
     → Fight Mid-Bosses (earn gear/buffs)
     → Encounter Players (PvP or co-op)
     → Challenge Main Boss (shared or competitive)
     → Extract with Loot (or die trying)
     → Match End → Score / Leaderboard
```

---

## Quick Start (First Claude Code Prompt)

```
I'm building a browser-based io game using Phaser 3 (client) and Node.js + Socket.io (server).
The game is a Monster Hunter-style PvPvE io game.

Start by scaffolding the project:
1. A Phaser 3 client with a Game scene, a player entity that moves with WASD, and camera follow.
2. A Node.js server with Socket.io that syncs player positions at 20 ticks/second.
3. A shared constants.js for map size, speeds, and tick rate.

Keep each system in its own file. Follow the structure in ARCHITECTURE.md.
```

---

## Documentation

| File | Contents |
|---|---|
| `ARCHITECTURE.md` | Tech stack, file structure, infrastructure, AI workflow |
| `DESIGN.md` | Game design: player, monsters, combat, progression, scoring |
| `ROADMAP.md` | Development phases, open design questions |

---

*MVP Plan v1.0 — May 2026*
