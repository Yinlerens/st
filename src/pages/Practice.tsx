import { useState } from 'react';
import { Typography, Card, Row, Col, Tag, Button, Modal } from 'antd';
import { CodeOutlined, TrophyOutlined } from '@ant-design/icons';
import { exercisesData } from '../data/exercises';
import EditorExercise from '../components/EditorExercise';

const { Title, Text, Paragraph } = Typography;

const Practice = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const exercises = Object.values(exercisesData);

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'green',
      medium: 'orange',
      hard: 'red',
    };
    return colors[difficulty as keyof typeof colors] || 'default';
  };

  const getDifficultyText = (difficulty: string) => {
    const texts = {
      easy: '简单',
      medium: '中等',
      hard: '困难',
    };
    return texts[difficulty as keyof typeof texts] || difficulty;
  };

  const getTypeIcon = (type: string) => {
    return type === 'editor' ? <CodeOutlined /> : <TrophyOutlined />;
  };

  const getTypeText = (type: string) => {
    const texts = {
      editor: '编辑器练习',
      challenge: '挑战题',
      project: '项目实战',
    };
    return texts[type as keyof typeof texts] || type;
  };

  const handleStartExercise = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedExercise(null);
  };

  const currentExercise = selectedExercise ? exercisesData[selectedExercise] : null;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>实战练习</Title>
        <Text type="secondary">
          通过实践巩固知识,每个练习都配有详细说明和参考答案
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {exercises.map((exercise) => (
          <Col xs={24} md={12} lg={8} key={exercise.id}>
            <Card
              hoverable
              title={
                <div>
                  {getTypeIcon(exercise.type)} {exercise.title}
                </div>
              }
              extra={
                <Tag color={getDifficultyColor(exercise.difficulty)}>
                  {getDifficultyText(exercise.difficulty)}
                </Tag>
              }
            >
              <div style={{ marginBottom: 8 }}>
                <Tag>{getTypeText(exercise.type)}</Tag>
              </div>
              <Paragraph ellipsis={{ rows: 2 }}>{exercise.description}</Paragraph>
              <Button
                type="primary"
                block
                onClick={() => handleStartExercise(exercise.id)}
              >
                开始练习
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: 24 }}>
        <Title level={4}>练习说明</Title>
        <Paragraph>
          • <strong>编辑器练习</strong>: 提供在线代码编辑器,实时预览运行结果
        </Paragraph>
        <Paragraph>
          • <strong>挑战题</strong>: 通过测试用例验证代码正确性
        </Paragraph>
        <Paragraph>
          • <strong>项目实战</strong>: 综合运用知识完成实际项目
        </Paragraph>
        <Paragraph>
          • 点击"开始练习"按钮进入练习界面
        </Paragraph>
        <Paragraph>
          • 完成后可以查看参考答案学习最佳实践
        </Paragraph>
      </Card>

      {/* 练习模态框 */}
      <Modal
        title={null}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width="95%"
        style={{ top: 20 }}
        destroyOnClose
      >
        {currentExercise && (
          <EditorExercise
            exerciseId={currentExercise.id}
            title={currentExercise.title}
            description={currentExercise.description}
            initialCode={currentExercise.initialCode}
          />
        )}
      </Modal>
    </div>
  );
};

export default Practice;
