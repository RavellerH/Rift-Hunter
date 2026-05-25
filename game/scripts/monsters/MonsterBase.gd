class_name MonsterBase
extends CharacterBody2D

signal hp_changed(current: float, maximum: float)
signal died()

@export var monster_id: String = "monster"
@export var max_hp: float = 100.0

var hp: float = max_hp
var is_dead: bool = false
var is_staggered: bool = false
var is_enraged: bool = false

@onready var sprite: ColorRect = $Sprite
@onready var hurtbox: Area2D = $Hurtbox

var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")

func _ready() -> void:
	hp = max_hp
	hurtbox.area_entered.connect(_on_hurtbox_entered)

func _physics_process(delta: float) -> void:
	if not is_on_floor():
		velocity.y += gravity * delta
	move_and_slide()

func take_damage(amount: int, hit_pos: Vector2) -> void:
	if is_dead:
		return
	hp = maxf(hp - amount, 0.0)
	hp_changed.emit(hp, max_hp)
	Events.monster_hp_changed.emit(monster_id, hp, max_hp)
	Events.damage_dealt.emit(hit_pos, amount, false)
	Events.camera_shake.emit(Constants.CAMERA_SHAKE_LIGHT)
	_flash()

	if hp <= 0:
		_die()
		return

	var enrage_threshold := max_hp * Constants.THORNMANE_ENRAGE_THRESHOLD
	if not is_enraged and hp <= enrage_threshold:
		is_enraged = true
		Events.monster_enraged.emit(monster_id)
		_on_enrage()

func _on_hurtbox_entered(area: Area2D) -> void:
	if area.is_in_group("player_hitbox"):
		var dmg: int = area.get_meta("damage", 10)
		take_damage(dmg, area.global_position)

func _flash() -> void:
	sprite.color = Color.WHITE
	await get_tree().create_timer(Constants.HIT_FLASH_DURATION).timeout
	sprite.color = _base_color()

func _base_color() -> Color:
	return Color(0.7, 0.3, 0.15)  # brownish

func _die() -> void:
	is_dead = true
	sprite.color = Color.DIM_GRAY
	died.emit()
	Events.monster_died.emit(monster_id)
	set_physics_process(false)
	await get_tree().create_timer(1.2).timeout
	queue_free()

func _on_enrage() -> void:
	pass  # override in subclass
