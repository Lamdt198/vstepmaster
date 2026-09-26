import { FileText, Volume2, Lightbulb } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listeningTests } from '../data/listeningData';
import { progressService } from '../services/progressService';

export default function ListeningPractice() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const test = listeningTests.find((t) => t.id === id);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 192; // 3:12 in seconds
  const [timerSeconds, setTimerSeconds] = useState(24 * 60 + 15); // 24:15
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Timer countdown
  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  // Audio simulation progress
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return t + 1;
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, duration]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  if (!test) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Không tìm thấy bài thi nghe.</p>
        <Link to="/listening" className="text-blue-600 dark:text-blue-400 mt-4 inline-block font-semibold">
          ← Quay lại danh sách bài nghe
        </Link>
      </div>
    );
  }

  const currentQuestion = test.questions[currentQIndex];
  const totalQuestions = test.questions.length;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Play audio chime tone using Web Audio API to guarantee audible output
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25); // A5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const playSnippet = (text: string) => {
    playChime();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speed;
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlay = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    playChime();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(test.transcript);
      utterance.lang = 'en-US';
      utterance.rate = speed;
      utterance.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice =
        voices.find((v) => v.lang.startsWith('en') && v.name.includes('Female')) ||
        voices.find((v) => v.lang.startsWith('en-US')) ||
        voices.find((v) => v.lang.startsWith('en'));
      if (englishVoice) utterance.voice = englishVoice;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }

    setIsPlaying(true);
  };

  const handleAnswer = (optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = test.questions.reduce((acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0);
    progressService.savePracticeResult(user?.username, 'listening', id || '1', {
      score,
      total: test.questions.length,
      title: test.title || `Listening Part ${test.part}`,
    });
  };

  const score = test.questions.reduce((acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0);

  return (
    <div className="space-y-5 w-full pb-10">
      {/* 1. Header Bar with Timer (Matching ui_listening_reading.png) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/listening"
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors"
          >
            ← Danh sách
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {test.title}
              </h1>
              <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-bold">
                {test.level}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Phân hệ Luyện Nghe VSTEP • Bố cục chia đôi màn hình (Split-view)
            </p>
          </div>
        </div>

        {/* Big Red Countdown Timer */}
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
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
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
        {/* Left Column (7 cols): Audio Player + English Transcript */}
        <div className="lg:col-span-7 flex flex-col gap-4 lg:h-full overflow-hidden">
          {/* Audio Player Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-blue-100 dark:border-blue-900/40 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-800 shrink-0">
            <div className="flex items-center gap-4">
              {/* Play / Pause button */}
              <button
                onClick={handlePlay}
                className={`w-13 h-13 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md transition-all hover:scale-105 shrink-0 cursor-pointer ${
                  isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              {/* Track Info & Timeline */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xs sm:text-sm text-blue-900 dark:text-blue-300 truncate">
                    {test.title}
                  </h3>
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400 ml-2">
                    {formatTimer(currentTime)} / {formatTimer(duration)}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden relative">
                  <div
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  ></div>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="text-gray-500 dark:text-gray-400 text-[11px] font-medium">Tốc độ phát:</span>
                  {[
                    { val: 0.75, label: '0.75x' },
                    { val: 1.0, label: '1.0x (Chuẩn)' },
                    { val: 1.25, label: '1.25x' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setSpeed(item.val)}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                        speed === item.val
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Transcript Box */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 dark:border-gray-700 mb-3 shrink-0">
              <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 inline" /><span>Bản ghi âm hội thoại (English Transcript):</span>
              </h3>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                VSTEP Format Part 1
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3.5 border border-gray-100 dark:border-gray-800 flex-1 overflow-y-auto space-y-3 font-sans text-xs sm:text-sm leading-relaxed text-gray-800 dark:text-gray-200 scrollbar-thin">
              {test.transcript.split('\n\n').map((block, bIdx) => {
                const lines = block.split('\n');
                return (
                  <div key={bIdx} className="space-y-1">
                    {lines.map((l, lIdx) => {
                      if (l.startsWith('Conversation') || l.startsWith('Part') || l.startsWith('Question')) {
                        return (
                          <div key={lIdx} className="font-bold text-blue-600 dark:text-blue-400 pt-2 first:pt-0">
                            {l}
                          </div>
                        );
                      }
                      if (l.startsWith('Man:')) {
                        return (
                          <p key={lIdx}>
                            <strong className="text-slate-900 dark:text-slate-100">Man:</strong>{' '}
                            {l.replace('Man:', '')}
                          </p>
                        );
                      }
                      if (l.startsWith('Woman:')) {
                        return (
                          <p key={lIdx}>
                            <strong className="text-indigo-900 dark:text-indigo-300">Woman:</strong>{' '}
                            {l.replace('Woman:', '')}
                          </p>
                        );
                      }
                      return <p key={lIdx}>{l}</p>;
                    })}
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => playSnippet(block)}
                        className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" /><span>Nghe đoạn này</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Multiple Choice Questions & Detailed Analysis */}
        <div className="lg:col-span-5 flex flex-col lg:h-full overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between flex-1 overflow-y-auto scrollbar-thin">
            <div>
              {/* Question Index Badge */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  CÂU HỎI TRẮC NGHIỆM (CÂU {currentQIndex + 1} / {totalQuestions})
                </span>
                <span className="text-xs font-medium text-gray-400">
                  Part 1 • 1 điểm
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
                    'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 text-gray-800 dark:text-gray-200';

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
                      'bg-blue-50/80 dark:bg-blue-900/30 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 font-semibold shadow-sm';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswer(oIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Radio circle */}
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <span className="text-sm font-medium">
                          <strong>{optLabel}.</strong> {option}
                        </span>
                      </div>

                      {isSelected && !submitted && (
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded">
                          [Đã chọn]
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Detailed Answer Analysis & Explanation Box (Matching ui_listening_reading.png) */}
              {(submitted || answers[currentQuestion.id] !== undefined) && (
                <div className="mt-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 space-y-1.5 animate-fadeIn">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 pb-1 border-b border-emerald-200 dark:border-emerald-800/60">
                    <Lightbulb className="w-4 h-4 text-amber-500 inline" /><span>Phân tích đáp án & Giải thích chi tiết:</span>
                  </div>
                  <p>
                    • <strong>Key clue trong audio:</strong> "{currentQuestion.explanation || 'Chú ý các từ khóa then chốt xuất hiện ngay trước câu kết luận của người nói.'}"
                  </p>
                  <p>
                    • <strong>Cụm từ đồng nghĩa:</strong> Đối chiếu trực tiếp giữa lời thoại và phương án lựa chọn chuẩn VSTEP.
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400">
                    • <strong>Bẫy từ vựng:</strong> Tránh các phương án chứa từ ngữ xuất hiện trong audio nhưng sai lệch ngữ cảnh thời gian hoặc vị trí.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Question Navigation Buttons (← Câu trước / Câu sau →) */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-3">
              <button
                onClick={() => setCurrentQIndex((idx) => Math.max(0, idx - 1))}
                disabled={currentQIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold disabled:opacity-40 transition-colors"
              >
                ← Câu trước
              </button>

              {/* Quick Jump Dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[140px] sm:max-w-xs px-1 no-scrollbar">
                {test.questions.map((q, qIdx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(qIdx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center flex-shrink-0 ${
                      qIdx === currentQIndex
                        ? 'bg-blue-600 text-white shadow-sm scale-110'
                        : answers[q.id] !== undefined
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                    }`}
                  >
                    {qIdx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentQIndex((idx) => Math.min(totalQuestions - 1, idx + 1))}
                disabled={currentQIndex === totalQuestions - 1}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-40 transition-colors"
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

