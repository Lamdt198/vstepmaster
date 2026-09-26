import { useState, useEffect, useRef } from 'react';
import { Volume2, Bookmark, Check, Sparkles, BookOpen, X, Loader2 } from 'lucide-react';
import { dictionaryService, WordLookupResult } from '../services/dictionaryService';
import { useBookmarks } from '../context/BookmarkContext';

// Helper to expand selection across hyphens (e.g. "well-known", "state-of-the-art")
function expandHyphenatedSelection(selection: Selection): { text: string; range: Range } | null {
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0);
  const container = range.startContainer;

  if (container.nodeType === Node.TEXT_NODE && range.startContainer === range.endContainer) {
    const fullText = container.textContent || '';
    let start = range.startOffset;
    let end = range.endOffset;
    let modified = false;

    // Expand backwards across hyphens, apostrophes and alphanumeric characters
    while (start > 0) {
      const prevChar = fullText[start - 1];
      if (/[a-zA-Z0-9'-]/.test(prevChar)) {
        start--;
        modified = true;
      } else {
        break;
      }
    }

    // Expand forwards across hyphens, apostrophes and alphanumeric characters
    while (end < fullText.length) {
      const nextChar = fullText[end];
      if (/[a-zA-Z0-9'-]/.test(nextChar)) {
        end++;
        modified = true;
      } else {
        break;
      }
    }

    // Trim leading/trailing hyphens or apostrophes from word boundary
    while (start < end && /^[-']/.test(fullText[start])) start++;
    while (end > start && /[-']$/.test(fullText[end - 1])) end--;

    if (start < end && modified) {
      try {
        const newRange = document.createRange();
        newRange.setStart(container, start);
        newRange.setEnd(container, end);
        selection.removeAllRanges();
        selection.addRange(newRange);
        return { text: fullText.substring(start, end).trim(), range: newRange };
      } catch {
        /* fallback to default range */
      }
    }
  }

  return { text: selection.toString().trim(), range };
}

export default function GlobalDictionaryPopover() {
  const [result, setResult] = useState<WordLookupResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchedWord, setSearchedWord] = useState('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isSavedBookmark, setIsSavedBookmark] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { addWord, isWordSaved } = useBookmarks();

  // Core lookup runner for a given selection Range & cleaned text
  const executeLookup = async (range: Range, clean: string) => {
    if (!clean || clean.length < 2) return;

    // Calculate coordinates
    try {
      const rect = range.getBoundingClientRect();
      const popoverWidth = 320;
      const popoverHeight = 220;

      let x = rect.left + window.scrollX;
      let y = rect.bottom + window.scrollY + 8;

      // Keep inside screen viewport
      if (x + popoverWidth > window.innerWidth - 16) {
        x = Math.max(16, window.innerWidth - popoverWidth - 16);
      }
      if (y + popoverHeight > window.innerHeight + window.scrollY - 16) {
        y = Math.max(16, rect.top + window.scrollY - popoverHeight - 8);
      }

      setPosition({ x, y });
      setSearchedWord(clean);
      setIsSavedBookmark(isWordSaved ? isWordSaved(clean) : false);

      // 1. Fast synchronous offline check (0ms)
      const offlineRes = dictionaryService.lookupOfflineSync(clean);
      if (offlineRes) {
        setResult(offlineRes);
        setLoading(false);
        return;
      }

      // 2. Not found offline -> show loading & search online + auto-save to DB!
      setLoading(true);
      setResult(null);

      const fullRes = await dictionaryService.lookup(clean);
      if (fullRes) {
        setResult(fullRes);
      } else {
        setResult({
          word: clean,
          meaning: 'Không tìm thấy định nghĩa cho từ/cụm từ này.',
          level: 'B2',
          source: 'offline',
        });
      }
    } catch (err) {
      console.warn('[GlobalDictionary] Selection range error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Double-click listener: handles single words AND compound hyphenated words
    const handleDoubleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('button') ||
        target.closest('select') ||
        target.closest('.no-dictionary-lookup') ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      // Automatically expand across hyphens if part of a compound word (e.g. well-known, state-of-the-art)
      const expanded = expandHyphenatedSelection(selection);
      if (!expanded) return;

      const clean = dictionaryService.cleanWord(expanded.text);
      if (!clean || clean.length < 2) return;

      await executeLookup(expanded.range, clean);
    };

    // 2. Mouse-up listener: handles drag-selected phrases (2 to 8 words)
    const handleMouseUp = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('button') ||
        target.closest('select') ||
        target.closest('.no-dictionary-lookup') ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }

      // If e.detail > 1, it's part of a double-click / triple-click, handled by handleDoubleClick
      if (e.detail > 1) return;

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const rawText = selection.toString().trim();
      if (!rawText) return;

      // Only trigger mouseup on multi-word phrases (2 to 8 words)
      const words = rawText.split(/\s+/);
      if (words.length >= 2 && words.length <= 8) {
        const clean = dictionaryService.cleanWord(rawText);
        if (!clean || clean.length < 2) return;
        await executeLookup(selection.getRangeAt(0), clean);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPosition(null);
        setResult(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPosition(null);
        setResult(null);
      }
    };

    document.addEventListener('dblclick', handleDoubleClick);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('dblclick', handleDoubleClick);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWordSaved]);

  const handlePlayAudio = (wordToSpeak: string, audioUrl?: string) => {
    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        audio.play();
        return;
      } catch {
        /* fallback to speechSynthesis */
      }
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordToSpeak);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleBookmarkToggle = () => {
    if (!result) return;
    addWord({
      word: result.word,
      meaning: result.meaning,
      example: result.example || '',
    });
    setIsSavedBookmark(true);
  };

  if (!position) return null;

  return (
    <div
      ref={popoverRef}
      style={{ top: position.y, left: position.x }}
      className="fixed z-[9999] w-80 max-w-[92vw] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-blue-500/40 dark:border-blue-400/30 p-4 animate-in fade-in zoom-in-95 text-gray-900 dark:text-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700/80 pb-2 mb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
          <h4
            className="font-extrabold text-sm capitalize max-w-[185px] truncate text-gray-900 dark:text-white"
            title={result?.word || searchedWord}
          >
            {result?.word || searchedWord}
          </h4>
          {result?.level && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shrink-0">
              {result.level}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => handlePlayAudio(result?.word || searchedWord, result?.audioUrl)}
            className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 transition-colors cursor-pointer"
            title="Phát âm tiếng Anh"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setPosition(null);
              setResult(null);
            }}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Body: Loading or Definition */}
      {loading ? (
        <div className="py-4 flex flex-col items-center justify-center gap-2 text-center text-xs text-blue-600 dark:text-blue-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <p className="font-medium text-[11px]">Đang tra cứu từ / cụm từ & lưu vào CSDL...</p>
        </div>
      ) : result ? (
        <div className="space-y-2">
          {(result.phonetic || result.partOfSpeech) && (
            <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 flex-wrap">
              {result.phonetic && <span>{result.phonetic}</span>}
              {result.partOfSpeech && (
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-sans font-normal italic">
                  ({result.partOfSpeech})
                </span>
              )}
            </p>
          )}

          <div className="text-xs text-gray-800 dark:text-gray-200 font-semibold leading-relaxed max-h-28 overflow-y-auto pr-1 scrollbar-thin">
            {result.meaning}
          </div>

          {result.example && (
            <p className="text-[11px] text-gray-600 dark:text-gray-400 italic border-l-2 border-blue-400 pl-2 leading-snug">
              "{result.example}"
            </p>
          )}

          {/* Status Badge & Actions Footer */}
          <div className="pt-2.5 mt-2 border-t border-gray-100 dark:border-gray-700/80 flex items-center justify-between gap-2">
            {result.source === 'online_saved' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                <Sparkles className="w-3 h-3" />
                <span>Đã lưu vào DB Hệ thống</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Từ điển Offline (Sẵn sàng)</span>
              </span>
            )}

            <button
              onClick={handleBookmarkToggle}
              disabled={isSavedBookmark}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                isSavedBookmark
                  ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
              }`}
            >
              {isSavedBookmark ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Đã lưu</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3 h-3" />
                  <span>Lưu Sổ tay</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
