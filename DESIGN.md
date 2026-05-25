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
- **Elder (boss)**: Ashmaul — massive Elder grown enormous by Cult feeding, lava pools, tremor slams (story-relevant)

### 6. Rotten Hollow (G3)
Deep underground decay zone, bioluminescent fungi, poison swamps, narrow tunnels. Permanent low light. Poison status is constant environmental threat.

- **Unique mechanic**: Darkness — areas of true dark; bioluminescent materials light the way, some monsters use darkness to ambush
- **Veilkin**: Rot Grubs, Hollow Crawlers
- **Riftborn (mid-boss)**: Venomfang — spider-type, webs block paths, poison spit
- **Elder (boss)**: Chaoskrel — long-dormant deep Elder, multiple phases, tentacle reach, Rift energy corruption

### 7. Elder Sky Ruins (G4)
The ruins of the Aethori Sky Kingdom, still floating above the clouds. Permanent aerial zone — no ground floor. Ancient mechanisms still partially function. Most dangerous biome.

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

## Guild Hub — Veilwatch

Veilwatch is a town, not a menu. Six guild halls line the main street, each with its own personality, board, and bar. Shared infrastructure (Blacksmith, Chef Suni, Scholar Voss, Merchant Athe) sits in the central district. Players belong to one guild — their room is there, their name is on that board.

### Guild Selection

Offered once at game start, after the intro hunt. Cannot be changed (one guild per playthrough). Each guild leader gives a brief pitch when you arrive. The choice is permanent and meaningful — guild NPCs remember you, their story arc unfolds around your presence.

The Voidwalkers are not offered at start — they approach the player at G3.

### Shared Veilwatch NPCs (all guilds use these)

| NPC | Role | Dialogue Style |
|---|---|---|
| **Yela — Central Receptionist** | Guild rank advancement, urgent dispatches, cross-guild news | Warm, professional, knows everyone, quietly worried |
| **Chef Suni** | Pre-hunt meals, timed buffs | Enthusiastic, every meal is a ceremony |
| **Elder Scholar Voss** | Field Codex, lore, Rift research | Ancient, calm, knows more than he says |
| **Merchant Athe** | Buys materials, sells components | Cheerful opportunist, hints at Cult activity |

### Guild-Specific NPCs (3–4 per guild)

Each guild has its own leader, a junior hunter (story companion), a crafting specialist, and one wildcard NPC. Relationships build through quests and conversation — high relationship unlocks personal quests, unique dialogue, and crafting hints.

| Guild | Leader | Junior Hunter | Specialist |
|-------|--------|--------------|-----------|
| Veilwatch Wardens | Commander Aldis | Fen (cautious, thoughtful) | Sora (Codex researcher) |
| Crimson Claw | Karas | Brix (competitive, loudly supportive) | Nem (trap and coating expert) |
| Ironveil Crafters | Master Doram | Lira (obsessed with rare materials) | Cael (ancient weapon historian) |
| Skyborn | Elder Vyn | Tae (half-Aethori descent, conflicted) | Ova (back-piece engineer) |
| Hollowroot Lodge | Wren | Pip (youngest hunter, brilliant naturalist) | Holt (poison and herb specialist) |
| Ember Pact | Ignas | Ryn (yes, that Ryn — she's Ember Pact) | Hessa (volcanic materials expert) |
| Voidwalkers | Sable | — | Mira (Rift energy analyst, unsettling) |

### Player Room & Home Decor

Every hunter has a personal room in their guild hall. The room starts bare — a bed, a weapon rack, one window.

Decorations are obtained through:
- **Monster trophies** — automatically awarded after certain kills (Thornmane head mount, Verdanthos scale wall piece, etc.)
- **Crafted furniture** — made from common biome materials at Doram's workshop
- **Quest rewards** — guild leaders give unique decorations as relationship rewards
- **Rank achievements** — a board updates automatically with your rank milestones

Decorations are cosmetic only. The room is a record of your hunts — a visual autobiography. Other guild members comment on new additions when you return from a hunt.

### Biome Unlock Events

When a gatekeeper boss is defeated for the first time (opening a new biome), the whole guild reacts:
- **Crimson Claw:** Immediate celebration. Someone starts a pool on who gets the first G2/G3 kill.
- **Hollowroot Lodge:** Excited field team immediately deploys to catalogue the new biome.
- **Skyborn:** If it's an aerial biome, they hold a ceremony. Vyn makes a speech.
- **Ironveil Crafters:** Theoretical discussion about what the new monsters will drop.
- **Ember Pact:** Quiet toasts. They've been here before. They're genuinely happy.
- **Wardens:** The board updates. A new zone is logged. Someone pins a note about new Rift monitoring needs.

These are ambient dialogue events, not cutscenes — the guild hall changes when you walk in after a major unlock.

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
  → Story accelerates, Cult becomes visible threat
  → Rank up to G4

G4 — Elder Sky Ruins
  → Story climax, Sovereign encounter
  → Elder Rank unlocked post-story

Elder Rank — Post-story content
  → Tempered variants (harder versions of all monsters)
  → New material tier, endgame gear
  → The other Rift Shards questline
```
