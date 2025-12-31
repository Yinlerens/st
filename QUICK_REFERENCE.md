# 快速参考手册

## 📁 项目文件说明

### 配置文件
- `package.json` - 项目依赖和脚本配置
- `tsconfig.json` - TypeScript 配置
- `vite.config.ts` - Vite 构建工具配置
- `tailwind.config.js` - Tailwind CSS 配置
- `.eslintrc.cjs` - ESLint 代码检查配置
- `.prettierrc` - Prettier 代码格式化配置

### 文档文件
- `README.md` - 项目主文档
- `INSTALL.md` - 安装指南
- `USER_GUIDE.md` - 用户使用手册
- `DEVELOPMENT.md` - 开发者指南
- `PROJECT_STATUS.md` - 项目状态报告
- `TODO.md` - 任务清单

### 源代码目录
- `electron/` - Electron 主进程代码
- `src/` - React 应用源代码
- `public/` - 静态资源文件

## 🚀 常用命令

### 安装和启动
```bash
pnpm install              # 安装依赖
pnpm run dev             # 启动 Web 开发服务器
pnpm run electron:dev    # 启动 Electron 应用
```

### 构建和打包
```bash
pnpm run build           # 构建 Web 版本
pnpm run build:win       # 构建 Windows 安装包
```

### 代码质量
```bash
pnpm run lint            # 检查代码规范
pnpm run format          # 格式化代码
```

## 📂 目录结构

```
st/
├── electron/                      # Electron 主进程
│   ├── main.ts                   # 主进程入口,窗口管理
│   └── preload.ts                # 预加载脚本,API暴露
│
├── src/                          # React 应用
│   ├── components/               # 组件
│   │   └── layout/
│   │       └── MainLayout.tsx    # 主布局组件
│   │
│   ├── data/                     # 数据文件
│   │   ├── roadmap.ts           # 学习路线数据
│   │   └── lessons.ts           # 课程内容数据
│   │
│   ├── pages/                    # 页面组件
│   │   ├── Welcome.tsx          # 欢迎页
│   │   ├── LearningRoadmap.tsx  # 学习路线图
│   │   ├── LessonDetail.tsx     # 课程详情
│   │   ├── Practice.tsx         # 实战练习
│   │   ├── Progress.tsx         # 学习进度
│   │   └── Settings.tsx         # 个人中心
│   │
│   ├── store/                    # Zustand 状态管理
│   │   ├── useThemeStore.ts     # 主题管理
│   │   └── useProgressStore.ts  # 进度管理
│   │
│   ├── types/                    # TypeScript 类型
│   │   └── content.ts           # 内容类型定义
│   │
│   ├── App.tsx                   # 应用主组件
│   ├── main.tsx                  # 入口文件
│   └── index.css                 # 全局样式
│
└── public/                       # 静态资源
```

## 🔧 技术栈速查

### 核心技术
- **Electron**: 28.x - 跨平台桌面应用框架
- **React**: 18.2 - UI 框架
- **TypeScript**: 5.x - 类型安全
- **Vite**: 5.x - 快速构建工具

### UI 和样式
- **Ant Design**: 5.x - UI 组件库
- **Tailwind CSS**: 3.x - 工具类样式框架
- **React Syntax Highlighter**: 代码高亮

### 状态和路由
- **Zustand**: 4.x - 轻量级状态管理
- **React Router**: 6.x - 路由管理

### 内容渲染
- **react-markdown**: Markdown 渲染
- **Monaco Editor**: 代码编辑器 (计划中)

## 📝 快速代码片段

### 创建新页面

```typescript
// src/pages/NewPage.tsx
import { Typography } from 'antd';

const { Title } = Typography;

const NewPage = () => {
  return (
    <div>
      <Title level={2}>新页面</Title>
      <p>页面内容</p>
    </div>
  );
};

export default NewPage;
```

### 添加路由

```typescript
// src/App.tsx
import NewPage from './pages/NewPage';

// 在 Routes 中添加
<Route path="/new-page" element={<NewPage />} />
```

### 创建 Zustand Store

```typescript
// src/store/useNewStore.ts
import { create } from 'zustand';

interface NewStore {
  count: number;
  increment: () => void;
}

export const useNewStore = create<NewStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### 使用 Store

```typescript
import { useNewStore } from '@/store/useNewStore';

const MyComponent = () => {
  const { count, increment } = useNewStore();
  
  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  );
};
```

### IPC 通信

```typescript
// 渲染进程调用主进程
const exportData = async () => {
  if (window.electronAPI) {
    const result = await window.electronAPI.exportData(data);
    if (result.success) {
      console.log('导出成功');
    }
  }
};
```

## 🎨 样式使用

### Tailwind CSS 类名

```tsx
<div className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-lg">
  内容
</div>
```

### Ant Design 组件

```tsx
import { Button, Card, Space } from 'antd';

<Space>
  <Button type="primary">主按钮</Button>
  <Button>次按钮</Button>
</Space>
```

## 🔍 调试技巧

### 控制台调试
```typescript
console.log('调试信息:', data);
console.table(arrayData);
console.error('错误:', error);
```

### React DevTools
- 安装浏览器扩展
- 查看组件层级和 Props
- 查看 Hooks 状态

### Zustand DevTools
```typescript
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools((set) => ({ /* ... */ }))
);
```

## 📊 数据结构

### 学习路线节点
```typescript
interface LearningNode {
  id: string;              // 唯一标识
  title: string;           // 标题
  level: LearningLevel;    // 难度级别
  children?: LearningNode[]; // 子节点
  contentType: 'chapter' | 'lesson'; // 类型
  estimatedTime: number;   // 预估时长(分钟)
  hasExercise?: boolean;   // 是否有练习
}
```

### 课程内容
```typescript
interface LessonContent {
  id: string;
  title: string;
  content: string;         // Markdown 格式
  codeExamples?: CodeExample[];
  relatedTopics?: string[];
  keywords?: string[];
}
```

### 学习进度
```typescript
interface LessonProgress {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  lastVisitTime: number;
  readingProgress: number;
  notes: string;
}
```

## 🌐 API 参考

### Electron API (通过 window.electronAPI)

```typescript
// 导出数据
window.electronAPI.exportData(jsonString): Promise<Result>

// 导入数据
window.electronAPI.importData(): Promise<Result>

// 读取文件
window.electronAPI.readFile(path): Promise<Result>

// 写入文件
window.electronAPI.writeFile(path, data): Promise<Result>
```

## 🎯 常见任务

### 添加新课程
1. 在 `src/data/roadmap.ts` 添加节点
2. 在 `src/data/lessons.ts` 添加内容
3. 编写 Markdown 格式的课程内容

### 修改主题颜色
1. 编辑 `tailwind.config.js` 的 colors 配置
2. 编辑 `src/App.tsx` 的 Ant Design theme 配置

### 添加新的状态
1. 在 `src/store/` 创建新 store
2. 定义 interface
3. 使用 create 函数创建 store
4. 在组件中使用 useStore hook

## 🐛 问题排查

### 常见错误

**模块找不到**
```bash
pnpm install
```

**TypeScript 类型错误**
```bash
pnpm run build  # 重新生成类型
```

**端口被占用**
- 修改 vite.config.ts 中的 port

**Electron 启动失败**
- 检查主进程代码是否有错误
- 查看控制台错误信息

## 📚 学习资源

### 官方文档
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Electron 官方文档](https://www.electronjs.org/)
- [Ant Design 官方文档](https://ant.design/)
- [Tailwind CSS 官方文档](https://tailwindcss.com/)

### 推荐教程
- React 18 新特性
- TypeScript 从入门到精通
- Electron 桌面应用开发
- Zustand 状态管理实战

---

**更新时间**: 2024-01-01  
**版本**: v1.0.0
