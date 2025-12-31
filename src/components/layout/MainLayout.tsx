import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  CodeOutlined,
  LineChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '欢迎',
    },
    {
      key: '/roadmap',
      icon: <BookOutlined />,
      label: '学习路线',
    },
    {
      key: '/practice',
      icon: <CodeOutlined />,
      label: '实战练习',
    },
    {
      key: '/progress',
      icon: <LineChartOutlined />,
      label: '我的进度',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '个人中心',
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          background: token.colorBgContainer,
          padding: '0 24px',
          borderBottom: `1px solid ${token.colorBorder}`,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: token.colorPrimary }}>
          前端学习路线
        </div>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{ background: token.colorBgContainer }}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: token.colorBgContainer,
              padding: 24,
              margin: 0,
              minHeight: 280,
              borderRadius: token.borderRadiusLG,
              overflow: 'auto',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
