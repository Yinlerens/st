import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 文件操作
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath: string, data: string) =>
    ipcRenderer.invoke('write-file', filePath, data),

  // 数据导入导出
  exportData: (data: string) => ipcRenderer.invoke('export-data', data),
  importData: () => ipcRenderer.invoke('import-data'),
});

// TypeScript类型声明
export interface ElectronAPI {
  readFile: (filePath: string) => Promise<{ success: boolean; data?: string; error?: string }>;
  writeFile: (filePath: string, data: string) => Promise<{ success: boolean; error?: string }>;
  exportData: (data: string) => Promise<{ success: boolean; error?: string }>;
  importData: () => Promise<{ success: boolean; data?: string; error?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
