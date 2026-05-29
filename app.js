const STORAGE_KEY = "last-war-map-colors-v1";
const UNIT = 24;
const EDGE_COUNT = 11;
const INNER_UNITS = 40;

const matrices = {
  cornerTL: {
    label: "左上角",
    cells: ["11", "10"],
  },
  cornerTR: {
    label: "右上角",
    cells: ["11", "01"],
  },
  cornerBR: {
    label: "右下角",
    cells: ["01", "11"],
  },
  cornerBL: {
    label: "左下角",
    cells: ["10", "11"],
  },
  bumpTop: {
    label: "上边凸",
    cells: ["1111", "0110"],
  },
  bumpRight: {
    label: "右边凸",
    cells: ["01", "11", "11", "01"],
  },
  bumpBottom: {
    label: "下边凸",
    cells: ["0110", "1111"],
  },
  bumpLeft: {
    label: "左边凸",
    cells: ["10", "11", "11", "10"],
  },
  cross: {
    label: "十字",
    cells: ["0110", "1111", "1111", "0110"],
  },
  block: {
    label: "方块",
    cells: ["11", "11"],
  },
};

const defaultPalette = [
  { id: "empty", name: "未标记", color: "#b6a95a" },
  { id: "orange", name: "橙色标记", color: "#f39b1f" },
  { id: "cyan", name: "青色标记", color: "#27d8d0" },
  { id: "purple", name: "紫色标记", color: "#9b5cf6" },
  { id: "green", name: "绿色标记", color: "#7fbf54" },
  { id: "red", name: "红色标记", color: "#ef5b4d" },
];

const attributes = ["Lv.1 拓荒者银行", "Lv.2 拓荒者银行", "Lv.3 拓荒者银行", "Lv.4 拓荒者银行", "Lv.5 拓荒者银行", "Lv.1 郊狼镇", "Lv.2 蓄水镇", "Lv.3 狂徒街", "Lv.4 赛马场", "Lv.5 金沙郡", "Lv.1 贸易站", "Lv.2 贸易站", "Lv.3 贸易站", "Lv.4 贸易站", "Lv.7 枢纽城"];

const attributeAssignments = {
  "Lv.1 拓荒者银行": ["corner-tl","top-1","left-1","top-2","left-2","top-3","left-3","top-4","left-4","top-5","left-5","top-6","left-6","cross-2-2","cross-6-2","cross-10-2","cross-2-6","cross-6-6","cross-2-10"],
  "Lv.2 拓荒者银行": ["cross-14-2","cross-18-2","cross-22-2","cross-10-6","cross-14-6","cross-18-6","cross-22-6","cross-6-10","cross-10-10","cross-2-14","cross-6-14","cross-2-18","cross-6-18","cross-2-22","cross-6-22"],
  "Lv.3 拓荒者银行": ["cross-14-10","cross-18-10","cross-22-10","cross-10-14","cross-14-14","cross-18-14","cross-22-14","cross-10-18","cross-14-18","cross-22-18","cross-10-22","cross-14-22","cross-18-22","cross-22-22"],
  "Lv.4 拓荒者银行": ["top-7","left-7","top-8","left-8","cross-26-2","cross-30-2","cross-26-6","cross-30-6","cross-26-10","cross-30-10","cross-26-14","cross-30-14","cross-26-18","cross-30-18","cross-26-22","cross-30-22","cross-2-26","cross-6-26","cross-10-26","cross-14-26","cross-18-26","cross-22-26","cross-26-26","cross-30-26","cross-2-30","cross-6-30","cross-10-30","cross-14-30","cross-18-30","cross-22-30","cross-26-30","cross-30-30"],
  "Lv.5 拓荒者银行": ["corner-tr","corner-br","corner-bl","bottom-1","right-1","bottom-2","right-2","bottom-3","right-3","bottom-4","right-4","bottom-5","right-5","bottom-6","right-6","bottom-7","right-7","bottom-8","right-8","top-9","bottom-9","left-9","right-9","cross-34-2","cross-34-6","cross-34-10","cross-34-14","cross-34-18","cross-34-22","cross-34-26","cross-34-30","cross-2-34","cross-6-34","cross-10-34","cross-14-34","cross-18-34","cross-22-34","cross-26-34","cross-30-34","cross-34-34"],
  "Lv.1 郊狼镇":["gap-1-1","gap-5-1","gap-9-1","gap-13-1","gap-17-1","gap-21-1","gap-1-5","gap-5-5","gap-9-5","gap-13-5","gap-17-5","gap-21-5","gap-1-9","gap-5-9","gap-1-13","gap-5-13","gap-1-17","gap-5-17","gap-1-21","gap-5-21"], "Lv.2 蓄水镇":["gap-9-9","gap-13-9","gap-17-9","gap-21-9","gap-9-13","gap-13-13","gap-17-13","gap-21-13","gap-9-17","gap-13-17","gap-9-21","gap-13-21"], "Lv.3 狂徒街":["gap-17-17","gap-21-17","gap-17-21","gap-21-21"], "Lv.4 赛马场":["gap-25-1","gap-29-1","gap-25-5","gap-29-5","gap-25-9","gap-29-9","gap-25-13","gap-29-13","gap-25-17","gap-29-17","gap-25-21","gap-29-21","gap-1-25","gap-5-25","gap-9-25","gap-13-25","gap-17-25","gap-21-25","gap-25-25","gap-29-25","gap-1-29","gap-5-29","gap-9-29","gap-13-29","gap-17-29","gap-21-29","gap-25-29","gap-29-29"], "Lv.5 金沙郡":["gap-33-1","gap-37-1","gap-33-5","gap-37-5","gap-33-9","gap-37-9","gap-33-13","gap-37-13","gap-33-17","gap-37-17","gap-33-21","gap-37-21","gap-33-25","gap-1-33","gap-5-33","gap-9-33","gap-13-33","gap-17-33","gap-21-33","gap-25-33","gap-1-37","gap-5-37","gap-9-37","gap-13-37","gap-17-37","gap-21-37"], "Lv.1 贸易站":["gap-37-25","gap-33-29","gap-29-33","gap-25-37"], "Lv.2 贸易站":["gap-37-29","gap-33-33"], "Lv.3 贸易站":["gap-29-37","gap-33-37"], "Lv.4 贸易站":["gap-37-33","gap-37-37"], "Lv.7 枢纽城":["cross-18-18"]
};

const attributeLabels = {
  "Lv.1 拓荒者银行": "1",
  "Lv.2 拓荒者银行": "2",
  "Lv.3 拓荒者银行": "3",
  "Lv.4 拓荒者银行": "4",
  "Lv.5 拓荒者银行": "5",
  "Lv.1 郊狼镇": "1",
  "Lv.2 蓄水镇": "2",
  "Lv.3 狂徒街": "3",
  "Lv.4 赛马场": "4",
  "Lv.5 金沙郡": "5",
  "Lv.1 贸易站": "1",
  "Lv.2 贸易站": "2",
  "Lv.3 贸易站": "3",
  "Lv.4 贸易站": "4",
  "Lv.7 枢纽城": "枢纽城",
};

let modules = buildModules();
let state = loadState();
let activeColor = state.activeColor || "orange";
let activeCategoryFilter = "all";
let selectedModule = null;

const mapSvg = document.querySelector("#mapSvg");
const paletteEl = document.querySelector("#palette");
const colorEditorEl = document.querySelector("#colorEditor");
const categoryFilterEl = document.querySelector("#categoryFilter");
const selectionInfoEl = document.querySelector("#selectionInfo");
const copyColorIdsBtn = document.querySelector("#copyColorIdsBtn");
const panelToggle = document.querySelector("#panelToggle");

function buildModules() {
  const items = [
    moduleItem("corner-tl", "cornerTL", 0, 0),
    moduleItem("corner-tr", "cornerTR", INNER_UNITS - 2, 0),
    moduleItem("corner-br", "cornerBR", INNER_UNITS - 2, INNER_UNITS - 2),
    moduleItem("corner-bl", "cornerBL", 0, INNER_UNITS - 2),
  ];

  for (let i = 0; i < EDGE_COUNT - 2; i += 1) {
    const offset = 2 + i * 4;
    items.push(moduleItem(`top-${i + 1}`, "bumpTop", offset, 0));
    items.push(moduleItem(`bottom-${i + 1}`, "bumpBottom", offset, INNER_UNITS - 2));
    items.push(moduleItem(`left-${i + 1}`, "bumpLeft", 0, offset));
    items.push(moduleItem(`right-${i + 1}`, "bumpRight", INNER_UNITS - 2, offset));
  }

  for (let y = 2; y <= INNER_UNITS - 6; y += 4) {
    for (let x = 2; x <= INNER_UNITS - 6; x += 4) {
      items.push(moduleItem(`cross-${x}-${y}`, "cross", x, y));
    }
  }

  addGapBlocks(items);

  return applyAttributeAssignments(items);
}

function moduleItem(id, shape, x, y) {
  return { id, shape, x, y, attribute: "A", colorId: "empty" };
}

function applyAttributeAssignments(items) {
  const lookup = new Map();
  Object.entries(attributeAssignments).forEach(([attribute, ids]) => {
    ids.forEach((id) => lookup.set(id, attribute));
  });
  return items.map((item) => ({ ...item, attribute: lookup.get(item.id) || "A" }));
}

function addGapBlocks(items) {
  const occupied = occupiedUnits(items);
  for (let y = 0; y <= INNER_UNITS - 2; y += 1) {
    for (let x = 0; x <= INNER_UNITS - 2; x += 1) {
      const cells = [`${x},${y}`, `${x + 1},${y}`, `${x},${y + 1}`, `${x + 1},${y + 1}`];
      if (cells.some((cell) => occupied.has(cell))) continue;
      const block = moduleItem(`gap-${x}-${y}`, "block", x, y);
      items.push(block);
      cells.forEach((cell) => occupied.add(cell));
    }
  }
}

function occupiedUnits(items) {
  const occupied = new Set();
  items.forEach((item) => {
    expandedCells(item).forEach((cell) => {
      const [x, y] = cell.split(",").map(Number);
      occupied.add(`${item.x + x},${item.y + y}`);
    });
  });
  return occupied;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.palette?.length && saved?.colors) {
      modules = modules.map((item) => ({
        ...item,
        colorId: saved.colors[item.id] || "empty",
      }));
      return {
        palette: saved.palette,
        activeColor: saved.activeColor || "orange",
      };
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return { palette: defaultPalette.map((item) => ({ ...item })), activeColor: "orange" };
}

function saveState() {
  const colors = Object.fromEntries(modules.map((item) => [item.id, item.colorId]));
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ palette: state.palette, activeColor, colors }));
}

function getColor(colorId) {
  return state.palette.find((item) => item.id === colorId)?.color || "#999999";
}

function getName(colorId) {
  return state.palette.find((item) => item.id === colorId)?.name || "未命名";
}

function renderMap() {
  mapSvg.setAttribute("viewBox", `0 0 ${INNER_UNITS * UNIT} ${INNER_UNITS * UNIT}`);
  mapSvg.innerHTML = "";
  modules.forEach((item) => {
    const group = svgEl("g", {
      class: `tile ${selectedModule === item.id ? "selected" : ""} ${activeCategoryFilter !== "all" && activeCategoryFilter !== item.attribute ? "dimmed" : ""}`,
      transform: `translate(${item.x * UNIT}, ${item.y * UNIT})`,
      tabindex: "0",
      role: "button",
      "data-id": item.id,
      "aria-label": `${item.id} ${item.attribute} ${matrices[item.shape].label} ${getName(item.colorId)}`,
    });

    group.append(matrixFill(item));
    group.append(matrixOutline(item));
    group.append(attributeLabel(item));
    group.addEventListener("click", () => paintModule(item.id));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") paintModule(item.id);
    });
    mapSvg.append(group);
  });
}

function matrixFill(item) {
  const color = getColor(item.colorId);
  const rows = matrices[item.shape].cells;
  const scale = matrices[item.shape].scale || 1;
  const parts = [];
  rows.forEach((row, y) => {
    [...row].forEach((value, x) => {
      if (value !== "1") return;
      parts.push(`M${x * scale * UNIT} ${y * scale * UNIT}H${(x + 1) * scale * UNIT}V${(y + 1) * scale * UNIT}H${x * scale * UNIT}Z`);
    });
  });
  return svgEl("path", {
    class: "tile-fill",
    d: parts.join(""),
    fill: color,
  });
}

function matrixOutline(item) {
  const occupied = expandedCells(item);
  const edges = [];
  occupied.forEach((key) => {
    const [x, y] = key.split(",").map(Number);
    if (!occupied.has(`${x},${y - 1}`)) edges.push([x, y, x + 1, y]);
    if (!occupied.has(`${x + 1},${y}`)) edges.push([x + 1, y, x + 1, y + 1]);
    if (!occupied.has(`${x},${y + 1}`)) edges.push([x + 1, y + 1, x, y + 1]);
    if (!occupied.has(`${x - 1},${y}`)) edges.push([x, y + 1, x, y]);
  });

  return svgEl("path", {
    class: "tile-outline",
    d: edges.map(([x1, y1, x2, y2]) => `M${x1 * UNIT} ${y1 * UNIT}L${x2 * UNIT} ${y2 * UNIT}`).join(""),
    fill: "none",
  });
}

function attributeLabel(item) {
  const label = attributeLabels[item.attribute] || "";
  if (!label) return svgEl("g", {});
  const rows = matrices[item.shape].cells;
  const scale = matrices[item.shape].scale || 1;
  const width = rows[0].length * scale * UNIT;
  const height = rows.length * scale * UNIT;
  return svgEl("text", {
    class: "attribute-label",
    x: width / 2,
    y: height / 2,
    "dominant-baseline": "middle",
    "text-anchor": "middle",
  }, label);
}

function expandedCells(item) {
  const rows = matrices[item.shape].cells;
  const scale = matrices[item.shape].scale || 1;
  const occupied = new Set();
  rows.forEach((row, y) => {
    [...row].forEach((value, x) => {
      if (value !== "1") return;
      for (let dy = 0; dy < scale; dy += 1) {
        for (let dx = 0; dx < scale; dx += 1) {
          occupied.add(`${x * scale + dx},${y * scale + dy}`);
        }
      }
    });
  });
  return occupied;
}

function paintModule(id) {
  const item = modules.find((entry) => entry.id === id);
  item.colorId = activeColor;
  selectedModule = id;
  saveState();
  renderAll();
}

function renderPalette() {
  paletteEl.innerHTML = "";
  state.palette.forEach((item) => {
    const button = document.createElement("button");
    button.className = `swatch ${activeColor === item.id ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `<span class="swatch-chip" style="background:${item.color}"></span><span>${item.name}</span>`;
    button.addEventListener("click", () => {
      activeColor = item.id;
      saveState();
      renderPalette();
    });
    paletteEl.append(button);
  });
}

function renderCategoryFilter() {
  categoryFilterEl.innerHTML = "";
  [
    { id: "all", name: "所有城市" },
    ...attributes.map((attribute) => ({ id: attribute, name: `${attribute}` })),
  ].forEach((item) => {
    const button = document.createElement("button");
    button.className = `shape-button ${activeCategoryFilter === item.id ? "active" : ""}`;
    button.type = "button";
    button.textContent = item.name;
    button.addEventListener("click", () => {
      activeCategoryFilter = item.id;
      renderAll();
    });
    categoryFilterEl.append(button);
  });
}

function renderColorEditor() {
  colorEditorEl.innerHTML = "";
  state.palette.forEach((item) => {
    const row = document.createElement("div");
    row.className = "color-row";
    const color = document.createElement("input");
    color.type = "color";
    color.value = item.color;
    color.addEventListener("input", () => {
      item.color = color.value;
      saveState();
      renderAll();
    });
    const name = document.createElement("input");
    name.type = "text";
    name.value = item.name;
    name.addEventListener("input", () => {
      item.name = name.value.trim() || "未命名";
      saveState();
      renderPalette();
      updateSelectionInfo();
    });
    row.append(color, name);
    colorEditorEl.append(row);
  });
}

function updateSelectionInfo() {
  if (selectedModule === null) {
    selectionInfoEl.textContent = "点击地图上的任意模块。";
    return;
  }
  const item = modules.find((entry) => entry.id === selectedModule);
  selectionInfoEl.innerHTML = `ID: ${item.id}<br>${item.attribute}<br>${matrices[item.shape].label}<br>${getName(item.colorId)}<br>坐标 ${item.x}, ${item.y}`;
}

function renderAll() {
  renderMap();
  renderPalette();
  renderCategoryFilter();
  renderColorEditor();
  updateSelectionInfo();
}

function svgEl(tag, attrs, text) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  if (text) el.textContent = text;
  return el;
}

document.querySelector("#resetBtn").addEventListener("click", () => {
  if (!confirm("确定清空所有本地标记吗？")) return;
  modules = buildModules();
  state = { palette: defaultPalette.map((item) => ({ ...item })), activeColor: "orange" };
  activeColor = "orange";
  activeCategoryFilter = "all";
  selectedModule = null;
  saveState();
  renderAll();
});

document.querySelector("#exportBtn").addEventListener("click", () => {
  const colors = Object.fromEntries(modules.map((item) => [item.id, item.colorId]));
  const blob = new Blob([JSON.stringify({ palette: state.palette, activeColor, colors }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "last-war-map.json";
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelector("#exportImageBtn").addEventListener("click", async () => {
  const size = INNER_UNITS * UNIT;
  const svg = mapSvg.cloneNode(true);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.querySelectorAll(".tile").forEach((tile) => tile.classList.remove("selected", "dimmed"));
  svg.insertAdjacentHTML("afterbegin", `
    <style>
      .tile-fill { filter: drop-shadow(0 0 2px rgba(255, 226, 138, 0.5)); }
      .tile-outline {
        stroke: rgba(35, 24, 14, 0.92);
        stroke-width: 2.2;
        stroke-linejoin: miter;
        stroke-linecap: square;
        shape-rendering: crispEdges;
        fill: none;
      }
      .attribute-label {
        fill: #111111;
        font: 800 20px sans-serif;
        paint-order: stroke;
        stroke: rgba(255, 248, 214, 0.72);
        stroke-width: 1.5px;
      }
    </style>
    <rect width="100%" height="100%" fill="#b6ad5c"/>
  `);

  const svgText = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const image = new Image();
  image.decoding = "async";
  const loaded = new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
  image.src = url;
  await loaded;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  URL.revokeObjectURL(url);

  const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  const pngUrl = URL.createObjectURL(pngBlob);
  const link = document.createElement("a");
  link.href = pngUrl;
  link.download = "last-war-map.png";
  link.click();
  URL.revokeObjectURL(pngUrl);
});

copyColorIdsBtn.addEventListener("click", async () => {
  const ids = modules
    .filter((item) => item.colorId === activeColor)
    .map((item) => item.id);
  const text = JSON.stringify(ids);
  await navigator.clipboard.writeText(text);
  copyColorIdsBtn.textContent = `已复制 ${ids.length} 个 ID`;
  window.setTimeout(() => {
    copyColorIdsBtn.textContent = "复制当前颜色 ID";
  }, 1400);
});

panelToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("panel-open");
  panelToggle.setAttribute("aria-expanded", String(isOpen));
  panelToggle.textContent = isOpen ? "关闭" : "设置";
});

document.querySelector("#importInput").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const imported = JSON.parse(await file.text());
  if (!imported?.palette || !imported?.colors) {
    alert("导入文件格式不正确。");
    return;
  }
  modules = buildModules().map((item) => ({
    ...item,
    colorId: imported.colors[item.id] || "empty",
  }));
  state = { palette: imported.palette, activeColor: imported.activeColor || "orange" };
  activeColor = state.activeColor;
  activeCategoryFilter = "all";
  selectedModule = null;
  saveState();
  renderAll();
  event.target.value = "";
});

renderAll();
