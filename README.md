# Last War 地图标记器

一个可以直接托管在 GitHub Pages 的静态网页。每个用户的地图标记和颜色配置都会保存在自己的浏览器 `localStorage` 中，不需要后端服务。

## 使用

直接打开 `index.html` 即可使用。

放到 GitHub Pages 时，把仓库 Pages 来源设为当前分支根目录即可。

## 功能

- 11 x 11 地图格子
- 支持「形块、」形块、倒土形、方块、十字形
- 点击格子按当前画笔上色
- 可修改每个颜色的名称和色值
- 自动保存到本地浏览器
- 支持导出和导入 JSON 备份

## 固定属性分配

块属性在 `app.js` 顶部的 `attributeAssignments` 中配置，例如：

```js
const attributeAssignments = {
  A: ["corner-tl", "corner-tr"],
  B: ["top-1", "top-2"],
  C: [],
  D: [],
  E: [],
  F: [],
};
```

前端用户只能筛选属性和修改颜色标记，不能修改块属性。
