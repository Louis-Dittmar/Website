/**
 * Collatz Universe Simulation
 * Uses local .wav files: add.wav, drop.wav, error.wav, jump.wav, woosh.wav
 */

  // --- Global Settings ---
const settings = {
    springForce: 0.03,
    lineWidth: 2.0
  };

// --- Audio Engine ---
const AudioEngine = {
  ctx: null,
  enabled: false,
  buffers: {},
  fileMap: {
    'spawn': 'drop.wav',   // Neue Kugel
    'ui': 'add.wav',       // Button Klick
    'error': 'error.wav',  // Fehler
    'jump': 'jump.wav',    // Start Manuell / Reset
    'woosh': 'woosh.wav'   // Ggf. für schnelle Bewegung
  },

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.loadSounds();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  async loadSounds() {
    for (const [key, filename] of Object.entries(this.fileMap)) {
      try {
        const response = await fetch(filename);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        this.buffers[key] = audioBuffer;
        console.log(`Loaded ${filename} as ${key}`);
      } catch (e) {
        console.warn(`Audio '${filename}' konnte nicht geladen werden. Prüfe Ordnerstruktur/CORS.`, e);
      }
    }
  },

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
    }
    return this.enabled;
  },

  playSound(type, val = null) {
    if (!this.enabled || !this.ctx || !this.buffers[type]) return;

    const source = this.ctx.createBufferSource();
    source.buffer = this.buffers[type];

    // Pitch Shift für 'spawn' basierend auf dem Wert der Zahl
    if (type === 'spawn' && val !== null) {
      // Mapping: Kleine Zahlen = tiefer/original, Große Zahlen = schneller/höher
      // Wir nutzen eine logarithmische Skala, damit es musikalisch bleibt
      const semitone = Math.sqrt(val) % 12; // Modulo 12 für Oktaveffekte
      // PlaybackRate: 1.0 ist normal. Höher ist schneller/höher.
      const rate = Math.pow(1.05946, semitone);
      // Begrenzen, damit es nicht zu extrem wird (0.5x bis 2.5x Speed)
      source.playbackRate.value = Math.max(0.5, Math.min(2.5, rate));
    }

    const gain = this.ctx.createGain();
    gain.gain.value = 0.4; // Lautstärke etwas reduzieren

    source.connect(gain);
    gain.connect(this.ctx.destination);

    source.start(0);
  }
};

// --- Physics Constants ---
const RAD = 16;
const ARROW_HEAD_LEN = 14;
const TARGET_DIST = 90;
const FRICTION = 0.85;
const REPULSION = 600;

// --- Classes ---

class Num {
  constructor(val, world, startX, startY) {
    this.val = val;
    this.world = world;

    this.x = startX || Math.random() * world.w;
    this.y = startY || Math.random() * world.h;
    this.vx = 0;
    this.vy = 0;

    this.birthTime = Date.now();
    this.target = null;

    // Zeitstempel der letzten Hover-Aktion
    this.lastHoverTime = 0;
  }

  applyPhysics(speed) {
    if (ui.dragging === this) {
      this.x = (ui.mouseX - this.world.panX) / this.world.scale;
      this.y = (ui.mouseY - this.world.panY) / this.world.scale;
      this.vx = 0;
      this.vy = 0;
      return;
    }

    // 1. Spring Force (Variable via Settings)
    if (this.target) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0) {
        const force = (dist - TARGET_DIST) * settings.springForce;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        this.vx += fx;
        this.vy += fy;

        this.target.vx -= fx;
        this.target.vy -= fy;
      }
    }

    // 2. Repulsion
    for (let other of this.world.nums) {
      if (other === this) continue;
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < 30000 && distSq > 0.1) {
        const dist = Math.sqrt(distSq);
        const force = REPULSION / distSq;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
    }

    // 3. Center Gravity
    this.vx += (0 - this.x) * 0.00015;
    this.vy += (0 - this.y) * 0.00015;

    // Apply Friction
    this.vx *= FRICTION;
    this.vy *= FRICTION;

    this.x += this.vx * speed;
    this.y += this.vy * speed;
  }

  calculateStepsTo1() {
    let cursor = this.val;
    let steps = 0;
    const maxIter = 5000;

    while (cursor !== 1 && steps < maxIter) {
      if (cursor > 9007199254740991) return "> MAX";

      if (cursor % 2 === 0) {
        cursor = Math.floor(cursor / 2);
      } else {
        cursor = cursor * this.world.a + this.world.b;
      }
      steps++;
    }

    if (cursor !== 1) return "> " + maxIter;
    return steps;
  }

  draw(ctx) {
    const hue = this.getHue();

    const isStickyHover = (Date.now() - this.lastHoverTime) < 3000;

    // Draw Arrow
    if (this.target) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const angle = Math.atan2(dy, dx);
      const dist = Math.sqrt(dx * dx + dy * dy);

      const startX = this.x + Math.cos(angle) * (RAD + 2);
      const startY = this.y + Math.sin(angle) * (RAD + 2);
      const endX = this.target.x - Math.cos(angle) * (RAD + 6);
      const endY = this.target.y - Math.sin(angle) * (RAD + 6);

      if (dist > RAD * 2) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);

        const grad = ctx.createLinearGradient(this.x, this.y, this.target.x, this.target.y);
        grad.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.4)`);
        grad.addColorStop(1, `hsla(${this.target.getHue()}, 70%, 50%, 0.4)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = settings.lineWidth;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - ARROW_HEAD_LEN * Math.cos(angle - Math.PI / 7), endY - ARROW_HEAD_LEN * Math.sin(angle - Math.PI / 7));
        ctx.lineTo(endX - ARROW_HEAD_LEN * Math.cos(angle + Math.PI / 7), endY - ARROW_HEAD_LEN * Math.sin(angle + Math.PI / 7));
        ctx.lineTo(endX, endY);
        ctx.fillStyle = `hsl(${this.target.getHue()}, 70%, 50%)`;
        ctx.fill();
      }
    }

    // Draw Circle
    let scale = 1;
    const age = Date.now() - this.birthTime;
    if (age < 400) scale *= age / 400;

    if (isStickyHover) {
      scale = 1.15;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, RAD * scale, 0, Math.PI * 2);

    if (isStickyHover) {
      ctx.fillStyle = `hsla(${hue}, 80%, 40%, 0.95)`;
    } else {
      ctx.fillStyle = `hsla(${hue}, 60%, 10%, 0.9)`;
    }

    ctx.fill();

    ctx.strokeStyle = `hsl(${hue}, 80%, 60%)`;
    ctx.lineWidth = isStickyHover ? 3 : 2;
    ctx.stroke();

    // Text
    if (scale > 0.5) {
      ctx.fillStyle = '#fff';
      let fontSize = 12;
      const strVal = this.val.toString();
      if (strVal.length > 3) fontSize = 10;
      if (strVal.length > 5) fontSize = 8;

      ctx.font = `bold ${fontSize * scale}px 'JetBrains Mono'`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.val, this.x, this.y);
    }

    // Schritte anzeigen
    if (isStickyHover) {
      const steps = this.calculateStepsTo1();
      ctx.fillStyle = '#aaa';
      ctx.font = '10px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.fillText(`${steps} Schritte`, this.x, this.y - (RAD * scale) - 10);
    }
  }

  getHue() {
    return (Math.log(this.val) * 40) % 360;
  }
}

class World {
  constructor() {
    this.a = 3;
    this.b = 1;
    this.nums = [];
    this.lookup = new Map();
    this.queue = [];

    this.timer = 0;
    this.spawnTimer = 0;
    this.seed = 2;

    this.scale = 1.0;
    this.panX = window.innerWidth / 2;
    this.panY = window.innerHeight / 2;

    this.mode = 'auto';
  }

  setRules(a, b) {
    this.a = a;
    this.b = b;
    this.reset();
  }

  reset() {
    this.nums = [];
    this.lookup = new Map();
    this.queue = [];
    this.seed = 1;
    this.timer = 0;
    this.spawnTimer = 0;
    this.spawnNumber(1);
    AudioEngine.playSound('jump'); // Reset Sound
  }

  update(speed) {
    const physicsSpeed = (speed <= 0) ? 1.0 : speed;
    for (let n of this.nums) {
      n.applyPhysics(physicsSpeed);
    }

    const hovered = this.getHoveredNum(ui.mouseX, ui.mouseY);
    if (hovered) {
      hovered.lastHoverTime = Date.now();
    }

    if (speed <= 0) return;

    if (this.queue.length === 0) {
      if (this.mode === 'auto') {
        this.timer += speed;
        if (this.timer >= parseInt(document.getElementById('spawnRateSlider').value)) {
          this.timer = 0;
          this.autoFindNextSequence();
        }
      }
    } else {
      this.spawnTimer += speed;
      if (this.spawnTimer >= 5) {
        const nextVal = this.queue.shift();
        this.spawnNumber(nextVal);
        this.spawnTimer = 0;
      }
    }
  }

  autoFindNextSequence() {
    let startVal = this.seed;
    let safety = 0;
    while (this.lookup.has(startVal) && safety < 10000) {
      startVal++;
      safety++;
    }
    this.seed = startVal;
    this.calculateChain(startVal);
  }

  startManualSequence(val) {
    if (this.lookup.has(val)) {
      const n = this.lookup.get(val);
      n.birthTime = Date.now();
      n.lastHoverTime = Date.now(); // Highlighten
      AudioEngine.playSound('ui'); // Kleines Feedback
      return;
    }
    AudioEngine.playSound('jump'); // Start Sound
    this.calculateChain(val);
  }

  calculateChain(startVal) {
    let cursor = startVal;
    let chain = [];
    let steps = 0;

    while (!this.lookup.has(cursor) && steps < 200 && cursor < 100000000) {
      chain.push(cursor);
      let next;
      if (cursor % 2 === 0) {
        next = Math.floor(cursor / 2);
      } else {
        next = cursor * this.a + this.b;
      }
      cursor = next;
      steps++;
      if (cursor < 1) break;
    }

    chain.reverse();
    this.queue = chain;
  }

  spawnNumber(val) {
    if (this.lookup.has(val)) return;

    let nextVal;
    if (val % 2 === 0) nextVal = val / 2;
    else nextVal = val * this.a + this.b;

    let startX, startY;
    const targetObj = this.lookup.get(nextVal);

    if (targetObj) {
      const angle = Math.random() * Math.PI * 2;
      const dist = TARGET_DIST * 0.8;
      startX = targetObj.x + Math.cos(angle) * dist;
      startY = targetObj.y + Math.sin(angle) * dist;
    } else {
      startX = (Math.random() - 0.5) * 100;
      startY = (Math.random() - 0.5) * 100;
    }

    const newNum = new Num(val, this, startX, startY);

    if (targetObj) {
      newNum.target = targetObj;
    }

    this.nums.push(newNum);
    this.lookup.set(val, newNum);

    // Spielen wir den "Drop" Sound ab (oder Spawn)
    AudioEngine.playSound('spawn', val);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.panX, this.panY);
    ctx.scale(this.scale, this.scale);

    // Draw numbers
    for (let n of this.nums) {
      n.draw(ctx);
    }

    ctx.restore();
  }

  getHoveredNum(mx, my) {
    const wx = (mx - this.panX) / this.scale;
    const wy = (my - this.panY) / this.scale;

    for (let i = this.nums.length - 1; i >= 0; i--) {
      const n = this.nums[i];
      const dx = wx - n.x;
      const dy = wy - n.y;
      if (dx * dx + dy * dy < (RAD + 5) * (RAD + 5)) {
        return n;
      }
    }
    return null;
  }
}

// --- Main Application ---

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

const ui = {
  mouseX: 0,
  mouseY: 0,
  dragging: null,
  isPanning: false,
  world: new World()
};

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function loop() {
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const speed = parseFloat(document.getElementById('speedSlider').value);

  drawGrid();

  if (ui.world) {
    ui.world.update(speed);
    ui.world.draw(ctx);

    const hovered = ui.world.getHoveredNum(ui.mouseX, ui.mouseY);

    if (ui.isPanning || ui.dragging) {
      canvas.style.cursor = 'grabbing';
    } else if (hovered) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'grab';
    }
  }

  requestAnimationFrame(loop);
}

function drawGrid() {
  ctx.save();
  ctx.translate(ui.world.panX, ui.world.panY);
  ctx.scale(ui.world.scale, ui.world.scale);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;

  const gridSize = 200;
  const limit = 20;
  ctx.beginPath();
  for (let i = -limit; i <= limit; i++) {
    ctx.moveTo(i * gridSize, -limit * gridSize);
    ctx.lineTo(i * gridSize, limit * gridSize);
    ctx.moveTo(-limit * gridSize, i * gridSize);
    ctx.lineTo(limit * gridSize, i * gridSize);
  }
  ctx.stroke();

  ctx.strokeStyle = 'rgba(100, 100, 255, 0.1)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-50, 0);
  ctx.lineTo(50, 0);
  ctx.moveTo(0, -50);
  ctx.lineTo(0, 50);
  ctx.stroke();

  ctx.restore();
}

// --- Interaction & Events ---

window.addEventListener('resize', resize);
resize();

canvas.addEventListener('wheel', e => {
  e.preventDefault();
  const zoomIntensity = 0.1;
  const delta = e.deltaY < 0 ? 1 : -1;
  const zoomFactor = Math.exp(delta * zoomIntensity);

  const wx = (ui.mouseX - ui.world.panX) / ui.world.scale;
  const wy = (ui.mouseY - ui.world.panY) / ui.world.scale;

  ui.world.scale *= zoomFactor;

  ui.world.panX = ui.mouseX - wx * ui.world.scale;
  ui.world.panY = ui.mouseY - wy * ui.world.scale;
}, {passive: false});

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  ui.mouseX = e.clientX - rect.left;
  ui.mouseY = e.clientY - rect.top;

  if (ui.isPanning) {
    ui.world.panX += e.movementX;
    ui.world.panY += e.movementY;
  }
});

canvas.addEventListener('mousedown', e => {
  AudioEngine.init();

  if (e.button === 1 || e.button === 2) {
    ui.isPanning = true;
    return;
  }

  const hovered = ui.world.getHoveredNum(ui.mouseX, ui.mouseY);
  if (hovered) {
    ui.dragging = hovered;
  } else {
    ui.isPanning = true;
  }
});

window.addEventListener('mouseup', () => {
  ui.dragging = null;
  ui.isPanning = false;
});

canvas.addEventListener('contextmenu', e => e.preventDefault());

// --- Controls ---

const btnAuto = document.getElementById('modeAuto');
const btnManual = document.getElementById('modeManual');
const divManual = document.getElementById('manualControls');

function setMode(mode) {
  AudioEngine.playSound('ui');
  ui.world.mode = mode;
  if (mode === 'auto') {
    btnAuto.classList.add('active');
    btnManual.classList.remove('active');
    divManual.classList.add('hidden');
  } else {
    btnAuto.classList.remove('active');
    btnManual.classList.add('active');
    divManual.classList.remove('hidden');
  }
}

btnAuto.addEventListener('click', () => setMode('auto'));
btnManual.addEventListener('click', () => setMode('manual'));

document.getElementById('manualSpawnBtn').addEventListener('click', () => {
  const val = parseInt(document.getElementById('manualInput').value);
  if (val && val > 0) {
    ui.world.startManualSequence(val);
    document.getElementById('manualInput').value = '';
  } else {
    AudioEngine.playSound('error');
  }
});

document.getElementById('manualInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('manualSpawnBtn').click();
  }
});

document.getElementById('toggleAudio').addEventListener('click', (e) => {
  const isOn = AudioEngine.toggle();
  e.target.innerText = "Sound: " + (isOn ? "AN" : "AUS");
  e.target.style.color = isOn ? "#8f8" : "#fff";
  AudioEngine.playSound('ui');
});

document.getElementById('resetBtn').addEventListener('click', () => {
  const a = parseInt(document.getElementById('ruleA').value) || 3;
  const b = parseInt(document.getElementById('ruleB').value) || 1;
  ui.world.setRules(a, b);
});

document.getElementById('applyRuleBtn').addEventListener('click', () => {
  const a = parseInt(document.getElementById('ruleA').value) || 3;
  const b = parseInt(document.getElementById('ruleB').value) || 1;
  ui.world.setRules(a, b);
  AudioEngine.playSound('ui');
});

// Update settings on input
document.getElementById('springForceSlider').addEventListener('input', (e) => {
  settings.springForce = parseFloat(e.target.value);
});
document.getElementById('lineWidthSlider').addEventListener('input', (e) => {
  settings.lineWidth = parseFloat(e.target.value);
});

// Init
resize();
ui.world.spawnNumber(1);
loop();
