import { ApiClient } from './apiClient';

export interface UserProgressEntry {
  type: 'mock' | 'reading' | 'listening' | 'writing' | 'speaking';
  id: string;
  title: string;
  score?: number;
  total?: number;
  wordCount?: number;
  band?: string;
  date: string;
  details?: {
    listeningScore?: number;
    readingScore?: number;
    writingScore?: number;
    speakingScore?: number;
    actualListeningCorrect?: number;
    totalListeningQuestions?: number;
    actualReadingCorrect?: number;
    totalReadingQuestions?: number;
    status?: string;
  };
}

class ProgressService {
  private getStorageKey(username?: string): string {
    const u = (username || 'default').trim().toLowerCase();
    return `vstep_progress_${u}`;
  }

  /**
   * Save a single progress entry for a user
   */
  public saveEntry(username: string | undefined, key: string, entry: UserProgressEntry) {
    if (typeof window === 'undefined') return;
    try {
      const userKey = this.getStorageKey(username);
      const current = this.getUserProgress(username);
      current[key] = entry;
      localStorage.setItem(userKey, JSON.stringify(current));

      // Also mirror to global 'vstep_progress' for legacy compatibility
      try {
        const legacy = JSON.parse(localStorage.getItem('vstep_progress') || '{}');
        legacy[key] = entry;
        localStorage.setItem('vstep_progress', JSON.stringify(legacy));
      } catch {
        /* ignore */
      }

      window.dispatchEvent(new CustomEvent('vstep_progress_updated', { detail: { username, key, entry } }));
    } catch (e) {
      console.warn('[ProgressService] Error saving progress entry:', e);
    }
  }

  /**
   * Record Mock Test Submission
   */
  public saveMockTestResult(
    username: string | undefined,
    examId: string,
    data: {
      examTitle: string;
      finalScore: number;
      cefrBand: string;
      listeningScore?: number;
      readingScore?: number;
      writingScore?: number;
      speakingScore?: number;
      actualListeningCorrect?: number;
      totalListeningQuestions?: number;
      actualReadingCorrect?: number;
      totalReadingQuestions?: number;
    }
  ) {
    const key = `mock_${examId}`;
    const entry: UserProgressEntry = {
      type: 'mock',
      id: examId,
      title: data.examTitle || `Đề thi thử ${examId}`,
      score: data.finalScore,
      total: 10,
      band: data.cefrBand,
      date: new Date().toISOString(),
      details: {
        listeningScore: data.listeningScore,
        readingScore: data.readingScore,
        writingScore: data.writingScore,
        speakingScore: data.speakingScore,
        actualListeningCorrect: data.actualListeningCorrect,
        totalListeningQuestions: data.totalListeningQuestions,
        actualReadingCorrect: data.actualReadingCorrect,
        totalReadingQuestions: data.totalReadingQuestions,
        status: 'COMPLETED',
      },
    };

    this.saveEntry(username, key, entry);
  }

  /**
   * Record individual skill practice result
   */
  public savePracticeResult(
    username: string | undefined,
    skill: 'reading' | 'listening' | 'writing' | 'speaking',
    id: string,
    data: {
      title?: string;
      score?: number;
      total?: number;
      wordCount?: number;
      band?: string;
    }
  ) {
    const key = `${skill}_${id}`;
    const entry: UserProgressEntry = {
      type: skill,
      id,
      title: data.title || `${skill.toUpperCase()} - Bài ${id}`,
      score: data.score,
      total: data.total,
      wordCount: data.wordCount,
      band: data.band,
      date: new Date().toISOString(),
    };

    this.saveEntry(username, key, entry);
  }

  /**
   * Retrieve all progress entries for a given user
   */
  public getUserProgress(username?: string): Record<string, UserProgressEntry> {
    if (typeof window === 'undefined') return {};
    try {
      const userKey = this.getStorageKey(username);
      const userRaw = localStorage.getItem(userKey);
      let res: Record<string, UserProgressEntry> = userRaw ? JSON.parse(userRaw) : {};

      // If user storage is empty, attempt to read from legacy 'vstep_progress'
      if (Object.keys(res).length === 0) {
        const legacyRaw = localStorage.getItem('vstep_progress');
        if (legacyRaw) {
          const legacy = JSON.parse(legacyRaw);
          // Standardize legacy entries
          Object.entries(legacy).forEach(([k, v]: [string, any]) => {
            let type: UserProgressEntry['type'] = 'mock';
            if (k.startsWith('listening')) type = 'listening';
            else if (k.startsWith('reading')) type = 'reading';
            else if (k.startsWith('writing')) type = 'writing';
            else if (k.startsWith('speaking')) type = 'speaking';

            res[k] = {
              type,
              id: k,
              title: v.title || k,
              score: v.score,
              total: v.total,
              wordCount: v.wordCount,
              band: v.band,
              date: v.date || new Date().toISOString(),
              details: v.details,
            };
          });
          // Cache migrated progress to this user
          localStorage.setItem(userKey, JSON.stringify(res));
        }
      }

      return res;
    } catch {
      return {};
    }
  }

  /**
   * Synchronize remote submissions from C# Backend SQLite DB into local storage
   */
  public async syncWithBackend(username?: string): Promise<Record<string, UserProgressEntry>> {
    const current = this.getUserProgress(username);
    if (!username) return current;

    try {
      const remoteSubs = await ApiClient.getUserSubmissions(username);
      if (Array.isArray(remoteSubs) && remoteSubs.length > 0) {
        let changed = false;
        remoteSubs.forEach((sub: any) => {
          const key = `mock_${sub.examId || sub.submissionId}`;
          if (!current[key]) {
            current[key] = {
              type: 'mock',
              id: sub.examId || sub.submissionId,
              title: `Đề thi VSTEP (${sub.examId})`,
              score: sub.finalScore,
              total: 10,
              band: sub.cefrBand || (sub.finalScore >= 8.5 ? 'C1' : sub.finalScore >= 6 ? 'B2' : 'B1'),
              date: sub.submitTime || new Date().toISOString(),
              details: {
                listeningScore: sub.objectiveScore,
                readingScore: sub.objectiveScore,
                writingScore: sub.aiScore,
                status: sub.status || 'COMPLETED',
              },
            };
            changed = true;
          }
        });

        if (changed) {
          const userKey = this.getStorageKey(username);
          localStorage.setItem(userKey, JSON.stringify(current));
        }
      }
    } catch (err) {
      console.warn('[ProgressService] Backend sync failed, using local offline progress', err);
    }

    return current;
  }

  /**
   * Return a dictionary of completed exam IDs mapped to scores for exam bank badges
   */
  public getCompletedExams(username?: string): Record<string, { score: number; band: string; date: string }> {
    const progress = this.getUserProgress(username);
    const completed: Record<string, { score: number; band: string; date: string }> = {};

    Object.entries(progress).forEach(([key, entry]) => {
      if (entry.type === 'mock' || key.startsWith('mock_')) {
        const examId = entry.id || key.replace('mock_', '');
        completed[examId] = {
          score: entry.score || 0,
          band: entry.band || 'B2',
          date: entry.date,
        };
      }
    });

    return completed;
  }

  /**
   * Clear all progress for a user
   */
  public clearUserProgress(username?: string) {
    if (typeof window === 'undefined') return;
    const userKey = this.getStorageKey(username);
    localStorage.removeItem(userKey);
    localStorage.removeItem('vstep_progress');
    window.dispatchEvent(new CustomEvent('vstep_progress_updated', { detail: { username, cleared: true } }));
  }
}

export const progressService = new ProgressService();
