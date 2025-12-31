import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Tree, Typography, Tag, Progress, Space } from 'antd';
import {
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import { learningRoadmap } from '../data/roadmap';
import { LearningNode } from '../types/content';
import { useProgressStore } from '../store/useProgressStore';

const { Title, Text } = Typography;

const LearningRoadmap = () => {
  const navigate = useNavigate();
  const { lessonProgress } = useProgressStore();
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['beginner']);

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'green',
      intermediate: 'blue',
      advanced: 'orange',
      practical: 'purple',
      business: 'red',
    };
    return colors[level as keyof typeof colors] || 'default';
  };

  const getLevelText = (level: string) => {
    const texts = {
      beginner: '基础',
      intermediate: '进阶',
      advanced: '高级',
      practical: '实践',
      business: '业务',
    };
    return texts[level as keyof typeof texts] || level;
  };

  const getNodeProgress = (node: LearningNode): number => {
    if (node.contentType === 'lesson') {
      const progress = lessonProgress[node.id];
      return progress?.status === 'completed' ? 100 : 0;
    }

    if (node.children) {
      const total = node.children.length;
      const completed = node.children.filter((child) => {
        const progress = lessonProgress[child.id];
        return progress?.status === 'completed';
      }).length;
      return total > 0 ? (completed / total) * 100 : 0;
    }

    return 0;
  };

  const convertToTreeData = (nodes: LearningNode[]): DataNode[] => {
    return nodes.map((node) => {
      const progress = getNodeProgress(node);
      const isCompleted = progress === 100;

      return {
        key: node.id,
        title: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
            }}
          >
            <Space>
              {node.contentType === 'lesson' ? (
                <BookOutlined style={{ color: '#0ea5e9' }} />
              ) : (
                <CheckCircleOutlined
                  style={{ color: isCompleted ? '#52c41a' : '#d9d9d9' }}
                />
              )}
              <Text strong={node.contentType === 'chapter'}>
                {node.title}
              </Text>
              <Tag color={getLevelColor(node.level)}>
                {getLevelText(node.level)}
              </Tag>
              {node.contentType === 'lesson' && (
                <Space size="small">
                  <ClockCircleOutlined style={{ fontSize: 12 }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {node.estimatedTime}分钟
                  </Text>
                </Space>
              )}
            </Space>
            {node.children && (
              <div style={{ minWidth: 100 }}>
                <Progress
                  percent={Math.round(progress)}
                  size="small"
                  strokeColor="#0ea5e9"
                  showInfo={false}
                />
              </div>
            )}
          </div>
        ),
        children: node.children ? convertToTreeData(node.children) : undefined,
      };
    });
  };

  const handleSelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      const nodeId = selectedKeys[0] as string;
      // 查找节点
      const findNode = (nodes: LearningNode[]): LearningNode | undefined => {
        for (const node of nodes) {
          if (node.id === nodeId) return node;
          if (node.children) {
            const found = findNode(node.children);
            if (found) return found;
          }
        }
        return undefined;
      };

      const selectedNode = findNode(learningRoadmap);
      if (selectedNode && selectedNode.contentType === 'lesson') {
        navigate(`/lesson/${nodeId}`);
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>学习路线图</Title>
        <Text type="secondary">
          选择课程节点开始学习,绿色进度条表示完成情况
        </Text>
      </div>

      <Card>
        <Tree
          showLine
          expandedKeys={expandedKeys}
          onExpand={(keys) => setExpandedKeys(keys as string[])}
          onSelect={handleSelect}
          treeData={convertToTreeData(learningRoadmap)}
        />
      </Card>
    </div>
  );
};

export default LearningRoadmap;
