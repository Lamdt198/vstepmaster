import { useState, useEffect } from 'react';
import { Mic, Info, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { speakingTopics } from '../data/speakingData';
import { useAdaptiveGrid } from '../hooks/useAdaptiveGrid';

export default function Speaking() {
  const [levelFilter, setLevelFilter] = useState<'all' | 'B1' | 'B2' | 'C1'>('all');
  const [showInfo, setShowInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { cols, rows, itemsPerPage } = useAdaptiveGrid();

  const filtered = levelFilter === 'all'
    ? speakingTopics
    : speakingTopics.filter((t) => t.level === levelFilter);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((validPage - 1) * itemsPerPage, validPage * itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  const handleFilterChange = (lvl: 'all' | 'B1' | 'B2' | 'C1') => {
    setLevelFilter(lvl);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-2.5 animate-fadeIn flex flex-col justify-between h-full overflow-hidden">
      {/* Top Header & Toolbar */}
      <div className="space-y-2.5 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Mic className="w-6 h-6 text-amber-600" />
              <span>Kỹ Năng Speaking VSTEP</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5">
              Luyện nói 14 chủ đề chuẩn cấu trúc 3 phần với bộ đếm thời gian thực và ghi âm tương tác.
            </p>
          </div>

          {/* Level Filters & Top Mini-Pagination */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs">
              {[
                { id: 'all', label: `Tất cả (${speakingTopics.length})` },
                { id: 'B1', label: 'B1' },
                { id: 'B2', label: 'B2' },
                { id: 'C1', label: 'C1' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFilterChange(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    levelFilter === f.id
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

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

        {/* Collapsible Format Info */}
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/20 overflow-hidden transition-all shrink-0">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-full px-3.5 py-2 flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300 cursor-pointer hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Cấu trúc đề thi VSTEP Speaking (12 phút • 3 Parts thi trực tiếp/máy tính)</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 font-semibold shrink-0">
              {showInfo ? 'Thu gọn' : 'Xem chi tiết'}
              {showInfo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </span>
          </button>
          {showInfo && (
            <div className="px-3.5 pb-2.5 pt-1 text-xs text-amber-900 dark:text-amber-200 space-y-1.5 border-t border-amber-200/60 dark:border-amber-800/60 animate-fadeIn">
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>Part 1 (3p):</strong> Trả lời 3-6 câu hỏi ngắn về đời sống, học tập, thói quen thường nhật.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>Part 2 (4p):</strong> Chọn 1 trong 3 phương án cho tình huống cụ thể, phân tích ưu/nhược điểm.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>Part 3 (5p):</strong> Thuyết trình quan điểm xã hội dựa trên sơ đồ tư duy (Mindmap).</span>
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
        {paginated.map((topic) => (
          <Link
            key={topic.id}
            to={`/speaking/${topic.id}`}
            className="group bg-white dark:bg-gray-800 rounded-2xl p-3.5 border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between h-full"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-start gap-2">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200/80 dark:border-amber-800/50">
                  Part {topic.part}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  topic.level === 'B1' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  topic.level === 'B2' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                }`}>
                  {topic.level}
                </span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                {topic.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {topic.prompt}
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-700/80 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium text-[11px]">Chuẩn bị: {topic.prepTime}s • Nói: {topic.speakTime}s</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-xs">
                Luyện nói &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls Anchored At Bottom */}
      <div className="shrink-0 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Hiển thị <strong>{paginated.length}</strong> / {filtered.length} chủ đề (Trang {validPage}/{totalPages})
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
                    ? 'bg-amber-600 text-white shadow-xs'
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
