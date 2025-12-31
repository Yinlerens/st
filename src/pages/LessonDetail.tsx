import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Space, Typography, Divider, message } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { lessonsData } from '../data/lessons';
import { useProgressStore } from '../store/useProgressStore';
import { useEffect } from 'react';

const { Title } = Typography;

const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lessonProgress, updateLessonProgress } = useProgressStore();

  const lesson = lessonsData[id || ''];

  useEffect(() => {
    if (id) {
      // 更新访问时间和状态
      updateLessonProgress(id, {
        lessonId: id,
        status: lessonProgress[id]?.status || 'in_progress',
        lastVisitTime: Date.now(),
        readingProgress: 0,
        notes: lessonProgress[id]?.notes || '',
      });
    }
  }, [id]);

  if (!lesson) {
    return (
      <div>
        <Title level={3}>课程未找到</Title>
        <Button onClick={() => navigate('/roadmap')}>返回学习路线</Button>
      </div>
    );
  }

  const markAsCompleted = () => {
    if (id) {
      updateLessonProgress(id, {
        lessonId: id,
        status: 'completed',
        lastVisitTime: Date.now(),
        readingProgress: 100,
        notes: lessonProgress[id]?.notes || '',
      });
      message.success('已标记为完成!');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Space>
          <Button icon={<LeftOutlined />} onClick={() => navigate('/roadmap')}>
            返回路线图
          </Button>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={markAsCompleted}
            disabled={lessonProgress[id || '']?.status === 'completed'}
          >
            {lessonProgress[id || '']?.status === 'completed'
              ? '已完成'
              : '标记为完成'}
          </Button>
        </Space>
      </div>

      <Card>
        <Title level={2}>{lesson.title}</Title>
        <Divider />
        <div className="markdown-content">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>
      </Card>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Space size="large">
          <Button icon={<LeftOutlined />} size="large">
            上一课
          </Button>
          <Button type="primary" icon={<RightOutlined />} size="large" iconPosition="end">
            下一课
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default LessonDetail;
