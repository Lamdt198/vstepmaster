import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Zap,
  FileText,
  UploadCloud,
  Sparkles,
  Layers,
  BarChart3,
  ArrowRight,
  TrendingUp,
  Award,
  GraduationCap,
  Lightbulb,
  type LucideIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SkillProgress {
  id: string;
  name: string;
  enName: string;
  path: string;
  percentage: number;
  completedText: string;
  color: string;
  strokeColor: string;
  bgColor: string;
  icon: LucideIcon;
}

const skillsData: SkillProgress[] = [
  {
    id: 'listening',
    name: 'Luyện Nghe',
    enName: 'Listening',
    path: '/listening',
    percentage: 72,
    completedText: 'Hoàn thành 14/20 bài',
    color: 'text-blue-600 dark:text-blue-400',
    strokeColor: '#2563EB',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    icon: Headphones,
  },
  {
    id: 'reading',
    name: 'Luyện Đọc',
    enName: 'Reading',
    path: '/reading',
    percentage: 65,
    completedText: 'Hoàn thành 18/28 bài',
    color: 'text-emerald-600 dark:text-emerald-400',
    strokeColor: '#10B981',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
    icon: BookOpen,
  },
  {
    id: 'writing',
    name: 'Luyện Viết',
    enName: 'Writing AI',
    path: '/writing',
    percentage: 48,
    completedText: 'Hoàn thành 8/16 bài',
    color: 'text-purple-600 dark:text-purple-400',
    strokeColor: '#8B5CF6',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    icon: PenTool,
  },
  {
    id: 'speaking',
    name: 'Luyện Nói',
    enName: 'Speaking',
    path: '/speaking',
    percentage: 54,
    completedText: 'Hoàn thành 10/18 bài',
    color: 'text-amber-600 dark:text-amber-400',
    strokeColor: '#F59E0B',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    icon: Mic,
  },
];

const mockTestHistory = [
  { label: 'VSTEP #1', date: '12/08/2026', score: 6.5, band: 'B2', color: 'bg-blue-500' },
  { label: 'VSTEP #2', date: '19/08/2026', score: 8.0, band: 'B2', color: 'bg-blue-600' },
  { label: 'VSTEP #3', date: '26/08/2026', score: 7.5, band: 'B2', color: 'bg-blue-500' },
  { label: 'VSTEP #4', date: '02/09/2026', score: 8.5, band: 'C1', color: 'bg-indigo-600' },
  { label: 'VSTEP #5', date: '09/09/2026', score: 9.0, band: 'C1', color: 'bg-blue-700' },
];

export default function Home() {
  const { user } = useAuth();
  const userName = user?.displayName || 'Nguyễn Văn An';

  return (
    <div className="space-y-8 w-full pb-10">
      {/* 1. Greeting & Goal Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Chào mừng, {userName}!
            </h1>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Mục tiêu B2 CEFR</span>
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-1.5">
            Hôm nay bạn muốn luyện tập kỹ năng nào? Mục tiêu: Đạt chuẩn B2 VSTEP (6.0 - 8.0/10).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/mock-test"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all hover:scale-105 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Làm đề Thi Thử (180p)</span>
          </Link>
        </div>
      </div>

      {/* 2. Four Skills Circular Progress Cards (Matching ui_dashboard.png) */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillsData.map((skill) => {
            const radius = 30;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

            return (
              <Link
                key={skill.id}
                to={skill.path}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700/60 flex items-center justify-center"><skill.icon className={`w-6 h-6 ${skill.color}`} /></div>
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Luyện tập →
                  </span>
                </div>

                <div className="text-center my-2">
                  {/* Circular progress ring */}
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="7"
                        className="text-gray-100 dark:text-gray-700"
                        fill="transparent"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke={skill.strokeColor}
                        strokeWidth="7"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <span className={`absolute text-xl font-bold ${skill.color}`}>
                      {skill.percentage}%
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 dark:text-white mt-2">
                    {skill.name} <span className="text-xs text-gray-500 font-normal">({skill.enName})</span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {skill.completedText}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Main Dashboard Body: Bar Chart History (Left) + Quick Actions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Score History Bar Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-700 pb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" /> Lịch sử Điểm Thi Thử VSTEP Toàn Diện (Năm 2026)
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Quy đổi thang điểm 10 chuẩn Bộ GD&ĐT (Điểm đạt chuẩn B2 &ge; 6.0, C1 &ge; 8.5)
                </p>
              </div>
              <span className="px-2.5 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs font-semibold self-start sm:self-auto flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Xu hướng tăng
              </span>
            </div>

            {/* Custom Bar Chart Canvas simulation */}
            <div className="mt-8 pt-4">
              {/* Benchmark Reference Lines */}
              <div className="relative h-64 border-b border-gray-200 dark:border-gray-700 flex items-end justify-between px-4 sm:px-8">
                {/* Y-Axis scale guidelines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-xs text-gray-400 -left-2 sm:-left-4">
                  <div className="flex items-center w-full">
                    <span className="w-8 text-right pr-2">10.0</span>
                    <div className="flex-1 border-b border-dashed border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="flex items-center w-full">
                    <span className="w-8 text-right pr-2 text-indigo-500 font-semibold">8.5</span>
                    <div className="flex-1 border-b border-dashed border-indigo-200 dark:border-indigo-800/40"></div>
                    <span className="text-[10px] text-indigo-500 pl-1">Chuẩn C1</span>
                  </div>
                  <div className="flex items-center w-full">
                    <span className="w-8 text-right pr-2 text-blue-500 font-semibold">6.0</span>
                    <div className="flex-1 border-b border-dashed border-blue-200 dark:border-blue-800/40"></div>
                    <span className="text-[10px] text-blue-500 pl-1">Chuẩn B2</span>
                  </div>
                  <div className="flex items-center w-full">
                    <span className="w-8 text-right pr-2">4.0</span>
                    <div className="flex-1 border-b border-dashed border-gray-200 dark:border-gray-700"></div>
                  </div>
                </div>

                {/* Bars */}
                {mockTestHistory.map((item, idx) => {
                  const heightPercent = (item.score / 10) * 100;
                  return (
                    <div key={idx} className="flex flex-col items-center z-10 group relative w-12 sm:w-16">
                      {/* Score Tooltip / Badge */}
                      <span className="mb-2 font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        {item.score.toFixed(1)}
                      </span>
                      {/* Bar pillar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-10 sm:w-14 rounded-t-lg ${item.color} shadow-sm transition-all duration-500 group-hover:brightness-110 flex items-end justify-center pb-1`}
                      >
                        <span className="text-[10px] text-white font-bold opacity-80 group-hover:opacity-100">
                          {item.band}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-Axis labels */}
              <div className="flex justify-between px-4 sm:px-8 mt-3 text-center">
                {mockTestHistory.map((item, idx) => (
                  <div key={idx} className="w-12 sm:w-16">
                    <div className="font-semibold text-xs text-gray-800 dark:text-gray-200">{item.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500">
            <span>Bài thi gần nhất đạt: <strong className="text-blue-600 dark:text-blue-400 font-bold">9.0/10 (Bậc C1)</strong></span>
            <Link to="/progress" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Xem báo cáo chi tiết →
            </Link>
          </div>
        </div>

        {/* Right: Quick Actions Panel (4 cols - Matching ui_dashboard.png) */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-4">
              <Zap className="w-5 h-5 text-amber-500" /> Hành Động Nhanh (Quick Actions)
            </h2>

            <div className="mt-5 space-y-3">
              <Link
                to="/mock-test"
                className="w-full flex items-center justify-between p-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/30 text-white"><FileText className="w-5 h-5" /></div>
                  <span>Làm đề Thi Thử (Full 180p)</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/custom-test"
                className="w-full flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium text-sm border border-gray-200 dark:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600"><UploadCloud className="w-5 h-5" /></div>
                  <span>Tự tạo đề từ Word / PDF</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/writing"
                className="w-full flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium text-sm border border-gray-200 dark:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600"><Sparkles className="w-5 h-5" /></div>
                  <span>Luyện Viết với AI Chấm</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/flashcards"
                className="w-full flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium text-sm border border-gray-200 dark:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600"><Layers className="w-5 h-5" /></div>
                  <span>Học Từ vựng Flashcards</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/progress"
                className="w-full flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium text-sm border border-gray-200 dark:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600"><BarChart3 className="w-5 h-5" /></div>
                  <span>Xem Thống kê & Bảng điểm</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/40 text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div><strong>Mẹo luyện thi:</strong> Đạt B2 cần tối thiểu 6.0/10.0 trung bình cộng 4 kỹ năng (làm tròn 0.5 điểm).</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. VSTEP Structure Reference */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <span>Cấu Trúc Kỳ Thi VSTEP B1-B2-C1 Chuẩn Bộ GD&ĐT</span>
        </h2>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-xs sm:text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Kỹ năng</th>
                <th className="px-4 py-3 text-left">Thời gian</th>
                <th className="px-4 py-3 text-left">Cấu trúc định dạng</th>
                <th className="px-4 py-3 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Headphones className="w-4 h-4" /> Listening
                </td>
                <td className="px-4 py-3">~40 phút</td>
                <td className="px-4 py-3">35 câu trắc nghiệm (Part 1: 8 câu, Part 2: 12 câu, Part 3: 15 câu)</td>
                <td className="px-4 py-3"><Link to="/listening" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Vào luyện →</Link></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Reading
                </td>
                <td className="px-4 py-3">60 phút</td>
                <td className="px-4 py-3">40 câu trắc nghiệm (4 bài đọc x 10 câu hỏi, dạng bài học thuật)</td>
                <td className="px-4 py-3"><Link to="/reading" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Vào luyện →</Link></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <PenTool className="w-4 h-4" /> Writing
                </td>
                <td className="px-4 py-3">60 phút</td>
                <td className="px-4 py-3">Task 1: Viết thư (~120 từ, 1/3 điểm) + Task 2: Luận (~250 từ, 2/3 điểm)</td>
                <td className="px-4 py-3"><Link to="/writing" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">Vào luyện →</Link></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Mic className="w-4 h-4" /> Speaking
                </td>
                <td className="px-4 py-3">~12 phút</td>
                <td className="px-4 py-3">Part 1: Giao tiếp (3p) + Part 2: Thảo luận giải pháp (4p) + Part 3: Phát triển chủ đề (5p)</td>
                <td className="px-4 py-3"><Link to="/speaking" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">Vào luyện →</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

