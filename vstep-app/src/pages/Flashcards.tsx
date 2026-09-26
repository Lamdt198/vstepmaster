import {
  Bookmark,
  Trophy,
  RotateCcw,
  Sparkles,
  Volume2,
  Lightbulb,
  XCircle,
  Shuffle,
  CheckCircle2,
  BookOpen,
  Plus,
  Check,
  Trash2,
  GraduationCap,
  Laptop,
  Globe,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import { vocabTopics, VocabWord } from '../data/vocabularyData';

interface CardItem extends VocabWord {
  level?: string;
  topicTitle?: string;
}

export default function Flashcards() {
  const { savedWords, addWord, removeWord } = useBookmarks();

  // Selected topic: 'all' | topic.id | 'bookmarks'
  const [selectedTopicId, setSelectedTopicId] = useState<string>('edu-b1');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newPhonetic, setNewPhonetic] = useState('');

  // Assemble words based on selected topic
  const currentPool: CardItem[] = useMemo(() => {
    if (selectedTopicId === 'bookmarks') {
      return savedWords.map((w) => ({
        ...w,
        level: 'Personal',
        topicTitle: 'Từ vựng đã lưu',
      }));
    }

    if (selectedTopicId === 'all') {
      const allList: CardItem[] = [];
      vocabTopics.forEach((topic) => {
        topic.words.forEach((w) => {
          allList.push({
            ...w,
            level: topic.level,
            topicTitle: topic.title,
          });
        });
      });
      return allList;
    }

    const topic = vocabTopics.find((t) => t.id === selectedTopicId);
    if (topic) {
      return topic.words.map((w) => ({
        ...w,
        level: topic.level,
        topicTitle: topic.title,
      }));
    }

    return [];
  }, [selectedTopicId, savedWords]);

  const remainingWords = currentPool.filter((w) => !learned.has(w.word));
  const currentWord = remainingWords[currentIndex % (remainingWords.length || 1)];

  // Text-to-speech pronunciation
  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    setFlipped(false);
    if (remainingWords.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % remainingWords.length);
    }
  };

  const handlePrev = () => {
    setFlipped(false);
    if (remainingWords.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + remainingWords.length) % remainingWords.length);
    }
  };

  const markLearned = () => {
    if (!currentWord) return;
    setLearned((prev) => new Set([...prev, currentWord.word]));
    setFlipped(false);
    if (currentIndex >= remainingWords.length - 1) {
      setCurrentIndex(0);
    }
  };

  const markNotLearned = () => {
    // Keep in repetition queue, advance to next card
    handleNext();
  };

  const handleAddWord = () => {
    if (!newWord.trim() || !newMeaning.trim()) return;
    addWord({
      word: newWord.trim(),
      meaning: newMeaning.trim(),
      example: newExample.trim(),
    });
    setNewWord('');
    setNewMeaning('');
    setNewExample('');
    setNewPhonetic('');
    setShowAddForm(false);
  };

  const handleShuffle = () => {
    setFlipped(false);
    if (remainingWords.length > 1) {
      const randIdx = Math.floor(Math.random() * remainingWords.length);
      setCurrentIndex(randIdx);
    }
  };

  const percentComplete =
    currentPool.length > 0
      ? Math.round(((currentPool.length - remainingWords.length) / currentPool.length) * 100)
      : 0;

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
          <Sparkles className="w-3.5 h-3.5 text-primary-600" />
          <span>UC-08 • HỌC TỪ VỰNG FLASHCARDS & LẶP LẠI NGẮT QUÃNG</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-2.5">
          <Layers className="w-8 h-8 text-primary-600" />
          <span>Thẻ Ghi Nhớ VSTEP Flashcards</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Phương pháp ghi nhớ chủ động (Active Recall) kết hợp phát âm chuẩn IPA giúp làm chủ từ vựng học thuật B1 - B2 - C1.
        </p>
      </div>

      {/* Topic Selection Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Chọn chủ đề học tập:
          </label>
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
            Tổng {currentPool.length} từ trong chủ đề
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => {
              setSelectedTopicId('edu-b1');
              setCurrentIndex(0);
              setFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedTopicId === 'edu-b1'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" /> Education (B1)</span>
          </button>

          <button
            onClick={() => {
              setSelectedTopicId('edu-b2');
              setCurrentIndex(0);
              setFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedTopicId === 'edu-b2'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" /> Education (B2)</span>
          </button>

          <button
            onClick={() => {
              setSelectedTopicId('tech-b1');
              setCurrentIndex(0);
              setFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedTopicId === 'tech-b1'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5" /> Tech (B1)</span>
          </button>

          <button
            onClick={() => {
              setSelectedTopicId('tech-b2');
              setCurrentIndex(0);
              setFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedTopicId === 'tech-b2'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5" /> Tech (B2)</span>
          </button>

          <button
            onClick={() => {
              setSelectedTopicId('env-b1');
              setCurrentIndex(0);
              setFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedTopicId === 'env-b1'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Environment (B1)</span>
          </button>

          <button
            onClick={() => {
              setSelectedTopicId('all');
              setCurrentIndex(0);
              setFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedTopicId === 'all'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Tất cả đề tài</span>
          </button>

          <button
            onClick={() => {
              setSelectedTopicId('bookmarks');
              setCurrentIndex(0);
              setFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedTopicId === 'bookmarks'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-1.5"><Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-400" /> Từ của tôi</span>
            <span className="px-1.5 py-0.2 bg-amber-400 text-amber-950 rounded-full text-[10px] font-extrabold">
              {savedWords.length}
            </span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Repetition Counter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-gray-600 dark:text-gray-400">
          <span>Tiến độ ghi nhớ: {percentComplete}%</span>
          <span>
            Đã thuộc: <strong className="text-emerald-600 dark:text-emerald-400">{currentPool.length - remainingWords.length}</strong> / {currentPool.length} từ
            {remainingWords.length > 0 && (
              <span className="text-amber-600 dark:text-amber-400 ml-1.5 font-normal">
                (Còn {remainingWords.length} từ cần ôn)
              </span>
            )}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* When current pool is completely mastered */}
      {remainingWords.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-200 dark:border-gray-700 shadow-sm space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center mx-auto text-amber-500 animate-bounce"><Trophy className="w-8 h-8" /></div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Tuyệt vời! Bạn đã ghi nhớ toàn bộ từ vựng chủ đề này!
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {currentPool.length} từ vựng đã được bạn đánh dấu <strong>Đã thuộc</strong>. Hãy tiếp tục thử thách với các chủ đề khác hoặc học lại để củng cố phản xạ!
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setLearned(new Set());
                setCurrentIndex(0);
              }}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <span className="flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Ôn tập lại từ đầu</span>
            </button>
            <button
              onClick={() => {
                setSelectedTopicId('tech-b2');
                setCurrentIndex(0);
              }}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-xl font-bold text-sm transition-all"
            >
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-500" /> Đổi chủ đề nâng cao</span>
            </button>
          </div>
        </div>
      ) : (
        /* The 3D Interactive Flashcard */
        <div className="space-y-6">
          <div
            onClick={() => setFlipped(!flipped)}
            className="cursor-pointer select-none perspective-1000 min-h-[320px] relative group"
          >
            <div
              className={`w-full min-h-[320px] rounded-3xl transition-all duration-500 transform-style-preserve-3d relative shadow-lg ${
                flipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT SIDE */}
              <div
                className={`absolute inset-0 bg-white dark:bg-gray-800 border-2 ${
                  flipped ? 'invisible' : 'visible'
                } border-gray-200 dark:border-gray-700 rounded-3xl p-8 flex flex-col justify-between items-center text-center backface-hidden group-hover:border-primary-400 dark:group-hover:border-primary-600 transition-colors`}
              >
                {/* Top card row */}
                <div className="w-full flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 rounded-full text-xs font-bold border border-primary-200 dark:border-primary-800">
                    Bậc {currentWord.level || 'B2'} • {currentWord.topicTitle || 'VSTEP'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentWord.word);
                    }}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-primary-600 dark:text-primary-400 transition-colors"
                    title="Nghe phát âm"
                  ><Volume2 className="w-4 h-4" /></button>
                </div>

                {/* Center word */}
                <div className="space-y-2 my-auto">
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight">
                    {currentWord.word}
                  </h2>
                  {currentWord.phonetic && (
                    <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
                      {currentWord.phonetic}
                    </p>
                  )}
                  {currentWord.example && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic max-w-md mx-auto mt-4 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-700">
                      "{currentWord.example}"
                    </p>
                  )}
                </div>

                {/* Bottom hint */}
                <div className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold flex items-center gap-1">
                  <span className="flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Nhấn vào thẻ hoặc bấm phím cách để lật xem nghĩa</span>
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 border-2 ${
                  flipped ? 'visible' : 'invisible'
                } border-emerald-300 dark:border-emerald-700/60 rounded-3xl p-8 flex flex-col justify-between items-center text-center backface-hidden rotate-y-180`}
              >
                {/* Top back row */}
                <div className="w-full flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 rounded-full text-xs font-bold">
                    Nghĩa Tiếng Việt chuẩn ngữ cảnh
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentWord.word);
                    }}
                    className="p-2 rounded-xl bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 transition-colors shadow-xs"
                    title="Nghe phát âm"
                  ><Volume2 className="w-4 h-4" /></button>
                </div>

                {/* Center meaning */}
                <div className="space-y-2 my-auto">
                  <h3 className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-300">
                    {currentWord.meaning}
                  </h3>
                  <p className="text-base font-bold text-gray-700 dark:text-gray-300 mt-1">
                    {currentWord.word}
                  </p>
                  {currentWord.example && (
                    <div className="text-xs text-gray-600 dark:text-gray-300 max-w-md mx-auto mt-3 px-4 py-2.5 bg-white/80 dark:bg-gray-700/80 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
                      <p className="font-semibold text-emerald-900 dark:text-emerald-200">Ví dụ ứng dụng:</p>
                      <p className="italic mt-0.5">"{currentWord.example}"</p>
                    </div>
                  )}
                </div>

                {/* Bottom hint */}
                <div className="text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                  Đánh giá mức độ ghi nhớ của bạn ở các nút bên dưới
                </div>
              </div>
            </div>
          </div>

          {/* Controls Bar: Chưa nhớ, Phát âm, Xáo trộn, Đã thuộc */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrev}
              className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trước</span>
            </button>

            {/* Chưa nhớ (Red Button) */}
            <button
              onClick={markNotLearned}
              className="px-6 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-800 rounded-xl text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Chưa nhớ (Lặp lại)</span>
            </button>

            {/* Audio pronunciation */}
            <button
              onClick={() => speakWord(currentWord.word)}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-primary-600 dark:text-primary-400 rounded-xl text-base shadow-xs transition-all cursor-pointer active:scale-95 flex items-center justify-center"
              title="Phát âm"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Shuffle */}
            <button
              onClick={handleShuffle}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl shadow-xs transition-all cursor-pointer active:scale-95 flex items-center justify-center"
              title="Xáo trộn ngẫu nhiên"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Đã thuộc (Green Button) */}
            <button
              onClick={markLearned}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Đã thuộc (Thuộc lòng)</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center text-xs text-gray-400 font-mono">
            Thẻ {currentIndex + 1} / {remainingWords.length}
          </div>
        </div>
      )}

      {/* Add Custom Word & Topic Word Bank */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary-600" />
              <span>Danh mục từ vựng trong chủ đề ({currentPool.length} từ)</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Tra cứu nhanh hoặc thêm từ vựng riêng của bạn vào kho flashcards
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-1.5 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 hover:bg-primary-100 rounded-xl text-xs font-bold border border-primary-200 dark:border-primary-800 transition-colors"
          >
            <span className="flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Thêm từ mới</span>
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-primary-200 dark:border-primary-800 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Từ vựng tiếng Anh (vd: comprehensive)"
                className="px-3 py-2 border rounded-lg text-xs bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 font-medium"
              />
              <input
                type="text"
                value={newPhonetic}
                onChange={(e) => setNewPhonetic(e.target.value)}
                placeholder="Phiên âm IPA (vd: /ˌkɑːm.prəˈhen.sɪv/)"
                className="px-3 py-2 border rounded-lg text-xs bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 font-mono"
              />
              <input
                type="text"
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                placeholder="Nghĩa tiếng Việt (vd: toàn diện, bao hàm)"
                className="px-3 py-2 border rounded-lg text-xs bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 font-medium"
              />
            </div>
            <input
              type="text"
              value={newExample}
              onChange={(e) => setNewExample(e.target.value)}
              placeholder="Câu ví dụ thực tế (vd: We offer a comprehensive training program.)"
              className="w-full px-3 py-2 border rounded-lg text-xs bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleAddWord}
                disabled={!newWord.trim() || !newMeaning.trim()}
                className="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-bold disabled:opacity-50"
              >
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Lưu vào Từ của tôi</span>
              </button>
            </div>
          </div>
        )}

        {/* Word items scroll */}
        <div className="max-h-64 overflow-y-auto space-y-2 pr-1 divide-y divide-gray-100 dark:divide-gray-700 scrollbar-thin">
          {currentPool.map((w) => {
            const isWordLearned = learned.has(w.word);
            return (
              <div
                key={w.word}
                className="pt-2 flex items-center justify-between text-xs py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isWordLearned ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                  />
                  <span className="font-bold text-gray-900 dark:text-white">{w.word}</span>
                  {w.phonetic && (
                    <span className="text-gray-400 font-mono hidden sm:inline">{w.phonetic}</span>
                  )}
                  <span className="text-gray-600 dark:text-gray-300 truncate">- {w.meaning}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => speakWord(w.word)}
                    className="p-1 hover:text-primary-600 text-gray-400"
                    title="Phát âm"
                  ><Volume2 className="w-4 h-4" /></button>
                  {selectedTopicId === 'bookmarks' && (
                    <button
                      onClick={() => removeWord(w.word)}
                      className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer transition-colors"
                      title="Xóa khỏi danh sách đã lưu"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isWordLearned
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {isWordLearned ? 'Đã thuộc' : 'Chưa thuộc'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
