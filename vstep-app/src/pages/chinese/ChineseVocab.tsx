import { useState, useEffect } from 'react';
import { hskVocabulary, HskWord } from '../../data/hskData';

function speakChinese(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN';
  u.rate = 0.8;
  const voices = window.speechSynthesis.getVoices();
  const zhVoice = voices.find(v => v.lang.startsWith('zh'));
  if (zhVoice) u.voice = zhVoice;
  window.speechSynthesis.speak(u);
}

type Mode = 'list' | 'flashcard' | 'quiz';

export default function ChineseVocab() {
  const [selectedLevel, setSelectedLevel] = useState(hskVocabulary[0]);
  const [mode, setMode] = useState<Mode>('list');

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📝 Từ vựng HSK</h1>

      {/* Level selector */}
      <div className="flex gap-2 flex-wrap">
        {hskVocabulary.map((lv) => (
          <button key={lv.id} onClick={() => setSelectedLevel(lv)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedLevel.id === lv.id ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}>{lv.title}</button>
        ))}
      </div>

      {/* Mode selector */}
      <div className="flex gap-2">
        {[
          { id: 'list' as Mode, label: '📋 Danh sách' },
          { id: 'flashcard' as Mode, label: '🃏 Flashcard' },
          { id: 'quiz' as Mode, label: '✅ Quiz' },
        ].map((m) => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              mode === m.id ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}>{m.label}</button>
        ))}
      </div>

      {mode === 'list' && <VocabList words={selectedLevel.words} />}
      {mode === 'flashcard' && <VocabFlashcard words={selectedLevel.words} />}
      {mode === 'quiz' && <VocabQuiz words={selectedLevel.words} />}
    </div>
  );
}

function VocabList({ words }: { words: HskWord[] }) {
  return (
    <div className="space-y-2">
      {words.map((w) => (
        <div key={w.hanzi} className="card flex items-start gap-3">
          <button onClick={() => speakChinese(w.hanzi)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 flex-shrink-0 mt-1">🔊</button>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{w.hanzi}</span>
              <span className="text-sm text-red-600 dark:text-red-400">{w.pinyin}</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">- {w.meaning}</span>
            </div>
            {w.example && (
              <div className="mt-1.5 pl-2 border-l-2 border-red-200 dark:border-red-800">
                <p className="text-sm text-gray-800 dark:text-gray-200">{w.example}</p>
                {w.examplePinyin && <p className="text-xs text-red-500 dark:text-red-400">{w.examplePinyin}</p>}
                {w.exampleMeaning && <p className="text-xs text-gray-500 dark:text-gray-400 italic">{w.exampleMeaning}</p>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function VocabFlashcard({ words }: { words: HskWord[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const w = words[index];

  return (
    <div className="space-y-6">
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">{index + 1} / {words.length}</p>
      <div onClick={() => setFlipped(!flipped)} className="cursor-pointer">
        <div className="card min-h-[200px] flex flex-col items-center justify-center text-center">
          {!flipped ? (
            <>
              <p className="text-5xl font-bold text-gray-900 dark:text-white">{w.hanzi}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-3">nhấn để xem nghĩa</p>
            </>
          ) : (
            <>
              <p className="text-lg text-red-600 dark:text-red-400 mb-1">{w.pinyin}</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{w.meaning}</p>
              {w.example && <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{w.example}</p>}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => { setIndex((i) => (i - 1 + words.length) % words.length); setFlipped(false); }} className="btn-secondary px-5 py-2">← Trước</button>
        <button onClick={() => speakChinese(w.hanzi)} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 font-medium">🔊 Nghe</button>
        <button onClick={() => { setIndex((i) => (i + 1) % words.length); setFlipped(false); }} className="btn-secondary px-5 py-2">Tiếp →</button>
      </div>
    </div>
  );
}

function VocabQuiz({ words }: { words: HskWord[] }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const shuffled = useState(() => [...words].sort(() => Math.random() - 0.5))[0];
  const total = Math.min(shuffled.length, 10);

  if (finished) {
    return (
      <div className="text-center py-10 space-y-4">
        <p className="text-5xl">{score >= total * 0.8 ? '🏆' : score >= total * 0.5 ? '👍' : '📖'}</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{score}/{total}</h2>
        <button onClick={() => { setCurrent(0); setScore(0); setSelected(null); setFinished(false); }} className="btn-primary">🔄 Làm lại</button>
      </div>
    );
  }

  const w = shuffled[current];
  const options = useState(() => {
    return shuffled.map((_, idx) => {
      const wrong = words.filter(x => x.hanzi !== shuffled[idx].hanzi).sort(() => Math.random() - 0.5).slice(0, 3);
      return [shuffled[idx], ...wrong].sort(() => Math.random() - 0.5);
    });
  })[0];
  const currentOptions = options[current];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (currentOptions[i].hanzi === w.hanzi) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 >= total) { setFinished(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
  };

  // Enter key to advance when answered
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selected !== null && !e.repeat) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, current]);

  // Click anywhere to advance when answered
  const handleAdvanceClick = () => {
    if (selected !== null) {
      next();
    }
  };

  return (
    <div className={`space-y-6${selected !== null ? ' cursor-pointer' : ''}`} onClick={handleAdvanceClick}>
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Câu {current + 1}/{total}</span><span>Đúng: {score}</span>
      </div>
      <div className="card text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Chọn từ đúng với nghĩa:</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{w.meaning}</p>
      </div>
      <div className="space-y-2">
        {currentOptions.map((opt, i) => {
          let cls = 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-red-300';
          if (selected !== null) {
            if (opt.hanzi === w.hanzi) cls = 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300';
            else if (i === selected) cls = 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
            else cls = 'border-gray-200 dark:border-gray-600 opacity-50';
          }
          return (
            <button key={i} onClick={(e) => { e.stopPropagation(); handleSelect(i); }} disabled={selected !== null}
              className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${cls}`}>
              <span className="text-xl mr-2">{opt.hanzi}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{opt.pinyin}</span>
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="text-center" onClick={(e) => e.stopPropagation()}>
          <button onClick={next} className="btn-primary px-8 py-2">{current + 1 >= total ? 'Kết quả' : 'Tiếp →'}</button>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Nhấn Enter hoặc click để qua câu</p>
        </div>
      )}
    </div>
  );
}
