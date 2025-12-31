export type LearningLevel = 'beginner' | 'intermediate' | 'advanced' | 'practical' | 'business';

export interface LearningNode {
  id: string;
  title: string;
  level: LearningLevel;
  children?: LearningNode[];
  contentType: 'chapter' | 'lesson';
  estimatedTime: number; // 分钟
  hasExercise?: boolean;
}

export interface LessonContent {
  id: string;
  title: string;
  content: string; // Markdown格式
  codeExamples?: CodeExample[];
  relatedTopics?: string[];
  keywords?: string[];
}

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  description?: string;
}

export type ExerciseType = 'editor' | 'challenge' | 'project';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  description: string;
  difficulty: Difficulty;
  initialCode: {
    html?: string;
    css?: string;
    javascript?: string;
  };
  testCases?: TestCase[];
  referenceAnswer?: {
    html?: string;
    css?: string;
    javascript?: string;
  };
  hints?: string[];
}

export interface TestCase {
  id: string;
  description: string;
  input: unknown;
  expectedOutput: unknown;
}
