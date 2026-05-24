# Game Design

## Map — Volcanic Highlands

- Single map for MVP
- **Zones**: forest floor, cliff edges, aerial air pockets (flying monsters only)
- **3 spawn points** scattered around the map
- **1 extraction zone** — activates at the 3-minute mark
- Destructible terrain elements (Phase 2)

---

## Player — Hunter Class

### Stats

| Stat | Description |
|---|---|
| HP | Health points |
| Stamina | Governs dodge roll frequency |
| Attack | Base damage output |
| Defense | Incoming damage reduction |
| Speed | Movement velocity |

### Abilities

| Input | Ability | Details |
|---|---|---|
| Left Click | Basic Melee | Short range, no cooldown |
| Right Click | Dodge Roll | Brief invincibility frames |
| Q | Skill Shot | Ranged projectile, 5s cooldown |
| E | AOE Burst | Close range, knockback, 10s cooldown |
| Passive | Power Stacks | Kill streak scales all damage |

---

## Monsters

| Monster | Type | Behavior |
|---|---|---|
| Scuttler | Ground / Small | Wanders, flees when hurt, drops Power Shards |
| Thornback | Ground / Mid-Boss | Patrols a zone, charges player, drops Gear Buff |
| Skywing | Flying / Boss | Spawns at 4-min mark, aerial dive attacks, drops rare loot |

### AI State Machine

```
Idle → Patrol → Alert → Attack → Flee
```

- Flying monsters occupy an elevated Y position.
- Only reachable via ranged attacks (Q) or aerial jump zones.

### Monster Telegraphs

- Red flash before an attack lands.
- AOE circle indicator appears before area attacks.

---

## Combat System

- Real-time top-down movement (WASD).
- **Hitboxes**: circles for all entities (MVP).
- Damage numbers rendered above targets on hit.
- **PvP (MVP)**: knockback only — full damage enabled in Phase 2.

---

## In-Match Progression

### Power Shards

- Dropped by Scuttlers and other small monsters.
- Accumulate to raise player level (1–10 within a match).
- Each level grants **+5% attack** and **+3% speed**.

### Gear Buffs

- Dropped by Thornback (mid-boss).
- One of 3 random buffs awarded on kill:

| Buff | Effect |
|---|---|
| Fire Blade | Attack bonus + burn DoT on hits |
| Iron Shell | Defense bonus + damage reduction |
| Storm Dash | Speed bonus + reduced dodge cooldown |

### Hunter's Trophy

- Dropped exclusively by Skywing (main boss).
- Grants a large bonus to end-of-match score.
- Highest contested loot in the match.

---

## Scoring & Leaderboard

### Score Breakdown

```
Score = kills + monster damage dealt + extraction bonus
```

### End Screen

- Top 3 hunters displayed with final scores.
- Total monsters killed (match-wide stat).
- Match MVP highlighted.
