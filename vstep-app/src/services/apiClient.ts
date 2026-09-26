/**
 * Unified API Client for VSTEP Master
 * Connects to ASP.NET Core C# Backend (http://localhost:5000/api)
 * Academic Architecture: Clean Architecture Client Layer
 */

const isLocalDomain =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'vstep.local' ||
   window.location.hostname === 'api.vstep.local' ||
   window.location.hostname.endsWith('.local') ||
   window.location.port === '80' ||
   window.location.port === '');

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL ||
  (isLocalDomain ? '/api' : 'http://localhost:5000/api');

export class ApiClient {
  public static async checkHealth(): Promise<boolean> {
    try {
      const healthUrl = isLocalDomain
        ? '/backend-health'
        : 'http://localhost:5000/';
      const res = await fetch(healthUrl, { method: 'GET', signal: AbortSignal.timeout(2000) });
      if (res.ok) return true;
      // Fallback
      const fb = await fetch('http://localhost:5000/', { method: 'GET', signal: AbortSignal.timeout(2000) });
      return fb.ok;
    } catch {
      return false;
    }
  }

  public static async login(username: string, password: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Đăng nhập không thành công.');
    }
    return res.json();
  }

  public static async getExams(q = '', level = 'all'): Promise<any[]> {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (level && level !== 'all') params.append('level', level);

    const res = await fetch(`${API_BASE_URL}/Exams?${params.toString()}`);
    if (!res.ok) throw new Error('Không thể tải danh sách đề thi từ máy chủ C#.');
    return res.json();
  }

  public static async evaluateSpeaking(transcript: string, topicPrompt = ''): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/Ai/evaluate-speaking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript, topicPrompt })
    });
    if (!res.ok) throw new Error('Lỗi phân tích giọng nói từ máy chủ C#.');
    return res.json();
  }

  public static async register(username: string, password: string, fullName: string, email: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/Auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, fullName, email })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Đăng ký không thành công.');
    }
    return res.json();
  }

  public static async submitExam(payload: {
    userId: string;
    examId: string;
    answers?: Record<string, string>;
    writingTask1?: string;
    writingTask2?: string;
    speakingTranscript?: string;
  }): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/Submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Không thể lưu bài thi lên máy chủ C#.');
    return res.json();
  }

  public static async getUserSubmissions(userId: string): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/Submissions/user/${encodeURIComponent(userId)}`);
      if (res.ok) return await res.json();
      return [];
    } catch {
      return [];
    }
  }

  public static async getVocab(level = 'all', topic = 'all'): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/Vocab?level=${level}&topic=${topic}`);
    if (!res.ok) throw new Error('Không thể tải từ vựng từ máy chủ C#.');
    return res.json();
  }

  public static async searchVocab(word: string): Promise<any | null> {
    try {
      const clean = encodeURIComponent(word.trim().toLowerCase());
      const res = await fetch(`${API_BASE_URL}/Vocab/search/${clean}`);
      if (res.ok) return await res.json();
      return null;
    } catch {
      return null;
    }
  }

  public static async saveVocab(data: {
    word: string;
    phonetic?: string;
    cefrLevel?: string;
    definitionVi: string;
    exampleEn?: string;
    topic?: string;
  }): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/Vocab/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
      return null;
    } catch {
      return null;
    }
  }
}
