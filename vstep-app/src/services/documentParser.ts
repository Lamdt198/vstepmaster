/**
 * Document Parser Service: Extraction of Word (.docx) and PDF (.pdf) Exam Papers
 * Architecture: Clean Architecture - Infrastructure / External Libraries Adapter
 * Reference: Section 1.4 (Quy trình 3) & Chapter 4.1.2 of Thesis Report
 */

import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { Question, QuestionOption } from '../types/exam';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export interface ParsedExamDocument {
  title: string;
  sourceType: 'DOCX' | 'PDF';
  questions: Question[];
  rawText: string;
}

export class DocumentParserService {
  /**
   * Bóc tách tệp Word (.docx) sử dụng Mammoth
   */
  public static async parseDocxFile(file: File): Promise<ParsedExamDocument> {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const rawText = result.value;
    const questions = this.extractQuestionsFromText(rawText);

    return {
      title: file.name.replace(/\.[^/.]+$/, ''),
      sourceType: 'DOCX',
      questions,
      rawText,
    };
  }

  /**
   * Bóc tách tệp PDF (.pdf) sử dụng PDF.js text streams
   */
  public static async parsePdfFile(file: File): Promise<ParsedExamDocument> {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;

    let fullText = '';
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => ('str' in item ? item.str : ''))
        .join(' ');
      fullText += pageText + '\n\n';
    }

    const questions = this.extractQuestionsFromText(fullText);

    return {
      title: file.name.replace(/\.[^/.]+$/, ''),
      sourceType: 'PDF',
      questions,
      rawText: fullText,
    };
  }

  /**
   * Thuật toán Heuristic Regex phân rã văn bản thô thành danh sách câu hỏi A-B-C-D
   */
  public static extractQuestionsFromText(text: string): Question[] {
    const questions: Question[] = [];
    const numberPattern = /(?:^|\n)\s*(?:(?:Question|Câu|Q)\s*)?(\d+)\s*[.):\s]/gi;
    let match;
    const indices: number[] = [];

    while ((match = numberPattern.exec(text)) !== null) {
      indices.push(match.index);
    }

    const rawBlocks: string[] = [];
    if (indices.length > 0) {
      for (let i = 0; i < indices.length; i++) {
        const start = indices[i];
        const end = i + 1 < indices.length ? indices[i + 1] : text.length;
        rawBlocks.push(text.slice(start, end).trim());
      }
    } else {
      rawBlocks.push(...text.split(/\n\s*\n/).filter((q) => q.trim().length > 20));
    }

    rawBlocks.forEach((block, idx) => {
      const parsed = this.parseSingleQuestionBlock(block, idx + 1);
      if (parsed) questions.push(parsed);
    });

    return questions;
  }

  private static parseSingleQuestionBlock(block: string, orderNumber: number): Question | null {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) return null;

    const questionContent = lines[0].replace(/^\s*(?:(?:Question|Câu|Q)\s*)?\d+\s*[.):\s]\s*/i, '').trim();
    const optionPattern = /^([A-D])\s*[.):\s]\s*(.+)/i;
    const options: QuestionOption[] = [];
    let correctKey: string | undefined = undefined;

    for (let i = 1; i < lines.length; i++) {
      const optMatch = lines[i].match(optionPattern);
      if (optMatch) {
        const label = optMatch[1].toUpperCase();
        let content = optMatch[2].trim();
        const isCorrect =
          content.startsWith('*') ||
          content.startsWith('✓') ||
          content.includes('(correct)') ||
          content.includes('(đúng)');

        if (isCorrect) {
          correctKey = label;
          content = content.replace(/^\*\s*|^✓\s*|\s*\(correct\)\s*|\s*\(đúng\)\s*/gi, '').trim();
        }

        options.push({
          id: `opt_${orderNumber}_${label}`,
          label,
          content,
          isCorrect,
        });
      }
    }

    if (options.length === 0) return null;

    return {
      id: `q_parsed_${orderNumber}`,
      orderNumber,
      content: questionContent || `Câu hỏi số ${orderNumber}`,
      options,
      correctAnswer: correctKey,
      explanation: 'Câu hỏi bóc tách tự động từ tài liệu đề thi tải lên.',
    };
  }
}
