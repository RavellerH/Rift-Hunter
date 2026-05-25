extends Node

# --- Player Movement ---
const PLAYER_SPEED := 220.0
const PLAYER_JUMP_VELOCITY := -480.0
const PLAYER_GRAVITY_SCALE := 1.0

# --- Player Combat ---
const LIGHT_ATTACK_DAMAGE := 12
const LIGHT_ATTACK_DURATION := 0.25      # seconds hitbox is active
const LIGHT_ATTACK_COOLDOWN := 0.35
const LIGHT_ATTACK_COMBO_WINDOW := 0.45  # time to chain next hit

const HEAVY_CHARGE_MIN := 0.4            # minimum hold to trigger heavy
const HEAVY_CHARGE_MAX := 1.0            # full charge cap
const HEAVY_ATTACK_DAMAGE_MIN := 22
const HEAVY_ATTACK_DAMAGE_MAX := 45
const HEAVY_ATTACK_DURATION := 0.35
const HEAVY_ATTACK_COOLDOWN := 0.7

const DODGE_DURATION := 0.28
const DODGE_SPEED := 480.0
const DODGE_IFRAME_START := 0.05         # i-frames begin slightly after input
const DODGE_IFRAME_END := 0.22
const DODGE_STAMINA_COST := 20.0
const DODGE_COOLDOWN := 0.45

# --- Player Stats (base) ---
const BASE_HP := 100.0
const BASE_STAMINA := 100.0
const STAMINA_REGEN_RATE := 22.0         # per second when not dodging/sprinting
const STAMINA_REGEN_DELAY := 0.8         # seconds after use before regen starts

# --- Camera ---
const CAMERA_SHAKE_LIGHT := 4.0
const CAMERA_SHAKE_HEAVY := 10.0
const CAMERA_SHAKE_DECAY := 8.0          # how fast shake fades

# --- Damage Numbers ---
const DMGNUM_LIFETIME := 0.9
const DMGNUM_RISE_SPEED := 60.0

# --- Thornmane ---
const THORNMANE_MAX_HP := 350.0
const THORNMANE_SPEED := 140.0
const THORNMANE_CHARGE_SPEED := 520.0
const THORNMANE_ATTACK_RANGE := 110.0    # distance to trigger melee attack
const THORNMANE_AGGRO_RANGE := 500.0
const THORNMANE_CHARGE_DAMAGE := 28
const THORNMANE_SWEEP_DAMAGE := 18
const THORNMANE_STAGGER_DURATION := 0.8
const THORNMANE_ENRAGE_THRESHOLD := 0.3  # HP fraction

# Hit flash
const HIT_FLASH_DURATION := 0.08
