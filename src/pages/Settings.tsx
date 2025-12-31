import { Card, Switch, Slider, Typography, Button, Space, Divider, message } from 'antd';
import {
  BulbOutlined,
  FontSizeOutlined,
  ExportOutlined,
  ImportOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useThemeStore } from '../store/useThemeStore';
import { useProgressStore } from '../store/useProgressStore';

const { Title, Text, Paragraph } = Typography;

const Settings = () => {
  const { isDarkMode, fontSize, toggleTheme, setFontSize } = useThemeStore();
  const { resetProgress } = useProgressStore();

  const handleExportData = async () => {
    const { lessonProgress, exerciseProgress, studyStats } = useProgressStore.getState();
    const data = {
      lessonProgress,
      exerciseProgress,
      studyStats,
      exportTime: new Date().toISOString(),
    };

    if (window.electronAPI) {
      const result = await window.electronAPI.exportData(JSON.stringify(data, null, 2));
      if (result.success) {
        message.success('数据导出成功!');
      } else {
        message.error(`导出失败: ${result.error}`);
      }
    } else {
      // Web环境下使用浏览器下载
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `learning-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      message.success('数据导出成功!');
    }
  };

  const handleImportData = async () => {
    if (window.electronAPI) {
      const result = await window.electronAPI.importData();
      if (result.success && result.data) {
        try {
          const data = JSON.parse(result.data);
          const { lessonProgress, exerciseProgress, studyStats } = data;
          
          useProgressStore.setState({
            lessonProgress: lessonProgress || {},
            exerciseProgress: exerciseProgress || {},
            studyStats: studyStats || useProgressStore.getState().studyStats,
          });
          
          message.success('数据导入成功!');
        } catch (error) {
          message.error('数据格式错误!');
        }
      } else if (result.error) {
        message.error(`导入失败: ${result.error}`);
      }
    } else {
      message.info('请在 Electron 环境中使用此功能');
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('确定要清空所有学习进度吗?此操作不可恢复!')) {
      resetProgress();
      message.success('学习进度已清空');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>个人中心</Title>
        <Text type="secondary">管理您的应用设置和学习数据</Text>
      </div>

      <Card title="外观设置" style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 24 }}>
          <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space>
              <BulbOutlined />
              <Text>深色模式</Text>
            </Space>
            <Switch checked={isDarkMode} onChange={toggleTheme} />
          </Space>
          <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
            切换浅色/深色主题
          </Paragraph>
        </div>

        <Divider />

        <div>
          <Space align="center" style={{ marginBottom: 16 }}>
            <FontSizeOutlined />
            <Text>字体大小: {fontSize}px</Text>
          </Space>
          <Slider
            min={14}
            max={20}
            value={fontSize}
            onChange={setFontSize}
            marks={{
              14: '14px',
              16: '16px',
              18: '18px',
              20: '20px',
            }}
          />
        </div>
      </Card>

      <Card title="数据管理" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Button
              icon={<ExportOutlined />}
              onClick={handleExportData}
              block
            >
              导出学习数据
            </Button>
            <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
              将学习进度导出为 JSON 文件
            </Paragraph>
          </div>

          <div>
            <Button
              icon={<ImportOutlined />}
              onClick={handleImportData}
              block
            >
              导入学习数据
            </Button>
            <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
              从之前导出的文件中恢复学习进度
            </Paragraph>
          </div>

          <div>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleResetProgress}
              block
            >
              清空学习进度
            </Button>
            <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
              清空所有学习记录(不可恢复)
            </Paragraph>
          </div>
        </Space>
      </Card>

      <Card title="关于应用">
        <Paragraph>
          <Text strong>应用名称:</Text> 前端学习路线
        </Paragraph>
        <Paragraph>
          <Text strong>版本:</Text> 1.0.0
        </Paragraph>
        <Paragraph>
          <Text strong>描述:</Text> 系统化的前端学习桌面应用,帮助您从零基础到高级前端工程师
        </Paragraph>
        <Paragraph type="secondary">
          基于 Electron + React 18 + Vite + TypeScript 构建
        </Paragraph>
      </Card>
    </div>
  );
};

export default Settings;
