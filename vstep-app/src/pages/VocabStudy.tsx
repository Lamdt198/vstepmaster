import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { vocabTopics, VocabWord } from '../data/vocabularyData';
import { useBookmarks } from '../context/BookmarkContext';

// TTS speak function
function speakWord(word: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en-US')) || voices.find(v => v.lang.startsWith('en'));
  if (enVoice) utterance.voice = enVoice;
  window.speechSynthesis.speak(utterance);
}

type Mode = 'overview' | 'flashcard' | 'quiz' | 'match' | 'fill';

export default function VocabStudy() {
  const { id } = useParams<{ id: string }>();
  const topic = vocabTopics.find((t) => t.id === id);
  const [mode, setMode] = useState<Mode>('overview');

  if (!topic) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Không tìm thấy bộ từ vựng.</p>
        <Link to="/vocabulary" className="text-primary-600 dark:text-primary-400 mt-4 inline-block">← Quay lại</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <Link to="/vocabulary" className="text-primary-600 dark:text-primary-400 hover:underline">← Quay lại</Link>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          topic.level === 'B1' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
          topic.level === 'B2' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
        }`}>{topic.level}</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {topic.icon} {topic.title} - {topic.level}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{topic.words.length} từ vựng</p>
      </div>

      {/* Mode selector */}
      <div className="flex flex-wrap gap-2">
        {([
          { id: 'overview' as Mode, label: 'Danh sách', icon: '📋' },
          { id: 'flashcard' as Mode, label: 'Flashcard', icon: '🃏' },
          { id: 'quiz' as Mode, label: 'Trắc nghiệm', icon: '✅' },
          { id: 'match' as Mode, label: 'Nối từ', icon: '🔗' },
          { id: 'fill' as Mode, label: 'Điền từ', icon: '✏️' },
        ]).map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {mode === 'overview' && <OverviewMode words={topic.words} />}
      {mode === 'flashcard' && <FlashcardMode words={topic.words} />}
      {mode === 'quiz' && <QuizMode words={topic.words} />}
      {mode === 'match' && <MatchMode words={topic.words} />}
      {mode === 'fill' && <FillMode words={topic.words} />}
    </div>
  );
}

/* ─── Overview Mode ─── */
function OverviewMode({ words }: { words: VocabWord[] }) {
  const { addWord, removeWord, isWordSaved } = useBookmarks();

  return (
    <div className="space-y-3">
      {words.map((w) => {
        const saved = isWordSaved(w.word);
        return (
          <div key={w.word} className="card flex justify-between items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-primary-700 dark:text-primary-400 text-lg">{w.word}</span>
                {w.phonetic && <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{w.phonetic}</span>}
                <button
                  onClick={() => speakWord(w.word)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                  title="Nghe phát âm"
                >
                  🔊
                </button>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200 mt-1 font-medium">{w.meaning}</p>
              {w.example && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 italic border-l-2 border-primary-300 dark:border-primary-600 pl-2">
                  "{w.example}"
                </p>
              )}
            </div>
            <button
              onClick={() => saved ? removeWord(w.word) : addWord(w)}
              className={`text-xl flex-shrink-0 mt-1 ${saved ? 'text-red-500' : 'text-gray-300 dark:text-gray-600 hover:text-red-400'}`}
              title={saved ? 'Bỏ lưu' : 'Lưu vào flashcard'}
            >
              {saved ? '❤️' : '🤍'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Flashcard Mode ─── */
function FlashcardMode({ words }: { words: VocabWord[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState<Set<number>>(new Set());

  const remaining = words.filter((_, i) => !learned.has(i));

  if (remaining.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-5xl">🎉</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Đã thuộc hết!</h2>
        <p className="text-gray-500 dark:text-gray-400">Bạn đã học xong {words.length} từ.</p>
        <button onClick={() => { setLearned(new Set()); setIndex(0); setFlipped(false); }} className="btn-primary">🔄 Học lại</button>
      </div>
    );
  }

  const currentWordIndex = words.indexOf(remaining[index % remaining.length]);
  const w = words[currentWordIndex];

  const next = () => { setFlipped(false); setIndex((i) => (i + 1) % remaining.length); };
  const prev = () => { setFlipped(false); setIndex((i) => (i - 1 + remaining.length) % remaining.length); };
  const markLearned = () => {
    setLearned((s) => new Set([...s, currentWordIndex]));
    setFlipped(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Còn {remaining.length}/{words.length} từ
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div className="bg-green-500 h-1.5 rounded-full transition-all" style={{ width: `${(learned.size / words.length) * 100}%` }} />
      </div>

      <div onClick={() => setFlipped(!flipped)} className="cursor-pointer">
        <div className="card min-h-[220px] flex flex-col items-center justify-center text-center">
          {!flipped ? (
            <>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wide">Nhấn để lật</p>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{w.word}</p>
              {w.phonetic && <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{w.phonetic}</p>}
              <button
                onClick={(e) => { e.stopPropagation(); speakWord(w.word); }}
                className="mt-3 text-2xl hover:scale-110 transition-transform"
                title="Nghe phát âm"
              >🔊</button>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wide">Nghĩa</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{w.meaning}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 italic">"{w.example}"</p>
              <button
                onClick={(e) => { e.stopPropagation(); speakWord(w.word); }}
                className="mt-3 text-2xl hover:scale-110 transition-transform"
                title="Nghe phát âm"
              >🔊</button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button onClick={prev} className="btn-secondary px-5 py-2.5">← Trước</button>
        <button onClick={markLearned} className="bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 font-medium">✓ Thuộc</button>
        <button onClick={next} className="btn-secondary px-5 py-2.5">Tiếp →</button>
      </div>
    </div>
  );
}

/* ─── Quiz Mode (Multiple Choice) ─── */
function QuizMode({ words }: { words: VocabWord[] }) {
  const shuffled = useMemo(() => [...words].sort(() => Math.random() - 0.5), [words]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const options = useMemo(() => {
    const w = shuffled[current];
    const wrong = words.filter((x) => x.word !== w.word).sort(() => Math.random() - 0.5).slice(0, 3);
    return [w, ...wrong].sort(() => Math.random() - 0.5);
  }, [current, shuffled, words]);

  if (finished) {
    const pct = Math.round((score / words.length) * 100);
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-5xl">{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📖'}</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Kết quả: {score}/{words.length}</h2>
        <p className="text-gray-500 dark:text-gray-400">{pct}% đúng</p>
        <button onClick={() => { setCurrent(0); setScore(0); setSelected(null); setFinished(false); }} className="btn-primary">🔄 Làm lại</button>
      </div>
    );
  }

  const w = shuffled[current];
  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (options[i].meaning === w.meaning) setScore((s) => s + 1);
  };
  const next = () => {
    if (current + 1 >= words.length) { setFinished(true); return; }
    setCurrent((c) => c + 1);
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
        <span>Câu {current + 1}/{words.length}</span>
        <span>Đúng: {score}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div className="bg-primary-600 h-1.5 rounded-full transition-all" style={{ width: `${((current + 1) / words.length) * 100}%` }} />
      </div>

      <div className="card text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Chọn nghĩa đúng của:</p>
        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{w.word}</p>
        {w.phonetic && <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{w.phonetic}</p>}
      </div>

      <div className="space-y-3">
        {options.map((opt, i) => {
          let cls = 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-primary-300 dark:hover:border-primary-500';
          if (selected !== null) {
            if (opt.meaning === w.meaning) cls = 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300';
            else if (i === selected) cls = 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
            else cls = 'border-gray-200 dark:border-gray-600 opacity-50 text-gray-500 dark:text-gray-400';
          }
          return (
            <button key={i} onClick={(e) => { e.stopPropagation(); handleSelect(i); }} disabled={selected !== null}
              className={`w-full text-left p-4 rounded-lg border-2 transition-colors font-medium ${cls}`}>
              {opt.meaning}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="text-center" onClick={(e) => e.stopPropagation()}>
          <button onClick={next} className="btn-primary px-8 py-2.5">
            {current + 1 >= words.length ? 'Xem kết quả' : 'Câu tiếp →'}
          </button>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Nhấn Enter hoặc click để qua câu</p>
        </div>
      )}
    </div>
  );
}

/* ─── Match Mode ─── */
function MatchMode({ words }: { words: VocabWord[] }) {
  const subset = useMemo(() => [...words].sort(() => Math.random() - 0.5).slice(0, 6), [words]);
  const shuffledMeanings = useMemo(() => [...subset].sort(() => Math.random() - 0.5), [subset]);

  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);

  const handleWordClick = (i: number) => {
    if (matched.has(subset[i].word)) return;
    setSelectedWord(i);
    setWrong(null);
  };

  const handleMeaningClick = (i: number) => {
    if (selectedWord === null) return;
    if (matched.has(shuffledMeanings[i].word)) return;

    if (subset[selectedWord].word === shuffledMeanings[i].word) {
      setMatched((s) => new Set([...s, subset[selectedWord!].word]));
      setSelectedWord(null);
    } else {
      setWrong(shuffledMeanings[i].word);
      setTimeout(() => setWrong(null), 800);
    }
  };

  if (matched.size === subset.length) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-5xl">🎉</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hoàn thành!</h2>
        <p className="text-gray-500 dark:text-gray-400">Nối đúng tất cả {subset.length} cặp từ.</p>
        <button onClick={() => { setMatched(new Set()); setSelectedWord(null); }} className="btn-primary">🔄 Chơi lại</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Chọn từ bên trái, sau đó chọn nghĩa đúng bên phải. Đã nối: {matched.size}/{subset.length}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {/* Words column */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Từ tiếng Anh</p>
          {subset.map((w, i) => (
            <button key={w.word} onClick={() => handleWordClick(i)} disabled={matched.has(w.word)}
              className={`w-full p-3 rounded-lg border-2 text-left text-sm font-medium transition-colors ${
                matched.has(w.word) ? 'border-green-400 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 line-through opacity-60' :
                selectedWord === i ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' :
                'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-primary-300 dark:hover:border-primary-500'
              }`}>
              {w.word}
            </button>
          ))}
        </div>
        {/* Meanings column */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Nghĩa tiếng Việt</p>
          {shuffledMeanings.map((w, i) => (
            <button key={w.word + '-m'} onClick={() => handleMeaningClick(i)} disabled={matched.has(w.word)}
              className={`w-full p-3 rounded-lg border-2 text-left text-sm font-medium transition-colors ${
                matched.has(w.word) ? 'border-green-400 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 line-through opacity-60' :
                wrong === w.word ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-primary-300 dark:hover:border-primary-500'
              }`}>
              {w.meaning}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Fill-in-the-blank Mode ─── */
function FillMode({ words }: { words: VocabWord[] }) {
  const shuffled = useMemo(() => [...words].sort(() => Math.random() - 0.5), [words]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (finished) {
    const pct = Math.round((score / words.length) * 100);
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-5xl">{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📖'}</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Kết quả: {score}/{words.length}</h2>
        <p className="text-gray-500 dark:text-gray-400">{pct}% đúng</p>
        <button onClick={() => { setCurrent(0); setScore(0); setInput(''); setChecked(false); setFinished(false); }} className="btn-primary">🔄 Làm lại</button>
      </div>
    );
  }

  const w = shuffled[current];
  const blankSentence = w.example.replace(new RegExp(w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '________');
  const isCorrect = input.trim().toLowerCase() === w.word.toLowerCase();

  const handleCheck = () => {
    setChecked(true);
    if (isCorrect) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= words.length) { setFinished(true); return; }
    setCurrent((c) => c + 1);
    setInput('');
    setChecked(false);
  };

  // Enter key to advance when checked
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && checked && !e.repeat) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [checked, current]);

  // Click anywhere to advance when checked
  const handleAdvanceClick = () => {
    if (checked) {
      next();
    }
  };

  return (
    <div className={`space-y-6${checked ? ' cursor-pointer' : ''}`} onClick={handleAdvanceClick}>
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Câu {current + 1}/{words.length}</span>
        <span>Đúng: {score}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div className="bg-primary-600 h-1.5 rounded-full transition-all" style={{ width: `${((current + 1) / words.length) * 100}%` }} />
      </div>

      <div className="card">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Điền từ đúng vào chỗ trống:</p>
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">{blankSentence}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">💡 Gợi ý: <span className="font-medium text-primary-600 dark:text-primary-400">{w.meaning}</span></p>
      </div>

      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !checked) handleCheck(); }}
          disabled={checked}
          placeholder="Nhập từ tiếng Anh..."
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        {!checked ? (
          <button onClick={handleCheck} disabled={!input.trim()} className="btn-primary px-6">Kiểm tra</button>
        ) : (
          <button onClick={next} className="btn-primary px-6">
            {current + 1 >= words.length ? 'Kết quả' : 'Tiếp →'}
          </button>
        )}
      </div>

      {checked && (
        <div className={`card ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {isCorrect ? '✓ Chính xác!' : `✗ Sai rồi! Đáp án đúng: "${w.word}"`}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Nhấn Enter hoặc click để qua câu</p>
        </div>
      )}
    </div>
  );
}
