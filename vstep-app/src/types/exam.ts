/**
 * Domain Entities: Exam, Section, Question, Submission
 * Architecture: Clean Architecture - Domain Layer
 */

export type SkillType = 'LISTENING' | 'READING' | 'WRITING' | 'SPEAKING';
export type CEFRBand = 'B1' | 'B2' | 'C1' | 'Below B1';

export interface QuestionOption {
  id: string;
  label: string; // 'A', 'B', 'C', 'D'
  content: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  sectionId?: string;
  orderNumber: number;
  content: string;
  options: QuestionOption[];
  correctAnswer?: string; // e.g. 'A' or option id
  explanation?: string;
}

export interface Section {
  id: string;
  examId?: string;
  skillType: SkillType;
  sectionOrder: number;
  durationMinutes: number;
  title?: string;
  description?: string;
  passageContent?: string;
  audioUrl?: string;
  transcript?: string;
  questions: Question[];
}

export interface Exam {
  id: string;
  title: string;
  examType: 'STANDARD_MOCK' | 'CUSTOM_IMPORT' | 'SKILL_PRACTICE';
  durationMinutes: number;
  totalQuestions: number;
  isPublished: boolean;
  sections: Section[];
  createdAt?: string;
}

export interface SubmissionAnswer {
  questionId: string;
  selectedOption: string;
  textAnswer?: string;
  audioBlobUrl?: string;
  isCorrect?: boolean;
}

export interface Submission {
  id: string;
  examId: string;
  userId: string;
  startedAt: string;
  submittedAt?: string;
  answers: Record<string, SubmissionAnswer>;
  finalScore?: number; // 0.0 - 10.0
  cefrBand?: CEFRBand;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'TIMED_OUT';
}
