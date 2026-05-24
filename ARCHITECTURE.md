# Architecture

## Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| Game Engine | Phaser 3 (browser canvas) |
| Language | JavaScript / TypeScript |
| Rendering | WebGL (Phaser default) |
| UI | HTML overlay + Phaser scenes |
| Assets | Kenney.nl free assets (MVP) |

### Backend

| Layer | Technology |
|---|---|
| Server | Node.js + Express |
| Realtime | Socket.io (WebSocket) |
| Game Loop | Server-authoritative tick at 20Hz |
| State Sync | Delta compression (only changed entities) |
| Hosting | Contabo VPS (Docker container) |
| Matchmaking | Simple room-based (max 20 players per room) |

### Infrastructure

```
Client (Browser)
    ↕ WebSocket
Game Server (Node.js + Socket.io)
    ↕
State Manager (in-memory, per room)
    ↕ (Phase 2)
Redis (session cache, leaderboard)
```

---

## File Structure

```
monster-hunter-io/
├── client/
│   ├── src/
│   │   ├── scenes/        # Phaser scenes (Boot, Menu, Game, HUD)
│   │   ├── entities/      # Player.js, Monster.js, Projectile.js
│   │   ├── systems/       # Combat.js, Leveling.js, Loot.js
│   │   ├── network/       # SocketClient.js
│   │   └── main.js
│   └── assets/
│       ├── sprites/
│       ├── audio/
│       └── maps/
├── server/
│   ├── src/
│   │   ├── rooms/         # Room.js, RoomManager.js
│   │   ├── entities/      # ServerPlayer.js, ServerMonster.js
│   │   ├── systems/       # CombatSystem.js, AISystem.js
│   │   └── index.js
│   └── Dockerfile
├── shared/
│   └── constants.js       # Shared between client and server
├── ARCHITECTURE.md
├── DESIGN.md
├── ROADMAP.md
└── README.md
```

### One file per system — keep concerns separated:

| File | Responsibility |
|---|---|
| `client/src/entities/Player.js` | Input handling, local prediction, rendering |
| `client/src/entities/Monster.js` | Client-side monster interpolation |
| `client/src/systems/Combat.js` | Hit detection, damage numbers, effects |
| `client/src/systems/Leveling.js` | Power Shard accumulation, level-up logic |
| `client/src/systems/Loot.js` | Gear Buff display, pickup logic |
| `client/src/network/SocketClient.js` | Socket.io connection, event handling |
| `server/src/rooms/Room.js` | Per-match state, player list, timers |
| `server/src/rooms/RoomManager.js` | Matchmaking, room lifecycle |
| `server/src/entities/ServerPlayer.js` | Authoritative player state |
| `server/src/entities/ServerMonster.js` | Monster AI state machine |
| `server/src/systems/CombatSystem.js` | Server-side hit validation |
| `server/src/systems/AISystem.js` | Monster behavior tick |
| `shared/constants.js` | MAP_SIZE, TICK_RATE, SPEEDS, COOLDOWNS |

---

## AI Development Workflow

| Task | Tool |
|---|---|
| Architecture & systems | Claude Code (primary) |
| Refactoring / cleanup | Codex CLI |
| Monster AI behavior | Claude Code |
| Phaser scene boilerplate | Claude Code |
| Asset naming & config | Gemini CLI (fast generation) |

### Tips

- Keep `ARCHITECTURE.md` updated so Claude retains full context across sessions.
- Ask Claude Code to write tests for collision and state transitions before implementing features.
- Use `shared/constants.js` as the single source of truth for all tunable values.
