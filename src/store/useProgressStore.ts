import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LessonStatus = 'not_started' | 'in_progress' | 'completed';

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  lastVisitTime: number;
  readingProgress: number;
  notes: string;
}

export interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  attemptCount: number;
  lastCode: {
    html?: string;
    css?: string;
    javascript?: string;
  };
  completedTime?: number;
  testPassRate?: number;
}

export interface StudyStats {
  totalStudyTime: number;
  continuousDays: number;
  dailyRecords: Array<{
    date: string;
    studyTime: number;
  }>;
  completedLessons: number;
  completedExercises: number;
  achievements: string[];
}

interface ProgressStore {
  lessonProgress: Record<string, LessonProgress>;
  exerciseProgress: Record<string, ExerciseProgress>;
  studyStats: StudyStats;
  
  updateLessonProgress: (lessonId: string, progress: Partial<LessonProgress>) => void;
  updateExerciseProgress: (exerciseId: string, progress: Partial<ExerciseProgress>) => void;
  updateStudyStats: (stats: Partial<StudyStats>) => void;
  resetProgress: () => void;
}

const initialStats: StudyStats = {
  totalStudyTime: 0,
  continuousDays: 0,
  dailyRecords: [],
  completedLessons: 0,
  completedExercises: 0,
  achievements: [],
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      lessonProgress: {},
      exerciseProgress: {},
      studyStats: initialStats,

      updateLessonProgress: (lessonId, progress) =>
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonId]: {
              ...state.lessonProgress[lessonId],
              lessonId,
              ...progress,
            },
          },
        })),

      updateExerciseProgress: (exerciseId, progress) =>
        set((state) => ({
          exerciseProgress: {
            ...state.exerciseProgress,
            [exerciseId]: {
              ...state.exerciseProgress[exerciseId],
              exerciseId,
              ...progress,
            },
          },
        })),

      updateStudyStats: (stats) =>
        set((state) => ({
          studyStats: {
            ...state.studyStats,
            ...stats,
          },
        })),

      resetProgress: () =>
        set({
          lessonProgress: {},
          exerciseProgress: {},
          studyStats: initialStats,
        }),
    }),
    {
      name: 'progress-storage',
    }
  )
);
