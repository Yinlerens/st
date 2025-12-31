import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Row, Col, Space } from 'antd';
import {
  RocketOutlined,
  BookOutlined,
  CodeOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOutlined style={{ fontSize: 48, color: '#0ea5e9' }} />,
      title: '系统化学习路径',
      description: '从零基础到进阶,清晰的前端技术学习路线图',
    },
    {
      icon: <CodeOutlined style={{ fontSize: 48, color: '#0ea5e9' }} />,
      title: '理论与实践结合',
      description: '知识点讲解配合即时实战练习,强化学习效果',
    },
    {
      icon: <TrophyOutlined style={{ fontSize: 48, color: '#0ea5e9' }} />,
      title: '进度可视化',
      description: '学习进度实时记录,激励持续学习',
    },
    {
      icon: <RocketOutlined style={{ fontSize: 48, color: '#0ea5e9' }} />,
      title: '本地化体验',
      description: '桌面应用形式,无需联网即可学习',
    },
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Title level={1}>欢迎来到前端学习路线</Title>
        <Paragraph style={{ fontSize: 18, color: '#666' }}>
          系统化掌握前端开发技能,从零基础到高级工程师
        </Paragraph>
        <Space size="large" style={{ marginTop: 24 }}>
          <Button
            type="primary"
            size="large"
            icon={<BookOutlined />}
            onClick={() => navigate('/roadmap')}
          >
            开始学习
          </Button>
          <Button size="large" onClick={() => navigate('/progress')}>
            查看进度
          </Button>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <Card
              hoverable
              style={{ height: '100%', textAlign: 'center' }}
            >
              <div style={{ marginBottom: 16 }}>{feature.icon}</div>
              <Title level={4}>{feature.title}</Title>
              <Paragraph style={{ color: '#666' }}>
                {feature.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: 48 }}>
        <Title level={3}>学习路线阶段</Title>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12} lg={6}>
            <Card type="inner" title="基础入门" hoverable>
              <Paragraph>HTML、CSS、JavaScript 基础</Paragraph>
              <Paragraph type="secondary">掌握网页开发基本技能</Paragraph>
            </Card>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Card type="inner" title="进阶提升" hoverable>
              <Paragraph>ES6+、前端工程化、React 框架</Paragraph>
              <Paragraph type="secondary">具备现代前端开发能力</Paragraph>
            </Card>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Card type="inner" title="高级深化" hoverable>
              <Paragraph>React 进阶、TypeScript、性能优化</Paragraph>
              <Paragraph type="secondary">成为高级前端工程师</Paragraph>
            </Card>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Card type="inner" title="实际业务场景" hoverable>
              <Paragraph>Canvas、微前端、复杂交互</Paragraph>
              <Paragraph type="secondary">解决实际业务难点</Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Welcome;
