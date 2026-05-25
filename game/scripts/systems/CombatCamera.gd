class_name CombatCamera
extends Camera2D

var _shake_intensity: float = 0.0
var _shake_offset: Vector2 = Vector2.ZERO

func _ready() -> void:
	Events.camera_shake.connect(_on_shake)

func _process(delta: float) -> void:
	if _shake_intensity > 0:
		_shake_offset = Vector2(
			randf_range(-1, 1) * _shake_intensity,
			randf_range(-1, 1) * _shake_intensity
		)
		offset = _shake_offset
		_shake_intensity = maxf(_shake_intensity - Constants.CAMERA_SHAKE_DECAY * delta, 0.0)
	else:
		offset = Vector2.ZERO

func _on_shake(intensity: float) -> void:
	_shake_intensity = maxf(_shake_intensity, intensity)
