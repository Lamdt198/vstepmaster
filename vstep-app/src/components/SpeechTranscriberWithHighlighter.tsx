import { useState, useEffect, useRef } from 'react';
import { ApiClient } from '../services/apiClient';
import {
  speechService,
  SpeechAnalysisResult,
  SpeechError,
} from '../services/speechTranscriptionService';
import {
  Bot,
  Mic,
  Sparkles,
  Volume2,
  AlertCircle,
  AlertTriangle,
  Layers,
  CheckCircle2,
  RotateCcw,
  Search,
  BookOpen,
  Square,
  Wand2,
  FileText,
  X,
  Lightbulb
} from 'lucide-react';

interface Props {
  topicPrompt?: string;
  onAnalysisComplete?: (result: SpeechAnalysisResult) => void;
  className?: string;
  compact?: boolean;
}

export default function SpeechTranscriberWithHighlighter({
  topicPrompt = '',
  onAnalysisComplete,
  className = '',
}: Props) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<SpeechAnalysisResult | null>(null);
  const [selectedError, setSelectedError] = useState<SpeechError | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'grammar' | 'vocabulary' | 'pronunciation'>('all');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isSpeakingSample, setIsSpeakingSample] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Stop listening on unmount
  useEffect(() => {
    return () => {
      speechService.stopListening();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleToggleListening = () => {
    if (isListening) {
      // Stop listening and analyze
      speechService.stopListening();
      setIsListening(false);
      if (timerRef.current) clearInterval(timerRef.current);

      const fullText = (transcript + ' ' + interimText).trim();
      setTranscript(fullText);
      setInterimText('');

      if (fullText) {
        void runAnalysis(fullText);
      }
    } else {
      // Start listening
      setAnalysisResult(null);
      setSelectedError(null);
      setInterimText('');
      setRecordingSeconds(0);

      const success = speechService.startListening(
        (interim) => {
          setInterimText(interim);
        },
        (final) => {
          setTranscript(final);
          setInterimText('');
        },
        (err) => {
          console.warn('SpeechRecognition error:', err);
        }
      );

      if (success) {
        setIsListening(true);
        timerRef.current = window.setInterval(() => {
          setRecordingSeconds((prev) => prev + 1);
        }, 1000);
      } else {
        alert('Trình duyệt chưa cấp quyền Micro hoặc không hỗ trợ Web Speech API. Bạn có thể gõ nội dung hoặc bấm các nút "Mẫu câu kiểm thử" bên dưới để trải nghiệm phân tích AI!');
      }
    }
  };

  const handleLoadSample = (sampleText: string) => {
    setTranscript(sampleText);
    setInterimText('');
    void runAnalysis(sampleText);
  };

  const handleManualAnalyze = () => {
    if (!transcript.trim()) return;
    void runAnalysis(transcript.trim());
  };

  const runAnalysis = async (textToAnalyze: string) => {
    if (!textToAnalyze.trim()) return;
    setIsAnalyzing(true);

    try {
      // 1. Gọi trực tiếp C# ASP.NET Core Web API (http://localhost:5000/api/Ai/evaluate-speaking)
      const res = await ApiClient.evaluateSpeaking(textToAnalyze, topicPrompt);
      if (res && res.transcript) {
        const clientRes = speechService.analyzeSpokenText(textToAnalyze, topicPrompt);

        // Map errors từ C# API chuẩn kiểu SpeechError
        const mappedErrors: SpeechError[] = (res.errors || []).map((err: any) => ({
          id: err.id || String(Math.random()),
          original: err.original,
          correction: err.correction,
          type: (err.type || 'grammar') as 'grammar' | 'vocabulary' | 'pronunciation',
          explanation: err.explanation,
          severity: 'high' as const,
        }));

        // Hợp nhất lỗi C# và Client NLP để đạt độ phủ cao nhất
        const combinedErrors = [...mappedErrors];
        for (const ce of clientRes.errors) {
          if (!combinedErrors.some((me) => me.original.toLowerCase() === ce.original.toLowerCase())) {
            combinedErrors.push(ce);
          }
        }

        const result: SpeechAnalysisResult = {
          transcript: textToAnalyze,
          vietnameseTranslation: res.vietnameseTranslation || clientRes.vietnameseTranslation,
          c1PolishedVersion: res.c1PolishedVersion || clientRes.c1PolishedVersion,
          errors: combinedErrors,
          overallScore: res.overallScore || clientRes.overallScore,
          cefrLevel: res.cefrLevel || clientRes.cefrLevel,
          fluencyScore: res.fluencyScore || clientRes.fluencyScore,
          grammarScore: res.grammarScore || clientRes.grammarScore,
          lexicalScore: res.lexicalScore || clientRes.lexicalScore,
          pronunciationScore: res.pronunciationScore || clientRes.pronunciationScore,
          feedback: res.feedback || clientRes.feedback,
          suggestions: res.suggestions && res.suggestions.length > 0 ? res.suggestions : clientRes.suggestions,
        };

        setAnalysisResult(result);
        if (onAnalysisComplete) onAnalysisComplete(result);
        return;
      }
    } catch (err: any) {
      console.warn('[SpeechTranscriber] C# Backend AI unavailable, switching to local client NLP:', err?.message);
    } finally {
      setIsAnalyzing(false);
    }

    // 2. Dự phòng máy học Client NLP cục bộ
    const result = speechService.analyzeSpokenText(textToAnalyze, topicPrompt);
    setAnalysisResult(result);
    if (onAnalysisComplete) onAnalysisComplete(result);
  };

  const handleSpeakC1 = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingSample(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeakingSample(false);
      utterance.onerror = () => setIsSpeakingSample(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderHighlightedTranscript = () => {
    if (!analysisResult) return null;
    const { transcript: fullText, errors } = analysisResult;

    if (errors.length === 0) {
      return (
        <span className="text-gray-800 dark:text-gray-100 font-medium">
          {fullText}
        </span>
      );
    }

    // Filter errors based on active filter tab
    const activeErrors = errors.filter(
      (e) => filterType === 'all' || e.type === filterType
    );

    // Build regex pattern of all errors
    const errorWords = activeErrors.map((e) => e.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (errorWords.length === 0) {
      return <span>{fullText}</span>;
    }

    const regex = new RegExp(`(\\b(?:${errorWords.join('|')})\\b)`, 'gi');
    const parts = fullText.split(regex);

    return parts.map((part, idx) => {
      const matchedErr = activeErrors.find(
        (e) => e.original.toLowerCase() === part.toLowerCase()
      );

      if (!matchedErr) {
        return <span key={idx}>{part}</span>;
      }

      // Color & Icon by type using Lucide icons
      let badgeStyle = 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800';
      let icon = <AlertCircle className="w-3 h-3 text-red-600 shrink-0" />;
      if (matchedErr.type === 'vocabulary') {
        badgeStyle = 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800';
        icon = <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />;
      } else if (matchedErr.type === 'pronunciation') {
        badgeStyle = 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800';
        icon = <Volume2 className="w-3 h-3 text-purple-600 shrink-0" />;
      }

      const isSelected = selectedError?.id === matchedErr.id;

      return (
        <button
          key={idx}
          onClick={() => setSelectedError(isSelected ? null : matchedErr)}
          className={`inline-flex items-center gap-1 mx-0.5 px-2 py-0.5 rounded-lg text-xs font-bold border underline decoration-wavy transition-all cursor-pointer ${badgeStyle} ${
            isSelected ? 'ring-2 ring-blue-500 scale-105 shadow-sm' : 'hover:opacity-90'
          }`}
          title={`Bấm xem lỗi: ${matchedErr.explanation}`}
        >
          {icon}
          <span>{part}</span>
        </button>
      );
    });
  };

  const visibleErrors = analysisResult?.errors.filter(
    (e) => filterType === 'all' || e.type === filterType
  ) || [];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/80 shadow-md p-5 space-y-4 animate-fadeIn ${className}`}>
      {/* 1. Header with Feature Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-700 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-lg shadow-sm">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              Trợ lý Dịch Giọng Nói & Bôi Lỗi Sai AI
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-bold">
                Live STT + AI Highlighter
              </span>
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Vừa nói vừa hiển thị phụ đề thời gian thực • Tự động chẩn đoán lỗi ngữ pháp, phát âm và từ vựng VSTEP
            </p>
          </div>
        </div>

        {/* Live Status indicator */}
        {isListening ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs font-bold animate-pulse self-start sm:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
            Đang ghi âm ({recordingSeconds}s)...
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 self-start sm:self-auto bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
            <Mic className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sẵn sàng nhận diện giọng nói</span>
          </div>
        )}
      </div>

      {/* 2. Controls Toolbar & Quick Sample Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 dark:bg-gray-900/40 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleToggleListening}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer ${
              isListening
                ? 'bg-gray-900 hover:bg-black text-white'
                : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white'
            }`}
          >
            {isListening ? (
              <>
                <Square className="w-4 h-4 fill-white" />
                <span>Dừng nói & Phân tích ({recordingSeconds}s)</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Bắt đầu nói (Bật Micro)</span>
              </>
            )}
          </button>

          {transcript && !isListening && (
            <button
              onClick={handleManualAnalyze}
              disabled={isAnalyzing}
              className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isAnalyzing ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
              <span>Phân tích lại lỗi</span>
            </button>
          )}

          {transcript && !isListening && (
            <button
              onClick={() => {
                setTranscript('');
                setAnalysisResult(null);
                setSelectedError(null);
              }}
              className="p-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl text-xs transition-colors cursor-pointer"
              title="Xóa văn bản"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Sample Selector for Instant Demo */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-500 dark:text-gray-400 font-semibold text-[11px] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Thử mẫu nhanh:</span>
          </span>
          <button
            onClick={() =>
              handleLoadSample(
                "Yesterday I go to school and discuss about the problem, but he don't like it. We have many informations and I do a mistake with comfortable environment."
              )
            }
            className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-500 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:bg-indigo-50/50"
            title="Nạp đoạn văn nói có các lỗi ngữ pháp, collocation và phát âm kinh điển"
          >
            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
            <span>Mẫu có lỗi ngữ pháp</span>
          </button>
          <button
            onClick={() =>
              handleLoadSample(
                "In my free time, I really enjoy reading books, listening to acoustic music, and playing badminton with my colleagues to reduce mental fatigue."
              )
            }
            className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:bg-emerald-50/50"
            title="Nạp đoạn văn nói chuẩn tự nhiên"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Mẫu câu chuẩn tự nhiên</span>
          </button>
        </div>
      </div>

      {/* 3. Live Speech-to-Text Input/Display */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-300">
          <span className="flex items-center gap-1.5 font-bold">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Văn bản thu âm từ giọng nói (Speech-to-Text):</span>
          </span>
          <span className="text-gray-400 text-[11px] font-mono">
            {transcript ? transcript.trim().split(/\s+/).filter(Boolean).length : 0} từ
          </span>
        </div>

        <div className="relative">
          <textarea
            value={isListening ? (transcript ? transcript + ' ' : '') + interimText : transcript}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={isListening}
            placeholder={
              isListening
                ? 'Đang lắng nghe qua micro... Hãy nói tiếng Anh to và rõ ràng...'
                : 'Lời nói của bạn sẽ tự động chuyển thành văn bản tại đây khi bạn nói, hoặc bạn có thể gõ trực tiếp...'
            }
            className={`w-full h-24 sm:h-28 p-3.5 rounded-xl border text-xs sm:text-sm outline-none transition-all resize-y leading-relaxed ${
              isListening
                ? 'bg-red-50/50 dark:bg-red-950/20 border-red-400 text-red-950 dark:text-red-100 font-medium'
                : 'bg-gray-50 dark:bg-gray-900/60 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:bg-white focus:ring-2 focus:ring-indigo-500'
            }`}
          />

          {isListening && (
            <div className="absolute right-3 bottom-3 flex items-center gap-1 text-[10px] text-red-600 font-bold bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              Live Transcribing
            </div>
          )}
        </div>
      </div>

      {/* 4. AI Interactive Error Diagnosis Result Section */}
      {analysisResult && (
        <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
          {/* Diagnostic Stats & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-indigo-50/60 dark:bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex flex-col items-center justify-center font-bold shadow-xs">
                <span className="text-base leading-none">{analysisResult.overallScore}</span>
                <span className="text-[9px] opacity-80">/10</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                    Dự đoán Band: {analysisResult.cefrLevel}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
                    <Sparkles className="w-3 h-3 text-current" />
                    AI Giám Khảo VSTEP
                  </span>
                </div>
                <p className="text-[11px] text-indigo-700/80 dark:text-indigo-300/80 mt-0.5">
                  {analysisResult.feedback}
                </p>
              </div>
            </div>

            {/* Error Type Filter Pills - Upgraded Buttons with Lucide Icons */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold self-start sm:self-auto overflow-x-auto no-scrollbar">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tất cả ({analysisResult.errors.length})</span>
              </button>
              <button
                onClick={() => setFilterType('grammar')}
                className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                  filterType === 'grammar'
                    ? 'bg-red-600 text-white border-red-600 shadow-xs'
                    : 'bg-white dark:bg-gray-800 text-red-600 border-red-200 dark:border-red-900/40 hover:bg-red-50/50'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Ngữ pháp ({analysisResult.errors.filter((e) => e.type === 'grammar').length})</span>
              </button>
              <button
                onClick={() => setFilterType('vocabulary')}
                className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                  filterType === 'vocabulary'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white dark:bg-gray-800 text-amber-700 border-amber-200 dark:border-amber-900/40 hover:bg-amber-50/50'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Từ vựng ({analysisResult.errors.filter((e) => e.type === 'vocabulary').length})</span>
              </button>
              <button
                onClick={() => setFilterType('pronunciation')}
                className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                  filterType === 'pronunciation'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white dark:bg-gray-800 text-purple-700 border-purple-200 dark:border-purple-900/40 hover:bg-purple-50/50'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Phát âm ({analysisResult.errors.filter((e) => e.type === 'pronunciation').length})</span>
              </button>
            </div>
          </div>

          {/* Interactive Highlight Box */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Bản bôi lỗi sai tương tác (Bấm vào từ để xem cách sửa):</span>
              </span>
              <span className="text-[11px] text-gray-400 font-normal">
                🔴 Đỏ: Ngữ pháp • 🟠 Cam: Dùng từ • 🟣 Tím: Phát âm
              </span>
            </div>

            <div className="p-3.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 leading-relaxed text-xs sm:text-sm">
              {renderHighlightedTranscript()}
            </div>

            {/* Active Selected Error Tooltip Box */}
            {selectedError && (
              <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-xl border-2 border-blue-300 dark:border-blue-700 space-y-2 animate-fadeIn text-xs">
                <div className="flex items-center justify-between border-b pb-1.5 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-blue-600 text-white uppercase">
                      {selectedError.type === 'grammar' ? 'Lỗi Ngữ pháp' : selectedError.type === 'vocabulary' ? 'Lỗi Dùng từ' : 'Lỗi Phát âm'}
                    </span>
                    <span className="text-gray-500 line-through">"{selectedError.original}"</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      ➔ "{selectedError.correction}"
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedError(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs px-2 py-0.5 rounded-md hover:bg-gray-200/50 flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Đóng</span>
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed flex items-start gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Giải thích chi tiết:</strong> {selectedError.explanation}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* 5. Detailed Error List Table */}
          {visibleErrors.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>Danh sách chi tiết các điểm cần sửa ({visibleErrors.length}):</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {visibleErrors.map((err) => (
                  <div
                    key={err.id}
                    onClick={() => setSelectedError(err)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-1 ${
                      selectedError?.id === err.id
                        ? 'bg-blue-50/80 border-blue-400 shadow-xs'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-600 dark:text-red-400 line-through">
                        {err.original}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {err.correction}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2">
                      {err.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Vietnamese Translation & C1 Native Polished Upgrade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vietnamese Translation Card */}
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Bản dịch nghĩa tiếng Việt:</span>
              </div>
              <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed italic bg-white/70 dark:bg-gray-800/60 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                "{analysisResult.vietnameseTranslation}"
              </p>
            </div>

            {/* C1 Academic Polished Version Card */}
            <div className="p-4 bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/60 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-900 dark:text-purple-300">
                  <Wand2 className="w-4 h-4 text-purple-600" />
                  <span>Bản nâng cấp chuẩn VSTEP C1:</span>
                </div>
                <button
                  onClick={() => handleSpeakC1(analysisResult.c1PolishedVersion)}
                  disabled={isSpeakingSample}
                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{isSpeakingSample ? 'Đang đọc...' : 'Nghe phát âm'}</span>
                </button>
              </div>
              <p className="text-xs text-purple-950 dark:text-purple-200 leading-relaxed font-medium bg-white/70 dark:bg-gray-800/60 p-3 rounded-xl border border-purple-100 dark:border-purple-900/30">
                "{analysisResult.c1PolishedVersion}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
