/**
 * Builder Pattern: Composite Exam Construction
 * Academic Course: Advanced Software Design (GoF Builder Pattern)
 * Reference: Chapter 3.2.3 of Thesis Report
 */

import { Exam, Section, Question, SkillType } from '../types/exam';

export class VstepExamBuilder {
  private exam: Exam;

  constructor(examId: string, title: string, examType: Exam['examType'] = 'STANDARD_MOCK') {
    this.exam = {
      id: examId,
      title: title,
      examType: examType,
      durationMinutes: 0,
      totalQuestions: 0,
      isPublished: true,
      sections: [],
      createdAt: new Date().toISOString(),
    };
  }

  public addListeningSection(duration: number = 40, questions: Question[] = []): this {
    const section: Section = {
      id: `sec_listening_${Date.now()}`,
      examId: this.exam.id,
      skillType: 'LISTENING',
      sectionOrder: 1,
      durationMinutes: duration,
      title: 'Kỹ năng 1: Listening Comprehension',
      questions: questions,
    };
    this.exam.sections.push(section);
    this.exam.durationMinutes += duration;
    this.exam.totalQuestions += questions.length;
    return this;
  }

  public addReadingSection(duration: number = 60, questions: Question[] = []): this {
    const section: Section = {
      id: `sec_reading_${Date.now()}`,
      examId: this.exam.id,
      skillType: 'READING',
      sectionOrder: 2,
      durationMinutes: duration,
      title: 'Kỹ năng 2: Reading Comprehension',
      questions: questions,
    };
    this.exam.sections.push(section);
    this.exam.durationMinutes += duration;
    this.exam.totalQuestions += questions.length;
    return this;
  }

  public addWritingSection(duration: number = 60, questions: Question[] = []): this {
    const section: Section = {
      id: `sec_writing_${Date.now()}`,
      examId: this.exam.id,
      skillType: 'WRITING',
      sectionOrder: 3,
      durationMinutes: duration,
      title: 'Kỹ năng 3: Written Production (Task 1 & Task 2)',
      questions: questions,
    };
    this.exam.sections.push(section);
    this.exam.durationMinutes += duration;
    this.exam.totalQuestions += questions.length;
    return this;
  }

  public addSpeakingSection(duration: number = 12, questions: Question[] = []): this {
    const section: Section = {
      id: `sec_speaking_${Date.now()}`,
      examId: this.exam.id,
      skillType: 'SPEAKING',
      sectionOrder: 4,
      durationMinutes: duration,
      title: 'Kỹ năng 4: Speaking Interaction (Part 1 - 3)',
      questions: questions,
    };
    this.exam.sections.push(section);
    this.exam.durationMinutes += duration;
    this.exam.totalQuestions += questions.length;
    return this;
  }

  public addQuestionsToSection(skill: SkillType, questions: Question[]): this {
    const section = this.exam.sections.find((s) => s.skillType === skill);
    if (section) {
      section.questions = [...section.questions, ...questions];
      this.exam.totalQuestions += questions.length;
    }
    return this;
  }

  public build(): Exam {
    if (this.exam.sections.length === 0) {
      throw new Error('Đề thi không thể được khởi tạo khi chưa có phần thi nào!');
    }
    return this.exam;
  }
}

/**
 * Director Pattern: Hướng dẫn tạo các cấu trúc đề thi thông dụng
 */
export class ExamDirector {
  public static createStandardVstepMockExam(id: string, title: string): Exam {
    return new VstepExamBuilder(id, title, 'STANDARD_MOCK')
      .addListeningSection(40)
      .addReadingSection(60)
      .addWritingSection(60)
      .addSpeakingSection(12)
      .build();
  }

  public static createCustomReadingExam(id: string, title: string, questions: Question[]): Exam {
    return new VstepExamBuilder(id, title, 'CUSTOM_IMPORT')
      .addReadingSection(60, questions)
      .build();
  }
}
