import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import MainLayout from './components/layout/MainLayout';
import LearningRoadmap from './pages/LearningRoadmap';
import LessonDetail from './pages/LessonDetail';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import Welcome from './pages/Welcome';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#0ea5e9',
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Welcome />} />
            <Route path="roadmap" element={<LearningRoadmap />} />
            <Route path="lesson/:id" element={<LessonDetail />} />
            <Route path="practice" element={<Practice />} />
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
