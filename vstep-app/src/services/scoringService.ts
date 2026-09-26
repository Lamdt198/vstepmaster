/**
 * Strategy Pattern: Polymorphic Exam Scoring Architecture
 * Academic Course: Advanced Software Design (GoF Strategy Pattern)
 * Reference: Chapter 3.2.1 of Thesis Report
 */

import { CEFRBand } from '../types/exam';
import { IAIEvaluator } from '../types/ai';

export interface ScoringResult {
  score: number; // Thang điểm 10.0, làm tròn 0.5 chuẩn VSTEP
  correctCount?: number;
  totalQuestions?: number;
  cefrLevel: CEFRBand;
  details?: Record<string, unknown>;
}

export interface IScoringStrategy {
  calculateScore(submissionData: unknown): Promise<ScoringResult>;
}

/**
 * Concrete Strategy A: Chấm điểm trắc nghiệm (Listening & Reading)
 * Thuật toán xác định (deterministic), tính điểm nhanh <50ms
 */
export class ObjectiveScoringStrategy implements IScoringStrategy {
  async calculateScore(submissionData: {
    userAnswers: Record<string, string | number>;
    answerKey: Record<string, string | number>;
  }): Promise<ScoringResult> {
    const { userAnswers, answerKey } = submissionData;
    let correct = 0;
    const total = Object.keys(answerKey).length;

    for (const [qId, correctOpt] of Object.entries(answerKey)) {
      if (String(userAnswers[qId]) === String(correctOpt)) {
        correct++;
      }
    }

    const rawScore = total > 0 ? (correct / total) * 10 : 0;
    const score = Math.round(rawScore * 2) / 2; // Làm tròn 0.5 điểm chuẩn Bộ GD&ĐT

    let cefrLevel: CEFRBand = 'Below B1';
    if (score >= 8.5) cefrLevel = 'C1';
    else if (score >= 6.0) cefrLevel = 'B2';
    else if (score >= 4.0) cefrLevel = 'B1';

    return {
      score,
      correctCount: correct,
      totalQuestions: total,
      cefrLevel,
      details: { userAnswers, answerKey },
    };
  }
}

/**
 * Concrete Strategy B: Chấm tự luận bằng AI (Writing / Speaking)
 * Kết nối với IAIEvaluator theo Rubric 4 tiêu chí CEFR
 */
export class AIScoringStrategy implements IScoringStrategy {
  private aiEvaluator: IAIEvaluator;

  constructor(aiEvaluator: IAIEvaluator) {
    this.aiEvaluator = aiEvaluator;
  }

  async calculateScore(submissionData: {
    prompt: string;
    essayText: string;
    taskType?: 'TASK1' | 'TASK2';
  }): Promise<ScoringResult> {
    const aiResult = await this.aiEvaluator.evaluateEssay(
      submissionData.prompt,
      submissionData.essayText,
      submissionData.taskType
    );

    return {
      score: aiResult.overallScore,
      cefrLevel: aiResult.cefrBand,
      details: {
        criteria: aiResult.criteriaScores,
        grammarErrors: aiResult.grammarErrors,
        sample: aiResult.improvedSample,
      },
    };
  }
}

/**
 * Context Layer sử dụng Strategy: Cho phép chuyển đổi đa hình thuật toán tại runtime
 */
export class ScoringContext {
  private strategy: IScoringStrategy;

  constructor(strategy: IScoringStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: IScoringStrategy): void {
    this.strategy = strategy;
  }

  public async executeScoring(data: unknown): Promise<ScoringResult> {
    return await this.strategy.calculateScore(data);
  }
}
