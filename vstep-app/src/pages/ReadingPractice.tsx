import { BookOpen, Search, Lightbulb, Volume2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { readingPassages } from '../data/readingData';
import { dictionaryService, WordLookupResult } from '../services/dictionaryService';
import { progressService } from '../services/progressService';

export default function ReadingPractice() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const passage = readingPassages.find((p) => p.id === id);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60 * 60); // 60 minutes

  // Dictionary lookup state for manual search bar
  const [manualQuery, setManualQuery] = useState('');
  const [manualResult, setManualResult] = useState<WordLookupResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  if (!passage) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Không tìm thấy bài đọc.</p>
        <Link to="/reading" className="text-blue-600 dark:text-blue-400 mt-4 inline-block font-semibold">
          ← Quay lại danh sách bài đọc
        </Link>
      </div>
    );
  }

  const currentQuestion = passage.questions[currentQIndex];
  const totalQuestions = passage.questions.length;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = passage.questions.reduce((acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0);
    progressService.savePracticeResult(user?.username, 'reading', id || '1', {
      score,
      total: passage.questions.length,
      title: passage.title,
    });
  };

  const score = passage.questions.reduce((acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0);

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuery.trim()) return;
    setIsSearching(true);
    try {
      const result = await dictionaryService.lookup(manualQuery);
      setManualResult(result);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-5 w-full pb-10">
      {/* 1. Top Header with Timer & Submit */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/reading"
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors"
          >
            ← Danh sách
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {passage.title}
              </h1>
              <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded text-xs font-bold">
                {passage.level}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Phân hệ Luyện Đọc VSTEP • Bố cục chia đôi màn hình song song (Split-view)
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-4 self-end sm:self-auto">
          <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2">
            <span className="text-red-500">⏱️</span>
            <span className="font-mono font-bold text-red-600 dark:text-red-400 text-base">
              Thời gian: {formatTimer(timerSeconds)}
            </span>
          </div>
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
            >
              Nộp bài ({Object.keys(answers).length}/{totalQuestions})
            </button>
          ) : (
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-xl text-sm font-bold text-emerald-800 dark:text-emerald-200">
              Điểm: {score} / {totalQuestions}
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Split-View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:h-[calc(100vh-145px)] lg:min-h-[560px]">
        {/* Left Column (7 cols): Reading Passage Text */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between lg:h-full overflow-hidden">
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 dark:border-gray-700 mb-3 shrink-0">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600 inline" /><span>Văn Bản Bài Đọc (Reading Passage)</span>
              </h3>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                400 - 500 từ • Học thuật VSTEP
              </span>
            </div>

            {/* Tra từ nhanh search bar */}
            <form onSubmit={handleManualSearch} className="mb-3 flex items-center gap-2 shrink-0">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={manualQuery}
                  onChange={(e) => setManualQuery(e.target.value)}
                  placeholder="Tra nhanh từ vựng (hoặc nhấp đúp từ trong bài)..."
                  className="w-full text-xs px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1 disabled:opacity-50"
              >
                {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Tra từ</span>
              </button>
            </form>

            {/* Manual lookup result card if searched */}
            {manualResult && (
              <div className="mb-3 p-3 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl relative animate-in fade-in">
                <button
                  type="button"
                  onClick={() => setManualResult(null)}
                  className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-bold p-1"
                >
                  ✕
                </button>
                <div className="flex items-center gap-2 mb-1 pr-6 flex-wrap">
                  <span className="font-bold text-sm text-gray-900 dark:text-white capitalize">
                    {manualResult.word}
                  </span>
                  {manualResult.phonetic && (
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {manualResult.phonetic}
                    </span>
                  )}
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    {manualResult.level || 'B2'}
                  </span>
                  {manualResult.source === 'online_saved' && (
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded">
                      ✨ Đã lưu vào DB
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-800 dark:text-gray-200 font-medium mb-1.5 leading-relaxed">
                  {manualResult.meaning}
                </p>
                {manualResult.example && (
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 italic mb-1.5 border-l-2 border-emerald-300 pl-2">
                    "{manualResult.example}"
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (manualResult.audioUrl) {
                      new Audio(manualResult.audioUrl).play().catch(() => {});
                    } else if ('speechSynthesis' in window) {
                      const utterance = new SpeechSynthesisUtterance(manualResult.word);
                      utterance.lang = 'en-US';
                      window.speechSynthesis.speak(utterance);
                    }
                  }}
                  className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Phát âm bản ngữ</span>
                </button>
              </div>
            )}

            {/* Scrollable Passage Body */}
            <div
              className="prose dark:prose-invert max-w-none flex-1 overflow-y-auto pr-3 space-y-3.5 text-xs sm:text-sm leading-relaxed text-gray-800 dark:text-gray-200 selection:bg-emerald-200 selection:text-emerald-950 scrollbar-thin"
            >
              {passage.passage.split('\n\n').map((para, i) => (
                <div key={i} className="flex gap-3">
                  <span className="font-mono text-xs text-gray-400 font-semibold select-none pt-0.5">
                    [{i + 1}]
                  </span>
                  <p className="flex-1 text-justify cursor-text">{para}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-between shrink-0">
            <span className="flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Nhấp đúp chuột (Double click) từ vựng bất kỳ để tra cứu tức thì & lưu vào DB</span>
            </span>
            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              92,000+ từ Offline • Auto-Sync
            </span>
          </div>
        </div>

        {/* Right Column (5 cols): Questions & Explanation Box */}
        <div className="lg:col-span-5 flex flex-col lg:h-full overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between flex-1 overflow-y-auto scrollbar-thin">
            <div>
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  CÂU HỎI TRẮC NGHIỆM (CÂU {currentQIndex + 1} / {totalQuestions})
                </span>
                <span className="text-xs font-medium text-gray-400">
                  Đọc hiểu • 1 điểm
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 leading-snug">
                {currentQuestion.question}
              </h2>

              {/* Options A-B-C-D */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option, oIdx) => {
                  const optLabel = String.fromCharCode(65 + oIdx);
                  const isSelected = answers[currentQuestion.id] === oIdx;
                  const isCorrect = oIdx === currentQuestion.correctAnswer;

                  let cardStyle =
                    'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 text-gray-800 dark:text-gray-200';

                  if (submitted) {
                    if (isCorrect) {
                      cardStyle =
                        'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      cardStyle =
                        'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-900 dark:text-red-100 font-semibold';
                    } else {
                      cardStyle = 'opacity-50 border-gray-200 dark:border-gray-700 text-gray-500';
                    }
                  } else if (isSelected) {
                    cardStyle =
                      'bg-emerald-50/80 dark:bg-emerald-900/30 border-emerald-600 dark:border-emerald-500 text-emerald-900 dark:text-emerald-100 font-semibold shadow-sm';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswer(oIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 text-sm ${cardStyle}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {optLabel}
                      </span>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box (Visible after submit) */}
              {submitted && (
                <div className="mt-5 p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                    <span>💡</span>
                    <span>GIẢI THÍCH CHI TIẾT & DẪN CHỨNG:</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentQuestion.explanation ||
                      `Đáp án đúng là ${String.fromCharCode(65 + currentQuestion.correctAnswer)} theo nội dung đoạn văn bài đọc.`}
                  </p>
                </div>
              )}
            </div>

            {/* Question Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
              <button
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                ← Câu trước
              </button>

              <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] px-1 py-1 no-scrollbar">
                {passage.questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = idx === currentQIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-6 h-6 rounded-md text-[11px] font-bold flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 ring-offset-1'
                          : isAnswered
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentQIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                disabled={currentQIndex === totalQuestions - 1}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
              >
                Câu sau →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
