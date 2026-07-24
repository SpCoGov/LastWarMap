const STORAGE_KEY = "last-war-map-colors-v2";
const LEGACY_STORAGE_KEY = "last-war-map-colors-v1";
const UNIT_BASE = 24;
const UNIT_X = UNIT_BASE * 1.3;
const UNIT_Y = UNIT_BASE;
const EDGE_COUNT = 11;
const BASE_UNITS = 40;
const MAP_GRID_SIZE = 3;
const CENTER_BLOCK_COUNT = 20;
const INNER_UNITS = BASE_UNITS * MAP_GRID_SIZE;
const CENTER_ATTRIBUTE = "中心区域";
const MERGED_CENTER_ID = "center-10-10-to-11-11";

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
  largeBlock: {
    label: "中心大块",
    cells: ["11", "11"],
    scale: 2,
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

const attributes = ["Lv.1 漁場", "Lv.2 漁場", "Lv.3 漁場", "Lv.4 漁場", "Lv.7 濕地聖所", "Lv.1 濕地村莊", "Lv.2 濕地軍營", "Lv.3 濕地集會場", "Lv.6 戰區前哨站", "Lv.5 漁場", "Lv.6 漁場","Lv.7 漁場","Lv.1 盤影祭壇","Lv.2 回聲祭壇","Lv.3 裂風祭壇","Lv.4 彩羽祭壇","Lv.5 樹棲祭壇", "Lv.8 祖靈祭壇"];

const attributeAssignments = {
  "Lv.1 漁場" : ["corner-tl","corner-tr","corner-br","corner-bl","top-1","bottom-1","left-1","right-1","top-2","bottom-2","left-2","right-2","top-3","bottom-3","left-3","right-3","top-4","bottom-4","left-4","right-4","top-5","bottom-5","left-5","right-5","top-6","bottom-6","left-6","right-6","top-7","bottom-7","left-7","right-7","top-8","bottom-8","left-8","right-8","top-9","bottom-9","left-9","right-9","cross-2-2","cross-6-2","cross-10-2","cross-14-2","cross-18-2","cross-22-2","cross-26-2","cross-30-2","cross-34-2","cross-2-6","cross-34-6","cross-2-10","cross-34-10","cross-2-14","cross-34-14","cross-2-18","cross-34-18","cross-2-22","cross-34-22","cross-2-26","cross-34-26","cross-2-30","cross-34-30","cross-2-34","cross-6-34","cross-10-34","cross-14-34","cross-18-34","cross-22-34","cross-26-34","cross-30-34","cross-34-34"],
  "Lv.2 漁場" : ["cross-6-6","cross-10-6","cross-14-6","cross-18-6","cross-22-6","cross-26-6","cross-30-6","cross-6-10","cross-30-10","cross-6-14","cross-30-14","cross-6-18","cross-30-18","cross-6-22","cross-30-22","cross-6-26","cross-30-26","cross-6-30","cross-10-30","cross-14-30","cross-18-30","cross-22-30","cross-26-30","cross-30-30"],
  "Lv.3 漁場": ["cross-10-10","cross-14-10","cross-18-10","cross-22-10","cross-26-10","cross-10-14","cross-26-14","cross-10-18","cross-26-18","cross-10-22","cross-26-22","cross-10-26","cross-14-26","cross-18-26","cross-22-26","cross-26-26"],
  "Lv.4 漁場":["cross-14-14","cross-18-14","cross-22-14","cross-14-18","cross-22-18","cross-14-22","cross-18-22","cross-22-22"],
  "Lv.5 漁場": ["center-1-1","center-2-1","center-3-1","center-4-1","center-5-1","center-6-1","center-7-1","center-8-1","center-9-1","center-10-1","center-11-1","center-12-1","center-13-1","center-14-1","center-15-1","center-16-1","center-17-1","center-18-1","center-19-1","center-20-1","center-1-2","center-20-2","center-1-3","center-20-3","center-1-4","center-20-4","center-1-5","center-20-5","center-1-6","center-20-6","center-1-7","center-20-7","center-1-8","center-20-8","center-1-9","center-20-9","center-1-10","center-20-10","center-1-11","center-20-11","center-1-12","center-20-12","center-1-13","center-20-13","center-1-14","center-20-14","center-1-15","center-20-15","center-1-16","center-20-16","center-1-17","center-20-17","center-1-18","center-20-18","center-1-19","center-20-19","center-1-20","center-2-20","center-3-20","center-4-20","center-5-20","center-6-20","center-7-20","center-8-20","center-9-20","center-10-20","center-11-20","center-12-20","center-13-20","center-14-20","center-15-20","center-16-20","center-17-20","center-18-20","center-19-20","center-20-20"],
  "Lv.6 漁場": ["center-2-2","center-3-2","center-4-2","center-5-2","center-6-2","center-7-2","center-8-2","center-9-2","center-10-2","center-11-2","center-12-2","center-13-2","center-14-2","center-15-2","center-16-2","center-17-2","center-18-2","center-19-2","center-2-3","center-19-3","center-2-4","center-19-4","center-2-5","center-19-5","center-2-6","center-19-6","center-2-7","center-19-7","center-2-8","center-19-8","center-2-9","center-19-9","center-2-10","center-19-10","center-2-11","center-19-11","center-2-12","center-19-12","center-2-13","center-19-13","center-2-14","center-19-14","center-2-15","center-19-15","center-2-16","center-19-16","center-2-17","center-19-17","center-2-18","center-19-18","center-2-19","center-3-19","center-4-19","center-5-19","center-6-19","center-7-19","center-8-19","center-9-19","center-10-19","center-11-19","center-12-19","center-13-19","center-14-19","center-15-19","center-16-19","center-17-19","center-18-19","center-19-19"],
  "Lv.7 漁場":["center-3-3","center-4-3","center-5-3","center-6-3","center-7-3","center-8-3","center-9-3","center-10-3","center-11-3","center-12-3","center-13-3","center-14-3","center-15-3","center-16-3","center-17-3","center-18-3","center-3-4","center-4-4","center-17-4","center-18-4","center-3-5","center-18-5","center-3-6","center-18-6","center-3-7","center-18-7","center-3-8","center-18-8","center-3-9","center-18-9","center-3-10","center-18-10","center-3-11","center-18-11","center-3-12","center-18-12","center-3-13","center-18-13","center-3-14","center-18-14","center-3-15","center-18-15","center-3-16","center-18-16","center-3-17","center-4-17","center-17-17","center-18-17","center-3-18","center-4-18","center-5-18","center-6-18","center-7-18","center-8-18","center-9-18","center-10-18","center-11-18","center-12-18","center-13-18","center-14-18","center-15-18","center-16-18","center-17-18","center-18-18"],
  "Lv.7 濕地聖所": ["cross-18-18"],
  "Lv.1 濕地村莊":["gap-1-1","gap-5-1","gap-9-1","gap-13-1","gap-17-1","gap-21-1","gap-25-1","gap-29-1","gap-33-1","gap-37-1","gap-1-5","gap-5-5","gap-9-5","gap-13-5","gap-17-5","gap-21-5","gap-25-5","gap-29-5","gap-33-5","gap-37-5","gap-1-9","gap-5-9","gap-33-9","gap-37-9","gap-1-13","gap-5-13","gap-33-13","gap-37-13","gap-1-17","gap-5-17","gap-33-17","gap-37-17","gap-1-21","gap-5-21","gap-33-21","gap-37-21","gap-1-25","gap-5-25","gap-33-25","gap-37-25","gap-1-29","gap-5-29","gap-33-29","gap-37-29","gap-1-33","gap-5-33","gap-9-33","gap-13-33","gap-17-33","gap-21-33","gap-25-33","gap-29-33","gap-33-33","gap-37-33","gap-1-37","gap-5-37","gap-9-37","gap-13-37","gap-17-37","gap-21-37","gap-25-37","gap-29-37","gap-33-37","gap-37-37"],
  "Lv.2 濕地軍營":["gap-9-9","gap-13-9","gap-17-9","gap-21-9","gap-25-9","gap-29-9","gap-9-13","gap-29-13","gap-9-17","gap-29-17","gap-9-21","gap-29-21","gap-9-25","gap-29-25","gap-9-29","gap-13-29","gap-17-29","gap-21-29","gap-25-29","gap-29-29"],
  "Lv.3 濕地集會場": ["gap-13-13","gap-17-13","gap-21-13","gap-25-13","gap-13-17","gap-25-17","gap-13-21","gap-25-21","gap-13-25","gap-17-25","gap-21-25","gap-25-25"],
  "Lv.6 戰區前哨站": ["gap-17-17","gap-21-17","gap-17-21","gap-21-21"],
  "Lv.1 盤影祭壇":["center-5-4","center-6-4","center-7-4","center-8-4","center-9-4","center-10-4","center-11-4","center-12-4","center-13-4","center-14-4","center-15-4","center-16-4","center-4-5","center-5-5","center-6-5","center-7-5","center-8-5","center-9-5","center-12-5","center-13-5","center-14-5","center-15-5","center-16-5","center-17-5","center-4-6","center-5-6","center-16-6","center-17-6","center-4-7","center-5-7","center-16-7","center-17-7","center-4-8","center-5-8","center-16-8","center-17-8","center-4-9","center-5-9","center-16-9","center-17-9","center-4-10","center-17-10","center-4-11","center-17-11","center-4-12","center-5-12","center-16-12","center-17-12","center-4-13","center-5-13","center-16-13","center-17-13","center-4-14","center-5-14","center-16-14","center-17-14","center-4-15","center-5-15","center-16-15","center-17-15","center-4-16","center-5-16","center-6-16","center-7-16","center-8-16","center-9-16","center-12-16","center-13-16","center-14-16","center-15-16","center-16-16","center-17-16","center-5-17","center-6-17","center-7-17","center-8-17","center-9-17","center-10-17","center-11-17","center-12-17","center-13-17","center-14-17","center-15-17","center-16-17"],
  "Lv.2 回聲祭壇":["center-10-5","center-11-5","center-6-6","center-7-6","center-8-6","center-9-6","center-10-6","center-11-6","center-12-6","center-13-6","center-14-6","center-15-6","center-6-7","center-15-7","center-6-8","center-15-8","center-6-9","center-15-9","center-5-10","center-6-10","center-15-10","center-16-10","center-5-11","center-6-11","center-15-11","center-16-11","center-6-12","center-15-12","center-6-13","center-15-13","center-6-14","center-15-14","center-6-15","center-7-15","center-8-15","center-9-15","center-10-15","center-11-15","center-12-15","center-13-15","center-14-15","center-15-15","center-10-16","center-11-16","center-7-7","center-14-7","center-7-14","center-14-14"],
  "Lv.3 裂風祭壇": ["center-8-7","center-9-7","center-10-7","center-11-7","center-12-7","center-13-7","center-7-8","center-8-8","center-13-8","center-14-8","center-7-9","center-14-9","center-7-10","center-14-10","center-7-11","center-14-11","center-7-12","center-14-12","center-7-13","center-8-13","center-13-13","center-14-13","center-8-14","center-9-14","center-10-14","center-11-14","center-12-14","center-13-14"],
  "Lv.4 彩羽祭壇":["center-9-8","center-10-8","center-11-8","center-12-8","center-8-9","center-9-9","center-12-9","center-13-9","center-8-10","center-13-10","center-8-11","center-13-11","center-8-12","center-9-12","center-12-12","center-13-12","center-9-13","center-10-13","center-11-13","center-12-13"],
  "Lv.5 樹棲祭壇":["center-10-9","center-11-9","center-9-10","center-12-10","center-9-11","center-12-11","center-10-12","center-11-12"],
  "Lv.8 祖靈祭壇":["center-10-10-to-11-11"],
};

const attributeByModuleId = new Map();
Object.entries(attributeAssignments).forEach(([attribute, ids]) => {
  ids.forEach((id) => attributeByModuleId.set(id, attribute));
});

const attributeLabels = {
};

let modules = buildModules();
let state = loadState();
let moduleById = new Map(modules.map((item) => [item.id, item]));
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
const panelClose = document.querySelector("#panelClose");
const statsToggle = document.querySelector("#statsToggle");
const statsClose = document.querySelector("#statsClose");
const colorStats = document.querySelector("#colorStats");
const colorToggle = document.querySelector("#colorToggle");
const colorClose = document.querySelector("#colorClose");
const mapViewport = document.querySelector("#mapViewport");
const mapSurface = document.querySelector("#mapSurface");
const navigationCanvas = document.querySelector("#navigationCanvas");
const zoomLabel = document.querySelector("#zoomLabel");
const MAP_WIDTH = Math.round(INNER_UNITS * UNIT_X);
const MAP_HEIGHT = Math.round(INNER_UNITS * UNIT_Y);
mapSurface.style.width = `${MAP_WIDTH}px`;
mapSurface.style.height = `${MAP_HEIGHT}px`;
mapSvg.style.width = `${MAP_WIDTH}px`;
mapSvg.style.height = `${MAP_HEIGHT}px`;
navigationCanvas.width = MAP_WIDTH;
navigationCanvas.height = MAP_HEIGHT;
const MIN_SCALE = 0.08;
const MAX_SCALE = 4;
const viewState = { x: 0, y: 0, scale: 1 };
const activePointers = new Map();
let viewReady = false;
let dragStart = null;
let pinchStart = null;
let suppressMapClick = false;
let viewFrame = 0;
let canvasFrame = 0;
let navigationIdleTimer = 0;

function buildModules() {
  const baseModules = buildBaseModules();
  const items = [];

  for (let regionY = 0; regionY < MAP_GRID_SIZE; regionY += 1) {
    for (let regionX = 0; regionX < MAP_GRID_SIZE; regionX += 1) {
      if (regionX === 1 && regionY === 1) continue;
      const regionId = `map-${regionY + 1}-${regionX + 1}`;
      baseModules.forEach((item) => {
        items.push({
          ...item,
          id: `${regionId}-${item.id}`,
          x: item.x + regionX * BASE_UNITS,
          y: item.y + regionY * BASE_UNITS,
        });
      });
    }
  }

  for (let row = 0; row < CENTER_BLOCK_COUNT; row += 1) {
    for (let column = 0; column < CENTER_BLOCK_COUNT; column += 1) {
      const isMergedArea = row >= 9 && row <= 10 && column >= 9 && column <= 10;
      if (isMergedArea) {
        if (row === 9 && column === 9) {
          items.push({
            ...moduleItem(MERGED_CENTER_ID, "largeBlock", BASE_UNITS + column * 2, BASE_UNITS + row * 2),
            attribute: attributeByModuleId.get(MERGED_CENTER_ID) || CENTER_ATTRIBUTE,
          });
        }
        continue;
      }
      const centerId = `center-${column + 1}-${row + 1}`;
      items.push({
        ...moduleItem(centerId, "block", BASE_UNITS + column * 2, BASE_UNITS + row * 2),
        attribute: attributeByModuleId.get(centerId) || CENTER_ATTRIBUTE,
      });
    }
  }

  return items;
}

function buildBaseModules() {
  const items = [
    moduleItem("corner-tl", "cornerTL", 0, 0),
    moduleItem("corner-tr", "cornerTR", BASE_UNITS - 2, 0),
    moduleItem("corner-br", "cornerBR", BASE_UNITS - 2, BASE_UNITS - 2),
    moduleItem("corner-bl", "cornerBL", 0, BASE_UNITS - 2),
  ];

  for (let i = 0; i < EDGE_COUNT - 2; i += 1) {
    const offset = 2 + i * 4;
    items.push(moduleItem(`top-${i + 1}`, "bumpTop", offset, 0));
    items.push(moduleItem(`bottom-${i + 1}`, "bumpBottom", offset, BASE_UNITS - 2));
    items.push(moduleItem(`left-${i + 1}`, "bumpLeft", 0, offset));
    items.push(moduleItem(`right-${i + 1}`, "bumpRight", BASE_UNITS - 2, offset));
  }

  for (let y = 2; y <= BASE_UNITS - 6; y += 4) {
    for (let x = 2; x <= BASE_UNITS - 6; x += 4) {
      items.push(moduleItem(`cross-${x}-${y}`, "cross", x, y));
    }
  }

  addGapBlocks(items, BASE_UNITS);

  return applyAttributeAssignments(items);
}

function moduleItem(id, shape, x, y) {
  return { id, shape, x, y, attribute: "A", colorId: "empty" };
}

function applyAttributeAssignments(items) {
  return items.map((item) => ({ ...item, attribute: attributeByModuleId.get(item.id) || "A" }));
}

function addGapBlocks(items, areaUnits) {
  const occupied = occupiedUnits(items);
  for (let y = 0; y <= areaUnits - 2; y += 1) {
    for (let x = 0; x <= areaUnits - 2; x += 1) {
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

function savedColorForItem(item, colors) {
  if (colors[item.id]) return colors[item.id];
  if (item.id !== MERGED_CENTER_ID) return undefined;
  return colors["center-10-10"]
    || colors["center-11-10"]
    || colors["center-10-11"]
    || colors["center-11-11"];
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.palette?.length && saved?.colors) {
      modules = modules.map((item) => ({
        ...item,
        colorId: savedColorForItem(item, saved.colors) || "empty",
      }));
      return {
        palette: saved.palette,
        activeColor: saved.activeColor || "orange",
      };
    }

    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    if (legacy?.palette?.length && legacy?.colors) {
      modules = modules.map((item) => {
        const baseId = item.id.replace(/^map-\d-\d-/, "");
        return {
          ...item,
          colorId: item.id.startsWith("center-") ? "empty" : legacy.colors[baseId] || "empty",
        };
      });
      const migratedColors = Object.fromEntries(modules.map((item) => [item.id, item.colorId]));
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        palette: legacy.palette,
        activeColor: legacy.activeColor || "orange",
        colors: migratedColors,
      }));
      return {
        palette: legacy.palette,
        activeColor: legacy.activeColor || "orange",
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
  mapSvg.setAttribute("viewBox", `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`);
  mapSvg.innerHTML = "";
  const fragment = document.createDocumentFragment();
  modules.forEach((item) => {
    const group = svgEl("g", {
      class: `tile ${selectedModule === item.id ? "selected" : ""} ${activeCategoryFilter !== "all" && activeCategoryFilter !== item.attribute ? "dimmed" : ""}`,
      transform: `translate(${item.x * UNIT_X}, ${item.y * UNIT_Y})`,
      tabindex: "0",
      role: "button",
      "data-id": item.id,
      "data-color-id": item.colorId,
      "aria-label": tileAriaLabel(item),
    });

    group.append(matrixFill(item));
    group.append(matrixOutline(item));
    group.append(attributeLabel(item));
    fragment.append(group);
  });
  mapSvg.append(fragment);
}

function tileAriaLabel(item) {
  return `${item.id} ${item.attribute} ${matrices[item.shape].label} ${getName(item.colorId)}`;
}

function matrixFill(item) {
  const color = getColor(item.colorId);
  const rows = matrices[item.shape].cells;
  const scale = matrices[item.shape].scale || 1;
  const parts = [];
  rows.forEach((row, y) => {
    [...row].forEach((value, x) => {
      if (value !== "1") return;
      parts.push(`M${x * scale * UNIT_X} ${y * scale * UNIT_Y}H${(x + 1) * scale * UNIT_X}V${(y + 1) * scale * UNIT_Y}H${x * scale * UNIT_X}Z`);
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
    d: edges.map(([x1, y1, x2, y2]) => `M${x1 * UNIT_X} ${y1 * UNIT_Y}L${x2 * UNIT_X} ${y2 * UNIT_Y}`).join(""),
    fill: "none",
  });
}

function attributeLabel(item) {
  const label = attributeLabels[item.attribute] || "";
  if (!label) return svgEl("g", {});
  const rows = matrices[item.shape].cells;
  const scale = matrices[item.shape].scale || 1;
  const width = rows[0].length * scale * UNIT_X;
  const height = rows.length * scale * UNIT_Y;
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

function traceCanvasOutline(context, item) {
  const occupied = expandedCells(item);
  context.beginPath();
  occupied.forEach((key) => {
    const [x, y] = key.split(",").map(Number);
    const absoluteX = item.x + x;
    const absoluteY = item.y + y;
    if (!occupied.has(`${x},${y - 1}`)) {
      context.moveTo(absoluteX * UNIT_X, absoluteY * UNIT_Y);
      context.lineTo((absoluteX + 1) * UNIT_X, absoluteY * UNIT_Y);
    }
    if (!occupied.has(`${x + 1},${y}`)) {
      context.moveTo((absoluteX + 1) * UNIT_X, absoluteY * UNIT_Y);
      context.lineTo((absoluteX + 1) * UNIT_X, (absoluteY + 1) * UNIT_Y);
    }
    if (!occupied.has(`${x},${y + 1}`)) {
      context.moveTo((absoluteX + 1) * UNIT_X, (absoluteY + 1) * UNIT_Y);
      context.lineTo(absoluteX * UNIT_X, (absoluteY + 1) * UNIT_Y);
    }
    if (!occupied.has(`${x - 1},${y}`)) {
      context.moveTo(absoluteX * UNIT_X, (absoluteY + 1) * UNIT_Y);
      context.lineTo(absoluteX * UNIT_X, absoluteY * UNIT_Y);
    }
  });
}

function renderNavigationCanvas() {
  const context = navigationCanvas.getContext("2d", { alpha: true });
  context.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
  context.lineJoin = "miter";
  context.lineCap = "square";

  modules.forEach((item) => {
    const rows = matrices[item.shape].cells;
    const scale = matrices[item.shape].scale || 1;
    context.globalAlpha = activeCategoryFilter !== "all" && activeCategoryFilter !== item.attribute ? 0.2 : 1;
    context.fillStyle = getColor(item.colorId);
    rows.forEach((row, y) => {
      [...row].forEach((value, x) => {
        if (value !== "1") return;
        context.fillRect(
          (item.x + x * scale) * UNIT_X,
          (item.y + y * scale) * UNIT_Y,
          scale * UNIT_X,
          scale * UNIT_Y,
        );
      });
    });
    traceCanvasOutline(context, item);
    context.strokeStyle = "rgba(35, 24, 14, 0.92)";
    context.lineWidth = 2.2;
    context.stroke();
  });

  const selected = selectedModule ? moduleById.get(selectedModule) : null;
  if (selected) {
    context.globalAlpha = 1;
    traceCanvasOutline(context, selected);
    context.strokeStyle = "#ffffff";
    context.lineWidth = 4 / Math.max(viewState.scale, 0.08);
    context.stroke();
  }
  context.globalAlpha = 1;
}

function scheduleNavigationCanvas() {
  if (canvasFrame) return;
  canvasFrame = window.requestAnimationFrame(() => {
    renderNavigationCanvas();
    canvasFrame = 0;
  });
}

function paintModule(id) {
  const item = moduleById.get(id);
  if (!item) return;
  const previousSelection = selectedModule;
  item.colorId = activeColor;
  selectedModule = id;
  saveState();
  if (previousSelection && previousSelection !== id) {
    mapSvg.querySelector(`.tile[data-id="${previousSelection}"]`)?.classList.remove("selected");
  }
  const tile = mapSvg.querySelector(`.tile[data-id="${id}"]`);
  if (tile) {
    tile.classList.add("selected");
    tile.dataset.colorId = item.colorId;
    tile.setAttribute("aria-label", tileAriaLabel(item));
    tile.querySelector(".tile-fill")?.setAttribute("fill", getColor(item.colorId));
    mapSvg.append(tile);
  }
  scheduleNavigationCanvas();
  updateSelectionInfo();
  renderStatistics();
}

function updateMapFiltering() {
  mapSvg.querySelectorAll(".tile").forEach((tile) => {
    const item = moduleById.get(tile.dataset.id);
    tile.classList.toggle(
      "dimmed",
      activeCategoryFilter !== "all" && activeCategoryFilter !== item?.attribute,
    );
  });
  scheduleNavigationCanvas();
}

function updateColorModules(colorId, updateFill) {
  mapSvg.querySelectorAll(`.tile[data-color-id="${colorId}"]`).forEach((tile) => {
    const item = moduleById.get(tile.dataset.id);
    if (!item) return;
    tile.setAttribute("aria-label", tileAriaLabel(item));
    if (updateFill) {
      tile.querySelector(".tile-fill")?.setAttribute("fill", getColor(colorId));
    }
  });
  scheduleNavigationCanvas();
  renderStatistics();
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
      updateMapFiltering();
      renderCategoryFilter();
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
      scheduleSaveState();
      updateColorModules(item.id, true);
      renderPalette();
      updateSelectionInfo();
    });
    const name = document.createElement("input");
    name.type = "text";
    name.value = item.name;
    name.addEventListener("input", () => {
      item.name = name.value.trim() || "未命名";
      scheduleSaveState();
      updateColorModules(item.id, false);
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

function createStatsRow(name, count, color) {
  const row = document.createElement("div");
  row.className = "stats-row";
  const nameEl = document.createElement("div");
  nameEl.className = "stats-name";
  if (color) {
    const chip = document.createElement("span");
    chip.className = "stats-color-chip";
    chip.style.background = color;
    nameEl.append(chip);
  }
  const label = document.createElement("span");
  label.textContent = name;
  nameEl.append(label);
  const countEl = document.createElement("strong");
  countEl.className = "stats-count";
  if (count === 0) {
    countEl.classList.add("empty");
    countEl.textContent = "无";
  } else {
    countEl.textContent = String(count);
  }
  row.append(nameEl, countEl);
  return row;
}

function renderStatistics() {
  const statsByColor = new Map();
  state.palette
    .filter((item) => item.id !== "empty")
    .forEach((item) => statsByColor.set(item.id, new Map()));

  modules.forEach((item) => {
    if (item.colorId === "empty") return;
    if (!statsByColor.has(item.colorId)) statsByColor.set(item.colorId, new Map());
    const attributeCounts = statsByColor.get(item.colorId);
    attributeCounts.set(item.attribute, (attributeCounts.get(item.attribute) || 0) + 1);
  });

  colorStats.innerHTML = "";
  const colorFragment = document.createDocumentFragment();
  state.palette.filter((item) => item.id !== "empty").forEach((item) => {
    const attributeCounts = statsByColor.get(item.id) || new Map();
    const total = [...attributeCounts.values()].reduce((sum, count) => sum + count, 0);
    const group = document.createElement("div");
    group.className = "stats-color-group";
    group.append(createStatsRow(item.name, total, item.color));

    if (total > 0) {
      const sublist = document.createElement("div");
      sublist.className = "stats-sublist";
      const orderedAttributes = [
        ...attributes,
        ...[...attributeCounts.keys()].filter((attribute) => !attributes.includes(attribute)),
      ];
      orderedAttributes.forEach((attribute) => {
        const count = attributeCounts.get(attribute) || 0;
        if (count === 0) return;
        const row = createStatsRow(attribute, count);
        row.classList.add("stats-subrow");
        sublist.append(row);
      });
      group.append(sublist);
    }
    colorFragment.append(group);
  });
  colorStats.append(colorFragment);
}

function renderAll() {
  renderMap();
  renderNavigationCanvas();
  renderPalette();
  renderCategoryFilter();
  renderColorEditor();
  updateSelectionInfo();
  renderStatistics();
}

let saveTimer = 0;

function scheduleSaveState() {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(saveState, 120);
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
  moduleById = new Map(modules.map((item) => [item.id, item]));
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
  const svg = mapSvg.cloneNode(true);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", String(MAP_WIDTH));
  svg.setAttribute("height", String(MAP_HEIGHT));
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
  canvas.width = MAP_WIDTH;
  canvas.height = MAP_HEIGHT;
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

mapSvg.addEventListener("click", (event) => {
  const tile = event.target.closest(".tile");
  if (tile) paintModule(tile.dataset.id);
});

mapSvg.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const tile = event.target.closest(".tile");
  if (!tile) return;
  event.preventDefault();
  paintModule(tile.dataset.id);
});

panelToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("panel-open");
  document.body.classList.remove("color-panel-open");
  document.body.classList.remove("stats-panel-open");
  panelToggle.setAttribute("aria-expanded", String(isOpen));
  colorToggle.setAttribute("aria-expanded", "false");
  statsToggle.setAttribute("aria-expanded", "false");
});

panelClose.addEventListener("click", () => {
  document.body.classList.remove("panel-open");
  panelToggle.setAttribute("aria-expanded", "false");
});

colorToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("color-panel-open");
  document.body.classList.remove("panel-open");
  document.body.classList.remove("stats-panel-open");
  colorToggle.setAttribute("aria-expanded", String(isOpen));
  panelToggle.setAttribute("aria-expanded", "false");
  statsToggle.setAttribute("aria-expanded", "false");
});

colorClose.addEventListener("click", () => {
  document.body.classList.remove("color-panel-open");
  colorToggle.setAttribute("aria-expanded", "false");
});

statsToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("stats-panel-open");
  document.body.classList.remove("panel-open");
  document.body.classList.remove("color-panel-open");
  statsToggle.setAttribute("aria-expanded", String(isOpen));
  panelToggle.setAttribute("aria-expanded", "false");
  colorToggle.setAttribute("aria-expanded", "false");
  if (isOpen) renderStatistics();
});

statsClose.addEventListener("click", () => {
  document.body.classList.remove("stats-panel-open");
  statsToggle.setAttribute("aria-expanded", "false");
});

function clampScale(scale) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
}

function clampPosition() {
  const bounds = mapViewport.getBoundingClientRect();
  const visibleEdge = Math.min(90, bounds.width / 3, bounds.height / 3);
  const scaledWidth = MAP_WIDTH * viewState.scale;
  const scaledHeight = MAP_HEIGHT * viewState.scale;
  viewState.x = Math.min(bounds.width - visibleEdge, Math.max(visibleEdge - scaledWidth, viewState.x));
  viewState.y = Math.min(bounds.height - visibleEdge, Math.max(visibleEdge - scaledHeight, viewState.y));
}

function enterNavigationMode() {
  mapSurface.classList.add("map-navigating");
  window.clearTimeout(navigationIdleTimer);
  navigationIdleTimer = window.setTimeout(() => {
    mapSurface.classList.remove("map-navigating");
  }, 180);
}

function applyView() {
  clampPosition();
  enterNavigationMode();
  if (viewFrame) return;
  viewFrame = window.requestAnimationFrame(() => {
    mapSurface.style.transform = `translate3d(${viewState.x}px, ${viewState.y}px, 0) scale(${viewState.scale})`;
    mapSurface.classList.toggle("map-overview", viewState.scale < 0.65);
    zoomLabel.textContent = `${Math.round(viewState.scale * 100)}%`;
    viewFrame = 0;
  });
}

function fitMap() {
  const bounds = mapViewport.getBoundingClientRect();
  const padding = bounds.width < 600 ? 24 : 72;
  viewState.scale = clampScale(Math.min(
    (bounds.width - padding * 2) / MAP_WIDTH,
    (bounds.height - padding * 2) / MAP_HEIGHT,
  ));
  viewState.x = (bounds.width - MAP_WIDTH * viewState.scale) / 2;
  viewState.y = (bounds.height - MAP_HEIGHT * viewState.scale) / 2;
  viewReady = true;
  applyView();
}

function zoomAt(clientX, clientY, nextScale) {
  const bounds = mapViewport.getBoundingClientRect();
  const cursorX = clientX - bounds.left;
  const cursorY = clientY - bounds.top;
  const scale = clampScale(nextScale);
  const mapX = (cursorX - viewState.x) / viewState.scale;
  const mapY = (cursorY - viewState.y) / viewState.scale;
  viewState.x = cursorX - mapX * scale;
  viewState.y = cursorY - mapY * scale;
  viewState.scale = scale;
  applyView();
}

function zoomFromCenter(factor) {
  const bounds = mapViewport.getBoundingClientRect();
  zoomAt(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2, viewState.scale * factor);
}

mapViewport.addEventListener("wheel", (event) => {
  event.preventDefault();
  zoomAt(event.clientX, event.clientY, viewState.scale * Math.exp(-event.deltaY * 0.0015));
}, { passive: false });

mapViewport.addEventListener("dblclick", (event) => {
  event.preventDefault();
  zoomAt(event.clientX, event.clientY, viewState.scale * 1.55);
});

mapViewport.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 && event.pointerType === "mouse") return;
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  suppressMapClick = false;

  if (activePointers.size === 1) {
    dragStart = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      mapX: viewState.x,
      mapY: viewState.y,
    };
  } else if (activePointers.size === 2) {
    const [a, b] = [...activePointers.values()];
    pinchStart = {
      distance: Math.hypot(a.x - b.x, a.y - b.y),
      scale: viewState.scale,
    };
    dragStart = null;
    mapViewport.classList.add("dragging");
    activePointers.forEach((_, pointerId) => {
      if (!mapViewport.hasPointerCapture(pointerId)) {
        mapViewport.setPointerCapture(pointerId);
      }
    });
  }
});

mapViewport.addEventListener("pointermove", (event) => {
  if (!activePointers.has(event.pointerId)) return;
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (activePointers.size === 2 && pinchStart) {
    const [a, b] = [...activePointers.values()];
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, pinchStart.scale * distance / pinchStart.distance);
    suppressMapClick = true;
    return;
  }

  if (!dragStart) return;
  const dx = event.clientX - dragStart.pointerX;
  const dy = event.clientY - dragStart.pointerY;
  if (Math.hypot(dx, dy) > 4 && !suppressMapClick) {
    suppressMapClick = true;
    mapViewport.classList.add("dragging");
    if (!mapViewport.hasPointerCapture(event.pointerId)) {
      mapViewport.setPointerCapture(event.pointerId);
    }
  }
  if (!suppressMapClick) return;
  viewState.x = dragStart.mapX + dx;
  viewState.y = dragStart.mapY + dy;
  applyView();
});

function releasePointer(event) {
  activePointers.delete(event.pointerId);
  if (activePointers.size === 0) {
    dragStart = null;
    pinchStart = null;
    mapViewport.classList.remove("dragging");
    if (suppressMapClick) {
      window.setTimeout(() => {
        suppressMapClick = false;
      }, 0);
    }
  } else if (activePointers.size === 1) {
    const pointer = [...activePointers.values()][0];
    dragStart = {
      pointerX: pointer.x,
      pointerY: pointer.y,
      mapX: viewState.x,
      mapY: viewState.y,
    };
    pinchStart = null;
  }
}

mapViewport.addEventListener("pointerup", releasePointer);
mapViewport.addEventListener("pointercancel", releasePointer);
mapViewport.addEventListener("click", (event) => {
  if (!suppressMapClick) return;
  event.preventDefault();
  event.stopPropagation();
  suppressMapClick = false;
}, true);

document.querySelector("#zoomInBtn").addEventListener("click", () => zoomFromCenter(1.3));
document.querySelector("#zoomOutBtn").addEventListener("click", () => zoomFromCenter(1 / 1.3));
document.querySelector("#fitMapBtn").addEventListener("click", fitMap);

window.addEventListener("resize", () => {
  if (!viewReady) return;
  applyView();
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
    colorId: savedColorForItem(item, imported.colors)
      || imported.colors[item.id.replace(/^map-\d-\d-/, "")]
      || "empty",
  }));
  moduleById = new Map(modules.map((item) => [item.id, item]));
  state = { palette: imported.palette, activeColor: imported.activeColor || "orange" };
  activeColor = state.activeColor;
  activeCategoryFilter = "all";
  selectedModule = null;
  saveState();
  renderAll();
  event.target.value = "";
});

const mobileLayoutQuery = window.matchMedia("(max-width: 900px)");

function closePanelsForMobile() {
  if (!mobileLayoutQuery.matches) return;
  document.body.classList.remove("panel-open", "stats-panel-open", "color-panel-open");
  panelToggle.setAttribute("aria-expanded", "false");
  statsToggle.setAttribute("aria-expanded", "false");
  colorToggle.setAttribute("aria-expanded", "false");
}

mobileLayoutQuery.addEventListener("change", closePanelsForMobile);
closePanelsForMobile();

renderAll();
requestAnimationFrame(fitMap);
window.lucide?.createIcons({
  attrs: {
    "stroke-width": 2,
  },
});
