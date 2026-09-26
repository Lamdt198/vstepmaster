import { useState, useEffect } from 'react';
import { Video, Info, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { englishLessons, Lesson } from '../data/lessonsData';
import { useAdaptiveGrid } from '../hooks/useAdaptiveGrid';

type LevelFilter = 'all' | 'B1' | 'B2' | 'C1';

export default function Lessons() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [showInfo, setShowInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { cols, rows, itemsPerPage } = useAdaptiveGrid();

  const filtered = englishLessons.filter((l) =>
    levelFilter === 'all' || l.level === levelFilter
  );

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

  if (selectedLesson) {
    return <LessonView lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />;
  }

  return (
    <div className="space-y-2.5 animate-fadeIn flex flex-col justify-between h-full overflow-hidden">
      {/* Top Header & Toolbar */}
      <div className="space-y-2.5 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Video className="w-6 h-6 text-red-600" />
              <span>Bài Giảng Video VSTEP</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5">
              Hệ thống bài giảng theo chuyên đề 4 kỹ năng kèm phân tích chiến thuật và video minh họa.
            </p>
          </div>

          {/* Level Filters & Top Mini-Pagination */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs">
              {[
                { id: 'all', label: `Tất cả (${englishLessons.length})` },
                { id: 'B1', label: 'B1' },
                { id: 'B2', label: 'B2' },
                { id: 'C1', label: 'C1' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFilterChange(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    levelFilter === f.id
                      ? 'bg-red-600 text-white shadow-xs'
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
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50/70 dark:bg-red-950/20 overflow-hidden transition-all shrink-0">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-full px-3.5 py-2 flex items-center justify-between text-xs font-bold text-red-900 dark:text-red-300 cursor-pointer hover:bg-red-100/50 dark:hover:bg-red-900/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>Chương trình bài giảng trực quan VSTEP (Phân tích mẹo & chiến thuật thi)</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-red-700 dark:text-red-400 font-semibold shrink-0">
              {showInfo ? 'Thu gọn' : 'Xem chi tiết'}
              {showInfo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </span>
          </button>
          {showInfo && (
            <div className="px-3.5 pb-2.5 pt-1 text-xs text-red-900 dark:text-red-200 space-y-1.5 border-t border-red-200/60 dark:border-red-800/60 animate-fadeIn">
              <ul className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span><strong>Nghe & Đọc:</strong> Phân tích dạng bẫy phổ biến và kỹ năng Skimming/Scanning.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span><strong>Viết luận:</strong> Dàn ý chi tiết cho thư Task 1 và bài luận 250 từ Task 2.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span><strong>Nói 3 phần:</strong> Mẫu câu nối logic và phương pháp phát triển ý Mindmap.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span><strong>Video chuẩn HD:</strong> Tích hợp bài tập thực hành ngay dưới mỗi video.</span>
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
        {paginated.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
            className="group bg-white dark:bg-gray-800 rounded-2xl p-3.5 border border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 hover:shadow-md transition-all flex flex-col justify-between h-full cursor-pointer"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-start gap-2">
                <span className="text-[10px] font-bold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md border border-red-200/80 dark:border-red-800/50 uppercase">
                  {lesson.category}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  lesson.level === 'B1' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  lesson.level === 'B2' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                }`}>
                  {lesson.level}
                </span>
              </div>

              <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                {lesson.title}
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {lesson.description}
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-700/80 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" /> {lesson.duration}
              </span>
              <span className="text-red-600 dark:text-red-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-xs">
                Xem bài &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls Anchored At Bottom */}
      <div className="shrink-0 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Hiển thị <strong>{paginated.length}</strong> / {filtered.length} bài giảng (Trang {validPage}/{totalPages})
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
                    ? 'bg-red-600 text-white shadow-xs'
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

function LessonView({ lesson, onBack }: { lesson: Lesson; onBack: () => void }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button onClick={onBack} className="text-primary-600 dark:text-primary-400 hover:underline text-sm">← Quay lại danh sách</button>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{lesson.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{lesson.description}</p>
        <div className="flex gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            lesson.level === 'B1' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
            lesson.level === 'B2' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}>{lesson.level}</span>
          <span>🎬 {lesson.duration}</span>
          <span className="capitalize">📂 {lesson.category}</span>
        </div>
      </div>

      {/* Video */}
      <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
        <iframe
          src={lesson.videoUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={lesson.title}
        />
      </div>

      {/* Lesson content */}
      <div className="card prose prose-sm dark:prose-invert max-w-none">
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed">
          {lesson.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">{line.replace('## ', '')}</h2>;
            if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-3 mb-1">{line.replace('### ', '')}</h3>;
            if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-gray-900 dark:text-white">{line.replace(/\*\*/g, '')}</p>;
            if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.replace('- ', '')}</li>;
            if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-primary-300 dark:border-primary-600 pl-3 italic text-gray-600 dark:text-gray-400">{line.replace('> ', '')}</blockquote>;
            if (line.startsWith('|')) return <p key={i} className="font-mono text-xs">{line}</p>;
            if (line.trim() === '') return <br key={i} />;
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
