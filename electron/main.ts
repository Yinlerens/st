import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    frame: true,
    show: false,
  });

  // 开发环境加载Vite开发服务器
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    // 生产环境加载构建后的文件
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// 应用准备就绪
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出应用 (Windows & Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC 通信处理
// 读取文件
ipcMain.handle('read-file', async (_, filePath: string) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return { success: true, data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});

// 写入文件
ipcMain.handle('write-file', async (_, filePath: string, data: string) => {
  try {
    await fs.promises.writeFile(filePath, data, 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});

// 导出数据
ipcMain.handle('export-data', async (_, data: string) => {
  const { dialog } = require('electron');
  try {
    const { filePath } = await dialog.showSaveDialog(mainWindow!, {
      title: '导出学习数据',
      defaultPath: `learning-data-${Date.now()}.json`,
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    });

    if (filePath) {
      await fs.promises.writeFile(filePath, data, 'utf-8');
      return { success: true };
    }
    return { success: false, error: '用户取消操作' };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});

// 导入数据
ipcMain.handle('import-data', async () => {
  const { dialog } = require('electron');
  try {
    const { filePaths } = await dialog.showOpenDialog(mainWindow!, {
      title: '导入学习数据',
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
      properties: ['openFile'],
    });

    if (filePaths && filePaths.length > 0) {
      const data = await fs.promises.readFile(filePaths[0], 'utf-8');
      return { success: true, data };
    }
    return { success: false, error: '用户取消操作' };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});
