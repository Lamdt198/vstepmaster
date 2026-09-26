import { useState, useCallback, useRef, useEffect } from 'react';
import { Library, Info, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, X, BookOpen, Clock } from 'lucide-react';
import { stories, Story } from '../data/storiesData';
import { useBookmarks } from '../context/BookmarkContext';
import { dictionaryExtended } from '../data/dictionaryData';
import { useAdaptiveGrid } from '../hooks/useAdaptiveGrid';

type LevelFilter = 'all' | 'B1' | 'B2' | 'C1';

export default function ReadingLibrary() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customText, setCustomText] = useState('');
  const [customTitle, setCustomTitle] = useState('');

  const { cols, rows, itemsPerPage } = useAdaptiveGrid();

  // Load saved custom texts from localStorage
  const [savedTexts, setSavedTexts] = useState<Story[]>(() => {
    const saved = localStorage.getItem('vstep_custom_texts');
    return saved ? JSON.parse(saved) : [];
  });

  const allStories = [...stories, ...savedTexts];
  const filtered = levelFilter === 'all' ? allStories : allStories.filter((s) => s.level === levelFilter);

  const handleAddCustomText = () => {
    if (!customText.trim() || !customTitle.trim()) return;
    const newStory: Story = {
      id: `custom_${Date.now()}`,
      title: customTitle.trim(),
      level: 'B2',
      category: 'article',
      readTime: Math.max(1, Math.round(customText.split(/\s+/).length / 200)),
      content: customText.trim(),
      vocabulary: {},
    };
    const updated = [...savedTexts, newStory];
    setSavedTexts(updated);
    localStorage.setItem('vstep_custom_texts', JSON.stringify(updated));
    setCustomText('');
    setCustomTitle('');
    setShowCustomInput(false);
    setSelectedStory(newStory);
  };

  const deleteCustomText = (id: string) => {
    const updated = savedTexts.filter((s) => s.id !== id);
    setSavedTexts(updated);
    localStorage.setItem('vstep_custom_texts', JSON.stringify(updated));
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((validPage - 1) * itemsPerPage, validPage * itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  const handleFilterChange = (lvl: LevelFilter) => {
    setLevelFilter(lvl);
    setCurrentPage(1);
  };

  if (selectedStory) {
    return <StoryReader story={selectedStory} onBack={() => setSelectedStory(null)} />;
  }

  return (
    <div className="space-y-2.5 animate-fadeIn flex flex-col justify-between h-full overflow-hidden">
      {/* Top Header & Toolbar */}
      <div className="space-y-2.5 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Library className="w-6 h-6 text-teal-600" />
              <span>Thư Viện Đọc & Dịch Song Ngữ</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5">
              Kho bài đọc phân cấp độ B1 - C1, hỗ trợ tra từ điển tức thì và dịch đoạn thông minh.
            </p>
          </div>

          {/* Level Filters, Custom Add & Top Mini-Pagination */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs">
              {[
                { id: 'all', label: `Tất cả (${allStories.length})` },
                { id: 'B1', label: 'B1' },
                { id: 'B2', label: 'B2' },
                { id: 'C1', label: 'C1' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFilterChange(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    levelFilter === f.id
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="px-3 py-1.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-teal-600 dark:text-teal-400 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nhập văn bản</span>
            </button>

            {totalPages > 1 && (
              <div className="flex items-center gap-1 bg-white dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs text-xs">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={validPage === 1}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 cursor-pointer text-gray-700 dark:text-gray-300 transition-colors"
                  title="Trang trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-bold px-1.5 text-gray-700 dark:text-gray-300">
                  Trang {validPage}/{totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={validPage === totalPages}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 cursor-pointer text-gray-700 dark:text-gray-300 transition-colors"
                  title="Trang sau"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Custom text input modal / panel if active */}
        {showCustomInput && (
          <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 space-y-3 shrink-0 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs sm:text-sm text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-600" /> Nhập văn bản tiếng Anh mới của bạn
              </h3>
              <button onClick={() => setShowCustomInput(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Tiêu đề bài đọc..."
                className="w-full px-3 py-1.5 border border-teal-200 dark:border-teal-700 rounded-xl bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Dán nội dung tiếng Anh vào đây..."
                rows={2}
                className="w-full sm:col-span-2 px-3 py-1.5 border border-teal-200 dark:border-teal-700 rounded-xl bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setShowCustomInput(false)} className="px-3 py-1 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100">
                Hủy
              </button>
              <button
                onClick={handleAddCustomText}
                disabled={!customText.trim() || !customTitle.trim()}
                className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold disabled:opacity-40 transition-colors cursor-pointer"
              >
                ✓ Thêm & Mở Đọc
              </button>
            </div>
          </div>
        )}

        {/* Collapsible Format Info */}
        <div className="rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/70 dark:bg-teal-950/20 overflow-hidden transition-all shrink-0">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-full px-3.5 py-2 flex items-center justify-between text-xs font-bold text-teal-900 dark:text-teal-300 cursor-pointer hover:bg-teal-100/50 dark:hover:bg-teal-900/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Phương pháp học Đọc & Dịch tương tác (Tra cứu trực tiếp trong bài đọc)</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-teal-700 dark:text-teal-400 font-semibold shrink-0">
              {showInfo ? 'Thu gọn' : 'Xem chi tiết'}
              {showInfo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </span>
          </button>
          {showInfo && (
            <div className="px-3.5 pb-2.5 pt-1 text-xs text-teal-900 dark:text-teal-200 space-y-1.5 border-t border-teal-200/60 dark:border-teal-800/60 animate-fadeIn">
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span><strong>Tra từ 1 chạm:</strong> Nhấp vào bất kỳ từ tiếng Anh nào để xem nghĩa, phiên âm và ví dụ.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span><strong>Dịch câu ngữ cảnh:</strong> Bôi đen một cụm từ hoặc cả câu dài để mở công cụ dịch tự động.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span><strong>Lưu sổ tay từ vựng:</strong> Nhấn biểu tượng trái tim để đưa từ mới vào bộ thẻ Flashcards ôn tập.</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Adaptive Grid that fills 100% of remaining height */}
      <div
        className="grid gap-3 flex-1 min-h-0 py-0.5"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {paginated.map((story) => (
          <div
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl p-3.5 border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between h-full cursor-pointer"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded-md border border-teal-200/80 dark:border-teal-800/50">
                    {story.category === 'story' ? 'Truyện ngắn' : 'Bài viết'}
                  </span>
                  {story.id.startsWith('custom_') && (
                    <span className="text-[9px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded">
                      Tự nhập
                    </span>
                  )}
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  story.level === 'B1' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  story.level === 'B2' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                }`}>
                  {story.level}
                </span>
              </div>

              <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 leading-snug">
                {story.title}
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {story.content}
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-700/80 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" /> ~{story.readTime} phút đọc
              </span>
              <span className="text-teal-600 dark:text-teal-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-xs">
                Đọc bài &rarr;
              </span>
            </div>

            {story.id.startsWith('custom_') && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCustomText(story.id);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center hover:bg-red-600 transition-all shadow-xs"
                title="Xóa bài đọc này"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls Anchored At Bottom */}
      <div className="shrink-0 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Hiển thị <strong>{paginated.length}</strong> / {filtered.length} bài đọc (Trang {validPage}/{totalPages})
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validPage === 1}
              className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-xs transition-colors"
              title="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  validPage === num
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validPage === totalPages}
              className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-xs transition-colors"
              title="Trang sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Story Reader with click-to-translate ─── */
function StoryReader({ story, onBack }: { story: Story; onBack: () => void }) {
  const { addWord, isWordSaved, removeWord } = useBookmarks();
  const [popup, setPopup] = useState<{ word: string; meaning: string; example: string; loading: boolean; x: number; y: number } | null>(null);
  const [selectionPopup, setSelectionPopup] = useState<{ text: string; x: number; y: number } | null>(null);
  const [translatedText, setTranslatedText] = useState('');
  const [translating, setTranslating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Full dictionary (92K+ words) loaded from JSON on first use
  const [, setFullDict] = useState<Record<string, string> | null>(null);
  const fullDictRef = useRef<Record<string, string> | null>(null);

  const loadFullDict = async () => {
    if (fullDictRef.current) return fullDictRef.current;
    try {
      const res = await fetch('/dict-ev.json');
      if (res.ok) {
        const data = await res.json();
        fullDictRef.current = data;
        setFullDict(data);
        return data;
      }
    } catch { /* ignore */ }
    return null;
  };

  // Lookup word: check story vocab → built-in dictionary → full 92K dict → then API
  const lookupWord = (word: string): { meaning: string; example: string } | null => {
    const clean = word.toLowerCase().replace(/[^a-z'-]/g, '');
    if (!clean || clean.length < 1) return null;
    // 1. Check story-specific vocabulary
    for (const [key, value] of Object.entries(story.vocabulary)) {
      if (key.toLowerCase() === clean) return { meaning: value, example: '' };
    }
    // 2. Check built-in dictionary (3000+ words)
    if (dictionaryExtended[clean]) {
      return { meaning: dictionaryExtended[clean], example: '' };
    }
    // 3. Check full 92K dictionary (if loaded)
    if (fullDictRef.current && fullDictRef.current[clean]) {
      return { meaning: fullDictRef.current[clean], example: '' };
    }
    return null;
  };

  // Free translation API: MyMemory + FreeDictionaryAPI (no key needed)
  const translateWord = async (word: string, sentence: string): Promise<{ meaning: string; example: string }> => {
    // Check localStorage cache first
    const cacheKey = `dict_cache_${word.toLowerCase()}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    try {
      // Try Free Dictionary API first (English definitions + examples)
      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (dictRes.ok) {
        const dictData = await dictRes.json();
        const entry = dictData[0];
        const meanings = entry?.meanings || [];
        // Get first definition
        const firstMeaning = meanings[0];
        const definition = firstMeaning?.definitions?.[0]?.definition || '';
        const example = firstMeaning?.definitions?.[0]?.example || '';
        const partOfSpeech = firstMeaning?.partOfSpeech || '';

        // Now translate to Vietnamese via MyMemory
        const transRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|vi`);
        let viMeaning = '';
        if (transRes.ok) {
          const transData = await transRes.json();
          viMeaning = transData?.responseData?.translatedText || '';
        }

        const result = {
          meaning: viMeaning || definition || 'Không tìm thấy',
          example: example ? example : (definition ? `(${partOfSpeech}) ${definition}` : ''),
        };
        // Cache the result
        localStorage.setItem(cacheKey, JSON.stringify(result));
        return result;
      }

      // Fallback: MyMemory only
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|vi`);
      if (res.ok) {
        const data = await res.json();
        const translated = data?.responseData?.translatedText;
        if (translated && translated.toLowerCase() !== word.toLowerCase()) {
          const result = { meaning: translated, example: '' };
          localStorage.setItem(cacheKey, JSON.stringify(result));
          return result;
        }
      }
    } catch { /* fallback below */ }

    // Last fallback: Gemini AI
    const apiKey = localStorage.getItem('vstep_ai_key');
    if (apiKey) {
      const result = await lookupWithAI(word, sentence);
      localStorage.setItem(cacheKey, JSON.stringify(result));
      return result;
    }
    return { meaning: `Không tra được "${word}"`, example: '' };
  };

  const lookupWithAI = async (word: string, sentence: string): Promise<{ meaning: string; example: string }> => {
    const apiKey = localStorage.getItem('vstep_ai_key');
    if (!apiKey) {
      return { meaning: 'Chưa kích hoạt AI từ điển (Cấu hình bởi Quản trị viên)', example: '' };
    }
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are an English-Vietnamese dictionary. Given the word "${word}" in this context: "${sentence}"

Respond in this EXACT format (2 lines only, no extra text):
MEANING: <Vietnamese meaning of the word in this context>
EXAMPLE: <a short example sentence using this word>` }] }],
            generationConfig: { temperature: 0.1, maxOutputTokens: 150 },
          }),
        }
      );
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const meaningMatch = text.match(/MEANING:\s*(.+)/i);
      const exampleMatch = text.match(/EXAMPLE:\s*(.+)/i);
      return {
        meaning: meaningMatch ? meaningMatch[1].trim() : 'Không tra được',
        example: exampleMatch ? exampleMatch[1].trim() : '',
      };
    } catch {
      return { meaning: 'Lỗi kết nối. Thử lại.', example: '' };
    }
  };

  // Get the sentence containing the clicked word for context
  const getSentenceContext = (wordElement: HTMLElement): string => {
    const parent = wordElement.closest('p');
    if (!parent) return '';
    const text = parent.textContent || '';
    // Find the sentence containing the word
    const sentences = text.split(/[.!?]+/);
    const word = wordElement.dataset.word || '';
    const sentence = sentences.find((s) => s.toLowerCase().includes(word.toLowerCase())) || text.substring(0, 150);
    return sentence.trim();
  };

  const handleWordClick = async (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'SPAN' || !target.dataset.word) return;

    const word = target.dataset.word;
    const cleanWord = word.replace(/[^a-zA-Z'-]/g, '');
    if (!cleanWord || cleanWord.length < 2) return;

    const rect = target.getBoundingClientRect();

    // Try local lookup first (instant)
    let localResult = lookupWord(cleanWord);
    if (localResult) {
      setPopup({ word: cleanWord, meaning: localResult.meaning, example: localResult.example, loading: false, x: rect.left, y: rect.bottom + 5 });
      setSelectionPopup(null);
      return;
    }

    // Show loading, try to load full dict then lookup
    setPopup({ word: cleanWord, meaning: '', example: '', loading: true, x: rect.left, y: rect.bottom + 5 });
    setSelectionPopup(null);

    // Load full 92K dict if not loaded yet
    const dict = await loadFullDict();
    const clean = cleanWord.toLowerCase();
    if (dict && dict[clean]) {
      setPopup({ word: cleanWord, meaning: dict[clean], example: '', loading: false, x: rect.left, y: rect.bottom + 5 });
      return;
    }

    // Still not found → use API
    const sentence = getSentenceContext(target);
    const result = await translateWord(cleanWord, sentence);
    setPopup({ word: cleanWord, meaning: result.meaning, example: result.example, loading: false, x: rect.left, y: rect.bottom + 5 });
  };

  // Handle text selection for phrase translation
  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      return;
    }
    const text = selection.toString().trim();
    if (text.split(/\s+/).length < 2) return; // only for multi-word selections

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setSelectionPopup({ text, x: rect.left, y: rect.bottom + 5 });
    setPopup(null);
    setTranslatedText('');
  }, []);

  const translateSelection = async () => {
    if (!selectionPopup) return;
    setTranslating(true);
    try {
      // Try MyMemory API first (free, no key)
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(selectionPopup.text.substring(0, 500))}&langpair=en|vi`);
      if (res.ok) {
        const data = await res.json();
        const translated = data?.responseData?.translatedText;
        if (translated) {
          setTranslatedText(translated);
          setTranslating(false);
          return;
        }
      }
      // Fallback to Gemini
      const apiKey = localStorage.getItem('vstep_ai_key');
      if (apiKey) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `Translate to Vietnamese. Only return the translation:\n\n"${selectionPopup.text}"` }] }],
              generationConfig: { temperature: 0.1, maxOutputTokens: 500 },
            }),
          }
        );
        const data = await response.json();
        setTranslatedText(data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Không dịch được');
      } else {
        setTranslatedText('Lỗi dịch. Thử đoạn ngắn hơn.');
      }
    } catch {
      setTranslatedText('Lỗi kết nối. Thử lại sau.');
    } finally {
      setTranslating(false);
    }
  };

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.word-popup') && !(e.target as HTMLElement).closest('[data-word]')) {
        setPopup(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Render content with clickable words
  const renderContent = () => {
    const paragraphs = story.content.split('\n\n');
    return paragraphs.map((para, pIdx) => (
      <p key={pIdx} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
        {para.split(/(\s+)/).map((segment, sIdx) => {
          if (/^\s+$/.test(segment)) return segment;
          const cleanWord = segment.replace(/[^a-zA-Z'-]/g, '').toLowerCase();
          const isVocab = Object.keys(story.vocabulary).some((v) => v.toLowerCase() === cleanWord);
          return (
            <span
              key={`${pIdx}-${sIdx}`}
              data-word={segment.replace(/[^a-zA-Z'-]/g, '')}
              className={`cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-800/40 rounded px-0.5 transition-colors ${
                isVocab ? 'border-b border-dashed border-primary-400 dark:border-primary-500' : ''
              }`}
            >
              {segment}
            </span>
          );
        })}
      </p>
    ));
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-primary-600 dark:text-primary-400 hover:underline text-sm">← Quay lại danh sách</button>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
          story.level === 'B1' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
          story.level === 'B2' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
        }`}>{story.level}</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{story.title}</h1>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          💡 <strong>Click vào từ</strong> để xem nghĩa (từ gạch chân = từ mới có trong từ điển). <strong>Bôi đen cụm từ/câu</strong> để dịch cả đoạn.
        </p>
      </div>

      {/* Story content */}
      <div
        ref={contentRef}
        className="card text-base relative select-text"
        onClick={handleWordClick}
        onMouseUp={handleMouseUp}
      >
        {renderContent()}
      </div>

      {/* Word popup */}
      {popup && (
        <div
          className="word-popup fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl p-4 max-w-xs"
          style={{ left: Math.min(popup.x, window.innerWidth - 280), top: Math.min(popup.y, window.innerHeight - 200) }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-bold text-primary-700 dark:text-primary-400 text-lg">{popup.word}</p>
              {popup.loading ? (
                <div className="flex items-center gap-2 mt-2">
                  <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Đang tra từ điển...</span>
                </div>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{popup.meaning}</p>
                  {popup.example && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic border-l-2 border-primary-300 dark:border-primary-600 pl-2">
                      {popup.example}
                    </p>
                  )}
                </>
              )}
            </div>
            <button onClick={() => setPopup(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2">✕</button>
          </div>
          {!popup.loading && popup.meaning && !popup.meaning.startsWith('Cần API') && !popup.meaning.startsWith('Lỗi') && (
            <button
              onClick={() => {
                const saved = isWordSaved(popup.word);
                if (saved) { removeWord(popup.word); }
                else { addWord({ word: popup.word, meaning: popup.meaning, example: popup.example || '' }); }
              }}
              className={`mt-3 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                isWordSaved(popup.word)
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              }`}
            >
              {isWordSaved(popup.word) ? '❤️ Đã lưu - Bỏ?' : '🤍 Lưu vào Flashcard'}
            </button>
          )}
        </div>
      )}

      {/* Selection popup */}
      {selectionPopup && (
        <div
          className="word-popup fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl p-4 max-w-sm"
          style={{ left: Math.min(selectionPopup.x, window.innerWidth - 350), top: selectionPopup.y }}
        >
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">"{selectionPopup.text.substring(0, 80)}{selectionPopup.text.length > 80 ? '...' : ''}"</p>
            <button onClick={() => setSelectionPopup(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2 flex-shrink-0">✕</button>
          </div>
          {translatedText ? (
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">{translatedText}</p>
            </div>
          ) : (
            <button
              onClick={translateSelection}
              disabled={translating}
              className="bg-primary-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary-700 disabled:opacity-50"
            >
              {translating ? '⏳ Đang dịch...' : '🌐 Dịch sang tiếng Việt'}
            </button>
          )}
        </div>
      )}

      {/* Vocabulary list */}
      <div className="card">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">📝 Từ vựng trong bài ({Object.keys(story.vocabulary).length} từ)</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {Object.entries(story.vocabulary).map(([word, meaning]) => {
            const saved = isWordSaved(word);
            return (
              <div key={word} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <span className="font-medium text-primary-700 dark:text-primary-400 text-sm">{word}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">- {meaning}</span>
                </div>
                <button
                  onClick={() => saved ? removeWord(word) : addWord({ word, meaning, example: '' })}
                  className={`text-sm flex-shrink-0 ${saved ? 'text-red-500' : 'text-gray-300 dark:text-gray-600 hover:text-red-400'}`}
                >
                  {saved ? '❤️' : '🤍'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
