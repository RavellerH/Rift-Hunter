class_name PlayerStats
extends Node

signal hp_changed(current: float, maximum: float)
signal stamina_changed(current: float, maximum: float)

var hp: float = Constants.BASE_HP
var max_hp: float = Constants.BASE_HP
var stamina: float = Constants.BASE_STAMINA
var max_stamina: float = Constants.BASE_STAMINA

var _stamina_regen_timer: float = 0.0

func _process(delta: float) -> void:
	_tick_stamina_regen(delta)

func _tick_stamina_regen(delta: float) -> void:
	if _stamina_regen_timer > 0:
		_stamina_regen_timer -= delta
		return
	if stamina < max_stamina:
		stamina = minf(stamina + Constants.STAMINA_REGEN_RATE * delta, max_stamina)
		Events.player_stamina_changed.emit(stamina, max_stamina)

func take_damage(amount: int) -> void:
	hp = maxf(hp - amount, 0.0)
	hp_changed.emit(hp, max_hp)

func use_stamina(amount: float) -> void:
	stamina = maxf(stamina - amount, 0.0)
	_stamina_regen_timer = Constants.STAMINA_REGEN_DELAY
	Events.player_stamina_changed.emit(stamina, max_stamina)
