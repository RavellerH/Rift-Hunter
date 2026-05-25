class_name Thornmane
extends MonsterBase

enum State { IDLE, APPROACH, WINDUP, CHARGE, TAIL_SWEEP, STAGGER, DEAD }

var ai_state: State = State.IDLE
var player: Player = null
var _attack_cooldown: float = 0.0
var _charge_dir: int = 1
var _intro_done: bool = false

@onready var attack_hitbox: Area2D = $AttackHitbox
@onready var attack_shape: CollisionShape2D = $AttackHitbox/AttackShape
@onready var intro_label: Label = $IntroLabel

func _ready() -> void:
	super._ready()
	monster_id = "thornmane"
	max_hp = Constants.THORNMANE_MAX_HP
	hp = max_hp
	attack_shape.disabled = true
	# Find player in scene
	await get_tree().process_frame
	player = get_tree().get_first_node_in_group("player")

func _physics_process(delta: float) -> void:
	super._physics_process(delta)
	if is_dead or player == null:
		return

	_attack_cooldown -= delta
	_run_ai(delta)

func _run_ai(_delta: float) -> void:
	match ai_state:
		State.IDLE:
			velocity.x = 0
			if not _intro_done:
				_do_intro()
				return
			var dist := _dist_to_player()
			if dist < Constants.THORNMANE_AGGRO_RANGE:
				ai_state = State.APPROACH
		State.APPROACH:
			_face_player()
			var dist := _dist_to_player()
			if dist < Constants.THORNMANE_ATTACK_RANGE and _attack_cooldown <= 0:
				_choose_attack()
			elif dist > Constants.THORNMANE_AGGRO_RANGE * 1.4:
				ai_state = State.IDLE
				velocity.x = 0
			else:
				var spd := Constants.THORNMANE_SPEED * (1.5 if is_enraged else 1.0)
				velocity.x = _dir_to_player() * spd
		State.CHARGE:
			velocity.x = _charge_dir * Constants.THORNMANE_CHARGE_SPEED
		State.STAGGER, State.WINDUP, State.TAIL_SWEEP, State.DEAD:
			velocity.x = 0

func _choose_attack() -> void:
	# Alternate: every other attack is tail sweep
	var rng := randf()
	if rng < 0.55:
		_start_charge()
	else:
		_start_tail_sweep()

func _start_charge() -> void:
	ai_state = State.WINDUP
	_charge_dir = _dir_to_player()
	_face_player()
	sprite.color = Color(1.0, 0.55, 0.1)  # orange windup tint
	await get_tree().create_timer(0.55).timeout
	if is_dead: return
	sprite.color = _base_color()
	ai_state = State.CHARGE
	# Active hitbox during charge
	attack_hitbox.set_meta("damage", Constants.THORNMANE_CHARGE_DAMAGE)
	attack_shape.disabled = false
	await get_tree().create_timer(0.55).timeout
	if is_dead: return
	attack_shape.disabled = true
	ai_state = State.APPROACH
	_attack_cooldown = 1.4 if not is_enraged else 0.9

func _start_tail_sweep() -> void:
	ai_state = State.TAIL_SWEEP
	sprite.color = Color(0.9, 0.2, 0.6)  # purple tint
	await get_tree().create_timer(0.4).timeout
	if is_dead: return
	# Sweep hitbox on both sides briefly
	attack_hitbox.set_meta("damage", Constants.THORNMANE_SWEEP_DAMAGE)
	attack_shape.disabled = false
	attack_hitbox.position.x = 0  # centered
	await get_tree().create_timer(0.35).timeout
	if is_dead: return
	attack_shape.disabled = true
	sprite.color = _base_color()
	ai_state = State.APPROACH
	_attack_cooldown = 1.8 if not is_enraged else 1.1

func _do_intro() -> void:
	_intro_done = true
	velocity.x = 0
	intro_label.visible = true
	intro_label.text = "— THORNMANE —"
	await get_tree().create_timer(2.2).timeout
	intro_label.visible = false
	ai_state = State.APPROACH

func _on_enrage() -> void:
	sprite.color = Color(1.0, 0.2, 0.2)
	await get_tree().create_timer(0.5).timeout
	sprite.color = _base_color()
	Events.camera_shake.emit(8.0)

func _base_color() -> Color:
	return Color(1.0, 0.4, 0.1) if is_enraged else Color(0.7, 0.3, 0.15)

func _dist_to_player() -> float:
	return global_position.distance_to(player.global_position)

func _dir_to_player() -> int:
	return int(sign(player.global_position.x - global_position.x))

func _face_player() -> void:
	sprite.scale.x = _dir_to_player()
