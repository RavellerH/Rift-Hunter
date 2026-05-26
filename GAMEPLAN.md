# GAMEPLAN — Rift Hunter
**Engine:** Godot 4.4 · **Language:** GDScript · **Perspective:** 2.5D side-scrolling

This document is the single source of truth for any AI coding agent working on this project.
Read this file, DESIGN.md, ARCHITECTURE.md, and LORE.md before writing any code.

---

## 0. Rules for Every Agent

1. **All numbers live in `Constants.gd`** — never hard-code a value in a script.
2. **All cross-system events go through `Events.gd`** — never call node methods directly across scene trees.
3. **One script per system** — do not mix combat logic into Player.gd.
4. **No magic strings** — use `StringName` or exported `@export var monster_id` for identifiers.
5. **Signals bubble up through Events.gd** — local signals (`hp_changed`) stay local; world-wide signals (`Events.monster_died`) go on the bus.
6. **Resources for data** — monster stats, weapon stats, armor stats, quest definitions are `.tres` files, not dictionaries in code.
7. **File structure is fixed** — follow `ARCHITECTURE.md` exactly. Ask before creating a new top-level folder.
8. **Prototype already exists** — `game/` folder has the Phase 1 sandbox. Build on it; do not rewrite it from scratch.

---

## 1. Current State (What Exists)

Located in `game/`:

| File | Status | Notes |
|------|--------|-------|
| `project.godot` | ✅ Done | Autoloads, input map, window 1280×720 |
| `scripts/globals/Constants.gd` | ✅ Done | All numeric constants |
| `scripts/globals/Events.gd` | ✅ Done | Global signal bus |
| `scripts/globals/GameState.gd` | ✅ Done | Minimal — expand per phase |
| `scripts/player/Player.gd` | ✅ Done | Movement, jump, state machine |
| `scripts/player/PlayerCombat.gd` | ✅ Done | Light combo, heavy charge, dodge i-frames |
| `scripts/player/PlayerStats.gd` | ✅ Done | HP, stamina, regen |
| `scripts/monsters/MonsterBase.gd` | ✅ Done | HP, hurtbox, hit flash, death |
| `scripts/monsters/Thornmane.gd` | ✅ Done | Charge + tail-sweep AI, enrage |
| `scripts/systems/CombatCamera.gd` | ✅ Done | Screen shake via Events |
| `scripts/ui/HUD.gd` | ✅ Done | HP/stamina bars, monster HP, damage numbers |
| `scenes/Main.tscn` | ✅ Done | Flat arena — player vs Thornmane sandbox |
| `scenes/Player.tscn` | ✅ Done | ColorRect placeholder sprites |
| `scenes/monsters/Thornmane.tscn` | ✅ Done | ColorRect placeholder |
| `scenes/ui/HUD.tscn` | ✅ Done | Player bars + monster bar |

**Everything below is not yet built.**

---

## 2. Collision Layers (Fixed — Never Change)

| Layer | Name | Who Uses It |
|-------|------|-------------|
| 1 | `world` | Static floors, walls, platforms |
| 2 | `player` | Player CharacterBody2D |
| 3 | `monster` | Monster CharacterBody2D |
| 4 | `player_hitbox` | Player attack Area2D — monsters' hurtboxes detect this |
| 5 | `monster_hitbox` | Monster attack Area2D — player's hurtbox detects this |
| 6 | `item` | Dropped loot orbs |
| 7 | `trigger` | Zone triggers (updrafts, biome transitions) |

Player hurtbox: mask = layer 5.
Monster hurtbox: mask = layer 4.
Items: mask = layer 2 (player picks up by overlap).

---

## 3. Input Map (Already Configured in project.godot)

| Action | Key 1 | Key 2 |
|--------|-------|-------|
| `move_left` | A | Left arrow |
| `move_right` | D | Right arrow |
| `jump` | W | Space / Up arrow |
| `attack_light` | Z | J |
| `attack_heavy` | X | K |
| `dodge` | Shift | C |
| `interact` | E | F *(add to project.godot)* |
| `open_inventory` | Tab | I *(add to project.godot)* |
| `open_menu` | Escape | — |

---

## 4. Player State Machine

States are defined in `Player.gd` as `enum State`:

```
IDLE → MOVE → JUMP → FALL
     ↓
     ATTACK (LIGHT / HEAVY_CHARGE / HEAVY_RELEASE)
     DODGE (i-frames: DODGE_IFRAME_START → DODGE_IFRAME_END)
     HURT (brief stagger, 0.3 s)
     DEAD (no input, freeze physics)
     INTERACT (brief lock while dialogue/pickup plays)
```

Transition rules:
- Any state → DODGE if `dodge` pressed and stamina ≥ DODGE_STAMINA_COST (except DEAD)
- Any state → HURT if hit and not invincible
- HURT → IDLE after stagger duration
- DEAD is terminal until scene reload

---

## 5. Weapon System

### Resource Schema — `WeaponData.tres`

```gdscript
class_name WeaponData
extends Resource

@export var weapon_name: String
@export var weapon_type: WeaponType  # enum in Constants
@export var light_damage: int
@export var heavy_damage_min: int
@export var heavy_damage_max: int
@export var passive_skill: String    # matches a skill ID in SkillDB
@export var hitbox_width: float
@export var hitbox_height: float
@export var light_combo_hits: int    # 1–4
@export var aerial_bonus: float      # multiplier, 1.0 = no bonus
@export var sprite_sheet: Texture2D
```

### Six Weapon Types (enum `WeaponType` in Constants.gd)

| ID | Name | Light | Heavy | Passive Skill | Aerial |
|----|------|-------|-------|---------------|--------|
| 0 | `SWORD_SHIELD` | Fast 3-hit combo | Shield counter | `counter_edge` | Aerial slash ×2 |
| 1 | `GREAT_SWORD` | Slow 1-hit | Charged draw (hold) | `true_charge` | Diving plunge |
| 2 | `DUAL_BLADES` | Rapid 5-hit | Demon mode spin | `elemental_burst` | Mid-air spin ×3 |
| 3 | `BOW` | Arrow shot | Charge level 1-3 | `aerial_advantage` | Full aerial, no penalty |
| 4 | `INSECT_GLAIVE` | Pole vault hit | Extract combo | `kinsect` | Permanent aerial mode |
| 5 | `LANCE` | Shield charge | Counter-thrust | `immovable` | -20% damage penalty |

### How to Implement a New Weapon

1. Create `resources/weapons/<name>.tres` using `WeaponData` schema.
2. In `PlayerCombat.gd`, read `equipped_weapon: WeaponData` and branch on `weapon_type` for moveset.
3. Add hitbox dimensions from resource — do not hard-code.
4. Register passive skill in `EquipmentSystem.gd` when weapon is equipped.

---

## 6. Equipment & Skill System

### Files to Create

- `scripts/systems/EquipmentSystem.gd` (autoload or attached to Player)
- `scripts/systems/SkillDB.gd` (static lookup — maps skill IDs to effects)
- `resources/weapons/*.tres`
- `resources/armor/*.tres`

### Resource Schema — `ArmorPiece.tres`

```gdscript
class_name ArmorPiece
extends Resource

@export var piece_name: String
@export var slot: ArmorSlot      # enum: HEAD, CHEST, ARMS, LEGS, CHARM
@export var defense: int
@export var skill_slots: Array[String]   # e.g. ["attack_boost", "weakness_exploit"]
@export var sprite: Texture2D
@export var craft_materials: Dictionary  # { "material_id": quantity }
```

### Resource Schema — `BackpackItem.tres`

```gdscript
class_name BackpackItem
extends Resource

@export var item_name: String
@export var consumable_slot_count: int       # how many different consumable types
@export var consumable_max_per_type: int     # stack limit per type
@export var skill_slot: String               # one passive skill contributed
@export var sprite: Texture2D
@export var craft_materials: Dictionary
```

### Resource Schema — `BackPieceItem.tres`

```gdscript
class_name BackPieceItem
extends Resource

@export var item_name: String
@export var ability_id: String           # matches ability in BackPieceAbility enum
@export var ability_cooldown: float      # base seconds, reduced by constitution skill
@export var skill_slot: String           # one passive skill contributed
@export var sprite: Texture2D
@export var craft_materials: Dictionary
```

### Back-piece Ability IDs (enum in Constants.gd)

```gdscript
enum BackPieceAbility {
    RIFT_GLIDER,      # hold jump mid-air → glide, steer horizontally
    GRAPPLE_ANCHOR,   # fire hook to nearest monster → reel in
    RIFT_BURST,       # vertical burst jump, consumes stamina on use
    SKY_MEMBRANE,     # slowfall + one horizontal air dash per airtime
    VOLCANIC_THRUST,  # ground burst dash, no i-frames (different from dodge)
    SHADOW_STEP,      # short blink teleport, bypasses counter range
    AETHORI_HARNESS,  # sustained flight 8s, then full cooldown
}
```

### GameState.gd — Equipment Fields (updated)

```gdscript
# Equipment (add to existing GameState)
var equipped_weapon: WeaponData = null
var equipped_helm: ArmorPiece = null
var equipped_chest: ArmorPiece = null
var equipped_arms: ArmorPiece = null
var equipped_greaves: ArmorPiece = null
var equipped_backpack: BackpackItem = null
var equipped_back_piece: BackPieceItem = null
var equipped_charm: ArmorPiece = null

# Consumable loadout (populated from backpack capacity)
var consumable_slots: Array[ConsumableSlot] = []
```

### EquipmentSystem.gd — Updated Skill Computation

```gdscript
func _recompute_skills() -> void:
    skill_counts.clear()
    var all_pieces = [
        equipped_helm, equipped_chest, equipped_arms, equipped_greaves,
        equipped_backpack, equipped_back_piece, equipped_charm
    ]
    for piece in all_pieces:
        if piece == null: continue
        var skills = piece.skill_slots if piece.has_method("get") else [piece.skill_slot]
        for skill_id in skills:
            skill_counts[skill_id] = skill_counts.get(skill_id, 0) + 1
    # Weapon passive
    if equipped_weapon:
        skill_counts[equipped_weapon.passive_skill] = \
            skill_counts.get(equipped_weapon.passive_skill, 0) + 1
    # Full armor set bonus
    if _is_full_armor_set():
        var bonus_skill := _full_set_bonus_skill()
        skill_counts[bonus_skill] = skill_counts.get(bonus_skill, 0) + 1
    active_skills = {}
    for skill_id in skill_counts:
        active_skills[skill_id] = min(skill_counts[skill_id], 3)
    Events.skills_updated.emit(active_skills)

func _is_full_armor_set() -> bool:
    var pieces = [equipped_helm, equipped_chest, equipped_arms, equipped_greaves]
    if pieces.any(func(p): return p == null): return false
    var monster_id = equipped_helm.source_monster
    return pieces.all(func(p): return p.source_monster == monster_id)
```

### Skill Activation Logic

```
EquipmentSystem._recompute_skills():
  skill_counts = {}
  for piece in [head, chest, arms, legs, charm]:
    for skill_id in piece.skill_slots:
      skill_counts[skill_id] = skill_counts.get(skill_id, 0) + 1
  # full set bonus: +1 virtual slot if all 4 armor slots filled from same monster
  active_skills = { skill_id: min(count, 3) }  # capped at Lv3
  Events.skills_updated.emit(active_skills)
```

### Skill IDs and Effects (implement in SkillDB.gd)

| ID | Lv1 | Lv2 | Lv3 |
|----|-----|-----|-----|
| `attack_boost` | +5% dmg | +10% + crit% | +18% + stagger |
| `weakness_exploit` | +10% on weakpoints | +20% + easier breaks | +35% + part break rate |
| `evasion_window` | +10% i-frame | standard i-frame | extended i-frame any dodge |
| `airborne` | +5% aerial dmg | +12% aerial dmg | +20%, aerial attacks free stamina |
| `recovery_speed` | faster green regen | instant green regen | green heals red HP |
| `elemental_attack` | +8% element | +18% element | +30% + status buildup |
| `guard_up` | block most attacks | block all attacks | guard counters always activate |
| `constitution` | -15% stamina cost | -25% stamina cost | -40% stamina cost |
| `counter_edge` | perfect block = 150% dmg | — | — |
| `true_charge` | full charge ignores 30% def | — | — |
| `aerial_advantage` | +25% dmg when airborne | — | — |
| `immovable` | no stagger, reduced knockback | — | — |
| `elemental_burst` | 10-hit combo → element explosion | — | — |
| `kinsect` | beetle harvests monster buffs | — | — |

---

## 7. Monster System

### Monster Pattern Data — `MonsterAttack` Resource

```gdscript
class_name MonsterAttack
extends Resource

@export var attack_id: String
@export var damage: int
@export var windup_frames: int           # frames before hitbox activates
@export var active_frames: int           # frames hitbox is live
@export var recovery_frames: int         # frames monster is vulnerable after
@export var counter_range: float         # 0 = no counter; >0 = triggers if player within px
@export var windup_vfx_color: Color      # flash color during windup (player learns this)
@export var windup_sound: String         # sound cue ID
@export var is_enrage_only: bool = false # only available post-enrage
```

### Monster State Conditions (select_attack logic)

```gdscript
# MonsterAI.gd — deterministic attack selection
# Same conditions always → same attack. No randomness.
func _select_attack() -> String:
    var dist := _dist_to_player()
    var last_player_action := GameState.player_last_action  # "dodge", "attack", "idle"

    # Priority order: check most specific condition first
    if dist < data.counter_range_close and last_player_action == "attack":
        return "counter_attack"    # always triggers if conditions met

    if dist < 80.0:
        return "close_attack"      # e.g. tail sweep

    if dist < 200.0:
        return "mid_attack"        # e.g. charge

    if is_enraged and dist >= 200.0:
        return "ranged_attack"     # e.g. thorn launch (enrage only)

    return ""  # no attack, reset timer
```

### Codex Pattern Tracking

```gdscript
# In GameState.gd
var codex_entries: Dictionary = {}
# { "thornmane": { "hunts": 3, "deaths": 1, "parts_broken": ["tail"], "unlocked_info": [...] } }

# In GuildSystem.gd
func _update_codex(monster_id: String, event: String) -> void:
    var entry = codex_entries.get(monster_id, { "hunts": 0, "deaths": 0, "parts_broken": [] })
    match event:
        "hunt_complete": entry.hunts += 1
        "player_died":   entry.deaths += 1
        "part_broken":   entry.parts_broken.append(event_data)
    codex_entries[monster_id] = entry
    Events.codex_updated.emit(monster_id)

func get_codex_unlock_level(monster_id: String) -> int:
    var e = codex_entries.get(monster_id, {})
    var hunts  = e.get("hunts", 0)
    var deaths = e.get("deaths", 0)
    if hunts >= 5:  return 5   # full pattern notes
    if hunts >= 3:  return 4   # timing notes
    if hunts >= 1 or deaths >= 1: return 3  # attack names
    return 1   # name + biome only
```

### Monster Data Resource — `MonsterData.tres`

```gdscript
class_name MonsterData
extends Resource

@export var monster_id: String
@export var display_name: String
@export var tier: MonsterTier    # enum: VEILKIN, RIFTBORN, ELDER
@export var max_hp: float
@export var move_speed: float
@export var aggro_range: float
@export var attack_range: float
@export var weakpoint_parts: Array[String]   # hitbox node names
@export var element_weakness: String
@export var element_resistance: String
@export var loot_table: Array[LootEntry]     # see Crafting section
@export var intro_music_cue: String
@export var sprite_sheet: Texture2D
```

### Monster AI State Machine

All monsters inherit `MonsterBase.gd`. States in `MonsterAI.gd`:

```
IDLE ──→ PATROL ──→ ALERT ──→ INVESTIGATE
                                 ↓
                              ATTACK
                              /    \
                         (HP < 30%)  \
                              ↓       ↓
                           ENRAGE   FLEE (Veilkin only)
```

- `IDLE`: velocity = 0, wait at spawn
- `PATROL`: move along waypoints (set as `Marker2D` nodes in scene)
- `ALERT`: player detected (in aggro_range), stop patrol, face player
- `INVESTIGATE`: lost sight, move to last known position, wait 3 s, return to PATROL
- `ATTACK`: execute attack sequence (varies per monster)
- `ENRAGE`: triggered once when HP ≤ `THORNMANE_ENRAGE_THRESHOLD`, new moves unlock, speed multiplier applied
- `FLEE`: Veilkin only — run to nest `Marker2D`, can be followed for ambush loot

### Monster Intro Sequence (first encounter only, tracked in GameState)

```gdscript
# MonsterIntro.gd — attach to any monster scene
func trigger_intro():
    if GameState.seen_monsters.has(monster_id): return
    GameState.seen_monsters.append(monster_id)
    Events.monster_intro_started.emit(monster_id)
    # 1. Slow time to 0.1x for 0.4 s
    # 2. Pan camera to monster
    # 3. Play monster roar animation / sound
    # 4. Fade camera back
    # 5. Show monster name label (2 s)
    # 6. Start combat music
    Events.monster_intro_ended.emit(monster_id)
```

### Weakpoints and Breakable Parts

Each monster scene has named `Area2D` nodes as child of a `WeakpointGroup` node:
- `WeakpointGroup/Head` — damage multiplier 1.8×
- `WeakpointGroup/Tail` — damage multiplier 1.4×, tail detaches when part HP depletes
- `WeakpointGroup/Wing` — damage multiplier 1.3×

When a breakable part's HP depletes:
```gdscript
Events.monster_part_broken.emit(monster_id, part_name)
# → triggers visual change (sprite swap)
# → adds part-specific bonus loot to end-of-hunt table
```

---

## 8. Crafting System

### Files to Create

- `scripts/systems/CraftingSystem.gd`
- `resources/items/*.tres` (one per material)
- `resources/weapons/*.tres` (one per weapon)
- `resources/armor/*.tres` (one per armor piece)

### Material Resource

```gdscript
class_name MaterialItem
extends Resource

@export var item_id: String
@export var display_name: String
@export var description: String
@export var rarity: int        # 1 = common, 2 = uncommon, 3 = rare, 4 = ultra-rare
@export var icon: Texture2D
@export var max_stack: int = 99
```

### Loot Entry (embedded in MonsterData)

```gdscript
class_name LootEntry
extends Resource

@export var material_id: String
@export var drop_chance: float   # 0.0–1.0
@export var quantity_min: int = 1
@export var quantity_max: int = 1
@export var source: LootSource   # enum: KILL, CARVE, PART_BREAK
```

### CraftingSystem.gd Public API

```gdscript
func can_craft(recipe_id: String) -> bool
func craft(recipe_id: String) -> bool       # deducts materials, returns item
func get_craftable_list() -> Array[String]  # recipes player has materials for
func add_material(material_id: String, qty: int) -> void
func get_material_count(material_id: String) -> int
```

### Weapon Upgrade Tree Example

```
iron_sword (starter, no craft cost)
  └→ thornmane_sword        [Thornmane Scale ×3, Thornmane Fang ×2]
       └→ thornmane_sword_plus  [Thornmane Plate ×1, Thornmane Scale ×5]
            └→ verdanthos_blade [Verdanthos Scale ×2, Verdanthos Claw ×1, Thornmane Plate ×2]
```

Store tree as nested Resources or a flat dict with `parent_id` field.

---

## 9. Save System

### File: `scripts/systems/SaveSystem.gd` (autoload)

```gdscript
const SAVE_PATH = "user://save.json"

func save() -> void:
    var data = {
        "player_hp": GameState.player_hp,
        "inventory": GameState.inventory,       # dict: material_id → count
        "equipment": GameState.equipment,       # dict: slot → item_id
        "guild_rank": GameState.guild_rank,
        "seen_monsters": GameState.seen_monsters,
        "completed_quests": GameState.completed_quests,
        "current_biome": GameState.current_biome,
    }
    FileAccess.open(SAVE_PATH, FileAccess.WRITE).store_string(JSON.stringify(data))

func load() -> bool:
    if not FileAccess.file_exists(SAVE_PATH): return false
    var data = JSON.parse_string(FileAccess.open(SAVE_PATH, FileAccess.READ).get_as_text())
    GameState.player_hp = data.get("player_hp", Constants.BASE_HP)
    # ... restore all fields
    return true
```

---

## 10. Biome System

### Biome Scene Structure

Each biome is a scene (`scenes/world/biomes/<BiomeName>.tscn`) with:

```
BiomeName (Node2D)
├── ParallaxBackground
│   ├── ParallaxLayer (far bg, factor 0.1)
│   ├── ParallaxLayer (mid bg, factor 0.4)
│   └── ParallaxLayer (near fg, factor 0.8)
├── TileMapLayer (ground tiles, physics layer 1)
├── TileMapLayer (decoration, no physics)
├── SpawnPoints (Node2D — child Marker2D nodes)
├── WaypointGroups (Node2D — per-monster patrol paths)
├── ZoneTriggers (Node2D — Area2D nodes for zone transitions)
└── Monsters (Node2D — spawned at runtime by BiomeManager)
```

### BiomeManager.gd (Autoload)

```gdscript
func load_biome(biome_id: String) -> void:
    # unload current biome scene
    # load new biome PackedScene
    # spawn monsters from biome's spawn table
    # set music track
    # emit Events.biome_loaded

func get_spawn_table(biome_id: String) -> Array[MonsterSpawnEntry]
```

### Biome IDs

| ID | Scene File | Guild Rank Required |
|----|-----------|-------------------|
| `ancient_canopy` | `AncientCanopy.tscn` | G1 |
| `wildspire_waste` | `WildspireWaste.tscn` | G1 |
| `frosted_peaks` | `FrostedPeaks.tscn` | G2 |
| `coral_skyland` | `CoralSkyland.tscn` | G2 |
| `volcanic_abyss` | `VolcanicAbyss.tscn` | G3 |
| `rotten_hollow` | `RottenHollow.tscn` | G3 |
| `elder_sky_ruins` | `ElderSkyRuins.tscn` | G4 |

### Biome Unique Mechanics

| Biome | Mechanic | Implementation Note |
|-------|----------|-------------------|
| Ancient Canopy | Vine traversal | `Area2D` vine nodes; player grabs → override horizontal velocity → swing arc tween |
| Wildspire Waste | Flash flood | Timer every 300 s → raise water `StaticBody2D` Y pos → damage zone in low areas |
| Frosted Peaks | Ice footing | Tile physics material: friction 0.05 → player slides; some puzzles need the slide |
| Coral Skyland | Updrafts | `Area2D` columns → set `Player.velocity.y = UPDRAFT_FORCE` while inside |
| Volcanic Abyss | Heat zones | `Area2D` tagged `heat_zone` → tick fire damage if player has < fire_resistance skill |
| Rotten Hollow | Darkness | Darkness `CanvasModulate` node; bioluminescent items add a `PointLight2D` to player |
| Elder Sky Ruins | Partial gravity | `BiomeManager` sets `ProjectSettings physics/2d/default_gravity` = 400 on load |

---

## 11. Aerial Combat

Triggered by:
- Entering an updraft `Area2D` (Coral Skyland)
- Insect Glaive vault input (any time, costs stamina)
- Monster lifting player off ground (specific attack)
- Elder Sky Ruins: permanent (gravity set to 400 globally for that biome)

### AerialPlayer.gd

Separate script activated when Player enters aerial mode:

```gdscript
# Replaces ground physics during aerial state
const AERIAL_GRAVITY_SCALE = 0.35
const AERIAL_MOVE_SPEED = 180.0

# Aerial rules:
# - Bow, Insect Glaive: full damage (aerial_bonus = 1.0 or 1.25)
# - Dual Blades, Great Sword: 0.9× damage
# - Lance: 0.8× damage
# - aerial hit stun on monsters keeps them airborne longer
```

Transition back to ground: player lands on any surface (is_on_floor() returns true).

---

## 12. Guild Hub — Veilwatch

### Scene: `scenes/world/Veilwatch.tscn`

```
Veilwatch (Node2D)
├── Background layers (parallax)
├── HubFloor (TileMapLayer)
├── NPCs/
│   ├── Yela (quest board)
│   ├── Doram (blacksmith)
│   ├── Chef Suni (meals)
│   ├── Elder Scholar Voss (codex / lore)
│   ├── Merchant Athe (trading)
│   └── Ryn (companion, locked until G2)
└── DoorTriggers/ (Area2D → biome transition)
```

### NPC Dialogue System

Simple linear dialogue — no branching in MVP. Each NPC has a `DialogueDB` resource:

```gdscript
class_name DialogueEntry
extends Resource

@export var speaker: String
@export var lines: Array[String]
@export var requires_guild_rank: int = 0   # 0 = always available
@export var requires_quest_flag: String = ""
@export var sets_quest_flag: String = ""
```

Display via `HUD/DialogueBox` — a `Panel` + `Label` + "Press E" prompt. No choice nodes needed in Phase 2.

### Meal Buffs (Chef Suni)

Buffs stored in `GameState.active_meal_buff` (one at a time), cleared on quest completion:

| Meal ID | Effect | Duration |
|---------|--------|----------|
| `canopy_stew` | `+15 max_hp` for hunt | whole quest |
| `ember_roast` | `fire_resistance +1`, `+10% fire dmg` | whole quest |
| `ice_broth` | `-20% stamina cost` | whole quest |
| `storm_broth` | `+15% thunder dmg` | whole quest |
| `rift_soup` | `+1 faint allowed` (4 total) | whole quest |

---

## 13. Quest System

### Quest Data Resource

```gdscript
class_name QuestData
extends Resource

@export var quest_id: String
@export var title: String
@export var description: String
@export var biome_id: String
@export var objectives: Array[QuestObjective]   # see below
@export var reward_zenny: int
@export var reward_materials: Array[LootEntry]
@export var unlock_requires_rank: int
@export var unlock_requires_quest: String = ""
@export var is_urgent: bool = false

class QuestObjective extends Resource:
    @export var type: ObjectiveType   # HUNT, GATHER, SLAY_COUNT
    @export var target_id: String     # monster_id or material_id
    @export var count: int = 1
```

### Quest Flow

```
GuildBoard.accept_quest(quest_id)
  → GameState.active_quest = quest
  → BiomeManager.load_biome(quest.biome_id)
  → [player hunts, objectives tracked via Events signals]
  → all objectives complete → Events.quest_objectives_complete
  → player returns to Veilwatch (door trigger) → GuildSystem.complete_quest()
  → distribute rewards → check rank-up
```

### Faint Tracking

```gdscript
# GuildSystem.gd
var faints_this_quest: int = 0
const MAX_FAINTS = 3

func _on_player_died():
    faints_this_quest += 1
    if faints_this_quest >= MAX_FAINTS:
        Events.quest_failed.emit()   # no loot, return to hub
    else:
        Events.player_respawn_at_camp.emit()  # respawn at zone entrance
```

---

## 13b. Dynamic Camera System

### CombatCamera.gd — Zoom Logic

```gdscript
# Target zoom levels
const ZOOM_EXPLORE   := Vector2(0.6, 0.6)   # no enemy in aggro range
const ZOOM_COMBAT    := Vector2(1.0, 1.0)   # enemy at mid range
const ZOOM_MELEE     := Vector2(1.3, 1.3)   # within MELEE_CLOSE_RANGE pixels
const ZOOM_LERP_SPEED := 3.0                # how fast zoom transitions

const MELEE_CLOSE_RANGE := 80.0             # pixels — triggers close zoom
const COMBAT_RANGE      := 400.0            # pixels — triggers combat zoom

func _process(delta: float) -> void:
    var target_zoom := _compute_target_zoom()
    zoom = zoom.lerp(target_zoom, ZOOM_LERP_SPEED * delta)
    # ... existing shake logic

func _compute_target_zoom() -> Vector2:
    var nearest_dist := _nearest_enemy_distance()
    if nearest_dist < MELEE_CLOSE_RANGE:
        return ZOOM_MELEE
    elif nearest_dist < COMBAT_RANGE:
        return ZOOM_COMBAT
    else:
        return ZOOM_EXPLORE
```

Add to `Constants.gd`:
```gdscript
const CAMERA_ZOOM_EXPLORE  := Vector2(0.6, 0.6)
const CAMERA_ZOOM_COMBAT   := Vector2(1.0, 1.0)
const CAMERA_ZOOM_MELEE    := Vector2(1.3, 1.3)
const CAMERA_ZOOM_SPEED    := 3.0
const CAMERA_MELEE_RANGE   := 80.0
const CAMERA_COMBAT_RANGE  := 400.0
```

---

## 13c. Melee Risk System

### Player-Side: Recovery Frames

Each weapon has a `recovery_frames` value in its `WeaponData` resource.
During recovery, dodge input is queued but not activated until recovery ends.

```gdscript
# In PlayerCombat.gd — after firing hitbox
func _fire_hitbox(facing, damage, active_duration) -> void:
    # ... existing hitbox enable/disable

    # Recovery window — dodge buffered but inactive
    is_in_recovery = true
    await get_tree().create_timer(equipped_weapon.recovery_frames / 60.0).timeout
    is_in_recovery = false
    # Execute buffered dodge if input was held during recovery
    if _dodge_buffered:
        _dodge_buffered = false
        start_dodge(facing)
```

Recovery frames per weapon (add to WeaponData resource):

| Weapon | Recovery Frames (at 60fps) |
|--------|--------------------------|
| Dual Blades | 4 |
| Sword & Shield | 7 |
| Bow | 0 (no recovery) |
| Insect Glaive | 8 |
| Great Sword light | 12 |
| Great Sword heavy | 22 |
| Lance | 6 |

### Monster-Side: Counter Windows

Each monster attack has a `counter_range` field. If player is within that range when the monster enters the attack's wind-up state, the counter fires.

```gdscript
# In MonsterBase.gd — add to attack state entry
func _enter_attack_state(attack_id: String) -> void:
    var attack_data := monster_data.attacks[attack_id]
    if attack_data.has("counter_range"):
        var dist := global_position.distance_to(player.global_position)
        if dist <= attack_data.counter_range:
            _fire_counter_attack(attack_data)
            return
    _fire_normal_attack(attack_data)
```

Add to monster attack definitions (in MonsterData resource):
```gdscript
# Example Thornmane tail sweep entry
{
    "id": "tail_sweep",
    "damage": THORNMANE_SWEEP_DAMAGE,
    "windup_frames": 24,
    "active_frames": 21,
    "recovery_frames": 18,
    "counter_range": 70.0,      # triggers if player within 70px on windup
    "windup_color": Color(0.9, 0.2, 0.6)
}
```

---

## 13d. Discovery Crafting System

### CraftingSystem.gd — Core API (updated)

```gdscript
# Attempt a craft — main entry point
func attempt_craft(slot_a: String, slot_b: String, slot_c: String = "") -> CraftResult:
    var key := _normalize_key(slot_a, slot_b, slot_c)

    if known_recipes.has(key):
        return _execute_known_recipe(key)

    var partial := _find_closest_recipe(slot_a, slot_b, slot_c)
    if partial:
        return _execute_partial_craft(partial, slot_a, slot_b, slot_c)

    return _execute_failure(slot_a, slot_b, slot_c)

func _execute_known_recipe(key: String) -> CraftResult:
    # deduct materials, return item at quality = lowest input quality
    var recipe := recipe_db[key]
    var quality := _lowest_material_quality(recipe.inputs)
    var item := recipe.output.duplicate()
    item.quality = quality
    GameState.add_item(item)
    codex.add_recipe(key)
    return CraftResult.new(CraftResult.SUCCESS, item)

func _execute_partial_craft(partial_match, ...) -> CraftResult:
    # Produce weak version of the closest recipe
    # Save hint: which slots were right, which were wrong
    codex.add_hint(partial_match.hint_string)   # e.g. "Thornmane Fang + ? + ?"
    var weak_item := partial_match.output.duplicate()
    weak_item.quality = Quality.BASE
    weak_item.name += " (rough)"
    GameState.add_item(weak_item)
    return CraftResult.new(CraftResult.PARTIAL, weak_item)

func _execute_failure(...) -> CraftResult:
    # Consume inputs, produce Fused Scrap
    GameState.remove_materials(slot_a, slot_b, slot_c)
    GameState.add_item(fused_scrap_resource)
    return CraftResult.new(CraftResult.FAILURE, fused_scrap_resource)
```

### CraftResult Class

```gdscript
class_name CraftResult
extends RefCounted

enum Type { SUCCESS, PARTIAL, FAILURE }

var type: Type
var item: MaterialItem    # what was produced
var hint: String = ""     # for PARTIAL — the partial recipe string
```

### Recipe Database Format

Recipes stored as `Dictionary` in `CraftingSystem.gd` or loaded from JSON:

```gdscript
# Key is sorted material IDs joined — order-independent
# "canopy_vine+iron_plate+thornmane_fang" (always sorted alphabetically)

recipes = {
    "canopy_vine+iron_plate+thornmane_fang": {
        "output": preload("res://resources/weapons/thornmane_sword.tres"),
        "inputs": ["canopy_vine", "iron_plate", "thornmane_fang"],
        "discovered_by_default": false
    },
    ...
}
```

### Quality Tiers

```gdscript
enum Quality { BASE, FINE, PERFECT }

# Output quality = lowest quality input
func _lowest_material_quality(inputs: Array[String]) -> Quality:
    var lowest := Quality.PERFECT
    for mat_id in inputs:
        var q := GameState.get_material_quality(mat_id)
        if q < lowest:
            lowest = q
    return lowest
```

### Loot Quality on Drop

Add to `MonsterBase.gd` drop roll:

```gdscript
func _roll_quality(base_drop_rate: float, is_enraged_kill: bool) -> Quality:
    var r := randf()
    var perfect_chance := 0.05 if not is_enraged_kill else 0.10
    var fine_chance    := 0.25 if not is_enraged_kill else 0.35
    if r < perfect_chance:  return Quality.PERFECT
    if r < fine_chance:     return Quality.FINE
    return Quality.BASE
```

---

## 14. Events.gd — Full Signal List

Add all signals here before using them anywhere. Current + planned:

```gdscript
# Player
signal player_hp_changed(current: float, maximum: float)
signal player_stamina_changed(current: float, maximum: float)
signal player_died()
signal player_respawn_at_camp()

# Monster
signal monster_hp_changed(monster_id: String, current: float, maximum: float)
signal monster_died(monster_id: String)
signal monster_staggered(monster_id: String)
signal monster_enraged(monster_id: String)
signal monster_part_broken(monster_id: String, part_name: String)
signal monster_intro_started(monster_id: String)
signal monster_intro_ended(monster_id: String)

# Combat
signal damage_dealt(position: Vector2, amount: int, is_critical: bool)
signal hit_landed(target: Node, damage: int)
signal camera_shake(intensity: float)
signal melee_recovery_started(weapon_type: int)
signal melee_recovery_ended()
signal monster_counter_triggered(monster_id: String, attack_id: String)

# Crafting
signal craft_attempted(slot_a: String, slot_b: String, slot_c: String)
signal craft_succeeded(item_id: String, quality: int)
signal craft_partial(hint: String)
signal craft_failed()
signal recipe_discovered(recipe_key: String)
signal codex_hint_added(hint: String)

# Equipment
signal skills_updated(active_skills: Dictionary)
signal weapon_equipped(weapon_data: WeaponData)
signal armor_equipped(slot: String, armor_data: ArmorData)

# Quest
signal quest_accepted(quest_id: String)
signal quest_objectives_complete(quest_id: String)
signal quest_completed(quest_id: String)
signal quest_failed(quest_id: String)
signal objective_updated(quest_id: String, objective_index: int, current: int, target: int)

# Guild
signal guild_rank_increased(new_rank: int)
signal faint_occurred(faints_remaining: int)
signal guild_story_branch_triggered(scene_id: String, guild_id: String)

# Biome
signal biome_loaded(biome_id: String)
signal biome_transition_requested(biome_id: String)

# UI
signal dialogue_started(npc_id: String)
signal dialogue_ended(npc_id: String)
signal inventory_changed()
signal loot_picked_up(material_id: String, quantity: int)

# Rift Shard
signal rift_pulse_fired()
signal rift_step_used(direction: Vector2)
signal rift_seal_charged()
signal rift_seal_released(target_position: Vector2)
signal rift_shard_ability_unlocked(ability_id: String)

# Friendship
signal friendship_increased(npc_id: String, new_level: int)
signal friendship_quest_unlocked(npc_id: String, quest_id: String)
signal npc_returned_from_hunt(npc_id: String)

# Serath
signal serath_knowledge_increased(new_score: int)
signal serath_piece_found(piece_id: String)
```

---

## 15. GameState.gd — Full Schema

```gdscript
extends Node

# Character creation (set once at game start, never changes)
var player_gender: String = ""          # "male" or "female"
var player_skin_tone: int = 0           # 0–3 (light to dark)
var player_hair_style: int = 0          # 0–3 (short, medium, long, braided)
var player_hair_color: int = 0          # 0–3 (dark, auburn, light, silver)
var player_eye_color: int = 0           # 0–2 (brown, blue, green)

# Player
var player_hp: float = Constants.BASE_HP
var player_stamina: float = Constants.BASE_STAMINA
var player_dead: bool = false
var player_last_action: String = "idle"   # "dodge", "attack", "idle" — read by MonsterAI

# Equipment
var equipped_weapon: WeaponData = null
var equipped_head: ArmorPiece = null
var equipped_chest: ArmorPiece = null
var equipped_arms: ArmorPiece = null
var equipped_legs: ArmorPiece = null
var equipped_backpack: BackpackItem = null
var equipped_back_piece: BackPieceItem = null
var equipped_charm: ArmorPiece = null

# Inventory
var inventory: Dictionary = {}     # material_id → { "count": int, "quality": int }

# Guild progression
var active_guild: String = ""      # set once at game start, never changes
var guild_rank: int = 1            # 1 = G1 through 4 = G4, 5 = Elder Rank
var completed_quests: Array[String] = []
var active_quest: QuestData = null
var active_meal_buff: String = ""  # meal_id or ""

# Monster tracking
var seen_monsters: Array[String] = []    # monsters whose intros have played
var current_biome: String = "veilwatch"
var codex_entries: Dictionary = {}
# { "thornmane": { "hunts": 3, "deaths": 1, "parts_broken": ["tail"], "unlocked_info": [...] } }

# Codex
var codex_unlocked: Array[String] = []   # monster_ids with Codex entries

# Rift Shard abilities (unlocked through story)
var rift_pulse_unlocked: bool = false      # G1 — after first Rift encounter
var rift_step_unlocked: bool = false       # G2 — Coral Skyland carved wound scene
var rift_seal_unlocked: bool = false       # G4 — Sovereign stirs in Elder Sky Ruins
var rift_pulse_cooldown_elapsed: float = 0.0
var rift_step_cooldown_elapsed: float = 0.0
var rift_seal_cooldown_elapsed: float = 0.0

# Friendship (5-level bars per key NPC)
# Keys: "yela", "voss", "suni", "athe", "doram", "ryn", "brix", "fen", "pip", "wren",
#       "karas", "aldis", "vyn", "tae", "ignas", "sable", etc.
var friendship_bars: Dictionary = {}       # npc_id → int (0–5)
var friendship_quests_completed: Array[String] = []  # npc_id + "_quest_N"

# Guild story branches (which variant scenes have been seen)
var seen_guild_branches: Array[String] = []
# e.g. ["scene1_wardens", "scene2_wardens", "scene3_wardens"]

# Serath relationship
var serath_knowledge: int = 0              # 0–5, gates final scene depth
var serath_pieces_found: Array[String] = []
# e.g. ["three_letters", "npc_memory", "journal_fragment", "annotated_doc", "the_approach"]
```

---

## 15b. Rift Shard System

### File: `scripts/player/RiftShard.gd` (attached to Player)

Three active abilities tied to story progression. All cooldowns live in `Constants.gd`.

```gdscript
class_name RiftShard
extends Node

# Rift Pulse — unlocks G1 (after first Rift encounter)
# Sends ring of energy — all Veilborn within RIFT_PULSE_RADIUS glow 20 s,
# Veilkin enter startled-alert for 1.5 s
func fire_rift_pulse() -> void:
    if not GameState.rift_pulse_unlocked: return
    if GameState.rift_pulse_cooldown_elapsed < Constants.RIFT_PULSE_COOLDOWN: return
    GameState.rift_pulse_cooldown_elapsed = 0.0
    Events.rift_pulse_fired.emit()
    # Highlight all monsters within RIFT_PULSE_RADIUS via shader override
    for monster in get_tree().get_nodes_in_group("monsters"):
        var dist := monster.global_position.distance_to(player.global_position)
        if dist <= Constants.RIFT_PULSE_RADIUS:
            monster.apply_rift_glow(Constants.RIFT_PULSE_DURATION)
            if monster.tier == MonsterTier.VEILKIN:
                monster.startle(1.5)

# Rift Step — unlocks G2 (Coral Skyland carved wound scene)
# Blink 200 px in held direction, passes through hitboxes and terrain
# NOT a dodge — no i-frames, doesn't cancel animations
func use_rift_step(direction: Vector2) -> void:
    if not GameState.rift_step_unlocked: return
    if GameState.rift_step_cooldown_elapsed < Constants.RIFT_STEP_COOLDOWN: return
    GameState.rift_step_cooldown_elapsed = 0.0
    Events.rift_step_used.emit(direction)
    var dest := player.global_position + direction.normalized() * Constants.RIFT_STEP_DISTANCE
    # Tween position directly — bypasses collision for 1 frame (blink)
    var tween := create_tween()
    tween.tween_property(player, "global_position", dest, 0.05)

# Rift Seal — unlocks G4 (Sovereign stirs scene)
# Charge 2 s → release beam → 4 s vulnerability window (×1.5 damage) on target
func charge_rift_seal() -> void:
    if not GameState.rift_seal_unlocked: return
    if GameState.rift_seal_cooldown_elapsed < Constants.RIFT_SEAL_COOLDOWN: return
    Events.rift_seal_charged.emit()
    # Visual: arm charges violet-gold for 2 s

func release_rift_seal(target: Node) -> void:
    GameState.rift_seal_cooldown_elapsed = 0.0
    Events.rift_seal_released.emit(target.global_position)
    if target and target.has_method("apply_vulnerability"):
        target.apply_vulnerability(Constants.RIFT_SEAL_VULN_MULT, Constants.RIFT_SEAL_VULN_DURATION)
```

### Constants needed (add to Constants.gd):

```gdscript
const RIFT_PULSE_RADIUS     := 300.0
const RIFT_PULSE_DURATION   := 20.0
const RIFT_PULSE_COOLDOWN   := 45.0
const RIFT_STEP_DISTANCE    := 200.0
const RIFT_STEP_COOLDOWN    := 18.0
const RIFT_SEAL_COOLDOWN    := 180.0   # 3 minutes
const RIFT_SEAL_VULN_MULT   := 1.5
const RIFT_SEAL_VULN_DURATION := 4.0
```

### Unlock triggers (call in story scene scripts):

```gdscript
# After first Rift encounter (Act I, Ancient Canopy)
GameState.rift_pulse_unlocked = true
Events.rift_shard_ability_unlocked.emit("rift_pulse")

# Coral Skyland carved wound scene (Act II, G2)
GameState.rift_step_unlocked = true
Events.rift_shard_ability_unlocked.emit("rift_step")

# Sovereign stirs (Act IV, Elder Sky Ruins)
GameState.rift_seal_unlocked = true
Events.rift_shard_ability_unlocked.emit("rift_seal")
```

---

## 15c. Friendship System

### File: `scripts/systems/FriendshipSystem.gd` (autoload)

```gdscript
extends Node

const MAX_LEVEL := 5
const FRIENDSHIP_QUEST_LEVEL := 3   # personal quest unlocks here
const FRIENDSHIP_CLOSE_LEVEL := 5   # close friend scene here

func add_friendship(npc_id: String, amount: int = 1) -> void:
    var current := GameState.friendship_bars.get(npc_id, 0)
    var new_level := mini(current + amount, MAX_LEVEL)
    if new_level == current: return
    GameState.friendship_bars[npc_id] = new_level
    Events.friendship_increased.emit(npc_id, new_level)
    if new_level == FRIENDSHIP_QUEST_LEVEL:
        _unlock_personal_quest(npc_id)
    if new_level == FRIENDSHIP_CLOSE_LEVEL:
        _trigger_close_friend_scene(npc_id)

func get_level(npc_id: String) -> int:
    return GameState.friendship_bars.get(npc_id, 0)

func _unlock_personal_quest(npc_id: String) -> void:
    var quest_id := npc_id + "_personal_quest"
    Events.friendship_quest_unlocked.emit(npc_id, quest_id)
    GuildSystem.add_board_quest(quest_id)

func _trigger_close_friend_scene(npc_id: String) -> void:
    # Load and play npc_id close friend scene
    Events.dialogue_started.emit(npc_id + "_close_friend")
```

### Friendship gain events:

| Trigger | NPC | Gain |
|---------|-----|------|
| Talk to NPC after returning from hunt | Any | +1 |
| Complete NPC's personal quest | Quest-giver NPC | +1 |
| Hit rank milestone they care about | Relevant NPC | +1 |
| Clear a hunt they posted | Board-posting NPC | +1 |
| Complete hunt with companion NPC | Companion NPC | +1 |
| Share hunt debrief (post-companion hunt) | Companion NPC | +1 |

Friendship bars persist in `GameState.friendship_bars` (saved/loaded by `SaveSystem`).

### NPC IDs (canonical, use these everywhere):

```
yela  voss  suni  athe  doram  ryn  brix  nem  fen  sora
aldis  karas  lira  cael  vyn  tae  ova  wren  pip  holt
ignas  hessa  sable  mira
```

---

## 15d. Guild Story Branches

### File: `scripts/systems/GuildStorySystem.gd` (autoload)

Three divergence points in the main story. Each plays a different scene variant based on `GameState.active_guild`. Scenes are short dialogue+ambient variations — not full quest rewrites.

```gdscript
extends Node

func trigger_story_branch(scene_id: String) -> void:
    var guild := GameState.active_guild
    var branch_key := scene_id + "_" + guild
    if GameState.seen_guild_branches.has(branch_key): return
    GameState.seen_guild_branches.append(branch_key)
    Events.guild_story_branch_triggered.emit(scene_id, guild)
    _load_branch_dialogue(scene_id, guild)

func _load_branch_dialogue(scene_id: String, guild: String) -> void:
    var path := "res://resources/dialogue/branches/%s_%s.tres" % [scene_id, guild]
    var db := load(path) as DialogueDB
    if db:
        DialogueSystem.play(db)
```

### Three scene IDs and trigger locations:

| scene_id | Story beat | Where to call `trigger_story_branch()` |
|----------|-----------|----------------------------------------|
| `"scene1_rift_noticed"` | Act I — something's wrong, Ancient Canopy | On returning to Veilwatch after first Rift sighting |
| `"scene2_carved_wound"` | Act II — the artificially cut Rift tear, Coral Skyland | On interacting with the carved wound |
| `"scene3_reclamation_revealed"` | Act III — who's behind the disruptions | On completing the Act III investigation quest |

### Dialogue resource paths:

```
resources/dialogue/branches/
├── scene1_rift_noticed_wardens.tres
├── scene1_rift_noticed_crimson_claw.tres
├── scene1_rift_noticed_ironveil_crafters.tres
├── scene1_rift_noticed_skyborn.tres
├── scene1_rift_noticed_hollowroot_lodge.tres
├── scene1_rift_noticed_ember_pact.tres
├── scene1_rift_noticed_voidwalkers.tres
├── scene2_carved_wound_*.tres    (same pattern, 7 guilds)
└── scene3_reclamation_revealed_*.tres
```

---

## 15e. Serath Relationship System

### Tracking in GameState (already in §15 schema):

```gdscript
var serath_knowledge: int = 0
var serath_pieces_found: Array[String] = []
```

### Five discoverable pieces and how they increment:

| piece_id | Location | Implementation |
|----------|----------|----------------|
| `"three_letters"` | Sky Ruins archives — 3 Area2D interact points scattered in Act IV | `_on_letter_interact()` → check all 3 found → increment |
| `"npc_memory"` | Merchant Athe dialogue — unlocked if player has asked Athe about older customers ≥3 times | `DialogueDB` flag check in Athe's dialogue tree |
| `"journal_fragment"` | Reclamation base, Volcanic Abyss — interactable prop | `_on_journal_interact()` |
| `"annotated_doc"` | Voss has partial copy (triggers hint); full copy in Sky Ruins archives | Voss dialogue at ★★★☆☆ + archive interact |
| `"the_approach"` | Before final confrontation — walk toward Serath rather than attacking | Player position check in final boss scene; requires `serath_knowledge >= 3` to unlock |

```gdscript
# Call this from each discovery location
func discover_serath_piece(piece_id: String) -> void:
    if GameState.serath_pieces_found.has(piece_id): return
    GameState.serath_pieces_found.append(piece_id)
    GameState.serath_knowledge += 1
    Events.serath_piece_found.emit(piece_id)
    Events.serath_knowledge_increased.emit(GameState.serath_knowledge)
```

### Final scene gating (in final boss scene script):

```gdscript
func _load_serath_final_scene() -> void:
    var score := GameState.serath_knowledge
    var variant: String
    if score >= 4:
        variant = "full"        # Serath talks, turns back once, Voss reads margin note
    elif score >= 2:
        variant = "acknowledged"  # brief surprise, something like relief
    else:
        variant = "minimal"     # professional, efficient, done
    DialogueSystem.play(load("res://resources/dialogue/serath_final_%s.tres" % variant))
```

---

## 16. Constants.gd — Additions Needed

Add these to the existing file as systems are built:

```gdscript
# Aerial
const AERIAL_GRAVITY_SCALE := 0.35
const UPDRAFT_FORCE := -600.0
const INSECT_GLAIVE_VAULT_COST := 15.0

# Combat Damage
const WEAKPOINT_MULTIPLIER := 1.8
const AERIAL_BOW_MULTIPLIER := 1.25
const LANCE_AERIAL_PENALTY := 0.8

# Elements
const ELEMENT_WEAKNESS_MULT := 1.5
const ELEMENT_RESISTANCE_MULT := 0.6

# Flash flood (Wildspire Waste)
const FLOOD_INTERVAL := 300.0
const FLOOD_RISE_SPEED := 40.0
const FLOOD_DAMAGE_PER_SEC := 8.0

# Heat zone (Volcanic Abyss)
const HEAT_DAMAGE_PER_SEC := 5.0
const HEAT_FIRE_RESIST_THRESHOLD := 2  # skill Lv2 = immune

# Partial gravity (Elder Sky Ruins)
const SKY_RUINS_GRAVITY := 400.0

# Loot
const CARVE_COUNT := 3
const FIRST_KILL_RARE_GUARANTEED := true

# Quest
const MAX_FAINTS_PER_QUEST := 3

# Camera
const CAMERA_LOOKAHEAD := 120.0    # pixels ahead of player in move direction
```

---

## 17. HUD Layout (Planned Full State)

```
Top-left:        [HP bar] ████████ 85/100
                 [Stamina bar] ██████ 60/100

Top-center:      THORNMANE ——————————————————— [HP bar]
                 (monster name + enrage indicator)

Bottom-left:     [Weapon icon] [Skill icons ×6]

Bottom-center:   [Buff icon] Canopy Stew (14:32)

Top-right:       Quest objective — e.g. "Hunt Thornmane  0/1"
                 Faint counter: ♥ ♥ ♥

Center (temp):   "YOU FAINTED" / "QUEST COMPLETE" overlay
```

---

## 18. Build Phases

### Phase 1 — Combat Sandbox ✅ COMPLETE
Combat feel: player movement, light/heavy/dodge, Thornmane fight, HUD basics.

### Phase 2 — Core Systems (Next)

**Goal:** inventory, crafting, equipment, save, weapon swapping, Veilwatch hub.

Priority order:
1. `EquipmentSystem.gd` + `SkillDB.gd` — stats update when gear changes
2. `CraftingSystem.gd` — craft from material dict in GameState
3. `SaveSystem.gd` — write/read JSON (include all new GameState fields: friendship_bars, serath_knowledge, rift_*_unlocked, active_guild)
4. `Veilwatch.tscn` — simple hub, Doram functional (craft menu), Yela functional (quest board with 1 quest)
5. `DialogueSystem.gd` — linear NPC dialogue via F/E key
6. One full weapon tree for Sword & Shield (3 upgrades, requires Thornmane materials)
7. One full Thornmane armor set (4 pieces, skills stack)
8. Wire one quest: accept → hunt Thornmane → return → reward
9. `RiftShard.gd` — implement Rift Pulse (the G1 ability only); wire unlock trigger after first Rift encounter

### Phase 3 — Biomes + Aerial

**Goal:** Ancient Canopy playable, Coral Skyland aerial working, 2 more monsters, Rift Step unlock.

Priority order:
1. `BiomeManager.gd` — scene load/unload
2. `AncientCanopy.tscn` — tileset placeholder + vine traversal mechanic
3. Moss Crawler (Veilkin) — simple patrol + flee AI using MonsterBase
4. Verdanthos (Elder boss) — multi-phase fight, breakable parts
5. `AerialPlayer.gd` — aerial physics mode
6. `CoralSkyland.tscn` — updraft zones, Insect Glaive aerial
7. Monster intro sequence system
8. Carved Rift wound interact scene in Coral Skyland → triggers `rift_step_unlocked`
9. Wire Rift Step into `RiftShard.gd` (ability already scripted, just needs the flag)

### Phase 4 — Guild Progression

**Goal:** All Veilwatch NPCs, meal buffs, guild rank gates, quest board, friendship system.

1. All NPC scenes + dialogue resources
2. `GuildSystem.gd` — rank tracking, quest state, faint counter
3. `MealSystem.gd` — Chef Suni UI, buff application
4. Quest board with rank-gated quest list
5. Ryn companion AI (G2 unlock)
6. `FriendshipSystem.gd` — friendship bars, friendship gain events, personal quests at ★★★☆☆
7. `GuildStorySystem.gd` — 21 branch dialogue resources (3 scenes × 7 guilds)
8. Guild Hall Evolution — milestone changes to Veilwatch.tscn triggered by rank/quest events
9. Seasonal Events — calendar flag in GameState, event dialogue + board changes

### Phase 5 — Content (Remaining Biomes + Monsters)

Build in this order (gates on Guild rank):
- G2: Frosted Peaks + Velkhrath · Wildspire Waste + Diablorak
- G3: Volcanic Abyss + Ashmaul · Rotten Hollow + Chaoskrel · Serath discoverable piece: journal_fragment at Reclamation base
- G4: Elder Sky Ruins + Serath + Sovereign · Rift Seal unlock scene · All 5 Serath discovery pieces wired · Three-tier final scene variants

### Phase 6 — Polish

Hit effects, sound, music, shader hit flash, monster death particles, UI polish.
See ROADMAP.md Phase 6 checklist.

### Phase 7 — Launch

Export, settings menu, credits, itch.io.

---

## 19. Folder Quickref

```
game/
├── project.godot
├── scenes/
│   ├── Main.tscn              ← prototype sandbox (keep for testing)
│   ├── Player.tscn
│   ├── world/
│   │   ├── Veilwatch.tscn
│   │   └── biomes/
│   ├── monsters/
│   │   ├── veilkin/
│   │   ├── riftborn/
│   │   └── elders/
│   ├── ui/
│   │   ├── HUD.tscn
│   │   ├── CraftingMenu.tscn
│   │   ├── GuildBoard.tscn
│   │   ├── Inventory.tscn
│   │   └── DialogueBox.tscn
│   └── effects/
├── scripts/
│   ├── globals/         ← autoloads: Constants, Events, GameState
│   ├── player/          ← Player, PlayerCombat, PlayerStats, AerialPlayer
│   ├── monsters/        ← MonsterBase, MonsterAI, MonsterIntro, per-monster scripts
│   ├── systems/         ← CombatCamera, EquipmentSystem, CraftingSystem,
│   │                       SaveSystem, BiomeManager, GuildSystem, MealSystem
│   └── ui/              ← HUD, CraftingMenu, GuildBoard, Inventory, DialogueSystem
└── resources/
    ├── weapons/         ← WeaponData .tres files
    ├── armor/           ← ArmorPiece .tres files
    ├── monsters/        ← MonsterData .tres files
    ├── items/           ← MaterialItem .tres files
    └── quests/          ← QuestData .tres files
```

---

## 20. Prompt Template for Starting a New Session

Paste this at the start of any Claude Code or Codex session:

```
I'm building Rift Hunter — a 2.5D solo ARPG in Godot 4.4, GDScript only.
Read GAMEPLAN.md, ARCHITECTURE.md, and DESIGN.md before writing anything.

Current phase: [paste phase name from GAMEPLAN.md §18]
Task: [describe the specific system or file to build]

Rules:
- All numbers in Constants.gd — no hard-coded values
- All cross-system events via Events.gd signals — no direct node references across scenes
- One script per system
- Resources (.tres) for all data (weapons, armor, monsters, quests, items)
- Follow the file structure in GAMEPLAN.md §19 exactly
- Do not rewrite existing files unless specifically asked
```

---

*GAMEPLAN.md — Rift Hunter — Updated May 2026*
