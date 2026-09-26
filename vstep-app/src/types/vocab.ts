/**
 * Vocabulary & Dictionary Domain Types
 * Architecture: Clean Architecture - Domain Layer
 */

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface VocabCard {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaningVi: string;
  definitionEn: string;
  exampleEn: string;
  exampleVi: string;
  level: CEFRLevel;
  topic?: string;
  audioUrl?: string;
  isMastered?: boolean;
}

export interface DictionaryEntry {
  word: string;
  phonetic: string;
  type: string;
  meaning: string;
  example: string;
  level: string;
}
