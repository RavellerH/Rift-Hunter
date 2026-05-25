# Asset Generation Prompts — Rift Hunter

**Art style:** Anime pixel art, vibrant adventure ARPG. Rich atmospheric color, lush environments, warm lighting.
Side-scrolling 2.5D aesthetic. Sprites target **48×48px** per frame.

Each section has two prompt variants:
- **MJ** → Midjourney v6 (concept art, reference sheets, NPC portraits)
- **SD** → Stable Diffusion (sprite sheets, in-game assets) — use with a **pixel art LoRA**

Recommended SD settings: `steps 28, CFG 7.5, sampler DPM++ 2M Karras`
Recommended SD LoRA: `pixel_art_v2` or `pixelsprite_v3` at weight 0.8–1.0

---

## MASTER STYLE BLOCK

Append this to every prompt for visual consistency:

**MJ suffix:**
```
--style raw --ar 1:1 --v 6 vibrant adventure anime pixel art, rich atmospheric lighting, 
lush colorful world, 2.5D side-scroller aesthetic, Aethara world, Rift Hunter game
```

**SD suffix:**
```
pixel art, 48x48 sprite, game sprite, vibrant adventure ARPG, 
clean outlines, limited palette, sprite sheet
NEGATIVE: photorealistic, 3D render, blurry, soft edges, watermark, 
extra limbs, deformed, low quality, jpeg artifacts
```

---

---

# THE HUNTER (Player Character)

**Identity:** A lone Guild hunter who arrived at Veilwatch with no rank and a Rift Shard — a sliver
of crystallized Void energy — embedded in their left palm under scar tissue. The shard emits a faint
violet-blue glow through the skin. Practical armor designed for mobility, crafted from monster parts.
Anime protagonist energy — determined, capable, ready for whatever comes next.

---

## 1 — Hunter Reference Sheet (Midjourney)

**Purpose:** Master visual reference. Use this as the ControlNet source for all subsequent sprite work.

```
full character reference sheet of a lone hunter warrior, front view center, left side view, 
right side view, three-quarter view, back view, all on dark charcoal background with subtle 
grid lines. anime pixel art style, 2.5D side-scroller ARPG.

Character design: young adult hunter, lithe and athletic build, practical layered armor 
combining dark leather pauldrons, chest plate with etched Guild insignia, wrapped bracers, 
knee-high boots. Sword and round shield on back. Left hand shows glowing violet-blue scar 
across palm — Rift Shard crystal barely visible under healed skin, faint luminescence. 
Dark traveling cloak, worn at edges. Determined expression. Medium-length dark hair with 
a few wind-swept strands. Subtle Rift energy faint glow at left hand in all poses.

Color palette: dark navy armor, burnt sienna leather, silver trim, violet Rift glow accent.
Consistent across all five angles. Style: Monster Hunter meets Hollow Knight meets dark 
anime RPG. Clean linework, visible pixel texture, rich shadows.

--style raw --ar 16:9 --v 6
```

---

## 2 — Hunter Sprite Sheet: Idle + Walk + Run (Stable Diffusion)

**Purpose:** Core movement animation strip. Import into Aseprite, clean up timing, export to Godot.

```
pixel art sprite sheet, single character, white background, horizontal strip layout.
48x48 pixels per frame. 

Row 1 (4 frames) — IDLE ANIMATION: hunter standing facing right in 3/4 profile. 
Subtle breathing, chest rises, cloak sways slightly. Frames: neutral stance, 
slight chest expand, peak breath, return. Left hand loosely at side with faint violet glow.

Row 2 (8 frames) — WALK: smooth weight-shift walk cycle facing right. Sword and shield 
on back visible. Arms swing naturally. Cloak moves with momentum.

Row 3 (8 frames) — RUN: forward lean, faster arm pump, cloak streams back, 
right hand near weapon hilt. Urgency without desperation.

Dark fantasy ARPG hunter character, anime pixel art style, 48x48 per frame, 
clean single-pixel outlines, dark navy and leather armor, violet Rift shard glow on left hand.
NEGATIVE: photorealistic, blurry, extra frames, inconsistent character, 
multiple characters, random objects
```

---

## 3 — Hunter Sprite Sheet: Combat Animations (Stable Diffusion)

**Purpose:** Full combat animation sheet. One sheet per weapon type — start with Sword & Shield.

```
pixel art sprite sheet, single character facing right, white background, horizontal strip.
48x48 pixels per frame. Hunter in Sword & Shield combat stance.

Row 1 (6 frames) — LIGHT ATTACK 1: quick forward horizontal slash, sword drawn right to left.
Frames: draw, extend, contact flash (white impact pixel on frame 3), follow-through, recovery.

Row 2 (6 frames) — LIGHT ATTACK 2: upward diagonal slash continuing the combo. 
Frames: wind-up, rising slash, apex with brief impact, return.

Row 3 (8 frames) — LIGHT ATTACK 3 (COMBO FINISHER): spinning overhead smash, 
biggest animation of the three. Rift Shard in left hand pulses violet on impact frame.
Full body rotation implied in sprite flip. Impact frame: larger white flash pixel cluster.

Row 4 (4 frames) — HEAVY CHARGE: standing power stance, sword drawn back, 
body low, orange-yellow charge energy building at blade edge.
Frame 4: peak charge, full golden aura at weapon edge.

Row 5 (8 frames) — HEAVY RELEASE: explosive forward lunge, massive downward arc, 
shockwave pixel burst on impact frame. Most dramatic animation. 
Camera shake implied by environment pixel blur (subtle).

Row 6 (8 frames) — DODGE ROLL: forward rolling evade, low arc, cloak fans out.
Frames 3-6: subtle white ghost outline (i-frame visual indicator).
Frame 8: return to crouch-ready stance.

Row 7 (4 frames) — HURT: sharp recoil backward, pain expression, brief white full-body flash.
Row 8 (8 frames) — DEATH: stagger, kneel, collapse to ground, fade to still.

NEGATIVE: photorealistic, blurry, inconsistent scale, extra characters
```

---

## 4 — Hunter Portrait (Midjourney — for UI / dialogue box)

**Purpose:** HUD corner portrait and dialogue box headshot.

```
close-up portrait painting of a lone hunter, anime dark fantasy RPG style. 
Face: young adult, sharp determined eyes, slight battle weariness, 
one faint scar across cheekbone. Dark hair. Small violet crystal glow 
barely visible at lower frame edge (the Rift Shard in left hand off-frame).

Background: dark blurred stone wall with faint violet Rift energy traces.
Style: NPC portrait style — Hollow Knight dialogue meets Nier Automata character art.
Rich shadows, single strong rim light from left. Painterly but with digital precision.
Expression: calm focus before a fight.

--style raw --ar 1:1 --v 6
```

---

---

# MONSTERS

---

## 5 — THORNMANE (G1 Riftborn — Ancient Canopy)

*Territorial quadruped. Charges and tail-sweeps. Enrages at 30% HP.*

**Design brief:** A large, predatory quadruped — imagine a lion-bear hybrid with a mane of
black thorns and moss-covered obsidian hide plates. Green-gold bioluminescent eyes.
Ancient forest energy. Not evil — just proudly territorial. When enraged, the thorn mane
flares outward and blazes deep crimson — spectacular to look at, dangerous to stand near.

### Reference Sheet (MJ)
```
creature design sheet for a territorial quadruped forest boss, dark fantasy ARPG, 
side view center, 3/4 front view, 3/4 back view, close-up head, close-up attack pose.

Thornmane: large predatory quadruped the size of a bull, lion-bear body structure, 
hunched powerful shoulders. Mane of black obsidian thorns radiating from neck and spine, 
overgrown with dark forest moss and small dark flowers. Hide: layered dark bark-textured 
plates over deep moss-green skin. Thick armored tail with thorn cluster at tip for sweeping.
Eyes: large, bioluminescent gold-green. Claws: elongated, root-like, digging into ground.

Enraged state (small inset): thorn mane flares outward, crimson glow pulses through mane, 
breath visible as red mist, eyes shift to burning amber.

Ancient Canopy forest lighting — dappled god-ray light through leaves. 
Dark greens, deep moss browns, obsidian blacks, bioluminescent gold-green accents.

--style raw --ar 16:9 --v 6
```

### In-game Sprite Sheet (SD)
```
pixel art sprite sheet, monster character, white background, horizontal strip, 
48x96 pixels per frame (wide quadruped body).

Row 1 (6 frames) — IDLE: Thornmane standing facing right, breathing, thorn mane 
sways slightly. Tail flicks. Weight shifts on front legs.

Row 2 (8 frames) — APPROACH WALK: slow predatory stalk toward player, 
head low, intent, deliberate. Each step slightly heavier.

Row 3 (4 frames) — CHARGE WINDUP: body coils backward, thorns spread, 
orange pixel glow builds at shoulder.

Row 4 (8 frames) — CHARGE: explosive horizontal dash, body horizontal, 
all four limbs extended in full sprint, thorn mane pressed back by speed.
Dust pixel cloud at feet.

Row 5 (8 frames) — TAIL SWEEP: rotate to face camera (brief), 
tail sweeps in low arc left to right. Purple pixel glow on frames 4-6.

Row 6 (4 frames) — STAGGER: hit reaction, rears back, 
white hit flash frame 1, stumble frames 2-4.

Row 7 (8 frames) — DEATH: stumble, front knees buckle, 
side collapse, still. Thorn mane dim on final frame.

dark forest quadruped boss, moss armor, thorn mane, bioluminescent gold eyes, 
pixel art ARPG sprite, clean outlines, dark green and obsidian palette.
NEGATIVE: humanoid, upright, blurry, photorealistic
```

---

## 6 — VERDANTHOS (G1 Elder Boss — Ancient Canopy)

*Ancient serpentine Elder. Controls the canopy. Vine grabs, spore explosions.*

**Design brief:** An ancient enormous serpent, but not a simple snake — Verdanthos is partially
composed of the forest itself. Its scales are overgrown with thick bark, its underbelly glows
with spore-light, vast flowering vines trail from its body and respond to its will. Its head
is half-serpent, half-ancient-tree — hollow eyes filled with golden spore light.

### Reference Sheet (MJ)
```
creature design sheet for an ancient serpentine Elder dragon boss, dark fantasy ARPG.
Side profile full body, head close-up, detail of vine appendages, attack pose.

Verdanthos: enormous ancient serpent, body roughly 30 meters in coil.
Scale design: upper scales — thick dark bark-wood texture, cracked with age, 
moss growing in cracks. Lower underbelly: smooth, glows soft gold-green with 
bioluminescent spore pockets. Head: part serpent, part ancient tree — 
jaw extends like gnarled wood, hollow eyes emit golden spore light. 
Crown: massive flowering vines erupt from skull like a headdress, 
flowers are dark crimson with gold centers.
Body appendages: several prehensile flowering vines growing from mid-body, 
capable of independent movement and grasping.
Tail tip: buried in the canopy floor, rooted into the earth.

Ancient forest atmosphere — god-rays through forest canopy, dust motes, 
thick air. Dark greens, deep gold, warm bark-brown, crimson flower accents.

--style raw --ar 16:9 --v 6
```

---

## 7 — DIABLORAK (G1 Elder Boss — Wildspire Waste)

*Massive horned Elder. Burrows underground. Charges from below.*

**Design brief:** A creature built purely for underground impact. Imagine a colossal rhinoceros
whose skull is a battering ram — three massive curved horns fused from obsidian and bone.
Sand-blasted crimson hide, deeply scarred. Tiny buried eyes — it hunts by vibration. When it
surfaces for a charge, the earth tears open ahead of it.

### Reference Sheet (MJ)
```
creature design sheet for a massive burrowing horned Elder monster, dark fantasy ARPG.
Full body side view, front view (charging toward viewer), underground burrow pose, head detail.

Diablorak: enormous quadruped Elder, body mass of a small building, low and wide.
Three massive horns: two sweeping outer horns (curved, obsidian-black, 
desert-worn) and one central straight spike (bone-white, longer, drilling tip). 
Hide: deep crimson, sand-blasted smooth in patches, deeply scarred elsewhere. 
Eyes: vestigial, buried under thick horn-plate brow — 
two small orange heat-sensing slits. Legs: enormously thick, clawed,
designed for digging with mineral-stained bone spurs. 
Back: raised ridge of serrated bone spines, desert-cracked.

Attack pose inset: mid-surface-charge, earth tearing open beneath body, 
sand-spray in parabolic arc, horns leading, orange rage eyes visible.

Wildspire Waste lighting — harsh desert sun overhead, deep shadows under body.
Crimson, obsidian black, sand orange, bone white.

--style raw --ar 16:9 --v 6
```

---

## 8 — VELKHRATH (G2 Elder Boss — Frosted Peaks)

*Enormous mammoth-type Elder. Creates blizzards, ice pillar attacks.*

**Design brief:** The mountain itself given consciousness. Velkhrath is so vast it displaces weather —
blizzards form in its wake. Its hide is ancient stone-grey matted with ice-caked fur, tusks longer
than houses, each encrusted with ice formations that have grown over centuries. Moves with geological
patience. When it rears up, avalanches happen.

### Reference Sheet (MJ)
```
creature design sheet for a colossal mammoth-type Elder creature, dark fantasy ARPG.
Side view full body, 3/4 front view, head and tusk close-up, blizzard attack pose.

Velkhrath: enormous ancient mammoth, body size of a small mountain. 
Fur: thick, matted, charcoal-grey and ice-white, heavy with centuries of accumulated frost. 
Tusks: four — two primary (upper, curving outward, house-length, 
encrusted with thick ice crystal formations), two secondary (lower, shorter, straight).
Hide beneath fur: ancient stone-grey, cracked like tectonic plates.
Feet: wide as boulders, each step creates permafrost impact ring.
Crown: permanent storm cloud follows overhead — blizzard halo.
Eyes: pale arctic blue, cold, ancient, slow-thinking.

Attack inset: rearing pose, ice pillars erupting from ground in arc ahead, 
blizzard wind visible as pixel streaks, ground frost spread from footprint.

Frosted Peaks atmosphere — blue-white blizzard light, 
ice cave reflections, deep shadow. Charcoal grey, ice white, arctic blue, pale gold eye glow.

--style raw --ar 16:9 --v 6
```

---

## 9 — NAMIELLE-KETH (G2 Elder Boss — Coral Skyland)

*Bioluminescent flying Elder. Floods platforms, electricity arcs.*

**Design brief:** A sky creature so beautiful it's disorienting. Namielle-Keth resembles an
enormous manta ray crossed with a deep-sea jellyfish — but airborne, vast, trailing electric
tendrils. Its body is almost transparent, revealing bioluminescent organs within. When it
floods a platform, water sheets from its wings. When it arcs electricity, it looks like
looking at a storm cloud from inside.

### Reference Sheet (MJ)
```
creature design sheet for a bioluminescent flying Elder manta-ray creature, dark fantasy ARPG.
Full wingspan spread (top-down), side profile gliding, 3/4 front view, 
close-up head and tendrils, electricity attack pose.

Namielle-Keth: vast aerial manta-ray Elder, wingspan fills a sky island.
Body: semi-translucent deep blue-violet membrane, bioluminescent organs visible as 
glowing gold-white structures within — heart-like central organ pulses visible.
Wing edges: fringe of trailing membrane tendrils, each tipped with spark-gold electricity.
Head: wide and flat, large forward-facing compound eyes — deep bioluminescent teal.
Trailing from body: long twin tail tendrils, 3× body length, 
coiled loosely in flight, electricity arcs between them.
Underside: water channels visible — it stores ocean water in body cavities, 
releases as flooding attack. Rain shimmers beneath it constantly.

Attack inset: electricity arc connecting twin tails above and below, 
water pouring from wing underside, struck platform flooding.

Coral Skyland lighting — bright open sky, coral island below, 
ocean far beneath. Deep blue-violet, teal bioluminescence, 
gold electricity, clear blue sky contrast.

--style raw --ar 16:9 --v 6
```

---

## 10 — ASHMAUL (G3 Elder Boss — Volcanic Abyss)

*The largest documented living Veilborn. The Reclamation has been keeping it fed. Story-critical.*

**Design brief:** Something that was once a large Elder and has been fed Rift energy by the
Reclamation until it became a geological event. Its body has grown so dense with mass and
volcanic energy that it barely moves — but when it does, the caldera shakes. Obsidian hide
cracked open at stress points where magma pressure vents orange-gold light. Ancient and
immense, not malevolent — just enormous and disturbed by the energy being fed into its territory.
The Reclamation's tool marks are carved into the feeding stones around its lair.

### Reference Sheet (MJ)
```
creature design sheet for a colossal corrupted Elder monster, dark fantasy ARPG.
Side view full body, front facing view, close-up of Cult rune carvings on hide, 
lava slam attack pose.

Ashmaul: immense quadruped Elder, body mass suggests geological scale.
Originally bear-like quadruped body structure, now bloated with Rift feeding.
Hide: thick obsidian plates, black as volcanic glass, cracked at seams — 
magma glows deep orange-red at every crack. Stress fractures spider-web across 
shoulders and haunches where Rift energy vents as heat shimmer.
Feeding marks: crude carved channels in the stone around its resting area, 
Reclamation tool marks, charred feeding runes — orange-gold from volcanic contact.
Eyes: four small eyes, pale amber-gold, slow and ancient.
Tail: massive, ends in volcanic rock club, trailing lava.

Attack inset: foreleg raised, slamming down, concentric lava pool ring erupting 
from impact point. Body weight causing visible ground deformation.

Volcanic Abyss atmosphere — deep caldera light from below, 
ash cloud overhead, lava river behind. Obsidian black, magma orange-red, 
amber-gold eyes, dramatic scale.

--style raw --ar 16:9 --v 6
```

---

## 11 — CHAOSKREL (G3 Elder Boss — Rotten Hollow)

*Long-dormant deep Elder. Multi-phase fight. Never before documented. First contact.*

**Design brief:** Something that has been asleep in the deepest hollow of the world since before
the Sundering and is now awake and curious and immense. Phase 1: looks almost geological — a
mass of dark stone with faintly moving surfaces, almost indistinguishable from the cave itself.
Phase 2: the stone shell cracks and something vast and many-limbed unfolds — bioluminescent,
alien, spectacular. The Field Codex has never had an entry for this tier of deep Elder.
It is the discovery of a career.

### Reference Sheet (MJ)
```
creature design sheet for a deep-earth eldritch Elder monster, dark fantasy ARPG.
Phase 1 (dormant-awakening), Phase 2 (fully unfurled), 
head close-up, tentacle detail, Rift void crack detail.

Chaoskrel:
Phase 1 appearance: almost geological — a massive roughly-circular mass of dark basalt stone, 
faintly wet, barely distinguishable from cave formation. 
Only tell: slow respiration movement under stone surface, 
and one large closed eye visible in the rock face.

Phase 2 appearance: basalt shell cracked and shed, true form revealed. 
Central body: roughly cephalopod — wide flat torso, boneless. 
Deep black-purple skin, iridescent in bioluminescent fungal light. 
Tentacles: twelve primary tentacles, each 3× body length, 
tips crystallized with deep purple Rift energy spikes.
Where bioluminescence is strongest: deep teal and gold light radiates from 
between body segments and across the skin surface in shifting patterns.
Eyes: three large compound eyes, ringed in deep teal bioluminescence, 
vast and ancient and attentive.

Rotten Hollow atmosphere — bioluminescent fungal light teal and gold, 
deep shadow, wet stone. Deep black-purple iridescent skin, 
teal and gold bioluminescence, spectacular in the dark.

--style raw --ar 16:9 --v 6
```

---

## 12 — AETHORI WAR-WYVERN (G4 Riftborn — Elder Sky Ruins)

*Mechanical-biological hybrid. Remnant of the Aethori Sky Kingdom's weapons.*

**Design brief:** The Aethori tamed colossal flying creatures and integrated ancient mechanisms
into them as weapons. This one has been alone in the ruins for three hundred years since the
Sundering. Its organic tissue has regrown around the ancient bronze mechanisms — the machine
and creature are now one thing. It maintains the ruins out of preserved instinct. It attacks
anything that doesn't carry Aethori blood-scent.

### Reference Sheet (MJ)
```
creature design sheet for a mechanical-biological hybrid wyvern boss, dark fantasy ARPG.
Full wingspan spread, side profile, mechanical detail close-up (integrated mechanism), 
head close-up, attack pose.

Aethori War-Wyvern: large wyvern — two-legged, wide wings, long neck.
Natural organic tissue: deep blue-grey scales, semi-iridescent. 
Integrated Aethori mechanisms: ancient bronze gear mechanisms 
embedded in wing joints — gears still turning, driving motion.
Chest plate: massive ancient bronze chest armor fused to organic chest bone, 
intricate clock-like mechanisms visible behind cracked crystal pane at center 
(Aethori power core — glows sky blue, still active).
Wing edges: bronze edge reinforcement plates with age-worn etchings.
Tail: ends in ancient Aethori siege weapon head — 
a crystalline-tipped launcher, organic tissue grown around it.
Eyes: two sets — original organic yellow eyes, and two artificial bronze eyes 
implanted above them, glowing sky blue.
Wounds (from 300 years): bronze plating corroded, organic tissue healed over gaps in metal.

Elder Sky Ruins atmosphere — eternal sunset clouds, 
ruins visible floating behind. Deep blue-grey organic, bronze-gold ancient 
mechanisms, sky blue energy core, sunset orange sky.

--style raw --ar 16:9 --v 6
```

---

## 13 — SERATH (G4 Story Antagonist)

*Aethori descendant. 230 years old. Rift Shard in chest. Wants to restart the Sky Kingdom.*

**Design brief:** A person who has lived two centuries beyond their natural span, sustained by
a Rift Shard embedded in their sternum. They do not look 230 — they look ageless, somewhere
between 35 and ancient. Ancient Aethori sky-sailor clothing worn and repaired over centuries.
The Rift Shard in their chest glows through their shirt — a steady violet heartbeat. They are
not designed to look villainous. They look like someone who has spent sixty years building
toward one specific thing and is now very close to finishing it.

### Reference Sheet (MJ)
```
character reference sheet for an ancient antagonist NPC, dark fantasy anime RPG.
Front view, side view, 3/4 view, close-up face, detail of glowing chest shard.

Serath: ageless human appearance — face somewhere between 35 and ancient, 
neither young nor old, precise and still. 
Build: lean, tall, composed. Every movement deliberate.
Clothing: ancient Aethori sky-sailor coat — long, deep navy, collar high, 
edges embroidered with worn gold Aethori sky-script. 
Worn and repaired over two centuries — patches with different fabrics, 
old repairs visible, but always maintained. Not ragged. Preserved.
Chest: Rift Shard embedded in sternum — violet glow visible through shirt fabric, 
pulsing like a slow heartbeat. Slight discoloration at skin around the shard.
Hair: silver-white, worn long, tied back. Two centuries of fading from original color.
Eyes: deep indigo, unnaturally still, seeing further than the present moment.
Expression: calm certainty. Not cruelty. Conviction.

Left hand detail inset: Aethori blood-mark tattoo, ancient script, 
used to communicate with Veilborn. Glows faint gold when active.

Dark atmospheric portrait lighting, single violet Rift light source from chest.
Deep navy, silver-white, violet Rift glow, worn gold embroidery.

--style raw --ar 3:2 --v 6
```

---

## 14 — THE SOVEREIGN (Rift Lord — Final Boss)

*So old it is the Rift. Cannot be destroyed — only sealed. Wakes beneath the Elder Sky Ruins.*

**Design brief:** This is not a creature — it is a phenomenon given shape. The Sovereign is so
ancient it has no fixed form, only a silhouette that changes depending on how reality is
bending near it. The visual concept: a vast dark presence that is partly in the world and
partly in the Void, with Rift tears where its body should be solid — windows into absolute
absence. The scale must feel impossible. Any frame it occupies should make the environment
look like a toy.

### Reference Sheet (MJ)
```
creature design sheet for a cosmic void entity final boss, dark fantasy ARPG.
Three views: distant full silhouette (showing impossible scale against ruins), 
upper body close-up (showing Rift void tears in body), head/eye close-up 
(showing void interior), seal moment (Rift Shard interaction visual).

The Sovereign: vast entity, rough quadrupedal silhouette but never fully 
resolving into solid form. Scale: larger than a sky island.
Body texture: appears solid dark obsidian from distance. 
Close-up: surface is not solid — it is constantly tearing and reforming. 
Rift void tears across its entire surface — the tears reveal not darkness 
but absolute absence: different stars, wrong constellations, void geometry.
Limbs: form and dissolve at edges — unclear where the creature ends and the Rift begins.
Eyes: two enormous areas on the head where the void tears most consistently. 
Within them: a single point of light, distant, like a star seen from underwater.
Aura: Rift energy radiates outward as crackling violet-black geometry — 
not light, the opposite of light. All surroundings distort near it.

Scale reference inset: Serath (human size, 1.8m) in lower corner. 
The Sovereign's foot/limb in frame — Serath reaches its ankle.

Seal moment inset: Rift Shard in player's palm extended toward Sovereign. 
Gold-violet beam connecting palm to body. Void tears in Sovereign body 
beginning to close, drawn inward toward the shard.

Atmosphere: Elder Sky Ruins — ancient floating architecture crumbling around it. 
Sunset sky turning violet-black as void bleeds into it.
Colors: void black (not dark — absent), deep violet Rift energy, 
wrong-star whites, obsidian surface.

--style raw --ar 16:9 --v 6
```

---

---

# NPCs — Veilwatch Guild Hub

---

## 15 — NPC Portraits (Midjourney — dialogue box headshots)

Each prompt generates one character. Use `--ar 1:1` for dialogue box crop.

### Yela — Guild Receptionist
```
close-up portrait of a young woman guild receptionist, vibrant adventure anime ARPG, 
dialogue portrait style. Yela: warm brown skin, dark hair pinned up practically, 
small Guild insignia earring. Sharp intelligent eyes — genuinely warm, knows everyone 
by name, happy to see you. Professional Guild uniform — deep navy with silver collar pip. 
Expression: welcoming, energized, the kind of person who makes a place feel like home.
Painterly portrait, warm stone background with Guild lantern warm-orange light.
--style raw --ar 1:1 --v 6
```

### Doram — Master Blacksmith
```
close-up portrait of a gruff middle-aged blacksmith master, dark fantasy anime ARPG, 
dialogue portrait style. Doram: broad face, wide jaw, dark skin with old burn scars 
across left cheek and neck (forge accident, years ago). Thick work-worn hands visible 
at frame edge. Short grey-shot black beard. Eyes: deeply competent — he assesses 
everything structurally. Expression: neutral bordering on disapproving, 
but this is just his face. He's deeply proud of his work and deeply unimpressed 
by anyone who brings him inferior materials. Leather apron, hammer hilt visible over shoulder.
Forge fire warm light from below, dark workshop behind.
--style raw --ar 1:1 --v 6
```

### Elder Scholar Voss
```
close-up portrait of an ancient scholar, vibrant adventure anime ARPG, dialogue portrait style. 
Elder Scholar Voss: very old — genuinely ancient, the kind of old that has seen most things 
and is still curious about the rest. Long silver-white hair, worn loose. 
Deep set eyes, pale grey, warm with accumulated knowledge. 
The patient calm of someone who has been delighted by discovery for a very long time. 
Layered scholar robes, deep burgundy and old gold. 
Open book visible at frame edge, filled with dense notation and enthusiastic margin notes. 
A single Rift Shard in a sealed glass vial worn as a pendant — a research specimen. 
Expression: just thought of something interesting, about to share it.
Candlelit study background, ancient tomes, faint violet Rift glow from the pendant.
--style raw --ar 1:1 --v 6
```

### Ryn — Fellow Hunter (G2 unlock)
```
close-up portrait of a fellow hunter companion, dark fantasy anime ARPG, 
dialogue portrait style. Ryn: young adult, wiry and light on their feet 
even when standing still. Mixed heritage, warm olive skin, bright sharp eyes — 
the kind that miss nothing and report everything out loud. 
Short practical hair, one braid behind left ear with a small monster claw threaded through. 
Light scout-class armor — less protection than the player, 
compensates with triple the agility. Always slightly amused. 
Expression: about to say something either very useful or very wrong, 
and confident it's the former. Casual lean against something off-frame. 
Veilwatch interior warm light, other hunters blurred in background.
--style raw --ar 1:1 --v 6
```

---

---

# WORKFLOW NOTES

## Consistency Pipeline

1. Generate Hunter Reference Sheet (prompt #1) in Midjourney — save the seed.
2. Upscale the preferred result. This is your **visual bible** for the character.
3. Use the upscaled sheet as **ControlNet reference** in Stable Diffusion for all sprite work.
4. For each monster: generate Midjourney concept first → use as SD ControlNet input → generate sprite sheet.
5. Import all sprite sheets into **Aseprite** for cleanup and timing adjustment.
6. Export as `.png` sprite sheets → import into Godot `AnimatedSprite2D`.

## Sprite Sheet Format for Godot

All sheets should export as a single horizontal strip PNG.
In Godot: `AnimatedSprite2D` → `SpriteFrames` → import strip → set `hframes` to frame count.

Recommended animation speeds:
- Idle: 8 fps
- Walk: 10 fps
- Run: 14 fps
- Light attack: 18 fps (snappy)
- Heavy release: 12 fps (weighted)
- Dodge: 20 fps (fast)
- Hurt: 24 fps (instant flash)

## Palette Constraint

Keep each character to **16 colors maximum** per sprite for visual cohesion and easy Aseprite cleanup.
Use Lospec.com palette search: `"dark fantasy"` or build custom from concept art.

---

*Rift Hunter — Asset Prompts v1.0 — May 2026*
