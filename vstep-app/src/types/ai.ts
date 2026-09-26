/**
 * AI Domain Entities and Interfaces
 * Architecture: Clean Architecture - Domain Layer / Adapter Target Interface
 */

import { CEFRBand } from './exam';
export type { CEFRBand };

export interface CriteriaScores {
  taskFulfillment: number;
  organization: number;
  lexicalResource: number;
  grammarAccuracy: number;
}

export interface GrammarError {
  original: string;
  corrected: string;
  explanation: string;
  type?: 'grammar' | 'spelling' | 'collocation' | 'punctuation';
}

export interface AIEvaluationDTO {
  overallScore: number;
  cefrBand: CEFRBand;
  criteriaScores: CriteriaScores;
  grammarErrors: GrammarError[];
  improvedSample: string;
  feedback?: string;
  timestamp?: string;
}

export interface SpeakingEvaluationDTO {
  overallScore: number;
  cefrBand: CEFRBand;
  fluencyScore: number;
  lexicalScore: number;
  grammarScore: number;
  taskFulfillmentScore: number;
  pronunciationNotes?: string;
  feedback: string;
  suggestions: string[];
}

export interface IAIEvaluator {
  evaluateEssay(prompt: string, essay: string, taskType?: 'TASK1' | 'TASK2'): Promise<AIEvaluationDTO>;
  evaluateSpeaking?(topic: string, transcription: string, part: number): Promise<SpeakingEvaluationDTO>;
}
