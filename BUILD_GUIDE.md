# 应用打包指南

## Windows 打包配置

本项目已配置 electron-builder 用于 Windows 平台打包。

### 打包配置说明

在 `package.json` 中的 build 配置:

```json
{
  "build": {
    "appId": "com.frontend.learning",
    "productName": "前端学习路线",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "dist-electron/**/*"
    ],
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64"]
        }
      ],
      "icon": "build/icon.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    }
  }
}
```

### 准备工作

1. **创建应用图标**

在项目根目录创建 `build/` 文件夹,并放置应用图标:
- `build/icon.ico` - Windows 图标 (256x256 或更大)
- `build/icon.png` - 通用图标 (512x512 推荐)

2. **安装依赖**

确保所有依赖已正确安装:
```bash
pnpm install
```

### 打包命令

```bash
# 仅构建不打包
pnpm run build

# 构建并打包 Windows 安装程序
pnpm run build:win

# 完整打包流程
pnpm run electron:build
```

### 打包输出

打包完成后,安装程序位于:
```
release/
  └── 前端学习路线 Setup 1.0.0.exe
```

### 安装程序特性

- **NSIS 安装向导**: 专业的 Windows 安装界面
- **自定义安装路径**: 用户可选择安装位置
- **桌面快捷方式**: 自动创建桌面图标
- **开始菜单**: 添加到开始菜单
- **卸载程序**: 完整的卸载支持

### 优化建议

1. **减小安装包体积**
   - 移除未使用的依赖
   - 优化资源文件
   - 使用代码分割

2. **安全签名**
   ```bash
   # 需要代码签名证书
   pnpm run build:win --win --publish never
   ```

3. **自动更新**
   - 集成 electron-updater
   - 配置更新服务器
   - 实现版本检查

### 常见问题

**Q: 打包失败?**
- 检查 Node.js 版本 >= 16.x
- 确保所有依赖已安装
- 查看错误日志

**Q: 安装包太大?**
- 当前大小约 150-200MB
- 可通过优化减小到 100MB 左右
- 考虑使用 7-Zip 压缩

**Q: 如何添加自动更新?**
- 安装 electron-updater
- 配置更新服务器
- 参考官方文档

### 发布流程

1. 更新版本号
```bash
npm version patch  # 或 minor/major
```

2. 构建打包
```bash
pnpm run build:win
```

3. 测试安装
- 在干净的 Windows 系统上测试
- 验证所有功能正常
- 检查卸载是否完整

4. 发布
- 上传到发布平台
- 提供下载链接
- 编写发布说明

### 多平台支持 (未来)

虽然当前仅支持 Windows,架构支持扩展到其他平台:

```json
{
  "mac": {
    "target": "dmg",
    "icon": "build/icon.icns"
  },
  "linux": {
    "target": "AppImage",
    "icon": "build/icon.png"
  }
}
```

---

**注意**: 首次打包可能需要下载 Electron 二进制文件,请耐心等待。
