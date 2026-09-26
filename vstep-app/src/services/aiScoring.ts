import { speechService } from './speechTranscriptionService';

export interface ScoringResult {
  overallScore: number; // 0-10 VSTEP scale
  taskAchievement: number; // 0-10
  coherence: number; // 0-10
  lexicalResource: number; // 0-10
  grammar: number; // 0-10
  vstepLevel: string; // B1, B2, C1, or "Dưới B1"
  feedback: string;
  suggestions: string[];
  correctedVersion?: string;
  isEstimated?: boolean;
  scoringEngine?: string;
}

export interface SpeakingScoringResult {
  overallScore: number; // 0-10 VSTEP scale
  fluency: number;
  vocabulary: number;
  grammar: number;
  pronunciation: number;
  taskFulfillment: number;
  vstepLevel: string;
  feedback: string;
  suggestions: string[];
  isEstimated?: boolean;
  scoringEngine?: string;
}

export function getVstepLevel(score: number): string {
  if (score >= 8.5) return 'C1 (Bậc 5)';
  if (score >= 6.0) return 'B2 (Bậc 4)';
  if (score >= 4.0) return 'B1 (Bậc 3)';
  return 'Dưới B1';
}

export function getVstepLevelColor(score: number): string {
  if (score >= 8.5) return 'text-purple-600 dark:text-purple-400';
  if (score >= 6.0) return 'text-blue-600 dark:text-blue-400';
  if (score >= 4.0) return 'text-green-600 dark:text-green-400';
  return 'text-red-600 dark:text-red-400';
}

function getApiKey(): string | null {
  return localStorage.getItem('vstep_ai_key');
}

export function setApiKey(key: string) {
  localStorage.setItem('vstep_ai_key', key);
}

export function getStoredApiKey(): string {
  return localStorage.getItem('vstep_ai_key') || '';
}

export function hasApiKey(): boolean {
  const k = localStorage.getItem('vstep_ai_key');
  return !!k && k.trim().length > 10;
}

/**
 * Kiểm tra kết nối thật sự đến Google Gemini 2.0 Flash bằng API Key
 */
export async function testGeminiApiKey(apiKey: string): Promise<{ success: boolean; latency: number; message: string }> {
  const trimmed = apiKey.trim();
  if (!trimmed) {
    return { success: false, latency: 0, message: 'API Key trống. Vui lòng nhập Google Gemini API Key hợp lệ.' };
  }
  const start = Date.now();
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${trimmed}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Respond strictly with the single word: OK' }] }],
          generationConfig: { maxOutputTokens: 10 },
        }),
      }
    );
    const latency = Date.now() - start;
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData?.error?.message || response.statusText;
      return {
        success: false,
        latency,
        message: `Lỗi xác thực (${response.status}): ${errMsg}`,
      };
    }
    return {
      success: true,
      latency,
      message: `Kết nối thành công tới Google Gemini 2.0 Flash (Độ trễ: ${latency}ms, HTTP 200 OK)`,
    };
  } catch (err: any) {
    const latency = Date.now() - start;
    return {
      success: false,
      latency,
      message: `Không thể kết nối đến máy chủ Google: ${err?.message || 'Lỗi mạng hoặc CORS'}`,
    };
  }
}

/**
 * THUẬT TOÁN ĐOÁN ĐIỂM WRITING THEO BAREM VSTEP CHUẨN (DỰ PHÒNG KHI AI KHÔNG CÓ ĐIỂM)
 * Phân tích thực tế bài viết dựa trên:
 * 1. Độ dài chuẩn theo yêu cầu (Task 1: >= 120 từ, Task 2: >= 250 từ)
 * 2. Cấu trúc đoạn văn & các liên từ học thuật (Coherence & Cohesion)
 * 3. Độ đa dạng từ vựng & vốn từ học thuật B2-C1 (Lexical Resource)
 * 4. Độ phức tạp câu & lỗi ngữ pháp phổ biến (Grammatical Range & Accuracy)
 */
export function estimateWritingScore(
  _prompt: string,
  userEssay: string,
  taskType: string,
  _level = 'B2'
): ScoringResult {
  const cleanEssay = userEssay.trim();
  const words = cleanEssay.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const isTask1 = taskType.toUpperCase().includes('TASK 1') || taskType.includes('1');

  // 1. Task Achievement (Target: Task 1 >= 120 words, Task 2 >= 250 words)
  let taskAchievement = 5.0;
  if (isTask1) {
    if (wordCount < 60) taskAchievement = 4.0;
    else if (wordCount < 90) taskAchievement = 5.0;
    else if (wordCount < 120) taskAchievement = 6.0;
    else if (wordCount <= 220) taskAchievement = 7.5;
    else taskAchievement = 7.0; // quá dài
  } else {
    if (wordCount < 120) taskAchievement = 4.0;
    else if (wordCount < 180) taskAchievement = 5.0;
    else if (wordCount < 250) taskAchievement = 6.5;
    else if (wordCount <= 380) taskAchievement = 7.5;
    else taskAchievement = 7.0;
  }

  // 2. Coherence & Cohesion
  const paragraphs = cleanEssay.split(/\n+/).filter((p) => p.trim().length > 15);
  const linkingWordsList = [
    'furthermore', 'moreover', 'in addition', 'however', 'nevertheless',
    'on the other hand', 'therefore', 'consequently', 'as a result',
    'in conclusion', 'to conclude', 'firstly', 'secondly', 'finally',
    'for example', 'for instance', 'in contrast', 'besides', 'in summary'
  ];
  const lowerText = cleanEssay.toLowerCase();
  let foundConnectorsCount = 0;
  linkingWordsList.forEach((lw) => {
    if (lowerText.includes(lw)) foundConnectorsCount++;
  });

  let coherence = 5.0;
  if (paragraphs.length >= 3 && foundConnectorsCount >= 4) coherence = 7.5;
  else if (paragraphs.length >= 2 && foundConnectorsCount >= 2) coherence = 6.5;
  else if (paragraphs.length >= 2 || foundConnectorsCount >= 1) coherence = 5.5;
  else coherence = 4.5;

  // 3. Lexical Resource
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z]/g, '')));
  const lexicalRatio = wordCount > 0 ? uniqueWords.size / wordCount : 0;
  const academicTerms = [
    'significant', 'substantial', 'perspective', 'detrimental', 'beneficial',
    'phenomenon', 'implementation', 'consequence', 'enhance', 'facilitate',
    'crucial', 'essential', 'fundamental', 'comprehensive', 'predominantly',
    'advantageous', 'inevitable', 'paramount', 'demonstrate', 'illustrate'
  ];
  let academicCount = 0;
  academicTerms.forEach((term) => {
    if (lowerText.includes(term)) academicCount++;
  });

  let lexicalResource = 5.5;
  if (lexicalRatio > 0.55 && academicCount >= 3) lexicalResource = 7.5;
  else if (lexicalRatio > 0.45 && academicCount >= 1) lexicalResource = 6.5;
  else if (lexicalRatio > 0.35) lexicalResource = 5.5;
  else lexicalResource = 4.5;

  // 4. Grammatical Range & Accuracy
  const sentences = cleanEssay.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgSentenceLength = sentences.length > 0 ? wordCount / sentences.length : 0;

  // Bắt các lỗi phổ biến
  const grammarMistakes = [
    /\bshe don'?t\b/i,
    /\bhe don'?t\b/i,
    /\bit don'?t\b/i,
    /\bdiscuss about\b/i,
    /\bdo a mistake\b/i,
    /\binformations\b/i,
    /\byesterday I go\b/i,
  ];
  let errorCount = 0;
  grammarMistakes.forEach((reg) => {
    if (reg.test(cleanEssay)) errorCount++;
  });

  let grammar = 6.0;
  if (avgSentenceLength >= 12 && avgSentenceLength <= 26 && errorCount === 0) {
    grammar = 7.5;
  } else if (errorCount > 2) {
    grammar = 5.0;
  } else if (errorCount === 1) {
    grammar = 6.0;
  } else {
    grammar = 6.5;
  }

  // Bonus for advanced sentence structures
  if (lowerText.includes('although') || lowerText.includes('whereas') || lowerText.includes('which') || lowerText.includes('despite')) {
    grammar = Math.min(8.5, grammar + 0.5);
    coherence = Math.min(8.5, coherence + 0.3);
  }

  // Điểm tổng làm tròn 0.5 theo quy chế MOET VSTEP
  const rawOverall = (taskAchievement + coherence + lexicalResource + grammar) / 4;
  const overallScore = Math.round(rawOverall * 2) / 2;
  const vstepLevel = getVstepLevel(overallScore);

  const suggestions: string[] = [];
  if (wordCount < (isTask1 ? 120 : 250)) {
    suggestions.push(`Cần phát triển thêm bài viết để đạt độ dài tối thiểu ${isTask1 ? 120 : 250} từ (hiện tại có ${wordCount} từ).`);
  }
  if (paragraphs.length < 3) {
    suggestions.push('Nên chia bài viết rõ ràng thành tối thiểu 3-4 đoạn: Mở bài, Thân bài 1, Thân bài 2 và Kết luận.');
  }
  if (foundConnectorsCount < 3) {
    suggestions.push('Bổ sung thêm các liên từ học thuật như "Furthermore", "However", "Consequently" để tăng tính mạch lạc (Coherence).');
  }
  if (academicCount === 0) {
    suggestions.push('Nâng cấp một số từ vựng cơ bản sang từ học thuật B2-C1 (ví dụ: "very good" → "advantageous/crucial").');
  }
  if (suggestions.length === 0) {
    suggestions.push('Tiếp tục duy trì cấu trúc câu phức và vốn từ học thuật phong phú trong các đề tài tiếp theo.');
  }

  return {
    overallScore,
    taskAchievement: parseFloat(taskAchievement.toFixed(1)),
    coherence: parseFloat(coherence.toFixed(1)),
    lexicalResource: parseFloat(lexicalResource.toFixed(1)),
    grammar: parseFloat(grammar.toFixed(1)),
    vstepLevel,
    feedback: `[Đoán điểm theo Barem Thuật toán VSTEP]: Bài viết đạt ${wordCount} từ với ${paragraphs.length} đoạn văn và ${foundConnectorsCount} từ liên kết. Điểm tổng quát ước tính theo barem là ${overallScore}/10 (${vstepLevel}).`,
    suggestions,
    correctedVersion: cleanEssay ? `Suggested Revision: Đảm bảo kiểm tra kỹ các câu mở đoạn và sử dụng liên từ chỉ luận điểm rõ ràng.` : undefined,
    isEstimated: true,
    scoringEngine: 'Thuật toán Barem VSTEP (Dự phòng)',
  };
}

/**
 * THUẬT TOÁN ĐOÁN ĐIỂM SPEAKING DỰA TRÊN VĂN BẢN CHUYỂN ĐỔI TỪ GIỌNG NÓI (STT)
 * Chấm điểm bài nói khi AI không phản hồi bằng công cụ nhận diện giọng nói có sẵn:
 * Quét lỗi phát âm, lỗi ngữ pháp, đo độ trôi chảy từ tốc độ từ và vốn từ.
 */
export function estimateSpeakingScore(
  topic: string,
  transcript: string,
  part = 1,
  _level = 'B2'
): SpeakingScoringResult {
  const cleanTranscript = transcript.trim();
  if (!cleanTranscript) {
    return {
      overallScore: 0,
      fluency: 0,
      vocabulary: 0,
      grammar: 0,
      pronunciation: 0,
      taskFulfillment: 0,
      vstepLevel: 'Chưa chấm',
      feedback: 'Chưa nhận diện được nội dung bài nói từ Microphone để chấm điểm.',
      suggestions: ['Vui lòng kiểm tra quyền Micro hoặc gõ nội dung câu trả lời.'],
      isEstimated: true,
      scoringEngine: 'Chưa có dữ liệu',
    };
  }

  // Dùng công cụ phân tích văn bản giọng nói speechService sẵn có
  const analysis = speechService.analyzeSpokenText(cleanTranscript, topic);
  const words = cleanTranscript.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let taskFulfillment = 6.0;
  if (part === 1) {
    taskFulfillment = wordCount >= 60 ? 7.5 : wordCount >= 30 ? 6.5 : 5.0;
  } else if (part === 2) {
    taskFulfillment = wordCount >= 90 ? 7.5 : wordCount >= 50 ? 6.5 : 5.0;
  } else {
    taskFulfillment = wordCount >= 120 ? 8.0 : wordCount >= 70 ? 7.0 : 5.5;
  }

  const overallScore = Math.round(
    ((analysis.fluencyScore + analysis.lexicalScore + analysis.grammarScore + analysis.pronunciationScore + taskFulfillment) / 5) * 2
  ) / 2;

  const suggestions = [...analysis.suggestions];
  if (analysis.errors.length > 0) {
    suggestions.unshift(`Đã phát hiện ${analysis.errors.length} điểm cần sửa: ${analysis.errors.map(e => `"${e.original}" → "${e.correction}"`).join(', ')}.`);
  }

  return {
    overallScore,
    fluency: analysis.fluencyScore,
    vocabulary: analysis.lexicalScore,
    grammar: analysis.grammarScore,
    pronunciation: analysis.pronunciationScore,
    taskFulfillment,
    vstepLevel: getVstepLevel(overallScore),
    feedback: `[Đoán điểm Ngữ âm VSTEP từ Giọng nói sang Chữ]: Đã ghi nhận ${wordCount} từ qua công cụ nhận diện giọng nói. ${analysis.feedback}`,
    suggestions,
    isEstimated: true,
    scoringEngine: 'Công cụ Nhận diện Giọng nói STT & Thuật toán VSTEP',
  };
}

async function callGemini(prompt: string): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('Chưa cài đặt API key. Vào Cài đặt để thêm Gemini API key.');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    if (response.status === 401 || response.status === 403) {
      throw new Error('API key không hợp lệ. Vui lòng kiểm tra lại key trong Cài đặt.');
    }
    throw new Error(`Lỗi API: ${err?.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export async function scoreWriting(
  prompt: string,
  userEssay: string,
  taskType: string,
  level = 'B2'
): Promise<ScoringResult> {
  if (hasApiKey()) {
    try {
      const aiPrompt = `You are a certified VSTEP (Vietnamese Standardized Test of English Proficiency) examiner. Score the following ${taskType} written for level ${level} using the OFFICIAL VSTEP scoring scale (0-10).

VSTEP SCORING SCALE:
- 0-3.5: Below B1 (Dưới B1) - Major errors, incomplete task
- 4.0-5.5: B1 (Bậc 3) - Basic competence, some errors but comprehensible
- 6.0-8.0: B2 (Bậc 4) - Good command, handles complex ideas, minor errors
- 8.5-10.0: C1 (Bậc 5) - Near-native, sophisticated language, minimal errors

TASK PROMPT:
${prompt}

STUDENT'S ESSAY:
${userEssay}

Score each criterion on the VSTEP 0-10 scale (half-point increments: 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, etc.):
1. Task Achievement: Does the essay address ALL parts of the task? Appropriate length?
2. Coherence & Cohesion: Logical paragraphing? Linking words? Clear progression of ideas?
3. Lexical Resource: Range of vocabulary? Accuracy? Academic/formal tone?
4. Grammatical Range & Accuracy: Variety of structures? Frequency of errors?

Respond in STRICT JSON format ONLY (no markdown backticks):
{
  "overallScore": 7.0,
  "taskAchievement": 7.0,
  "coherence": 7.5,
  "lexicalResource": 6.5,
  "grammar": 7.0,
  "vstepLevel": "B2",
  "feedback": "Nhận xét chi tiết 3-4 câu bằng tiếng Việt...",
  "suggestions": ["Gợi ý 1 bằng tiếng Việt", "Gợi ý 2", "Gợi ý 3"],
  "correctedVersion": "Câu sửa lỗi gợi ý..."
}`;

      const result = await callGemini(aiPrompt);
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as ScoringResult;
        parsed.isEstimated = false;
        parsed.scoringEngine = 'Google Gemini 2.0 Flash AI';
        return parsed;
      }
    } catch (err) {
      console.warn('Google Gemini scoring failed, falling back to VSTEP Barem estimation:', err);
    }
  }

  // Fallback sang Thuật toán Barem VSTEP khi không có key hoặc AI gặp sự cố
  return estimateWritingScore(prompt, userEssay, taskType, level);
}

export async function scoreSpeaking(
  topic: string,
  userResponse: string,
  part = 1,
  level = 'B2'
): Promise<SpeakingScoringResult> {
  if (hasApiKey()) {
    try {
      const aiPrompt = `You are a certified VSTEP Speaking examiner. Score the following spoken response (transcribed) for Part ${part}, level ${level} using the OFFICIAL VSTEP scoring scale (0-10).

VSTEP SPEAKING SCORING SCALE:
- 0-3.5: Below B1 - Very limited, cannot maintain conversation
- 4.0-5.5: B1 (Bậc 3) - Can communicate on familiar topics with some hesitation
- 6.0-8.0: B2 (Bậc 4) - Speaks fluently on most topics, good range of vocabulary
- 8.5-10.0: C1 (Bậc 5) - Near-native fluency, sophisticated expression

TOPIC/PROMPT:
${topic}

STUDENT'S RESPONSE (transcribed):
${userResponse}

Score each criterion on the VSTEP 0-10 scale (use half-points: 5.5, 6.0, 6.5, etc.):
1. Fluency & Coherence: Natural flow? Logical connection? Hesitation?
2. Vocabulary: Range? Accuracy? Topic-appropriate?
3. Grammar: Variety of structures? Accuracy?
4. Pronunciation: (Based on word choices suggesting awareness) Natural phrasing?
5. Task Fulfillment: Addresses all parts? Appropriate length and depth?

Respond in STRICT JSON format ONLY (no markdown backticks):
{
  "overallScore": 7.0,
  "fluency": 7.0,
  "vocabulary": 7.0,
  "grammar": 6.5,
  "pronunciation": 7.5,
  "taskFulfillment": 7.0,
  "vstepLevel": "B2",
  "feedback": "Nhận xét chi tiết 3-4 câu bằng tiếng Việt...",
  "suggestions": ["Gợi ý 1 bằng tiếng Việt", "Gợi ý 2", "Gợi ý 3"]
}`;

      const result = await callGemini(aiPrompt);
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as SpeakingScoringResult;
        parsed.isEstimated = false;
        parsed.scoringEngine = 'Google Gemini 2.0 Flash AI';
        return parsed;
      }
    } catch (err) {
      console.warn('Google Gemini speaking scoring failed, falling back to STT speech estimation:', err);
    }
  }

  // Fallback sang Thuật toán Barem VSTEP từ bản chuyển đổi giọng nói (STT)
  return estimateSpeakingScore(topic, userResponse, part, level);
}
