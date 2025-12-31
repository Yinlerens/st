# 前端学习路线桌面应用 - 安装与运行指南

## 项目概述

这是一个基于 Electron + React 18 + Vite + TypeScript 构建的前端学习路线桌面应用。

## 技术栈

- **桌面框架**: Electron
- **UI 框架**: React 18
- **构建工具**: Vite
- **语言**: TypeScript
- **状态管理**: Zustand
- **UI 组件**: Ant Design
- **样式**: Tailwind CSS
- **代码编辑器**: Monaco Editor
- **Markdown 渲染**: react-markdown + react-syntax-highlighter

## 系统要求

- Node.js >= 16.x
- pnpm (推荐) 或 npm

## 安装步骤

### 1. 安装 Node.js

如果您还没有安装 Node.js,请从官网下载并安装:
https://nodejs.org/

推荐安装 LTS 版本。

### 2. 安装 pnpm (可选但推荐)

```bash
npm install -g pnpm
```

### 3. 安装项目依赖

在项目根目录下运行:

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

## 运行项目

### 开发模式

```bash
# 使用 pnpm
pnpm run electron:dev

# 或使用 npm
npm run electron:dev
```

这将同时启动 Vite 开发服务器和 Electron 应用。

### 仅运行 Web 版本

如果只想在浏览器中预览:

```bash
# 使用 pnpm
pnpm run dev

# 或使用 npm
npm run dev
```

然后在浏览器中访问 http://localhost:5173

## 构建项目

### 构建 Windows 安装包

```bash
# 使用 pnpm
pnpm run build:win

# 或使用 npm
npm run build:win
```

构建完成后,安装包将位于 `release` 目录中。

### 仅构建 Web 版本

```bash
# 使用 pnpm
pnpm run build

# 或使用 npm
npm run build
```

## 项目结构

```
st/
├── electron/              # Electron 主进程和预加载脚本
│   ├── main.ts           # 主进程
│   └── preload.ts        # 预加载脚本
├── src/                  # React 源代码
│   ├── components/       # 组件
│   │   └── layout/       # 布局组件
│   ├── data/             # 数据文件
│   │   ├── roadmap.ts    # 学习路线数据
│   │   └── lessons.ts    # 课程内容数据
│   ├── pages/            # 页面组件
│   │   ├── Welcome.tsx
│   │   ├── LearningRoadmap.tsx
│   │   ├── LessonDetail.tsx
│   │   ├── Practice.tsx
│   │   ├── Progress.tsx
│   │   └── Settings.tsx
│   ├── store/            # Zustand 状态管理
│   │   ├── useThemeStore.ts
│   │   └── useProgressStore.ts
│   ├── types/            # TypeScript 类型定义
│   ├── App.tsx           # 应用主组件
│   ├── main.tsx          # 入口文件
│   └── index.css         # 全局样式
├── public/               # 静态资源
├── package.json
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TypeScript 配置
├── tailwind.config.js    # Tailwind CSS 配置
└── README.md             # 项目文档

```

## 开发说明

### 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查:

```bash
# 检查代码规范
pnpm run lint

# 格式化代码
pnpm run format
```

### 添加新课程

1. 在 `src/data/roadmap.ts` 中添加课程节点
2. 在 `src/data/lessons.ts` 中添加课程内容(Markdown 格式)

### 添加新练习

在 `src/data/` 目录下创建练习数据文件,参考类型定义 `src/types/content.ts`

## 常见问题

### Q: 安装依赖时报错?

A: 尝试清除缓存后重新安装:

```bash
# pnpm
pnpm store prune
pnpm install

# npm
npm cache clean --force
npm install
```

### Q: Electron 窗口无法打开?

A: 确保您的系统满足 Electron 的要求,可能需要安装额外的系统依赖。

### Q: 构建失败?

A: 检查 Node.js 版本是否 >= 16.x,并确保所有依赖都已正确安装。

## 功能特性

- ✅ 系统化学习路线
- ✅ Markdown 内容渲染
- ✅ 代码语法高亮
- ✅ 学习进度追踪
- ✅ 深色/浅色主题切换
- ✅ 数据导入导出
- ⏳ 在线代码编辑器(开发中)
- ⏳ 练习题测试验证(开发中)
- ⏳ Monaco Editor 集成(开发中)

## 贡献指南

欢迎提交 Issue 和 Pull Request!

## 许可证

MIT License
