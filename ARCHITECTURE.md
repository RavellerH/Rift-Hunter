# Architecture

## Engine & Tech Stack

| Layer | Technology |
|---|---|
| Engine | Godot 4 |
| Language | GDScript |
| Rendering | Godot built-in 2D renderer (OpenGL / Vulkan) |
| UI | Godot Control nodes (CanvasLayer) |
| Maps | Godot TileMapLayer + LDtk (external editor, exports to JSON) |
| Audio | Godot AudioStreamPlayer + AudioBus |
| Platform | Desktop — Windows / Mac / Linux export |
| Save Data | Godot FileAccess (JSON save files) |

---

## Godot 4 Systems Used

| Feature | Godot Node / System |
|---|---|
| 2.5D depth sorting | `z_index`, `y_sort_enabled` on root node |
| Aerial combat layer | Separate `Node2D` layer with modified gravity constant |
| Parallax biome backgrounds | `ParallaxBackground` + `ParallaxLayer` |
| Player animation | `AnimationTree` + `AnimationPlayer` |
| Tilemap biomes | `TileMapLayer` with physics layers and autotile |
| Monster hitboxes | `Area2D` + `CollisionShape2D` (capsule) |
| Camera | `Camera2D` with drag margin + smoothing |
| UI / HUD | `CanvasLayer` with `Control` scene tree |
| Hit particles | `CPUParticles2D` (lightweight, no GPU dependency) |
| Screen flash / shake | `ShaderMaterial` on canvas + camera offset tween |
| Crafting data | Godot `Resource` files (.tres) — one per item/weapon |
| Save system | `FileAccess` writing JSON to `user://save.json` |
| Signals | Godot signal system for all cross-node communication |

---

## File Structure

```
rift-hunter/
├── project.godot
├── export_presets.cfg
│
├── scenes/
│   ├── world/
│   │   ├── World.tscn              # Root world scene, loads biome
│   │   ├── Veilwatch.tscn          # Guild hub scene
│   │   └── biomes/
│   │       ├── AncientCanopy.tscn
│   │       ├── VolcanicAbyss.tscn
│   │       ├── CoralSkyland.tscn
│   │       ├── FrostedPeaks.tscn
│   │       ├── RottenHollow.tscn
│   │       ├── WildspireWaste.tscn
│   │       └── ElderSkyRuins.tscn
│   │
│   ├── player/
│   │   ├── Player.tscn
│   │   └── AerialPlayer.tscn       # Player in aerial mode (different physics)
│   │
│   ├── monsters/
│   │   ├── veilkin/                # Small monsters per biome
│   │   ├── riftborn/               # Mid-boss monsters
│   │   └── elders/                 # Boss monsters
│   │
│   ├── ui/
│   │   ├── HUD.tscn                # HP, stamina, equipped skill icons
│   │   ├── GuildBoard.tscn         # Quest board UI
│   │   ├── CraftingMenu.tscn
│   │   ├── Inventory.tscn
│   │   └── MainMenu.tscn
│   │
│   └── effects/
│       ├── HitSpark.tscn
│       ├── DodgeTrail.tscn
│       ├── RiftSurge.tscn          # Visual for Rift energy bursts
│       └── MonsterDeath.tscn
│
├── scripts/
│   ├── player/
│   │   ├── Player.gd               # Movement, input, state machine
│   │   ├── PlayerCombat.gd         # Attack, dodge, i-frames
│   │   ├── PlayerStats.gd          # HP, stamina, derived stats from gear
│   │   ├── PlayerAerial.gd         # Aerial mode physics and combat
│   │   └── RiftShard.gd            # Unique player ability system
│   │
│   ├── monsters/
│   │   ├── MonsterBase.gd          # Shared monster logic
│   │   ├── MonsterAI.gd            # State machine (Idle/Patrol/Alert/Attack/Flee)
│   │   ├── MonsterIntro.gd         # First-encounter cinematic sequence
│   │   └── AerialMonster.gd        # Flying monster overrides
│   │
│   ├── systems/
│   │   ├── CombatSystem.gd         # Hit resolution, damage calc, i-frames
│   │   ├── CraftingSystem.gd       # Recipe lookup, material check, gear creation
│   │   ├── EquipmentSystem.gd      # Equip/unequip, skill derivation from gear
│   │   ├── GuildSystem.gd          # Rank tracking, quest state, NPC dialogue
│   │   ├── BiomeManager.gd         # Load/unload biome scenes, spawn tables
│   │   └── SaveSystem.gd           # Read/write save data
│   │
│   ├── ui/
│   │   ├── HUD.gd
│   │   ├── CraftingMenu.gd
│   │   ├── GuildBoard.gd
│   │   └── Inventory.gd
│   │
│   └── globals/
│       ├── Constants.gd            # Autoload — all tunable values
│       ├── GameState.gd            # Autoload — current player state, flags
│       └── Events.gd               # Autoload — global signal bus
│
├── resources/
│   ├── weapons/                    # .tres files — one per weapon
│   ├── armor/                      # .tres files — one per armor piece
│   ├── monsters/                   # .tres files — monster data (stats, drops)
│   ├── quests/                     # .tres files — quest definitions
│   └── items/                      # .tres files — crafting materials
│
├── assets/
│   ├── sprites/
│   │   ├── player/
│   │   ├── monsters/
│   │   ├── environment/
│   │   ├── ui/
│   │   └── effects/
│   ├── audio/
│   │   ├── music/
│   │   ├── sfx/
│   │   └── ambient/
│   └── fonts/
│
├── ARCHITECTURE.md
├── DESIGN.md
├── LORE.md
├── ROADMAP.md
└── README.md
```

---

## Autoloads (Global Singletons)

| Script | Purpose |
|---|---|
| `Constants.gd` | All numeric constants — speeds, cooldowns, damage values |
| `GameState.gd` | Player inventory, guild rank, quest flags, current biome |
| `Events.gd` | Global signal bus — decouples systems without tight references |

Using `Events.gd` as a signal bus keeps systems decoupled. Example:
```
# CombatSystem emits:
Events.monster_killed.emit(monster_id, loot_table)

# GuildSystem listens:
Events.monster_killed.connect(_on_monster_killed)
```

---

## Sprite Strategy — Free + AI Hybrid

| Asset Type | Source |
|---|---|
| Player character animations | LPC Sprite Generator (free, CC-licensed, layered) |
| Armor overlays on character | Stable Diffusion + pixel LoRA over LPC base |
| Monster sprites (small) | szadiart (itch.io) free packs |
| Monster sprites (bosses) | Midjourney concept → pixelated → Aseprite cleanup |
| Biome background layers | ansimuz (itch.io) — atmospheric parallax packs |
| Tileset per biome | LPC tilesets + AI-generated variants |
| Boss splash / NPC portraits | Midjourney or DALL-E 3, high res |
| UI icons, item art | Adobe Firefly (commercially safe) |
| Effects (sparks, particles) | Hand-made in Aseprite (small, fast to make) |

**AI consistency workflow:**
1. Generate front-facing sprite with Stable Diffusion (fix seed + LoRA)
2. Use that as ControlNet reference for side / back views
3. Import frames into Aseprite, clean up, export sprite sheet
4. Godot `AnimatedSprite2D` reads sheet directly

**Tools:**
- **Stable Diffusion** (local) + pixel art LoRA — most control, free
- **Pixelicious** (itch.io) — converts any image to pixel art in one click
- **Aseprite** (~$20) — animation cleanup, sprite sheets
- **LDtk** (free) — map editor, exports to JSON Godot can load

---

## AI Agent Development Workflow

| Task | Tool |
|---|---|
| All GDScript systems | Claude Code (primary) |
| Scene structure (.tscn descriptions) | Claude Code |
| Monster AI state machines | Claude Code |
| Shader effects (hit flash, Rift glow) | Claude Code |
| Refactoring passes | Codex CLI |
| Resource file generation (bulk items) | Gemini CLI |
| Asset config and naming | Gemini CLI |

### Claude Code Session Tips

- Start every session: *"Read ARCHITECTURE.md and DESIGN.md before writing any code."*
- One script per system — never mix combat logic into the Player node
- Use `Constants.gd` for every number — no magic values in scripts
- Use `Events.gd` signals for cross-system communication — no direct node references across scenes
- Ask Claude to write the `Resource` data schema first, then the system that reads it
