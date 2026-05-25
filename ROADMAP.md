# Roadmap

---

## Phase 1 — Prototype (Week 1–2)

Goal: a player that feels good to control in a single room.

- [ ] Godot 4 project setup, folder structure per ARCHITECTURE.md
- [ ] `Constants.gd`, `GameState.gd`, `Events.gd` autoloads
- [ ] Player scene — WASD movement, jump, basic attack, dodge roll with i-frames
- [ ] `AnimationTree` wired up — idle, run, jump, attack, dodge states
- [ ] Camera follow with smoothing and slight lookahead
- [ ] One Veilkin (Moss Crawler) — patrol AI, takes damage, plays death animation
- [ ] Basic HP bar on HUD
- [ ] 2.5D depth sorting working — player renders behind/in-front of scenery correctly

---

## Phase 2 — Core Systems (Week 3–4)

Goal: the full combat loop with gear and crafting functional.

- [ ] All 6 weapon types implemented with distinct movesets
- [ ] `EquipmentSystem.gd` — equip gear, derive stats, apply skills
- [ ] `CraftingSystem.gd` — recipe lookup, material check, item creation
- [ ] `SaveSystem.gd` — write/read inventory and progress to disk
- [ ] Monster drop system — loot tables per monster, material items defined as Resources
- [ ] Craftable weapon (one full weapon tree)
- [ ] Craftable armor set (one full monster set)
- [ ] Skill system working — at least 4 skills stackable
- [ ] Basic Veilwatch hub scene — Blacksmith and Guild Board functional
- [ ] One quest flow: accept → hunt → return → reward

---

## Phase 3 — Biomes & Monsters (Week 5–7)

Goal: two complete biomes with bosses, aerial combat working.

- [ ] Ancient Canopy biome — full tileset, parallax background, vine traversal
- [ ] Wildspire Waste biome — flash flood mechanic
- [ ] Thornmane (Riftborn mid-boss) — full AI, enrage phase, breakable parts
- [ ] Verdanthos (Elder boss) — multi-phase fight, monster intro sequence
- [ ] Aerial combat layer — Coral Skyland updraft zones, aerial player physics
- [ ] Insect Glaive aerial mode — vault trigger, aerial moveset
- [ ] Bow aerial advantage — damage bonus, aerial charge levels
- [ ] Monster intro cutscene system (first-encounter only)
- [ ] Field Codex entries unlock on first kill

---

## Phase 4 — Guild & Progression (Week 8–9)

Goal: full hub experience, guild rank gates, all NPCs.

- [ ] All Veilwatch NPCs — dialogue system, basic conversations
- [ ] Meal system — Chef Suni, pre-hunt buffs
- [ ] Guild rank system — G1 through G4, rank-up quests
- [ ] Full quest board — hunt quests, gather quests, urgent dispatches
- [ ] Companion AI — Ryn recruitable at G2
- [ ] Quest fail state — 3 faints, return to hub, no reward

---

## Phase 5 — Content Pass (Week 10–13)

Goal: all 7 biomes, all monsters, story complete.

- [ ] Frosted Peaks + Velkhrath
- [ ] Coral Skyland + Namielle-Keth
- [ ] Volcanic Abyss + Ashmaul (story boss)
- [ ] Rotten Hollow + Chaoskrel
- [ ] Elder Sky Ruins + Sovereign (final boss, two-phase)
- [ ] Full story — Act I through Final Act
- [ ] Serath NPC arc and dialogue
- [ ] Elder Scholar Voss research questline (Rift Shard lore)
- [ ] All charm recipes
- [ ] Weapon upgrade trees complete for all 6 weapon types

---

## Phase 6 — Polish & Audio (Week 14–15)

Goal: the game feels and sounds like a game.

- [ ] All hit effects — white flash frame, sparks, screen shake
- [ ] Dodge trail effect
- [ ] Rift Surge visual (energy burst on Rift opening)
- [ ] Monster death animations — stagger, collapse, dissolve
- [ ] Background ambient audio per biome
- [ ] Combat music — normal, alert, boss (music shifts on monster intro)
- [ ] UI sound effects — menu navigation, equip, craft success
- [ ] Monster roar audio on enrage and intro
- [ ] Font, UI polish, consistent visual language

---

## Phase 7 — Launch Prep

Goal: stable, distributable, tested.

- [ ] Save/load tested across all progression states
- [ ] Performance pass — object pooling for effects, LOD for off-screen monsters
- [ ] Godot export configured — Windows, Mac, Linux builds
- [ ] Settings menu — resolution, fullscreen, audio sliders, keybindings
- [ ] Credits screen
- [ ] 30-minute playtesting session with someone unfamiliar with the game
- [ ] itch.io page + trailer (screen-recorded gameplay)
- [ ] Soft launch

---

## Post-Launch (Elder Rank Content)

- [ ] Tempered monster variants (all existing monsters, harder versions)
- [ ] New material tier — Elder Crystals, Void-Touched parts
- [ ] Endgame gear set per weapon type
- [ ] Other Rift Shards questline — 3 new story quests
- [ ] New Riftborn: Aethori War-Wyvern variant hunts
- [ ] Possible: co-op hunt mode (2 players local or online)

---

## Open Design Questions

1. **Rift Shard progression** — should the Shard's Resonance ability unlock in stages (tied to Guild rank) or story beats?
2. **Ryn companion** — passive AI follower, or player-controlled toggle?
3. **Faint penalty** — lose all collected materials on faint, or just the 1-faint-per-3 limit?
4. **Charm upgrading** — keep charms non-upgradeable (forces exploration) or allow one upgrade per charm?
5. **Post-game loop** — tempered monsters only, or add a Rift incursion system (random hard hunts)?
6. **Serath ending** — binary choice (seal or spare) or multiple outcomes based on player actions throughout?
