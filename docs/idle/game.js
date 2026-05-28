// ── Rift Hunter: Veilwatch Idle ──────────────────────────────────────────────

// ── DATA ─────────────────────────────────────────────────────────────────────

const GUILDS = [
  { id: 'ironmark',  name: 'Ironmark Brotherhood',  color: '#c47a1b', accent: '#f0a030',
    icon: '⚔️',  motto: 'Steel sharpens steel.',
    desc: 'Warriors who believe raw power conquers all. First to take the hardest contracts.' },
  { id: 'verdant',   name: 'Verdant Circle',         color: '#2d8a4e', accent: '#50d080',
    icon: '🌿',  motto: 'Know the land. Know the beast.',
    desc: 'Trackers and scholars of the Ancient Canopy. They study monsters before they hunt them.' },
  { id: 'aethori',   name: 'Aethori Order',          color: '#6a4fc2', accent: '#a080ff',
    icon: '✦',   motto: 'The Rift is not our enemy. Yet.',
    desc: 'Mages who study Rift energy. They believe the Veilborn can be understood — even communicated with.' },
  { id: 'deepstone', name: 'Deepstone Compact',      color: '#5a7a8a', accent: '#90c0d0',
    icon: '⛏️',  motto: 'What the earth holds, we claim.',
    desc: 'Engineers and crafters. They care about the materials more than the kill.' },
  { id: 'ashen',     name: 'Ashen Vanguard',         color: '#8a3a2a', accent: '#e06040',
    icon: '🔥',  motto: 'Let the unworthy burn.',
    desc: 'Hunters who lost people to the Veilborn. Ruthless. Effective. Haunted.' },
  { id: 'voidwatch', name: 'Voidwatcher Accord',     color: '#2a3a5a', accent: '#4060a0',
    icon: '👁',  motto: 'Observe. Record. Survive.',
    desc: 'Intelligence network. They know where every monster is before anyone else does.' },
];

const UPGRADES = {
  ironmark: [
    { id: 'iron_1', name: 'Whetstone',         cost: { shards: 40 },            effect: { clickPower: 3 },      desc: '+3 shards per click' },
    { id: 'iron_2', name: 'Heavy Pauldrons',   cost: { shards: 200, mats: 3 },  effect: { clickPower: 8 },      desc: '+8 shards per click' },
    { id: 'iron_3', name: 'Brotherhood Oath',  cost: { shards: 600, mats: 10 }, effect: { autoRate: 2 },        desc: '+2 shards/sec passive' },
    { id: 'iron_4', name: 'War-Rite Ceremony', cost: { shards: 2000, mats: 25, tokens: 5 }, effect: { clickPower: 30, autoRate: 5 }, desc: '+30 click, +5/sec' },
  ],
  verdant: [
    { id: 'verd_1', name: 'Beast Lore Tome',   cost: { shards: 40 },            effect: { autoRate: 1 },        desc: '+1 shard/sec passive' },
    { id: 'verd_2', name: 'Camouflage Cloak',  cost: { shards: 180, mats: 3 },  effect: { questSpeed: 0.25 },   desc: 'Quests complete 25% faster' },
    { id: 'verd_3', name: 'Root Network',       cost: { shards: 500, mats: 8 },  effect: { autoRate: 3 },        desc: '+3 shards/sec passive' },
    { id: 'verd_4', name: 'Elder Grove Pact',   cost: { shards: 1800, mats: 20, tokens: 5 }, effect: { autoRate: 8, questSpeed: 0.25 }, desc: '+8/sec, quests 25% faster' },
  ],
  aethori: [
    { id: 'aeth_1', name: 'Rift Reading',       cost: { shards: 35 },            effect: { autoRate: 0.5, clickPower: 2 }, desc: '+0.5/sec, +2 click' },
    { id: 'aeth_2', name: 'Resonance Lens',     cost: { shards: 160, mats: 3 },  effect: { shardBonus: 0.15 },   desc: '+15% all shard gain' },
    { id: 'aeth_3', name: 'Void Attunement',    cost: { shards: 480, mats: 8 },  effect: { shardBonus: 0.20 },   desc: '+20% all shard gain' },
    { id: 'aeth_4', name: 'Rift Communion',     cost: { shards: 1600, mats: 18, tokens: 5 }, effect: { shardBonus: 0.30, autoRate: 4 }, desc: '+30% bonus, +4/sec' },
  ],
  deepstone: [
    { id: 'deep_1', name: 'Shard Extractor',    cost: { shards: 50 },            effect: { matBonus: 1 },        desc: '+1 extra material from quests' },
    { id: 'deep_2', name: 'Ore Refinery',       cost: { shards: 220, mats: 4 },  effect: { autoRate: 2, matBonus: 1 }, desc: '+2/sec, +1 mat/quest' },
    { id: 'deep_3', name: 'Crystal Drill',      cost: { shards: 650, mats: 12 }, effect: { autoRate: 4 },        desc: '+4 shards/sec' },
    { id: 'deep_4', name: 'Deepforge Contract', cost: { shards: 2200, mats: 30, tokens: 5 }, effect: { autoRate: 6, matBonus: 2 }, desc: '+6/sec, +2 mat/quest' },
  ],
  ashen: [
    { id: 'ash_1',  name: 'Ember Rounds',       cost: { shards: 45 },            effect: { clickPower: 5 },      desc: '+5 shards per click' },
    { id: 'ash_2',  name: 'Ash Brand',          cost: { shards: 250, mats: 4 },  effect: { clickPower: 12 },     desc: '+12 shards per click' },
    { id: 'ash_3',  name: 'Pyre Covenant',      cost: { shards: 700, mats: 14 }, effect: { clickPower: 20, autoRate: 3 }, desc: '+20 click, +3/sec' },
    { id: 'ash_4',  name: 'Inferno Vow',        cost: { shards: 2500, mats: 35, tokens: 5 }, effect: { clickPower: 50 }, desc: '+50 shards per click' },
  ],
  voidwatch: [
    { id: 'void_1', name: 'Field Report',       cost: { shards: 30 },            effect: { autoRate: 1 },        desc: '+1 shard/sec' },
    { id: 'void_2', name: 'Signal Network',     cost: { shards: 150, mats: 2 },  effect: { autoRate: 2, questSpeed: 0.15 }, desc: '+2/sec, quests 15% faster' },
    { id: 'void_3', name: 'Cipher Protocol',    cost: { shards: 420, mats: 7 },  effect: { shardBonus: 0.10, autoRate: 2 }, desc: '+10% bonus, +2/sec' },
    { id: 'void_4', name: 'Accord Seal',        cost: { shards: 1400, mats: 16, tokens: 5 }, effect: { autoRate: 5, shardBonus: 0.20 }, desc: '+5/sec, +20% bonus' },
  ],
};

const MONSTERS = [
  { id: 'thornmane',    name: 'THORNMANE',          tier: 'G1',  type: 'Riftborn',    location: 'Ancient Canopy',
    emoji: '🦁',  color: '#2d8a4e', unlockShards: 150,
    weakness: 'Fire',  threat: 'Territorial. Ambushes hunters at tree-line.',
    lore: 'A massive quadruped whose hide has fused with ancient bark and thorn-growths. First confirmed Veilborn sighting at Veilwatch. Hunters call it the Gatekeeper.' },
  { id: 'verdanthos',   name: 'VERDANTHOS',         tier: 'G1',  type: 'Elder Boss',  location: 'Ancient Canopy',
    emoji: '🐍',  color: '#1a6030', unlockShards: 350,
    weakness: 'Thunder',  threat: 'Hypnotic gaze. Dissolves organic matter.',
    lore: 'Ancient serpentine Elder that has lived in the Canopy for three centuries. Its presence causes accelerated plant growth and rot simultaneously.' },
  { id: 'diablorak',    name: 'DIABLORAK',          tier: 'G1',  type: 'Elder Boss',  location: 'Wildspire Waste',
    emoji: '🦬',  color: '#8a5a20', unlockShards: 600,
    weakness: 'Water',  threat: 'Burrowing ambush. Horns pierce plate armor.',
    lore: 'A horned Elder that surfaces from the desert floor without warning. Its vibration sense detects footsteps from 400 meters.' },
  { id: 'velkhrath',    name: 'VELKHRATH',          tier: 'G2',  type: 'Elder Boss',  location: 'Frosted Peaks',
    emoji: '🦣',  color: '#5a7a8a', unlockShards: 1000,
    weakness: 'Fire',  threat: 'Creates blizzards. Immune to cold.',
    lore: 'Colossal mammoth Elder. Its tusks generate storm-fronts with each swing. The Frosted Peaks were stable before it arrived.' },
  { id: 'namielle',     name: 'NAMIELLE-KETH',      tier: 'G2',  type: 'Elder Boss',  location: 'Coral Skyland',
    emoji: '🐟',  color: '#3060a0', unlockShards: 1600,
    weakness: 'Thunder',  threat: 'Bioelectric field. Dehydrates prey.',
    lore: 'Bioluminescent flying manta-ray Elder that soaks prey with water before unleashing lightning. Patterns on its wings shift with its emotional state.' },
  { id: 'ashmaul',      name: 'ASHMAUL',            tier: 'G3',  type: 'Elder Boss',  location: 'Volcanic Abyss',
    emoji: '🌋',  color: '#8a2a10', unlockShards: 2400,
    weakness: 'Water',  threat: 'Magma core. Contact causes ignition.',
    lore: 'A corrupted Elder so saturated with Rift energy that its body produces molten rock. It cannot leave the Volcanic Abyss — the cold would kill it instantly.' },
  { id: 'chaoskrel',    name: 'CHAOSKREL',          tier: 'G3',  type: 'Elder Boss',  location: 'Rotten Hollow',
    emoji: '🕷️',  color: '#4a3060', unlockShards: 3400,
    weakness: 'Fire',  threat: 'Two-phase awakening. Rewrites terrain.',
    lore: 'Deep-earth entity that predates the Rift. In dormancy it resembles a cave formation. The second phase has never been survived by fewer than four hunters.' },
  { id: 'war_wyvern',   name: 'AETHORI WAR-WYVERN', tier: 'G4',  type: 'Riftborn',   location: 'Elder Sky Ruins',
    emoji: '🐲',  color: '#6a4fc2', unlockShards: 5000,
    weakness: 'Dragon',  threat: 'Rift-phase flight. Weapon systems unknown.',
    lore: 'A wyvern partially fused with pre-collapse Aethori technology. Its wings are partially mechanical. No hunter has confirmed what it is protecting in the Sky Ruins.' },
  { id: 'serath',       name: 'SERATH',             tier: 'G4',  type: 'Antagonist', location: '???',
    emoji: '👤',  color: '#c0a020', unlockShards: 7000,
    weakness: '???',  threat: 'Ancient. Pre-dates the Guild system.',
    lore: 'A figure who appears at the site of every major Rift expansion. Not Veilborn — something older. Voss believes Serath is the reason the Rift Shard chose you.' },
  { id: 'sovereign',    name: 'THE SOVEREIGN',      tier: '???', type: 'Rift Lord',  location: 'The Void',
    emoji: '◈',   color: '#8040ff', unlockShards: 10000,
    weakness: '???',  threat: '⚠ CLASSIFIED — VOIDWATCHER ACCORD',
    lore: '...' },
];

const QUESTS = [
  { id: 'patrol',   name: 'Patrol the Treeline',  duration: 25,  reward: { shards: 30,  mats: 1 }, location: 'Ancient Canopy',  unlockAt: 0 },
  { id: 'track',    name: 'Track Thornmane Signs', duration: 45,  reward: { shards: 65,  mats: 2 }, location: 'Ancient Canopy',  unlockAt: 100 },
  { id: 'relic',    name: 'Recover Rift Relic',    duration: 60,  reward: { shards: 90,  mats: 2, tokens: 1 }, location: 'Wildspire Waste', unlockAt: 300 },
  { id: 'waste',    name: 'Wildspire Deep Run',    duration: 90,  reward: { shards: 150, mats: 4 }, location: 'Wildspire Waste', unlockAt: 600 },
  { id: 'peaks',    name: 'Frosted Peak Ascent',   duration: 120, reward: { shards: 220, mats: 5 }, location: 'Frosted Peaks',   unlockAt: 1000 },
  { id: 'coral',    name: 'Coral Sky Survey',      duration: 150, reward: { shards: 310, mats: 7, tokens: 2 }, location: 'Coral Skyland',   unlockAt: 1800 },
  { id: 'abyss',    name: 'Volcanic Abyss Dive',   duration: 180, reward: { shards: 420, mats: 9 }, location: 'Volcanic Abyss',  unlockAt: 2800 },
  { id: 'hollow',   name: 'Rotten Hollow Descent', duration: 240, reward: { shards: 600, mats: 12, tokens: 3 }, location: 'Rotten Hollow',  unlockAt: 4000 },
  { id: 'ruins',    name: 'Elder Sky Ruins Raid',  duration: 300, reward: { shards: 900, mats: 18, tokens: 5 }, location: 'Elder Sky Ruins', unlockAt: 6000 },
];

// ── STATE ─────────────────────────────────────────────────────────────────────

const state = {
  shards: 0,
  totalShards: 0,
  mats: 0,
  tokens: 0,
  clickPower: 1,
  autoRate: 0,
  shardBonus: 0,
  questSpeed: 0,
  matBonus: 0,
  guild: null,
  upgrades: new Set(),
  unlockedMonsters: new Set(),
  activeQuest: null,
  questEnd: null,
  lastTick: Date.now(),
  gameWon: false,
};

// ── SAVE / LOAD ───────────────────────────────────────────────────────────────

function save() {
  const data = {
    shards: state.shards,
    totalShards: state.totalShards,
    mats: state.mats,
    tokens: state.tokens,
    clickPower: state.clickPower,
    autoRate: state.autoRate,
    shardBonus: state.shardBonus,
    questSpeed: state.questSpeed,
    matBonus: state.matBonus,
    guild: state.guild,
    upgrades: [...state.upgrades],
    unlockedMonsters: [...state.unlockedMonsters],
    activeQuest: state.activeQuest,
    questEnd: state.questEnd,
    gameWon: state.gameWon,
  };
  localStorage.setItem('rifthunter_idle', JSON.stringify(data));
}

function load() {
  try {
    const raw = localStorage.getItem('rifthunter_idle');
    if (!raw) return;
    const data = JSON.parse(raw);
    Object.assign(state, data);
    state.upgrades = new Set(data.upgrades || []);
    state.unlockedMonsters = new Set(data.unlockedMonsters || []);
  } catch (e) { /* ignore corrupt save */ }
}

function resetGame() {
  if (!confirm('Reset all progress?')) return;
  localStorage.removeItem('rifthunter_idle');
  location.reload();
}

// ── GAME LOGIC ────────────────────────────────────────────────────────────────

function tick() {
  const now = Date.now();
  const dt = Math.min((now - state.lastTick) / 1000, 5);
  state.lastTick = now;

  if (state.autoRate > 0) {
    const gain = state.autoRate * dt * (1 + state.shardBonus);
    addShards(gain);
  }

  checkMonsterUnlocks();
  checkQuestComplete();
  renderResources();
  renderQuestTimer();

  if (!state.gameWon && state.unlockedMonsters.size >= MONSTERS.length) {
    triggerEnding();
  }
}

function addShards(amount) {
  const actual = amount * (1 + state.shardBonus);
  state.shards += actual;
  state.totalShards += actual;
}

function onHuntClick() {
  if (!state.guild) return;
  const gain = state.clickPower * (1 + state.shardBonus);
  addShards(gain);
  animateClick();
}

function joinGuild(guildId) {
  if (state.guild) return;
  state.guild = guildId;
  document.getElementById('guild-select').style.display = 'none';
  renderAll();
  showToast(`Joined the ${GUILDS.find(g => g.id === guildId).name}!`);
}

function buyUpgrade(upgradeId) {
  const guildUpgrades = UPGRADES[state.guild] || [];
  const upg = guildUpgrades.find(u => u.id === upgradeId);
  if (!upg || state.upgrades.has(upgradeId)) return;

  const cost = upg.cost;
  if (state.shards < (cost.shards || 0)) return showToast('Not enough Rift Shards');
  if (state.mats < (cost.mats || 0)) return showToast('Not enough Materials');
  if (state.tokens < (cost.tokens || 0)) return showToast('Not enough Guild Tokens');

  state.shards -= (cost.shards || 0);
  state.mats   -= (cost.mats   || 0);
  state.tokens -= (cost.tokens || 0);

  state.upgrades.add(upgradeId);
  applyUpgradeEffect(upg.effect);

  showToast(`✓ ${upg.name} purchased!`);
  renderUpgrades();
  renderResources();
}

function applyUpgradeEffect(effect) {
  if (effect.clickPower) state.clickPower += effect.clickPower;
  if (effect.autoRate)   state.autoRate   += effect.autoRate;
  if (effect.shardBonus) state.shardBonus += effect.shardBonus;
  if (effect.questSpeed) state.questSpeed += effect.questSpeed;
  if (effect.matBonus)   state.matBonus   += effect.matBonus;
}

function reapplyAllEffects() {
  state.clickPower = 1;
  state.autoRate   = 0;
  state.shardBonus = 0;
  state.questSpeed = 0;
  state.matBonus   = 0;
  state.upgrades.forEach(id => {
    const allUpgrades = Object.values(UPGRADES).flat();
    const upg = allUpgrades.find(u => u.id === id);
    if (upg) applyUpgradeEffect(upg.effect);
  });
}

function startQuest(questId) {
  if (state.activeQuest) return showToast('Hunter is already on a quest');
  const quest = QUESTS.find(q => q.id === questId);
  if (!quest) return;
  const duration = quest.duration * (1 - Math.min(state.questSpeed, 0.75));
  state.activeQuest = questId;
  state.questEnd = Date.now() + duration * 1000;
  renderQuests();
  renderQuestTimer();
}

function checkQuestComplete() {
  if (!state.activeQuest || !state.questEnd) return;
  if (Date.now() < state.questEnd) return;

  const quest = QUESTS.find(q => q.id === state.activeQuest);
  state.activeQuest = null;
  state.questEnd = null;

  if (quest) {
    const shardsGained = (quest.reward.shards || 0) * (1 + state.shardBonus);
    const matsGained = (quest.reward.mats || 0) + state.matBonus;
    const tokensGained = quest.reward.tokens || 0;
    addShards(shardsGained);
    state.mats   += matsGained;
    state.tokens += tokensGained;
    showToast(`Quest complete! +${Math.floor(shardsGained)} shards, +${matsGained} mats${tokensGained ? `, +${tokensGained} tokens` : ''}`);
  }

  renderResources();
  renderQuests();
}

function checkMonsterUnlocks() {
  MONSTERS.forEach(m => {
    if (!state.unlockedMonsters.has(m.id) && state.totalShards >= m.unlockShards) {
      state.unlockedMonsters.add(m.id);
      showMonsterReveal(m);
    }
  });
}

function availableQuests() {
  return QUESTS.filter(q => state.totalShards >= q.unlockAt);
}

// ── RENDERING ─────────────────────────────────────────────────────────────────

function renderResources() {
  document.getElementById('res-shards').textContent  = formatNum(Math.floor(state.shards));
  document.getElementById('res-mats').textContent    = Math.floor(state.mats);
  document.getElementById('res-tokens').textContent  = Math.floor(state.tokens);
  document.getElementById('res-rate').textContent    = `+${formatNum((state.autoRate * (1 + state.shardBonus)).toFixed(1))}/s`;
  document.getElementById('res-click').textContent   = `+${formatNum(Math.floor(state.clickPower * (1 + state.shardBonus)))}/click`;
}

function renderAll() {
  renderResources();
  renderGuildArea();
  renderUpgrades();
  renderQuests();
  renderCodex();
}

function renderGuildArea() {
  const container = document.getElementById('guild-area');
  if (!state.guild) {
    container.innerHTML = '<p class="hint">Choose a guild to begin. Each has different strengths.</p>';
    return;
  }
  const g = GUILDS.find(g => g.id === state.guild);
  container.innerHTML = `
    <div class="guild-badge" style="--gc:${g.color};--ga:${g.accent}">
      <span class="guild-icon">${g.icon}</span>
      <div>
        <div class="guild-name">${g.name}</div>
        <div class="guild-motto">"${g.motto}"</div>
      </div>
    </div>
  `;
}

function renderUpgrades() {
  const container = document.getElementById('upgrades-list');
  if (!state.guild) { container.innerHTML = '<p class="hint">Join a guild to unlock upgrades.</p>'; return; }

  const guildUpgrades = UPGRADES[state.guild] || [];
  container.innerHTML = guildUpgrades.map(upg => {
    const owned = state.upgrades.has(upg.id);
    const canAfford = state.shards >= (upg.cost.shards || 0)
                   && state.mats   >= (upg.cost.mats   || 0)
                   && state.tokens >= (upg.cost.tokens  || 0);
    const costParts = [];
    if (upg.cost.shards) costParts.push(`💎 ${formatNum(upg.cost.shards)}`);
    if (upg.cost.mats)   costParts.push(`🪨 ${upg.cost.mats}`);
    if (upg.cost.tokens) costParts.push(`🏅 ${upg.cost.tokens}`);

    return `<div class="upgrade-card ${owned ? 'owned' : canAfford ? 'affordable' : ''}"
                 onclick="${owned ? '' : `buyUpgrade('${upg.id}')`}">
      <div class="upg-name">${upg.name} ${owned ? '✓' : ''}</div>
      <div class="upg-desc">${upg.desc}</div>
      ${owned ? '' : `<div class="upg-cost">${costParts.join(' · ')}</div>`}
    </div>`;
  }).join('');
}

function renderQuests() {
  const container = document.getElementById('quests-list');
  const available = availableQuests();

  if (available.length === 0) {
    container.innerHTML = '<p class="hint">Complete more hunts to unlock quests.</p>';
    return;
  }

  container.innerHTML = available.map(q => {
    const active = state.activeQuest === q.id;
    const busy   = !!state.activeQuest && !active;
    const rewardParts = [];
    if (q.reward.shards) rewardParts.push(`💎 ~${formatNum(Math.floor(q.reward.shards * (1 + state.shardBonus)))}`);
    if (q.reward.mats)   rewardParts.push(`🪨 ${q.reward.mats + state.matBonus}`);
    if (q.reward.tokens) rewardParts.push(`🏅 ${q.reward.tokens}`);
    const dur = Math.ceil(q.duration * (1 - Math.min(state.questSpeed, 0.75)));

    return `<div class="quest-card ${active ? 'active' : busy ? 'busy' : ''}">
      <div class="quest-header">
        <span class="quest-name">${q.name}</span>
        <span class="quest-loc">${q.location}</span>
      </div>
      <div class="quest-meta">
        <span class="quest-reward">${rewardParts.join(' · ')}</span>
        <span class="quest-dur">⏱ ${dur}s</span>
      </div>
      ${active ? '<div class="quest-progress"><div class="quest-bar" id="quest-bar"></div></div>' : ''}
      ${!active && !busy ? `<button class="quest-btn" onclick="startQuest('${q.id}')">Send Hunter</button>` : ''}
      ${busy ? '<span class="quest-status">Hunter away…</span>' : ''}
    </div>`;
  }).join('');
}

function renderQuestTimer() {
  if (!state.activeQuest || !state.questEnd) return;
  const bar = document.getElementById('quest-bar');
  if (!bar) return;
  const quest = QUESTS.find(q => q.id === state.activeQuest);
  if (!quest) return;
  const dur = quest.duration * (1 - Math.min(state.questSpeed, 0.75)) * 1000;
  const remaining = Math.max(0, state.questEnd - Date.now());
  const pct = ((dur - remaining) / dur) * 100;
  bar.style.width = pct + '%';
}

function renderCodex() {
  const container = document.getElementById('codex-grid');
  container.innerHTML = MONSTERS.map(m => {
    const revealed = state.unlockedMonsters.has(m.id);
    if (!revealed) {
      const pct = Math.min(100, Math.floor((state.totalShards / m.unlockShards) * 100));
      return `<div class="codex-card locked">
        <div class="codex-emoji">?</div>
        <div class="codex-name">UNKNOWN</div>
        <div class="codex-tier">${m.tier} · ${m.location}</div>
        <div class="codex-lock-bar"><div style="width:${pct}%"></div></div>
        <div class="codex-hint">${pct}% investigated</div>
      </div>`;
    }
    return `<div class="codex-card revealed" style="--mc:${m.color}" onclick="showMonsterDetail('${m.id}')">
      <div class="codex-emoji">${m.emoji}</div>
      <div class="codex-name">${m.name}</div>
      <div class="codex-tier">${m.tier} · ${m.type}</div>
      <div class="codex-loc">${m.location}</div>
      <div class="codex-weakness">Weak: ${m.weakness}</div>
    </div>`;
  }).join('');
}

// ── MODALS ────────────────────────────────────────────────────────────────────

function showMonsterReveal(monster) {
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-box reveal-modal" style="--mc:${monster.color}">
      <div class="reveal-header">⚠ NEW ENTRY UNLOCKED</div>
      <div class="reveal-emoji">${monster.emoji}</div>
      <div class="reveal-name">${monster.name}</div>
      <div class="reveal-tier">${monster.tier} · ${monster.type} · ${monster.location}</div>
      <div class="reveal-lore">${monster.lore}</div>
      <div class="reveal-stats">
        <span>Weakness: <b>${monster.weakness}</b></span>
        <span>Threat: <i>${monster.threat}</i></span>
      </div>
      <button class="modal-close" onclick="closeModal()">Add to Codex</button>
    </div>`;
  modal.style.display = 'flex';
  renderCodex();
  save();
}

function showMonsterDetail(monsterId) {
  const m = MONSTERS.find(x => x.id === monsterId);
  if (!m) return;
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-box" style="--mc:${m.color}">
      <div class="reveal-emoji">${m.emoji}</div>
      <div class="reveal-name">${m.name}</div>
      <div class="reveal-tier">${m.tier} · ${m.type} · ${m.location}</div>
      <div class="reveal-lore">${m.lore}</div>
      <div class="reveal-stats">
        <span>Weakness: <b>${m.weakness}</b></span>
        <span>Threat: <i>${m.threat}</i></span>
      </div>
      <button class="modal-close" onclick="closeModal()">Close</button>
    </div>`;
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function triggerEnding() {
  state.gameWon = true;
  save();
  setTimeout(() => {
    const modal = document.getElementById('modal');
    modal.innerHTML = `
      <div class="modal-box ending-modal">
        <div class="ending-glyph">◈</div>
        <h2 class="ending-title">THE SOVEREIGN STIRS</h2>
        <p class="ending-text">You have catalogued every Veilborn sighting. The Rift grows. Serath has been seen near the Void threshold. And the Sovereign — the entity that started all of this — has opened an eye.</p>
        <p class="ending-text">The real hunt hasn't begun yet.</p>
        <div class="ending-divider">— RIFT HUNTER —</div>
        <p class="ending-sub">A 2.5D action ARPG. Currently in development.</p>
        <a href="https://github.com/ravellerh/rift-hunter" target="_blank" class="ending-cta">
          Watch on GitHub → Follow Development
        </a>
        <button class="modal-close" style="margin-top:1rem" onclick="closeModal()">Keep playing</button>
      </div>`;
    modal.style.display = 'flex';
  }, 800);
}

// ── ANIMATION ─────────────────────────────────────────────────────────────────

function animateClick() {
  const btn = document.getElementById('hunt-btn');
  btn.classList.remove('clicked');
  void btn.offsetWidth;
  btn.classList.add('clicked');

  const floater = document.createElement('div');
  floater.className = 'floater';
  floater.textContent = `+${formatNum(Math.floor(state.clickPower * (1 + state.shardBonus)))}`;
  btn.appendChild(floater);
  setTimeout(() => floater.remove(), 900);
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('visible'), 2800);
}

// ── UTIL ──────────────────────────────────────────────────────────────────────

function formatNum(n) {
  n = Number(n);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return String(Math.floor(n));
}

// ── INIT ──────────────────────────────────────────────────────────────────────

function buildGuildSelect() {
  const grid = document.getElementById('guild-grid');
  grid.innerHTML = GUILDS.map(g => `
    <div class="guild-card" style="--gc:${g.color};--ga:${g.accent}" onclick="joinGuild('${g.id}')">
      <div class="gc-icon">${g.icon}</div>
      <div class="gc-name">${g.name}</div>
      <div class="gc-desc">${g.desc}</div>
    </div>`).join('');
}

function init() {
  load();
  reapplyAllEffects();
  buildGuildSelect();
  if (state.guild) {
    document.getElementById('guild-select').style.display = 'none';
  }
  renderAll();
  setInterval(tick, 100);
  setInterval(save, 10000);
  document.getElementById('hunt-btn').addEventListener('click', onHuntClick);
}

window.addEventListener('DOMContentLoaded', init);
