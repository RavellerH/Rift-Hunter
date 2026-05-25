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

```
Head armor    → 1 skill slot
Chest armor   → 2 skill slots
Arms armor    → 1 skill slot
Legs armor    → 1 skill slot
Charm         → 1 skill slot (crafted separately, cross-biome materials)
```
Total: 6 active skill slots per build. Mix-sets are valid and often optimal.

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

## Combat System

### Ground Combat

- Side-scrolling real-time combat
- WASD movement (or arrow keys)
- Light attack / heavy attack / special (weapon-specific)
- Dodge roll with i-frames (Agility stat affects duration)
- Stamina governs sprinting, charging, dodge frequency
- Hitboxes: capsule-based, per-limb on larger monsters
- Damage numbers float above target on hit
- White flash frame (2 frames) on hit — anime impact feel
- Screen shake scales with damage magnitude

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

Crafting happens at the **Blacksmith in Veilwatch**. No crafting in the field (keeps returning to hub meaningful).

### Weapons

- Each weapon is crafted from a specific monster's materials
- Weapon trees branch — early weapon → upgrade path A or B
- Upgrading requires the same monster's rarer parts

```
Iron Sword (starter)
  └→ Thornmane Sword (Thornmane parts)
       └→ Thornmane Sword+ (Thornmane rare parts)
            └→ Verdanthos Blade (Verdanthos parts — biome 1 endgame)
```

### Armor

- Each monster has a full armor set (Head, Chest, Arms, Legs)
- Craft any individual piece — full set not required
- Full set bonus: equipping all 4 pieces adds one extra skill slot (charm still separate)

### Charm Crafting

- Charms use materials from **multiple biomes** — encourages full exploration
- One charm slot per build
- Charms cannot be upgraded — craft a better one instead

### Material Drop Design (Light Grind)

Goal: a full weapon + armor set in 3–5 hunts of the target monster.

| Material Tier | Drop Rate | Hunts Expected |
|---|---|---|
| Common | 80–100% | 1 hunt |
| Uncommon | 50–65% | 2 hunts |
| Rare | 25–35% | 3–4 hunts |
| Ultra-rare (charm / endgame) | 10–15% (guaranteed on first kill) | 1 guaranteed + occasional |

---

## Guild Hub — Veilwatch

The living hub between hunts. Not just a menu — a place with character.

### NPCs

| NPC | Role | Dialogue Style |
|---|---|---|
| **Yela — Guild Receptionist** | Quest board, rank advancement, urgent dispatches | Warm, professional, quietly worried about the Cult activity |
| **Doram — Master Blacksmith** | Weapon and armor crafting, shows what you can make now | Gruff, proud of his work, secretly terrified of Elders |
| **Chef Suni** | Pre-hunt meals, grants timed buffs (attack, defense, stamina) | Enthusiastic, treats every meal like a ceremony |
| **Elder Scholar Voss** | Monster Field Codex, lore, Rift Shard research | Ancient, calm, knows more than he says |
| **Merchant Athe** | Buys excess materials, sells common components, trades | Cheerful opportunist, hints at Cult presence in passing |
| **Ryn — Fellow Hunter (NPC)** | Optional companion AI, recruitable after G2 | Talks constantly in the field, surprisingly effective |

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
