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
- [ ] `EquipmentSystem.gd` — equip gear, derive stats, apply skills (includes backpack + back-piece slots)
- [ ] `CraftingSystem.gd` — discovery crafting with partial hints and Fused Scrap
- [ ] `SaveSystem.gd` — write/read inventory, equipment, friendship bars, Serath knowledge, Rift Shard flags, active guild
- [ ] Monster drop system — loot tables per monster, material items defined as Resources
- [ ] Craftable weapon (one full weapon tree — Sword & Shield, 3 upgrades)
- [ ] Craftable armor set (Thornmane, 4 pieces, skills stack)
- [ ] Skill system working — at least 4 skills stackable
- [ ] Basic Veilwatch hub scene — Blacksmith and Guild Board functional
- [ ] One quest flow: accept → hunt → return → reward
- [ ] `RiftShard.gd` — Rift Pulse implemented, unlocks after first Rift encounter (G1)

---

## Phase 3 — Biomes & Monsters (Week 5–7)

Goal: two complete biomes with bosses, aerial combat working, Rift Step unlocked.

- [ ] Ancient Canopy biome — full tileset, parallax background, vine traversal
- [ ] Wildspire Waste biome — flash flood mechanic
- [ ] Thornmane (Riftborn mid-boss) — full AI, enrage phase, breakable parts
- [ ] Verdanthos (Elder boss) — multi-phase fight, monster intro sequence
- [ ] Aerial combat layer — Coral Skyland updraft zones, aerial player physics
- [ ] Insect Glaive aerial mode — vault trigger, aerial moveset
- [ ] Bow aerial advantage — damage bonus, aerial charge levels
- [ ] Monster intro cutscene system (first-encounter only)
- [ ] Field Codex entries unlock on first kill
- [ ] Coral Skyland carved Rift wound scene → unlocks Rift Step ability
- [ ] `GuildStorySystem.gd` — Scene 2 (carved wound) branch dialogue (7 guild variants)

---

## Phase 4 — Guild & Progression (Week 8–9)

Goal: full hub experience, guild rank gates, all NPCs, friendship system live.

- [ ] Guild selection at game start — one-time permanent choice from 7 guilds
- [ ] All Veilwatch NPCs — dialogue system, basic conversations
- [ ] Meal system — Chef Suni, pre-hunt buffs
- [ ] Guild rank system — G1 through G4, rank-up quests
- [ ] Full quest board — hunt quests, gather quests, urgent dispatches
- [ ] Companion AI — guild's junior hunter recruitable at G2
- [ ] Quest fail state — 3 faints, return to hub, no reward
- [ ] `FriendshipSystem.gd` — friendship bars, gain events, personal quests at Lv3, close friend scene at Lv5
- [ ] `GuildStorySystem.gd` — all 3 branch scenes × 7 guilds (21 dialogue resources)
- [ ] Guild Hall Evolution — milestone changes to Veilwatch.tscn (trophy mounts, new NPCs, kitchen upgrade, etc.)
- [ ] Seasonal Events — calendar system, 4 events per year with event-specific board and dialogue

---

## Phase 5 — Content Pass (Week 10–13)

Goal: all 7 biomes, all monsters, full story with Serath relationship system complete.

- [ ] Frosted Peaks + Velkhrath
- [ ] Coral Skyland + Namielle-Keth
- [ ] Volcanic Abyss + Ashmaul (story boss) + Serath journal fragment at Reclamation base
- [ ] Rotten Hollow + Chaoskrel
- [ ] Elder Sky Ruins + Sovereign (final boss, two-phase)
- [ ] Rift Seal unlock scene (Sovereign stirs) → Rift Seal ability wired
- [ ] Full story — Act I through Final Act (Acts I–IV scripted with guild branch variants)
- [ ] Serath relationship system — all 5 discoverable pieces wired across Acts II–IV
- [ ] Three-tier final scene variants (minimal / acknowledged / full) based on serath_knowledge
- [ ] Elder Scholar Voss research questline (Rift Shard lore + annotated document piece)
- [ ] Merchant Athe dialogue branch (npc_memory Serath piece at question threshold)
- [ ] All charm recipes
- [ ] Weapon upgrade trees complete for all 6 weapon types
- [ ] All back-piece items craftable (7 types)

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

~~1. **Rift Shard progression**~~ ✅ **Resolved:** Three abilities unlock via story beats gated by Guild rank (Rift Pulse G1, Rift Step G2, Rift Seal G4). See DESIGN.md and GAMEPLAN.md §15b.

2. **Companion** — Guild's junior hunter is the companion (not just Ryn). Passive AI follower, or player-controlled toggle?

3. **Faint penalty** — lose all collected materials on faint, or just the 3-faint quest limit?

4. **Charm upgrading** — keep charms non-upgradeable (forces exploration) or allow one upgrade per charm?

5. **Post-game loop** — tempered monsters only, or add a Rift incursion system (random hard hunts)? "Other Rift Shards" questline planned — enough?

~~6. **Serath ending**~~ ✅ **Resolved:** Multiple outcomes (3 tiers: minimal / acknowledged / full) based on `serath_knowledge` score (0–5). No dialogue wheel. Depth determined by how much you looked. See DESIGN.md and GAMEPLAN.md §15e.
