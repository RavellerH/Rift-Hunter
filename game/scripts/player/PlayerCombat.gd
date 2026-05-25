class_name PlayerCombat
extends Node

@onready var player: Player = get_parent()
@onready var stats: PlayerStats = get_parent().get_node("PlayerStats")
@onready var hitbox: Area2D = $"../Hitbox"
@onready var hitbox_shape: CollisionShape2D = $"../Hitbox/HitboxShape"

var is_invincible: bool = false
var _heavy_charge_time: float = 0.0
var _charging_heavy: bool = false
var _light_combo: int = 0
var _combo_timer: float = 0.0
var _on_cooldown: bool = false

func _process(delta: float) -> void:
	if _combo_timer > 0:
		_combo_timer -= delta
		if _combo_timer <= 0:
			_light_combo = 0

	# Charge accumulation
	if _charging_heavy:
		_heavy_charge_time += delta
		if Input.is_action_just_released("attack_heavy"):
			_release_heavy_attack()

func start_light_attack(facing: int) -> void:
	if _on_cooldown or player.state == Player.State.DODGE:
		return

	_light_combo = (_light_combo % 3) + 1
	_combo_timer = Constants.LIGHT_ATTACK_COMBO_WINDOW
	player.set_state(Player.State.ATTACK)
	_on_cooldown = true

	# Scale damage and hitbox offset by combo hit
	var dmg := Constants.LIGHT_ATTACK_DAMAGE + (_light_combo - 1) * 4
	_fire_hitbox(facing, dmg, Constants.LIGHT_ATTACK_DURATION)

	await get_tree().create_timer(Constants.LIGHT_ATTACK_DURATION).timeout
	_on_cooldown = false
	if player.state == Player.State.ATTACK:
		player.set_state(Player.State.IDLE)
	await get_tree().create_timer(Constants.LIGHT_ATTACK_COOLDOWN - Constants.LIGHT_ATTACK_DURATION).timeout
	_on_cooldown = false

func start_heavy_charge() -> void:
	if _on_cooldown or _charging_heavy or player.state == Player.State.DODGE:
		return
	_charging_heavy = true
	_heavy_charge_time = 0.0
	player.set_state(Player.State.ATTACK)

func _release_heavy_attack() -> void:
	_charging_heavy = false
	var charge_ratio := clampf(_heavy_charge_time / Constants.HEAVY_CHARGE_MAX, 0.0, 1.0)
	var dmg := int(lerpf(
		Constants.HEAVY_ATTACK_DAMAGE_MIN,
		Constants.HEAVY_ATTACK_DAMAGE_MAX,
		charge_ratio
	))
	_fire_hitbox(player.facing, dmg, Constants.HEAVY_ATTACK_DURATION)
	Events.camera_shake.emit(Constants.CAMERA_SHAKE_HEAVY * charge_ratio)
	_on_cooldown = true
	await get_tree().create_timer(Constants.HEAVY_ATTACK_COOLDOWN).timeout
	_on_cooldown = false
	if player.state == Player.State.ATTACK:
		player.set_state(Player.State.IDLE)

func start_dodge(facing: int) -> void:
	if _on_cooldown:
		return
	stats.use_stamina(Constants.DODGE_STAMINA_COST)
	player.set_state(Player.State.DODGE)
	player.velocity.x = facing * Constants.DODGE_SPEED

	# i-frames window
	await get_tree().create_timer(Constants.DODGE_IFRAME_START).timeout
	is_invincible = true
	await get_tree().create_timer(Constants.DODGE_IFRAME_END - Constants.DODGE_IFRAME_START).timeout
	is_invincible = false
	await get_tree().create_timer(Constants.DODGE_DURATION - Constants.DODGE_IFRAME_END).timeout

	player.velocity.x = 0
	if player.state == Player.State.DODGE:
		player.set_state(Player.State.IDLE)

	_on_cooldown = true
	await get_tree().create_timer(Constants.DODGE_COOLDOWN - Constants.DODGE_DURATION).timeout
	_on_cooldown = false

func _fire_hitbox(facing: int, damage: int, duration: float) -> void:
	hitbox_shape.disabled = false
	hitbox.position.x = facing * 52.0
	hitbox.set_meta("damage", damage)
	await get_tree().create_timer(duration).timeout
	hitbox_shape.disabled = true
