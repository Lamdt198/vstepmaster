export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface ListeningTest {
  id: string;
  title: string;
  part: number;
  level: 'B1' | 'B2' | 'C1';
  description: string;
  audioDescription: string;
  transcript: string;
  questions: Question[];
}

export interface ReadingPassage {
  id: string;
  title: string;
  part: number;
  level: 'B1' | 'B2' | 'C1';
  passage: string;
  questions: Question[];
}

export interface WritingTask {
  id: string;
  title: string;
  task: number;
  level: 'B1' | 'B2' | 'C1';
  prompt: string;
  guidelines: string[];
  sampleAnswer: string;
  wordCount: { min: number; max: number };
}

export interface SpeakingTopic {
  id: string;
  title: string;
  part: number;
  level: 'B1' | 'B2' | 'C1';
  prompt: string;
  followUpQuestions: string[];
  sampleAnswer: string;
  prepTime: number;
  speakTime: number;
}
