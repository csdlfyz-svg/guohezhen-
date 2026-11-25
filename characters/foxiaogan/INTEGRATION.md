# 果核镇（GUOHE TOWN）接入说明 — 佛小柑房间

本目录为**「佛小柑（불소감）」**的独立角色房间包，**全部路径均为相对路径**、**本地存储与 Service Worker 作用域完全隔离**，可直接放入团队仓库，不与任何其他居民页面或团队根目录文件冲突。

---

## 1. 推荐放置路径（课程标准结构）

直接将本包解压到「果核镇」项目根目录，使目录结构为：

```text
guohe-town/
├── index.html                  ← 果核镇团队主页
└── characters/
    └── foxiaogan/              ← 本压缩包解压后的完整目录
        ├── index.html          ← 佛小柑房间主页（5大栏目：角色·表情·应用·视频·漫画）
        ├── app-a/index.html    ← 《佛手喝茶记》记录型应用
        ├── app-b/index.html    ← 《佛手接茶香》接掉落物小游戏
        ├── assets/
        │   ├── expressions/    ← 5 张透明 3D 表情立绘
        │   ├── icons/          ← 192 / 512 方形图标
        │   └── stickers/       ← 24 张透明单图 PNG + 24格总览图
        ├── comics/             ← 中/韩双语四格漫画（第1、2话）
        ├── shorts/             ← 中/韩双语短视频（720p播放版 + 1080p下载版）
        └── follow/walker.js    ← 底部散步佛小柑脚本
```

---

## 2. 在果核镇主页绑定「佛小柑」拱门卡片

找到果核镇主页第 4 张 **「佛小柑」** 拱门卡片的按钮（`推开门，进他的房间 →`），将跳转链接设为：

```html
<a href="./characters/foxiaogan/index.html">推开门，进他的房间 →</a>
```

- 佛小柑房间左上角的深棕色 **「← 果核镇」** 胶囊按钮默认指向 `../../index.html`（直接回到果核镇团队主页）。
- **如果团队仓库把房间放在根目录 `./foxiaogan/`（而不是 `./characters/foxiaogan/`）**：只需把 `foxiaogan/index.html` 第 23 行的 `href="../../index.html"` 改为 `href="../index.html"` 即可，其余所有内部路径无需改动。

---

## 3. 可选复用素材（供团队主页卡片直接调用）

如果团队主页希望把「佛小柑」卡片图标或角色弹窗替换为真实 3D 透明立绘，可直接引用：
- **标准立绘（透明 PNG）**：`./characters/foxiaogan/assets/expressions/base.png`
- **开心表情（透明 PNG）**：`./characters/foxiaogan/assets/expressions/happy.png`
- **方形头像（带暖黄底）**：`./characters/foxiaogan/assets/icons/icon-192.png`
- **24 格表情包合集图**：`./characters/foxiaogan/assets/stickers/sheet.jpg`

---

## 4. 零冲突说明（给团队合并 PR 的同学）

- **无全局 CSS / JS 污染**：仅在进入 `characters/foxiaogan/` 时加载。
- **Service Worker 作用域隔离**：`./sw.js`、`./app-a/sw.js`、`./app-b/sw.js` 均使用相对路径注册，作用域严格限制在各自子目录，不会劫持果核镇根站。
- **localStorage 独立命名空间**：所有数据键均以 `foshou_*` 前缀隔离（`foshou_room_lang`、`foshou_app_a_v1`、`foshou_app_b_v1`、`foshou_walker_hidden`），不会覆盖队友数据。
- **不包含团队根目录 `netlify.toml`**：避免覆盖团队主站的部署配置。
