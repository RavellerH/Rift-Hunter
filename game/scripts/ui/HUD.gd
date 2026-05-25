class_name HUD
extends CanvasLayer

@onready var player_hp_bar: ProgressBar = $PlayerBars/HPBar
@onready var player_stamina_bar: ProgressBar = $PlayerBars/StaminaBar
@onready var monster_hp_bar: ProgressBar = $MonsterBar/MonsterHPBar
@onready var monster_name_label: Label = $MonsterBar/MonsterName
@onready var dmg_number_container: Node2D = $DamageNumbers
@onready var controls_label: Label = $ControlsLabel
@onready var dead_label: Label = $DeadLabel

var _dmg_label_scene: PackedScene

func _ready() -> void:
	Events.player_hp_changed.connect(_on_player_hp)
	Events.player_stamina_changed.connect(_on_player_stamina)
	Events.monster_hp_changed.connect(_on_monster_hp)
	Events.damage_dealt.connect(_on_damage_dealt)
	Events.player_died.connect(_on_player_died)
	Events.monster_enraged.connect(_on_monster_enraged)

	player_hp_bar.max_value = Constants.BASE_HP
	player_hp_bar.value = Constants.BASE_HP
	player_stamina_bar.max_value = Constants.BASE_STAMINA
	player_stamina_bar.value = Constants.BASE_STAMINA
	monster_hp_bar.max_value = Constants.THORNMANE_MAX_HP
	monster_hp_bar.value = Constants.THORNMANE_MAX_HP
	dead_label.visible = false

func _on_player_hp(current: float, maximum: float) -> void:
	player_hp_bar.max_value = maximum
	player_hp_bar.value = current

func _on_player_stamina(current: float, maximum: float) -> void:
	player_stamina_bar.max_value = maximum
	player_stamina_bar.value = current

func _on_monster_hp(monster_id: String, current: float, maximum: float) -> void:
	monster_hp_bar.max_value = maximum
	monster_hp_bar.value = current

func _on_damage_dealt(world_pos: Vector2, amount: int, is_critical: bool) -> void:
	var lbl := Label.new()
	lbl.text = str(amount)
	lbl.add_theme_color_override("font_color", Color.YELLOW if not is_critical else Color.ORANGE_RED)
	lbl.add_theme_font_size_override("font_size", 22 if not is_critical else 30)
	lbl.position = world_pos
	dmg_number_container.add_child(lbl)
	_animate_damage_number(lbl)

func _animate_damage_number(lbl: Label) -> void:
	var tween := create_tween()
	tween.tween_property(lbl, "position:y", lbl.position.y - 55.0, Constants.DMGNUM_LIFETIME)
	tween.parallel().tween_property(lbl, "modulate:a", 0.0, Constants.DMGNUM_LIFETIME * 0.6).set_delay(Constants.DMGNUM_LIFETIME * 0.4)
	await tween.finished
	lbl.queue_free()

func _on_player_died() -> void:
	dead_label.visible = true

func _on_monster_enraged(_id: String) -> void:
	monster_name_label.text = "THORNMANE  [ENRAGED]"
	monster_name_label.add_theme_color_override("font_color", Color.ORANGE_RED)
