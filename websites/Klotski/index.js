"use strict";

const DIRECTIONS = [
  {dx: 1, dy: 0}, {dx: -1, dy: 0}, {dx: 0, dy: 1}, {dx: 0, dy: -1}
];

const dom = {
  buildGraph: document.getElementById("build-graph"),
  clearBoard: document.getElementById("clear-board"),
  loadDefault: document.getElementById("load-default"),
  boardCanvas: document.getElementById("board-canvas"),
  graphCanvas: document.getElementById("graph-canvas"),
  piecesContainer: document.getElementById("pieces-container"),
  stats: document.getElementById("stats"),
  speedVal: document.getElementById("speed-val")
};

const boardCtx = dom.boardCanvas.getContext("2d");
const graphCtx = dom.graphCanvas.getContext("2d");

const state = {
  boardWidth: 4, boardHeight: 5,
  pieces: [], nextPieceId: 1,
  goalPieceId: null,
  selectedTool: {w: 1, h: 1},
  boardDrag: {active: false, pieceIndex: -1, startX: 0, startY: 0, startPX: 0, startPY: 0, changed: false},

  // Minecraft Fly Camera
  camera: {
    x: 0, y: 0, z: 100,
    yaw: 0, pitch: 0,
    speed: 1.0,
    lookActive: false,
    lastMouseX: 0, lastMouseY: 0
  },
  keys: {},
  graph: null, activeNodeIndex: 0, renderRequested: true
};

function initialize() {
  loadStandardPuzzle();
  bindEvents();
  resize();

  // High-frequency input handling & Rendering
  let lastTime = performance.now();

  function loop(now) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    handleMovement(dt);
    renderGraph();
    requestAnimationFrame(loop);
  }

  loop(performance.now());
}

function bindEvents() {
  dom.clearBoard.onclick = clearBoard;
  dom.loadDefault.onclick = loadStandardPuzzle;
  dom.buildGraph.onclick = buildUniverse;

  document.querySelectorAll(".tool-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".tool-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.selectedTool = {w: parseInt(btn.dataset.w), h: parseInt(btn.dataset.h)};
    };
  });

  // Board Interaction
  dom.boardCanvas.onmousedown = (e) => {
    const pt = getCanvasPoint(e, dom.boardCanvas);
    const cell = pointToCell(pt.x, pt.y);
    if (!cell) return;
    const idx = state.pieces.findIndex(p => cell.x >= p.x && cell.x < p.x + p.w && cell.y >= p.y && cell.y < p.y + p.h);

    if (e.shiftKey && idx >= 0) {
      removePiece(state.pieces[idx].id);
      return;
    }
    if (idx < 0) {
      addPieceAt(cell.x, cell.y);
      return;
    }

    const p = state.pieces[idx];
    state.boardDrag = {
      active: true,
      pieceIndex: idx,
      startX: pt.x,
      startY: pt.y,
      startPX: p.x,
      startPY: p.y,
      changed: false
    };
  };

  window.onmouseup = () => {
    state.boardDrag.active = false;
    state.camera.lookActive = false;
    renderBoard();
  };

  dom.boardCanvas.onmousemove = (e) => {
    if (!state.boardDrag.active) return;
    const pt = getCanvasPoint(e, dom.boardCanvas);
    const p = state.pieces[state.boardDrag.pieceIndex];
    const cellS = dom.boardCanvas.width / state.boardWidth;

    let dx = Math.round((pt.x - state.boardDrag.startX) / cellS);
    let dy = Math.round((pt.y - state.boardDrag.startY) / cellS);

    let nx = state.boardDrag.startPX + dx, ny = state.boardDrag.startPY + dy;

    // Axis constraint
    if (p.w === 1 && p.h > 1) nx = p.x;
    if (p.h === 1 && p.w > 1) ny = p.y;

    nx = Math.max(0, Math.min(state.boardWidth - p.w, nx));
    ny = Math.max(0, Math.min(state.boardHeight - p.h, ny));

    if ((nx !== p.x || ny !== p.y) && canPlace(nx, ny, p.w, p.h, state.boardDrag.pieceIndex)) {
      p.x = nx;
      p.y = ny;
      if (!syncGraph()) state.boardDrag.changed = true;
      renderBoard();
    }
  };

  // Graph Camera (Minecraft-like)
  dom.graphCanvas.oncontextmenu = e => e.preventDefault();
  dom.graphCanvas.onmousedown = (e) => {
    state.camera.lookActive = true;
    state.camera.lastMouseX = e.clientX;
    state.camera.lastMouseY = e.clientY;
  };

  window.onmousemove = (e) => {
    if (!state.camera.lookActive) return;
    const dx = e.clientX - state.camera.lastMouseX;
    const dy = e.clientY - state.camera.lastMouseY;
    state.camera.yaw += dx * 0.003;
    state.camera.pitch -= dy * 0.003;
    state.camera.pitch = Math.max(-1.5, Math.min(1.5, state.camera.pitch));
    state.camera.lastMouseX = e.clientX;
    state.camera.lastMouseY = e.clientY;
  };

  window.onkeydown = (e) => {
    if (e.target.tagName === "INPUT") return;
    state.keys[e.code] = true;
  };
  window.onkeyup = (e) => {
    state.keys[e.code] = false;
  };

  dom.graphCanvas.onwheel = (e) => {
    e.preventDefault();
    state.camera.speed *= (e.deltaY < 0 ? 1.2 : 0.83);
    state.camera.speed = Math.max(0.1, Math.min(50, state.camera.speed));
    dom.speedVal.textContent = state.camera.speed.toFixed(1);
  };

  dom.graphCanvas.ondblclick = (e) => {
    const pt = getCanvasPoint(e, dom.graphCanvas);
    if (!state.graph) return;
    let best = -1, minDist = 30;
    state.graph.projs.forEach((p, i) => {
      const d = Math.hypot(p.x - pt.x, p.y - pt.y);
      if (d < minDist) {
        minDist = d;
        best = i;
      }
    });
    if (best !== -1) selectNode(best);
  };

  window.onresize = resize;
}

function handleMovement(dt) {
  const c = state.camera;
  const speed = c.speed * 80 * dt;

  const forwardX = Math.sin(c.yaw);
  const forwardZ = -Math.cos(c.yaw);
  const rightX = Math.cos(c.yaw);
  const rightZ = Math.sin(c.yaw);

  if (state.keys['KeyW']) {
    c.x += forwardX * speed;
    c.z += forwardZ * speed;
  }
  if (state.keys['KeyS']) {
    c.x -= forwardX * speed;
    c.z -= forwardZ * speed;
  }
  if (state.keys['KeyA']) {
    c.x -= rightX * speed;
    c.z -= rightZ * speed;
  }
  if (state.keys['KeyD']) {
    c.x += rightX * speed;
    c.z += rightZ * speed;
  }
  if (state.keys['Space']) {
    c.y += speed;
  }
  if (state.keys['ShiftLeft']) {
    c.y -= speed;
  }
}

function renderBoard() {
  const cw = dom.boardCanvas.width, ch = dom.boardCanvas.height;
  boardCtx.clearRect(0, 0, cw, ch);
  const cell = cw / state.boardWidth;

  boardCtx.strokeStyle = "#222";
  for (let i = 0; i <= state.boardWidth; i++) {
    boardCtx.beginPath();
    boardCtx.moveTo(i * cell, 0);
    boardCtx.lineTo(i * cell, ch);
    boardCtx.stroke();
  }
  for (let i = 0; i <= state.boardHeight; i++) {
    boardCtx.beginPath();
    boardCtx.moveTo(0, i * cell);
    boardCtx.lineTo(cw, i * cell);
    boardCtx.stroke();
  }

  state.pieces.forEach(p => {
    boardCtx.fillStyle = p.color;
    boardCtx.shadowBlur = 5;
    boardCtx.shadowColor = p.color;
    boardCtx.fillRect(p.x * cell + 2, p.y * cell + 2, p.w * cell - 4, p.h * cell - 4);
    boardCtx.shadowBlur = 0;
    if (p.id === state.goalPieceId) {
      boardCtx.strokeStyle = "#fff";
      boardCtx.lineWidth = 2;
      boardCtx.strokeRect(p.x * cell + 4, p.y * cell + 4, p.w * cell - 8, p.h * cell - 8);
    }
  });
}

function renderGraph() {
  const w = dom.graphCanvas.width, h = dom.graphCanvas.height;
  graphCtx.fillStyle = "#020205";
  graphCtx.fillRect(0, 0, w, h);
  if (!state.graph) return;

  const projs = state.graph.projs = state.graph.coords.map(c => project(c, w, h));

  // Edges (Red Lines)
  graphCtx.strokeStyle = "rgba(255, 50, 50, 0.4)";
  graphCtx.lineWidth = 1;
  graphCtx.beginPath();
  state.graph.edges.forEach(e => {
    const p1 = projs[e[0]], p2 = projs[e[1]];
    if (p1.clip || p2.clip) return;
    graphCtx.moveTo(p1.x, p1.y);
    graphCtx.lineTo(p2.x, p2.y);
  });
  graphCtx.stroke();

  // Nodes (White Points)
  projs.forEach((p, i) => {
    if (p.clip) return;
    const active = i === state.activeNodeIndex;
    const size = Math.max(1, (100 / p.dist) * (active ? 4 : 1.5));
    graphCtx.fillStyle = active ? "#ffff00" : `rgba(255,255,255,${Math.min(1, 200 / p.dist)})`;
    graphCtx.beginPath();
    graphCtx.arc(p.x, p.y, size, 0, Math.PI * 2);
    graphCtx.fill();
  });
}

function project(c, w, h) {
  const cam = state.camera;
  // Translate
  let x = c[0] - cam.x, y = c[1] - cam.y, z = c[2] - cam.z;
  // Rotate Yaw
  let cosY = Math.cos(-cam.yaw), sinY = Math.sin(-cam.yaw);
  let nx = x * cosY - z * sinY;
  let nz = x * sinY + z * cosY;
  // Rotate Pitch
  let cosP = Math.cos(-cam.pitch), sinP = Math.sin(-cam.pitch);
  let ny = y * cosP - nz * sinP;
  let nzz = y * sinP + nz * cosP;

  if (nzz <= 1) return {clip: true};
  const fov = Math.min(w, h) * 0.8;
  const s = fov / nzz;
  return {x: w / 2 + nx * s, y: h / 2 - ny * s, dist: nzz, clip: false};
}

async function buildUniverse() {
  const btn = dom.buildGraph;
  btn.textContent = "Processing...";
  await yieldToBrowser();
  try {
    const startPos = new Int16Array(state.pieces.length * 2);
    state.pieces.forEach((p, i) => {
      startPos[i * 2] = p.x;
      startPos[i * 2 + 1] = p.y;
    });
    const defs = state.pieces.map(p => ({id: p.id, w: p.w, h: p.h}));
    const groups = buildGroups(defs);
    const encode = (p) => groups.map(g => g.idx.map(i => p[i * 2 + 1] * state.boardWidth + p[i * 2]).sort((a, b) => a - b).join(",")).join("|");

    const nodes = [], nodeByKey = new Map(), adj = [], queue = [0];
    nodeByKey.set(encode(startPos), 0);
    nodes.push({pos: startPos});
    adj.push(new Set());

    let head = 0;
    while (head < queue.length && nodes.length < 15000) {
      const idx = queue[head++];
      const curr = nodes[idx];
      const occ = new Int16Array(state.boardWidth * state.boardHeight).fill(-1);
      defs.forEach((d, i) => {
        for (let yy = 0; yy < d.h; yy++) for (let xx = 0; xx < d.w; xx++) occ[(curr.pos[i * 2 + 1] + yy) * state.boardWidth + (curr.pos[i * 2] + xx)] = i;
      });

      for (let i = 0; i < defs.length; i++) {
        for (const d of DIRECTIONS) {
          const p = defs[i];
          if (p.w === 1 && p.h > 1 && d.dx !== 0) continue;
          if (p.h === 1 && p.w > 1 && d.dy !== 0) continue;
          const nx = curr.pos[i * 2] + d.dx, ny = curr.pos[i * 2 + 1] + d.dy;
          if (nx < 0 || ny < 0 || nx + p.w > state.boardWidth || ny + p.h > state.boardHeight) continue;
          let ok = true;
          for (let yy = 0; yy < p.h; yy++) for (let xx = 0; xx < p.w; xx++) {
            const o = occ[(ny + yy) * state.boardWidth + (nx + xx)];
            if (o !== -1 && o !== i) ok = false;
          }
          if (!ok) continue;
          const nextPos = curr.pos.slice();
          nextPos[i * 2] = nx;
          nextPos[i * 2 + 1] = ny;
          const key = encode(nextPos);
          let nIdx = nodeByKey.get(key);
          if (nIdx === undefined) {
            nIdx = nodes.length;
            nodeByKey.set(key, nIdx);
            nodes.push({pos: nextPos});
            adj.push(new Set());
            queue.push(nIdx);
          }
          adj[idx].add(nIdx);
          adj[nIdx].add(idx);
        }
      }
      if (head % 500 === 0) await yieldToBrowser();
    }

    const coords = await generateLayout(adj);
    state.graph = {
      nodes,
      edges: adj.flatMap((s, i) => Array.from(s).filter(nb => nb > i).map(nb => [i, nb])),
      nodeByKey,
      groups,
      coords
    };
    state.activeNodeIndex = 0;
    state.camera.x = 0;
    state.camera.y = 0;
    state.camera.z = 150; // Reset cam
    dom.stats.textContent = `Nodes: ${nodes.length} | Edges: ${state.graph.edges.length}`;
  } finally {
    btn.textContent = "Berechne Universum";
  }
}

async function generateLayout(adj) {
  const n = adj.length;
  const coords = Array.from({length: n}, () => new Float32Array(3));
  const anchors = [0];
  // 3 anchors for 3D
  for (let d = 0; d < 3; d++) {
    const dists = bfs(adj, anchors[anchors.length - 1]);
    let best = 0, max = -1;
    for (let i = 0; i < n; i++) if (dists[i] > max) {
      max = dists[i];
      best = i;
    }
    anchors.push(best);
  }
  const d0 = bfs(adj, anchors[0]), d1 = bfs(adj, anchors[1]), d2 = bfs(adj, anchors[2]), d3 = bfs(adj, anchors[3]);

  for (let i = 0; i < n; i++) {
    coords[i][0] = (d1[i] - d0[i]) * 15;
    coords[i][1] = (d2[i] - d0[i]) * 15;
    coords[i][2] = (d3[i] - d0[i]) * 15;
  }
  return coords;
}

function bfs(adj, start) {
  const dist = new Int32Array(adj.length).fill(-1);
  const q = [start];
  dist[start] = 0;
  let h = 0;
  while (h < q.length) {
    const u = q[h++];
    for (const v of adj[u]) if (dist[v] === -1) {
      dist[v] = dist[u] + 1;
      q.push(v);
    }
  }
  return dist;
}

function syncGraph() {
  if (!state.graph) return false;
  const pos = new Int16Array(state.pieces.length * 2);
  state.pieces.forEach((p, i) => {
    pos[i * 2] = p.x;
    pos[i * 2 + 1] = p.y;
  });
  const key = encodePositions(pos, state.graph.groups, state.boardWidth);
  const idx = state.graph.nodeByKey.get(key);
  if (idx !== undefined) {
    state.activeNodeIndex = idx;
    return true;
  }
  return false;
}

function selectNode(id) {
  state.activeNodeIndex = id;
  const n = state.graph.nodes[id];
  state.pieces.forEach((p, i) => {
    p.x = n.pos[i * 2];
    p.y = n.pos[i * 2 + 1];
  });
  renderBoard();
}

function addPieceAt(x, y) {
  const {w, h} = state.selectedTool;
  if (canPlace(x, y, w, h)) {
    const p = {id: state.nextPieceId++, x, y, w, h, color: `hsl(${Math.random() * 360}, 70%, 50%)`};
    state.pieces.push(p);
    if (!state.goalPieceId) state.goalPieceId = p.id;
    state.graph = null;
    renderBoard();
    renderPieceList();
  }
}

function removePiece(id) {
  state.pieces = state.pieces.filter(p => p.id !== id);
  if (state.goalPieceId === id) state.goalPieceId = state.pieces[0]?.id || null;
  state.graph = null;
  renderBoard();
  renderPieceList();
}

function clearBoard() {
  state.pieces = [];
  state.nextPieceId = 1;
  state.goalPieceId = null;
  state.graph = null;
  renderBoard();
  renderPieceList();
}

function loadStandardPuzzle() {
  state.pieces = [];
  state.nextPieceId = 1;
  const p = (w, h, x, y, c) => state.pieces.push({
    id: state.nextPieceId++,
    w,
    h,
    x,
    y,
    color: c || `hsl(${Math.random() * 360}, 60%, 50%)`
  });
  p(2, 2, 1, 0, "#f33");
  p(1, 2, 0, 0);
  p(1, 2, 3, 0);
  p(1, 2, 0, 2);
  p(1, 2, 3, 2);
  p(2, 1, 1, 2);
  p(1, 1, 1, 3);
  p(1, 1, 2, 3);
  p(1, 1, 0, 4);
  p(1, 1, 3, 4);
  state.goalPieceId = state.pieces[0].id;
  state.graph = null;
  renderBoard();
  renderPieceList();
}

function renderPieceList() {
  dom.piecesContainer.innerHTML = "";
  state.pieces.forEach(p => {
    const div = document.createElement("div");
    div.className = "p-row";
    const box = document.createElement("div");
    box.className = "p-color";
    box.style.backgroundColor = p.color;
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "goal";
    radio.checked = p.id === state.goalPieceId;
    radio.onchange = () => {
      state.goalPieceId = p.id;
      renderBoard();
    };
    div.append(box, ` ${p.w}x${p.h}`, radio);
    dom.piecesContainer.append(div);
  });
}

function resize() {
  dom.graphCanvas.width = dom.graphCanvas.clientWidth;
  dom.graphCanvas.height = dom.graphCanvas.clientHeight;
  const s = dom.boardCanvas.clientWidth;
  dom.boardCanvas.width = s;
  dom.boardCanvas.height = s * (state.boardHeight / state.boardWidth);
  renderBoard();
}

function canPlace(x, y, w, h, ign = -1) {
  if (x < 0 || y < 0 || x + w > state.boardWidth || y + h > state.boardHeight) return false;
  return !state.pieces.some((p, i) => i !== ign && x < p.x + p.w && x + w > p.x && y < p.y + p.h && y + h > p.y);
}

function buildGroups(defs) {
  const m = new Map();
  defs.forEach((d, i) => {
    const k = `${d.w}x${d.h}`;
    if (!m.has(k)) m.set(k, {k, idx: []});
    m.get(k).idx.push(i);
  });
  return Array.from(m.values());
}

function encodePositions(pos, groups, bw) {
  return groups.map(g => g.idx.map(i => pos[i * 2 + 1] * bw + pos[i * 2]).sort((a, b) => a - b).join(",")).join("|");
}

function getCanvasPoint(e, c) {
  const r = c.getBoundingClientRect();
  return {x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height)};
}

function pointToCell(x, y) {
  const s = dom.boardCanvas.width / state.boardWidth;
  return {x: Math.floor(x / s), y: Math.floor(y / s)};
}

function yieldToBrowser() {
  return new Promise(r => setTimeout(r, 0));
}

initialize();
