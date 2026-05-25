class_name Player
extends CharacterBody2D

# Sub-nodes (set in scene)
@onready var sprite: ColorRect = $Sprite
@onready var combat: PlayerCombat = $PlayerCombat
@onready var stats: PlayerStats = $PlayerStats
@onready var anim: AnimationPlayer = $AnimationPlayer
@onready var hurtbox: Area2D = $Hurtbox

enum State { IDLE, MOVE, ATTACK, DODGE, HURT, DEAD }

var state: State = State.IDLE
var facing: int = 1   # 1 = right, -1 = left
var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")

func _ready() -> void:
	stats.hp_changed.connect(_on_hp_changed)
	hurtbox.area_entered.connect(_on_hurtbox_entered)

func _physics_process(delta: float) -> void:
	if state == State.DEAD:
		return

	# Gravity
	if not is_on_floor():
		velocity.y += gravity * delta

	match state:
		State.IDLE, State.MOVE:
			_handle_movement(delta)
			_handle_combat_input()
		State.DODGE:
			pass  # handled by combat
		State.ATTACK:
			pass  # handled by combat
		State.HURT:
			pass

	move_and_slide()
	_update_facing()

func _handle_movement(delta: float) -> void:
	var dir := Input.get_axis("move_left", "move_right")

	if is_on_floor() and Input.is_action_just_pressed("jump"):
		velocity.y = Constants.PLAYER_JUMP_VELOCITY

	velocity.x = dir * Constants.PLAYER_SPEED
	state = State.MOVE if dir != 0 else State.IDLE

func _handle_combat_input() -> void:
	if Input.is_action_just_pressed("dodge") and stats.stamina >= Constants.DODGE_STAMINA_COST:
		combat.start_dodge(facing)
		return
	if Input.is_action_just_pressed("attack_light"):
		combat.start_light_attack(facing)
		return
	if Input.is_action_just_pressed("attack_heavy"):
		combat.start_heavy_charge()
		return

func _update_facing() -> void:
	var dir := Input.get_axis("move_left", "move_right")
	if dir != 0 and state != State.ATTACK and state != State.DODGE:
		facing = int(sign(dir))
	# Flip sprite
	sprite.position.x = -16 if facing == 1 else -16
	sprite.scale.x = facing

func set_state(s: State) -> void:
	state = s

func _on_hp_changed(current: float, maximum: float) -> void:
	Events.player_hp_changed.emit(current, maximum)
	if current <= 0:
		_die()

func _on_hurtbox_entered(area: Area2D) -> void:
	if state == State.DODGE and combat.is_invincible:
		return
	if area.is_in_group("monster_hitbox"):
		var dmg: int = area.get_meta("damage", 10)
		stats.take_damage(dmg)
		Events.camera_shake.emit(Constants.CAMERA_SHAKE_LIGHT)
		_flash_hurt()
		if state != State.DEAD:
			set_state(State.HURT)
			await get_tree().create_timer(0.3).timeout
			if state == State.HURT:
				set_state(State.IDLE)

func _flash_hurt() -> void:
	sprite.color = Color.RED
	await get_tree().create_timer(Constants.HIT_FLASH_DURATION).timeout
	sprite.color = Color(0.3, 0.6, 1.0)  # player tint back to blue

func _die() -> void:
	set_state(State.DEAD)
	sprite.color = Color.DARK_RED
	Events.player_died.emit()
	GameState.player_dead = true
