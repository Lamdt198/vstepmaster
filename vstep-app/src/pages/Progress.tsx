import {
  BarChart3,
  Inbox,
  Award,
  CheckCircle2,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Trash2,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { progressService, UserProgressEntry } from '../services/progressService';

type FilterTab = 'all' | 'mock' | 'listening' | 'reading' | 'writing' | 'speaking';

export default function Progress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Record<string, UserProgressEntry>>({});
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>('all');
  const [isSyncing, setIsSyncing] = useState(false);

  const loadData = () => {
    const local = progressService.getUserProgress(user?.username);
    setProgress(local);
  };

  const handleSyncBackend = async () => {
    if (!user?.username) return;
    setIsSyncing(true);
    try {
      const synced = await progressService.syncWithBackend(user?.username);
      setProgress(synced);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadData();
    handleSyncBackend();

    const handleProgressUpdate = () => {
      loadData();
    };

    window.addEventListener('vstep_progress_updated', handleProgressUpdate);
    return () => {
      window.removeEventListener('vstep_progress_updated', handleProgressUpdate);
    };
  }, [user?.username]);

  // Sort entries descending by date
  const sortedEntries = useMemo(() => {
    return Object.entries(progress).sort(
      (a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime()
    );
  }, [progress]);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    if (selectedFilter === 'all') return sortedEntries;
    return sortedEntries.filter(([key, entry]) => {
      if (entry.type === selectedFilter) return true;
      if (key.startsWith(selectedFilter)) return true;
      return false;
    });
  }, [sortedEntries, selectedFilter]);

  // Skill icons & badges
  const getSkillBadge = (type: string, key: string) => {
    const t = type || (key.startsWith('listening') ? 'listening' : key.startsWith('reading') ? 'reading' : key.startsWith('writing') ? 'writing' : key.startsWith('speaking') ? 'speaking' : 'mock');
    switch (t) {
      case 'mock':
        return {
          label: 'Thi thử VSTEP',
          icon: <Award className="w-3.5 h-3.5 text-indigo-500" />,
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
        };
      case 'listening':
        return {
          label: 'Nghe (Listening)',
          icon: <Headphones className="w-3.5 h-3.5 text-blue-500" />,
          bgColor: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        };
      case 'reading':
        return {
          label: 'Đọc (Reading)',
          icon: <BookOpen className="w-3.5 h-3.5 text-emerald-500" />,
          bgColor: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      case 'writing':
        return {
          label: 'Viết (Writing)',
          icon: <PenTool className="w-3.5 h-3.5 text-amber-500" />,
          bgColor: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      case 'speaking':
        return {
          label: 'Nói (Speaking)',
          icon: <Mic className="w-3.5 h-3.5 text-rose-500" />,
          bgColor: 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        };
      default:
        return {
          label: 'Bài thi',
          icon: <BarChart3 className="w-3.5 h-3.5 text-gray-500" />,
          bgColor: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600',
        };
    }
  };

  // VSTEP CEFR band colors
  const getCefrBadge = (scoreOrBand: number | string | undefined) => {
    let band = 'B1';
    if (typeof scoreOrBand === 'string' && ['B1', 'B2', 'C1'].includes(scoreOrBand)) {
      band = scoreOrBand;
    } else if (typeof scoreOrBand === 'number') {
      if (scoreOrBand >= 8.5) band = 'C1';
      else if (scoreOrBand >= 6.0) band = 'B2';
      else if (scoreOrBand >= 4.0) band = 'B1';
      else band = '<B1';
    }

    switch (band) {
      case 'C1':
        return { label: 'Bậc 5 (C1)', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300' };
      case 'B2':
        return { label: 'Bậc 4 (B2)', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300' };
      case 'B1':
        return { label: 'Bậc 3 (B1)', color: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300' };
      default:
        return { label: 'Dưới B1', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-300' };
    }
  };

  // Metrics computation across all entries
  const totalAttempts = sortedEntries.length;
  const scoredEntries = sortedEntries.filter((e) => e[1].score !== undefined);
  
  const avgScore10 = useMemo(() => {
    if (scoredEntries.length === 0) return 0;
    const sum = scoredEntries.reduce((acc, [, entry]) => {
      if (entry.total && entry.total > 0 && entry.total !== 10) {
        return acc + ((entry.score || 0) / entry.total) * 10;
      }
      return acc + (entry.score || 0);
    }, 0);
    return Math.round((sum / scoredEntries.length) * 10) / 10;
  }, [scoredEntries]);

  const passedCount = useMemo(() => {
    return scoredEntries.filter(([, entry]) => {
      if (entry.total && entry.total > 0 && entry.total !== 10) {
        return (entry.score || 0) / entry.total >= 0.6;
      }
      return (entry.score || 0) >= 6.0;
    }).length;
  }, [scoredEntries]);

  const predictedBand = useMemo(() => {
    if (avgScore10 >= 8.5) return { label: 'C1 Cao cấp', color: 'text-purple-600 dark:text-purple-400' };
    if (avgScore10 >= 6.0) return { label: 'B2 Trung cấp', color: 'text-blue-600 dark:text-blue-400' };
    if (avgScore10 >= 4.0) return { label: 'B1 Sơ cấp', color: 'text-green-600 dark:text-green-400' };
    return { label: 'Cần nỗ lực thêm', color: 'text-amber-600 dark:text-amber-400' };
  }, [avgScore10]);

  const clearHistory = () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử tiến độ của tài khoản này?')) {
      progressService.clearUserProgress(user?.username);
      setProgress({});
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn flex flex-col justify-between lg:h-[calc(100vh-105px)] lg:min-h-[580px]">
      {/* Top Header */}
      <div className="space-y-3 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <span>Tiến Độ & Thống Kê Học Tập</span>
              {user?.username && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">
                  {user.displayName || user.username}
                </span>
              )}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5">
              Theo dõi kết quả làm bài 4 kỹ năng & đề thi thử, tự động tính điểm theo khung năng lực 6 bậc CEFR VSTEP.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleSyncBackend}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Đồng bộ kết quả từ C# Backend Database"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
              <span>{isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ'}</span>
            </button>

            {sortedEntries.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa lịch sử</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Skill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
          {[
            { id: 'all', label: 'Tất cả bài thi' },
            { id: 'mock', label: 'Thi thử (Mock Test)' },
            { id: 'listening', label: 'Listening' },
            { id: 'reading', label: 'Reading' },
            { id: 'writing', label: 'Writing' },
            { id: 'speaking', label: 'Speaking' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as FilterTab)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 shrink-0">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-3.5 border border-gray-200 dark:border-gray-700 shadow-xs text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalAttempts}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Tổng lượt làm bài</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-3.5 border border-gray-200 dark:border-gray-700 shadow-xs text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{avgScore10}/10</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Điểm TB (Thang 10)</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-3.5 border border-gray-200 dark:border-gray-700 shadow-xs text-center">
          <p className={`text-2xl font-bold ${predictedBand.color}`}>
            {avgScore10 > 0 ? predictedBand.label.split(' ')[0] : '—'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Dự đoán Bậc CEFR</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-3.5 border border-gray-200 dark:border-gray-700 shadow-xs text-center">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {passedCount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Bài đạt chuẩn (≥ B1/6.0)</p>
        </div>
      </div>

      {/* History Log Container (Flex-1 with internal scroll) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-xs flex-1 min-h-0 flex flex-col">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3 shrink-0 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span>Lịch sử nộp bài & Kết quả chi tiết</span>
          </span>
          <span className="text-xs font-normal text-gray-500">
            {filteredEntries.length} kết quả
          </span>
        </h2>

        {filteredEntries.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400 dark:text-gray-500">
            <Inbox className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-2" />
            <p className="text-xs font-medium">Chưa có bài thi nào trong mục này.</p>
            <p className="text-[11px] text-gray-400 mt-1">
              Hãy chọn Thi thử VSTEP hoặc luyện tập từng kỹ năng để lưu tiến độ tự động.
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                to="/mock-test"
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
              >
                Vào Thi thử VSTEP
              </Link>
              <Link
                to="/reading"
                className="px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold transition-colors"
              >
                Luyện kỹ năng
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-1">
            {filteredEntries.map(([key, entry], i) => {
              const badge = getSkillBadge(entry.type, key);
              const cefr = getCefrBadge(entry.band || entry.score);

              return (
                <div
                  key={i}
                  className="p-3.5 bg-gray-50 dark:bg-gray-700/40 rounded-xl border border-gray-100 dark:border-gray-700/80 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  {/* Left info: Icon, Title, Date, Skill badge */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold border ${badge.bgColor}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>

                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                        {entry.title || key}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                      <span>
                        {new Date(entry.date).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>

                      {/* Mock test detailed skill breakdown */}
                      {entry.details && (
                        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-600 text-[10px]">
                          {entry.details.listeningScore !== undefined && (
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                              Nghe: {entry.details.listeningScore}
                            </span>
                          )}
                          {entry.details.readingScore !== undefined && (
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                              Đọc: {entry.details.readingScore}
                            </span>
                          )}
                          {entry.details.writingScore !== undefined && (
                            <span className="text-amber-600 dark:text-amber-400 font-medium">
                              Viết: {entry.details.writingScore}
                            </span>
                          )}
                          {entry.details.speakingScore !== undefined && (
                            <span className="text-rose-600 dark:text-rose-400 font-medium">
                              Nói: {entry.details.speakingScore}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Score & CEFR Pill */}
                  <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                    {entry.band && (
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold border ${cefr.color}`}>
                        {entry.band}
                      </span>
                    )}

                    {entry.score !== undefined ? (
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-xl text-xs font-bold ${
                            entry.total && entry.total !== 10
                              ? entry.score / entry.total >= 0.7
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                              : entry.score >= 6.0
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                          }`}
                        >
                          {entry.total && entry.total !== 10 ? (
                            `${entry.score}/${entry.total} (${Math.round((entry.score / entry.total) * 100)}%)`
                          ) : (
                            `${entry.score}/10`
                          )}
                        </span>
                      </div>
                    ) : entry.wordCount !== undefined ? (
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-xl border border-purple-200 dark:border-purple-800">
                        {entry.wordCount} từ
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Info Status */}
      <div className="shrink-0 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" />
          <span>Tự động đồng bộ tiến độ học tập trên tài khoản của bạn</span>
        </span>
        <span className="font-semibold text-blue-600 dark:text-blue-400">VSTEP Master Analytics</span>
      </div>
    </div>
  );
}
