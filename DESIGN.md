# Game Design

---

## Player — The Hunter

### Core Stats

All stats are **derived from equipped gear** — the base values are fixed. Gear modifies them.

| Stat | Base | What It Governs |
|---|---|---|
| **HP** | 100 | Health. Reaching 0 = faint, return to camp with penalty |
| **Stamina** | 100 | Sprinting, dodge rolls, charged attacks; regenerates when idle |
| **Strength** | 10 | Melee damage output + stagger buildup on enemies |
| **Agility** | 10 | Move speed + dodge distance + i-frame duration |
| **Vitality** | 10 | Max HP bonus + HP regen rate between engagements |
| **Focus** | 10 | Skill cooldown reduction + critical hit chance |

### Faint System

- Faint = knocked to 0 HP, transported back to the zone entrance camp
- 3 faints per quest = quest failed, no loot
- Fainting loses any temporary buffs (meal bonus, etc.) but not collected materials

### Player Identity — Blank Slate

The Hunter has no name, no backstory, no spoken dialogue. NPCs call you "Hunter," "you," or your guild title. The Rift Shard in your palm is the one personal detail — unusual enough that Voss reacts on sight, specific enough to anchor the story. Everything else is whoever the player imagines.

This is intentional. The world has enough personality that the player doesn't need a character to arrive with it.

### Character Creation

Offered once at the main menu before the first hunt.

**Gender:** Male or Female. Each has a distinct visual identity:
- **Male Hunter** — heavier plate armor, warrior build, dark navy and burnt sienna palette
- **Female Hunter** — lighter leather and cloth scout armor, agile build, tawny and forest green palette

Same moveset, same stats, same story. The difference is entirely aesthetic — and different enough that a second playthrough feels visually fresh.

**Appearance presets (both genders):**

| Option | Choices |
|--------|---------|
| Skin tone | 4 — warm light through deep warm dark |
| Hair style | 4 — short, medium-swept, long, braided |
| Hair color | 4 — near-black, auburn, ash blonde, silver-white |
| Eye color | 3 — warm brown, clear blue, forest green |

No sliders, no full editor. Enough to feel like yours. The Rift Shard is always in the left palm — that never changes.

Guild selection is **not** part of character creation — it happens when you arrive at Veilwatch, after the intro hunt.

---

## Rift Shard — Resonance Abilities

The Rift Shard is a sliver of crystallized Void energy embedded in the player's left palm. It reacts to Rift proximity and Veilborn presence. As the player hunts and explores, attunement deepens and new abilities unlock.

Three abilities. All are in addition to the weapon moveset and gear skills — a separate layer. Voss tracks the progression obsessively and gives informal ability names. The Guild has no official classification.

### Rift Pulse *(unlocks: G1, after first Rift encounter)*

**What it does:** Sends a pulse of Rift energy outward from the palm. All Veilborn within a large radius glow faintly for 20 seconds — visible through walls and terrain. Veilkin caught in the pulse enter a startled alert state (1.5 seconds).

**Use cases:** Scout zone before engaging. Find fleeing Veilkin. Detect hidden spawns. Get the first read on a new monster's patrol path.

**Cooldown:** 45 seconds

**Visual:** Palm illuminates violet-blue, a ring of energy spreads outward at ground level.

*Voss's notes: "The Shard reads Rift signatures the way a compass reads north. Passive attunement — she has been doing this unconsciously since arriving."*

---

### Rift Step *(unlocks: G2, triggered by the carved Rift wound scene in Coral Skyland)*

**What it does:** Blink through Rift-space — teleport 200px in the held direction, passing through enemy hitboxes, projectiles, and terrain.

**What it is NOT:** A dodge replacement. Rift Step has no i-frames, doesn't cancel animations, and doesn't trigger the combo system. It is a repositioning tool.

**Use cases:** Escape a counter window that dodge won't clear. Reposition in aerial combat. Close a gap on a fleeing Veilkin. Pass through environmental hazards.

**Cooldown:** 18 seconds (reduced by `Focus` skill)

**Visual:** The player briefly phases into a translucent void-frame, then reappears. One-frame absence where they were.

*Voss's notes: "She learned to step through it. This is unprecedented in documented Shard carriers. Rescheduling everything. Extraordinary."*

---

### Rift Seal *(unlocks: G4, the moment the Sovereign stirs in the Elder Sky Ruins)*

**Story use:** Channels through the palm to guide the Sovereign back through the Rift membrane. A unique scripted event — not a fight, a negotiation through force of will and Shard attunement. The only thing in the game that interacts directly with the Rift from this side.

**Post-story combat use:** Charge for 2 seconds → release a concentrated beam of Rift energy. Deals high Rift-element damage to a single target and opens a 4-second vulnerability window (all incoming damage ×1.5 against that target).

**Cooldown:** 3 minutes

**Visual:** Palm charges violet-gold, crackling upward along the arm. Beam releases forward, brief sky-flash on impact. Most dramatic animation in the player's kit.

*Voss's notes: "This is what the attunement was building toward. First documented full Rift Seal in three hundred years." — followed by a handwritten addition: "You were magnificent."*

---

## Weapons

Each weapon defines your **moveset and one passive skill**. Swapping weapons changes how you play entirely.

| Weapon | Moveset Style | Passive Skill | Aerial Bonus |
|---|---|---|---|
| **Sword & Shield** | Fast combos, guard counter, mobile | `Counter Edge` — perfect block deals 150% damage | Aerial slash combo (2 hits) |
| **Great Sword** | Slow, charged draw attacks, massive single hits | `True Charge` — full charge ignores 30% defense | Diving plunge on descent |
| **Dual Blades** | Rapid flurry, element application, demon mode | `Elemental Burst` — 10-hit combo triggers elemental explosion | Mid-air spin (3 hits) |
| **Bow** | Ranged, charge levels, arrow coatings | `Aerial Advantage` — 25% bonus damage when airborne | Full aerial freedom, no ground penalty |
| **Insect Glaive** | Vaulting, aerial specialist, extract buffs from monsters | `Kinsect` — sends beetle to harvest monster buffs mid-fight | **Permanent aerial mode unlocked** |
| **Lance** | Shield charge, counter-thrust, immovable defense | `Immovable` — cannot be staggered, reduced knockback | Grounded anchor (aerial penalty: -20% damage) |

---

## Equipment Skill System

No skill tree. Skills come entirely from **equipped gear**.

### How It Works

Each piece of gear has 1–2 skill slots. A skill activates the moment the gear is equipped. Equipping multiple pieces with the **same skill** levels it up:

```
1 piece with [Attack Boost] → Attack Boost Lv1 → +5% damage
2 pieces with [Attack Boost] → Attack Boost Lv2 → +10% damage + crit chance
3 pieces with [Attack Boost] → Attack Boost Lv3 → +18% damage + crit + stagger power
```

### Skill Examples

| Skill | Lv1 | Lv2 | Lv3 |
|---|---|---|---|
| **Attack Boost** | +5% damage | +10% + crit chance | +18% + stagger power |
| **Weakness Exploit** | +10% on weakpoints | +20% + easier breaks | +35% + part break rate up |
| **Evasion Window** | Slightly longer i-frames | Standard i-frames | Extended i-frames on any dodge |
| **Airborne** | +5% aerial damage | +12% aerial damage | +20% + aerial attacks don't cost stamina |
| **Recovery Speed** | Faster green HP regen | Instant green HP regen | Green HP regenerates red HP |
| **Elemental Attack** | +8% element damage | +18% element damage | +30% + status buildup rate |
| **Guard Up** | Block most attacks | Block all attacks | Guard counters always activate |
| **Constitution** | -15% stamina cost | -25% stamina cost | -40% stamina cost |

### Gear Slots

| Slot | Type | Skill Slots | Extra Effect |
|------|------|-------------|-------------|
| **Helm** | Armor | 1 | — |
| **Chest** | Armor | 2 | — |
| **Arms** | Armor | 1 | — |
| **Greaves** (legs/shoes) | Armor | 1 | — |
| **Backpack** | Utility | 1 | Consumable capacity + loadout (see below) |
| **Back-piece** | Mobility | 1 | Movement ability unlocked (see below) |
| **Charm** | Accessory | 1 | Crafted separately, cross-biome materials |
| **Weapon** | Weapon | 1 (passive only) | Moveset + weapon passive skill |

**Total: 9 active skill slots per build.** Mix-sets across armor, backpack, and back-piece are valid and often optimal.

Full set bonus: equipping all 4 **armor pieces** (Helm/Chest/Arms/Greaves) from the same monster grants +1 bonus skill slot. Does not apply to backpack, back-piece, or charm.

### Backpack Slot

The backpack determines two things simultaneously:

**1. Consumable capacity and loadout**

| Backpack Type | Consumable Slots | Max Per Type | Passive Skill |
|--------------|-----------------|-------------|---------------|
| Scout Pack | 3 types | 3 each | `swiftness` |
| Medic Pack | 5 types | 5 each | `recovery_speed` |
| Combat Pack | 3 types | 3 each | `attack_boost` |
| Alchemist Pack | 4 types | 4 each | `elemental_attack` |
| Ironhide Pack | 2 types | 2 each | `guard_up` |

Consumables include: healing potions, stamina draughts, elemental coatings (for Bow), status antidotes, trap components, flash bombs, smoke bombs.

**2. Passive skill** — stacks with armor skills using the same Lv1/Lv2/Lv3 system.

Backpacks are crafted from utility materials (ores, hides, woven biome plants) — not monster boss parts. They upgrade on the same discovery-crafting system.

### Back-piece Slot (Mobility Device)

Any weapon can equip any back-piece. The back-piece grants one active movement ability, usable on a cooldown governed by the `Constitution` skill. It also contributes one passive skill slot.

| Back-piece | Movement Ability | Passive Skill | Crafted From |
|-----------|-----------------|---------------|-------------|
| **Rift Glider** | Glide (fall slowly, steer horizontally) | `airborne` | Glacewing membrane + Rift crystal |
| **Grapple Anchor** | Fire hook to monster — pull yourself to it | `weakness_exploit` | Thornmane thorns + iron chain |
| **Rift Burst Pack** | Short vertical burst jump, then fall | `evasion_window` | Rift Shard fragment + ore |
| **Sky Membrane** | Full slowfall + one horizontal air dash | `airborne` | Namielle-Keth wing cloth |
| **Volcanic Thruster** | Ground dash burst (faster than dodge, no i-frames) | `constitution` | Ashmaul plate + ember ore |
| **Shadow Step** | Short-range blink teleport (bypasses melee counter range) | `evasion_window` | Chaoskrel tendril + void crystal |
| **Aethori Flight Harness** | Sustained flight for 8 seconds before cooldown | `airborne` | Aethori War-Wyvern parts |

Back-pieces do **not** grant the aerial moveset of the Insect Glaive — they grant aerial access only. A Great Sword player with a Rift Glider can glide and perform aerial light/heavy, but not the Glaive's vault combo. Aerial specialists still benefit from Insect Glaive, but aerial access is no longer locked to it.

Back-piece cooldown: 12 seconds base, reduced by `Constitution` skill level.

---

## Biomes

Seven biomes, unlocked sequentially through Guild rank progression.

### 1. Ancient Canopy (G1)
Dense jungle canopy, shafts of god-ray light through leaves. Ground level, mid-level branches, and a high canopy aerial zone. Rain cycles reduce visibility and muffle sound — monsters are harder to detect.

- **Unique mechanic**: Vine traversal — grab vines to swing between platforms, reach higher zones
- **Veilkin**: Moss Crawlers, Canopy Gliders
- **Riftborn (mid-boss)**: Thornmane — territorial quadruped, charges and tail-sweeps
- **Elder (boss)**: Verdanthos — ancient serpentine Elder that controls the canopy itself, vine grabs and spore explosions

### 2. Wildspire Waste (G1)
Desert surface that transitions into swamp lowlands. Flash floods reshape terrain. High heat in desert, toxic miasma in swamp.

- **Unique mechanic**: Flash floods — water rises in low areas every 5 minutes, forcing repositioning
- **Veilkin**: Sand Skitters, Mudgrubs
- **Riftborn (mid-boss)**: Barreltusk — rhino-type, charges in straight lines, breaks terrain
- **Elder (boss)**: Diablorak — massive horned Elder, burrows underground, charges from below

### 3. Frosted Peaks (G2)
Blizzard-swept mountain range, ice caves, frozen waterfalls. Slick ground reduces traction. Blizzard cycles drop visibility to near zero.

- **Unique mechanic**: Ice footing — sprinting on ice causes slides; some puzzles require this
- **Veilkin**: Frost Leeches, Ice Howlers
- **Riftborn (mid-boss)**: Glacewing — flying ice creature, ground frost zones, wind gusts
- **Elder (boss)**: Velkhrath — enormous mammoth-type Elder, creates blizzards, ice pillars

### 4. Coral Skyland (G2)
Floating coral islands connected by wind currents, ocean far below. Updrafts between islands launch players into aerial zones. Colorful, alive, visually unlike any other biome.

- **Unique mechanic**: Updrafts — natural wind columns launch you into aerial combat automatically
- **Veilkin**: Sky Rays, Drift Crabs
- **Riftborn (mid-boss)**: Mizuwing — water-air hybrid, creates rain zones, lightning strikes
- **Elder (boss)**: Namielle-Keth — bioluminescent flying Elder, floods platforms, electricity arcs

### 5. Volcanic Abyss (G3)
Deep volcanic caldera, lava rivers, ash clouds, superheated air pockets. Lava zones damage over time. Ash reduces stamina regen.

- **Unique mechanic**: Heat zones — armor with fire resistance reduces damage; fire resistance skill is near-required
- **Veilkin**: Ash Beetles, Ember Hounds
- **Riftborn (mid-boss)**: Ignadrake — fire-breathing drake, lava surf attack
- **Elder (boss)**: Ashmaul — the largest documented living Veilborn, sustained by Reclamation feeding, lava pools, tremor slams (story-critical)

### 6. Rotten Hollow (G3)
Deep underground decay zone, bioluminescent fungi, poison swamps, narrow tunnels. Permanent low light. Poison status is constant environmental threat.

- **Unique mechanic**: Darkness — areas of true dark; bioluminescent materials light the way, some monsters use darkness to ambush
- **Veilkin**: Rot Grubs, Hollow Crawlers
- **Riftborn (mid-boss)**: Venomfang — spider-type, webs block paths, poison spit
- **Elder (boss)**: Chaoskrel — long-dormant deep Elder, multiple phases, never before documented (first-contact fight)

### 7. Elder Sky Ruins (G4)
The ruins of the Aethori Sky Kingdom, still floating above the clouds. Permanent aerial zone — no ground floor. Ancient mechanisms still partially function. Crystal spires humming after three centuries. The most extraordinary biome.

- **Unique mechanic**: Partial gravity — lower gravity throughout, all characters move with more arc. Some platforms drift.
- **Veilkin**: Ruin Sprites, Sky Phantoms
- **Riftborn (mid-boss)**: Aethori War-Wyvern — mechanical-biological hybrid, remnant of the Sky Kingdom's weapons
- **Elder (boss)**: Serath + Sovereign (story boss) — two-phase fight, see LORE.md

---

## Monster System

### AI State Machine

```
Idle → Patrol → Alert → Investigate → Attack → Enrage (below 30% HP) → Flee (Veilkin only)
```

- **Idle**: Wanders home territory
- **Patrol**: Follows fixed route, pauses to sniff/scan
- **Alert**: Player detected, approaches cautiously
- **Investigate**: Lost sight of player, searches last known position
- **Attack**: Full combat engagement
- **Enrage**: Visual change (glow, color shift), faster attacks, new moves unlocked
- **Flee**: Veilkin only — retreats to nest, can be tracked for ambush loot

### Monster Intro Sequence

On **first encounter only**, a monster triggers its intro:
1. Music cuts to silence
2. Camera pans to monster, slow zoom
3. Monster performs signature animation (roar, wing spread, etc.)
4. Camera snaps back to player
5. Combat music starts
6. Monster name displayed on screen (Field Codex entry unlocked)

### Drop System

| Source | Drop Rate | Materials |
|---|---|---|
| Veilkin kill | Always 2–4 | Common biome materials |
| Riftborn kill | 1–2 guaranteed | Uncommon parts + chance at rare |
| Riftborn first kill | 1 guaranteed rare | Unique rare material |
| Elder kill | 1 guaranteed + 1 chance | Rare + chance at Elder-unique |
| Elder carve (3 carves) | Each carve = 1 roll | Varied — rare materials more common here |
| Broken part bonus | On part destruction | Part-specific material (tail, wing, etc.) |

---

## Monster Pattern System

### Design Principle

Combat is a knowledge game, not a reaction game. Every monster has a fixed, learnable attack pattern. A player who understands the pattern can clear a fight with no faints. A player who goes in without knowledge will fail consistently — not because of bad luck, but because the pattern is punishing in predictable, avoidable ways.

There is no randomness in monster move selection. Monsters choose attacks based on **state conditions**: distance to player, player's last action, monster HP, and internal cooldown timers. The same conditions always produce the same result. This means death is never unfair — it is always information.

### Pattern Structure

Each monster has:
- **2–4 attacks**, each with a distinct wind-up tell
- **1–2 counter-attack windows** (close range triggers) — see Combat System
- **State transitions** that change available moves (enrage unlocks new attacks, doesn't replace old ones)
- **Openings** — specific frames after certain attacks where the monster is fully vulnerable

Example — Thornmane full pattern:

```
If player is CLOSE (< 70px) and monster just took a hit:
  → Tail Sweep (purple flash wind-up, 24 frames)
    → Opening: 18 frames after tail sweep if it misses

If player is MID RANGE (70–200px):
  → Charge Windup (crouch + orange flash, 33 frames)
    → Charge lasts 0.55s
    → Opening: 22 frames immediately after charge ends (regardless of hit)

If player is FAR (> 200px) and monster is enraged:
  → Thorn Launch (new enrage move — fires 3 projectile thorns, no melee wind-up)
    → No melee counter window, but projectiles can be dodged through

Idle conditions (no attack):
  → If player outside aggro range: patrol
  → If player just dodged through an attack: 1.2s reset before next attack
```

This means a skilled player learns: dodge the charge → punish immediately → back off before Tail Sweep triggers → repeat. The loop is clear, consistent, and satisfying to master.

### Codex Pattern Learning

The Field Codex entry for each monster fills in progressively based on hunt experience:

| Milestone | Codex Info Unlocked |
|-----------|-------------------|
| First sighting | Name, biome, tier |
| First hit landed | Weakpoint locations highlighted on diagram |
| First death (or 1 completed hunt) | Attack names listed |
| 3 hunts total | Wind-up descriptions ("orange flash on shoulders before charge") |
| 5 hunts total | Timing notes ("18-frame opening after failed tail sweep") |
| Part break achieved | That part's function in the pattern noted |
| Elder Scholar Voss consulted | One free full-pattern hint per monster |

The Codex does not hand the player the answers immediately — it rewards engagement. A player who dies repeatedly learns faster than one who avoids a monster entirely.

### Environmental Tells

Beyond wind-up animations, the environment communicates monster state:

- **Sound**: Thornmane growls low before a charge. Velkhrath's exhale mist thickens before a stomp. Chaoskrel goes silent before a tentacle reach.
- **Particles**: Dust rises under Thornmane's feet when charging. Ice crystals shed off Velkhrath during blizzard windup.
- **Music**: Combat music tempo increases when monster enters a combo chain. Returns to base tempo during monster's reset window.

Players who turn off music and watch carefully can read patterns faster. Players who fight with audio get the musical cues as a secondary layer.

### Difficulty Philosophy

**No stat wall** — a player at G1 gear can theoretically defeat a G3 monster if they understand the pattern perfectly. Gear makes it more forgiving, not more possible.

**Death teaches** — the first encounter with any monster should result in at least one faint for most players. This is expected and intentional. The game is telling you: watch, learn, return.

**Headlong yolo fails consistently** — monsters are tuned so that three consecutive random attacks, all connected, exhaust roughly 60–70% of base HP. A player who doesn't dodge will exhaust three faints in under two minutes. A player who dodges correctly can fight indefinitely.

**No softlocks** — if a player is genuinely stuck on a monster, Ryn (companion NPC, G2) can be recruited. Ryn is a competent fighter who also draws some aggro. The fight becomes easier, but Ryn is never strong enough to carry it alone.

The camera responds to the space between player and monster:

| Situation | Zoom Level | Feel |
|-----------|-----------|------|
| No enemy nearby | Wide (0.6×) | Exploration mode, see the biome |
| Enemy at mid range | Normal (1.0×) | Standard combat framing |
| Melee engaged (<80px) | Close (1.3×) | Tension, monster fills screen |
| Boss intro / cinematic | Scripted | Pulls out dramatically, then snaps back |

Camera tween is smooth — it never cuts, always lerps. This makes the choice between melee and ranged feel physical: ranged players live in the wide view, melee players voluntarily push into the close view where the monster is bigger and counters are harder to read.

### Ground Combat

- 2.5D side-scrolling, free horizontal + vertical movement within each arena zone
- WASD movement (or arrow keys)
- Multiple attack inputs per weapon (see Combo System below)
- Dodge roll with i-frames (Agility stat affects duration)
- Stamina governs sprinting, charging, dodge frequency
- Hitboxes: capsule-based, per-limb on larger monsters
- Damage numbers float above target on hit
- White flash frame (2 frames) on hit — anime impact feel
- Screen shake scales with damage magnitude

### Melee vs. Ranged Tradeoff

Melee and ranged are not balanced identically — they offer a genuine tradeoff:

| | Melee | Ranged (Bow) |
|--|-------|------|
| Damage | Higher base, scales with Strength | Lower base, scales with Focus |
| Risk | Recovery frames after every attack | No recovery frames |
| Monster response | Monsters have close-range counter windows | No counter window triggered |
| Positioning | Must close distance | Must maintain distance |
| Best against | Slow monsters, staggered enemies | Fast monsters, aerial phases |

**Recovery frames (player-side risk):**
After every melee attack, the player has a brief window (varies by weapon — Great Sword longest, Dual Blades shortest) where dodge input is buffered but not active. Attacking into a monster's counter-attack wind-up during this window means the player takes the hit. This is the core skill expression for melee: learning when to commit and when to wait.

**Counter-attack windows (monster-side risk):**
Every monster has 1–2 specific attacks that are designed to punish close-range presence. These are telegraphed — a visible wind-up animation or color flash — but the window is short. Players who learn a monster's moveset can bait counters and dodge through them; players who button-mash get punished consistently.

Examples:
- Thornmane: tail sweep triggers when player is within 60px and just landed a hit — brief purple flash warns it
- Verdanthos: vine grab specifically tracks close-range players; cannot grab from outside 120px
- Velkhrath: stomp radius is close-range only; staying at mid range is safe

Neither risk is unavoidable — both reward knowledge and mastery over pure reaction speed.

### Combo System — Multiple Moves Per Weapon

No single "correct" button sequence. Each weapon has a moveset tree:

```
Light × 1           → quick single hit
Light × 2           → 2-hit combo
Light × 3           → 3-hit finisher (weapon-specific animation)
Heavy (tap)         → overhead strike, moderate charge
Heavy (hold 0.4s)   → charged strike, high damage
Heavy (hold 1.0s)   → full charge, max damage + special effect
Dodge → Light       → dash attack (momentum-based, different hitbox)
Airborne → Light    → aerial strike (different angle, knockdown on grounded enemies)
Airborne → Heavy    → aerial smash (slam down, AoE on landing)
```

Context-sensitive moves unlock as the player explores combinations — the game does not tell you all inputs upfront. The Codex tracks discovered combos.

### Build Diversity — No Single Right Answer

Monsters have no hard counters. Multiple valid strategies exist for each encounter:

- A Bow player who understands Thornmane's aggro range can kite and deal consistent damage
- A Great Sword player who knows the counter window can charge between attacks for massive hits
- A Dual Blades player with Elemental Burst can proc status effects to stagger cycles
- An Insect Glaive player can stay aerial and avoid the counter window entirely

Gear builds follow the same principle — mixed sets are often as strong as full sets because skill stacking creates different ability combinations. The "optimal" build is whatever the player has discovered and practiced.

### Aerial Combat

Triggered by:
- Entering an updraft zone
- Insect Glaive vault (any time)
- Flying monster lifting off (follow or fall behind)
- Aerial zone biomes (Elder Sky Ruins — permanent)

Aerial rules:
- Reduced gravity, floatier movement
- Bow and Insect Glaive have full advantage
- Great Sword and Dual Blades retain most damage
- Lance takes -20% damage (grounded weapon, off-element)
- Aerial attacks have hit stun on monsters — keeps them in the air longer
- Falling monsters slam ground on knockdown — AOE shockwave

### Monster Weakpoints & Elements

Every monster has:
- 2–3 **weakpoints** (hitbox areas with multiplied damage)
- **Elemental weakness** (one element deals +50%, one deals -25%)
- **Breakable parts** (destroy them mid-fight for bonus materials and visual change)

Elements: Fire, Ice, Thunder, Water, Dragon (Rift-type), Poison (status), Sleep (status), Paralysis (status)

---

## Crafting System

Crafting happens at the **Blacksmith in Veilwatch** (and at field camps for consumables only). No weapon or armor crafting in the field — returning to hub stays meaningful.

### Discovery-Based Crafting

There is no recipe book handed to the player. Recipes are discovered through:

**1. Free experimentation**
The crafting grid accepts any combination of materials. Results:

| Outcome | What Happens | What Player Gets |
|---------|-------------|-----------------|
| **Success** | Valid recipe found | Item crafted + recipe saved to personal Codex |
| **Partial** | Close but not right | Weak version of item OR hint fragment saved: `Thornmane Fang + ? + ?` |
| **Failure** | No valid recipe | Materials fuse into **Fused Scrap** — itself a crafting component |

Partial hints accumulate in the Codex. The more partial attempts near a recipe, the more `?` slots fill in. Doram will offer one free hint per hunt for materials he's seen you bring back.

**2. World hints**
Discoveries in the field provide partial recipes without giving the full answer:
- Monster drops: `Worn Schematic` (dropped by Riftborn on first kill) — partial recipe fragment
- Environment: `Ancient Inscription` on biome walls — sometimes a material name, sometimes a pairing
- NPC dialogue: Doram, Voss, and Athe all drop recipe hints in conversation as guild rank increases

**3. Quality tiers from the same recipe**
The same recipe with higher-quality materials produces a better output:

```
Thornmane Fang (common) + Iron Plate + Canopy Vine
  → Thornmane Sword  [base stats, 1 skill slot]

Thornmane Fang (fine) + Refined Plate + Woven Vine
  → Thornmane Sword  [+12% damage, 1 skill slot]

Thornmane Fang (perfect) + Tempered Plate + Elder Vine
  → Thornmane Sword  [+28% damage, 2 skill slots]
```

Quality tier of the output is always the lowest-quality material used. Farming for quality is the endgame grind — not farming for a new recipe, but farming for perfect materials to maximize a known recipe.

### No Useless Loot

Every material has at least two uses. Common materials are not vendor trash:

| Material Type | Primary Use | Secondary Use | Tertiary Use |
|--------------|-------------|---------------|-------------|
| Common (Canopy Vine) | Crafting component | Consumable ingredient (Canopy Stew) | Upgrade filler (reinforce existing gear) |
| Uncommon (Thornmane Fang) | Weapon crafting | Charm ingredient | Trade value at Merchant Athe |
| Rare (Thornmane Plate) | Armor crafting | High-tier consumable | Unique recipe component |
| **Fused Scrap** (failed craft) | Specific unique recipes | Reinforce cheap gear | Trade — Athe pays well for it |
| Fine/Perfect quality variants | Upgrade same recipe to better tier | Charm slot upgrade | — |

The Merchant Athe always buys everything — but at poor rates. Selling is always the last resort, not the default.

### Weapon Trees

Trees still exist as a framework, but the player discovers each node through experimentation or hints rather than seeing the full tree upfront. Doram shows the tree only for recipes the player has already discovered.

```
Iron Sword (starter — given)
  └→ Thornmane Sword         [discover by experimenting with Thornmane materials]
       ├→ Thornmane Sword+   [Thornmane Plate × 1 — rare drop, hint from Voss]
       └→ Hunter's Edge      [Thornmane Fang + Canopy Vine fine quality — alternate branch]
            └→ Verdanthos Blade  [Elder material — Voss gives schematic on G1 clear]
```

### Armor

- Each monster has a full armor set (Head, Chest, Arms, Legs)
- Individual pieces can be crafted — full set not required
- Full set bonus: all 4 pieces from same monster = one extra skill slot (charm still separate)
- Mixed sets are often better than full sets for skill diversity

### Charm Crafting

- Charms require materials from **multiple biomes** — encourages full exploration
- One charm slot per build
- Charms are not upgradeable — craft a better one with better materials
- Charm recipes are among the hardest to discover — require cross-biome material combinations that only show up as hints in late-game NPC dialogue

### Material Drop Design

Goal: a full weapon + armor set in 3–5 hunts. Grind is for quality, not just availability.

| Material Tier | Drop Rate | Quality Distribution |
|---|---|---|
| Common | 80–100% | 70% base, 25% fine, 5% perfect |
| Uncommon | 50–65% | 80% base, 18% fine, 2% perfect |
| Rare | 25–35% | 90% base, 9% fine, 1% perfect |
| Ultra-rare (charm) | 10–15% (guaranteed first kill) | Always base quality — no upgrades |

Loot also varies by **kill condition**:
- Enraged kill: higher chance of fine/perfect quality on rare drops
- Part break bonus: always drops the part-specific material at base+ quality
- Carve (3 post-kill carves): higher quality variance than kill drops
- First kill: always drops one rare at guaranteed base quality minimum

---

## Game Feel & Tone

Rift Hunter feels like a world that is **happy you're in it**.

Veilwatch is a town that gets better as you play. NPCs have opinions, moods, and things they're genuinely excited about. A new biome opening is a community event. A first kill on a new species gets noted and celebrated. Fainting in the field is never shameful — it's a learning moment, and someone at the hall always has something kind to say when you get back.

Hunts are hard — the Monster Hunter pattern-learning DNA is fully intact — but the world around hunts is warm and alive. The contrast is the point: the field is a challenge you choose, and the guild is the place you come home to.

**Visual tone:** Vibrant, saturated environments. Monsters are spectacular to look at, not grotesque. Biomes feel like places worth exploring. Each new zone should make the player think "I want to see what's in there."

**Dialogue tone:** Warm, direct, personality-first. NPCs say what they actually think. Nobody is cryptic for the sake of atmosphere. Light humor throughout. Nobody suffers quietly — if an NPC is going through something, it becomes a friendship quest, not background gloom.

**Pacing tone:** The hunt is the event. Everything else is the community life between events. Both should feel good — not one as setup for the other.

---

## Guild Hub — Veilwatch

Veilwatch is a town, not a menu. Six guild halls line the main street, each with its own personality, board, and bar. Shared infrastructure (Blacksmith, Chef Suni, Scholar Voss, Merchant Athe) sits in the central district. Players belong to one guild — their guild hall grows with them.

### Guild Selection

Offered once at game start, after the intro hunt. Cannot be changed (one guild per playthrough). Each guild leader gives a brief pitch when you arrive. The choice is permanent and meaningful — guild NPCs remember you, and the hall evolves around your progress.

The Voidwalkers are not offered at start — they approach the player at G3.

### Shared Veilwatch NPCs (all guilds use these)

| NPC | Role | Dialogue Style |
|---|---|---|
| **Yela — Central Receptionist** | Guild rank advancement, dispatches, cross-guild news | Warm, knows everyone by name, genuinely happy to see you |
| **Chef Suni** | Pre-hunt meals, timed buffs | Enthusiastic, every meal is a ceremony, remembers your favorites |
| **Elder Scholar Voss** | Field Codex, lore, Rift research | Gentle, patient, delighted when you bring back something new |
| **Merchant Athe** | Buys materials, sells components | Chatty, always has town gossip, great memory for prices |

### Guild-Specific NPCs (3–4 per guild)

Each guild has its own leader, a junior hunter (the player's closest companion), a specialist, and a wildcard. Relationships deepen through play — not gifting mechanics, just showing up, going on hunts, and talking to people.

| Guild | Leader | Close Companion | Specialist |
|-------|--------|----------------|-----------|
| Veilwatch Wardens | Commander Aldis | Fen (thoughtful, asks good questions) | Sora (Codex obsessive, excited by everything) |
| Crimson Claw | Karas | Brix (loudly enthusiastic, unreservedly supportive) | Nem (trap and coating nerd) |
| Ironveil Crafters | Master Doram | Lira (obsessed with rare materials, will talk your ear off) | Cael (ancient weapon historian) |
| Skyborn | Elder Vyn | Tae (half-Aethori, figuring out what that means) | Ova (back-piece engineer, brilliant, scattered) |
| Hollowroot Lodge | Wren | Pip (youngest hunter, incredibly sharp naturalist) | Holt (herb and poison specialist, calm as anything) |
| Ember Pact | Ignas | Ryn (yes, that Ryn — she's Ember Pact, she's great) | Hessa (volcanic materials expert, dry humor) |
| Voidwalkers | Sable | — | Mira (Rift energy analyst, quiet, observant) |

---

## Friendship System

Relationships with NPCs deepen naturally through play — no gifting required, no daily schedule to maintain. Just be there, hunt, talk, and follow through on quests.

### How Friendship Builds

Each key NPC has a **friendship bar** (5 levels, shown as small icons next to their name). It fills through:

- **Talking to them** after returning from a hunt — they comment on what you did, you respond
- **Completing their quests** — each NPC posts 1–2 personal quest lines on the board over the course of the game
- **Hitting rank milestones** they care about (Brix lights up when you reach G2; Wren sends a field note when you clear a new biome)
- **Clearing hunts they posted** on the shared board — they notice and say something

### Friendship Levels

| Level | Unlock |
|-------|--------|
| ★☆☆☆☆ | Basic greeting, functional dialogue |
| ★★☆☆☆ | Extended conversation options, small hints |
| ★★★☆☆ | Personal story quest unlocks |
| ★★★★☆ | Exclusive dialogue, recurring check-ins when you return from hunts |
| ★★★★★ | Close Friend — unique scene, a keepsake item for the guild hall, one exclusive crafting hint |

### Companion in the Field

Your guild's close companion NPC (the junior hunter) can join you on hunts from G2 onward — opt-in, always. They fight competently, draw some aggro, and have different field dialogue depending on the monster and biome. They never carry the fight, but they make it warmer and slightly more forgiving. After hunts they debrief with you, and that conversation fills friendship progress too.

---

## Guild Hall Evolution

The guild hall starts modest. It grows as you do.

This is not a personal room — it's a shared space that reflects the whole guild's progress, with your contributions visible in it. Every rank-up and major quest milestone physically changes the hall.

| Progress | What Changes |
|----------|-------------|
| **Arrive (G1)** | Basic hall — quest board, a few tables, your bunk in the back |
| **First biome clear** | A trophy mount goes up on the wall (first-kill trophy, your name on the plaque) |
| **G2 rank** | A new NPC joins the hall. The kitchen gets an upgrade. Suni starts offering a new meal. |
| **Second biome clear** | Outdoor notice board added. Other hunters from town start hanging around. |
| **G3 rank** | Hall gets a dedicated lounge area. Trophy wall expands. A framed Field Codex page goes up. |
| **Ashmaul hunt** | The Ashmaul trophy is enormous. The hall rearranges slightly to fit it. Everyone has opinions. |
| **G4 rank** | The hall becomes a Veilwatch landmark. A mural goes up. The bar gets better drinks. |
| **Elder Rank** | Full hall — every facility, every NPC present, warm and lively. This is home. |

New NPCs who show up as the hall grows have their own friendship bars and small story arcs. The hall never stops having someone new to talk to.

### Biome Unlock Events

When a gatekeeper boss falls for the first time, the whole guild reacts when you walk back in:

- **Crimson Claw:** Immediate noise. Someone starts a pool on who gets the first G2/G3 kill. Karas already has a time to beat in mind.
- **Hollowroot Lodge:** Pip is already packing field gear. Wren has a list of species she expects to find.
- **Skyborn:** If it's an aerial biome, Vyn holds a short ceremony. It's sincere. Everyone attends.
- **Ironveil Crafters:** Lira has material theories. Doram is already calculating what new recipes might open.
- **Ember Pact:** Quiet toasts. They've done this before. They're genuinely, warmly happy.
- **Wardens:** The board updates. Aldis signs a new zone log. Fen pins a note about Rift patterns to monitor.

These are ambient dialogue events, not cutscenes — the guild hall is different when you walk in, and people react to what you did specifically.

---

## Seasonal Events

Veilwatch runs on a calendar. Four events per year, each lasting about a week of in-game time. Events happen regardless of story progress — the town keeps living whether you're on the main quest or not.

### The Migration Festival *(Spring)*

The season the Veilkin migration routes open up. The Hollowroot Lodge coordinates field documentation teams and posts a stack of rare observation contracts. Special reward: a unique Codex entry that only unlocks during migration season, plus a festival meal buff from Suni that lasts the whole week.

Mood: busy, excited, academic. Pip is running everywhere.

### Guild Championship *(Summer)*

Organized by the Crimson Claw every year. Speed-run tournament: fastest clear time on a designated hunt wins. Open to all guilds — competing against each other cross-faction is half the fun. Prizes are seasonal gear cosmetics and a spot on the Championship board in the Crimson Claw hall (visible all year).

Mood: loud, competitive, good-natured. Brix will not stop talking about his strategy.

### Codex Week *(Autumn)*

The Field Codex's annual documentation push. Every completed Codex page during the week earns bonus materials. Voss picks one mystery species per year — a creature with incomplete data — and posts a field contract to fill in the gaps. Completing it earns a unique charm component only available this week.

Mood: focused, curious, a little nerdy. Voss has a very good week.

### Ember Night *(Winter)*

Ember Pact tradition, now adopted by the whole town. A bonfire in the central square, Suni's warmest meal buff of the year (full week duration, +1 faint). Guild members share hunt stories — the tall tales get taller as the night goes on. NPCs who you've reached ★★★★☆ with will share something personal.

Mood: warm, slow, the best kind of tired. Ignas makes a short speech. It is sincere and not long.

### Meals (Pre-Hunt Buffs)

Each meal provides one 30-minute buff. Buff depends on meal type:

| Meal | Buff |
|---|---|
| Canopy Stew | +15 max HP for hunt |
| Ember Roast | +10% fire resistance + attack |
| Ice Broth | Stamina costs -20% |
| Storm Broth | +15% thunder damage |
| Rift Soup | +1 faint allowed (4 total) |

---

## Progression Path

```
Arrive at Veilwatch (G1)
  → Hunt Ancient Canopy + Wildspire Waste
  → Craft biome 1-2 gear
  → Rank up to G2

G2 — Frosted Peaks + Coral Skyland
  → New monster set, new skills unlocked via gear
  → Rank up to G3

G3 — Volcanic Abyss + Rotten Hollow
  → Story accelerates, the Reclamation's plan comes into focus
  → Rank up to G4

G4 — Elder Sky Ruins
  → Story climax, Sovereign encounter
  → Elder Rank unlocked post-story

Elder Rank — Post-story content
  → Tempered variants (harder versions of all monsters)
  → New material tier, endgame gear
  → The other Rift Shards questline
```

---

## Guild Story Branches

The main story beats are the same regardless of guild. What changes is the *angle* — who tells you what, who noticed first, who was already worried, and what your people do when things escalate. Each guild gives you a different version of the same truth.

These are short scene variations (different NPC dialogue, different ambient context) — not full quest rewrites.

### The Three Key Divergence Points

**Scene 1 — "Something's wrong" (Act I, Ancient Canopy)**

The moment the player notices the Rift shouldn't exist. Each guild has a different reason for knowing:

| Guild | How they flag it |
|-------|-----------------|
| Wardens | Yela flags it via Rift monitor data. Aldis posts an investigation contract before you finish the hunt. |
| Crimson Claw | Brix bet on a kill time and the monster was in the wrong zone entirely. Karas pins the location as a personal contract. |
| Ironveil Crafters | Lira notices the drop materials don't match any known biome origin. Doram posts a research contract. |
| Skyborn | Tae felt the updraft patterns shift a week before the Rift opened. Vyn had already filed a report. |
| Hollowroot Lodge | Wren's field team documented the Veilkin displacement three days before the Rift opened. They have the data. |
| Ember Pact | Ryn noticed the new spawn from field experience. Ignas posts a scouting contract quietly, without announcing why. |
| Voidwalkers | They knew before anyone and said nothing. They'll tell you why when you reach G3. |

---

**Scene 2 — The Carved Wound (Act II, Coral Skyland)**

When the player finds the artificially cut Rift tear:

| Guild | Their read |
|-------|-----------|
| Wardens | Sora cross-references natural Rift formation patterns — this doesn't match. Aldis authorizes an investigation above standard rank. |
| Crimson Claw | Brix is angry. Someone's using the biome as a distraction. Karas is already mapping movement patterns. |
| Ironveil Crafters | Doram examines the tool marks — ancient carving technique, but the tools were modified modern Aethori artifacts. Someone planned this. |
| Skyborn | Elder Vyn recognizes the carving style immediately. Aethori sky-script — a door marker. Her tone shifts. |
| Hollowroot Lodge | Pip documents everything. Wren sends you a private note: "Don't tell the other guilds yet. Let's find out more first." |
| Ember Pact | Hessa has seen these marks near the Volcanic Abyss. Ignas, direct: "This changes the job." |
| Voidwalkers | Sable says nothing unusual. But their operative was already at the location an hour before you arrived. |

---

**Scene 3 — The Reclamation Revealed (Act III)**

When it becomes clear who's behind the disruptions:

| Guild | Their reaction |
|-------|---------------|
| Wardens | Aldis activates the full Rift monitoring network. Emergency status. |
| Crimson Claw | Karas considers filing a counter-challenge against the Reclamation, seriously. Brix talks her down. |
| Ironveil Crafters | Doram has heard of Serath. Has notes. Says carefully: "They're after the archives." |
| Skyborn | Vyn goes quiet. At high friendship, she tells you: Serath approached the Skyborn once, years ago. They declined. |
| Hollowroot Lodge | Wren has been tracking Reclamation field operatives for months without connecting them. Quietly furious at herself. |
| Ember Pact | Ignas knew — not everything, but enough. He'll tell you over a drink if you've built the friendship. "The Abyss shows you things." |
| Voidwalkers | Sable: "We've been watching Serath for longer than Veilwatch has had a wall." This is the moment they fully bring you in. |

---

## Serath Relationship Tracking

How the final confrontation scene plays out depends on how much of Serath's story you found. There is no choice, no dialogue wheel — just depth determined by whether you looked.

### The Five Discoverable Pieces

| # | What | Where | Notes |
|---|------|-------|-------|
| 1 | **Three Letters** | Sky Ruins archives — scattered across Act IV exploration | Written across two centuries: grief → purpose → certainty |
| 2 | **NPC Memory** | Merchant Athe — triggered if you ask enough questions about their older customers | "Someone old" becomes a description, becomes a name |
| 3 | **The Journal Fragment** | Reclamation base in the Volcanic Abyss | Operational notes with one personal entry: what Serath remembers about the Sundering |
| 4 | **Annotated Document** | Scholar Voss has a partial copy; Serath's copy is in the Ruins archives | Ancient Aethori sky-kingdom record, Serath's margin notes across two centuries |
| 5 | **The Approach** | Before the final confrontation — walk toward Serath rather than attack | Requires 3+ other pieces to unlock the full exchange. Serath speaks first. |

`serath_knowledge` score tracked in `GameState`. Each discovery = +1. Score gates the final scene.

### Final Scene Variations

**Score 0–1 — Minimal**
Serath helps because their plan collapsed and they need you. Professional. Efficient. They leave through the Rift when it's done. Brief.

**Score 2–3 — Acknowledged**
Serath mentions you found their letters (or journal, whichever triggered). Brief — a sentence of surprise, not displeasure. Something like relief that someone knows the real story. They leave, and turn back once.

**Score 4–5 — Full**
Serath talks about what sixty years building toward something feels like when it doesn't land. The help they give is genuine, not calculated. They ask what you'll do with the Codex entry. They leave.

After, Voss reads one of Serath's margin annotations aloud — the one from the annotated document, written when Serath was a hundred and fifty years old. It ends the game.

*The scene doesn't change the outcome. It changes how much it meant.*
