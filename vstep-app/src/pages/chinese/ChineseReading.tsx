import { useState } from 'react';
import { hskReadings } from '../../data/hskData';

function speakChinese(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN'; u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

export default function ChineseReading() {
  const [selected, setSelected] = useState(hskReadings[0]);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qIdx: number, aIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: aIdx }));
  };

  const handleSubmit = () => setSubmitted(true);
  const reset = () => { setAnswers({}); setSubmitted(false); setShowPinyin(false); setShowTranslation(false); };

  const score = selected.questions.reduce((acc, q, i) => acc + (answers[i] === q.correctAnswer ? 1 : 0), 0);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📖 Đọc hiểu tiếng Trung</h1>

      {/* Passage selector */}
      <div className="flex gap-2 flex-wrap">
        {hskReadings.map((r) => (
          <button key={r.id} onClick={() => { setSelected(r); reset(); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${selected.id === r.id ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
            HSK{r.level}: {r.title}
          </button>
        ))}
      </div>

      {/* Reading passage */}
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-900 dark:text-white">{selected.title}</h2>
          <button onClick={() => speakChinese(selected.text)}
            className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200">🔊 Nghe</button>
        </div>
        <p className="text-lg text-gray-900 dark:text-white leading-relaxed mb-3">{selected.text}</p>

        <div className="flex gap-2 mt-3">
          <button onClick={() => setShowPinyin(!showPinyin)}
            className="text-xs btn-secondary">{showPinyin ? '🙈 Ẩn pinyin' : '👁️ Pinyin'}</button>
          <button onClick={() => setShowTranslation(!showTranslation)}
            className="text-xs btn-secondary">{showTranslation ? '🙈 Ẩn dịch' : '🇻🇳 Dịch'}</button>
        </div>

        {showPinyin && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">{selected.pinyin}</p>
          </div>
        )}
        {showTranslation && (
          <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">{selected.translation}</p>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {selected.questions.map((q, qIdx) => (
          <div key={qIdx} className="card">
            <p className="font-medium text-gray-900 dark:text-white mb-2">
              <span className="text-red-500 mr-1">{qIdx + 1}.</span> {q.question}
            </p>
            <div className="space-y-1.5">
              {q.options.map((opt, oIdx) => {
                let cls = 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-red-300';
                if (submitted) {
                  if (oIdx === q.correctAnswer) cls = 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300';
                  else if (answers[qIdx] === oIdx) cls = 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
                  else cls = 'opacity-50 border-gray-200 dark:border-gray-600';
                } else if (answers[qIdx] === oIdx) {
                  cls = 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
                }
                return (
                  <button key={oIdx} onClick={() => handleAnswer(qIdx, oIdx)} disabled={submitted}
                    className={`w-full text-left p-2.5 rounded-lg border-2 text-sm transition-colors ${cls}`}>
                    {String.fromCharCode(65 + oIdx)}. {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="text-center">
        {!submitted ? (
          <button onClick={handleSubmit} className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700">
            Nộp bài ({Object.keys(answers).length}/{selected.questions.length})
          </button>
        ) : (
          <div className="card">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{score}/{selected.questions.length}</p>
            <button onClick={reset} className="btn-secondary mt-3">🔄 Làm lại</button>
          </div>
        )}
      </div>
    </div>
  );
}
