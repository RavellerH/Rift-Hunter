extends Node

# Player
signal player_hp_changed(current: float, maximum: float)
signal player_stamina_changed(current: float, maximum: float)
signal player_died()

# Monster
signal monster_hp_changed(monster_id: String, current: float, maximum: float)
signal monster_died(monster_id: String)
signal monster_staggered(monster_id: String)
signal monster_enraged(monster_id: String)

# Combat
signal damage_dealt(position: Vector2, amount: int, is_critical: bool)
signal hit_landed(target: Node, damage: int)

# Camera
signal camera_shake(intensity: float)
