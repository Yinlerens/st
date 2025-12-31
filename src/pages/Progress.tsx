import { Card, Row, Col, Statistic, Typography, Progress, List } from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { useProgressStore } from '../store/useProgressStore';

const { Title, Text } = Typography;

const ProgressPage = () => {
  const { lessonProgress, exerciseProgress, studyStats } = useProgressStore();

  const completedLessonsCount = Object.values(lessonProgress).filter(
    (p) => p.status === 'completed'
  ).length;

  const completedExercisesCount = Object.values(exerciseProgress).filter(
    (p) => p.completed
  ).length;

  const recentLessons = Object.values(lessonProgress)
    .sort((a, b) => b.lastVisitTime - a.lastVisitTime)
    .slice(0, 5);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}小时${minutes}分钟` : `${minutes}分钟`;
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>我的学习进度</Title>
        <Text type="secondary">查看您的学习统计和进度情况</Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已完成课程"
              value={completedLessonsCount}
              prefix={<CheckCircleOutlined />}
              suffix="课"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已完成练习"
              value={completedExercisesCount}
              prefix={<TrophyOutlined />}
              suffix="题"
              valueStyle={{ color: '#0ea5e9' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="学习时长"
              value={formatTime(studyStats.totalStudyTime)}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="连续学习"
              value={studyStats.continuousDays}
              prefix={<FireOutlined />}
              suffix="天"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="学习进度">
            <div style={{ marginBottom: 16 }}>
              <Text>基础入门</Text>
              <Progress percent={30} strokeColor="#52c41a" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text>进阶提升</Text>
              <Progress percent={10} strokeColor="#0ea5e9" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text>高级深化</Text>
              <Progress percent={0} strokeColor="#faad14" />
            </div>
            <div>
              <Text>实际业务场景</Text>
              <Progress percent={0} strokeColor="#f5222d" />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="最近学习">
            {recentLessons.length > 0 ? (
              <List
                dataSource={recentLessons}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.lessonId}
                      description={`最后访问: ${new Date(
                        item.lastVisitTime
                      ).toLocaleString('zh-CN')}`}
                    />
                    {item.status === 'completed' && (
                      <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    )}
                  </List.Item>
                )}
              />
            ) : (
              <Text type="secondary">暂无学习记录,开始您的学习之旅吧!</Text>
            )}
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }} title="成就徽章">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={8} md={6}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">初学者</Text>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">坚持者</Text>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">挑战者</Text>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">大师</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProgressPage;
